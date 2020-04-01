import React                         from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { FiArrowLeft }               from 'react-icons/fi';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

import './styles.css';

type NewIncidentState = {
    title:       string,
    description: string,
    value:       string
}

// Stateful Container
class NewIncidentContainer extends React.Component<RouteComponentProps, NewIncidentState> {

    private readonly ongId:   string = localStorage.getItem('ongId')   || '';
    // private readonly ongName: string = localStorage.getItem('ongName') || '';

    constructor (props: RouteComponentProps) {

        super(props);

        this.state = {
            title:       '',
            description: '',
            value:       ''
        }

        this.handleChange      = this.handleChange.bind(this);
        this.handleNewIncident = this.handleNewIncident.bind(this);
    }

    handleChange (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        
        const targetName  = event.currentTarget.getAttribute('name') || "",
              targetValue = event.currentTarget.value;
        
        let setObj: any = {};

        setObj[targetName] = targetValue;
        this.setState(setObj);
    }

    async handleNewIncident (event: React.FormEvent) {

        event.preventDefault();
        
        const   {
                    title,
                    description,
                    value
                }     = this.state,
                data  = {
                            title,
                            description,
                            value: Number(
                                value.replace(',', '.')
                                     .replace(' ', '')
                                     .replace('R$', '')
                            )
                        };

        console.log(data);

        try {

            await api.post('incidents', data, {
                headers: {
                    "Authorization": this.ongId
                }
            });

            this.props.history.push('/profile');
        }
        catch (err) {
            console.log(`Erro: ${err.message || err.msg || err.details || err.status || err}`);
            alert('Ops! Não foi possível cadastrar novo caso (tente mais tarde...)');
        }
    }

    render () {
        return (
            <NewIncident 
                title={this.state.title}
                description={this.state.description}
                value={this.state.value}
                handleChange={this.handleChange}
                handleNewIncident={this.handleNewIncident}
            />
        );
    }
}


type NewIncidentProps = {
    title:             string,
    description:       string,
    value:             string,
    handleChange:      React.ChangeEventHandler,
    handleNewIncident: React.FormEventHandler
}

// Stateless Presentation
const NewIncident = (props: NewIncidentProps) => {
    return (
        <div className="new-incident-container">
            <div className="new-incident-content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />
                    <h2>Cadastrar novo caso</h2>
                    <p>Descreva o caso detalhadamente, e encontre um herói para ajudar.</p>
                    <Link to="/profile" className="default-link" >
                        <FiArrowLeft size={16} color="#e02041" />
                        Voltar para perfil
                    </Link>
                </section>
                <form onSubmit={props.handleNewIncident}>
                    <input 
                        name="title"
                        placeholder="Título do caso"
                        value={props.title}
                        onChange={props.handleChange}
                    />
                    <textarea 
                        name="description" 
                        placeholder="Descrição"
                        value={props.description}
                        onChange={props.handleChange}
                    />
                    <input 
                        name="value" 
                        placeholder="Valor em R$"
                        value={props.value}
                        onChange={props.handleChange}
                    />
                    <button type="submit" className="default-button">Salvar</button>    
                </form>
            </div>
        </div>
    );
}

export default NewIncidentContainer;