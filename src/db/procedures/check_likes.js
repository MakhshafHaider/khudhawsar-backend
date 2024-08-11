const _check_likes = async (sequelize) => {
  const [results, metadata] = await sequelize.query(
    `SHOW CREATE PROCEDURE check_likes`
  )

  if (results.length <= 0) {
    var query = `CREATE DEFINER=\`root\`@\`localhost\` PROCEDURE \`check_likes\`(IN userid int, IN liked_id int )
            BEGIN
            SET @exist = (select count(*) from user_likes where user_id IN (userid, liked_id) and liked_user_id in (userid, liked_id) ) ;
            IF @exist = 2
            THEN 
            SELECT id, occupation_id, country_id, state_id, city_id, hair_color_id, eye_color_id, body_type_id, ethinicity_id, appearance_id, drinks_id, smokes_id, eating_habits_id, marital_status_id, have_children_id, number_of_children, oldest_child, youngest_child, more_children_id, employment_status_id, living_situation_id, relocate_id,language_id, relationship_wanted_id, nationality_id, education_id, religion_id, born_reverted_id, religious_values_id, attend_religious_services_id, polygamy_id, read_quran_id, family_values_id, niqab_id, hijab_id from users as u where u.id in (userid, liked_id);
            SELECT * from user_interests as ui WHERE ui.user_id IN (userid, liked_id);
            SELECT * from user_languages as ul WHERE ul.user_id IN (userid, liked_id);
            END IF;
            END`
    return sequelize
      .query(query)
      .then(() => {
        console.log("stored procedure 'check_likes' created successfully")
      })
      .catch((err) => {
        console.log("Error generating stored procedure 'check_likes' : ", err)
      })
  }
}

module.exports = _check_likes
