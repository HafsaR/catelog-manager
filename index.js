require('./models/db');
const express = require('express');
const app = express();
const catelogController = require('./controllers/catelog.controller');
const bodyParser = require('body-parser');
const exhbs = require('express-handlebars');
const path = require('path');

const port = process.env.PORT || 3000

app.use('/', catelogController);

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.set('views',path.join(__dirname,'/views/'));
app.engine('hbs',exhbs({extname:'hbs',defaultLayout:'mainLayout',layoutsDir:__dirname+ '/views/layouts/'}));
app.set('view engine','hbs');


app.listen(port,err => {
    if(!err){console.log(`server running on port ${port}`);}
    else {console.log('error: '+err);}
});
