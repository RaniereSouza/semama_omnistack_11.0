import  'intl';
import  'intl/locale-data/jsonp/pt-BR';

import  React        from 'react';
import  { 
            View, 
            Image, 
            Text,
            TouchableOpacity, 
            GestureResponderEvent,
            Linking
        }            from 'react-native';
import  {
            RouteProp,
            useNavigation,
            useRoute
        }            from '@react-navigation/native';
import  { Feather }  from '@expo/vector-icons';
import  MailComposer from 'expo-mail-composer';

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

type ParamList = {
    FromIncidentsRoute: {incident: IncidentEntity}
}

type DetailRouteProps = RouteProp<ParamList, 'FromIncidentsRoute'>;

// Stateful Container
const DetailContainer = () => {

    const navigation = useNavigation(),
          route      = useRoute<DetailRouteProps>(),
          incident   = route.params.incident,
          message    = `Olá, ${incident.ongName}! Estou entrando em contato pois gostaria de ajudar no caso \"${incident.title}\" com o valor de R$ ${incident.value.toFixed(2).replace('.', ',')}`;

    function navigateBack (event: GestureResponderEvent) {
        navigation.canGoBack() ?
        navigation.goBack() :
        navigation.navigate('Incidents');
    }

    function sendMail (event: GestureResponderEvent) {
        MailComposer.composeAsync({
            subject:    `Herói do caso: ${incident.title}`,
            recipients: [incident.ongEmail],
            body:       message
        });
    }

    function sendWhats (event: GestureResponderEvent) {
        Linking.openURL(`whatsapp://send?phone=${incident.ongWhats}&text=${message}`);
    }

    return (
        <Detail
            incident={incident}
            navigateBack={navigateBack}
            sendMail={sendMail}
            sendWhats={sendWhats}
        />
    );
}


type DetailProps = {
    incident: IncidentEntity,
    navigateBack(event: GestureResponderEvent): void,
    sendMail(event: GestureResponderEvent):     void,
    sendWhats(event: GestureResponderEvent):    void
};

// Stateless Presentation
const Detail = (props: DetailProps) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <TouchableOpacity onPress={props.navigateBack}>
                    <Feather name='arrow-left' size={28} color='#e02041'/>
                </TouchableOpacity>
            </View>
            <View style={styles.incidentCard}>
                <Text style={[styles.incidentProperty, {marginTop: 0}]}>ONG:</Text>
                <Text style={styles.incidentValue}>{props.incident.ongName}, de {props.incident.ongCity} - {props.incident.ongUF}</Text>
                <Text style={styles.incidentProperty}>Caso:</Text>
                <Text style={styles.incidentValue}>{props.incident.title}</Text>
                <Text style={styles.incidentProperty}>Valor:</Text>
                <Text style={styles.incidentValue}>
                    {
                        Intl.NumberFormat('pt-BR', {
                            style:    'currency',
                            currency: 'BRL'
                        }).format(props.incident.value)
                    }
                </Text>
            </View>
            <View style={styles.contactBox}>
                <Text style={styles.contactBoxTitle}>Salve o dia!</Text>
                <Text style={styles.contactBoxTitle}>Seja o herói desse caso.</Text>
                <Text style={styles.contactBoxDescription}>Entre em contato:</Text>
                <View style={styles.actions}>
                    <TouchableOpacity 
                        style={styles.actionButton}
                        onPress={props.sendWhats}
                    >
                        <Text style={styles.actionText}>WhatsApp</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.actionButton}
                        onPress={props.sendMail}
                    >
                        <Text style={styles.actionText}>E-mail</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default DetailContainer;