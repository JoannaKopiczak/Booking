const mongoose = require('mongoose')

// const UserSchema = new mongoose.Schema({
//     username: {
//         type: String,
//         required: true, 
//         unique: true
//     },
//     password: {
//         type: String,
//         required: true
//     },
// },
//     { collection: 'users' }
// )
// const model = mongoose.model('UserSchema', UserSchema)
// module.exports = model

const userSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    email: {
      type: String,
      required: true,
      match: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/,
    },
    password: { type: String, required: true },
    favouriteSpectacles: [{ type: String }],
  });
  
  module.exports = mongoose.model("User", userSchema, "users");
  