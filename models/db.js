const mongoose = require('mongoose');
const dotenv = require('dotenv')

dotenv.config()

mongoose.connect(process.env.MONGO_CONNECTION,{ useNewUrlParser: true } ,  err => {
    if(!err){console.log('Database connection successful.');}
    else{console.log('database connection error: ' + err);}
});

require('./catelog.model');