const readAllfiles = './input/';
const fs =require('fs');
const path = require('path');

fs.readdir(readAllfiles,(err,files) => {

    var list = [];
    files.forEach(element => {

        console.log(element);
        list.push(element);
    });
    console.log('file list: '+list);
});