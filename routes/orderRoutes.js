const { Router } = require('express')
const orderControllers = require('../controllers/orderControllers')
const router = new Router()

// Create bid or ask order
router.post('/create_order', orderControllers.createOrder)

// Get all orders
router.get('/get_all_orders', orderControllers.getAllOrders)

// Get all bid or ask orders for each user (userId)
router.get('/get_user_orders/:id', orderControllers.getUserOrders)

// Get all bid or ask orders for each item (itemId)
router.get('/get_item_orders/:id', orderControllers.getItemOrders)

// Get bid or ask order (orderId)
router.get('/get_order/:id', orderControllers.getOrder)

// Update bid or ask order
router.post('/update_order', orderControllers.updateOrder)

// Update order available
router.post('/out_of_stock', orderControllers.outOfStock)

// Delete bid or ask order
router.post('/delete_order', orderControllers.deleteOrder)

// Get ask price (itemId)
router.get('/get_ask_price/:id', orderControllers.getAskPrice)

// Get bid price (itemId)
router.get('/get_bid_price/:id', orderControllers.getBidPrice)

module.exports = router
