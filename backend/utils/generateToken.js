import jwt from "jsonwebtoken";

const generateToken = (userId, res) => {
  // Sign Token with JWT
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: 60 * 1000,
  });

  // Set Token in Cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 1000,
  });
};

export default generateToken;
