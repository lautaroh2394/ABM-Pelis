const MongoClient = require('mongodb').MongoClient;
const MONGO_PORT = 127017;
const url = `mongodb://localhost:${27017}`;
const DB = "PeliSys"
const COLLECTION = "peliculas"
let CLIENT = undefined;

const connect = () => {
    return new Promise(async (res)=>{
        if (!!CLIENT) res(CLIENT);
        CLIENT = await MongoClient.connect(url,{ useUnifiedTopology: true });
        res(CLIENT);
    })
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

const close = ()=>{
    connect().then(client=>client.close())
}

module.exports.mongoInterface = {listadoPeliculas, listadoPeliculasProm, close, insertar}