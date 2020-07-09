const index = require("./listado");
const mongoInterface = require("../../mongoInterface")

const generarItem = (nombre,id)=>{
    return `<form class="contact100-form" method="post">
    <div class="input-container-80">
        <div class="wrap-input100 bg1">
            <input type="text" name="nombre" disabled class="input100-contained" value="${nombre}">
            <input type="hidden" name="id" value="${id}">
        </div>
    </div>
    <div class="input-container-10 btn-container">
        <button name="btn_name" formaction="/eliminar" value="eliminar" class="btn-contained btn-eliminar">Eliminar</button>
    </div>
    <div class="input-container-10 btn-container">
        <button name="btn_name" formaction="/modificar" value="editar" class="btn-contained btn-editar">editar</button>
    </div>
</form>`
}

const topHtml = `<!DOCTYPE html>
<html lang="es">
<head>
	<title>Pelis</title>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">	
	<link rel="stylesheet" type="text/css" href="nueva.css">
</head>
<body>
	<div class="container-contact100">
        <div class="wrap-contact100">
        `

const bottomHtml = `
<form action="/nueva" method="get">
                <div class="container-contact100-form-btn">
					<button class="contact100-form-btn btn-nueva">
                        Nueva
					</button>
				</div>
            </form>
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