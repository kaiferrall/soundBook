const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegister(data) {
  const errors = {};

  data.username = isEmpty(data.username) ? "" : data.username;
  data.email = isEmpty(data.email) ? "" : data.email;
  data.password = isEmpty(data.password) ? "" : data.password;
  data.password2 = isEmpty(data.password2) ? "" : data.password2;
  //Username
  if (Validator.isEmpty(data.username)) {
    errors.username = "Username is required";
  } else if (!Validator.isLength(data.username, { min: 3, max: 20 })) {
    errors.username = "Username must be between 3 and 20 characters";
  }
  //Email
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Invalid email address";
  }
  //Passwords
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  } else {
    if (!Validator.isLength(data.password, { min: 8, max: 40 })) {
      errors.password = "Password must be between 8 and 40 characters";
    }
    if (Validator.isEmpty(data.password2)) {
      errors.password2 = "Please confirm password";
    } else {
      if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = "Passwords must match";
      }
    }
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
