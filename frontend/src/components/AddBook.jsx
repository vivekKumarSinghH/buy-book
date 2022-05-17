import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import FileBase from "react-file-base64";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate ,useParams} from "react-router-dom";
import { createBook, updateBook } from "../redux/features/bookSlice";
import { CircularProgress } from "@mui/material";

const initialState = {
  title: "",
  description: "",
  price: "",
  discount: "",
  poster: "",
  category: "",
};

const categories = [
  "Store",
  "Fiction",
  "Non-fiction",
  "Self Help",
  "Investing",
];

export default function AddBook() {
  const [formValue, setFormValue] = React.useState(initialState);
  const { loading, error,books } = useSelector((state) => ({ ...state.book }));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { title, description, price, discount, poster, category } = formValue;

  const {id}=useParams()

  React.useEffect(() => {
    error && toast.error(error);
  }, [error]);



  React.useEffect(()=>{
if(id!=="0"){
  const singleBook=books?.filter((b)=>b._id===id);
  // console.log(singleBook)
  if(singleBook){
    
  setFormValue(...singleBook)
}}
  },[id])



  const handleSubmit = () => {
    if (title && description && price && discount && poster && category) {
if(id!=="0"){
dispatch(updateBook({id, formValue, navigate, toast }))
}
else{

      dispatch(createBook({ formValue, navigate, toast }));
}
setFormValue(initialState);
    } else {
      return toast.error("Please fill all details.");
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
        "& > :not(style)": { m: 1, maxWidth: "100%" },
      
      }}
      
      noValidate
      autoComplete="off"
      className="signup"
    >
      <h2 className="text-xl  p-2 text-[#949394]">Add Book</h2>

      <TextField
        color="secondary"
        value={title}
        type="text"
        name="title"
        onChange={onInputChange}
        size="small"
        label="Title"
        variant="outlined"
      />

      <div className="flex md:flex-row flex-col gap-4 ">
        <TextField
          color="secondary"
          size="small"
          label="Price"
          variant="outlined"
          value={price}
          type="number"
          onChange={onInputChange}
          name="price"
        />
        <TextField
          color="secondary"
          size="small"
          label="Discount %"
          variant="outlined"
          value={discount}
          type="number"
          onChange={onInputChange}
          name="discount"
        />
      </div>

      <TextField
        color="secondary"
        size="small"
        select
        label="Select Category"
        value={category}
        name="category"
        onChange={onInputChange}
        className="text-left"
      >
        {categories.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        color="secondary"
        label="Description"
        multiline
        rows={3}
        value={description}
        onChange={onInputChange}
        name="description"
        type="text"
      />

      <FileBase
        type="file"
        multiple={false}
        onDone={({ base64 }) => setFormValue({ ...formValue, poster: base64 })}
        name="poster"
      />
      {loading&& <div className="text-center" ><CircularProgress  color="secondary" /> </div>}

      <Button
        variant="contained"
        onClick={handleSubmit}
        color="secondary"
        className="bg-[#7b1fa2]"
      >
        Add
      </Button>

    </Box>
  );
}
//