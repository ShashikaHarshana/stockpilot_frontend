const config = {
  verbose: true,
  transform: {
    '.[jt]sx?$': 'babel-jest',
    '^.+\\.svg$': 'jest-svg-transformer'
    // '^.+.(ts|tsx)?$': 'ts-jest'
  },
  reporters: ['default', 'jest-html-reporters'],
  coveragePathIgnorePatterns: [],
  collectCoverage: true
}

module.exports = config
