import React                         from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { FiLogIn }                   from 'react-icons/fi';

import api from '../../services/api';

import heroesImg from '../../assets/heroes.png';
import logoImg   from '../../assets/logo.svg';

import './styles.css';

type LoginState = {
    id: string
};

// Stateful Container
class LoginContainer extends React.Component<RouteComponentProps, LoginState> {

    constructor (props: RouteComponentProps) {
        
        super(props);

        this.state = {
            id: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleLogin  = this.handleLogin.bind(this);
    }

    handleChange (event: React.ChangeEvent<HTMLInputElement>) {
        
        const targetName  = event.currentTarget.getAttribute('name') || "",
              targetValue = event.currentTarget.value;
        
        let setObj : any = {};

        setObj[targetName] = targetValue;
        this.setState(setObj);
    }

    async handleLogin (event: React.FormEvent) {

        event.preventDefault();

        const data = {...this.state};
        console.log(data);

        try {

            const res = await api.post('sessions', data);

            localStorage.setItem("ongId",   this.state.id);
            localStorage.setItem("ongName", res.data.name);

            this.props.history.push('/profile');
        }
        catch (err) {
            console.log(`Erro: ${err.message || err.msg || err.details || err.status || err}`);
            alert('Ops! Não foi possível fazer seu login (tente mais tarde...)');
        }
    }

    render () {
        return (
            <Login
                id={this.state.id}
                handleChange={this.handleChange}
                handleLogin={this.handleLogin}
            />
        );
    }
}

type LoginProps = {
    id:           string,
    handleChange: React.ChangeEventHandler,
    handleLogin:  React.FormEventHandler
}

// Stateless Presentation
const Login = (props: LoginProps) => {
    return (
        <div className="login-container">
            <section className="form-container">
                <img src={logoImg} alt="Be The Hero"/>
                <form onSubmit={props.handleLogin}>
                    <h2>Faça seu login</h2>
                    <input
                        name="id"
                        placeholder="Sua ID"
                        value={props.id}
                        onChange={props.handleChange}
                    />
                    <button type="submit" className="default-button" >Entrar</button>
                    <Link to="/register" className="default-link" >
                        <FiLogIn size={16} color="#e02041"/>
                        Não tenho cadastro
                    </Link>
                </form>
            </section>
            <img src={heroesImg} alt="Heroes" />
        </div>
    );
}

export default LoginContainer;