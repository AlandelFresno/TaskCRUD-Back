const { default: jwtDecode } = require("jwt-decode");


const getUserByToken = async(token) => {
  const splitToken = token.split(' ')[1];
  return jwtDecode(splitToken);
};

module.exports = { getUserByToken };
