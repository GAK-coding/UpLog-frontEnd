// jest.config.ts
import { Config } from '@jest/types';

const config: Config.InitialOptions = {
  // some typed config
  testPathIgnorePatterns: [],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^components/(.*)': '<rootDir>/components/$1',
    '^pages/(.*)': '<rootDir>/pages/$1',
    '^api/(.*)': '<rootDir>/api/$1',
    '^hooks/(.*)': '<rootDir>/hooks/$1',
    '^layouts/(.*)': '<rootDir>/layouts/$1',
    '^recoil/(.*)': '<rootDir>/recoil/$1',
    '^typings/(.*)': '<rootDir>/typings/$1',
    '^tests/(.*)': '<rootDir>/tests/$1',
    '^utils/(.*)': '<rootDir>/utils/$1',
  },
};

export default config;
