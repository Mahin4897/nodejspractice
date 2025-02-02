const express = require('express');
const bodyParser = require('body-parser');
const {sequelizedb} = require('./model/db');
const router = require('./routes/routes');

const bcrypt = require('bcrypt');
const app = express();
const port=3000;
app.use(bodyParser.json());

sequelizedb.authenticate().then(()=>{
    console.log('connection has been established successfully');
}).catch((error)=>{
    console.error('Unable to connect to the database:',error);
});

app.use('/api',router);

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});