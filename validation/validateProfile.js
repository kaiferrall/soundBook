const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegister(data) {
  const errors = {};

  data.name = isEmpty(data.name) ? "" : data.name;
  data.bio = isEmpty(data.bio) ? "" : data.bio;
  data.tags = isEmpty(data.tags) ? "" : data.tags;
  let bioLength;
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name is required";
  }
  if (Validator.isEmpty(data.bio)) {
    errors.bio = "Bio is required";
  } else {
    if (!Validator.isLength(data.bio, { min: 10, max: 250 })) {
      bioLength = data.bio.length;
      errors.bio =
        "Bio must be between 10 and 250 characters, you're at " +
        `${bioLength}`;
    }
  }

  if (!isEmpty(data.twitter)) {
    if (!Validator.isURL(data.twitter)) {
      errors.twitter = "Not a valid URL";
    }
  }

  if (!isEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook)) {
      errors.facebook = "Not a valid URL";
    }
  }
  if (!isEmpty(data.instagram)) {
    if (!Validator.isURL(data.instagram)) {
      errors.instagram = "Not a valid URL";
    }
  }
  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
