/// <reference types="vitest" />
import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    globals: true, // Enables the use of global variables in tests (e.g., `describe`, `it`, etc.)
    environment: 'jsdom', // Simulates a browser-like environment for testing (useful for React tests)
    testTimeout: 10000,  // Set a longer timeout value (10 seconds)
    coverage: {
      provider: 'istanbul', // Enables code coverage reporting
      reporter: ['text', 'json', 'html'], // Outputs coverage report in various formats
    },
    watch: false, // Set to true if you want Vitest to watch for changes and re-run tests
  },
})
