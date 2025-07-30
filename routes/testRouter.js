const express = require("express")
const {testingController} = require('../controllers/testController')


//for create router object
const router = express.Router()


//Routes
router.get("/", testingController)


//export route
module.exports = router