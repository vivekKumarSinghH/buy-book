import mongoose from "mongoose";

const BookSchema = mongoose.Schema({
  title: {type:String,required:true},
  description:{type:String,required:false},
  price:{type:String,required:true},
  discount:{type:String,required:true},
  category: {type:String,required:true},
  poster: {type:String,required:true},
author:{type:String}
 
},{
  versionKey:false,
  timestamps:true
});

const BookModal = mongoose.model("books", BookSchema);

export default BookModal;
