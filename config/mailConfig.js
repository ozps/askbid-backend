const keys = require('./keys')
const nodemailer = require('nodemailer')

const mailUser = 'askbid.se@gmail.com'

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: mailUser,
        pass: keys.mailPass
    }
})

module.exports = {
    mailUser,
    transporter
}
