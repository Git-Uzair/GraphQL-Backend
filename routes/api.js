'use strict'

const { Router } = require('express')
const { UtilController } = require('./../controllers/UtilController')

const router = new Router()

/** ALL THE API END POINTS GO HERE */

router.get('/test', UtilController.testServer)

module.exports = router