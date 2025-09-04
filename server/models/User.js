import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  resume: { type: String },
  image: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

export default User;



// import mongoose from "mongoose";

// const UserSchema = new mongoose.Schema({
//   _id: { type: String ,required: true}, // Clerk user id
//   name: { type: String ,required: true},
//   email: { type: String, required: true , unique: true },
//   image: { type: String , required: true}, 
//   resume: { type: String } // optional resume
// }); 

// const User = mongoose.model('User', userSchema);
// export default User;