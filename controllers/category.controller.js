require('../models/db');
const express = require('express');
const router = express.Router();
const readAllfiles = './input/';
const fs =require('fs');
const path = require('path');
const outputFileDir = './output/test';
const mongoose = require('mongoose');
const Category = mongoose.model('Category');
const Promise = require('bluebird');

Promise.promisifyAll(fs);



router.get('/',(req,res) => {
    // res.json('category list');
    res.render('category/addOrEdit',{

        viewTitle: 'Procuct List'
        
    });
    //<-------------Read Single File ----------------------->
// fs.readdir(readAllfiles,(err,files) => {

//     var productList = [];
//     files.forEach(element => {

//     console.log(element);
//     var readSingleFile = fs.readFileSync(readAllfiles + element);
//     var jsonContent = JSON.parse(readSingleFile);
//     console.log(jsonContent);
//     productList.push(jsonContent);
   
//     });
// });

//<!------------------------------------------------>

});



router.get('/read',(req,res) => {
  fs.readFileAsync(readAllfiles + 'products-aerator-lawnaerators-1-100.json','utf-8')
  .then((resolve,reject) => {

    var show = JSON.parse(resolve);

    show.forEach( show => {
        if(typeof show.date != 'undefined'){
            var formatDate = show.date.split('\n')[1].trim();
            show.date = formatDate;

            var newShow = new Category(show);
            newShow.category = show.name;
            newShow.brand = show,brand;
            newShow.save(function(err, s){
                console.log(s);

            });

        }
    });
  });

});




router.get('/list',(req,res) => {

    res.render('category/list',{
        viewTitle: 'List'
    });
    fs.readdir(readAllfiles,(err,files) => {

        var list = [];
        files.forEach(element => {

            
    
            // console.log(element);
            list.push(element);
        });
        console.log('file list: '+list);
        fs.writeFile(outputFileDir, list, function(err) {

            if(err) {
                return console.log(err);
            }
        
            console.log("The file was saved!");
        }); 
           
    });

    
});

function insertRecord(req,res) {
    var category = new Category();
    category.name = req.body.name;
    category.brand = req.body.brand;
    category.category = req.body.category;
    category.retailPrice = req.body.retailPrice;
    category.save((err,docs) => {

        if(!err){
            res.redirect('category/list.hbs');}
        else{
            console.log('error during insert record: '+err);}
    
    });

}


module.exports=router;