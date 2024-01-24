targetScope = 'resourceGroup'

param location string = resourceGroup().location
param envName string

// If set to development, Angular will run in development mode
@allowed(['production', 'development'])
param angularEnvironment string = 'production'
param appApiUrl string
param appBackgroundColor string

var productName = 'angular-environment-variables' // this is global fix

var appServicePlanName = 'plan-${productName}-linux-${envName}' // we expect this plan always exists!
var webAppName = 'app-${productName}-${envName}'

resource appServicePlan 'Microsoft.Web/serverfarms@2023-01-01' = {
  name: appServicePlanName
  location: location
  sku: {
    name: 'F1'
  }
  properties: {
    reserved: true
  }
  kind: 'linux'
}

resource webApp 'Microsoft.Web/sites@2023-01-01' = {
    name: webAppName
    location: location
    properties: {
        serverFarmId: appServicePlan.id
        siteConfig: {
          linuxFxVersion: 'NODE|18-LTS'
          appCommandLine: 'pm2 start /home/site/wwwroot/main.js --no-daemon'
          http20Enabled: true
          webSocketsEnabled: false
          autoHealEnabled: true
          detailedErrorLoggingEnabled: true
          ftpsState: 'Disabled'
        }
        httpsOnly: true
        clientAffinityEnabled: false
    }
}

resource webAppConnectionStrings 'Microsoft.Web/sites/config@2023-01-01' = {
  name: 'appsettings'
  parent: webApp
  properties: {
    ANGULAR_ENV: angularEnvironment
    API_URL: appApiUrl
    BACKGROUND_COLOR: appBackgroundColor
  }
}
