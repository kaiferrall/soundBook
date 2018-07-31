const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegister(data) {
  const errors = {};

  data.text = isEmpty(data.text) ? "" : data.text;
  data.title = isEmpty(data.title) ? "" : data.title;
  //data.tags = isEmpty(data.tags) ? "" : data.tags;

  if (isEmpty(data.text)) {
    errors.text = "Text is required";
  }
  if (!isEmpty(data.text)) {
    if (!Validator.isLength(data.text, { min: 1, max: 250 })) {
      errors.text = "Posts can only be between 1 and 250 characters";
    }
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
