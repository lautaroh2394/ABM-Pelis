const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require('fs'); 
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

    if (req.body.btn_name == "actualizar"){
        console.log("Actualizar en bd", req.body);
        mongoInterface.editar(req.body.id,{nombre: req.body.nombre}).then(r=>{
            res.redirect("/")
        })
    }

    if (req.body.btn_name == "editar"){
        console.log("Editar en web", req.body);
        mongoInterface.getPelicula(req.body.id).then(pelicula=>{
            fs.readFile(path.join(__dirname,"/pages/modificar/modificar.html"), (err, file) => {
                res.send(file
                    .toString()
                    .replace(/\$nombre\-value/g, pelicula.nombre)
                    .replace(/\$id\-value/g, pelicula._id)
                )
            })
        }).catch(e=>console.log("Error - post modificar", e))
    }
})

router.post("/eliminar", (req,res)=>{
    console.log("Eliminar", req.body);
    mongoInterface.eliminar(req.body.id).then(r=>{
        res.redirect("/listado");
    })
})

module.exports = router;