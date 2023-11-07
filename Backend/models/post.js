//model for issue posts
const mongoose = require('mongoose')
const Joi = require('joi')

//post schema
const postschema = mongoose.Schema(
    {
        title: String,
        description: String,
        departments: String,
        progress: String,
        username: String
    }
)

const Post = mongoose.model('Post', postschema)

//function to validate post
function validatePost(post)
{
    const schema = Joi.object({
        title: Joi.string().min(3).max(50).required(),
        description: Joi.string().max(100).required(),
        departments: Joi.string().max(50).required(),
        progress:  Joi.string().max(50).required(),
        username: Joi.string().required()
    })
    return schema.validate(post)
}

module.exports = {Post, validatePost}