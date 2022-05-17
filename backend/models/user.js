import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  role:{type:String,required:false,default:"buyer"},
  password: { type: String, required: false },
  googleId: { type: String, required: false }
},{
  versionKey:false
});

export default mongoose.model("Users", userSchema);
