require('dotenv').config()
const express = require('express')
const createError = require('http-errors')
const app = express()
const PORT = process.env.PORT || 4000 
const bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors')

const routes = require('./src/routes')




app.use(cors())
app.use(bodyParser.json())
app.use(express.urlencoded({extended: false}))



// app.use('/member', memberRoute)
// app.use('/users', usersRoute)

app.use('/v1', routes)


app.all('*', (req, res, next)=>{
    next(new createError.NotFound('endpoint not found'))
})

app.use((err, req, res, next)=>{
    const message = err.message || "Internal Server Error"
    const statusCode = err.status || 500
    res.status(statusCode).json({
        message: message,
        statusCode: statusCode
    })
})

app.listen(PORT, ()=>{
    console.log(`server running port ${PORT}`);
})