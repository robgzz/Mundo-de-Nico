[CmdletBinding()]
param(
  [Parameter(Mandatory=$true)][string]$ResourceGroup,
  [Parameter(Mandatory=$true)][string]$GitHubOwner,
  [Parameter(Mandatory=$true)][string]$GitHubRepo,
  [string]$Branch = "main",
  [string]$SubscriptionId = "",
  [string]$Location = "centralus",
  [string]$GitHubOwnerId = "",
  [string]$GitHubRepoId = "",
  [string]$GitHubToken = "",
  [switch]$UseLegacySubject
)
$ErrorActionPreference = "Stop"
if (-not (Get-Command az -ErrorAction SilentlyContinue)) { throw "Azure CLI (az) is required." }
az cloud set --name AzureCloud | Out-Null
if ($SubscriptionId) { az account set --subscription $SubscriptionId | Out-Null }
$acct = az account show -o json 2>$null | ConvertFrom-Json
if (-not $acct) { az login | Out-Null; if ($SubscriptionId) { az account set --subscription $SubscriptionId | Out-Null }; $acct = az account show -o json | ConvertFrom-Json }
$sub = $acct.id; $tenant = $acct.tenantId
$canonicalGitHubOwner=$GitHubOwner; $canonicalGitHubRepo=$GitHubRepo
if ((az group exists --name $ResourceGroup) -ne "true") { az group create --name $ResourceGroup --location $Location --output none }
$scope = "/subscriptions/$sub/resourceGroups/$ResourceGroup"

if (-not $UseLegacySubject -and (-not $GitHubOwnerId -or -not $GitHubRepoId)) {
  try {
    $headers=@{ "User-Agent"="mundodenico-website-oidc"; "Accept"="application/vnd.github+json" }
    if (-not $GitHubToken -and (Get-Command gh -ErrorAction SilentlyContinue)) { try { $GitHubToken=(gh auth token 2>$null).Trim() } catch {} }
    if ($GitHubToken) { $headers["Authorization"]="Bearer $GitHubToken" }
    $repoInfo=Invoke-RestMethod -Uri "https://api.github.com/repos/$GitHubOwner/$GitHubRepo" -Headers $headers -Method Get
    if (-not $GitHubRepoId) { $GitHubRepoId=[string]$repoInfo.id }
    if (-not $GitHubOwnerId) { $GitHubOwnerId=[string]$repoInfo.owner.id }
    $canonicalGitHubOwner=[string]$repoInfo.owner.login; $canonicalGitHubRepo=[string]$repoInfo.name
  } catch { throw "Could not resolve GitHub immutable owner/repository IDs. Authenticate GitHub CLI, provide -GitHubToken, or supply -GitHubOwnerId and -GitHubRepoId." }
}

$display="github-$GitHubOwner-$GitHubRepo-mundodenico-web"
$existing=az ad app list --filter "displayName eq '$display'" --query "[0]" -o json | ConvertFrom-Json
if ($existing) { $appReg=$existing } else { $appReg=az ad app create --display-name $display -o json | ConvertFrom-Json }
$clientId=$appReg.appId
$sp=az ad sp list --filter "appId eq '$clientId'" --query "[0]" -o json | ConvertFrom-Json
if (-not $sp) { $sp=az ad sp create --id $clientId -o json | ConvertFrom-Json }

if ($UseLegacySubject) { $subject="repo:$canonicalGitHubOwner/$canonicalGitHubRepo`:ref:refs/heads/$Branch"; $credName="github-main-legacy" }
else { $subject="repo:$canonicalGitHubOwner@$GitHubOwnerId/$canonicalGitHubRepo@$GitHubRepoId`:ref:refs/heads/$Branch"; $credName="github-main-immutable" }
$existingCreds=@(az ad app federated-credential list --id $clientId -o json | ConvertFrom-Json)
$exactCred=$existingCreds | Where-Object { $_.subject -ceq $subject } | Select-Object -First 1
$namedCred=$existingCreds | Where-Object { $_.name -eq $credName } | Select-Object -First 1
if (-not $exactCred -and $namedCred) { az ad app federated-credential delete --id $clientId --federated-credential-id $namedCred.id --only-show-errors; if ($LASTEXITCODE -ne 0) { throw "Unable to remove mismatched federated credential." } }
if (-not $exactCred) {
  $cred=@{name=$credName;issuer="https://token.actions.githubusercontent.com";subject=$subject;description="GitHub Actions branch identity for $Branch";audiences=@("api://AzureADTokenExchange")} | ConvertTo-Json -Depth 5 -Compress
  $tmp=[System.IO.Path]::GetTempFileName(); Set-Content -Path $tmp -Value $cred -NoNewline
  try { az ad app federated-credential create --id $clientId --parameters "@$tmp" --output none --only-show-errors; if ($LASTEXITCODE -ne 0) { throw "Unable to create federated credential." } } finally { Remove-Item $tmp -Force -ErrorAction SilentlyContinue }
}
$assignmentJson=az role assignment list --assignee-object-id $sp.id --scope $scope --role Contributor --output json --only-show-errors
if ($LASTEXITCODE -ne 0) { throw "Unable to query existing Contributor role assignments." }
if (@($assignmentJson | ConvertFrom-Json).Count -eq 0) { az role assignment create --assignee-object-id $sp.id --assignee-principal-type ServicePrincipal --role Contributor --scope $scope --output none --only-show-errors; if ($LASTEXITCODE -ne 0) { throw "Unable to assign Contributor on $scope." } }
Write-Host "GitHub OIDC configured for El Mundo de Nico." -ForegroundColor Green
Write-Host "Add these repository secrets:" -ForegroundColor Yellow
Write-Host "AZURE_CLIENT_ID=$clientId"
Write-Host "AZURE_TENANT_ID=$tenant"
Write-Host "AZURE_SUBSCRIPTION_ID=$sub"
