

import Cart from "../models/cart.js";

export const addItem = async(req, res) => {
  try {
    const query = { userId: req.params.user };
    const result = await Cart.findOne(query)
  //  console.log(result)
    if(!result){
      const products = await Cart.create({
        bookIds: [req.params.id],
        userId: req.params.user,
      })
      const ans= await Cart.findOne(query).populate("bookIds")
        .populate("userId").lean().exec();

// console.log(ans)
  
      return res.status(200).json({cart:ans});
    }
    var updateDocument;
    if(!result.bookIds.find((ele)=>(ele==req.params.id))){
      updateDocument = {
        $push: { bookIds: req.params.id },
      };
    }else{
      const re = await Cart.findOne(query).populate("userId").populate("bookIds").lean().exec();
      return res.status(200).json({cart:re});
    }
    const p = await Cart.findOneAndUpdate(query, updateDocument, {
      new: true,
    })
      .populate("bookIds")
      .populate("userId")
      .lean()
      .exec();

      return res.status(200).json({cart:p});
  } catch (e) {
    return res.status(500).send(e.message);
  }
}



export const getCart= async (req, res) => {
  try {
    const products = await Cart.find({userId:req.params.id})
      .populate("bookIds")
      .populate("userId")
      .lean()
      .exec();

      // console.log([...products])
    return res.status(200).json({cart:products});
  } catch (e) {
    return res.status(500).send(e.message);
  }
}

export const deleteCart= async (req, res) => {
  try {
    const products = await Cart.findOneAndDelete({ userId: req.params.id })
      .lean()
      .exec();

    return res.send(products);
  } catch (e) {
    return res.status(500).send(e.message);
  }
}

