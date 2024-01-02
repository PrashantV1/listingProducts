const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');



const passwordSchema = mongoose.Schema(
  {
    type: {
      type: String,
      enum:['user','admin']
    },
    salt:{
        type:String
    },
    password:{
        type:String
    }
});



passwordSchema.plugin(toJSON);




const Password = mongoose.model('Password', passwordSchema);

module.exports = Password;
