const { sql, connectToDatabase } = require("../../dbConfig");

const userDetailsController = async (req, res) => {
  const userid = req.userid;

  try {
    const pool = await connectToDatabase();
    const query = `
      SELECT firstName, secondName, birthday, email FROM USERS WHERE id = @userid
    `;

    const result = await pool
      .request()
      .input("userid", sql.NVarChar, userid)
      .query(query);

    return res.status(200).json({
      status: 200,
      message: "Successfull got user details",
      tasks: result.recordset,
    });
  } catch (error) {
    console.error("Error fetching user:", error.message);
    return res.status(500).json({
      status: 500,
      message: "Failed to fetch user",
      details: error.message,
    });
  }
};

module.exports = {
  userDetailsController,
};
