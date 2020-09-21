import React, {useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Dimensions, Image, TouchableWithoutFeedback } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { map } from 'lodash';

import { getNewsMoviesApi } from '../api/movies';
import { BASE_PATH_IMG } from '../utils/constants';
import usePreferences from '../hooks/usePreferences';

const { width } = Dimensions.get('window')

export default News = ( props ) => {
    const { navigation } = props;
    const [ movies, setMovies ] = useState(null);
    const [ page, setPage] = useState(null);
    const [showButtonMore, setShowButtonMore] = useState(true)
    const { theme } = usePreferences();

    useEffect(() => {
        getNewsMoviesApi(page).then((response) => {
            const totalPages = response.total_pages
            if(page < totalPages) {
                if(!movies) {
                    setMovies(response.results)
                }else{
                    setMovies([ ...movies, ...response.results ])
                }
            }else{
                setShowButtonMore(false)
            }
        })
    },[ page ])
    return (
        <ScrollView>
            <View style={styles.container}>
                {map(movies, ( movie, index ) => (
                    <Movie  key={index} movie={movie} navigation={navigation}/>
                ))}
            </View>
            { showButtonMore && (
                <Button 
                    mode='contained'
                    contentStyle={styles.loadMoreContainer}
                    style={styles.loadMore}
                    labelStyle={{ color : theme === 'dark' ? '#ffff' : '#0000'}}
                    onPress={() => setPage( page + 1)}
                >
                    Cargar más...
                </Button>
            )}
        </ScrollView>
    );
};

function Movie(props) {
    const { movie, navigation } = props
    const { id, title, poster_path } = movie

    const goMovie = () => {
        navigation.navigate('movie', { id })
    }
    return (
        <TouchableWithoutFeedback onPress={goMovie}>
            <View style={styles.movie}>
                {poster_path ? (
                    <Image 
                        style={styles.image}
                        source={{ uri: `${BASE_PATH_IMG}/w500${poster_path}`}}
                        
                    />
                ):(
                    <Text>
                        {title}
                    </Text>
                )}
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'row',
        flexWrap: "wrap",
    },
    movie:{
        width: width / 2,
        height: 300,
        justifyContent: 'center',
        alignContent: 'center'
    },
    image:{
        width:'100%',
        height:'100%'
    },
    loadMoreContainer:{
        paddingTop: 20,
        paddingBottom: 30
    },
    loadMore:{
        backgroundColor: 'transparent'
    }
})