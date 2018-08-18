const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateThread(data) {
  const errors = {};

  data.name = isEmpty(data.name) ? "" : data.name;
  data.desc = isEmpty(data.desc) ? "" : data.desc;
  if (Validator.isEmpty(data.name)) {
    errors.threads = "Name is required";
  }
  if (!Validator.isLength(data.desc, { min: 0, max: 250 })) {
    errors.description = "Description cannot be longer than 100 characters";
  }
  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
