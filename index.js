require('./models/db');
const express = require('express');
const app = express();
const categoryController = require('./controllers/category.controller');
const bodyParser = require('body-parser');
const exhbs = require('express-handlebars');
const path = require('path');


app.use('/category', categoryController);

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.set('views',path.join(__dirname,'/views/'));
app.engine('hbs',exhbs({extname:'hbs',defaultLayout:'mainLayout',layoutsDir:__dirname+ '/views/layouts/'}));
app.set('view engine','hbs');


app.listen(3000,err => {
    if(!err){console.log('server running on port 3000');}
    else {console.log('error: '+err);}
});
