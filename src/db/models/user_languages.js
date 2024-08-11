const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_languages', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    language_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'languages',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'user_languages',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_id" },
          { name: "language_id" },
        ]
      },
      {
        name: "language_id",
        using: "BTREE",
        fields: [
          { name: "language_id" },
        ]
      },
    ]
  });
};
