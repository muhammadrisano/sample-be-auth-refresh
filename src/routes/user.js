const express = require('express')
const router = express.Router()
const {login, register, refreshToken} = require('../controllers/users')
const {validateRegister} = require('../middlewares/validate')
    router
    .post('/login', login)
    .post('/register',validateRegister, register)
    .post('/refresh-token', refreshToken)
    

module.exports = router