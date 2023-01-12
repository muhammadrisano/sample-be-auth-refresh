const pool = require('../config/db')
const findByEmail = (email)=>{
    return new Promise((resolve, reject)=>{
        pool.query(`SELECT * FROM users WHERE email = $1`, [email], (error, result)=>{
            if(!error){
                resolve(result)
            }else{
                reject(error)
            }
        })
    })
   
}

const create = ({id, name, email, password})=>{
    return new Promise((resolve, reject)=>{
        pool.query('INSERT INTO users(id, name, email, password)VALUES($1, $2, $3, $4)', [id, name, email, password], (error, result)=>{
            if(!error){
                resolve(result)
            }else{
                reject(error)
            }
        })
    })
}

module.exports = {
    findByEmail,
    create
}