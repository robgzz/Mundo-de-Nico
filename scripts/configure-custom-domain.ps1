[CmdletBinding()]
param(
  [string]$ResourceGroup = "rg-mundodenico-web-prod",
  [string]$StaticWebAppName = "swa-mundodenico-prod",
  [string]$Domain = "mundodenico.com",
  [string]$SubscriptionId = ""
)
$ErrorActionPreference="Stop"
if(-not(Get-Command az -ErrorAction SilentlyContinue)){throw "Azure CLI (az) is required."}
az cloud set --name AzureCloud | Out-Null
if($SubscriptionId){az account set --subscription $SubscriptionId | Out-Null}
$acct=az account show -o json 2>$null | ConvertFrom-Json
if(-not $acct){az login | Out-Null;if($SubscriptionId){az account set --subscription $SubscriptionId | Out-Null}}
$defaultHost=az staticwebapp show --resource-group $ResourceGroup --name $StaticWebAppName --query defaultHostname -o tsv
if(-not $defaultHost){throw "Static Web App '$StaticWebAppName' was not found. Deploy first."}
Write-Host "Initiating TXT ownership validation for $Domain..." -ForegroundColor Cyan
$oldPreference=$ErrorActionPreference
try{$ErrorActionPreference="Continue";az staticwebapp hostname set --resource-group $ResourceGroup --name $StaticWebAppName --hostname $Domain --validation-method dns-txt-token --no-wait --output none 2>$null}finally{$ErrorActionPreference=$oldPreference}
$token=""
for($i=0;$i-lt 12 -and -not $token;$i++){Start-Sleep -Seconds 5;$token=az staticwebapp hostname show --resource-group $ResourceGroup --name $StaticWebAppName --hostname $Domain --query validationToken -o tsv 2>$null}
Write-Host "DNS cutover information" -ForegroundColor Green
Write-Host "Domain: $Domain"
Write-Host "Static Web Apps target: $defaultHost"
if($token){Write-Host "TXT ownership token: $token" -ForegroundColor Yellow;Write-Host "Use the _dnsauth record name Azure/DNS provider expects for this apex validation."}else{Write-Host "Azure has not returned a validation token yet; re-run the script shortly." -ForegroundColor Yellow}
Write-Host "After validation, point the apex/root domain using ALIAS, ANAME, or CNAME flattening to: $defaultHost" -ForegroundColor Yellow
Write-Host "Do not replace unrelated MX/SPF/DKIM/DMARC/Microsoft verification records if this domain later carries mail." -ForegroundColor Red
