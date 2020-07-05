const index = require("./listado");
const mongoInterface = require("../../mongoInterface").mongoInterface

const htmlizeNonStringValue = (value) =>{
    if (Array.isArray(value)){
        return htmlizeNonStringValue(
            {
                ul: value.map(v=>{
                    return htmlizeValue("li",JSON.stringify(v))
                }).join("")
            }
        ) 
    }
    if (typeof(value) == "object"){
        return htmlizeNonStringValue(Object.keys(value).reduce((prev,curr)=>prev+htmlizeValue(curr, value[curr]),""))
    }
    return value
}

const htmlizeValue = (key,value)=>{
    let v = (typeof(value) == "string") ? value : htmlizeNonStringValue(value)
    return `<${key}>${v}</${key}>`
}

const generateIndex = async ()=>{
    let html = "<!DOCTYPE html>"
    let listado = await (mongoInterface.listadoPeliculas())
    index.html.body = listado
    html += htmlizeNonStringValue(index)
    return html
}

module.exports.generateIndex = generateIndex