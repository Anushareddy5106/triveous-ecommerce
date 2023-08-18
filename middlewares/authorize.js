export const authorize = (requiredRoles) => {
  return async (req, res, next) => {
    try {
      const role = req.body.role;

      if (requiredRoles.includes(role)) {
        next();
      } else {
        res.status(200).send({ message: "You are not authorized" });
      }
    } catch (err) {
      res
        .status(401)
        .send({ message: "Something went wrong please try again" });
    }
  };
};
