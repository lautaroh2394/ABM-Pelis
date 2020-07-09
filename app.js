const express = require("express");
const path = require("path");
const fs = require('fs');
const mongoInterface = require("./mongoInterface")
const generateIndex = require("./pages/index/generadorHTML.js").generateIndex

const app = express();

app.use(express.urlencoded({ extended: true}))

const APP_PORT = 3000;

app.use(express.static("public"))

app.get('/listado', function(req,res) { 
  generateIndex().then(r=>{
    res.send(r)
  })
});

app.get('/', function(req,res) { 
  res.redirect("/listado");
});

app.get("/nueva", (req,res)=>{
    res.sendFile(path.join(__dirname,"/pages/nueva/nueva.html"));
})

app.post("/nueva", (req,res)=>{
  console.log("Nueva", req.body)
  mongoInterface.insertar(req.body.nombre).then(mongoRes=>{
      res.redirect("/listado")
  })
})

app.post("/modificar",(req,res)=>{
  if (req.body.btn_name == "eliminar") res.redirect("/eliminar")

  console.log("Modificar", req.body);
  if (req.btn_name == "actualizar"){
    //TODO - UPDATE A LA MONGO  
  }
  res.sendFile(path.join(__dirname,"/pages/modificar/modificar.html"))
    // TODO - MOSTRAR PÁGINA DE EDICION
})

app.post("/eliminar", (req,res)=>{
  console.log("Eliminar", req.body);
  mongoInterface.eliminar(req.body.id).then(r=>{
    res.redirect("/listado");
  })
})

app.listen(APP_PORT, ()=>{
  console.log("listening..")
});
