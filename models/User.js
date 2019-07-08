const mongoose = require('mongoose');
// const crypto = require('crypto');

// var genRandomString = function(length){
//   return crypto.randomBytes(Math.ceil(length/2)).toString('hex').slice(0, length);
// }

// var sha512 = function(password, salt){
//   var hash = crypto.createHmac('sha512', salt);
//   hash.update(password);
//   var value =hash.digest('hex');
//   return {
//     salt: salt,
//     passwordHash:value
//   };
// }

// function saltHashPassword(userPassword){
//   var salt = genRandomString(16);
//   var passwordData = sha512(userPassword, salt);
//   return passwordData;
// }

// function checkHashPassword(userPassword, salt){
//   var passwordData = sha512(userPassword, salt);
//   return passwordData;
// }


// Define Schemes
const UserSchema = new mongoose.Schema({
  Login_id: { type: String, required: true, unique: true },
  Name: { type: String, required: true },
  Number: { type: String, default: false },
  Profile_image_id: {type: String},
  Friends: {}
},
{
  timestamps: true
});


UserSchema.statics.newUserRegister = function(payload){
  const User = new this(payload);
  return User.save();
  // var plaint_password = User.Password;
  // var hash_data = saltHashPassword(plaint_password);

  // var password = hash_data.passwordHash;
  // var salt = hash_data.salt;
  
  // User.Salt = salt;
  // User.Password = password;

  // return User.save();

}

// Create new user document
UserSchema.statics.create = function (payload) {
    // this === Model
    const User = new this(payload);
    // return Promise
    return User.save();
  };

  // Find All
  UserSchema.statics.findAll = function () {
    // return promise
    return this.find({});
  };

  UserSchema.statics.findUsers = function(login_id){
    console.log(login_id);
    const query = new RegExp(login_id);
    return this.find({Login_id: query}).limit(5);
  }

  // find Users by loginid
  UserSchema.statics.findOneByLoginId = function(login_id){
    return this.findOne({Login_id : login_id});
  }


  // Find One by name and number
  UserSchema.statics.findOneByName_Number = function (name, number) {
    return this.findOne({ Name : name, Number : number });
  };

  UserSchema.statics.findOneByLoginId = function(login_id){
    return this.findOne({Login_id : login_id});
  }

  UserSchema.statics.findOneByName_LoginId = function (name, login_id) {
    return this.findOne({ Name : name, Login_id : login_id });
  };


  // Update User by login_id
  UserSchema.statics.updateByLoginId = function (Login_id, payload) {
    // { new: true }: return the modified document rather than the original. defaults to false
    return this.findOneAndUpdate({Login_id }, payload, { new: true });
  };

  // Update User Profile by Login_id
  UserSchema.statics.updateProfilebyLoginId = function (login_id, profile) {
    return this.findOneAndUpdate({ Login_id : login_id}, { $set: {Profile_image_id : profile} } );
  };

  // Delete by todoid
  UserSchema.statics.deleteByUserid = function (Login_id) {
    return this.remove({ Login_id });
  };



// Create Model & Export
module.exports = mongoose.model('Users', UserSchema);
// Schema is no longer used after creating the model.
// model -> Statics model method
