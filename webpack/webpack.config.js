/* eslint-disable no-var */

var Config = require('webpack-config').default
var environment = require('webpack-config').environment

var envConfig

environment.setAll({
  env: function env() {
    return process.env.NODE_ENV
  },
})

envConfig = new Config().extend('webpack/config/[env].config.js')
module.exports = envConfig
