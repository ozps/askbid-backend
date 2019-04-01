const { Router } = require('express')
const matchControllers = require('../controllers/matchControllers')
const router = new Router()

// Place order
router.post('/place_order', matchControllers.placeOrder)

// Get all matches of a user
router.post('/get_all_matchs', matchControllers.getAllMatchs)

// Get history of a match
router.post('/get_detail_match', matchControllers.getDetailMatch)

// Payment
router.post('/payment', matchControllers.payment)

// Received
router.post('/received', matchControllers.received)

module.exports = router
