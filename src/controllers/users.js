const { generateHash, compareHash } = require("../helpers/common")
const { findByEmail, create } = require("../models/users")
const { v4: uuidv4 } = require('uuid');
const { generateToken, generateRefreshToken } = require("../helpers/authentication");
const createError = require('http-errors')
const jwt = require('jsonwebtoken')


const login= async(req, res, next)=>{

    

    const {email, password} = req.body
    const {rows: result} = await findByEmail(email)
    const user = result[0]

    if(!user){
    //    return next(createError(401, 'username atau password salah'))
    return next( new createError.InternalServerError())
    }
    
    const validPassword = compareHash(password,user.password)
    if(!validPassword){
        return res.json({
            message: 'username or password salah'
        })
    }
    const token = generateToken({
        email: email
    })

    const refreshTokem = generateRefreshToken({
        email
    })

    delete user.password
    res.json({
        message: 'login success',
        data: {
            ...user,
            token,
            refreshTokem
        }
    })

}
const register = async(req, res, next)=>{
    try {


    // cek email sudah terdaftar atau belum
    const {name, email, password} = req.body
    const user = await findByEmail(email)


  
    if(user.rowCount !== 0){
        return res.json({
            message: 'user sudah terdaftar'
        })
    }
    const passwordHash = generateHash(password)
    await create({
        id: uuidv4(),
        name: name,
        password:passwordHash,
        email: email
    })
    res.json({
        message: 'succcess resgitesr',
        data: {
            name,
            email
        }
    })
    } catch (error) {
        console.log(error);
        res.json({
            message: 'faild resgister',
        })
    }
}

const refreshToken = (req, res)=>{
    const refreshToken = req.body.resfreshToken
    const decode = jwt.verify(refreshToken, process.env.SECRET_KEY_JWT)
    
    const newToken = generateToken({email: decode.email})
    const newRefreshToken = generateRefreshToken({email: decode.eamil})

    res.json({
        message: 'success',
        data: {
            token: newToken,
            refreshToken: newRefreshToken
        }
    })
}
// hash
// -> 1 arah
// abc123 -> 1faklj23rkfdaksdfn324fdsaf
// enkripsi
// -> 2 arah

// enkripsi ------------>
// <------------ dekripsi

// abc123 -> 234sfkdjaoi34nknfdskf34sdf
// 234sfkdjaoi34nknfdskf34sdf -> abc123
const data ={
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJpc2Fub0BnbWFpbC5jb20iLCJpYXQiOjE2NzA0MDExODksImV4cCI6MTY3MDQ0NDM4OX0.rDXhHsy2sN8OD-HLSeXkRnqNLbmnVsSZeN6PdVZtfI8",
        "refreshTokem": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJpc2Fub0BnbWFpbC5jb20iLCJpYXQiOjE2NzA0MDExODksImV4cCI6MTY3MDQ4NzU4OX0.M0jPuyAyL7p4fyL0gXtvdvWmrFefMrCjh_DN3tg94UU"
}

module.exports = {
    login,
    register,
    refreshToken
}