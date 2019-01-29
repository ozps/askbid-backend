const { Router } = require('express')
const router = new Router()

router.get('/', (req, res, next) => {
    res.json('Test Route')
})

module.exports = router
