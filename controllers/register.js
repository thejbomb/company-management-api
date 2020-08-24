/**
 * Handles register api calls and creates a new user cred on the postgreSQL database
 * 
 * @param {*} req The http request
 * @param {*} res The http response
 * @param {*} db The postgreSQL database
 * @param {*} bcrypt Butterfly encryption
 */
const handleRegister = (req, res, db, bcrypt) => {
  const {email, password} = req.body;
  const saltRounds = 10;

  if (!email || !password) {
    return res.status(400).json('incorrect form submission');
  }

  bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {
      db('cred').returning('email').insert([{email, email, password: hash}])
      .then((email) => {
        console.log(email)
        res.json(email);
      })
      .catch(err => res.status(400).json('unable to register'))
    });
  });
}

module.exports = {
  handleRegister: handleRegister
}