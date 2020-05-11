const Validator = require("validator");
const validate = require('validate.js')
const validText = require("./valid-text");

module.exports = validateEventInput = (data) => {
  let errors = {};

  data.name = validText(data.name) ? data.name : "";
  data.date = validText(data.date) ? data.date : "";

  if (Validator.isEmpty(data.name)) {
    errors.name = "Event name field is required";
  }

  if (Validator.isEmpty(data.date)) {
    console.log(new Date())
    errors.date = "Event date field is required";
  }

  if (!validate.isDate(data.date)) {
    errors.date = "Event date must be a valid date";
  }

  // if (!Validator.isISO8601(data.date, {strict: true})) {
  //   errors.date = "Event date is not valid";
  // }
  // cannot get validation to work. isDate() is no longer a Validator method.

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};
