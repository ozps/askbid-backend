const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const expressJwt = require('express-jwt')
const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerDocument = YAML.load('./swagger.yaml')
const cors = require('cors')
const keys = require('./config/keys')
require('./models/dbConnection')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(
    expressJwt({ secret: keys.secretKey }).unless({
        path: [
            // Public routes that don't require authentication
            /\/item*/,
            /\/images*/,
            /\/order\/get_ask_price*/,
            /\/order\/get_bid_price*/,
            '/user/sign_in',
            '/user/sign_up',
            '/user/forget_password',
            /\/api-docs*/
        ]
    })
)

app.use('/', require('./routes'))
app.use('/item', require('./routes/itemRoutes'))
app.use('/order', require('./routes/orderRoutes'))
app.use('/user', require('./routes/userRoutes'))
app.use('/match', require('./routes/matchRoutes'))

// Static Files
app.use(express.static('public'))
// <img src="http://localhost:5000/images/id1.jpeg" />

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`server started at port ${PORT}.`))
