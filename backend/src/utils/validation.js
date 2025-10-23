// backend/src/utils/validation.js
const validateAdmin = (data) => {
  const { name, email, password } = data;
  if (!name || !email || !password) {
    return false;
  }
  return true;
};

module.exports = { validateAdmin };