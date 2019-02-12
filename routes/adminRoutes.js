const { Router } = require('express')
const adminControllers = require('../controllers/adminControllers')
const router = new Router()
const multer = require('multer')
const path = require('path')
const storage = multer.diskStorage({
    destination: './public/images/',
    filename: (req, file, cb) => {
        cb(
            null,
            'sneaker' +
                String(req.body.itemID) +
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

// Get all list of image of cards
router.get('/get_all_list', adminControllers.getAllList)

// Verify
router.post('/verify', adminControllers.verify)

// Upload new item image
router.post('/upload_item_image', upload, (req, res) => {
    if (req.file) {
        return res.status(200).json({ status: 'success' })
    }
    return res.status(406).json({ status: 'fail' })
})

module.exports = router
