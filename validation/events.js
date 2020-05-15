const Validator = require("validator");
const validText = require("./valid-text");

module.exports = validateEventInput = (data) => {
  let errors = {};

  data.name = validText(data.name) ? data.name : "";

  data.date = validText(data.name) ? data.name : "";

  if (Validator.isEmpty(data.name)) {
    errors.name = "Event name field is required";
  }

  if (Validator.isEmpty(data.date)) {
    errors.date = "You must enter a date";
  }

  // Validator.validDate = str => {
  //   let date = Date.parse(str);
  //   let today = new Date()
  //   if (isNaN(date) || date.getTime() < today.getTime() || str.split('T')[0].split(' ').length < 3) {
  //     return false;
  //   }
  //   return true;
  // }

  // if (Validator.validDate(data.date)) {
  //   errors.date = "You must enter a valid date"
  // }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};