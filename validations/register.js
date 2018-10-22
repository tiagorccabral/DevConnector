const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email: '';
    data.password = !isEmpty(data.password) ? data.password: '';
    data.password2 = !isEmpty(data.password2) ? data.password2: '';

    if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
        errors.name = 'Nome deve estar entre 2 e 30 caracteres'
    }

    if (Validator.isEmpty(data.name)) {
        errors.name = 'Nome é um campo obrigatório.';
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = 'E-mail é um campo obrigatório.';
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = 'E-mail inválido.';
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'Senha é um campo obrigatório.';
    }

    if (!Validator.isLength(data.password, {min: 6, max: 30})) {
        errors.password = 'Senha deve ter entre 6 e 30 caracteres.';
    }

    if (Validator.isEmpty(data.password2)) {
        errors.password2 = 'Confirmar a senha é um capo obrigatório.';
    }

    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = 'Senhas devem ser iguais.';
    }

    return {
        errors: errors,
        isValid: isEmpty(errors)
    }
};
