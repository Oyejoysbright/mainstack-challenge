/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {

  collectCoverage: true,
  coverageDirectory: 'coverage',
  setupFilesAfterEnv: ['./__test__/config/setup.js'],
  globalSetup: "./__test__/config/config.js",
  globalTeardown: "./__test__/config/tear_down.js",

};
