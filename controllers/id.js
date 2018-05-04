const express = require('express');
const router = express.Router();
const https = require('https');
const path = require('path');
const mongoose = require('mongoose');
const Activity = require('../models/activity.js');

const API_KEY = 'AIzaSyCyW6glXsA_uDkCJZ-N0v4t8bFRFiiOSeI';
const SEARCH_ENGINE_ID = '003871022704227956238:jvsipjdgfim';
const URL = "www.googleapis.com";

function updateDates(hDates,cDates,hCount,cCount,event){
  var date = new Date();
  if(event=='hover'){
      hDates.push(date.getHours()+':'+date.getMinutes()+':'+date.getSeconds());
      hCount++;
  }
  else if(event=='click'){
      cDates.push(date.getHours()+':'+date.getMinutes()+':'+date.getSeconds());
      cCount++;
  }
  return [hDates, cDates, hCount, cCount];
}

router.get('/',(request,res)=>{
  // console.log("hey this workedssss");
  var queryString = request.originalUrl.split('/')[2].split('%20').join(' ');
  // console.log(queryString);
  var path = "/customsearch/v1?key=" + API_KEY + "&cx=" + SEARCH_ENGINE_ID + "&q=" + queryString.split(' ').join('%20') + "&searchType=image";
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
      res.json(data);
    })
  });
  req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
  });
  req.end();
})

router.post('/',(req,res)=>{
  var queryString = req.originalUrl;
  var event  = queryString.split('/')[3];
  var search_id = queryString.split('/')[2].split('%20').join(' ');
  // console.log("id is : " + search_id);
  var hCount = 0, cCount = 0;
  var hDates = [],cDates = [];
  Activity.findOne({id:search_id},'id hoveredCount clickedCount hoveredDates clickedDates',(err,activity)=>{
    if(err) console.log('Error fetching activity');
    if(activity){
      search_id = activity.id;
      // console.log(activity);
      var datesAndCounts = updateDates(activity.hoveredDates,activity.clickedDates,activity.hoveredCount,activity.clickedCount,event);
      hDates = datesAndCounts[0];
      cDates = datesAndCounts[1];
      hCount = datesAndCounts[2];
      cCount = datesAndCounts[3];
      // console.log(cDates);
      Activity.update({id:activity.id},
        {
          $set:{
            hoveredCount: hCount,
            clickedCount: cCount,
            hoveredDates: hDates,
            clickedDates: cDates
          }
        },(err,result)=>{
        if(err) console.log('Error: ' + err);
        else console.log(activity.id + ' updated!');
      })
    }
    else{
      var datesAndCounts = updateDates(hDates,cDates,hCount,cCount,event);
      hDates = datesAndCounts[0];
      cDates = datesAndCounts[1];
      hCount = datesAndCounts[2];
      cCount = datesAndCounts[3];
      var key = search_id.split(':')[0];
      var activity = new Activity({
        id: search_id,
        keyword: key,
        hoveredCount: hCount,
        clickedCount:cCount,
        hoveredDates:hDates,
        clickedDates: cDates
      });
      activity.save((err,result)=>{
        if(err) return console.error(err);
        console.log(result.id + " stored in database");
      })
    }
  });
  return;
})

module.exports = router;
