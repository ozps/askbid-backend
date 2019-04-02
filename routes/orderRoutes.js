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

// Delete bid or ask order
router.post('/delete_order', orderControllers.deleteOrder)

module.exports = router
