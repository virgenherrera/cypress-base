import { defineConfig } from 'cypress';
import environment from './utils/environment.util';

export const CypressConfig = defineConfig({
  e2e: {
    userAgent: 'axios/0.18.0',
    baseUrl: environment.e2eBaseUrl,
    video: false,
  },
  reporter: 'mochawesome',
  reporterOptions: {
    reportFilename: '[datetime]-[name]-report',
  },
  retries: {
    runMode: 3,
    openMode: 2,
  },
});
