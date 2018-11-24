'use strict'

const URL = require('url')
const searchHandler = require('./controllers/search')
const errorHandler = require('./controllers/404')
const homepageHandler = require('./controllers/homepage')
const staticFilesHandler = require('./controllers/staticFiles')

const requestHandler = secrets => (request, response) => {
    const url = URL.parse(request.url, true)
    const context = { url, secrets, request, response }

    if (url.pathname.substring(0, 5) === '/pub/') {
        staticFilesHandler(context)
    } else {
        switch (url.pathname) {
            case '/':
                homepageHandler(context)
                break

            case '/api/search':
                searchHandler(context)
                break

            default:
                errorHandler(context)
                break
        }
    }
}

module.exports = requestHandler
