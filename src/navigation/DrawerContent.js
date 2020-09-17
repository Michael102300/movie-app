import React, { useState } from 'react';
import { View } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import {  Drawer, Switch, TouchableRipple, Text} from 'react-native-paper';

export default function DrawerContent({ navigation }){

    const [ active, setActive ] = useState('home');

    const onChangeScreen = ( screen ) => {
        setActive(screen);
        navigation.navigate(screen);
    }
    return (
        <DrawerContentScrollView>
            <Drawer.Section>
                <Drawer.Item
                    label= "Inicio"
                    active={active === 'home'}
                    onPress={()=>onChangeScreen('home')}
                />
                <Drawer.Item
                    label= "Popular movies"
                    active={active === 'popular'}
                    onPress={()=>onChangeScreen('popular')}
                />
                <Drawer.Item
                    label= "News movies"
                    active={active === 'news'}
                    onPress={()=>onChangeScreen('news')}
                />
            </Drawer.Section>
        </DrawerContentScrollView>
    )
}


