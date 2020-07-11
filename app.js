const express = require("express");
const router = require("./router");
const app = express();

app.use(express.urlencoded({ extended: true}))
app.use('/',router)

const APP_PORT = 3000;

app.listen(APP_PORT, ()=>{
  console.log("listening..")
});
