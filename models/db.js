const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config()

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect(process.env.MONGO_CONNECTION,{ useNewUrlParser: true } ,  err => {
    if(!err){console.log('Database connection successful.');}
    else{console.log('database connection error: ' + err);}
});




// const MongoClient = require('mongodb').MongoClient;
// const client = new MongoClient(process.env.MONGO_CONNECTION, { useNewUrlParser: true });
// client.connect(err => {
//     if(!err){
//   const collection = client.db("CatelogDB").collection("catelogs");
//   // perform actions on the collection object
//   console.log('Database connection successful.');
//   client.close();
// }else{console.log('Database connection error: '+err);}
// });


require('./catelog.model');
