const { Router } = require('express')
const orderControllers = require('../controllers/orderControllers')
const router = new Router()

// Create bid or ask order
router.post('/create_order', orderControllers.createOrder)

// Get all bid or ask orders for each user (UserID)
router.get('/get_user_orders/:id', orderControllers.getUserOrders)

// Get all bid or ask orders for each item (ItemID)
router.get('/get_item_orders/:id', orderControllers.getItemOrders)

// Get bid or ask order (OrderID)
router.get('/get_detail_order/:id', orderControllers.getDetailOrder)

// Get ask item price (ItemID)
router.get('/get_ask_price/:id', orderControllers.getAskPrice)

// Get bid item price (ItemID)
router.get('/get_bid_price/:id', orderControllers.getBidPrice)

// Update bid or ask order
router.post('/update_order', orderControllers.updateOrder)

// Delete bid or ask order
router.post('/delete_order', orderControllers.deleteOrder)

module.exports = router
