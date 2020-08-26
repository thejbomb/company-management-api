const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt');
require('dotenv').config();

const company = require('./controllers/company');
const signin = require('./controllers/signin');
const register = require('./controllers/register');

const db = knex({
  client: 'pg',
  connection: {
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
  }
})

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res)=> { res.send('it is working!') });
app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)});
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)});
app.get('/company/:id', (req, res) => {company.handleCompanyGet(req, res, db)});
app.get('/companyAll', (req, res) => {company.handleCompanyListGet(req, res, db)});
app.post('/company', (req, res) => {company.handleCompanyInsert(req, res, db)});
app.delete('/company/:name', (req, res) => {company.handleCompanyDelete(req, res, db)});
app.put('/company', (req, res) => {company.handleCompanyUpdate(req, res, db)});

app.listen(3001, () => {
    console.log('app running on 3001');
})