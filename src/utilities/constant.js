module.exports.jwt = {
    secretKey: 'MysecretKey',
    expiresIn: {
        expiresIn: '5h'
    },
}
module.exports.errorMessages= {
    internalServerError: 'Internal server error',
    invalidPassword: 'Invalid password',
    userNotFound: 'User not found',
    unauthorized:'Unauthorized',
    somethingWentWrong: 'something went wrong',
    donthaveAceess: 'User are not authorized.',
    nameValidation:'name should not be empty',
    userIdValidation: 'userId should not be empty',
    loaction: 'location should not be empty',
    workingHour:'workingHour should not be empty',
    emailempty: 'Email should not be empty',
    email: 'Please provide valide email',
    passwordEmpty: 'Password should not be empty',
    passwordLength: 'Password should be min 6 and max 20 characters',
    vehicleId: 'vehicleId must be specified.',
    serviceCenterId:'serviceCenterId must be specified.',
    serviceType:'serviceType must be specified.',
    serviceDate: 'serviceDate must be specified.',
    timeSlot: 'timeSlot must be specified.',
    model: 'Model should not be empty',
    Brand: 'Brand should not be empty'

}



module.exports.successMessages = { 
    loggedIn: 'Successfully logged in',
    updated: 'Successfully updated',
    deleted: 'Successfully Deleted',
    created: 'Successfully created'
}