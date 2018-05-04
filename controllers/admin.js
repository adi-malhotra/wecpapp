const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Activity =  require('../models/activity.js');

router.get('/',(req,res,next)=>{
  var queryString = req.originalUrl.split('/')[1];
  Activity.find((err,activities)=>{
    if(err)
      return next(err);
    res.json(activities);
  })
  // res.send("hello");
})


module.exports = router;
