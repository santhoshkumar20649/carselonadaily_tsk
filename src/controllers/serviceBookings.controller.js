let Vehicle = require('../models/vehicle.entity');
let serviceCenter = require('../models/serviceCenters.entity');
let serviveBookings = require('../models/serviceBookings.entity');
const { getRepository, MoreThanOrEqual } = require('typeorm');
const moment = require('moment');
const { successMessages, errorMessages } = require('../utilities/constant');
const { sendEmailForServicebooking } = require('../utilities/sendEmail');


async function addSeriveBookings(req,res) {
    try {
        let {vehicleId,serviceCenterId,serviceType,serviceDate,timeSlot} = req.body;
        let {id:userId,name} = req.user;
        serviceDate = moment(serviceDate).format('DD-MM-YYY');

        let vehicleRepository = getRepository(Vehicle);
        let getVehicle = await vehicleRepository.findOne({where:{id:vehicleId,userId:userId,isActive:1}});
        if(!getVehicle) return res.status(400).send({message:'Vehicle not found.'});

        let serviceCenterRepository = getRepository(serviceCenter);
        let getServiceCenter = await serviceCenterRepository.findOne({where:{id:serviceCenterId,isActive:1}})
        if(!getServiceCenter) return res.status(400).send({message: 'Service center not found.'});

        let serviceBookingRepository = getRepository(serviveBookings);
        let getServiceBookings = await serviceBookingRepository.findOne({where:{timeSlot:timeSlot,serviceDate:serviceDate,status:'PENDING'}});
        if(getServiceBookings) return res.status(400).send({message: 'slot is not available.'})

        let newService = await serviceBookingRepository.create({vehicleId,serviceCenterId,serviceType,serviceDate,timeSlot,userId});
        let savedService = await serviceBookingRepository.save(newService)

        await sendEmailForServicebooking({name,model:getVehicle.model,brand:getVehicle.brand,serviceDate,timeSlot})
        return res.status(200).send({message: successMessages.created, data: savedService});

    } catch (error) {
        console.log(error)
        return res.status(500).send({message:errorMessages.somethingWentWrong})
    }
}

async function getUpcomingServices(req,res){
    try {
        let {id} = req.user;
        let serviceBookingRepository = getRepository(serviveBookings);

        let getServiceBookings = await serviceBookingRepository.query(`select sb.* from service_bookings as sb 
        inner join service_centers sc on sc.id = sb.serviceCenterId
         where sb.status='PENDING' and sc.userId =${id} and ((date(now()) = date(sb.serviceDate) and hour(now()) < sb.timeSlot) or date(now()) < date(sb.serviceDate)) order by sb.serviceDate asc `)
        return res.status(200).send({message: 'success',data:getServiceBookings});
        
    } catch (error) {
        return res.status(500).send({message:errorMessages.somethingWentWrong})
    }
}

async function updateServiceBookings(req,res) {
    try {
        let {serviceBookingId} = req.params;
        let {status} = req.body;
        let serviceBookingRepository = getRepository(serviveBookings);

        let getServiceBooking = await serviceBookingRepository.findOne({where:{isActive:1,id:serviceBookingId}})
        if(!getServiceBooking) return res.status(400).send({message:'booking not found.'})

        getServiceBooking.status = status;
        let updateResp = await serviceBookingRepository.update({id:serviceBookingId},getServiceBooking);
        if(updateResp.affected) {
            return res.status(200).send({message:successMessages.updated})
        }

    } catch (error) {
        return res.status(500).send({message:errorMessages.somethingWentWrong})
    }
}


module.exports = {addSeriveBookings,getUpcomingServices,updateServiceBookings}