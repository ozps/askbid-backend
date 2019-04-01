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
            /\/item*/,
            /\/images*/,
            /\/avatars*/,
            /\/order\/get_ask_price*/,
            /\/order\/get_bid_price*/,
            '/user/sign_in',
            '/user/sign_up',
            /\/api-docs*/
        ]
    })
)
app.use('/', require('./routes'))
app.use('/user', require('./routes/userRoutes'))
app.use('/item', require('./routes/itemRoutes'))
app.use('/admin', require('./routes/adminRoutes'))
app.use('/order', require('./routes/orderRoutes'))
app.use('/match', require('./routes/matchRoutes'))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use(express.static('public'))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`server started at port ${PORT}.`))
