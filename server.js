import express from "express";
import dotenv from 'dotenv'
import cors from 'cors'
import Stripe from "stripe";

dotenv.config()
const app = express()
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
app.use(cors())
app.use(express.json())
const PORT = process.env.PORT || 5000



app.listen(PORT,()=>{
    console.log(`Server runing => ${PORT}`); 
})