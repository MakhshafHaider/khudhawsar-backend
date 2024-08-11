const _distance = async (sequelize) => {
  const [results, metadata] = await sequelize.query(
    `SHOW CREATE FUNCTION distance`
  )

  if (results.length <= 0) {
    return sequelize
      .query(
        `CREATE DEFINER=\`root\`@\`localhost\` FUNCTION \`distance\`(Lat1 FLOAT, Lon1 FLOAT, Lat2 FLOAT, Lon2 FLOAT) RETURNS double 
                DETERMINISTIC
                BEGIN
                SET @Radius = 6387.7;
                SET @DegToRad = 57.29577951;
                RETURN(coalesce(@Radius,0) * ACOS((sin(coalesce(Lat1,0) / @DegToRad) * SIN(coalesce(Lat2,0) / @DegToRad)) +
                        (COS(coalesce(Lat1,0) / @DegToRad) * COS(coalesce(Lat2,0) / @DegToRad) *
                        COS(coalesce(Lon2,0) / @DegToRad - coalesce(Lon1,0)/ @DegToRad))));
                END`
      )
      .then(() => {
        console.log("function 'distance' created successfully")
      })
      .catch((err) => {
        console.log("Error generating function 'distance' : ", err)
      })
  }
}

module.exports = _distance
