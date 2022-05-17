import { useEffect, useState } from 'react'

import './App.css'
import Header from './components/Header'
import Signup from './components/Signup'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes } from 'react-router'
import Login from './components/Login'
import { useDispatch } from 'react-redux'
import { setUser } from './redux/features/authSlice'
import AddBook from './components/AddBook'

import Diffentpages from './components/DifferntPage'
import Home from './components/Home';
import GetSingleBook from './components/GetSingleBook';
import Checkout from './components/Checkout';
import Cart from './components/Cart';
import NotFound from './components/NotFound';
import PrivateRoute from './components/PrivateRouter';


// function loadScript(src) {
// 	return new Promise((resolve) => {
// 		const script = document.createElement('script')
// 		script.src = src
// 		script.onload = () => {
// 			resolve(true)
// 		}
// 		script.onerror = () => {
// 			resolve(false)
// 		}
// 		document.body.appendChild(script)
// 	})
// }

// const __DEV__ = document.domain === 'localhost'


function App() {
  const dispatch=useDispatch()

  const user=JSON.parse(localStorage.getItem("profile"))
 
  useEffect(() => {
  
    dispatch(setUser(user))
  
  
  }, [])

 
    
	// async function displayRazorpay() {
	// 	const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

	// 	if (!res) {
	// 		alert('Razorpay SDK failed to load. Are you online?')
	// 		return
	// 	}

	



		// const options = {
		// 	key: __DEV__ ? 'rzp_test_uGoq5ABJztRAhk' : 'PRODUCTION_KEY',
		// 	currency: data.currency,
		// 	amount: data.amount.toString(),
		// 	order_id: data.id,
		// 	name: 'Donation',
		// 	description: 'Thank you for nothing. Please give us some money',
		
		// 	handler: function (response) {
		// 		alert(response.razorpay_payment_id)
		// 		alert(response.razorpay_order_id)
		// 		alert(response.razorpay_signature)
		// 	},
		// 	prefill: {
		// 		name,
		// 		email: 'sdfdsjfh2@ndsfdf.com',
		// 		phone_number: '9899999999'
		// 	}
		// }
		// const paymentObject = new window.Razorpay(options)
		// paymentObject.open()
	// }
    // const displayRazorpay=async(amount)=>{
    // console.log(amount)
    // const res=await loadScript('https://checkout.razorpay.com/v1/checkout.js')
    
    // if(!res){
    //   alert("You're not connected to internet... failed to connect to razopay.")
    // return
    // }
    // }

  return (
    <div className="App ">
  
     <Header />
     <ToastContainer/>
     <Routes>
     
     <Route path="/login" element={<Login/>}/>
     <Route path="/signup" element={<Signup/>}/>
     <Route path="/editBook/:id" element={
      <PrivateRoute>
      <AddBook/>
      </PrivateRoute>
    }/>

     <Route path="/category/:category" element={<Diffentpages/>}/>
     <Route path="/singlebook/:id" element={<GetSingleBook/>}/>
     <Route path="/cart" element={
       <PrivateRoute>
      <Cart/>
      </PrivateRoute>
    }/>
     <Route path="/checkout" element={
      <PrivateRoute>
      <Checkout />
      </PrivateRoute>}/>
     <Route path="/" element={<Home/>}/>
     
     
     <Route path="*" element={<NotFound/>} />

     </Routes>
    
    </div>
  )
}

export default App
