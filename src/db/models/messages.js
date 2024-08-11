module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'messages',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      sender: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      chat: {
        type: DataTypes.INTEGER || null,
        allowNull: false,
        references: {
          model: 'chats',
          key: 'id',
        },
      },
      // read_by: {
      //   type: DataTypes.INTEGER || null,
      //   allowNull: false,
      //   references: {
      //     model: 'users',
      //     key: 'id',
      //   },
      // },

      // sender_name: {
      //   type: DataTypes.STRING,
      //   allowNull: true,
      // },

      // reciever_name: {
      //   type: DataTypes.STRING,
      //   allowNull: true,
      // },

      // timestamp: {
      //   type: DataTypes.DATE,
      //   allowNull: true,
      // },
    },
    {
      sequelize,
      tableName: 'messages',
      timestamps: true,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'chat_id' }, { name: 'user_id' }],
        },
        // {
        //   name: 'chat_id',
        //   using: 'BTREE',
        //   fields: [{ name: 'chat_id' }],
        // },
      ],
    }
  )
}
