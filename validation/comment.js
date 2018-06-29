const Validator = require("validator");
const isEmpty = require("./is_empty");

module.exports = validateCommentInput = (data) => {
    let errors = {};

    data.text = !isEmpty(data.text) ? data.text : "";

    if (Validator.isEmpty(data.text)) {
        errors.text = "Comment field is required";
    }

    if (!Validator.isLength(data.text, { min: 1, max: 150 })) {
        errors.text = "Comment must be between 1 and 150 characters";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }

}