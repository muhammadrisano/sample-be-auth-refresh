const jwt = require('jsonwebtoken')
const generateToken = (payload)=>{
    const secretKey = process.env.SECRET_KEY_JWT
    const verifyOptions = { expiresIn: 60 }
    const token = jwt.sign(payload, secretKey, verifyOptions)
    return token
}

const generateRefreshToken = (payload)=>{
    const secretKey = process.env.SECRET_KEY_JWT
    const verifyOptions = { expiresIn: '1 day' }
    const token = jwt.sign(payload, secretKey, verifyOptions)
    return token
}

module.exports = {
    generateToken,
    generateRefreshToken
}