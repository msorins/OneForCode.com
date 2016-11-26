'use strict'

var isPathInside = require('is-path-inside')
var globalBinPath = require('global-bin-path')

module.exports = function () {
  return isPathInside(process.argv[1] || '', globalBinPath() || '')
}
