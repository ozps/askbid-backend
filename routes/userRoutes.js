const { Router } = require('express')
const userControllers = require('../controllers/userControllers')
const router = new Router()

// Sign up
router.post('/sign_up', userControllers.signUp)

// Sign in
router.post('/sign_in', userControllers.signIn)

// Update profile
router.post('/update_profile', userControllers.updateProfile)

// Get detail user
router.post('/get_detail_user', userControllers.getDetailUser)

module.exports = router
