const { errorMessages } = require("../../../utilities/constant");

module.exports = {

    addVehicleSchema:{
        model:{
            notEmpty: {
                errorMessage: errorMessages.model,
                bail: true,
            },
        },
        brand:{
            notEmpty: {
                errorMessage: errorMessages.Brand,
                bail: true,
            },
        }
    }
}