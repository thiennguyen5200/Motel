const jwt = require('jsonwebtoken')
const PRIVATE_KEY = 'chuoibaomatnaodo'

async function sign(obj){
    return jwt.sign(obj,PRIVATE_KEY,{expiresIn: "2 days"})
}
async function verify(token){
    try{
        const decoded = jwt.verify(token, PRIVATE_KEY)
        delete decoded.iat
        delete decoded.exp
        return decoded
    }
    catch(err){ throw new Error(err.message)}
}

module.exports = {sign,verify}