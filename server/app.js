const express = require('express');
const fs = require('fs');
const app = express();
var ts = new Date();
var csv = require("csvtojson");
app.use((req, res, next) => {
    // //     // write your logging code herein

    var replacer = req.headers['user-agent'].replace(/,/g, '');
    var myCsv = [replacer, ts.toISOString(),
        req.method, req.url, 'HTTP/' + req.httpVersion, res.statusCode]
    const newCsv = myCsv.join(',') + '\n';
    fs.appendFile('log.csv', newCsv, (err, data) => {
        next()
    })
});
app.get('/', (req, res) => {
    // console.log(req.headers['user-agent'])
    // console.log(ts.toISOString());
    // console.log(req.method);
    // console.log(req.url);
    // console.log('HTTP/'+req.httpVersion);
    // console.log(req.statusCode);
    console.log(req)
    // write your code to respond "ok" here
    res.send('OK');
});
app.get('/logs', (req, res) => {
    //     // write your code to return a json object containing the log data here
    var jsonArray = [];
    csv()
        .fromFile('log.csv')
        .on('json', (jsonObj) => {
            // combine csv header row and csv line to a json object
            // jsonObj.a ==> 1 or 4
            jsonArray.push(jsonObj)
        })
        .on('done', (error) => {
            console.log('end')
            res.json(jsonArray)
        })
});
module.exports = app;