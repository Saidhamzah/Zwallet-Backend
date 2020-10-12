const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  response: function (response, status, data) {
    const result = {};
    result.status = status || 200;
    result.data = data;
    return response.status(result.status).json(result);
  },
};
