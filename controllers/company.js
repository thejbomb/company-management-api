const handleCompanyGet = (req, res, db) => {
  const {name} = req.params;

  db('companies').where('name', {name})
    .then(company => {
      if (company.length > 0) {
        res.json(company[0])
      } else {
        res.status(400).json('Not found')
      }
    })
    .catch(err => res.status(400).json('error getting company'))
}

const handleCompanyListGet = (req, res, db) => {
  db.select('*').from('companies')
    .then(companies => {
      if (companies.length > 0) {
        res.json(companies)
      } else {
        res.status(400).json('Not found')
      }
    })
    .catch(err => res.status(400).json('error getting all companies'))
}

const handleCompanyUpdate = (req, res, db) => {
  const {name, location, industry, ceo, employees} = req.body.company;

  db('companies').where({name: name}).update({location: location, industry: industry, ceo: ceo, employees: employees})
  .then(() => {
    res.json('successs');
  })  
  .catch(console.log);
}

const handleCompanyInsert = (req, res, db) => {
  const {name, location, industry, ceo, employees} = req.body.company;
  
  db('companies').insert([{name: name, location: location, industry: industry, ceo: ceo, employees: employees}])
  .then(() => {
    res.json('successs');
  })  
  .catch(console.log);
}

const handleCompanyDelete = (req, res, db) => {
  const {name} = req.params;

  db('companies').where('name', name).del()
  .then(() => {
    res.json('successs');
  })  
  .catch(console.log);
}

module.exports = {
  handleCompanyGet,
  handleCompanyListGet,
  handleCompanyUpdate,
  handleCompanyInsert,
  handleCompanyDelete,
}