const { Router } = require('express')
const userControllers = require('../controllers/userControllers')
const router = new Router()
const fs = require('fs')
const multer = require('multer')
const path = require('path')
const storageCard = multer.diskStorage({
    destination: './public/cards/',
    filename: (req, file, cb) => {
        cb(
            null,
            'UserCard-' +
                String(req.body.userID) +
                path.extname(file.originalname)
        )
    }
})
const uploadCard = multer({
    storage: storageCard,
    limits: { fileSize: 1000000 },
    fileFilter: (req, file, cb) => {
        if (path.extname(file.originalname) !== '.jpg') {
            req.fileExtError = 'Allow only .jpg'
            return cb(null, false, new Error('Allow only .jpg'))
        }
        cb(null, true)
    }
}).single('card')
const storageAvatar = multer.diskStorage({
    destination: './public/avatars/',
    filename: (req, file, cb) => {
        cb(
            null,
            'UserAvatar-' +
                String(req.body.userID) +
                path.extname(file.originalname)
        )
    }
})
const uploadAvatar = multer({
    storage: storageAvatar,
    limits: { fileSize: 1000000 },
    fileFilter: (req, file, cb) => {
        if (path.extname(file.originalname) !== '.jpg') {
            req.fileExtError = 'Allow only .jpg'
            return cb(null, false, new Error('Allow only .jpg'))
        }
        cb(null, true)
    }
}).single('avatar')
const base64_encode = file => {
    let bitmap = fs.readFileSync(file)
    return new Buffer(bitmap).toString('base64')
}

// Sign up
router.post('/sign_up', userControllers.signUp)

// Sign in
router.post('/sign_in', userControllers.signIn)

// Update profile
router.post('/update_profile', userControllers.updateProfile)

// Get detail user
router.post('/get_detail_user', userControllers.getDetailUser)

// Upload user card image
router.post('/upload_card_image', uploadCard, (req, res) => {
    if (req.file) {
        return res.status(200).json({ status: 'success' })
    }
    return res.status(406).json({ status: 'fail' })
})

// Upload user avatar image
router.post('/upload_avatar_image', uploadAvatar, (req, res) => {
    if (req.file) {
        return res.status(200).json({ status: 'success' })
    }
    return res.status(406).json({ status: 'fail' })
})

module.exports = router
