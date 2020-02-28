module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [
    '**/src/**/*.unit.ts',
    '**/src/**/*.unit.tsx',
    '**/src/**/*.integration.ts',
    '**/src/**/*.integration.tsx',
  ],
  setupFiles: ['<rootDir>/test-setup.js'],
};
