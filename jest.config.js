module.exports = {
    testURL: 'http://localhost',
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
        '^.+\\.tsx?$': 'ts-jest',
    },
    testRegex: '\\.spec\\.[jt]sx?$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'jsx', 'node'],
    moduleNameMapper: {
        '\\.css$': 'identity-obj-proxy',
    },
    setupTestFrameworkScriptFile: './test/setup.js',
    snapshotSerializers: ['enzyme-to-json'],
}
