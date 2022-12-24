const express = require("express");
const tickets = require("./tickets.model");

const app = express.Router();

app.get("/", async (req, res) => {
  try {
    const newtickets = await tickets.find({});
    if (newtickets) return res.send(newtickets);
    else {
      return res.send("Nothing is there yet");
    }
  } catch (e) {
    res.status(500).send(e.message);
  }
});
app.post('/usertickets',async(req,res)=>{
  let {userId}= req.body
  try {
    const usertickets = await tickets.find({ userId: userId });

    if (usertickets) return res.send(usertickets);
    else {
      return res.send("Nothing is there yet");
    }
  } catch (e) {
    res.status(500).send(e.message);
  }
})
app.patch("/:id", async (req, res) => {
  let { id } = req.params;
  try {
          let updated = await tickets.findByIdAndUpdate(id,req.body,{new:true})
          return res.send(updated);
  }
  catch (e) {
     res.status(500).send(e.message); 
  }
})
app.post("/", async (req, res) => {
  try {
    let newtickets = await tickets.create(req.body);
    console.log(newtickets);
    return res.status(201).send(req.body);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

app.delete("/:id", async (req, res) => {
  let { id } = req.params;
  try {
    let data = await tickets.findByIdAndRemove(id, { new: true });
    console.log(data);
    return res.send(data);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

module.exports = app;
