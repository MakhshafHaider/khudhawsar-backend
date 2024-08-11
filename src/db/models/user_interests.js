const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_interests', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    interest_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'interests',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'user_interests',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_id" },
          { name: "interest_id" },
        ]
      },
      {
        name: "interest_id",
        using: "BTREE",
        fields: [
          { name: "interest_id" },
        ]
      },
    ]
  });
};
