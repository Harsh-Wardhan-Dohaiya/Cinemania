const jwt = require("jsonwebtoken");

const getSuccess = (req, res) => {
  const user = req.user;
  const token = jwt.sign(
    {
      userId: user._id,
      email: user.email,
      username: user.username,
    },
    process.env.AUTH_TOKEN,
    {
      expiresIn: "72h",
    }
  );

  const userDetails = {
    username: user.username,
    email: user.email,
    token: token,
    userId: user._id,
    age: user.age,
  };
  const userDetailedEncrypted = jwt.sign(
    { userDetails },
    process.env.AUTH_TOKEN,
    {
      expiresIn: "72h",
    }
  );
  return res.redirect("http://localhost:3000/?user=" + userDetailedEncrypted);
};

module.exports = getSuccess;
