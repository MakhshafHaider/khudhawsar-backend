module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'message',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      chat_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'chats',
          key: 'id',
        },
      },
      sender: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      text: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      timestamp: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'messages',
      timestamps: false,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'chat_id' }, { name: 'user_id' }],
        },
        {
          name: 'chat_id',
          using: 'BTREE',
          fields: [{ name: 'chat_id' }],
        },
      ],
    }
  )
}
