require('dotenv').config();
const express = require('express')
const app = express()
const https = require('https')
const fs = require('fs');
const cors = require('cors')
const hsts = require('./middleware/hsts')
const mongoose = require('mongoose')
const helmet = require('helmet');
const morgan = require('morgan');

//Mongo DB connection
mongoose.connect(process.env.MONGO_CONNECTION)
.then(()=>
{
    console.log('Connected...')
})
.catch(()=>
{
    console.log('NOT connected...')
})

//Middleware
app.use(cors({origin: 'http://localhost:4200', optionsSuccessStatus: 200}))
app.use(express.json())
app.use(hsts)
app.use((req, res, next) =>
{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader
    (
        "Access-Control-Allow-Headers",  
        "Origin, X-Requested-With, Content-Type, Accept, Authorization" 
    );
    res.setHeader("Access-Control-Allow-Methods", "*");
    next();
});
app.use(helmet());
app.use(morgan('tiny'));

//Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/user'));
app.use('/api/post', require('./routes/post'));

//Listen
https.createServer({
    key: fs.readFileSync('./keys/privatekey.pem'),
    cert: fs.readFileSync('./keys/certificate.pem'),
    passphrase: 'apds',
}, app).listen(3000);
