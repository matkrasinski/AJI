<template>
    <div class="container">
        <header> Movies by genres </header>
        <ol>
            <li v-for="(genre, index) in genres" :key="index" >
                {{genre}}
                <ol>
                    <li v-for="(movie, index) in getMovieByGenre(genre)" :key="index">
                        {{movie.title}}
                    </li>
                </ol>
            </li>
        </ol>
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
        // Appending to uniqGenres, genre from selectedMovies 
            _.forEach(selectedMovies, (movie) => {
                _.forEach(movie.genres, (genre) => {
                    uniqGenres.push(genre); 
                });
            });
        // Picking only 100 unique genres
            uniqGenres = _.shuffle(_.uniq(uniqGenres)).slice(0, 100);
            this.genres = _.sortBy(uniqGenres); 
            this.movies = _.sortBy(selectedMovies);
            
        },
        getMovieByGenre(genre) {
            var moviesByGenres = _.sortBy(_.filter(_.sortBy(this.movies), (movie) => {
                return _.contains(movie.genres, genre);
            }), 'title');
            return moviesByGenres;
            }
        },
        mounted() {
            _.sortBy(this.selectHundredRandomMovies());
        },
}


</script>