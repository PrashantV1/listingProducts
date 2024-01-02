const Joi = require('joi');


 const signUpSchema={
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
}


 const loginSchema={
    email: Joi.string().required(),
    password: Joi.string().required(),
}


const signUpBody = { body: signUpSchema};
const loginBody = { body: loginSchema};

module.exports={
    signUpBody,loginBody
}