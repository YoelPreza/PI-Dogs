
const { Dog, Temperament } = require("../db");
const axios = require("axios")
// const {API_KEY} = process.env

const dogsApiDb = async()=>{
try {
        
    // nos taraemos la info de la api con axios para no hacer el json  con el fetch
    const apiDogs = await axios.get("https://api.thedogapi.com/v1/breeds")
    // hacemos un map para sacar solo la info que me piden en la ruta principal del readme
    const apiInfo = apiDogs.data.map((d) => {
        return {
            // con .splist(" - ") separamos en un array los numeros y seleccionamos la posicion [1]
            //
            id: d.id,
            name: d.name,
            image: d.image.url,
            heightMax: d.height.metric.split(" - ")[1] ? d.height.metric.split(" - ")[1]
                : d.height.metric.split(" - ")[0],    
            heightMin: d.height.metric.split(" - ")[0],

            weightMax: d.weight.metric.split(" - ")[1] ? d.weight.metric.split(" - ")[1]
                : 0.0,

            weightMin: d.weight.metric.split(" - ")[0] !== "NaN" ? d.weight.metric.split(" - ")[0] 
            : d.weight.metric.split(" - ")[1] ? Math.round( d.weight.metric.split(" - ")[1] * 0.6) : 0.0 ,

            life_span_min: d.life_span.split(" ")[0],
            life_span_max: d.life_span.split(" ")[2]?d.life_span.split(" ")[2]:d.life_span.split(" ")[0],
            temperament: d.temperament ? d.temperament.split(",").map((t) => { return t.trim() }) : ['temperamento Desconocido'],
        }
    })
    
// se van a trater los perros de la DB 
const dbInfo = await Dog.findAll({
    include: { //se utiliza para incluir datos relacionales en los resultados
        model: Temperament, //  también se está incluyendo información de otra tabla relacionada llamada Temperament.
        attributes: ['name'], // es un arreglo con los nombres de las columnas que deseas seleccionar
        through: {
            attributes: [],// no se están seleccionando ningún campo de la tabla intermedia, solo los campos de la tabla Temperament.
        }
    }

})
// console.log(dbInfo)
const dValueDogs = dbInfo.map(el => { return el.dataValues }); // contiene solo los valores de los perros y no incluye la información adicional incluida en el objeto de Sequelize.
// console.log(dValueDogs)
const dbInfoMap = await dValueDogs.map((el) => {
    return {
        id: el.id,
        name: el.name,
        image: el.image,
        heightMax: el.heightMax,
        heightMin: el.heightMin,
        weightMax: el.weightMax,
        weightMin: el.weightMin,
        life_span_min: el.life_span_min,
        life_span_max: el.life_span_max,
        createdInDb: el.createdInDb,
        temperament: el.temperaments.map(n => n.name),
    }
})
// console.log(dbInfoMap)
// ahora tengo que concatenar toda la info , la de la db y la de la api , y retornarla
let allDogsApiDb = [...dbInfoMap, ...apiInfo ]
return allDogsApiDb;

} catch (error) {
console.log(error)
}
}

const getApiDogs = async (req, res) => {
    const { name } = req.query;
    let allData = await dogsApiDb();
     try {
        if (name !== undefined) {  // si el name no esta vacio se hace la busqueda
            // filter: crea un nuevo array con todos los elementos que cumplan la condición implementada por la función dada.
            let searchName = allData.filter((dog) => dog.name.toLowerCase().includes(name.toLowerCase())) 
            // se pasa a nimusculas por si el cliente ingresa alguna mayus
            // se utiliza el metodo includes para hacer la busqueda
            
            searchName.length > 0 ? res.status(200).json(searchName) : res.status(404).send({'msg': 'Breed not found'})
        } else {
            
            res.status(200).send(allData)
        }
} catch (error) {
    console.log(error)
}

};

const getDogsid = async(req, res) => {
    const { id } = req.params;
    let allId = await dogsApiDb();
try {
    if (id) {  // si hay un id se hace la busqueda
        // filter: crea un nuevo array con todos los elementos que cumplan la condición implementada por la función dada.
        let searchId = allId.filter(el => (el.id === Number(id) || el.id === String(id))) 
        // El id ingresado por el cliente se convierte en numero o en string para que coincida con los datos de la api y del DB
        searchId.length > 0 ? res.status(200).json(searchId) : res.status(404).send({'msg': 'Breed not found'})
    } 
    
} catch (error) {
    console.log(error)
}

};



const postDog = async (req, res) => {
    const { name, heightMin, heightMax, weightMin, weightMax, 
        life_span_min, life_span_max, createdInDb, temperament, image } = req.body;

    try {
        const newDog =
            await Dog.create({
                name,
                heightMin,
                heightMax,
                weightMin,
                weightMax,
                life_span_min,
                life_span_max, 
                image,
                createdInDb
            });

            let temperamentDb = await Temperament.findAll({
                where : {name : temperament} 
            })

       newDog.addTemperaments(temperamentDb)
        res.status(201).json("New dog created");
        
console.log(newDog)
    } catch (error) {
        res.status(404).send({ "msg": "Incorrect Data" })
        console.log(error)
    }
   







    // if(!name || !heightMin || !heightMax || !weightMin || !weightMax){

    //     return res.status(404).send('Falta enviar datos obligatorios')
    // }

    // try {
    //     const newDog = await Dog.create({
    //         name,
    //         heightMin,
    //         heightMax,
    //         weightMin, 
    //         weightMax, 
    //         life_span_min, 
    //         life_span_max, 
    //         image
    //     });
    //     // console.log(newDog)
    //     //await newDog.addTemperaments(temperament)
    //     res.status(201).send({ "msg": "Breed Created" })

    // } catch (error) {
    //     console.log("Entro al Catch")
    //     res.status(404).send({ "msg": "hey! your data is not correct" })

    //     // console.log(error)

    // }
};



module.exports = {
    getApiDogs,
    getDogsid,
    postDog,

}
