// create and send token and save in the cookie.
const cookieOptions = require('./cookieOptions');
const sendToken = async (user, res, message, statusCode) => {
  // create Jwt token
  const token = await user.generateAuthToken();

  res
    .status(statusCode)
    .cookie('jwttoken', token, {
      ...cookieOptions,
      expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    })
    .json({
      success: true,
      message: message,
    });
};

module.exports = sendToken;
