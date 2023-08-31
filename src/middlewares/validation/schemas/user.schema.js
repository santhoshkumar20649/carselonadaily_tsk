const constant = require('../../../utilities/constant')
const emailValidation = {
    notEmpty: {
      errorMessage: constant.errorMessages.emailempty,
      bail: true,
    },
    isEmail: {
      errorMessage: constant.errorMessages.email,
      bail: true,
    },
    bail: true,
    trim: true,
    toLowerCase: true,
}
const passwordvalidation = {
    notEmpty: {
        errorMessage: constant.errorMessages.passwordEmpty,
        bail: true,
    },
    isLength: {
        errorMessage: constant.errorMessages.passwordLength, //fieldTenantNameLen
        options: { min: 6, max:20 },
        bail: true,
    },
    bail: true,
    trim: true,
    toLowerCase: true,
}
const nameValidation = {
    notEmpty: {
        errorMessage: constant.errorMessages.nameValidation,
        bail: true,
    },
    bail: true,
    trim: true,
    toLowerCase: true,
}
module.exports = {
    createUserSchema:{
        email: emailValidation,
        name: nameValidation,
        password: passwordvalidation,
        role: {
            notEmpty: {
                errorMessage: 'Role should not be empty',
                bail: true,
            },
            custom: {
                errorMessage: 'Role should be User', 
                options: (value,{req}) =>{
                    return ['USER'].includes(value)
                },
            },
            bail: true,
            trim: true,
            toUpperCase: true,
        }
    },
    createdUserByAdmin:{
        email: emailValidation,
        name: nameValidation,
        password: passwordvalidation,
        role: {
            notEmpty: {
                errorMessage: 'Role should not be empty',
                bail: true,
            },
            custom: {
                errorMessage: 'Role should be USER or SERVICE_CENTER', 
                options: (value,{req}) =>{
                    return ['USER','SERVICE_CENTER'].includes(value)
                },
            },
            bail: true,
            trim: true,
            toUpperCase: true,
        }
    },
    loginSchema: {
        email: emailValidation,
        password: passwordvalidation,
        bail: true,
        trim: true,
        toLowerCase: true,
    },
    serviceBookingSchema: {
        vehicleId: {
            notEmpty: {
                errorMessage: constant.errorMessages.vehicleId,
                bail: true,
            },
        },
        serviceCenterId: {
            notEmpty: {
                errorMessage: constant.errorMessages.serviceCenterId,
                bail: true,
            },
        },
        serviceType: {
            notEmpty: {
                errorMessage: constant.errorMessages.serviceType,
                bail: true,
            },
        },
        serviceDate: {
            notEmpty: {
                errorMessage: constant.errorMessages.serviceDate,
                bail: true,
            },
        },
        timeSlot: {
            notEmpty: {
                errorMessage: constant.errorMessages.timeSlot,
                bail: true,
            },
        },
    }
}