const jwt = require("jsonwebtoken");

module.exports = {
  authentic: function (req, res, next) {
    const bearearToken = req.header("auth-token");
    if (!bearearToken)
      res.status(404).send({
        success: false,
        message: "No token filled",
      });
    else {
      const token = bearearToken.split(" ")[1];
    //   console.log(token)
      jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
          if (!err) {
              if (decoded.roleId == 22|| decoded.id == req.params.id) next();
              else {
                  res.status(403).send({
                      success: false,
                      message: "Error Forbidden",
                    });
                }
            } else {
                // console.log(decoded)
                res.status(401).send({
                success: false,
            message: err,
          });
        }
      });
    }
  },
};
