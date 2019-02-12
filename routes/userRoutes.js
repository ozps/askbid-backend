const { Router } = require('express')
const userControllers = require('../controllers/userControllers')
const router = new Router()
const multer = require('multer')
const path = require('path')
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: (req, file, cb) => {
        cb(
            null,
            'UserCard-' +
                String(req.body.userID) +
                path.extname(file.originalname)
        )
    }
})
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
    fileFilter: (req, file, cb) => {
        if (path.extname(file.originalname) !== '.jpg') {
            req.fileExtError = 'Allow only .jpg'
            return cb(null, false, new Error('Allow only .jpg'))
        }
        cb(null, true)
    }
}).single('card')

// Sign up
router.post('/sign_up', userControllers.signUp)

// Sign in
router.post('/sign_in', userControllers.signIn)

// Update profile
router.post('/update_profile', userControllers.updateProfile)

// Get detail user
router.post('/get_detail_user', userControllers.getDetailUser)

// Upload user image
router.post('/upload_user_image', upload, (req, res) => {
    if (req.file) {
        return res.status(200).json({ status: 'success' })
    }
    return res.status(406).json({ status: 'fail' })
})

module.exports = router
