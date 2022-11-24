<template>
    <div class="container">
        <header> Movies by actors </header>
        <ul>
            <li v-for="(actor, index) in actors" :key="index" >
                {{actor}}
                <ol>
                    <li v-for="(movie, index) in getMovieByCast(actor)" :key="index">
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
    name: 'MovieListBycast',
    props: ['movieList'],

    data() {
        return {
            actors: [],
            movies: [],
        };
    },
    methods: {
        selectHundredRandomMovies() {
        // Picking 100 valid movies from movieList
            const selectedMovies = _.shuffle(_.filter(this.movieList, (movie) => {
                return movie.cast.length;
            })).slice(0, 100);
            let uniqActors = [];
        // Appending to uniqActors, actor from selectedMovies 
            _.forEach(selectedMovies, (movie) => {
                _.forEach(movie.cast, (actor) => {
                    uniqActors.push(actor); 
                });
            });
        // Picking only 100 unique actors
            uniqActors = _.shuffle(_.uniq(uniqActors)).slice(0, 100);
            this.actors = _.sortBy(uniqActors);
            this.movies = selectedMovies;
        },
        getMovieByCast(actor) {
            const moviesByActor = _.sortBy(_.filter(this.movies, (movie) => {
                return _.contains(movie.cast, actor);
            }), 'title');
            return moviesByActor;
            }
        },
        mounted() {
            this.selectHundredRandomMovies();
        },
}
</script>

<style> 
    header {
        text-align: center;
        font-weight: bold;
        font-size: larger;
    }
</style>