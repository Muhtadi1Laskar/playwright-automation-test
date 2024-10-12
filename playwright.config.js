import { defineConfig, devices } from '@playwright/test';


export default defineConfig({
  testDir: './tests',
  // globalSetup: './global-setup.js',
  fullyParallel: true,
  timeout: 60000000,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'list',
  use: {
    baseURL: "https://www.rokomari.com/",
    storageState: "storage/storageState.json",
    headless: false,
    viewport:{width:1280, height:720},
    actionTimeout: 60000000,
    ignoreHTTPSErrors: true,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: "chromium",
      use: { 
        browserName: 'chromium',
      }
    },
  ]
});

