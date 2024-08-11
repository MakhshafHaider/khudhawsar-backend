module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'chats',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      chat_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      group_chat: {
        type: DataTypes.TINYINT(1),
        allowNull: true,
        defaultValue: false,
      },
      latest_message: {
        type: DataTypes.INTEGER || null,
        allowNull: false,
        // primaryKey: true,
        references: {
          model: 'messages',
          key: 'id',
        },
      },

      latest_message: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      user1Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // primaryKey: true,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      user2Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // primaryKey: true,
        references: {
          model: 'users',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      tableName: 'chats',
      timestamps: true,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'id' }],
        },
      ],
    }
  )
}
