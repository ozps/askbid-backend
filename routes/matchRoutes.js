const { Router } = require('express')
const matchControllers = require('../controllers/matchControllers')
const router = new Router()

// Place order => Delete bid, ask order after payment
router.post('/place_order', matchControllers.placeOrder)

// Payment
router.post('/payment', matchControllers.payment)

module.exports = router
