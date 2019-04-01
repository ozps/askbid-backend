const connection = require('../models/dbConnection')

const placeOrder = (req, res) => {} // สร้าง Match, Update Order & User(+Admin), ส่ง Bill ทางอีเมล์

const getAllMatchs = (req, res) => {} // A list of all matches of user: UserID

const getDetailMatch = (req, res) => {} // A match consists of item info: MatchID

const payment = (req, res) => {} // จ่ายทั้งหมด => Update Match & User: MatchID, ส่ง Bill ทางอีเมล์

const received = (req, res) => {} // ได้รับสินค้าแล้ว => Update Match & User(Admin หักเงิน 3%), หาวิธีตั้งเวลา: MatchID

module.exports = {
    placeOrder,
    getAllMatchs,
    getDetailMatch,
    payment,
    received
}
