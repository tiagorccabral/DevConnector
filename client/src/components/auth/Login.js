import React, {Component} from 'react';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            errors: {}
        };
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    onSubmit = (e) => {
        e.preventDefault();

        const User = {
            email: this.state.email,
            password: this.state.password
        };

        console.log(User);
    };

    render () {
        return (
            <div>
                <div className="login">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 m-auto">
                                <h1 className="display-4 text-center">Log In</h1>
                                <p className="lead text-center">Entre na sua conta DevConnector</p>
                                <form onSubmit={this.onSubmit}>
                                    <div className="form-group">
                                        <input type="email" className="form-control form-control-lg"
                                               placeholder="Endereço de E-mail"
                                               value={this.state.email}
                                               onChange={this.onChange}
                                               name="email"
                                         />
                                    </div>
                                    <div className="form-group">
                                        <input type="password" className="form-control form-control-lg"
                                               placeholder="Senha"
                                               value={this.state.password}
                                               onChange={this.onChange}
                                               name="password"
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

export default Login;
