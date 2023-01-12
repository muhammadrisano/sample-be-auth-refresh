const jwt = require('jsonwebtoken')
const protect = (req, res, next)=>{
    try {
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            const token =  req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.SECRET_KEY_JWT)
            req.decoded = decoded
            return next()
        }else{
            res.status(401).json({
                message: 'server need token'
            })
        }
    } catch (error) {

        if(error && error.name === 'TokenExpiredError'){
            res.status(401).json({
                message: 'token expired'
            })
        }else if(error && error.name === 'JsonWebTokenError'){
            res.status(401).json({
                message: 'token invalid'
            })
        }else{
            res.status(401).json({
                message: 'token not active'
            })
        }
    }
}

module.exports = {
    protect
}