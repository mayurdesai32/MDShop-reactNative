const jwt = require('jsonwebtoken');
const AppError = require('../error_handler/AppError');
const wrapAsync = require('../error_handler/AsyncError');
const User = require('../models/userSchema');

const authenticateUser = wrapAsync(async (req, res, next) => {
  const { jwttoken } = req.cookies;

  if (!jwttoken) {
    return next(new AppError('Login first to access this resource.', 401));
  }

  const verifytoken = jwt.verify(jwttoken, process.env.JWT_SECRET);

  const rootUser = await User.findById(verifytoken.id);

  if (!rootUser) {
    return next(new AppError('Invaliduser', 403));
  }

  console.log('token verified');
  req.rootUser = rootUser;

  next();
});

const authorizeRoles = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return next(
      new AppError(`only admin is  allowed to acccess this resource`, 401)
    );
  }
  next();
};

module.exports = { authenticateUser, authorizeRoles };
