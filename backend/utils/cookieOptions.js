const cookieOptions = {
  secure: process.env.NODE_ENV === 'development' ? false : true,
  httpOnly: process.env.NODE_ENV === 'development' ? false : true,
  sameSite: process.env.NODE_ENV === 'development' ? false : 'none',
};

module.exports = cookieOptions;
