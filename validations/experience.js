const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateExperienceInput(data) {
    let errors = {};

    data.title = !isEmpty(data.title) ? data.title: '';
    data.company = !isEmpty(data.company) ? data.company: '';
    data.from = !isEmpty(data.from) ? data.from: '';

    if (Validator.isEmpty(data.title)) {
        errors.title = 'Título é um campo obrigatório.';
    }

    if (Validator.isEmpty(data.company)) {
        errors.company = 'Empresa é um campo obrigatório.';
    }

    if (Validator.isEmpty(data.from)) {
        errors.from = 'Data de início é um campo obrigatório.';
    }

    return {
        errors: errors,
        isValid: isEmpty(errors)
    }
};
