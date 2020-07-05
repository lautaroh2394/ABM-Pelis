const express = require("express");
const path = require("path");
const fs = require('fs');
const mongoInterface = require("./mongoInterface").mongoInterface
const generateIndex = require("./pages/index/generadorHTML.js").generateIndex

const app = express();

app.use(express.urlencoded({ extended: true}))

const APP_PORT = 3000;

const returnListado = function(req,res) { 
  generateIndex().then(r=>{
    res.send(r)
  })
}

app.get('/listado', returnListado);
app.get('/', returnListado);


app.post("/nueva", (req,res)=>{
    mongoInterface.insertar(req.body.nombre).then(mongoRes=>{
        generateIndex().then(indexPage=>{
            res.send(indexPage)
          })
    })
})

app.get("/nueva", (req,res)=>{
    res.sendFile(path.join(__dirname,"/pages/nueva/nueva.html"));
})

app.listen(APP_PORT, ()=>{
  console.log("listening..")
});
