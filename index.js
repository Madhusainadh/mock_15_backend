const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv');
const mongoose = require("mongoose")
const userrouter = require("./signup/signup.route");
const ticketsroute = require("./tickets/tickets.route");
const connect = require("./Config/config");
require('dotenv').config();
const app = express();
app.use(cors());
app.get("/",(req,res)=>{
    res.send("Hello world")
})
app.use(express.json());
let PORT = process.env.PORT||8080
mongoose.set('strictQuery', true);
app.use("/tickets", ticketsroute);
app.use("/", userrouter);

app.listen(PORT, async () => {
    await connect();
    console.log("User heat the server!!");
})
