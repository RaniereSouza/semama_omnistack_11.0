import React                         from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { FiPower, FiTrash2 }         from 'react-icons/fi';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

import './styles.css';

type IncidentEntity = {
    id:          number,
    title:       string,
    description: string,
    value:       number,
    ong_id:      string
};

type ProfileState = {
    incidents: Array<IncidentEntity>
};

// Stateful Container
class ProfileContainer extends React.Component<RouteComponentProps, ProfileState> {

    private readonly ongId:   string = localStorage.getItem('ongId')   || '';
    private readonly ongName: string = localStorage.getItem('ongName') || '';

    constructor (props: RouteComponentProps) {

        super(props);

        this.state = {
            incidents: []
        }

        this.handleDelete = this.handleDelete.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    async componentDidMount () {

        try {
            
            const res = await api.get('profile', {
                headers: {
                    "Authorization": this.ongId
                }
            });

            console.log(res.data);
            this.setState({incidents: res.data});
        }
        catch (err) {
            console.log(`Erro: ${err.message || err.msg || err.details || err.status || err}`);
            alert('Ops! Não foi possível carregar os seus casos (tente mais tarde...)');
        }
    }

    async handleDelete (event: React.MouseEvent<HTMLButtonElement>) {

        const id = event.currentTarget.getAttribute('data-id');

        try {

            await api.delete(`/incidents/${id}`, {headers: {
                "Authorization": this.ongId
            }});
            
            this.setState({
                incidents: this.state.incidents.filter(item => item.id !== Number(id))
            });
        }
        catch (err) {
            console.log(`Erro: ${err.message || err.msg || err.details || err.status || err}`);
            alert('Ops! Não foi possível remover o caso (tente mais tarde...)');
        }
    }

    handleLogout (event: React.MouseEvent<HTMLButtonElement>) {
        localStorage.removeItem('ongId');
        localStorage.removeItem('ongName');
        this.props.history.push('/');
    }

    render () {
        return (
            <Profile 
                ongName={this.ongName}
                incidents={this.state.incidents}
                handleDelete={this.handleDelete}
                handleLogout={this.handleLogout}
            />
        );
    }
}

type ProfileProps = {
    ongName:      string,
    incidents:    Array<IncidentEntity>,
    handleDelete: React.MouseEventHandler,
    handleLogout: React.MouseEventHandler
};

// Stateless Presentation
const Profile = (props: ProfileProps) => {

    type IncidentCardProps = {
        incident:     IncidentEntity,
        handleDelete: React.MouseEventHandler
    };

    const IncidentCard = (props: IncidentCardProps) => {
        return (
            <li>
                <strong>Caso:</strong>
                <p>{props.incident.title}</p>

                <strong>Descrição:</strong>
                <p>{props.incident.description}</p>

                <strong>Valor:</strong>
                <p>
                    {
                        Intl.NumberFormat('pt-BR', {
                            style:    'currency',
                            currency: 'BRL'
                        }).format(props.incident.value)
                    }
                </p>

                <button 
                    type="button"
                    data-id={props.incident.id}
                    onClick={props.handleDelete}
                >
                    <FiTrash2 size={20} color="#a8a8b3" />
                </button>
            </li>
        );
    };

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/>
                <span>Bem vinda,&nbsp;<span>{props.ongName}</span></span>
                <Link to="/incidents/new" className="default-button">
                    Cadastrar novo caso
                </Link>
                <button type="button" onClick={props.handleLogout}>
                    <FiPower size={18} color="#e02041" />
                </button>
            </header>
            <h2>Meus casos</h2>
            <ul>
                {
                    props.incidents ?
                    props.incidents.map(
                        (item: IncidentEntity, index: number) => (
                            <IncidentCard
                                key={`incident-${index}`}
                                incident={item}
                                handleDelete={props.handleDelete}
                            />
                        )
                    ) :
                    <li>Você não tem casos cadastrados.</li>
                }
            </ul>
        </div>
    );
}

export default ProfileContainer;