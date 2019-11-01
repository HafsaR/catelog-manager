const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/CatelogDB',{ useNewUrlParser: true } ,  err => {
    if(!err){console.log('Database connection successful.');}
    else{console.log('database connection error: ' + err);}
});

require('./catelog.model');