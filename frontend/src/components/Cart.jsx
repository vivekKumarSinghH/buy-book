import { Button } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link ,useNavigate} from 'react-router-dom'

import { deleteCart, setBill } from '../redux/features/authSlice'
import Spinner from './Spinner'

export default function Cart() {
    const {cart,totalBill,user,loading}=useSelector((state)=>state.auth)


const dispatch=useDispatch()
const navigate=useNavigate()
useEffect(()=>{
    let sum=0
cart?.forEach((ele)=>{
let x=  ele.price - Math.floor((ele.discount * ele.price) / 100)
sum+=x
    })

dispatch(setBill(sum))
  },[cart])

  if (loading) {
    return <Spinner />;
  }
  
  return (
 <div className="checkout w-[90%] sm:w-[60%] md:w-[50%] lg:w-[40%]  m-auto mt-10 flex flex-col gap-4">
 {cart?
   <div className="flex flex-col gap-4 p-2 py-4">
    {
        
      cart?.map((ele)=><div key={ele._id} className="w-full flex gap-4 text-purple-600">
    
      <img src={ele.poster} className="w-[27%] sm:w-[15%]" />
      <div className="flex-11">
     <p>{ele.title}</p>
     <p>Price: ₹{ele.price - Math.floor((ele.discount * ele.price) / 100)}</p> 
      </div>
      
      </div>)
    
      
    }
    <p>Total Bill:-₹{totalBill} </p>
    <div className="flex gap-4">
    <Button
    variant="contained"
    color="secondary"
    className="bg-[#653779] w-full"
   onClick={()=>dispatch(deleteCart(user?.result?._id))
  }
    >
    clear Cart
    </Button>
    <Button
    variant="contained"
    color="secondary"
    className="bg-[#653779] w-full"
   onClick={()=>navigate("/checkout")}
    >
  Check out
    </Button>
    </div>
              </div>:
              <Link to="/" className="w-full bg-white text-2xl p-2 text-purple-600">Currently There is no books in the cart,Please Add some books</Link>}
    
    </div>
  )
}
