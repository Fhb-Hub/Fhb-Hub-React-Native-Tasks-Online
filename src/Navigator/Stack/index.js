import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Auth from '../../screens/Auth'
import AuthOrApp from '../../screens/AuthOrApp'
import Drawer from '../Drawer'

const Stack = createStackNavigator();

export default () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="AuthOrApp" component={AuthOrApp} />
            <Stack.Screen name="Auth" component={Auth} />
            <Stack.Screen name="Home" component={Drawer} />
        </Stack.Navigator>
    )
}