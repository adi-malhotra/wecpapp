const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
  var queryString = req.originalUrl.split('/')[1];
  res.send("hello")
})


module.exports = router;
