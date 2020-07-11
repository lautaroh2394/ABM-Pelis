const {MongoClient, ObjectId } = require('mongodb');
const MONGO_PORT = 127017;
const url = `mongodb://localhost:${27017}`;
const DB = "PeliSys"
const COLLECTION = "peliculas"
let CLIENT = undefined;

const connect = () => {
    return new Promise(async (res)=>{
        if (!!CLIENT) res(CLIENT);
        CLIENT = await MongoClient.connect(url,{ useUnifiedTopology: true });
        let existingCollections = await CLIENT.db(DB).listCollections().toArray()
        if (!existingCollections.some(c=>c.name == COLLECTION)){
            await CLIENT.db(DB).createCollection(COLLECTION)
        }
        res(CLIENT);
    }).catch(e=>console.log("Error - connect", e))
}

const listadoPeliculas = async function() {
    let client = await connect();
    let query = await client.db(DB).collection(COLLECTION).find({}).toArray();
    return query
}

const listadoPeliculasProm = ()=>{
    return new Promise(res=>{
        connect().then(client => 
            client.db(DB).collection(COLLECTION).find({}).toArray()
            .then(query => res(query))
    )})
}

const insertar = (nombre) =>{
    return connect().then(client=>{
        client.db(DB).collection(COLLECTION).insertOne({"nombre":nombre})
    })
}

const eliminar = (id) =>{
    return connect().then(client=>{
        client.db(DB).collection(COLLECTION).deleteOne({"_id":ObjectId(id)})
    })
}

const editar = (id, edit) =>{
    return connect().then(client=>{
        client.db(DB).collection(COLLECTION).updateOne(
            {"_id":ObjectId(id)},
            {$set:edit}
        )}
    )
}

const getPelicula = id => {
    return new Promise(res=>{
        connect().then(client => 
            client.db(DB).collection(COLLECTION).findOne({"_id":ObjectId(id)})
            .then(query => res(query))
    )})
}

const close = ()=>{
    connect().then(client=>client.close())
}

module.exports = {listadoPeliculas, listadoPeliculasProm, close, insertar, eliminar, editar, getPelicula}