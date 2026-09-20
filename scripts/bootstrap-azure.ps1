[CmdletBinding()]
param(
  [Parameter(Mandatory=$true)][string]$GitHubOwner,
  [Parameter(Mandatory=$true)][string]$GitHubRepo,
  [string]$ResourceGroup = "rg-mundodenico-web-prod",
  [string]$Location = "centralus",
  [string]$SubscriptionId = "",
  [string]$GitHubToken = ""
)
$ErrorActionPreference="Stop"
if (-not (Get-Command az -ErrorAction SilentlyContinue)) { throw "Azure CLI (az) is required." }
az cloud set --name AzureCloud | Out-Null
$acct=az account show -o json 2>$null | ConvertFrom-Json
if (-not $acct) { az login | Out-Null }
if ($SubscriptionId) { az account set --subscription $SubscriptionId | Out-Null }
Write-Host "Registering providers used by El Mundo de Nico deployment..." -ForegroundColor Cyan
az provider register --namespace Microsoft.Web --wait --output none
az provider register --namespace Microsoft.Resources --wait --output none
& (Join-Path $PSScriptRoot "configure-github-oidc.ps1") -ResourceGroup $ResourceGroup -Location $Location -GitHubOwner $GitHubOwner -GitHubRepo $GitHubRepo -SubscriptionId $SubscriptionId -GitHubToken $GitHubToken
