import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router';
import { getBooks } from '../redux/features/bookSlice'
import PaginationComp from './Pagination';
import Showbooks from './Showbooks'
import Spinner from './Spinner';


export default function Diffentpages() {
 let {category}=useParams()
 
//  console.log(category)
    const [page, setPage] = React.useState(1);

    const [sort,setsort]=useState(null)
    const dispatch = useDispatch()

   
    
 
    const { books,numberOfPages,loading } = useSelector((state) => state.book)

    useEffect(() => {
        dispatch(getBooks({page,category,sort}))

    }, [sort,page,category])
   

    if (loading) {
        return <Spinner />;
      }

    return (<>

      

        <Showbooks books={books} />
<div className="flex justify-between gap-2 w-[80%] sm:w-[60%] md:w-[50%] lg:w-[25%] m-auto my-4">        <Button variant="contained"
            onClick={()=>{
          
                setsort(1)
                }}
            color="secondary" className="bg-red-400" >
          Sort Low to High
        </Button>
        <Button variant="contained"
        onClick={()=>{
      
            setsort(-1)
            }}
        color="secondary" className="bg-red-400" >
        sort high to low
    </Button>

    </div>

    
<div className="w-fit m-auto my-8">
        <PaginationComp  page={page} setPage={setPage} total={numberOfPages}/>
        </div>  
        </>    )
}
