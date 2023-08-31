const express = require('express');
const { validate, authentication, authorization } = require('../middlewares/validation');
const { checkSchema } = require('express-validator');
const { addServiceCenter, updateServiceCenter, getServiceCenters } = require('../controllers/serciceCenter.controller');
const { addServiceCenterSchema } = require('../middlewares/validation/schemas/serviceCenter.schema');
const { registerUser } = require('../controllers/user.controller');
const { createdUserByAdmin } = require('../middlewares/validation/schemas/user.schema');
const router = express.Router();

router.post('/addServiceCenter',authentication,authorization,validate(checkSchema(addServiceCenterSchema)),addServiceCenter)
router.put('/editServiceCenter/:serviceCenterId',authentication,authorization,updateServiceCenter)
router.post('/register',authentication,authorization,validate(checkSchema(createdUserByAdmin)),registerUser);
router.get('/getServiceCenters',authentication,authorization,getServiceCenters);



module.exports = router;