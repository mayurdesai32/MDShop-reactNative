const User = require('../models/userSchema');
const AppError = require('../error_handler/AppError');
const wrapAsync = require('../error_handler/AsyncError');
const sendEmail = require('../utils/sendEmail');
const sendToken = require('../utils/jwtToken');
const getDataUri = require('../utils/dataUri');
const cookieOptions = require('../utils/cookieOptions');

const cloudinary = require('cloudinary');

const createuser = wrapAsync(async (req, res, next) => {
  const { name, email, password, address, city, country, pinCode } = req.body;
  if (
    !name ||
    !email ||
    !password ||
    !address ||
    !city ||
    !country ||
    !pinCode
  ) {
    return next(new AppError('some of the input fields is missing', 401));
  }
  let user = await User.findOne({ email });

  if (user) {
    return next(
      new AppError(`user already exist with this email id ${email}`, 400)
    );
  }

  let avatar = undefined;
  if (req.file) {
    const file = getDataUri(req.file);
    const myCloud = await cloudinary.v2.uploader.upload(file.content);
    avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }

  user = new User({
    name,
    email,
    password,
    address,
    city,
    country,
    pinCode,
    avatar,
  });
  user = await user.save();

  sendToken(user, res, `Registered Successfully`, 201);
});

const loginin = wrapAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError('Please enter email & password', 401));
  }
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new AppError('Invalid user or password', 400));
  }

  const match = await user.compareloginPasssword(password);
  if (!match) {
    return next(new AppError('Invalid user or password', 404));
  }
  sendToken(user, res, `welcome Back ${user.name}`, 201);
});

// get currently logged in user
const getUserProfile = wrapAsync(async (req, res, next) => {
  const user = await User.findById(req.rootUser._id);

  res.status(201).json({
    success: true,
    user,
  });
});

// for forgot password

const forgotPassword = wrapAsync(async (req, res, next) => {
  const email = req.body.email;
  if (!email) {
    return next(new AppError('Please enter email id', 400));
  }
  const user = await User.findOne({ email });

  if (!user) {
    return next(
      new AppError(`user not found with this email id ${req.body.email}`, 404)
    );
  }

  const randomNumber = Math.random() * (999999 - 100000) + 100000;
  const otp = Math.floor(randomNumber);
  const otp_expire = 15 * 60 * 1000;

  user.otp = otp;
  user.otp_expire = new Date(Date.now() + otp_expire);
  await user.save();

  const message = `Your OTP for Reseting Password is ${otp}.\n Please ignore if you haven't requested this.`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'MDSHOP:- OTP For Reseting Password Recovery',
      message,
    });
  } catch (error) {
    user.otp = null;
    user.otp_expire = null;
    await user.save();
    return next(error);
  }
  res.status(200).json({
    success: true,
    message: `Email Sent To ${user.email}`,
  });
});

// for reset password of user
const resetPassword = wrapAsync(async (req, res, next) => {
  const { otp, password } = req.body;

  const user = await User.findOne({
    otp,
    otp_expire: {
      $gt: Date.now(),
    },
  });

  if (!user)
    return next(new AppError('Incorrect OTP or has been expired', 400));

  if (!password) return next(new AppError('Please Enter New Password', 400));

  user.password = password;
  user.otp = undefined;
  user.otp_expire = undefined;

  await user.save();

  res.status(200).json({
    success: true,
    message: 'Password Changed Successfully, You can login now',
  });
});

// for update user Password
const updatePassword = wrapAsync(async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword)
    return next(new AppError('Please Enter Old Password & New Password', 400));

  const user = await User.findById(req.rootUser._id).select('+password');

  // check previous password
  const match = await user.compareloginPasssword(oldPassword);

  if (!match) {
    return next(new AppError('Incorrect password', 404));
  }

  user.password = newPassword;
  await user.save();

  sendToken(user, 201, res);

  res.status(201).json({
    success: true,
    message: 'Password Changed Successully',
  });
});

// for update profile by user
const updateByUser = wrapAsync(async (req, res, next) => {
  const user = await User.findById(req.rootUser._id);

  const { name, email, address, city, country, pinCode } = req.body;

  if (name) user.name = name;
  if (email) user.email = email;
  if (address) user.address = address;
  if (city) user.city = city;
  if (country) user.country = country;
  if (pinCode) user.pinCode = pinCode;

  await user.save();

  res.status(200).json({
    success: true,
    message: 'Profile Updated Successfully',
  });
});

// to update pic
const updatePicByUser = wrapAsync(async (req, res, next) => {
  const user = await User.findById(req.rootUser._id);
  // console.log(req);
  // if (req.file) {
  // }
  const file = getDataUri(req.file);
  console.log(file);
  if (user.avatar?.public_id) {
    await cloudinary.v2.uploader.destroy(user.avatar?.public_id);
  }
  const myCloud = await cloudinary.v2.uploader.upload(file.content);

  console.log('******************************************************');

  user.avatar = {
    public_id: myCloud.public_id,
    url: myCloud.secure_url,
  };

  await user.save();
  res.status(200).json({ success: true, message: 'Avatar Updated successful' });
});

///for logout
const logout = wrapAsync(async (req, res) => {
  console.log(req.rootUser);

  req.rootUser.tokens = [];
  await req.rootUser.save();

  res
    .status(200)
    .cookie('jwttoken', '', {
      ...cookieOptions,
      expires: new Date(Date.now()),
    })
    // .clearCookie('jwttoken')
    .json({ success: true, message: 'logout successfully' });
});

module.exports = {
  createuser,
  loginin,
  logout,
  forgotPassword,
  resetPassword,
  updateByUser,
  updatePicByUser,
  getUserProfile,
  updatePassword,
};
