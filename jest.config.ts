// // jest.config.ts
// import { Config } from '@jest/types';
//
// const config: Config.InitialOptions = {
//   // 테스트를 수행할 파일 경로를 지정합니다. 일반적으로 "__tests__" 디렉토리나 "**/*.test.(js|jsx|ts|tsx)"와 같은 형식을 사용합니다.
//   testMatch: ['**/*.test.(ts|tsx)'],
//
//   // 테스트를 위해 Jest가 사용할 환경을 설정합니다. 예를 들어 "jsdom"은 브라우저 환경을 에뮬레이트합니다.
//   testEnvironment: 'node',
//
//   // Jest가 TypeScript 코드를 해석할 수 있도록 "ts-jest" 패키지를 사용합니다.
//   transform: {
//     '^.+\\.(ts|tsx)$': 'ts-jest',
//   },
//
//   // some typed config
//   moduleNameMapper: {
//     // '^@/(.*)$': '<rootDir>/src/$1',
//     '^components/(.*)$': '<rootDir>/src/components/$1',
//     '^pages/(.*)$': '<rootDir>/src/pages/$1',
//     '^api/(.*)$': '<rootDir>/src/api/$1',
//     '^hooks/(.*)': '<rootDir>/src/hooks/$1',
//     '^layouts/(.*)': '<rootDir>/src/layouts/$1',
//     '^recoil/(.*)': '<rootDir>/src/recoil/$1',
//     '^typings/(.*)': '<rootDir>/src/typings/$1',
//     '^tests/(.*)': '<rootDir>/src/tests/$1',
//     '^utils/(.*)': '<rootDir>/src/utils/$1',
//   },
// };
//
// export default config;
