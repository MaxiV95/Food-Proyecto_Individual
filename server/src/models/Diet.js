const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Diet",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        auto_increment: true,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false } 
  );
};
