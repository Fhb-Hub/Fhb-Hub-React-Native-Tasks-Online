
import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

import { CommonActions } from '@react-navigation/native';
import {
    DrawerContentScrollView,
    DrawerItemList
} from '@react-navigation/drawer'

import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'
import { Gravatar } from 'react-native-gravatar';
import Icon from 'react-native-vector-icons/FontAwesome'
import styles from './style';

export default props => {


    const logout = () => {
        delete axios.defaults.headers.common['Authorization']
        AsyncStorage.removeItem('userData')
        props.navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{
                    name: 'Auth',
                },],
            })
        )
    }

    return (
        <DrawerContentScrollView style={{ paddingHorizontal: 10 }}>
            <View style={styles.header}>
                <Text style={styles.title}>Tasks</Text>
                <TouchableOpacity onPress={logout}>
                    <Icon name='sign-out'
                        size={25}
                        color='#800' />
                </TouchableOpacity>
            </View>
            <View style={styles.infoUser}>
                <Gravatar style={styles.avatar}
                    options={{
                        email: props.email,
                        secure: true,
                    }} />
                <Text style={styles.name}>
                    {props.name}
                </Text>
                <Text style={styles.email}>
                    {props.email}
                </Text>
            </View>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    )
}