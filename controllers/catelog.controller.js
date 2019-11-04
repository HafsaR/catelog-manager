require('../models/db');
const express = require('express');
const router = express.Router();
const fs =require('fs');
const mongoose = require('mongoose');
const Catelog = mongoose.model('Catelog');
const _ = require('lodash');

const inputDir = './input/compressor/';
const outputFileDir = './output/fileList.json';
const outputDir = './output/test.json'

router.get('/',(req,res) => {

    Catelog.find((err,docs) => {
        if (!err) {
            res.render('catelog/list',{

                viewTitle: 'Procuct List',
                list:docs
                
            });
            
        }else {console.log('error: '+err)}
    })
   
  
  
});



router.post('/read',(req,res) => {
  
    if (req.body) {

        console.log('body in array:')
    }else{
   fs.readdir(inputDir,(err,files) => {

    var fileList = [];
    files.forEach(element => {
        fileList.push(element);
        var readSingleFile = fs.readFileSync(inputDir + element);
        var jsonContent = JSON.parse(readSingleFile);
        var uniqArray = jsonContent.filter(onlyUnique);
        var s = uniqArray.map(f => {

            var brand = f.brand;
            var barcodeNumber=f.barcode_number;
            var category = f.category;
            var description = f.description;
            var image = f.images;
            var name = f.product_name;
            var path = f.stores.product_url;
            var retailPrice = f.stores[0] ? f.stores[0].store_price : null
            var sku = f.sku;
            var updated = f.updated;

            var catelog = new Catelog();
            catelog.brand = brand;
            catelog.barcodeNumber=barcodeNumber;
            catelog.category=category;
            catelog.description = description;
            catelog.image = image;
            catelog.name = name;
            catelog.path = path;
            catelog.retailPrice = retailPrice;
            catelog.sku=sku;
            catelog.updated=updated;

            catelog.save((err,doc) => {
                if(err) throw err;
                else
                console.log('inserted:');
            })

            return catelog;
        });

        fs.writeFile(outputDir, JSON.stringify(s,null,2), function(err) {

            if(err) {
                return console.log(err);
            }
        
            console.log("The file was saved!");
        }); 

        
    })
    fs.writeFile(outputFileDir, JSON.stringify(fileList,null,2), function(err) {

        if(err) {
            return console.log(err);
        }
    
        console.log("The file was saved!");
    }); 
   }) ;

}

});




router.get('/list',(req,res) => {

    res.render('catelog/list',{
        viewTitle: 'List'
    });
    fs.readdir(inputDir,(err,files) => {

        var list = [];
        files.forEach(element => {

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

router.post('/delete/:id',(req,res) => {

    var curid = req.params.id;
  //  curid = curid.replace(/\s/g,'');

    Catelog.findByIdAndRemove(curid, (err,docs) => {
        if(!err) {
        
             Catelog.find((err,doc) => {
                 if (!err) {
                    res.render('catelog/list',{
        
                        viewTitle: 'Procuct List',
                        list:doc
                        
                    });
                    
                 }else {console.log('error: '+err)}
             })
        }
        else{
        console.log('error: '+err)
        }
    })
});

function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}


module.exports=router;