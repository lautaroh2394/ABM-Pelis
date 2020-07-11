const express = require("express");
const router = express.Router();
const path = require("path");
const mongoInterface = require("./mongoInterface")
const generateIndex = require("./pages/index/generadorHTML.js").generateIndex

router.use(express.static("public"))

router.get('/listado', function(req,res) { 
    generateIndex().then(r=>{
      res.send(r)
    })
});
  
router.get('/', function(req,res) { 
    res.redirect("/listado");
});

router.get("/nueva", (req,res)=>{
    res.sendFile(path.join(__dirname,"/pages/nueva/nueva.html"));
})

router.post("/nueva", (req,res)=>{
    console.log("Nueva", req.body)
    mongoInterface.insertar(req.body.nombre).then(mongoRes=>{
        res.redirect("/listado")
    })
})

router.post("/modificar",(req,res)=>{
    if (req.body.btn_name == "eliminar") res.redirect("/eliminar")

    console.log("Modificar", req.body);
    if (req.btn_name == "actualizar"){
        //TODO - UPDATE A LA MONGO  
    }
    res.sendFile(path.join(__dirname,"/pages/modificar/modificar.html"))
        // TODO - MOSTRAR PÁGINA DE EDICION
})

router.post("/eliminar", (req,res)=>{
    console.log("Eliminar", req.body);
    mongoInterface.eliminar(req.body.id).then(r=>{
        res.redirect("/listado");
    })
})

module.exports = router;