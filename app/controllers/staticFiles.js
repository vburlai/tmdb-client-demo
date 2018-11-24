'use strict'
const fs = require('fs')

const staticFileHandler = ({ url, response }) => {
    const path = `${__dirname}/../../${url.pathname}`
    if (fs.existsSync(path)) {
        const text = fs.readFileSync(path)

        let type = 'text/plain'
        if (path.substr(-3) === '.js') {
            type = 'application/javascript'
        }
        if (path.substr(-4) === '.css') {
            type = 'text/css'
        }

        response.writeHead(200, { 'Content-Type': type })
        response.write(text)
        response.end()
    } else {
        response.writeHead(404)
        response.end()
    }
}

module.exports = staticFileHandler
