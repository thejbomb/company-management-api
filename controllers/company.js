const handleCompanyGet = (req, res, db) => {
  const {name} = req.params;
  console.log(name)
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

}

const handleCompanyInsert = (req, res, db) => {

}

const handleCompanyDelete = (req, res, db) => {

}

module.exports = {
  handleCompanyGet,
  handleCompanyListGet,
  handleCompanyUpdate,
  handleCompanyInsert,
  handleCompanyDelete,
}