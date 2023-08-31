const Vehicle = require('../models/vehicle.entity');
const { getRepository } = require('typeorm');
const constant = require('../utilities/constant')
const { errorMessages, successMessages } = require('../utilities/constant');
async function addVehicle(req,res){
    try {
        let {model,brand} = req.body;
        let {id} = req.user;

        const vehicleRepository = await getRepository(Vehicle);
        const newVehicle = await vehicleRepository.create({
            brand,model,userId:id
          });
      
          const savedVehicle = await vehicleRepository.save(newVehicle);
          return res.status(200).send({message: successMessages.created, data: savedVehicle});
    } catch (error) {
        return res.status(500).send({message:errorMessages.internalServerError})
    }
}

async function editVehicle(req,res){
    try {
        let {model,brand} = req.body;
        let {id} = req.user;
        let {vehicleId} = req.params;
        if(!model && !brand) return res.status(400).send({message: 'Please provide model or brand value to update'});
        const vehicleRepository = await getRepository(Vehicle);

        let getVehicle = await vehicleRepository.findOne({where:{id:vehicleId,userId:id,isActive:1}});
        if(getVehicle) {
            getVehicle.brand = brand || getVehicle.brand;
            getVehicle.model = model || getVehicle.model;
            const updatedVehicle = await vehicleRepository.update({id:vehicleId},getVehicle);
            if(updatedVehicle.affected) {
                return res.status(200).send({message: successMessages.updated})
            }
        } else {
            return res.status(400).send({message:'Vehicle not found'})
        }
    } catch (error) {
        return res.status(500).send({message:errorMessages.internalServerError})
    }
}

async function getUserVehicles(req,res){
    try {
        let {id} = req.user;
        const vehicleRepository = await getRepository(Vehicle);


        let vehiclesList = await vehicleRepository.find({where:{userId:id,isActive:1}});
        return res.status(200).send({message:'success',data:vehiclesList})
    } catch (error) {
        return res.status(500).send({message:errorMessages.internalServerError})
    }
}

async function deleteVehicle(req,res) {
    try {
        let {vehicleId} = req.params;
        let {id} = req.user;
        const vehicleRepository = await getRepository(Vehicle);

        let getVehicle = await vehicleRepository.findOne({where:{id:vehicleId,userId:id,isActive:1}});
        if(getVehicle) {
            await vehicleRepository.delete({id:vehicleId});
            return res.status(200).send({message:successMessages.deleted});
        } else {
            return res.status(400).send({message:'Vehicle not found'})
        }
    } catch (error) {
        return res.status(500).send({message:errorMessages.internalServerError})
    }
}

module.exports = { addVehicle,editVehicle,getUserVehicles,deleteVehicle}