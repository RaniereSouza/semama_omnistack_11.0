import { StyleSheet } from 'react-native';
import Constants      from 'expo-constants';

export default StyleSheet.create({
    container: {
        flex:              1,
        paddingHorizontal: 20,
        paddingTop:        Constants.statusBarHeight + 15,
        paddingBottom:     15,
        backgroundColor:   '#f0f0f5',
    },
    header: {
        flexDirection:  'row',
        alignItems:     'center',
        justifyContent: 'space-between',
    },
    incidentCard: {
        marginTop:       15,
        backgroundColor: '#fff',
        padding:         15,
        borderRadius:    8,
    },
    incidentProperty: {
        fontSize:   14,
        color:      '#41414d',
        fontWeight: 'bold',
        marginTop:  20,
    },
    incidentValue: {
        marginTop: 5,
        fontSize:  15,
        color:     '#737380',
    },
    contactBox: {
        marginTop:       15,
        backgroundColor: '#fff',
        padding:         15,
        borderRadius:    8,
    },
    contactBoxTitle: {
        fontWeight: 'bold',
        fontSize:   15,
        color:      '#13131a',
        lineHeight: 30,
    },
    contactBoxDescription: {
        fontSize:  15,
        color:     '#737380',
        marginTop: 15,
    },
    actions: {
        marginTop:      15,
        flexDirection:  'row',
        justifyContent: 'space-between',
        width:          '100%',
    },
    actionButton: {
        backgroundColor:   '#e02041',
        borderRadius:      8,
        paddingHorizontal: 20,
        paddingVertical:   15,
        width:             '47.5%',
    },
    actionText: {
        color:         '#fff',
        textAlign:     'center',
        fontVariant:   ['small-caps'],
        textTransform: 'uppercase',
        letterSpacing: 2.5,
        fontWeight:    'bold',
    },
});