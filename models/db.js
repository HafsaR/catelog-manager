const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/CategoryDB',{ useNewUrlParser: true } ,  err => {
    if(!err){console.log('Database connection successful.');}
    else{console.log('database connection error: ' + err);}
});

require('./category.model');