const mongoose = require('mongoose');

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
    return this.find({Login_id: query }).limit(5);
  }

  // find Users by loginid
  UserSchema.statics.findOneByLoginId = function(login_id){
    return this.findOne({Login_id : login_id});
  }


  // Find One by name and number
  UserSchema.statics.findOneByName_Number = function (name, number) {
    return this.findOne({ Name : name, Number : number });
  };


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
