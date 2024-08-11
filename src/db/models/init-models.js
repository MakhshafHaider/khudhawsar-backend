var DataTypes = require('sequelize').DataTypes
var _appearance = require('./appearance')
var _attend_religious_services = require('./attend_religious_services')
var _body_type = require('./body_type')
var _born_reverted_options = require('./born_reverted_options')
var _chats = require('./chats')
var _city = require('./city')
var _color = require('./color')
var _country = require('./country')
var _currency = require('./currency')
var _drink_smoke_options = require('./drink_smoke_options')
var _eating_habits = require('./eating_habits')
var _education = require('./education')
var _employment_status = require('./employment_status')
var _ethinicity = require('./ethinicity')
var _family_values = require('./family_values')
var _have_children_options = require('./have_children_options')
var _interests = require('./interests')
var _languages = require('./languages')
var _living_situation = require('./living_situation')
var _marital_status = require('./marital_status')
var _messages = require('./messages')
var _more_children = require('./more_children')
var _niqab_hijab_options = require('./niqab_hijab_options')
var _nationality = require('./nationality')
var _notifications = require('./notifications');
var _occupation = require('./occupation')
var _polygamy = require('./polygamy')
var _profile_creator = require('./profile_creator')
var _read_quran = require('./read_quran')
var _relationship = require('./relationship')
var _religion = require('./religion')
var _religious_values = require('./religious_values')
var _relocate_options = require('./relocate_options')
var _state = require('./state')
var _status = require('./status')
var _user_images = require('./user_images')
var _user_interests = require('./user_interests')
var _user_languages = require('./user_languages')
var _user_likes = require('./user_likes')
var _user_matches = require('./user_matches')
var _user_views = require('./user_views')
var _users = require('./users')
var _check_likes = require('../procedures/check_likes')
var _get_user = require('../procedures/get_user')
var _distance = require('../procedures/distance')
var _hair_color = require('./hair_color')

