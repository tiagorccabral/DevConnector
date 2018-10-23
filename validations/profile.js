const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
    let errors = {};

    data.handle = !isEmpty(data.handle) ? data.handle: '';
    data.status = !isEmpty(data.status) ? data.status: '';
    data.skills = !isEmpty(data.skills) ? data.skills: '';

    if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
        errors.handle = 'Handle precisa estar entre 2 e 40 caracteres.';
    }

    if (Validator.isEmpty(data.handle)) {
        errors.handle = 'Handle é um campo obrigatório.';
    }

    if (Validator.isEmpty(data.status)) {
        errors.status = 'Status é um campo obrigatório.';
    }

    if (Validator.isEmpty(data.skills)) {
        errors.skills = 'Habilidades é um campo obrigatório.';
    }

    if (!isEmpty(data.website)) {
        if(!Validator.isURL(data.website)) {
            errors.website = 'Não é uma URL válida.'
        }
    }

    if (!isEmpty(data.twitter)) {
        if(!Validator.isURL(data.twitter)) {
            errors.twitter = 'Não é uma URL válida.'
        }
    }

    if (!isEmpty(data.youtube)) {
        if(!Validator.isURL(data.youtube)) {
            errors.youtube = 'Não é uma URL válida.'
        }
    }

    if (!isEmpty(data.instagram)) {
        if(!Validator.isURL(data.instagram)) {
            errors.instagram = 'Não é uma URL válida.'
        }
    }

    if (!isEmpty(data.linkedin)) {
        if(!Validator.isURL(data.linkedin)) {
            errors.linkedin = 'Não é uma URL válida.'
        }
    }

    if (!isEmpty(data.facebook)) {
        if(!Validator.isURL(data.facebook)) {
            errors.facebook = 'Não é uma URL válida.'
        }
    }


    return {
        errors: errors,
        isValid: isEmpty(errors)
    }
};
