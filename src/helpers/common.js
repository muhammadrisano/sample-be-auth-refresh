const bcrypt = require('bcryptjs');

const generateHash = (password)=>{
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash
}

const compareHash = (password, passwordHash)=>{
    const result = bcrypt.compareSync(password, passwordHash); 
    return result
}

module.exports = {
    generateHash,
    compareHash
}