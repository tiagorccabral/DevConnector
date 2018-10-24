const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateEducationInput(data) {
    let errors = {};

    data.school = !isEmpty(data.school) ? data.school: '';
    data.degree = !isEmpty(data.degree) ? data.degree: '';
    data.fieldOfStudy = !isEmpty(data.fieldOfStudy) ? data.fieldOfStudy: '';

    if (Validator.isEmpty(data.school)) {
        errors.school = 'Escola é um campo obrigatório.';
    }

    if (Validator.isEmpty(data.degree)) {
        errors.degree = 'Graduação é um campo obrigatório.';
    }

    if (Validator.isEmpty(data.fieldOfStudy)) {
        errors.fieldOfStudy = 'Campo de estudo é um campo obrigatório.';
    }

    return {
        errors: errors,
        isValid: isEmpty(errors)
    }
};
