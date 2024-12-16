const { sql, connectToDatabase } = require("../../dbConfig");
const bcrypt = require("bcrypt");

const signupController = async (req, res) => {
  const { firstName, secondName, birthday, email, password, confirmPassword } =
    req.body;
  try {
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ status: 400, message: "Passwords do not match" });
    }

    const pool = await connectToDatabase();

    // Check if the email already exists
    const emailCheckQuery =
      "SELECT COUNT(*) AS count FROM USERS WHERE email = @Email";
    const emailCheckResult = await pool
      .request()
      .input("Email", sql.NVarChar, email)
      .query(emailCheckQuery);

    if (emailCheckResult.recordset[0].count > 0) {
      return res
        .status(400)
        .json({ status: 400, message: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Assume db connection is established
    const query = `
         INSERT INTO USERS (id, firstName, secondName, birthday, email, password)
      VALUES (NEWID(), @firstName, @secondName, @birthday, @email, @password);
        `;

    await pool
      .request()
      .input("firstName", sql.NVarChar, firstName)
      .input("secondName", sql.NVarChar, secondName)
      .input("birthday", sql.Date, birthday)
      .input("email", sql.NVarChar, email)
      .input("password", sql.NVarChar, hashedPassword) // Ensure this is hashed for security in real applications
      .query(query);

    return res.status(200).json({ status: 200, message: "Data inserted successfully" });
  } catch (error) {
    console.error("Error inserting data:", error.message);
    return res.status(500).json({
      status: 500,
      message: "Failed to insert data",
      details: error.message,
    });
  }
};

module.exports = { signupController };
