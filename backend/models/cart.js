   import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
 
bookIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "books",
        required:true
      }],
   
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required:true
  }
},{
    versionKey:false
});




const Cart= mongoose.model("carts", cartSchema);
export default Cart