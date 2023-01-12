const joi = require('joi')
const createError = require('http-errors')
const validateRegister = (req, res, next)=>{
    const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(6).required(),
        name:  joi.string().min(4).required()
    })
   
    const {error, value} = schema.validate(req.body, {abortEarly: false})
    if(error){
        return next(new createError.Unauthorized(error.message))
     }
     next()
}

module.exports = {
    validateRegister
}