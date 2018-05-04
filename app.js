const express = require('express');
const path = require('path');
const config = require('./config/database');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const id = require('./controllers/id');
const admin = require('./controllers/admin');

mongoose.connect(config.database,{
  useMongoClient: true
});

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(/\/data\/.*/,id);
app.use(/.*\/data\/admin/,admin);

app.get(/.*\/admin/,(req,res)=>{
  res.sendFile(path.join(__dirname, './public/html/', '', '/admin.html'))
})
app.get(/.*/, (req,res) => {
    res.sendFile(path.join(__dirname, './public/html/', '', '/id.html'))
})

app.listen(port, () => {
    console.log(`Starting the server at port ${port}`);
});
