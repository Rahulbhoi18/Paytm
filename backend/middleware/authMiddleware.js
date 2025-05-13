import jwt from "jsonwebtoken"

export const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res.status(403).json({ error: "Token expired or missing" });
    }
    const token = authHeader.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken.userId) {
      return res.status(403).json({ error: "Token expired or unauthenticated" });
    }
    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    console.log(error, "middleware");
    return res.status(403).json({ error: "Invalid or expired token" });
  }
};
