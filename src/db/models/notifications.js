const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
 return sequelize.define('notifications', {
    notification_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    liked_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    notification_message: {
      type: DataTypes.STRING,
      allowNull: false
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false
    },
    profile_picture: {
      type: DataTypes.STRING, 
      allowNull: true 
    }
  }, {
    tableName: 'notifications',
    timestamps: false,
    // indexes: [
    //   {
    //     name: 'user_id',
    //     using: 'BTREE',
    //     fields: [{ name: 'user_id' }]
    //   },
    //   {
    //     name: 'liked_user_id',
    //     using: 'BTREE',
    //     fields: [{ name: 'liked_user_id' }]
    //   }
    // ]
  });
};
