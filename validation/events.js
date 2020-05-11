const Validator = require("validator");
const validText = require("./valid-text");

module.exports = validateEventInput = (data) => {
  let errors = {};

  data.name = validText(data.name) ? data.name : "";
  data.date = validText(data.date) ? data.date : "";

  if (Validator.isEmpty(data.name)) {
    errors.name = "Event name field is required";
  }

  if (Validator.isEmpty(data.date)) {
    errors.date = "Event date field is required";
  }

  if (!Validator.isData(data.date)) {
    errors.date = "Event date is not valid";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};
