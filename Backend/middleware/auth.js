//middle ware for user authentication
const jwt = require('jsonwebtoken')

//function to authenticate user by using ID in header
function auth(req, res, next)
{
    const token = req.header('x-auth-token')
    let id;
    
    try
    {
        const { userId } = jwt.verify(token, process.env.JWT_SECRET_KEY)
        id = userId
    }
    catch (err)
    {
        return res.sendStatus(401)
    }

    if (id)
    {
        req.user = { id };
        return next() 
    }
    res.sendStatus(401);
}

module.exports = auth;