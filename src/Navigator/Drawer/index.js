import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import TaskList from '../../screens/TaskList'
import menuConfig from './menuConfig';
import Menu from '../../screens/Menu';

const Drawer = createDrawerNavigator();

export default props => {
    const { email, name } = props.route.params
    return (
        <Drawer.Navigator initialRouteName="Today"
            screenOptions={menuConfig}
            drawerContent={
                (props) => <Menu {...props}
                    email={email}
                    name={name}
                />}>
            <Drawer.Screen name="Today" options={{ title: 'Hoje' }}>
                {props => <TaskList {...props}
                    title='Hoje'
                    daysAhead={0} />}
            </Drawer.Screen>
            <Drawer.Screen name="Tomorrow" options={{ title: 'Amanhã' }}>
                {props => <TaskList {...props}
                    title='Amanhã'
                    daysAhead={1} />}
            </Drawer.Screen>
            <Drawer.Screen name="Week" options={{ title: 'Semana' }}>
                {props => <TaskList {...props}
                    title='Semana'
                    daysAhead={7} />}
            </Drawer.Screen>
            <Drawer.Screen name="Month" options={{ title: 'Mês' }}>
                {props => <TaskList {...props}
                    title='Mês'
                    daysAhead={30} />}
            </Drawer.Screen>
        </Drawer.Navigator>
    );
};