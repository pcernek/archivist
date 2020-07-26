module.exports = {
  verbose: true,
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testMatch: ['<rootDir>/**/*.test.(ts|tsx)'],
  roots: ['<rootDir>'],
  testURL: 'http://localhost',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/*', '<rootDir>/build/*'],
  transformIgnorePatterns: ['<rootDir>/node_modules/*', '<rootDir>/build/*'],
  globals: {
    'ts-jest': {
      skipBabel: true
    }
  },
  forceExit: true
}
