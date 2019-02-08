const { Router } = require('express')
const adminControllers = require('../controllers/adminControllers')
const router = new Router()

// Get all list of image of cards
router.get('/get_all_list', adminControllers.getAllList)

// Verify
router.post('/verify', adminControllers.verify)

module.exports = router
