const { DataTypes } = require("sequelize");
// Exportamos una función que define el modelo
// Luego le inyectamos la conexión a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Recipe",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      image: {
        type: DataTypes.STRING(500),
        allowNull: false,
        validate: {
          isUrl: {
            args: true,
            msg: "Image must be a valid URL",
          },
        },
      },
      vegetarian: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      }, 
      vegan: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      glutenFree: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      summary: {
        // Resumen del plato.
        type: DataTypes.TEXT,
        allowNull: false,
      },
      healthScore: {
        // Nivel de comida saludable
        type: DataTypes.FLOAT(1),
        allowNull: false,
        validate: {
          min: 0,
          max: 100,
        },
      },
      steps: {
        //Paso a paso
        type: DataTypes.ARRAY(DataTypes.TEXT),
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
