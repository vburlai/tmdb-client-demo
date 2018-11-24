'use strict'

const PORT = process.env.PORT || 8080

const http = require('http')
const assert = require('assert')
const secrets = require('./secrets.json')

assert('tmdb-auth-v3' in secrets, 'tmdb-auth-v3 missing in secrets.json')

const requestHandler = require('./app/server')
const server = http.createServer(requestHandler(secrets))

server.listen(PORT)

console.log(`Server listening to port ${PORT}`)
