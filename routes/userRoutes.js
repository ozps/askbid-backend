const { Router } = require('express')
const userControllers = require('../controllers/userControllers')
const router = new Router()

// Sign up
router.post('/sign_up', userControllers.signUp)

// Sign In
router.post('/sign_in', userControllers.signIn)

// Update profile
router.post('/update_profile', userControllers.updateProfile)

// Forget password (Send change_password to email)
router.post('/forget_password', userControllers.forgetPassword)

// Change password
router.post('/change_password', userControllers.changePassword)

// Verify user => Sent image of ID card to admin via email
router.post('/verify_user', userControllers.verifyUser)

module.exports = router
