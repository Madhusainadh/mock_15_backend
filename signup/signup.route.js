const express = require("express");
const signup = require("./signup.model");

const app = express.Router();

app.get("/allusers", async (req, res) => {
  try {
    const newsignup = await signup.find({});
    if (newsignup) return res.send(newsignup);
    else {
      return res.send("Nothing is there yet");
    }
  } catch (e) {
    res.status(500).send(e.message);
  }
});
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    let checkUser = await signup.findOne({ email, password });
    console.log(checkUser);
    if (!checkUser) {
      return res.status(401).send("Authentication failed, need to sign-up");
    }
    return res.status(200).send({
      token: `${checkUser.id}:${checkUser.email}:${checkUser.name}`,
    });
  } catch (e) {
    res.status(500).send(e.message);
  }
});

app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let checkUser = await signup.findOne({ email });
    console.log(checkUser);
    if (checkUser) {
      return res
        .status(401)
        .send("Registration fails as user already registered");
    }
    let newUser = await signup.create({
      name,
      email,
      password,
    });
    console.log(newUser);
    res.send({
      token: `${newUser.id}:${newUser.email}:${newUser.name}`,
    });
  } catch (e) {
    res.status(500).send(e.message);
  }
});


app.delete("/:id", async (req, res) => {
  let { id } = req.params;

  try {
    let data = await signup.findByIdAndRemove(id, { new: true });
    console.log(data);
    return res.send(data);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

module.exports = app;
