import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import  Button  from '@mui/material/Button';
import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { register } from '../redux/features/authSlice';
import { CircularProgress } from '@mui/material';

const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  };
export default function Signup() {
    
      
        const [formValue, setFormValue] = React.useState(initialState);
        const { loading, error } = useSelector((state) => ({ ...state.auth }));
      const navigate=useNavigate()
      const dispatch=useDispatch()
        const { firstName,
          lastName,
          email,
          password,
          confirmPassword } = formValue;
      
        React.useEffect(() => {
          error && toast.error(error);
        }, [error]);
      
        const handleSubmit = () => {
      
          if (confirmPassword !== password) {
            return toast.error("Password should be the same")
          }
      
          if (firstName &&
            lastName &&
            email &&
            password &&
            confirmPassword) {
            dispatch(register({ formValue,navigate, toast }));
        setFormValue(initialState) 
        }
          else{
              return toast.error("Please fill all details.")
          }
        };
        const onInputChange = (e) => {
          let { name, value } = e.target;
          setFormValue({ ...formValue, [name]: value });
        };
      
      
  
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1,maxWidth:"100%" },
      }}
      noValidate
      autoComplete="off"
      className="signup"
    >
    <div>
    <AccountCircleIcon fontSize="large" className="text-[#949394]"/>
    <h2 className="text-xl p-2 text-[#949394]">Sign Up</h2>
    </div>
    <div className="flex md:flex-row flex-col gap-4 ">
    
    <TextField 
    color="secondary"
     size="small" label="First Name" variant="outlined" value={firstName} onChange={onInputChange} name="firstName" />
    <TextField 
    color="secondary"
     size="small" label="Last Name" variant="outlined" value={lastName} onChange={onInputChange} name="lastName"/>
    </div>
      <TextField   color="secondary" value={email} name="email" onChange={onInputChange}  size="small" label="Email" variant="outlined" />
      <TextField   color="secondary" value={password} type="password" name="password" onChange={onInputChange} size="small" label="Password" variant="outlined" />
      <TextField   color="secondary" value={confirmPassword} type="password" name="confirmPassword" onChange={onInputChange} size="small" label="Confirm Password" variant="outlined" />
      

      {loading&& <div className="text-center" ><CircularProgress  color="secondary" />
      </div>}     
    
<Button variant="contained" onClick={handleSubmit} color="secondary" className="bg-[#7b1fa2]" >
Sign Up
</Button>

<hr/>

<Link to="/login" className="text-[#b076c9] hover:cursor-pointer hover:text-[#7b1fa2] text-lg">
Already have an account? Login
</Link>
      </Box>
  );
}
