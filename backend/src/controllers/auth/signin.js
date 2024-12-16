const bcrypt = require("bcrypt");
const { sql, connectToDatabase } = require("../../dbConfig");
const jwt = require("jsonwebtoken");

const signinController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const pool = await connectToDatabase();

    // Check if the user exists by email
    const userQuery = "SELECT * FROM USERS WHERE email = @Email";
    const result = await pool
      .request()
      .input("Email", sql.NVarChar, email)
      .query(userQuery);

    if (result.recordset.length === 0) {
      return res.status(404).json({ status: 404, message: "User not found" });
    }

    const user = result.recordset[0];

    // Compare the provided password with the stored hashed password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ status: 401, message: "Invalid Password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        secondName: user.secondName,
      },
      process.env.JWT_SECRET, // Secret key
      { expiresIn: "1h" } // Token expiry (1 hour)
    );

    // Successful signin
    return res.status(200).json({
      status: 200,
      message: "Signin successful",
      token,
      user: {
        firstName: user.firstName,
        secondName: user.secondName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error during signin:", error.message);
    return res
      .status(500)
      .json({ status: 500, message: "Signin failed", details: error.message });
  }
};

module.exports = { signinController };
