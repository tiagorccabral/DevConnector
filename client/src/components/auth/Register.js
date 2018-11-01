import React, {Component} from 'react';

class Register extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
            errors: {}
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };

        console.log(newUser);
    }

    render () {
        return (
            <div>
                <div className="register">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 m-auto">
                                <h1 className="display-4 text-center">Sign Up</h1>
                                <p className="lead text-center">Crie sua conta DevConnector</p>
                                <form onSubmit={this.onSubmit}>
                                    <div className="form-group">
                                        <input type="text" className="form-control form-control-lg" placeholder="Nome"
                                               name="name" value={this.state.name} onChange={this.onChange}/>
                                    </div>
                                    <div className="form-group">
                                        <input type="email" className="form-control form-control-lg"
                                               placeholder="Endereço de E-mail"
                                               value={this.state.email}
                                               onChange={this.onChange}
                                               name="email"/>
                                        <small className="form-text text-muted">Este site utiliza Gravatar, então se deseja uma imagem de perfil
                                            utilize seu email Gravatar
                                        </small>
                                    </div>
                                    <div className="form-group">
                                        <input type="password" className="form-control form-control-lg"
                                               placeholder="Senha"
                                               value={this.state.password}
                                               onChange={this.onChange}
                                               name="password"/>
                                    </div>
                                    <div className="form-group">
                                        <input type="password" className="form-control form-control-lg"
                                               placeholder="Confirme a senha"
                                               value={this.state.password2}
                                               onChange={this.onChange}
                                               name="password2"
                                        />
                                    </div>
                                    <input type="submit" className="btn btn-info btn-block mt-4"/>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;
