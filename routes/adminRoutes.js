const { Router } = require('express')
const adminControllers = require('../controllers/adminControllers')
const router = new Router()
const fs = require('fs')
const multer = require('multer')
const path = require('path')
const gm = require('gm')

const storage = multer.diskStorage({
    destination: './public/images/',
    filename: (req, file, cb) => {
        cb(
            null,
            'sneaker_' +
                String(req.body.itemId) +
                path.extname(file.originalname)
        )
    }
})

const upload = multer({
    storage: storage,
    limits: { fileSize: 1 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        if (path.extname(file.originalname) !== '.jpg') {
            req.fileExtError = 'Allow only .jpg'
            return cb(null, false, new Error('Allow only .jpg'))
        }
        cb(null, true)
    }
}).single('image')

const base64_encode = file => {
    let bitmap = fs.readFileSync(file)
    return new Buffer(bitmap).toString('base64')
}

// Get all cards
router.post('/get_all_cards', adminControllers.getAllCards)

// Get user card image
router.post('/get_card_image', (req, res) => {
    if (adminControllers.checkAdmin(req.body.level)) {
        let pathImg = __dirname + '/../public/cards/' + req.body.cardImage
        if (fs.existsSync(pathImg)) {
            res.status(200).json({
                status: 'success',
                image64: base64_encode(pathImg)
            })
        } else res.status(404).json({ status: 'fail' })
    } else res.status(401).json({ status: 'fail' })
})

// Verify
router.post('/verify', adminControllers.verify)

// Ban
router.post('/ban', adminControllers.ban)

// Add new item
router.post('/add_item', adminControllers.addItem)

// Upload new item image
router.post('/upload_item_image', upload, (req, res) => {
    if (req.file) {
        let fileName =
            'sneaker_' +
            String(req.body.itemId) +
            path.extname(req.file.originalname)
        adminControllers.addImage(fileName, req.body.itemId)
        gm('./public/images/' + fileName)
            .resize(1100, 740, '!')
            .write('./public/images/' + fileName, error => {
                if (!error) {
                    console.log('Image resized')
                }
            })

        return res.status(200).json({ status: 'success' })
    }
    return res.status(406).json({ status: 'fail' })
})

module.exports = router