function initModels(sequelize) {
  var appearance = _appearance(sequelize, DataTypes)
  var attend_religious_services = _attend_religious_services(
    sequelize,
    DataTypes
  )
  var body_type = _body_type(sequelize, DataTypes)
  var born_reverted_options = _born_reverted_options(sequelize, DataTypes)
  var chats = _chats(sequelize, DataTypes)
  var city = _city(sequelize, DataTypes)
  var color = _color(sequelize, DataTypes)
  var country = _country(sequelize, DataTypes)
  var currency = _currency(sequelize, DataTypes)
  var drink_smoke_options = _drink_smoke_options(sequelize, DataTypes)
  var eating_habits = _eating_habits(sequelize, DataTypes)
  var education = _education(sequelize, DataTypes)
  var employment_status = _employment_status(sequelize, DataTypes)
  var ethinicity = _ethinicity(sequelize, DataTypes)
  var family_values = _family_values(sequelize, DataTypes)
  var have_children_options = _have_children_options(sequelize, DataTypes)
  var interests = _interests(sequelize, DataTypes)
  var languages = _languages(sequelize, DataTypes)
  var living_situation = _living_situation(sequelize, DataTypes)
  var marital_status = _marital_status(sequelize, DataTypes)
  var messages = _messages(sequelize, DataTypes)
  var more_children = _more_children(sequelize, DataTypes)
  var notifications = _notifications(sequelize, DataTypes)
  var niqab_hijab_options = _niqab_hijab_options(sequelize, DataTypes)
  var nationality = _nationality(sequelize, DataTypes)
  var occupation = _occupation(sequelize, DataTypes)
  var polygamy = _polygamy(sequelize, DataTypes)
  var profile_creator = _profile_creator(sequelize, DataTypes)
  var read_quran = _read_quran(sequelize, DataTypes)
  var relationship = _relationship(sequelize, DataTypes)
  var religion = _religion(sequelize, DataTypes)
  var religious_values = _religious_values(sequelize, DataTypes)
  var relocate_options = _relocate_options(sequelize, DataTypes)
  var state = _state(sequelize, DataTypes)
  var status = _status(sequelize, DataTypes)
  var user_images = _user_images(sequelize, DataTypes)
  var user_interests = _user_interests(sequelize, DataTypes)
  var user_languages = _user_languages(sequelize, DataTypes)
  var user_likes = _user_likes(sequelize, DataTypes)
  var user_matches = _user_matches(sequelize, DataTypes)
  var user_views = _user_views(sequelize, DataTypes)
  var users = _users(sequelize, DataTypes)
  var check_likes = _check_likes(sequelize)
  var get_user = _get_user(sequelize)
  var distance = _distance(sequelize)
  var hair_color = _hair_color(sequelize, DataTypes)
  // interests.belongsToMany(users, { as: 'user_id_users', through: user_interests, foreignKey: "interest_id", otherKey: "user_id" });
  // languages.belongsToMany(users, { as: 'user_id_users_user_languages', through: user_languages, foreignKey: "language_id", otherKey: "user_id" });
  // users.belongsToMany(interests, { as: 'interest_id_interests', through: user_interests, foreignKey: "user_id", otherKey: "interest_id" });
  // users.belongsToMany(languages, { as: 'language_id_languages', through: user_languages, foreignKey: "user_id", otherKey: "language_id" });
  // users.belongsToMany(users, { as: 'liked_user_id_users', through: user_likes, foreignKey: "user_id", otherKey: "liked_user_id" });
  // users.belongsToMany(users, { as: 'user_id_users_user_likes', through: user_likes, foreignKey: "liked_user_id", otherKey: "user_id" });
  // users.belongsToMany(users, { as: 'matched_user_id_users', through: user_matches, foreignKey: "user_id", otherKey: "matched_user_id" });
  // users.belongsToMany(users, { as: 'user_id_users_user_matches', through: user_matches, foreignKey: "matched_user_id", otherKey: "user_id" });
  // users.belongsToMany(users, { as: 'viewed_user_id_users', through: user_views, foreignKey: "user_id", otherKey: "viewed_user_id" });
  // users.belongsToMany(users, { as: 'user_id_users_user_views', through: user_views, foreignKey: "viewed_user_id", otherKey: "user_id" });
  // users.belongsTo(appearance, { as: "appearance", foreignKey: "appearance_id"});
  // appearance.hasMany(users, { as: "users", foreignKey: "appearance_id"});
  // users.belongsTo(attend_religious_services, { as: "attend_religious_service", foreignKey: "attend_religious_services_id"});
  // attend_religious_services.hasMany(users, { as: "users", foreignKey: "attend_religious_services_id"});
  // users.belongsTo(body_type, { as: "body_type", foreignKey: "body_type_id"});
  // body_type.hasMany(users, { as: "users", foreignKey: "body_type_id"});
  // users.belongsTo(born_reverted_options, { as: "born_reverted", foreignKey: "born_reverted_id"});
  // born_reverted_options.hasMany(users, { as: "users", foreignKey: "born_reverted_id"});
  // users.belongsTo(city, { as: "city", foreignKey: "city_id"});
  // city.hasMany(users, { as: "users", foreignKey: "city_id"});
  // users.belongsTo(color, { as: "hair_color", foreignKey: "hair_color_id"});
  // color.hasMany(users, { as: "users", foreignKey: "hair_color_id"});
  // users.belongsTo(color, { as: "eye_color", foreignKey: "eye_color_id"});
  // color.hasMany(users, { as: "eye_color_users", foreignKey: "eye_color_id"});
  // state.belongsTo(country, { as: "country", foreignKey: "country_id"});
  // country.hasMany(state, { as: "states", foreignKey: "country_id"});
  // users.belongsTo(country, { as: "nationality", foreignKey: "nationality_id"});
  // country.hasMany(users, { as: "users", foreignKey: "nationality_id"});
  // users.belongsTo(country, { as: "country", foreignKey: "country_id"});
  // country.hasMany(users, { as: "country_users", foreignKey: "country_id"});
  // users.belongsTo(currency, { as: "income_currency", foreignKey: "income_currency_id"});
  // currency.hasMany(users, { as: "users", foreignKey: "income_currency_id"});
  // users.belongsTo(drink_smoke_options, { as: "drink", foreignKey: "drinks_id"});
  // drink_smoke_options.hasMany(users, { as: "users", foreignKey: "drinks_id"});
  // users.belongsTo(drink_smoke_options, { as: "smoke", foreignKey: "smokes_id"});
  // drink_smoke_options.hasMany(users, { as: "smokes_users", foreignKey: "smokes_id"});
  // users.belongsTo(eating_habits, { as: "eating_habit", foreignKey: "eating_habits_id"});
  // eating_habits.hasMany(users, { as: "users", foreignKey: "eating_habits_id"});
  // users.belongsTo(education, { as: "education", foreignKey: "education_id"});
  // education.hasMany(users, { as: "users", foreignKey: "education_id"});
  // users.belongsTo(employment_status, { as: "employment_status", foreignKey: "employment_status_id"});
  // employment_status.hasMany(users, { as: "users", foreignKey: "employment_status_id"});
  // users.belongsTo(ethinicity, { as: "ethinicity", foreignKey: "ethinicity_id"});
  // ethinicity.hasMany(users, { as: "users", foreignKey: "ethinicity_id"});
  // users.belongsTo(family_values, { as: "family_value", foreignKey: "family_values_id"});
  // family_values.hasMany(users, { as: "users", foreignKey: "family_values_id"});
  // users.belongsTo(have_children_options, { as: "have_child", foreignKey: "have_children_id"});
  // have_children_options.hasMany(users, { as: "users", foreignKey: "have_children_id"});
  // user_interests.belongsTo(interests, { as: "interest", foreignKey: "interest_id"});
  // interests.hasMany(user_interests, { as: "user_interests", foreignKey: "interest_id"});
  // user_languages.belongsTo(languages, { as: "language", foreignKey: "language_id"});
  // languages.hasMany(user_languages, { as: "user_languages", foreignKey: "language_id"});
  // users.belongsTo(living_situation, { as: "living_situation", foreignKey: "living_situation_id"});
  // living_situation.hasMany(users, { as: "users", foreignKey: "living_situation_id"});
  // users.belongsTo(marital_status, { as: "marital_status", foreignKey: "marital_status_id"});
  // marital_status.hasMany(users, { as: "users", foreignKey: "marital_status_id"});
  // users.belongsTo(more_children, { as: "more_child", foreignKey: "more_children_id"});
  // more_children.hasMany(users, { as: "users", foreignKey: "more_children_id"});
  // users.belongsTo(niqab_hijab_options, { as: "niqab", foreignKey: "niqab_id"});
  // niqab_hijab_options.hasMany(users, { as: "users", foreignKey: "niqab_id"});
  // users.belongsTo(niqab_hijab_options, { as: "hijab", foreignKey: "hijab_id"});
  // niqab_hijab_options.hasMany(users, { as: "hijab_users", foreignKey: "hijab_id"});
  // users.belongsTo(occupation, { as: "occupation", foreignKey: "occupation_id"});
  // occupation.hasMany(users, { as: "users", foreignKey: "occupation_id"});
  // users.belongsTo(polygamy, { as: "polygamy", foreignKey: "polygamy_id"});
  // polygamy.hasMany(users, { as: "users", foreignKey: "polygamy_id"});
  // users.belongsTo(profile_creator, { as: "profile_creator", foreignKey: "profile_creator_id"});
  // profile_creator.hasMany(users, { as: "users", foreignKey: "profile_creator_id"});
  // users.belongsTo(read_quran, { as: "read_quran", foreignKey: "read_quran_id"});
  // read_quran.hasMany(users, { as: "users", foreignKey: "read_quran_id"});
  // users.belongsTo(relationship, { as: "relationship_wanted", foreignKey: "relationship_wanted_id"});
  // relationship.hasMany(users, { as: "users", foreignKey: "relationship_wanted_id"});
  // users.belongsTo(religion, { as: "religion", foreignKey: "religion_id"});
  // religion.hasMany(users, { as: "users", foreignKey: "religion_id"});
  // users.belongsTo(religious_values, { as: "religious_value", foreignKey: "religious_values_id"});
  // religious_values.hasMany(users, { as: "users", foreignKey: "religious_values_id"});
  // users.belongsTo(relocate_options, { as: "relocate", foreignKey: "relocate_id"});
  // relocate_options.hasMany(users, { as: "users", foreignKey: "relocate_id"});
  // city.belongsTo(state, { as: "state", foreignKey: "state_id"});
  // state.hasMany(city, { as: "cities", foreignKey: "state_id"});
  // users.belongsTo(state, { as: "state", foreignKey: "state_id"});
  // state.hasMany(users, { as: "users", foreignKey: "state_id"});
  // users.belongsTo(status, { as: "status", foreignKey: "status_id"});
  // status.hasMany(users, { as: "users", foreignKey: "status_id"});
  // user_images.belongsTo(users, { as: "user", foreignKey: "user_id"});
  // users.hasMany(user_images, { as: "user_images", foreignKey: "user_id"});
  // user_interests.belongsTo(users, { as: "user", foreignKey: "user_id"});
  // users.hasMany(user_interests, { as: "user_interests", foreignKey: "user_id"});
  // user_languages.belongsTo(users, { as: "user", foreignKey: "user_id"});
  // users.hasMany(user_languages, { as: "user_languages", foreignKey: "user_id"});
  // user_likes.belongsTo(users, { as: "user", foreignKey: "user_id"});
  // users.hasMany(user_likes, { as: "user_likes", foreignKey: "user_id"});
  // user_likes.belongsTo(users, { as: "liked_user", foreignKey: "liked_user_id"});
  // users.hasMany(user_likes, { as: "liked_user_user_likes", foreignKey: "liked_user_id"});
  // user_matches.belongsTo(users, { as: "user", foreignKey: "user_id"});
  // users.hasMany(user_matches, { as: "user_matches", foreignKey: "user_id"});
  // user_matches.belongsTo(users, { as: "matched_user", foreignKey: "matched_user_id"});
  // users.hasMany(user_matches, { as: "matched_user_user_matches", foreignKey: "matched_user_id"});
  // user_views.belongsTo(users, { as: "user", foreignKey: "user_id"});
  // users.hasMany(user_views, { as: "user_views", foreignKey: "user_id"});
  // user_views.belongsTo(users, { as: "viewed_user", foreignKey: "viewed_user_id"});
  // users.hasMany(user_views, { as: "viewed_user_user_views", foreignKey: "viewed_user_id"});

  return {
    appearance,
    attend_religious_services,
    body_type,
    born_reverted_options,
    chats,
    city,
    color,
    country,
    currency,
    drink_smoke_options,
    eating_habits,
    education,
    employment_status,
    ethinicity,
    family_values,
    have_children_options,
    interests,
    languages,
    living_situation,
    marital_status,
    messages,
    more_children,
    notifications,
    niqab_hijab_options,
    nationality,
    occupation,
    polygamy,
    profile_creator,
    read_quran,
    relationship,
    religion,
    religious_values,
    relocate_options,
    state,
    status,
    user_images,
    user_interests,
    user_languages,
    user_likes,
    user_matches,
    user_views,
    users,
    check_likes,
    get_user,
    distance,
    hair_color
  }
}
module.exports = initModels
module.exports.initModels = initModels
module.exports.default = initModels
