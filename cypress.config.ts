import { defineConfig } from 'cypress';
import { configDotenv } from 'dotenv';
import path from 'path';

configDotenv();

export default defineConfig({
  component: {
    specPattern: 'src/**/test/**/*.cy.{ts,tsx}',
    devServer: {
      framework: 'next',
      bundler: 'webpack',
      webpackConfig: {
        resolve: {
          alias: {
            '@components': path.resolve(__dirname, './src/components'),
            '@public': path.resolve(__dirname, './public'),
            '@hooks': path.resolve(__dirname, './src/hooks'),
            '@utils': path.resolve(__dirname, './src/utils'),
            '@services': path.resolve(__dirname, './src/services'),
            '@context': path.resolve(__dirname, './src/context'),
            '@dictionaries': path.resolve(__dirname, './src/dictionaries'),
            '@app-types': path.resolve(__dirname, './src/types'),
          },
        },
      },
    },
  },
  video: false,
  screenshotOnRunFailure: true,
  chromeWebSecurity: false,
  viewportHeight: 720,
  viewportWidth: 1024,
});
