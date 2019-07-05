const mongoose = require('mongoose');

// Define Schemes
const UserSchema = new mongoose.Schema({
  Login_id: { type: String, required: true, unique: true },
  Name: { type: String, required: true },
  Number: { type: String, default: false }
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

  // Find One by usersid
  UserSchema.statics.findOneByName_Number = function (name, number) {
    return this.findOne({ Name : name, Number : number });
  };

  // Update by todoid
  UserSchema.statics.updateByUserid = function (Login_id, payload) {
    // { new: true }: return the modified document rather than the original. defaults to false
    return this.findOneAndUpdate({ Login_id }, payload, { new: true });
  };

  // Delete by todoid
  UserSchema.statics.deleteByUserid = function (Login_id) {
    return this.remove({ Login_id });
  };



// Create Model & Export
module.exports = mongoose.model('Users', UserSchema);
// Schema is no longer used after creating the model.
// model -> Statics model method
