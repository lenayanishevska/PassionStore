const Router = require('express')
const userRouter = require('./UserRouter')

const router = new Router()

router.use('/users', userRouter)

module.exports = router