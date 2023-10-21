const express = require('express');

const router = express.Router();

const {
  newOrder,
  getAdminOrders,
  getSingleOrder,
  processPayment,
  proccessOrder,
  getMyOrders,
} = require('../controller/order');
const { authenticateUser, authorizeRoles } = require('../middleware/auth');

router.post('/create', authenticateUser, newOrder);

router.put(
  '/admin/update/:_id',
  authenticateUser,
  authorizeRoles,
  proccessOrder
);

router.get('/getsinglerorder/:_id', authenticateUser, getSingleOrder);

router.get('/loginUserorder', authenticateUser, getMyOrders);

router.get('/payment', authenticateUser, processPayment);

router.get('/admin', authenticateUser, authorizeRoles, getAdminOrders);

module.exports = router;
