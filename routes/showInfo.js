const express = require('express')
const {newProduct, updateProfile, showData, deleteProfile, getSingleProductData} = require('../controllers/showInfo.js')
const auth = require("../middleware/auth");

const router = express.Router()

router.get('/all',auth, showData)
router.put('/update/:id',auth, updateProfile)
router.delete('/delete/:id',auth, deleteProfile )
router.get('/view/:id',auth, getSingleProductData)

module.exports = router