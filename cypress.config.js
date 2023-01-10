const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    defaultCommandTimeout: 10000,
    baseUrl: 'https://store.steampowered.com/',
    scrollBehavior: false,
    viewportWidth: 1440,
    viewportHeight: 800,
    testIsolation: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
