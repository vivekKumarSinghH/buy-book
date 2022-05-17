import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { deleteCart, setBill } from "../redux/features/authSlice";
import Spinner from "./Spinner";


const init = {
  address1: "",
  address2: "",
  city: "",
  country: "",
  pincode: "",
  phone: ""
}

export default function Checkout() {

  const [formValue, setFormValue] = useState(init)
  const [openOrder, setOpen] = useState(false)
  const [otp, setOtp] = useState(false)
  const { cart, totalBill, loading ,user} = useSelector((state) => state.auth)


  const dispatch = useDispatch()
  const navigate=useNavigate()

  const {
    address1,
    address2,
    city,
    country,
    pincode,
    phone } = formValue


  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };
  const handleSubmit = () => {


    if (address1,
      address2,
      city,
      country,
      pincode,
      phone) {
      if (phone.length != 10) {
        return toast.error("Phone no. should be of 10 digits only")
      }
      if (pincode.length != 6) {
        return toast.error("Pin Code should be of 6 digits only")
      }

      setOpen(true)
      return toast.success("Address Saved successfully")

    }
  };
  // console.log(cart)

  useEffect(() => {
    let sum = 0
    cart?.forEach((ele) => {
      let x = ele.price - Math.floor((ele.discount * ele.price) / 100)
      sum += x
    })

    dispatch(setBill(sum))
  }, [cart])

  if (loading) {
    return <Spinner />;
  }

  //razopay interagtion



  return (
    <div className="checkout w-[90%] sm:w-[60%] md:w-[50%] lg:w-[40%]  m-auto mt-10 flex flex-col gap-4">
      <div className="bg-red-400">
        <p className="">
          <span className="bg-gray-200 p-1 mx-2  text-blue-500 text-sm rounded-sm">
            1
          </span>{" "}
          Delivery Address
        </p>

        {!openOrder && <div className="addressform">
          <TextField
            color="secondary"
            size="small"
            label="Address line 1"
            variant="outlined"
            name="address1"
            type="text"
            value={address1}
            onChange={onInputChange}
          />
          <TextField
            color="secondary"
            size="small"
            type="text"
            label="Address Line 2"
            variant="outlined"
            name="address2"
            value={address2}
            onChange={onInputChange}
          />

          <TextField
            color="secondary"
            size="small"
            label="City"
            variant="outlined"
            type="text"
            name="city"
            value={city}
            onChange={onInputChange}
          />
          <div className="flex md:flex-row flex-col gap-4">
            <TextField
              className="flex-1"
              color="secondary"
              size="small"
              label="Country"
              type="text"
              variant="outlined"
              name="country"
              value={country}
              onChange={onInputChange}
            />
            <TextField
              className="flex-1"
              color="secondary"
              size="small"
              label="Postal code"
              type="number"
              variant="outlined"
              name="pincode"
              value={pincode}
              onChange={onInputChange}
            />
          </div>
          <TextField
            color="secondary"
            size="small"
            type="number"
            label="Phone"
            variant="outlined"
            name="phone"
            value={phone}
            onChange={onInputChange}
          />

          <Button
            variant="contained"
            color="secondary"
            className="bg-[#7b1fa2]"
            onClick={handleSubmit}
          >
            Proceed to checkout
          </Button>
        </div>}

      </div>

      <div>
        <p>
          <span className="bg-gray-200 p-1 mx-2  text-blue-500 text-sm rounded-sm">
            2
          </span>{" "}
          Order Summary
        </p>

        {openOrder && <div className="flex flex-col gap-4 p-2 py-4">
          {
            cart?.map((ele) => <div key={ele._id} className="w-full flex gap-4 text-purple-600">

              <img src={ele.poster} className="w-[27%] sm:w-[15%]" />
              <div className="flex-11">
                <p>{ele.title}</p>
                <p>Price: ₹{ele.price - Math.floor((ele.discount * ele.price) / 100)}</p>
              </div>

            </div>)


          }
          <p>Total Bill:-{totalBill} </p>
         
        </div>}


      </div>
      <div className="bg-red-400">
      <p className="">
        <span className="bg-gray-200 p-1 mx-2  text-blue-500 text-sm rounded-sm">
          3
        </span>{" "}
        Card Details
      </p>

     {openOrder&& <div className="addressform">
        
        

        <TextField
          color="secondary"
          size="small"
          label="Card Number"
          variant="outlined"
          type="number"
          
        />
        <div className="flex md:flex-row flex-col gap-4">
          <TextField
            className="flex-1"
            color="secondary"
            size="small"
            label="CVV"
            type="number"
            variant="outlined"
          
          />
          <TextField
            className="flex-6"
            color="secondary"
            size="small"
           
            type="date"
            variant="outlined"
         
          />
          
        </div>
        {otp&&<TextField
          color="secondary"
          size="small"
          type="number"
          label="Otp"
          variant="outlined"
         
        />}
        
{otp?
        <Button
          variant="contained"
          color="secondary"
          className="bg-[#7b1fa2]"
      onClick={()=>{
        alert("thank you for ordering")
        
          dispatch(deleteCart(user?.result?._id))
        navigate("/")}}
        >
          pay
        </Button>:

        <Button
        variant="contained"
        color="secondary"
        className="bg-[#7b1fa2]"
     onClick={()=>setOtp(!otp)}
      >
        Generate Otp
      </Button>
    
    }
      </div>}

    </div>


      
    </div>

  );
}
// <div ref={address} className="hidden">hello</div>
