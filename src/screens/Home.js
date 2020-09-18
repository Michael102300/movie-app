import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { Title } from 'react-native-paper';
import { map } from 'lodash';

import { getNewsMoviesApi, getAllGenresApi, getGenreMoviesApi } from '../api/movies';
import CarouselVertical from '../components/CarouselVertical';
import CarouseMulti from '../components/CarouselMulti';

export default Home = ( { navigation } ) => {
    const [ newMovies, setNewMovies ] = useState(null);
    const [ genreList, setGenreList] = useState([]);
    const [ genreSelected, setGenreSelected] = useState(28);
    const [ genreMovies, setGenreMovies] = useState(null);

    useEffect(() => {
        getNewsMoviesApi().then((response) => {
            setNewMovies(response.results)
        })
    },[]);

    useEffect( () => {
        getAllGenresApi().then( (response) => {
            setGenreList(response.genres);
        })
    },[])

    useEffect( () => {
        getGenreMoviesApi(genreSelected).then((response) => {
            setGenreMovies(response.results)
        })
    },[genreSelected])

    const onChangeGenre = (newGenreId) => {
        setGenreSelected(newGenreId);
    }
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            {newMovies && (
                <View style={styles.news}>
                    <Title style={styles.newsTitle}> News Movies</Title>
                    <CarouselVertical  
                        data={newMovies}
                        navigation= {navigation}
                    />
                </View>
            )}

            <View style={styles.genres}>
                <Title style={styles.genresTitle}>
                    Movies by genre
                </Title>
                <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false} 
                    style={styles.genreList}>
                    {map(genreList, (genre) => (
                        <Text 
                            key={genre.id} 
                            style={[styles.genre, 
                                { color: genre.id !== genreSelected ? '#8697A5' : '#ffff'}]}
                            onPress={ () => onChangeGenre(genre.id)}
                        >
                            {genre.name}
                        </Text>
                    ))}
                </ScrollView>
                {genreMovies && (
                    <CarouseMulti 
                        data={genreMovies}
                        navigation={navigation}
                    />
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    news: {
        marginVertical: 10
    },
    newsTitle:{
        marginBottom: 15,
        marginHorizontal: 20,
        fontWeight: 'bold',
        fontSize: 22,
    },
    genres:{
        marginTop: 20,
        marginBottom: 50,
    },
    genresTitle: {
        marginHorizontal: 20,
        fontWeight: 'bold',
        fontSize: 22,
    },
    genreList:{
        marginTop: 5,
        marginBottom: 15,
        paddingHorizontal: 20,
        padding: 10,
    },
    genre:{
        marginRight: 20,
        fontSize: 16,
    }
})