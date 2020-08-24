const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt');

const company = require('./controllers/company');
const signin = require('./controllers/signin');
const register = require('./controllers/register');

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: '159aobp',
    database: 'postgres'
  }
})

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res)=> { res.send('it is working!') });
app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)});
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)});
app.get('/company/:name', (req, res) => {company.handleCompanyGet(req, res, db)});
app.get('/companyAll', (req, res) => {company.handleCompanyListGet(req, res, db)});
app.post('/insert', (req, res) => {company.handleCompanyInsert(req, res, db)});
app.delete('/company/:name', (req, res) => {company.handleCompanyDelete(req, res, db)});
app.put('/update', (req, res) => {company.handleCompanyUpdate(req, res, db)});

app.listen(3001, () => {
    console.log('app running on 3001');
})