const controller = require('./search')
jest.mock('node-fetch', () =>
    jest.fn().mockReturnValue(Promise.resolve({ text: () => 'Response' }))
)
const fetch = require('node-fetch')

describe('search', () => {
    let response
    let secrets
    let oldConsole

    beforeAll(() => {
        response = {
            writeHead: jest.fn(),
            write: jest.fn(),
            end: jest.fn(),
        }
        secrets = {
            'tmdb-auth-v3': 'secret',
        }
        oldConsole = global.console
        global.console = {
            log: jest.fn(),
        }
    })

    afterAll(() => {
        global.console = oldConsole
    })

    describe("[query === '']", () => {
        let url
        beforeAll(() => {
            url = {
                query: '',
            }
            controller({ url, secrets, response })
        })

        test('should call writeHead(400)', () => {
            expect(response.writeHead).toHaveBeenCalledWith(400)
        })

        test("should call write('Missing query parameter')", () => {
            expect(response.write).toHaveBeenCalledWith(
                'Missing query parameter'
            )
        })

        test('should call end()', () => {
            expect(response.end).toHaveBeenCalledWith()
        })
    })

    describe("[query !== '']", () => {
        let url
        beforeAll(() => {
            url = {
                query: {
                    query: 'query',
                },
            }
            controller({ url, secrets, response })
        })

        test("should call console.log('Makeing request')", () => {
            expect(global.console.log).toHaveBeenCalledWith(
                'Making request to http://api.themoviedb.org/3/search/multi?query=query&api_key=secret'
            )
        })

        test('should call fetch', () => {
            expect(fetch).toHaveBeenCalledWith(
                'http://api.themoviedb.org/3/search/multi?query=query&api_key=secret'
            )
        })

        test('should call writeHead(200, { headers })', () => {
            expect(response.writeHead).toHaveBeenCalledWith(200, {
                'Content-Type': 'application/json',
            })
        })

        test("should call write('Response')", () => {
            expect(response.write).toHaveBeenCalledWith('Response')
        })

        test('should call end()', () => {
            expect(response.end).toHaveBeenCalledWith()
        })
    })
})
