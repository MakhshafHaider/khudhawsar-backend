const { Op, Sequelize } = require('sequelize');
const user_matches = require('./user_matches');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('user_likes', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    liked_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    hooks: {
      afterBulkDestroy: (deleted_instance, options) => {
        const user_like = deleted_instance.where
        sequelize.models.user_matches.destroy({
          where: {
            [Op.and]: [
              { user_id: [user_like.user_id, user_like.liked_user_id] },
              { matched_user_id: [user_like.user_id, user_like.liked_user_id] }
            ]
          }
        })
      }
    },
    sequelize,
    tableName: 'user_likes',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_id" },
          { name: "liked_user_id" },
        ]
      },
      {
        name: "liked_user_id",
        using: "BTREE",
        fields: [
          { name: "liked_user_id" },
        ]
      },
    ]
  });
};
