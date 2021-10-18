'use strict'

const { Response } = require('./../utils/Response')
const { ErrorHandler } = require('./../utils/ErrorHandler')


class UtilController {
    /**
    * API | GET
    * Test Server.
    * @example { }
    * @param {*} req
    * @param {*} res
    */
   static async testServer (req, res) {
    try {
        return new Response(res, { success: true }, 'Server is live.', true)
    } catch (error) {
        ErrorHandler.sendError(res, error)
    }
}
}


module.exports = { UtilController }