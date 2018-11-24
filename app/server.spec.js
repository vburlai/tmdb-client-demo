const server = require('./server')
jest.mock('url', () => ({ parse: jest.fn() }))
jest.mock('./controllers/search', () => jest.fn())
jest.mock('./controllers/404', () => jest.fn())
jest.mock('./controllers/homepage', () => jest.fn())
jest.mock('./controllers/staticFiles', () => jest.fn())
const url = require('url')
const searchHandler = require('./controllers/search')
const errorHandler = require('./controllers/404')
const homepageHandler = require('./controllers/homepage')
const staticFilesHandler = require('./controllers/staticFiles')

describe('server', () => {
    const secrets = {
        key: 'secret',
    }
    let pathname

    describe('[pathname starts with /pub/]', () => {
        beforeAll(() => {
            pathname = '/pub/test.html'
            url.parse.mockReturnValue({
                pathname,
            })
            server(secrets)('request', 'response')
        })

        test('should call staticFilesHanlder()', () => {
            expect(staticFilesHandler).toHaveBeenCalledWith({
                request: 'request',
                response: 'response',
                secrets: { key: 'secret' },
                url: { pathname },
            })
        })
    })

    describe("[pathname === '/']", () => {
        beforeAll(() => {
            pathname = '/'
            url.parse.mockReturnValue({
                pathname,
            })
            server(secrets)('request', 'response')
        })

        test('should call homepageHandler()', () => {
            expect(homepageHandler).toHaveBeenCalledWith({
                request: 'request',
                response: 'response',
                secrets: { key: 'secret' },
                url: { pathname },
            })
        })
    })

    describe("[pathname === '/api/search']", () => {
        beforeAll(() => {
            pathname = '/api/search'
            url.parse.mockReturnValue({
                pathname,
            })
            server(secrets)('request', 'response')
        })

        test('should call searchHandler()', () => {
            expect(searchHandler).toHaveBeenCalledWith({
                request: 'request',
                response: 'response',
                secrets: { key: 'secret' },
                url: { pathname },
            })
        })
    })

    describe('[other pathname]', () => {
        beforeAll(() => {
            pathname = '/other'
            url.parse.mockReturnValue({
                pathname,
            })
            server(secrets)('request', 'response')
        })

        test('should call errorHandler()', () => {
            expect(errorHandler).toHaveBeenCalledWith({
                request: 'request',
                response: 'response',
                secrets: { key: 'secret' },
                url: { pathname },
            })
        })
    })
})
