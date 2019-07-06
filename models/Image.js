const mongoose = require('mongoose');
// Define Schemes
const ImageSchema = new mongoose.Schema({
  Login_id: { type: String, required: true },
  Url: { type: String, required: true},
  Timestamp: { type: Date, default: Date.now}
},
{
  timestamps: true
});

// Find All
ImageSchema.statics.findAll = function () {
  // return promise
  return this.find({});
};

// Find Images by ID
ImageSchema.statics.findImagesByID = function (login_id) {
  // return promise
  return this.find({ Login_id : login_id });
};

// Create new user document
ImageSchema.statics.create = function (payload) {
    // this === Model
    const Image = new this(payload);
    // return Promise
    return Image.save();
  };

ImageSchema.statics.insertinto = function (login_id, filename) {
  console.log(login_id +'------------------'+filename);
  const Image = new this({ Login_id : login_id , Url : filename });
  return Image.save();
};




module.exports = mongoose.model('Images', ImageSchema);
