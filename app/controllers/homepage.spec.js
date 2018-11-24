const controller = require('./homepage')
jest.mock('fs', () => ({
    readFileSync: jest.fn().mockReturnValue('index.html content'),
}))

describe('homepage', () => {
    let response

    beforeAll(() => {
        response = {
            writeHead: jest.fn(),
            write: jest.fn(),
            end: jest.fn(),
        }

        controller({ response })
    })

    test('should call writeHead(200, { headers })', () => {
        expect(response.writeHead).toHaveBeenCalledWith(200, {
            'Content-Type': 'text/html',
        })
    })

    test("should call write('index.html content')", () => {
        expect(response.write).toHaveBeenCalledWith('index.html content')
    })

    test('should call end()', () => {
        expect(response.end).toHaveBeenCalledWith()
    })
})
