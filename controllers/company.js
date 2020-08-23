/**
 * This function handles retrieving company data from the database
 * @param {*} req The http request
 * @param {*} res The http response
 * @param {*} db The postgreSQL database
 */
const handleCompanyGet = (req, res, db) => {
  const {name} = req.params;
  
  db('companies').where('name', name)
    .then(company => {
      if (company.length > 0) {
        res.json(company[0])
      } else {
        res.status(400).json('Not found')
      }
    })
    .catch(err => res.status(400).json('error getting company'))
}

/**
 * This function handles retrieving all company data from the database
 * @param {*} req The http request
 * @param {*} res The http response
 * @param {*} db The postgreSQL database
 */
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

/**
 * This function handles updating company data to the database
 * @param {*} req The http request
 * @param {*} res The http response
 * @param {*} db The postgreSQL database
 */
const handleCompanyUpdate = (req, res, db) => {
  const {name, location, industry, ceo, employees} = req.body.company;

  db('companies').where({name: name}).update({location: location, industry: industry, ceo: ceo, employees: employees})
  .then(() => {
    res.json('successs');
  })  
  .catch(console.log);
}

/**
 * This function handles inserting new company to from the database
 * @param {*} req The http request
 * @param {*} res The http response
 * @param {*} db The postgreSQL database
 */
const handleCompanyInsert = (req, res, db) => {
  const {name, location, industry, ceo, employees} = req.body.company;
  
  db('companies').returning('*').insert([{name: name, location: location, industry: industry, ceo: ceo, employees: employees}])
  .then((company) => {
    res.json(company[0]);
  })  
  .catch(console.log);
}

/**
 * This function handles deleting company data from the database
 * @param {*} req The http request
 * @param {*} res The http response
 * @param {*} db The postgreSQL database
 */
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