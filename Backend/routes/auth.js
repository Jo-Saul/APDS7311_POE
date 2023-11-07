const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { isValidPassword } = require('../utils/hash');
const { User } = require('../models/user');

const ExpressBrute = require('express-brute');
//store memmory for persisting request counts
const store = new ExpressBrute.MemoryStore();
const bruteforce = new ExpressBrute(store);

//login - verifies user and password, returns jwt auth token
router.post('/', bruteforce.prevent ,async (req,res)=>{
    const user = await User.findOne({username: req.body.username});
    if (!user)
        return res.status(401).json({error: 'Incorrect username or password'});

    const valid = await isValidPassword(req.body.password, user.password);
    
    if (!valid)
        return res.status(401).json({error: 'Incorrect username or password'});
    
    try {
        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET_KEY);
        res.send({token});
    } catch (err) {
        return res.status(500).json({error: err.message});
    }
});



module.exports = router;
