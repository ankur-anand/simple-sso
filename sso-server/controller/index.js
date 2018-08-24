const originAppName = {
  "http://localhost:3020": "sso_consumer",
  "http://localhost:3030": "simple_sso_consumer"
};

const userDB = {
  "info@ankuranand.com": {
    password: "test",
    appRole: {
      sso_consumer: "admin",
      simple_sso_consumer: "user"
    }
  }
};

const doLogin = (req, res, next) => {
  // do the validation with email and password
  // but the goal is not to do the same
  // like checing with Datebase and all, we are skiping these section
  const { email, password } = req.body;
  if (!(userDB[email] && password === userDB[email].password)) {
    return res.status(404).json({ message: "Invalid email and password" });
  }

  // else redirect
  const { serviceURL } = req.query;

  return res.redirect(`${serviceURL}?ssoToken=1234567890`);
};

module.exports = Object.assign({}, { doLogin });
