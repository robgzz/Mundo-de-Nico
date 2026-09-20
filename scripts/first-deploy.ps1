[CmdletBinding()]
param(
  [string]$ResourceGroup = "rg-mundodenico-web-prod",
  [string]$Location = "centralus",
  [string]$StaticWebAppName = "swa-mundodenico-prod",
  [ValidateSet("Free","Standard")][string]$SkuName = "Free",
  [string]$SubscriptionId = ""
)
$ErrorActionPreference="Stop"
function Require-Command($name){if(-not(Get-Command $name -ErrorAction SilentlyContinue)){throw "$name is required but was not found in PATH."}}
Require-Command az; Require-Command npm
az cloud set --name AzureCloud | Out-Null
if($SubscriptionId){az account set --subscription $SubscriptionId | Out-Null}
$acct=az account show -o json 2>$null | ConvertFrom-Json
if(-not $acct){az login | Out-Null;if($SubscriptionId){az account set --subscription $SubscriptionId | Out-Null}}
az provider register --namespace Microsoft.Web --wait --output none
if((az group exists --name $ResourceGroup)-ne "true"){az group create --name $ResourceGroup --location $Location --output none}
$repoRoot=Resolve-Path(Join-Path $PSScriptRoot "..")
$bicep=Join-Path $repoRoot "infra/main.bicep"
$deploymentName="mundodenico-web-$(Get-Date -Format yyyyMMddHHmmss)"
az deployment group create --resource-group $ResourceGroup --name $deploymentName --template-file $bicep --parameters staticWebAppName=$StaticWebAppName location=$Location skuName=$SkuName --output none
if($LASTEXITCODE -ne 0){throw "Infrastructure deployment failed."}
Push-Location $repoRoot
try{
 npm ci --no-audit --no-fund; if($LASTEXITCODE -ne 0){throw "npm ci failed."}
 npm run build; if($LASTEXITCODE -ne 0){throw "Website build failed."}
 $token=az staticwebapp secrets list --resource-group $ResourceGroup --name $StaticWebAppName --query properties.apiKey -o tsv
 if(-not $token){throw "Could not retrieve Azure Static Web Apps deployment token."}
 npx --yes @azure/static-web-apps-cli@latest deploy ./dist --deployment-token $token --env production
 if($LASTEXITCODE -ne 0){throw "Static Web Apps deployment failed."}
}finally{Pop-Location}
$hostName=az staticwebapp show --resource-group $ResourceGroup --name $StaticWebAppName --query defaultHostname -o tsv
Write-Host "Deployment complete." -ForegroundColor Green
Write-Host "Azure URL: https://$hostName"
Write-Host "Production URL after custom-domain cutover: https://mundodenico.com"
