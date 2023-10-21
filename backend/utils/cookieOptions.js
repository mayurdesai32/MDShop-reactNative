const cookieOptions = {
  secure: process.env.NODE_ENV === 'Development' ? false : true,
  httpOnly: process.env.NODE_ENV === 'Development' ? false : true,
  sameSite: process.env.NODE_ENV === 'Development' ? false : 'none',
};

module.exports = cookieOptions;
