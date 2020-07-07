const index = require("./listado");
const mongoInterface = require("../../mongoInterface").mongoInterface

const generarItem = (nombre,id)=>{
    return `<form class="contact100-form" action="/delete" method="post">
    <div class="input-container-90">
        <div class="wrap-input100 bg1">
            <input type="text" name="nombre" disabled class="input100-contained" value="${nombre}">
            <input type="hidden" name="id" value="${id}">
        </div>
    </div>
    <div class="input-container-10 btn-container">
        <button class="btn-contained">Delete</button>
    </div>
</form>`
}

const topHtml = `<!DOCTYPE html>
<html lang="en">
<head>
	<title>Contact V5</title>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">	
	<link rel="stylesheet" type="text/css" href="nueva.css">
</head>
<body>
	<div class="container-contact100">
        <div class="wrap-contact100">
        `

const bottomHtml = `
</div>
    </div>
</body>
</html>
`

const generarListadoHTML = ()=>{
    return new Promise(res=>{
        mongoInterface.listadoPeliculas().then(peliculas=>{
            res(topHtml + peliculas.map(e=>generarItem(e.nombre,e._id.toString())).join("\n") + bottomHtml)
        })
    })
}

module.exports.generateIndex = generarListadoHTML