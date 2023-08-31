const express = require('express');
const { registerUser,login, editUser } = require('../controllers/user.controller');
const { validate, authentication, authorization } = require('../middlewares/validation');
const { checkSchema } = require('express-validator');
const { createUserSchema, loginSchema, serviceBookingSchema } = require('../middlewares/validation/schemas/user.schema');
const { addVehicle, editVehicle, deleteVehicle, getUserVehicles } = require('../controllers/vehicle.controller');
const { addVehicleSchema } = require('../middlewares/validation/schemas/vehicle.schema');
const { addSeriveBookings } = require('../controllers/serviceBookings.controller');


const router = express.Router();



router.post('/register',validate(checkSchema(createUserSchema)),registerUser);
router.post('/login',validate(checkSchema(loginSchema)),login);
router.post('/addVehicle',authentication,authorization,validate(checkSchema(addVehicleSchema)),addVehicle);
router.put('/editVehicle/:vehicleId',authentication,authorization,editVehicle);
router.delete('/deleteVehicle/:vehicleId',authentication,authorization,deleteVehicle);
router.get('/getVehicles',authentication,authorization,getUserVehicles)
router.post('/serviceBooking',authentication,authorization,validate(checkSchema(serviceBookingSchema)),addSeriveBookings)
router.put('/updateUser',authentication,authorization,editUser)


module.exports = router;