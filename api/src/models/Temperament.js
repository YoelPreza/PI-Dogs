const { DataTypes} = require ("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) =>{
     // sequelize instancia de la onexion es quien defino el modelo
    sequelize.define("temperament", {
    id:{
        type:DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    name:{
        type: DataTypes.STRING,
      allowNull: false,
    }


    }, { timestamps: false } ) 
}