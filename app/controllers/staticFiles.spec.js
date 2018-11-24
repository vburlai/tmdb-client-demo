const controller = require('./staticFiles')
jest.mock('fs', () => ({
    readFileSync: jest.fn().mockReturnValue('file content'),
    existsSync: jest.fn().mockReturnValue(true),
}))
const fs = require('fs')

describe('staticFiles', () => {
    let response
    let url

    beforeAll(() => {
        response = {
            writeHead: jest.fn(),
            write: jest.fn(),
            end: jest.fn(),
        }
    })

    describe('[url.pathname === index.js]', () => {
        beforeAll(() => {
            url = { pathname: '/index.js' }

            controller({ url, response })
        })

        test('should call fs.fileExists()', () => {
            expect(fs.existsSync).toHaveBeenCalled()
        })

        test('should call writeHead(200, { headers })', () => {
            expect(response.writeHead).toHaveBeenCalledWith(200, {
                'Content-Type': 'application/javascript',
            })
        })

        test("should call write('file content')", () => {
            expect(response.write).toHaveBeenCalledWith('file content')
        })

        test('should call end()', () => {
            expect(response.end).toHaveBeenCalledWith()
        })
    })

    describe('[url.pathname === index.css]', () => {
        beforeAll(() => {
            url = { pathname: '/index.css' }

            controller({ url, response })
        })

        test('should call writeHead(200, { headers })', () => {
            expect(response.writeHead).toHaveBeenCalledWith(200, {
                'Content-Type': 'text/css',
            })
        })

        test("should call write('file content')", () => {
            expect(response.write).toHaveBeenCalledWith('file content')
        })

        test('should call end()', () => {
            expect(response.end).toHaveBeenCalledWith()
        })
    })

    describe('[url.pathname is not CSS/JS]', () => {
        beforeAll(() => {
            url = { pathname: '/index.other' }

            controller({ url, response })
        })

        test('should call writeHead(200, { headers })', () => {
            expect(response.writeHead).toHaveBeenCalledWith(200, {
                'Content-Type': 'text/plain',
            })
        })

        test("should call write('file content')", () => {
            expect(response.write).toHaveBeenCalledWith('file content')
        })

        test('should call end()', () => {
            expect(response.end).toHaveBeenCalledWith()
        })
    })
})
