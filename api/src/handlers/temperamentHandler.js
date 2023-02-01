const {Temperament} = require("../db");
const axios = require("axios")

const getTemperament = async (req,res)=>{
    
    let temperamentApi = await axios.get('https://api.thedogapi.com/v1/breeds')
    //API:"Stubborn, Curious, Playful, Adventurous, Active, Fun-loving"

    //mapeo toda la data de temperamentos y se convierte a string
    let tempMap = temperamentApi.data.map( e => e.temperament).toString(); 
    // MAPEO: ['Stubborn, Curious, Playful, Adventurous, Active, Fun-loving']
    // MAPEO/STRING 'Stubborn, Curious, Playful, Adventurous, Active, Fun-loving'

    // Se separan los strings por una coma para convertirse en array
    tempMap = await tempMap.split(','); 
    // SPLIT: ['Stubborn', ' Curious', ' Playful', ' Adventurous', ' Active', ' Fun-loving']
    
    //elimino los espacios en blanco
          const tempSpace = await tempMap.map(e => e.trim()); 
        // ['Stubborn', 'Curious', 'Playful', 'Adventurous', 'Active', 'Fun-loving']
        
    //con el constructor new Set creo un objeto donde se guardan los valores sin repetirse y  el (...)spread operator crea una copia 
          const tempNotRepeat = [...new Set(tempSpace)]; 
         

    tempNotRepeat.forEach( async (e) =>{ 
    //para cada temperamento entra al modelo temperament y hace un findorcreate
        if(e){
            await Temperament.findOrCreate({ 
    //es un metodo de Sequelize p/chequear si un elemento existe en la DB y sino lo crea
                where: { name: e },
            })
        }
    })
        
    const allTemps = await Temperament.findAll();
    res.status(200).send(allTemps)
 
};

module.exports = {
    getTemperament,
}