const controller = require('./404')

describe('404', () => {
    let response

    beforeAll(() => {
        response = {
            writeHead: jest.fn(),
            write: jest.fn(),
            end: jest.fn(),
        }

        controller({ response })
    })

    test('should call writeHead(404)', () => {
        expect(response.writeHead).toHaveBeenCalledWith(404)
    })

    test('should call end()', () => {
        expect(response.end).toHaveBeenCalledWith()
    })
})
