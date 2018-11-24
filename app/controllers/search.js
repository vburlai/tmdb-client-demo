'use strict'

const fetch = require('node-fetch')

const requestUrl = ({ query, secrets }) =>
    'http://api.themoviedb.org/3/search/multi?' +
    `query=${encodeURIComponent(query)}&` +
    `api_key=${encodeURIComponent(secrets['tmdb-auth-v3'])}`

const searchHandler = ({ url, secrets, response }) => {
    const { query } = url.query
    if (!query) {
        response.writeHead(400)
        response.write('Missing query parameter')
        response.end()
    } else {
        const fetchUrl = requestUrl({ query: url.query.query, secrets })

        console.log(`Making request to ${fetchUrl}`)
        const startTime = +new Date()

        fetch(fetchUrl)
            .then(res => res.text())
            .then(text => {
                console.log(
                    `Response received within ${+new Date() - startTime}ms`
                )
                response.writeHead(200, { 'Content-Type': 'application/json' })
                response.write(text)
                response.end()
            })
            .catch(() => {
                response.writeHead(500)
                response.end()
            })
    }
}

module.exports = searchHandler
