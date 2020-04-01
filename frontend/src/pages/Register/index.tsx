import React                         from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { FiArrowLeft }               from 'react-icons/fi';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

import './styles.css';

type RegisterState = {
    name:     string,
    email:    string,
    whatsapp: string,
    city:     string,
    uf:       string
};

// Stateful Container
class RegisterContainer extends React.Component<RouteComponentProps, RegisterState> {

    constructor (props: RouteComponentProps) {

        super(props);

        this.state = {
            name:     "",
            email:    "",
            whatsapp: "",
            city:     "",
            uf:       ""
        }

        this.handleChange   = this.handleChange.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
    }

    handleChange (event: React.ChangeEvent<HTMLInputElement>) {
        
        const targetName  = event.currentTarget.getAttribute('name') || "",
        targetValue       = event.currentTarget.value;
        
        let setObj : any = {};
        
        setObj[targetName] = targetValue;
        this.setState(setObj);
    }
    
    async handleRegister (event: React.FormEvent) {

        event.preventDefault();
        
        const data = {...this.state};
        console.log(data);

        try {

            const res = await api.post('ongs', data);

            alert(`Seu ID de acesso: ${res.data.id}`);
            this.props.history.push('/');
        }
        catch (err) {
            console.log(`Erro: ${err.message || err.msg || err.details || err.status || err}`);
            alert('Ops! Não foi possível completar seu cadastro (tente mais tarde...)');
        }
    }

    render () {
        return (
            <Register
                name={this.state.name}
                email={this.state.email}
                whatsapp={this.state.whatsapp}
                city={this.state.city}
                uf={this.state.uf}
                handleChange={this.handleChange}
                handleRegister={this.handleRegister}
            />
        );
    }
}

type RegisterProps = {
    name:           string,
    email:          string,
    whatsapp:       string,
    city:           string,
    uf:             string,
    handleChange:   React.ChangeEventHandler,
    handleRegister: React.FormEventHandler
};


// Stateless Presentation
const Register = (props: RegisterProps) => {
    return (
        <div className="register-container">
            <div className="register-content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />
                    <h2>Cadastro</h2>
                    <p>Faça seu cadastro, entre na plataforma, e ajude pessoas a encontrarem os casos da sua ONG.</p>
                    <Link to="/" className="default-link" >
                        <FiArrowLeft size={16} color="#e02041" />
                        Voltar para login
                    </Link>
                </section>
                <form onSubmit={props.handleRegister}>
                    <input
                        name="name"
                        placeholder="Nome da ONG"
                        value={props.name}
                        onChange={props.handleChange}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="E-mail"
                        value={props.email}
                        onChange={props.handleChange}
                    />
                    <input
                        name="whatsapp"
                        placeholder="WhatsApp"
                        value={props.whatsapp}
                        onChange={props.handleChange}
                    />
                    <div className="input-group">
                        <input
                            name="city" 
                            placeholder="Cidade"
                            value={props.city}
                            onChange={props.handleChange}
                        />
                        <input
                            name="uf"
                            placeholder="UF"
                            style={{width: 80}}
                            value={props.uf}
                            onChange={props.handleChange}
                        />
                    </div>
                    <button type="submit" className="default-button">Criar conta</button>    
                </form>
            </div>
        </div>
    );
}

export default RegisterContainer;