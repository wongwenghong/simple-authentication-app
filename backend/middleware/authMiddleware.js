import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/UserModel.js";

export const protect = asyncHandler(async (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId).select("-password");
      req.user = user;
      next();
    } catch (err) {
      res.status(401);
      res.unauthorized = true;
      throw new Error("Unauthorized");
    }
  } else {
    res.status(401);
    res.unauthorized = true;
    throw new Error("Unauthorized");
  }
});
