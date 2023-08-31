const express = require('express');
const { validate, authentication, authorization } = require('../middlewares/validation');
const { checkSchema } = require('express-validator');
const { updateServiceBookings, getUpcomingServices } = require('../controllers/serviceBookings.controller');
const router = express.Router();

router.get('/getServiceBookings',authentication,authorization,getUpcomingServices)
router.put('/updateServiceBookings/:serviceBookingId',authentication,authorization,updateServiceBookings)

module.exports = router;