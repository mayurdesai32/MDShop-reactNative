// const uuid = require('uuid');
const stripe = require('stripe')(process.env.STRIPE_API_SECRET);

const Order = require('../models/orderSchema');
const AppError = require('../error_handler/AppError');
const wrapAsync = require('../error_handler/AsyncError');
const Product = require('../models/productSchema');

// to place an order
const newOrder = wrapAsync(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentMethod,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingCharges,
    totalAmount,
  } = req.body;
  console.log(
    shippingInfo,
    orderItems,
    paymentMethod,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingCharges,
    totalAmount
  );
  if (
    !shippingInfo ||
    !orderItems ||
    !paymentMethod ||
    // !paymentInfo ||
    !itemsPrice ||
    !taxPrice ||
    !shippingCharges ||
    !totalAmount
  ) {
    return next(new AppError('some of the input fields is missing', 401));
  }

  await Order.create({
    shippingInfo,
    orderItems,
    paymentMethod,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingCharges,
    totalAmount,
    user: req.rootUser._id,
  });
  for (let i = 0; i < orderItems.length; i++) {
    const product = await Product.findById(orderItems[i].product);
    product.stock -= orderItems[i].quantity;
    await product.save();
  }

  res.status(201).json({
    success: true,
    message: 'Order Placed Successfully',
  });
});

const getAdminOrders = wrapAsync(async (req, res, next) => {
  const orders = await Order.find({});

  res.status(200).json({
    success: true,
    orders,
  });
});

const getMyOrders = wrapAsync(async (req, res, next) => {
  const orders = await Order.find({ user: req.rootUser._id });

  res.status(200).json({
    success: true,
    orders,
  });
});

const getSingleOrder = wrapAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) return next(new AppError('Order Not Found', 404));

  res.status(200).json({
    success: true,
    order,
  });
});

const proccessOrder = wrapAsync(async (req, res, next) => {
  const order = await Order.findById(req.params._id);
  if (!order) return next(new AppError('Order Not Found', 404));

  if (order.orderStatus === 'Preparing') order.orderStatus = 'Shipped';
  else if (order.orderStatus === 'Shipped') {
    order.orderStatus = 'Delivered';
    order.deliveredAt = new Date(Date.now());
  } else return next(new AppError('Order Already Delivered', 400));

  await order.save();

  res.status(200).json({
    success: true,
    message: 'Order Processed Successfully',
  });
});

const processPayment = wrapAsync(async (req, res, next) => {
  const { totalAmount } = req.body;

  const { client_secret } = await stripe.paymentIntents.create({
    amount: Number(totalAmount * 100),
    currency: 'inr',
  });

  res.status(200).json({
    success: true,
    client_secret,
  });
});

module.exports = {
  newOrder,
  getAdminOrders,
  getSingleOrder,
  processPayment,
  proccessOrder,
  getMyOrders,
};
