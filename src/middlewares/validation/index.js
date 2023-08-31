const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../../models/user.entity');
const { getRepository } = require('typeorm');
const constant = require('../../utilities/constant');


const validate = validations => {
    return async (req, res, next) => {
      await Promise.all(validations.map(validation => {
       return validation.run(req)
      }));  
      const errors = validationResult(req);
      if (errors.isEmpty()) {
        return next();
      }  
      let errorPayload = {
        error: errors.array()[0].msg 
      }
      console.log(errorPayload)
      return res.status(400).json(errorPayload);
    };  
};

function authentication(req,res,next) {
    try {
        const token = req.headers.authorization.split(' ')[1]
        if(!token) return res.send({ error: constant.errorMessages.unauthorized }).status(401);

        jwt.verify(token, constant.jwt.secretKey,async  (err, decoded) => {
        if (err) return res.send({ error: constant.errorMessages.unauthorized }).status(401); 
            const userRepository = getRepository(User)
            const isValidUser = await userRepository.findOne({where:{id:decoded.id}});
            // console.log("=======",isValidUser)
            if(isValidUser) {
                req.user = isValidUser;
                next();
            } else {
                return res.send({ error: constant.errorMessages.unauthorized }).status(401);
            }
        });
    } catch (error) {
        return res.send({ error: constant.errorMessages.unauthorized }).status(401);
    }
    

}

function authorization(req,res,next) {
    const {role} = req.user;
    const userAccessiblePaths = [
        '/api/user/addVehicle',
        '/api/user/editVehicle',
        '/api/user/deleteVehicle',
        '/api/user/getVehicles',
        '/api/user/editUser',
        '/api/user/serviceBooking',
        '/api/user/updateUser'
    ]
    const adminAccessiblePaths = [
        '/api/admin/addServiceCenter',
        '/api/admin/editServiceCenter',
        '/api/admin/register',
        '/api/admin/getServiceCenters',
        '/api/user/updateUser'
    ]

    const serviceCenterPaths = [
        '/api/serviceCenter/getServiceBookings',
        '/api/serviceCenter/updateServiceBookings',
        '/api/user/updateUser'
    ]

    switch (role) {
        case 'SERVICE_CENTER':
            if(!serviceCenterPaths.some((item) => req.originalUrl.includes(item))) 
                return res.send({error:constant.errorMessages.donthaveAceess}).status(400);
            break;
        case 'ADMIN':
            if(!adminAccessiblePaths.find((item) => req.originalUrl.includes(item)))
                return res.send({error:constant.errorMessages.donthaveAceess}).status(400);
            break;
        case 'USER':
            if(!userAccessiblePaths.find((item) => req.originalUrl.includes(item)))
                return res.send({error:constant.errorMessages.donthaveAceess}).status(400);
            break;
        default:
            return res.send({error:constant.errorMessages.unauthorized}).status(400);
    }
    
    next()
}


module.exports = {validate,authentication,authorization}