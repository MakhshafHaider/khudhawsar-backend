const Sequelize = require('sequelize')
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'users',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      full_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(320),
        allowNull: false,
        unique: 'email',
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      gender: {
        type: DataTypes.ENUM('M', 'F'),
        allowNull: false,
      },
      DOB: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      income_amount: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      income_currency_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'currency',
          key: 'id',
        },
      },
      IDcard_image_url: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      interested_gender: {
        type: DataTypes.ENUM('M', 'F'),
        allowNull: true,
      },
      status_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'status',
          key: 'id',
        },
      },
      occupation_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'occupation',
          key: 'id',
        },
      },
      height: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      weight: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      last_loc_lat: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      last_loc_long: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      country_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'country',
          key: 'id',
        },
      },
      state_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'state',
          key: 'id',
        },
      },
      city_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'city',
          key: 'id',
        },
      },
      hair_color_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'color',
          key: 'id',
        },
      },
      eye_color_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'color',
          key: 'id',
        },
      },
      body_type_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'body_type',
          key: 'id',
        },
      },
      ethinicity_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'ethinicity',
          key: 'id',
        },
      },
      appearance_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'appearance',
          key: 'id',
        },
      },
      drinks_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'drink_smoke_options',
          key: 'id',
        },
      },
      smokes_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'drink_smoke_options',
          key: 'id',
        },
      },
      eating_habits_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'eating_habits',
          key: 'id',
        },
      },
      marital_status_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'marital_status',
          key: 'id',
        },
      },
      have_children_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'have_children_options',
          key: 'id',
        },
      },
      number_of_children: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      oldest_child: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      youngest_child: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      more_children_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'more_children',
          key: 'id',
        },
      },
      employment_status_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'employment_status',
          key: 'id',
        },
      },
      living_situation_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'living_situation',
          key: 'id',
        },
      },
      relocate_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'relocate_options',
          key: 'id',
        },
      },
      relationship_wanted_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'relationship',
          key: 'id',
        },
      },
      nationality_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'nationality',
          key: 'id',
        },
      },
      education_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'education',
          key: 'id',
        },
      },
      religion_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'religion',
          key: 'id',
        },
      },
      language_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'language',
          key: 'id',
        },
      },
      born_reverted_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'born_reverted_options',
          key: 'id',
        },
      },
      religious_values_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'religious_values',
          key: 'id',
        },
      },
      attend_religious_services_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'attend_religious_services',
          key: 'id',
        },
      },
      polygamy_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'polygamy',
          key: 'id',
        },
      },
      read_quran_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'read_quran',
          key: 'id',
        },
      },
      family_values_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'family_values',
          key: 'id',
        },
      },
      profile_creator_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'profile_creator',
          key: 'id',
        },
      },
      profile_heading: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      introduction: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      partner_intro: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      niqab_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'niqab_hijab_options',
          key: 'id',
        },
      },
      hijab_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'niqab_hijab_options',
          key: 'id',
        },
      },
      chat_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'chats',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      tableName: 'users',
      timestamps: false,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'id' }],
        },
        {
          name: 'email',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'email', length: 255 }],
        },
        {
          name: 'income_currency_id',
          using: 'BTREE',
          fields: [{ name: 'income_currency_id' }],
        },
        {
          name: 'status_id',
          using: 'BTREE',
          fields: [{ name: 'status_id' }],
        },
        {
          name: 'occupation_id',
          using: 'BTREE',
          fields: [{ name: 'occupation_id' }],
        },
        {
          name: 'country_id',
          using: 'BTREE',
          fields: [{ name: 'country_id' }],
        },
        {
          name: 'state_id',
          using: 'BTREE',
          fields: [{ name: 'state_id' }],
        },
        {
          name: 'city_id',
          using: 'BTREE',
          fields: [{ name: 'city_id' }],
        },
        {
          name: 'users_ibfk_8',
          using: 'BTREE',
          fields: [{ name: 'language_id' }],
        },
        {
          name: 'users_ibfk_9',
          using: 'BTREE',
          fields: [{ name: 'nationality_id' }],
        },
        {
          name: 'users_ibfk_10',
          using: 'BTREE',
          fields: [{ name: 'ethinicity_id' }],
        },
        {
          name: 'users_ibfk_11',
          using: 'BTREE',
          fields: [{ name: 'appearance_id' }],
        },
        {
          name: 'users_ibfk_12',
          using: 'BTREE',
          fields: [{ name: 'drinks_id' }],
        },
        {
          name: 'users_ibfk_13',
          using: 'BTREE',
          fields: [{ name: 'smokes_id' }],
        },
        {
          name: 'users_ibfk_14',
          using: 'BTREE',
          fields: [{ name: 'eating_habits_id' }],
        },
        {
          name: 'users_ibfk_15',
          using: 'BTREE',
          fields: [{ name: 'marital_status_id' }],
        },
        {
          name: 'users_ibfk_17',
          using: 'BTREE',
          fields: [{ name: 'more_children_id' }],
        },
        {
          name: 'users_ibfk_18',
          using: 'BTREE',
          fields: [{ name: 'employment_status_id' }],
        },
        {
          name: 'users_ibfk_19',
          using: 'BTREE',
          fields: [{ name: 'living_situation_id' }],
        },
        {
          name: 'users_ibfk_20',
          using: 'BTREE',
          fields: [{ name: 'relocate_id' }],
        },
        {
          name: 'users_ibfk_21',
          using: 'BTREE',
          fields: [{ name: 'relationship_wanted_id' }],
        },
        {
          name: 'users_ibfk_23',
          using: 'BTREE',
          fields: [{ name: 'education_id' }],
        },
        {
          name: 'users_ibfk_24',
          using: 'BTREE',
          fields: [{ name: 'religion_id' }],
        },
        {
          name: 'users_ibfk_25',
          using: 'BTREE',
          fields: [{ name: 'born_reverted_id' }],
        },
        {
          name: 'users_ibfk_26',
          using: 'BTREE',
          fields: [{ name: 'religious_values_id' }],
        },
        {
          name: 'users_ibfk_27',
          using: 'BTREE',
          fields: [{ name: 'attend_religious_services_id' }],
        },
        {
          name: 'users_ibfk_28',
          using: 'BTREE',
          fields: [{ name: 'polygamy_id' }],
        },
        {
          name: 'users_ibfk_29',
          using: 'BTREE',
          fields: [{ name: 'read_quran_id' }],
        },
        {
          name: 'users_ibfk_30',
          using: 'BTREE',
          fields: [{ name: 'family_values_id' }],
        },
        {
          name: 'users_ibfk_31',
          using: 'BTREE',
          fields: [{ name: 'profile_creator_id' }],
        },
        {
          name: 'users_ibfk_32',
          using: 'BTREE',
          fields: [{ name: 'niqab_id' }],
        },
        {
          name: 'users_ibfk_33',
          using: 'BTREE',
          fields: [{ name: 'hijab_id' }],
        },
        {
          name: 'users_ibfk_7',
          using: 'BTREE',
          fields: [{ name: 'hair_color_id' }],
        },
        {
          name: 'users_ibfk_8',
          using: 'BTREE',
          fields: [{ name: 'eye_color_id' }],
        },
        {
          name: 'users_ibfk_9',
          using: 'BTREE',
          fields: [{ name: 'body_type_id' }],
        },
        {
          name: 'users_ibfk_16',
          using: 'BTREE',
          fields: [{ name: 'have_children_id' }],
        },
      ],
    }
  )
}
