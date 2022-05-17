import axios from "axios";

const url="https://buy-bookm.herokuapp.com/"
const API = axios.create({
  baseURL: url,
});



export const signIn = (formData) => API.post("/users/signin", formData);
export const signUp = (formData) => API.post("/users/signup", formData);
export const googleSignIn = (formData) => API.post("/users/googleSignIn", formData);
export const updateUser = (updatedUserData, id) =>
  API.patch(`/users/${id}`, updatedUserData);

  export const AddCart = (bookId,userId) => API.post(`/cart/${bookId}/${userId}`);
  export const getCart = (userId) => API.get(`/cart/${userId}`);
  export const deleteCart = (userId) => API.delete(`/cart/${userId}`);


export const createBook = (formData) => API.post("/books", formData);
export const getBooks = ({c,s,p}) =>   API.get(`/books/all/?${c}&&${s}&&${p}`);
export const getBook = (id) =>   API.get(`/books/single/${id}`);

export const deleteBook = (id) => API.delete(`/books/${id}`);
export const updateBook = (updatedBookData, id) =>
  API.patch(`/books/${id}`, updatedBookData);

  export const getBooksBySearch = (searchQuery) =>
  API.get(`/books/search?searchQuery=${searchQuery}`);
