const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const expressJwt = require('express-jwt')
const path = require('path')
const multer = require('multer')
const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerDocument = YAML.load('./swagger.yaml')
const cors = require('cors')
const keys = require('./config/keys')
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
require('./models/dbConnection')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(
    expressJwt({ secret: keys.secretKey }).unless({
        path: [
            /\/item*/,
            /\/images*/,
            /\/order\/get_ask_price*/,
            /\/order\/get_bid_price*/,
            '/user/sign_in',
            '/user/sign_up',
            /\/api-docs*/
        ]
    })
)
app.use('/', require('./routes'))
app.use('/item', require('./routes/itemRoutes'))
app.use('/user', require('./routes/userRoutes'))
app.use('/admin', require('./routes/adminRoutes'))
app.use('/order', require('./routes/orderRoutes'))
app.use('/match', require('./routes/matchRoutes'))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use(express.static('public'))

app.post('/upload', upload, (req, res) => {
    if (req.file) {
        return res.status(200).json({ status: 'success' })
    }
    return res.status(406).json({ status: 'fail' })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`server started at port ${PORT}.`))
