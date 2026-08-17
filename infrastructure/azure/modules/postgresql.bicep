param location string
param name string
// Portfolio demonstration: declares the target resource identity without requiring local execution.
resource server 'Microsoft.DBforPostgreSQL/flexibleServers@2024-08-01'={name:name location:location sku:{name:'B_Standard_B1ms' tier:'Burstable'} properties:{version:'16' storage:{storageSizeGB:32}}}
output name string=server.name
