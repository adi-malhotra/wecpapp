const express = require('express');
const router = express.Router();
const https = require('https');


const API_KEY = 'AIzaSyBb9N8KNW0MxY-ETxBx00Qx7r76cdAlItk';
const SEARCH_ENGINE_ID = '003871022704227956238:jvsipjdgfim';
const URL = "www.googleapis.com";

router.get('/',(request,res)=>{
  var queryString = request.originalUrl.split('/')[1].split('%20').join(' ');
  var path = "/customsearch/v1?key=" + API_KEY + "&cx=" + SEARCH_ENGINE_ID + "&q=" + queryString + "&searchType=image";
  const options = {
    hostname: URL,
    path: path,
  }
  const req = https.request(options, (response) => {
  response.setEncoding('utf8');
  var json = '';
  response.on('data', (chunk) => {
    json += chunk;
  });
  response.on('end',()=>{
    var data = JSON.parse(json);
    res.send(data);
  })

  });
  req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
  });
  req.end();
})

module.exports = router;