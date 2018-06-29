const Validator = require("validator");
const isEmpty = require("./is_empty");

module.exports = validateLoginInput = (data) => {
    let errors = {};

    data.text = !isEmpty(data.text) ? data.text : "";

    if (!Validator.isLength(data.text, { min: 1, max: 150 })) {
        errors.text = "Post must be between 1 and 150 characters";
    }

    if (Validator.isEmpty(data.text)) {
        errors.mail = "Post field is required"
    }

    return { errors, isValid: isEmpty(errors) }

}