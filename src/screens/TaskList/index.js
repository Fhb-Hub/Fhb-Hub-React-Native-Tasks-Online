import React, { Component } from 'react'
import {
    SafeAreaView,
    View,
    Text,
    ImageBackground,
    FlatList,
    TouchableOpacity,
    Alert
} from 'react-native'

import AsyncStorage from "@react-native-community/async-storage"
import Icon from 'react-native-vector-icons/FontAwesome'
import axios from 'axios'
import moment from 'moment'
import 'moment/locale/pt-br'

import todayImage from './../../../assets/imgs/today.jpg'
import tomorrowImage from './../../../assets/imgs/tomorrow.jpg'
import weekImage from './../../../assets/imgs/week.jpg'
import monthImage from './../../../assets/imgs/month.jpg'

import { server, showError } from '../../common'
import commonStyles from '../../commonStyles'
import Task from './../../components/Task'
import AddTask from './../AddTask'
import styles from './style'

const initialState = {
    showDoneTasks: true,
    showAddTask: false,
    visibleTask: [],
    tasks: []
}

export default class TaskList extends Component {
    state = {
        ...initialState
    }

    componentDidMount = async () => {
        const stateString = await AsyncStorage.getItem('tasksState')
        const savedState = JSON.parse(stateString) || initialState
        this.setState({
            showDoneTasks: savedState.showDoneTasks
        }, this.filterTasks)
        this.loadTask()
    }

    loadTask = async () => {
        try {
            const maxDate = moment()
                .add({ days: this.props.daysAhead })
                .format('YYYY-MM-DD 23:59:59')
            const res = await axios.get(`${server}/tasks?date=${maxDate}`)
            this.setState({ tasks: res.data }, this.filterTasks)
        } catch (e) {
            showError(e)
        }
    }

    filterTasks = () => {
        this.setState({
            visibleTask: this.state.showDoneTasks
                ? [...this.state.tasks]
                : this.state.tasks.filter(this.isPending)
        })
        AsyncStorage.setItem(
            'tasksState',
            JSON.stringify({ showDoneTasks: this.state.showDoneTasks })
        )
    }

    isPending = task => (task.doneAt === null)

    toggleFilter = () => {
        this.setState(
            { showDoneTasks: !this.state.showDoneTasks },
            this.filterTasks)
    }

    addTask = async newTask => {
        if (!newTask.desc || !newTask.desc.trim()) {
            Alert.alert('Dados Inválidos', 'Descrição não informada!')
            return
        }

        try {
            await axios.post(`${server}/tasks`, {
                desc: newTask.desc,
                estimateAt: newTask.date
            })

            this.setState({ showAddTask: false }, this.loadTask)
        } catch (e) {
            showError(e)
        }
    }

    deleteTask = async taskId => {
        try {
            await axios.delete(`${server}/tasks/${taskId}`)
            this.loadTask()
        } catch (e) {
            showError(e)
        }
    }

    toggleCheck = async taskId => {
        try {
            await axios.put(`${server}/tasks/${taskId}/toggle`)
            this.loadTask()
        } catch (e) {
            showError(e)
        }
    }

    getImage = () => {
        switch (this.props.daysAhead) {
            case 0: return todayImage
            case 1: return tomorrowImage
            case 7: return weekImage
            default: return monthImage
        }
    }

    getColor = () => {
        switch (this.props.daysAhead) {
            case 0: return commonStyles.colors.today
            case 1: return commonStyles.colors.tomorrow
            case 7: return commonStyles.colors.week
            default: return commonStyles.colors.month
        }
    }

    render() {
        const today = moment().locale('pt-br').format('ddd, D [de] MMMM')
        return (
            <SafeAreaView style={styles.container}>
                <AddTask isVisible={this.state.showAddTask}
                    onCalcel={() => this.setState({ showAddTask: false })}
                    onSave={this.addTask} />
                <ImageBackground source={this.getImage()} style={styles.background}>
                    <View style={styles.iconBar}>
                        <TouchableOpacity onPress={this.props.navigation.openDrawer}>
                            <Icon name='bars'
                                size={20}
                                color="#fff" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.toggleFilter}>
                            <Icon name={this.state.showDoneTasks ? "eye" : "eye-slash"}
                                size={20}
                                color="#fff" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>{this.props.title}</Text>
                        <Text style={styles.subtitle}>{today}</Text>
                    </View>
                </ImageBackground>
                <View style={styles.taskList}>
                    <FlatList data={this.state.visibleTask}
                        keyExtractor={item => `${item.id}`}
                        renderItem={({ item }) =>
                            <Task {...item}
                                buttonColor={this.getColor()}
                                onToggleCheck={this.toggleCheck}
                                onDelete={this.deleteTask} />} />
                </View>
                <TouchableOpacity style={[
                    styles.addButton, {
                        backgroundColor: this.getColor()
                    }]}
                    activeOpacity={0.8}
                    onPress={() => this.setState({ showAddTask: true })}>
                    <Icon name="plus"
                        size={20}
                        color="#fff" />
                </TouchableOpacity>
            </SafeAreaView>
        );
    }
}