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
        res.json(companies[0])
      } else {
        res.status(400).json('Not found')
      }
    })
    .catch(err => res.status(400).json('error getting all companies'))
}

const handleCompanyUpdate = (req, res, db) => {
  const {name, location, industry, ceo, employees} = req.params;

  db('companies').where({name: name}).update([{name: name}, {location: location}, {industry: industry}, {ceo: ceo}, {employees: employees}])
  .catch(err => res.status(400).json('error inserting company'));
}

const handleCompanyInsert = (req, res, db) => {
  const {name, location, industry, ceo, employees} = req.params;

  db('companies').insert([{name: name}, {location: location}, {industry: industry}, {ceo: ceo}, {employees: employees}])
  .catch(err => res.status(400).json('error inserting company'));
}

const handleCompanyDelete = (req, res, db) => {
  const {name} = req.params;

  db('companies').where('name', {name}).del()
  .catch(err => res.status(400).json('error deleting company'));
}

module.exports = {
  handleCompanyGet,
  handleCompanyListGet,
  handleCompanyUpdate,
  handleCompanyInsert,
  handleCompanyDelete,
}