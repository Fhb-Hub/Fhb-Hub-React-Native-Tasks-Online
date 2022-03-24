import { StyleSheet } from 'react-native'
import commonStyles from '../../commonStyles'

export default StyleSheet.create({
    header: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        marginRight: 10,
        borderBottomWidth: 1,
        borderColor: '#DDD'
    },
    title: {
        color: '#000',
        fontFamily: commonStyles.fontFamily,
        fontSize: 30,
    },
    infoUser: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderColor: '#DDD'
    },
    avatar: {
        width: 60,
        height: 60,
        borderWidth: 3,
        borderRadius: 30,
        borderColor: '#000',
        margin: 10,
        backgroundColor: '#222'
    },
    name: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.mainText,
        fontSize: 18,
        marginBottom: 5,
    },
    email: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.subText,
        fontSize: 12,
    },
})