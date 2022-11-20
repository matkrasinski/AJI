<template>
    <div class="container">
        <header> Movies by genres </header>
        <ul>
            <li v-for="(genre, index) in genres" :key="index" >
                {{genre}}
                <ol>
                    <li v-for="(movie, index) in getMovieByGenre(genre)" :key="index">
                        {{movie.title}}
                    </li>
                </ol>
            </li>

        </ul>
    </div>
</template>

<script>
var _ = require('underscore');
export default {
    name: 'MovieListByGenres',
    props: ['movieList'],

    data() {
        return {
            genres: [],
            movies: [],
        };
    },
    methods: {
        selectHundredRandomMovies() {
        // Picking 100 valid movies from movieList
            const selectedMovies = _.shuffle(_.filter(this.movieList, (movie) => {
                return movie.cast.length;
            })).slice(0, 100);
            let uniqGenres = [];
        // Appending to uniqActors, actor from selectedMovies 
            _.forEach(selectedMovies, (movie) => {
                _.forEach(movie.genres, (genre) => {
                    uniqGenres.push(genre); 
                });
            });
        // Picking only 100 unique actors
            uniqGenres = _.shuffle(_.uniq(uniqGenres)).slice(0, 100);
            this.genres = uniqGenres;
            this.movies = selectedMovies;
        },
        getMovieByGenre(genre) {
            const moviesByGenres = _.filter(this.movies, (movie) => {
                return _.contains(movie.genres, genre);
            });
            return moviesByGenres;
            }
        },
        mounted() {
            this.selectHundredRandomMovies();
        },
}


</script>