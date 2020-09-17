import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { IconButton } from 'react-native-paper';

import Home from '../screens/Home';
import Movie from '../screens/Movie';
import News from '../screens/News';
import Popular from '../screens/Popular';
import Search from '../screens/Search';

const Stack = createStackNavigator();

export default StackNavigation = ( { navigation }) => {
    const buttonLeft = () => (
        <IconButton
            icon="menu"
            onPress={ () => navigation.openDrawer()}
        />
    )
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="home" 
                component={Home} 
                options={{ title: 'MovieApp', headerLeft: () => buttonLeft() }} 
            />
            <Stack.Screen 
                name="movie" 
                component={Movie} 
                options={{ title: '' , headerLeft: () => buttonLeft()}} 
            />
            <Stack.Screen 
                name="news" 
                component={News} 
                options={{ title: 'News movies' , headerLeft: () => buttonLeft()}} 
            />
            <Stack.Screen 
                name="popular" 
                component={Popular} 
                options={{ title: 'Popular movies', headerLeft: () => buttonLeft() }} 
            />
            <Stack.Screen 
                name="search" 
                component={Search} 
                options={{ title: '' , headerLeft: () => buttonLeft()}} 
            />
        </Stack.Navigator>
    )
}