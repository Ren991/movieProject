/* import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name: {type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    id:{type:String}
})
const Users =  mongoose.model("Users",userSchema);
export default Users */

import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required:  true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  id: { type: String },
});

export default mongoose.model("User", userSchema);