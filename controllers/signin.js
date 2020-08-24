/**
 * Handles signin api calls, checks to see if user is in database
 * 
 * @param {*} req The http request
 * @param {*} res The http response
 * @param {*} db The postgreSQL database
 * @param {*} bcrypt Butterfly encryption
 */
const handleSignin = (req, res, db, bcrypt) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json('incorrect form submission');
  }

  db.select('email', 'password').from('cred')
    .where('email', '=', email)
    .then(data => {
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        res.json(email)
      } else {
        res.status(400).json('wrong credentials')
      }
    })
    .catch(err => res.status(400).json('wrong credentials'))
}

module.exports = {
  handleSignin: handleSignin
}