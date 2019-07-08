const mongoose = require('mongoose');
// Define Schemes
const ImageSchema = new mongoose.Schema({
  Login_id: { type: String, required: true },
  Name:{ type: String, required: true},
  Url: { type: String, unique: true, required: true},
  Timestamp: { type: Date, default: Date.now},
  Comments: {}
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

ImageSchema.statics.insertinto = function (login_id,name, filename) {
  console.log(login_id +'------------------'+filename);
  const Image = new this({ Login_id : login_id , Name: name, Url : filename });
  return Image.save();
};

// Delete by id & url
ImageSchema.statics.deleteByidandurl = function (login_id, url) {
  return this.remove({ Login_id : login_id , Url : url });
};



module.exports = mongoose.model('Images', ImageSchema);
