const doLogin = (req, res, next) => {
  // do the validation with email and password
  // but the goal is not to do the same
  return res.status(200).json({ message: { ...req.body } });
};

module.exports = Object.assign({}, { doLogin });
