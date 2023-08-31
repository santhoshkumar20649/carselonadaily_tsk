let User = require('../models/user.entity');
const jwt = require('jsonwebtoken');
let md5 = require('md5');
const { getRepository, Not } = require('typeorm');
const constant = require('../utilities/constant')
const { errorMessages, successMessages } = require('../utilities/constant');
const { sendEmailAccountCreation } = require('../utilities/sendEmail');

async function registerUser(req,res) {
    try {
        const {name,email,password,role} = req.body;
        const userRepository = getRepository(User);

        let usr = await userRepository.findOne({where:{email: email}});
        if(usr) {
            return res.status(400).send({message: errorMessages.emailAlreadyExist})
        }
        const newUser = await userRepository.create({
            name: name,
            email: email,
            password: md5(password),
            role: role
          });
      
          const savedUser = await userRepository.save(newUser);
          await sendEmailAccountCreation({name,email,password})
          return res.status(200).send({message: successMessages.created, data: savedUser});
    } catch (error) {
        return res.status(500).send({message:errorMessages.internalServerError})
    }
}
async function editUser(req,res) {
    try {
        const {name,email,password} = req.body;
        const {id} = req.user;
        const userRepository = getRepository(User);
        if(!name && !email && !password) {
            return res.status(400).send({message: 'Please provide name,email or password to update'})
        }

        if(email) {
            let usr = await userRepository.findOne({where:{email: email,id:Not(id),isActive:1}});
            if(usr) return res.status(400).send({message: errorMessages.emailAlreadyExist});
        }
        
        

        let getUser = await userRepository.findOne({where:{email: email,id:id,isActive:1}});
        if(!getUser) return res.status(400).send({message: 'user not found.'});

        getUser.name = name || getUser.name;
        getUser.email = email || getUser.email;
        getUser.password = md5(password) || getUser.password;

        let updateUser = await userRepository.update({id:id},getUser);
        if(updateUser.affected) {
            return res.status(400).send({message:successMessages.updated});
        }
    } catch (error) {
        return res.status(500).send({message:errorMessages.internalServerError})
    }
}

async function login(req,res) {
    try {
        let { email, password} = req.body;
        password = md5(password);
        const userRepository = getRepository(User);

        const getUser = await userRepository.findOne({where:{email:email,password:password,isActive:1}});
        if(getUser) {
            const payload = {
                id: getUser.id,
                name: getUser.name,
                role: getUser.role,
                email: getUser.email
            }
            const token = jwt.sign(payload, constant.jwt.secretKey, constant.jwt.expiresIn);
            res.status(200).send({status:constant.successMessages.loggedIn,accessToken: token,user:getUser})
        } else {
            return res.status(400).send("heelo")
        }
    } catch (error) {
        console.log("something went wrong",error)
        return res.status(500).send("something went wrong")
    }
}

module.exports = { registerUser,login,editUser }