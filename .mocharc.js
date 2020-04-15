'use strict';

module.exports = {
  diff: true,
  colors: true,
  extension: ['js'],
  package: './package.json',
  timeout: 60000,
  ui: 'bdd',
  reporter: 'mochawesome',
  'reporter-option': [
    'overwrite=true',
    'json=false',
    'reportTitle=Testes de API',
    'reportDir=./output',
    'reportFilename=test-results'
  ],
};