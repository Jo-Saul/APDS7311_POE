const bcrypt = require('bcrypt')

//function to hash password
async function hashPassword(password)
{
    const salt = await bcrypt.genSalt(10)
    const hashed = bcrypt.hash(password, salt)
    return hashed
}

//function to validate password
async function isValidPassword(password, hash)
{
    return await bcrypt.compare(password, hash)
}

module.exports = {hashPassword, isValidPassword}