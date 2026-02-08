import jwt from "jsonwebtoken";
import config from "../lib/config.js";

export const signToken = (payload) => {
  return jwt.sign(payload, config.JWT_SECRET, {
    expiresIn: "7d",
  });
};
