// here i made the function that check tokens of users for authorization
import jwt from "jsonwebtoken";

export function verifyToken(req, res, next) {
  // this condition ensure if the user have token or not
  if (!req.headers.authorization) {
    res.status(401);
    res.json("Access denied, invalid token");

    return;
  }

  try {
    // because 'Bearer' is seperated by ' '  beside token request.header.authorization
    const token = req.headers.authorization.split(" ")[1];

    // take token and my secret word in .env file
    jwt.verify(token, process.env.JWT_SECRET);

    // if verifying succeed, will pass to the next middleware
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
