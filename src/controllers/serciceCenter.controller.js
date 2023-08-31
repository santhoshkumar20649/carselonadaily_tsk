const serviceCenter = require('../models/serviceCenters.entity');
const { getRepository } = require('typeorm');
const constant = require('../utilities/constant')
let User = require('../models/user.entity');

async function addServiceCenter(req,res){
    try {
        const { name,location,workingHour,userId } = req.body;
        const serviceCenterRepository = getRepository(serviceCenter);
        const userRepository = getRepository(User);
        const getServiceUser = await userRepository.findOne({where:{id:userId,role:'SERVICE_CENTER',isActive:1}});
        if(!getServiceUser) return res.status(400).send({message:'No service_center user found for given id'});

        const newcenter = await serviceCenterRepository.create({name,location,workingHour,userId})
        const savedCenter = await serviceCenterRepository.save(newcenter);
          return res.status(200).send({message: constant.successMessages.created, data: savedCenter});
    } catch (error) {
        console.log(error)
        return res.status(500).send({message:constant.errorMessages.internalServerError,error})
    }
}

async function updateServiceCenter(req,res) {
    try {
        const { name,location,workingHour,isActive} = req.body;
        const { serviceCenterId } = req.params;

        const serviceCenterRepository = getRepository(serviceCenter);
        let getServiceCenter = await serviceCenterRepository.findOne({where:{id:serviceCenterId,isActive:1}});
        if(getServiceCenter) {
            getServiceCenter.name = name || getServiceCenter.name;
            getServiceCenter.location = location || getServiceCenter.location;
            getServiceCenter.workingHour = workingHour || getServiceCenter.workingHour;
            getServiceCenter.isActive = isActive || getServiceCenter.isActive;

            let updateResp = await serviceCenterRepository.update({id:getServiceCenter.id},getServiceCenter);
            if(updateResp.affected) {
                return res.status(200).send({message:constant.successMessages.updated,data:getServiceCenter})
            }
        } else {
            return res.status(400).send({message: 'not found'})
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({message:constant.errorMessages.internalServerError})
    }
}

async function getServiceCenters(req,res) {
    try {
        const serviceCenterRepository = getRepository(serviceCenter);
        const getServiceCenters = await serviceCenterRepository.find();
        return res.status(200).send({message:"success",data:getServiceCenters})
    } catch (error) {
        return res.status(500).send({message:constant.errorMessages.internalServerError,error})
    }
}

module.exports = { addServiceCenter,updateServiceCenter,getServiceCenters}