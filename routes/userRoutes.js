const { Router } = require('express')
const userControllers = require('../controllers/userControllers')
const router = new Router()
const multer = require('multer')
const path = require('path')
const gm = require('gm')

const storageCard = multer.diskStorage({
    destination: './public/cards/',
    filename: (req, file, cb) => {
        cb(null, String(req.body.img_name) + path.extname(file.originalname))
    }
})

const uploadCard = multer({
    storage: storageCard,
    limits: { fileSize: 1 * 1024 * 1024 },
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
        cb(null, String(req.body.img_name) + path.extname(file.originalname))
    }
})

const uploadAvatar = multer({
    storage: storageAvatar,
    limits: { fileSize: 1 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        if (path.extname(file.originalname) !== '.jpg') {
            req.fileExtError = 'Allow only .jpg'
            return cb(null, false, new Error('Allow only .jpg'))
        }
        cb(null, true)
    }
}).single('avatar')

// Sign up
router.post('/sign_up', userControllers.signUp)

// Sign in
router.post('/sign_in', userControllers.signIn)

// Get profile
router.post('/get_profile', userControllers.getProfile)

// Update profile
router.post('/update_profile', userControllers.updateProfile)

// Upload avatar image
router.post('/upload_avatar', uploadAvatar, (req, res) => {
    if (req.file) {
        let fileName =
            String(req.body.img_name) + path.extname(req.file.originalname)
        userControllers.addAvatar(fileName, req.body.userId)
        gm('./public/avatars/' + fileName)
            .resize(180, 180, '!')
            .write('./public/avatars/' + fileName, error => {
                if (!error) console.log('resized')
            })
        return res.status(200).json({ status: 'success' })
    }
    return res.status(406).json({ status: 'fail' })
})

// Upload card image
router.post('/upload_card', uploadCard, (req, res) => {
    if (req.file) {
        let fileName =
            String(req.body.img_name) + path.extname(req.file.originalname)
        userControllers.addCard(fileName, req.body.userId)
        gm('./public/cards/' + fileName)
            .resize(450, 300, '!')
            .write('./public/cards/' + fileName, error => {
                if (!error) console.log('resized')
            })
        return res.status(200).json({ status: 'success' })
    }
    return res.status(406).json({ status: 'fail' })
})

module.exports = router
