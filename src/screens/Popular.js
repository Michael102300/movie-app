import React, { useState, useEffect} from 'react';
import {StyleSheet, ScrollView, View, Image } from 'react-native';
import { Text, Title , Button } from 'react-native-paper';
import { map } from 'lodash';
import { Rating } from 'react-native-ratings';

import { getPopularMoviesApi } from '../api/movies';
import { BASE_PATH_IMG } from '../utils/constants';
import notImage from '../assets/png/default-imgage.png'
import usePreferences from '../hooks/usePreferences';
import starDark from '../assets/png/starDark.png';
import starLight from '../assets/png/starLight.png';

export default Popular = ( props ) => {
    const { navigation } = props;
    const [ movies, setMovies] = useState(null);
    const [ showButtonMore, setShowButtonMore ] = useState(true);
    const [ page, setPage ] = useState(1);
    const { theme } = usePreferences();

    useEffect(()=> {
        getPopularMoviesApi(page).then((response) => {
            const totalPages = response.total_pages;
            if(page < totalPages){
                if(!movies) {
                    setMovies(response.results);
                }else {
                    setMovies([...movies, ...response.results])
                }
            }else{
                setShowButtonMore(false);
            }
        })
    },[page])
    return (
        <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 15 }}>
            {map(movies, (movie, index) => (
                <Movie 
                    key= {index}
                    movie={movie}
                    theme={theme}
                />
            ))}
            {showButtonMore && (
                <Button
                    mode='contained'
                    contentStyle={styles.loadMoreContainer}
                    style={styles.loadMore}
                    labelStyle={{ color: theme === 'dark' ? '#ffff' : '#000'}}
                    onPress={() => setPage(page+1) }
                >
                    Cargar más ...
                </Button>
            )
            }
        </ScrollView>
    );
};

function Movie( props ) {
    const { movie, theme } = props;
    const { poster_path, title, release_date, vote_count, vote_average } = movie
    return (
        <View style={styles.movie}>
            <View style={styles.left}>
                <Image 
                    style={styles.image}
                    source={
                        poster_path ? { uri : `${BASE_PATH_IMG}/w500${poster_path}`}
                        : notImage
                    }
                />
            </View>
            <View>
                <Title>
                    {title}
                </Title>
                <Text>
                    {release_date}
                </Text>
                <MovieRating
                    voteCount={vote_count}
                    voteAverage={vote_average}
                    theme={theme}
                />

            </View>
        </View>
    )
}

function MovieRating(props){
    const { theme, voteCount, voteAverage } = props;
    const media = voteAverage/2;
    return(
        <View style={styles.viewRating}>
            <Rating 
                type='custom'
                ratingImage={ theme === 'dark' ? starDark : starLight}
                ratingColor= '#ffc205'
                ratingBackgroundColor = { theme === 'dark' ? '#192734' : '#f0f0f0'}
                startingValue={media}
                imageSize={20}
                style={{ marginRight: 15}}
            />
            <Text style={{ fontSize: 12 ,color: '#8697a5', marginTop: 5}}>
                {voteCount} votos
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    movie:{
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    left:{
        marginRight: 20,
        marginLeft: 10
    },
    image:{
        width: 100,
        height: 150,
        borderRadius: 5
    },
    viewRating:{
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginTop: 10
    },
    loadMoreContainer:{
        paddingTop: 10,
        paddingBottom: 30
    },
    loadMore:{
        backgroundColor: 'transparent'
    }
});