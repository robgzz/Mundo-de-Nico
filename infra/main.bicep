targetScope = 'resourceGroup'

@description('Name of the Azure Static Web App resource.')
param staticWebAppName string = 'swa-mundodenico-prod'

@description('Azure region used by the Static Web Apps control-plane/backend. Static assets are globally distributed.')
param location string = resourceGroup().location

@allowed([
  'Free'
  'Standard'
])
@description('Azure Static Web Apps hosting plan.')
param skuName string = 'Free'

@description('Common Azure tags.')
param tags object = {
  application: 'El Mundo de Nico Website'
  brand: 'Entre dichos y aventuras'
  environment: 'production'
  managedBy: 'GitHub Actions + Bicep'
}

resource staticSite 'Microsoft.Web/staticSites@2025-03-01' = {
  name: staticWebAppName
  location: location
  tags: tags
  sku: {
    name: skuName
    tier: skuName
  }
  properties: {}
}

output staticWebAppName string = staticSite.name
output staticWebAppId string = staticSite.id
output defaultHostname string = staticSite.properties.defaultHostname
