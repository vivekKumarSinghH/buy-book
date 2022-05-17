import { Pagination } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux';
import { setCurrentPage } from '../redux/features/bookSlice';

export default function PaginationComp({total,page,setPage}) {
const dispatch=useDispatch()
    const handleChange = (event, value) => {
        setPage(value);
        dispatch(setCurrentPage(page))
      };
 
    return (
    <>
    <Pagination count={+total} page={page} color="secondary"  onChange={handleChange}/>
        
    </>
  )
}
