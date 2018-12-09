import React, {Component} from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGrop';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import InputGroup from '../common/InputGroup';
import {createProfile} from '../../actions/profileActions';


class CreateProfile extends Component {
    constructor(props) {
        super (props);
        this.state = {
            displaySocialInputs: false,
            handle: '',
            company: '',
            website: '',
            location: '',
            status: '',
            skills: '',
            githubusername: '',
            bio: '',
            twitter: '',
            facebook: '',
            linkedin: '',
            youtube: '',
            instagram: '',
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }
    }

    onSubmit(e) {
        e.preventDefault();

        const profileData = {
            handle: this.state.handle,
            company: this.state.company,
            website: this.state.website,
            location: this.state.location,
            status: this.state.status,
            skills: this.state.skills,
            githubusername: this.state.githubusername,
            bio: this.state.bio,
            twitter: this.state.twitter,
            facebook: this.state.facebook,
            linkedin: this.state.linkedin,
            youtube: this.state.youtube,
            instagram: this.state.instagram,
        };

        this.props.createProfile(profileData, this.props.history);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    render () {
        const {errors, displaySocialInputs} = this.state;

        let socialInputs;

        if (displaySocialInputs) {
            socialInputs = (
                <div>
                    <InputGroup
                        placeholder="Twitter, URL de perfil"
                        name="twitter"
                        icon="fab fa-twitter"
                        value={this.state.twitter}
                        onChange={this.onChange}
                        error={errors.twitter}
                    />
                    <InputGroup
                        placeholder="Facebook, URL de perfil"
                        name="facebook"
                        icon="fab fa-facebook"
                        value={this.state.facebook}
                        onChange={this.onChange}
                        error={errors.facebook}
                    />
                    <InputGroup
                        placeholder="Linkedin, URL de perfil"
                        name="linkedin"
                        icon="fab fa-linkedin"
                        value={this.state.linkedin}
                        onChange={this.onChange}
                        error={errors.linkedin}
                    />
                    <InputGroup
                        placeholder="Youtube, URL de perfil"
                        name="youtube"
                        icon="fab fa-youtube"
                        value={this.state.youtube}
                        onChange={this.onChange}
                        error={errors.youtube}
                    />
                    <InputGroup
                        placeholder="Instagram, URL de perfil"
                        name="instagram"
                        icon="fab fa-instagram"
                        value={this.state.instagram}
                        onChange={this.onChange}
                        error={errors.instagram}
                    />
                </div>
            );
        }

        // Select options for status
        const options = [
            {label: '* Selecione seus status profissional', value: 0},
            {label: 'Desenvolvedor', value: 'Desenvolvedor'},
            {label: 'Desenvolvedor Júnior', value: 'Desenvolvedor Júnior'},
            {label: 'Desenvolvedor Sênior', value: 'Desenvolvedor Sênior'},
            {label: 'Gerente', value: 'Gerente'},
            {label: 'Estudante ou aprendiz', value: 'Estudante ou aprendiz'},
            {label: 'Instrutor ou professor', value: 'Instrutor ou professor'},
            {label: 'Interno', value: 'Interno'},
            {label: 'Outro', value: 'Outro'},

        ];

        return (
            <div className="create-profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">
                                Crie seu perfil
                            </h1>
                            <p className="lead text-center">
                                Coloque algumas informações para tornar o seu perfil muito melhor!
                            </p>
                            <small className="d-block pb-3">
                                * = required fields
                            </small>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                    placeholder="* Nome de perfil"
                                    name="handle"
                                    value={this.state.handle}
                                    onChange={this.onChange}
                                    error={errors.handle}
                                    info="Um nome único para a URL do seu perfil. Pode ser seu nome, apelido, etc."
                                />
                                <SelectListGroup
                                    placeholder="* Status"
                                    name="status"
                                    value={this.state.status}
                                    onChange={this.onChange}
                                    error={errors.status}
                                    options={options}
                                    info="Nos dê uma ideia sobre aonde você está na sua carreira."
                                />
                                <TextFieldGroup
                                    placeholder="Empresa"
                                    name="company"
                                    value={this.state.company}
                                    onChange={this.onChange}
                                    error={errors.company}
                                    info="Pode ser sua própria empresa, ou seu local de trabalho."
                                />
                                <TextFieldGroup
                                    placeholder="Website"
                                    name="website"
                                    value={this.state.website}
                                    onChange={this.onChange}
                                    error={errors.website}
                                    info="Seu site profissional, portfólio, etc."
                                />
                                <TextFieldGroup
                                    placeholder="Localização"
                                    name="location"
                                    value={this.state.location}
                                    onChange={this.onChange}
                                    error={errors.location}
                                    info="Cidade ou cidade e estado (Ex: Brasília DF)."
                                />
                                <TextFieldGroup
                                    placeholder="* Habilidades"
                                    name="skills"
                                    value={this.state.skills}
                                    onChange={this.onChange}
                                    error={errors.skills}
                                    info="Nos conte um pouco sobre seus conhecimentos."
                                />
                                <TextFieldGroup
                                    placeholder="Usuário do Github"
                                    name="githubusername"
                                    value={this.state.githubusername}
                                    onChange={this.onChange}
                                    error={errors.githubusername}
                                    info="Se você deseja ter seus últimos repositórios e um link para seu github, informe sua conta."
                                />
                                <TextAreaFieldGroup
                                    placeholder="Pequena biografia"
                                    name="bio"
                                    value={this.state.bio}
                                    onChange={this.onChange}
                                    error={errors.bio}
                                    info="Nos conte um pouco sobre sua história."
                                />

                                <div className="mb-3">
                                    <button
                                        type="button"
                                        onClick={() => {
                                        this.setState(prevState => ({
                                            displaySocialInputs: !prevState.displaySocialInputs
                                        }))
                                    }} className="btn btn-light">
                                        Adicione suas Redes Sociais
                                    </button>
                                    <span className="text-muted">
                                        Opcional
                                    </span>
                                </div>
                                {socialInputs}
                                <input type="submit" value="Criar perfil" className="btn btn-info btn-block mt-4"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

CreateProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
});

export default connect(mapStateToProps, {createProfile})(withRouter(CreateProfile));
