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
    headerText: {
        fontSize: 15,
        color:    '#737380',
    },
    headerTextBold: {
        fontWeight: 'bold',
    },
    title: {
        fontSize:     30,
        marginBottom: 15,
        marginTop:    30,
        color:        '#13131a',
        fontWeight:   'bold',
    },
    description: {
        fontSize:   15,
        lineHeight: 24,
        color:      '#737380',
    },
    incidentList: {
        marginTop: 15,
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
    },
    incidentValue: {
        marginTop:    5,
        fontSize:     15,
        marginBottom: 20,
        color:        '#737380',
    },
    detailsButton: {
        flexDirection:  'row',
        justifyContent: 'space-between',
        alignItems:     'center',
    },
    detailsButtonText: {
        color:       '#e02041',
        fontSize:    15,
        fontWeight:  'bold',
        fontVariant: ['small-caps'],
    },
});