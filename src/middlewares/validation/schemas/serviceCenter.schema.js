const { errorMessages } = require("../../../utilities/constant");

module.exports = {
    addServiceCenterSchema: {
        name: {
            notEmpty: {
                errorMessage: errorMessages.nameValidation,
                bail: true,
            },
        },
        userId: {
            notEmpty: {
                errorMessage: errorMessages.userIdValidation,
                bail: true,
            },
        },
        location: {
            notEmpty: {
                errorMessage: errorMessages.loaction,
                bail: true,
            },
        },
        workingHour: {
            notEmpty: {
                errorMessage: errorMessages.workingHour,
                bail: true,
            },
        }
    }
}