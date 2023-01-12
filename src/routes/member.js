const exppress = require('express')
const { getMembers } = require('../controllers/members')
const { protect } = require('../middlewares/auth')
const {myMiddleware} = require('../middlewares/common')
const router = exppress.Router()

    router.get('/',myMiddleware, protect,  getMembers )

    module.exports = router
