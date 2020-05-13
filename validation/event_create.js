const Validator = require("validator");
const validate = require("validate");
const validText = require("./valid-text");

module.exports = validateEventInput = (data) => {
  let errors = {};

  data.name = validText(data.name) ? data.name : "";

  if (Validator.isEmpty(data.name)) {
    errors.name = "Event name field is required";
  }

  if (Validator.isEmpty(data.date)) {
    errors.date = "Event date field is required";
  }

  // if (!validate.isDate(Date.parse(data.date))) {
  //   errors.date = "Event date must be a valid date";
  // }

  if (!Validator.isFloat(data.price), {gt: 0.00}) {
    errors.price = "Price set must be greater than 0"
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};