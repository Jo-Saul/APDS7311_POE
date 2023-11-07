//model for user
const mongoose = require('mongoose')
const Joi = require('joi')

//user schema
const userSchema = mongoose.Schema(
    {
        username: {type: String, unique:true},
        password: String,
        firstname: String,
        lastname: String,
        contact: String
    }
)

const User = mongoose.model('User', userSchema);

//function to validate user
function validateUser(user)
{
    const schema = Joi.object({
        username: Joi.string().min(3).max(50).required(),
        password: Joi.string().min(3).max(50).required(),
        firstname: Joi.string().max(50).required(),
        lastname: Joi.string().max(50).required(),
        contact: Joi.string().max(20).required()
    })
    return schema.validate(user)
}

module.exports = {User, validateUser}

