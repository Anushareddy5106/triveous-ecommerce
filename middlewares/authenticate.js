import jwt from "jsonwebtoken";

export const authenticate = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).send({ message: "You are not logged in" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).send({ message: "You are not authenticated" });
    }
    req.body.userId = decoded.userId;
    req.body.role = decoded.role;
    req.body.name = decoded.name;
    next();
  } catch (error) {
    res
      .status(401)
      .send({ message: "Something went wrong please try again authenticate" });
  }
};
