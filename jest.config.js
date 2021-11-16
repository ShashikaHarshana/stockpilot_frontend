const config = {
  verbose: true,
  transform: {
    '.[jt]sx?$': 'babel-jest',
    '^.+\\.svg$': 'jest-svg-transformer'
    // '^.+.(ts|tsx)?$': 'ts-jest'
  },
  reporters: ['default', 'jest-html-reporters'],
  transformIgnorePatterns: [
    'node_modules/(?!(lightweight-charts|fancy-canvas)/)'
  ],
  coveragePathIgnorePatterns: ['/node_modules/', '.*.svg'],
  collectCoverage: true
}

module.exports = config
