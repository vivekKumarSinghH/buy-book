import express from "express";
import { addItem, deleteCart, getCart } from "../controllers/cart.js";
const router = express.Router();



router.post("/:id/:user",addItem)
router.get("/:id",getCart)
router.delete("/:id",deleteCart)

export default router;