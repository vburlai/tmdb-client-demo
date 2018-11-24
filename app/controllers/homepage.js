'use strict'
const fs = require('fs')

const homepageHandler = ({ response }) => {
    const text = fs.readFileSync(`${__dirname}/../../pub/index.html`)
    response.writeHead(200, { 'Content-Type': 'text/html' })
    response.write(text)
    response.end()
}

module.exports = homepageHandler
