import { Button } from '@mui/material';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { addCart, deleteCart } from '../redux/features/authSlice';
import { getBook } from '../redux/features/bookSlice';
export default function GetSingleBook() {
    const {id}=useParams()
    const {book}=useSelector((state)=>state.book)
    const { user } = useSelector((state) => ({ ...state.auth }));
    const navigate=useNavigate()
const dispatch=useDispatch()
    useEffect(() => {
    
dispatch(getBook(id))
    }, [id])
    
    // console.log(book)
  return (
    <div className=" w-[90%] sm:w-fit    shadow-2xl m-auto  mt-6">
    
    <div className="gap-4">
    
    <div>
    <img src={book.poster}/>
    </div>
    <div className="text-left mt-4 px-4 text-2xl text-[#7b1fa2]">
    <p className="font-semibold">{book.title}</p>
    <p >Written by - {book.author}</p>
    <p >Category - {book.category}</p>
    
    <p>Price - ₹{ book.price - Math.floor((book.discount * book.price) / 100)}</p>
    <p>Discount - {book.discount}%</p>

    <div className="flex justify-between gap-4 w-[80%] m-auto my-4 "> <Button variant="contained"
                                onClick={() => {

                                    dispatch(deleteCart(user?.result?._id))
                                    dispatch(addCart({ userId: user.result._id, bookId: book._id, navigate, to: "/checkout", toast }))
                                }}
                                color="secondary" className="bg-[#7b1fa2]" >
                                Buy now
                            </Button>

                                <Button variant="contained"
                                    onClick={() => {

                                        dispatch(addCart({ userId: user.result._id, bookId: book._id, navigate, to: "/cart", toast }))
                                    }}
                                    color="secondary" className="bg-[#7b1fa2]" >
                                    Add To cart
                                </Button>


 

                            </div>
    </div>
    </div>

    </div>
  )
}
