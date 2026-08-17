targetScope='resourceGroup'
param location string=resourceGroup().location
param environmentName string='demo'
module monitoring './modules/monitoring.bicep'={name:'monitoring' params:{location:location name:'nexusops-${environmentName}-logs'}}
module database './modules/postgresql.bicep'={name:'database' params:{location:location name:'nexusops-${environmentName}-pg'}}
output monitoringId string=monitoring.outputs.id
output databaseName string=database.outputs.name
