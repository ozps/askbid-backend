const { Router } = require('express')
const orderControllers = require('../controllers/orderControllers')
const router = new Router()

// Create bid or ask order
router.post('/create_order', orderControllers.createOrder)

// Get bid or ask order
router.get('/get_order/:id', orderControllers.getDetailOrder)

// Get ask item price
router.get('/get_ask_price/:id', orderControllers.getAskPrice)

// Get bid item price
router.get('/get_bid_price/:id', orderControllers.getBidPrice)

// Update bid or ask order
router.post('/update_order', orderControllers.updateOrder)

// Delete bid or ask order
router.post('/delete_order', orderControllers.deleteOrder)

module.exports = router
