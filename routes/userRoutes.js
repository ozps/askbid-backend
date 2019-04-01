const { Router } = require('express')
const userControllers = require('../controllers/userControllers')
const router = new Router()
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const gm = require('gm')

const storageCard = multer.diskStorage({
    destination: './public/cards/',
    filename: (req, file, cb) => {
        cb(
            null,
            'card_' + String(req.body.userId) + path.extname(file.originalname)
        )
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
        cb(
            null,
            'avatar_' +
                String(req.body.userId) +
                path.extname(file.originalname)
        )
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
        let random = Math.random()
            .toString(36)
            .substring(7)
        let rawName =
            'avatar_' +
            String(req.body.userId) +
            path.extname(req.file.originalname)
        let fileName =
            'avatar_' +
            String(req.body.userId) +
            '_' +
            random +
            path.extname(req.file.originalname)
        userControllers.addCard(fileName, req.body.userId)
        gm('./public/avatars/' + rawName)
            .resize(180, 180, '!')
            .write('./public/avatars/' + fileName, error => {
                if (!error) {
                    console.log('Image resized')
                    fs.unlink('./public/avatars/' + rawName, err => {
                        if (err) throw err
                        console.log('Raw deleted!')
                    })
                }
            })

        return res.status(200).json({ status: 'success' })
    }
    return res.status(406).json({ status: 'fail' })
})

// Upload card image
router.post('/upload_card', uploadCard, (req, res) => {
    if (req.file) {
        let random = Math.random()
            .toString(36)
            .substring(7)
        let rawName =
            'card_' +
            String(req.body.userId) +
            path.extname(req.file.originalname)
        let fileName =
            'card_' +
            String(req.body.userId) +
            '_' +
            random +
            path.extname(req.file.originalname)
        userControllers.addCard(fileName, req.body.userId)
        gm('./public/cards/' + rawName)
            .resize(450, 300, '!')
            .write('./public/cards/' + fileName, error => {
                if (!error) {
                    console.log('Image resized')
                    fs.unlink('./public/cards/' + rawName, err => {
                        if (err) throw err
                        console.log('Raw deleted!')
                    })
                }
            })

        return res.status(200).json({ status: 'success' })
    }
    return res.status(406).json({ status: 'fail' })
})

module.exports = router
