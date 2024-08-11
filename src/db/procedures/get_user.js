const _get_user = async (sequelize) => {
  const [results, metadata] = await sequelize.query(
    `SHOW CREATE PROCEDURE get_user`
  )

  if (results.length <= 0) {
    return sequelize
      .query(
        `CREATE DEFINER=\`dbmasteruser\`@\`%\` PROCEDURE \`get_user\`(IN user_id INT)
            BEGIN
            SELECT u.*, status.value as 'status', c.value as 'income_currency', cn.value as 'country', s.value as 'state', ci.value as 'city',
            hc.value as 'hair_color', ec.value as 'eye_color', body_type.value as 'body_type', app.value as 'appearance', e.value as 'ethinicity',
            dop.value as 'drinks', sop.value as 'smokes', eh.value as 'eating_habits', ms.value as 'marital_status',
            hcopt.value as 'have_children', mc.value as 'more_children', es.value as 'employment_status', ls.value as 'living_situation', 
            r.value as 'relocate',l.value as 'language', rel.value as 'relationship_wanted', n.nationality as 'nationality', edu.value as 'education', re.value as 'religion',
            bro.value as 'born_reverted', rv.value as 'religious_values', ars.value as 'attend_religious_services', p.value as 'polygamy', 
            rq.value as 'read_quran', fv.value as 'family_values', pc.value as 'profile_creator', hop.value as 'hijab', nop.value as 'niqab'
                FROM users as u
            LEFT JOIN currency as c 
            ON u.income_currency_id = c.id
            LEFT JOIN Occupation as o 
            ON u.occupation_id = o.id
            LEFT JOIN country as cn
            ON u.country_id = cn.id
            LEFT JOIN state as s
            ON u.state_id = s.id
            LEFT JOIN city as ci
            ON ci.id = u.city_id
            LEFT JOIN color as hc
            ON hc.id = u.hair_color_id 
            LEFT JOIN color as ec
            ON ec.id = u.eye_color_id
            LEFT JOIN body_type
            ON body_type.id = u.body_type_id
            LEFT JOIN ethinicity as e
            ON e.id = u.ethinicity_id
            LEFT JOIN appearance as app
            ON u.appearance_id = app.id
            LEFT JOIN status 
            ON u.status_id = status.id
            LEFT JOIN drink_smoke_options as dop 
            ON dop.id = u.drinks_id
            LEFT JOIN drink_smoke_options as sop
            ON sop.id = u.smokes_id
            
            LEFT JOIN eating_habits as eh
            ON eh.id = u.eating_habits_id
            LEFT JOIN marital_status as ms
            ON ms.id = u.marital_status_id
            
            LEFT JOIN have_children_options as hcopt
            ON hcopt.id = u.have_children_id
            LEFT JOIN more_children as mc
            ON mc.id = u.more_children_id
            
            LEFT JOIN employment_status as es
            ON es.id = u.employment_status_id
            LEFT JOIN living_situation as ls
            ON ls.id = u.living_situation_id
            
            LEFT JOIN relocate_options as r
            ON r.id = u.relocate_id
            LEFT JOIN relationship as rel
            ON rel.id = u.relationship_wanted_id
            
            LEFT JOIN nationality as n
            ON n.id = u.nationality_id
            LEFT JOIN language as l
            ON l.id = u.language_id
            LEFT JOIN education as edu
            ON edu.id = u.education_id
            
            LEFT JOIN religion as re
            ON re.id = u.religion_id
            LEFT JOIN born_reverted_options as bro
            ON bro.id = u.born_reverted_id
            
            LEFT JOIN religious_values as rv
            ON rv.id = u.religious_values_id
            LEFT JOIN attend_religious_services as ars
            ON ars.id = u.attend_religious_services_id
            
            LEFT JOIN polygamy as p
            ON p.id = u.polygamy_id
            LEFT JOIN read_quran as rq
            ON rq.id = u.read_quran_id
            
            LEFT JOIN family_values as fv
            ON fv.id = u.family_values_id
            LEFT JOIN profile_creator as pc
            ON pc.id = u.profile_creator_id
            
            LEFT JOIN niqab_hijab_options as nop
            ON nop.id = u.niqab_id
            LEFT JOIN niqab_hijab_options as hop
            ON hop.id = u.hijab_id
            WHERE u.id = user_id;
            END`
      )
      .then(() => {
        console.log("stored procedure 'get_user' created successfully")
      })
      .catch((err) => {
        console.log("Error generating stored procedure 'get_user' : ", err)
      })
  }
}

module.exports = _get_user
