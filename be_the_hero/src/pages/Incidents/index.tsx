import  'intl';
import  'intl/locale-data/jsonp/pt-BR';

import  React,
        { 
            useEffect,
            useState
        }                 from 'react';
import  { 
            View,
            Image,
            Text,
            TouchableOpacity,
            FlatList,
            GestureResponderEvent,
            GestureResponderHandlers
        }                 from 'react-native';
import  { useNavigation } from '@react-navigation/native';
import  { Feather }       from '@expo/vector-icons';

import api from '../../services/api';

import styles from './styles';

import logoImg from '../../assets/logo.png';

type IncidentEntity = {
    id:       number,
    title:    string,
    value:    number,
    ongName:  string,
    ongEmail: string,
    ongWhats: string,
    ongCity:  string,
    ongUF:    string
};

type IncidentsState = {
    total:     number,
    page:      number,
    loading:   boolean,
    incidents: Array<IncidentEntity>
};

// Stateful Container
const IncidentsContainer = () => {

    const   navigation          = useNavigation(),
            [ state, setState ] = useState<IncidentsState>({
                total:     0,
                page:      1,
                loading:   false,
                incidents: []
            });

    useEffect(() => {
        loadIncidents();
    }, []);

    function navigateToDetail (incident: IncidentEntity) {
        navigation.navigate('Detail', { incident });
    }

    async function loadIncidents () {

        if (state.loading ||
           (state.total > 0 &&
           (state.incidents.length === state.total))) return; 

        try {

            setState({...state, loading: true});

            const   res       = await api.get('incidents', {params: {page: state.page}}),
                    total     = res.headers['x-total-count'],
                    incidents = [
                        ...state.incidents,
                        ...res.data.map((item) : IncidentEntity => ({
                            id:       item.id,
                            title:    item.title,
                            value:    item.value,
                            ongName:  item.name,
                            ongEmail: item.email,
                            ongWhats: item.whatsapp,
                            ongCity:  item.city,
                            ongUF:    item.uf
                        }))
                    ],
                    page      = state.page + 1;

            setState({...state, total, page, incidents, loading: false});
        }
        catch (err) {
            console.log(`Erro: ${err.message || err.msg || err.details || err.status || err}`);
            alert('Ops! Não foi possível carregar os casos (tente mais tarde...)');
        }
    }

    return (
        <Incidents
            total={state.total}
            incidents={state.incidents} 
            loadIncidents={loadIncidents}
            navigateToDetail={navigateToDetail}
        />
    );
}

type IncidentsProps = {
    total:         number,
    incidents:     Array<IncidentEntity>,
    loadIncidents: Function,
    navigateToDetail(incident: IncidentEntity): void
};

// Stateless Presentation
const Incidents = (props: IncidentsProps) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{props.total} casos</Text>.
                </Text>
            </View>
            <Text style={styles.title}>Bem vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>
            <FlatList
                style={styles.incidentList} 
                data={props.incidents}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => String(item.id)}
                onEndReached={() => props.loadIncidents()}
                onEndReachedThreshold={0.2}
                renderItem={({item}) => (
                    <View style={styles.incidentCard}>
                        <Text style={styles.incidentProperty}>ONG:</Text>
                        <Text style={styles.incidentValue}>{item.ongName}</Text>
                        <Text style={styles.incidentProperty}>Caso:</Text>
                        <Text style={styles.incidentValue}>{item.title}</Text>
                        <Text style={styles.incidentProperty}>Valor:</Text>
                        <Text style={styles.incidentValue}>
                            {
                                Intl.NumberFormat('pt-BR', {
                                    style:    'currency',
                                    currency: 'BRL'
                                }).format(item.value)
                            }
                        </Text>
                        <TouchableOpacity 
                            style={styles.detailsButton}
                            onPress={() => props.navigateToDetail(item)}
                        >
                            <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                            <Feather name='arrow-right' size={16} color='#e02041' />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}

export default IncidentsContainer;