'use strict'

const errorHandler = ({ response }) => {
    response.writeHead(404)
    response.end()
}

module.exports = errorHandler
