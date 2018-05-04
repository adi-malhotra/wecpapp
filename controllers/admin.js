const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Activity =  require('../models/activity.js');

router.get('/',(req,res)=>{
  var queryString = req.originalUrl.split('/')[1];
  Activity
  res.send("hello")
})


module.exports = router;
