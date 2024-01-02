const { User } = require('../models/index.js');
const ApiError = require('../utils/ApiError');
const { genRandom } = require('../utils/random');
const { generateAuthTokens } = require('./auth.service');
const { createPassword,checkPassword } = require('./password.service');


const createUser = async (userBody) => {
    if (await User.isEmailTaken(userBody.email)) {
        throw new ApiError(400, 'Email already taken');
    }
        if (!userBody.password.match(/\d/) || !userBody.password.match(/[a-zA-Z]/)) {
            throw new ApiError(400,'Password must contain at least one letter and one number');
          }
          userBody.salt=genRandom(userBody.email.toUpperCase().substr(0, 3),userBody.name.length);
    await createPassword({type:'user',...userBody})
    const user = await User.create(userBody);
    return {
      success:true,
      message:'User Created'
    };
  };


  const loginUser  = async (data) => {
    const {email,password}=data;
     const checkUserExists=  await User.isEmailTaken(email)
    if (!checkUserExists) {
        throw new ApiError(401, 'Email not exists');
    }
    const validCreds=await checkPassword({password,salt:checkUserExists.salt,type:"user"})
    if(!validCreds)
    throw new ApiError(401, 'Invalid Login Details');

    const token= await generateAuthTokens(checkUserExists,'User');
    return {sucess:true,token};
  };

  module.exports = {
    createUser,loginUser
  };
  

  