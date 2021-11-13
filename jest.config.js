const config = {
  verbose: true,
  transform: {
    '.[jt]sx?$': 'babel-jest'
    // '^.+.(ts|tsx)?$': 'ts-jest'
  },
  reporters: ['default', 'jest-html-reporters'],
  coveragePathIgnorePatterns: []
}

module.exports = config
