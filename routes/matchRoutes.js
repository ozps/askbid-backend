const { Router } = require('express')
const matchControllers = require('../controllers/matchControllers')
const router = new Router()

// Place order
router.post('/place_order', matchControllers.placeOrder)

// Get all matches of an user
router.post('/get_user_match', matchControllers.getUserMatch)

// Get pending matches of an user
router.post('/get_pending_match', matchControllers.getPendingMatch)

// Get history of a match
router.post('/get_bill', matchControllers.getBill)

// Update shipping
router.post('/update_shipping', matchControllers.updateShipping)

module.exports = router
