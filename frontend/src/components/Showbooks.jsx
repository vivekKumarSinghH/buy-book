import { Button } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom'
import { addCart, deleteCart } from '../redux/features/authSlice'
import { deleteBook } from '../redux/features/bookSlice';

export default function Showbooks({ books }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => ({ ...state.auth }));
    return (
        <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-[90%] md:w-[80%]  gap-6 p-4 m-auto">
            {
                books.map((ele) => {
                    return <div key={ele._id}
                        className="rounded-lg text-center bg-[#F6E7D8]
                         shadow-lg text-[#7b1fa2]"
                    >

                        <img src={ele.poster} className="rounded-t-lg  w-full h-[240px]" />
                        <div className="pdiv">
                            <p className="text-2xl font-semibold hover:cursor-pointer hover:text-red-400" onClick={() => {

                                navigate(`/singlebook/${ele._id}`)
                            }}>{ele.title.length > 35 ? ele.title.substr(1, 35) + "...." : ele.title}</p>

                            <div className="flex items-center justify-between w-[70%] m-auto mt-1">
                                <span className="text-2xl font-semibold">₹{ele.price - Math.floor((ele.discount * ele.price) / 100)}</span>
                                <span className="text-gray-400 line-through">₹{ele.price}</span></div>

                            {!(user?.result?.role == "admin") ? <div className="flex justify-between gap-4 w-[80%] m-auto mt-1"> <Button variant="contained"
                            
                            disabled={!user}
                            
                            onClick={() => {

                                    dispatch(deleteCart(user?.result?._id))
                                    dispatch(addCart({ userId: user.result._id, bookId: ele._id, navigate, to: "/checkout", toast }))
                                }}
                                color="secondary" className="bg-[#7b1fa2]" >
                                Buy now
                            </Button>

                                <Button variant="contained"
                                disabled={!user}   
                                onClick={() => {

                                        dispatch(addCart({ userId: user.result._id, bookId: ele._id, navigate, to: "/cart", toast }))
                                    }}
                                    color="secondary" className="bg-[#7b1fa2]" >
                                    Add To cart
                                </Button>




                            </div>



                                :

                                <div className="flex justify-between gap-4 w-[80%] m-auto mt-1">
                                    <Button variant="contained"

                                        onClick={() => {

                                            dispatch(deleteBook({ id: ele._id, toast }))
                                        }}
                                        color="secondary" className="bg-[#7b1fa2]" >
                                        delete
                                    </Button>


                                    <Button variant="contained"
                                        onClick={() => {
                                            navigate(`/editBook/${ele._id}`)
                                        }}
                                        color="secondary" className="bg-[#7b1fa2]" >
                                        update
                                    </Button>
                                </div>
                            }
                        </div>
                    </div>

                })
            }


        </div>
    )
}
