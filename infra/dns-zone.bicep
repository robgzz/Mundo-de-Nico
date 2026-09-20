targetScope = 'resourceGroup'

@description('Public DNS zone to create in Azure DNS. Zone only: no existing mail or validation records are replaced.')
param zoneName string = 'mundodenico.com'

@description('Common Azure tags.')
param tags object = {
  application: 'El Mundo de Nico Website'
  environment: 'production'
  managedBy: 'Bicep'
}

resource zone 'Microsoft.Network/dnsZones@2018-05-01' = {
  name: zoneName
  location: 'global'
  tags: tags
}

output dnsZoneId string = zone.id
output nameServers array = zone.properties.nameServers
