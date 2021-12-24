const express = require('express')
const {newUser,checkUser} = require('../controllers/booking.js')

const router = express.Router()

router.post('/signup', newUser)
router.post('/login', checkUser)

module.exports = router