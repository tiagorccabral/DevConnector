const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePostInput(data) {
    let errors = {};

    data.text = !isEmpty(data.text) ? data.text: '';

    if (!Validator.isLength(data.text, {min: 5, max: 300})) {
        errors.text = 'Texto deve ter entre 5 e 300 caracteres';
    }

    if (Validator.isEmpty(data.text)) {
        errors.text = 'Texto é um campo obrigatório.';
    }

    return {
        errors: errors,
        isValid: isEmpty(errors)
    }
};
