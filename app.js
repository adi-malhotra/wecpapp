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
app.use(/.*\/admin/,admin);
app.get(/.*/, (req,res) => {
    res.sendFile(path.join(__dirname, './', '', '/id.html'))
})

app.listen(port, () => {
    console.log(`Starting the server at port ${port}`);
});
