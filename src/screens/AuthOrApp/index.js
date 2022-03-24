import React, { Component } from 'react'
import { View, ActivityIndicator, Alert } from 'react-native'
import { CommonActions } from '@react-navigation/native';

import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'
import styles from './style'

export default class AuthOrApp extends Component {

    componentDidMount = async () => {
        const userDataJson = await AsyncStorage.getItem('userData')
        let userData = null

        try {
            userData = JSON.parse(userDataJson)
        } catch (e) {
            Alert.alert('Erro', 'Os dados são inválidos!')
        }

        if (userData && userData.token) {
            axios.defaults.headers.common['Authorization'] = `bearer ${userData.token}`
            this.props.navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{
                        name: 'Home',
                        params: userData,
                    }]
                }))
        } else {
            this.props.navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{
                        name: 'Auth',
                    }]
                }))
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator size='large' />
            </View>
        );
    }
}