<template>
    <div>
        <header>
            <h1> Movies </h1>
        </header>
        <div>
            <div class="form-group">
                <label for="movieTitle">Title : </label>
                <input type="text" class="form-control" v-model="title" id="movieTitle" placeholder="Movie title"/>
            </div>
            <div class="form-group">
                <label for="fromDate">Year of production from : </label>
                <input type="text" class="form-control" v-model="fromDate" id="fromDate" placeholder="Year from"/>
            </div>
            <div class="form-group">
                <label for="toDate">Year of production to : </label>
                <input type="text" class="form-control" v-model="toDate" id="toDate" placeholder="Year to"/>
            </div>
            <div class="form-group">
                <label for="actorName">Cast : </label>
                <input type="text" class="form-control" v-model.trim="cast" id="actorName" placeholder="Actor">
            </div>
            <div>
                <button id="btn" class="btn btn-primary col-12" @click="this.$emit('filtered-data', findMovie())">Search</button>
            </div>
        </div>
    </div>
</template>

<script>
var _ = require('underscore');
export default {
    name: 'SearchEngine.vue',
    data() {
        return {
            title: '',
            fromDate: '',
            toDate: '',
            cast: ''
        }
    },
    props: ['movieList'],
    emits: ['filtered-data'],
    methods: {
        findMovie() {
            // Searching for input matched movies
            const searchedMovies = _.filter(this.$props.movieList, (movie) => { 
                const title = movie.title.toLowerCase().includes(this.title.toLowerCase());
                const actor = _.filter(movie.cast, (cast) => {
                    return cast.toLowerCase().includes(this.cast.toLowerCase());
                });
                return title && (parseInt(movie.year) <= parseInt(this.toDate) || !this.toDate) 
                            && (parseInt(movie.year) >= parseInt(this.fromDate) || !this.fromDate) 
                            && (actor.length > 0 || !this.cast);
            });
            return searchedMovies;
        }
    }
}
</script>

<style>
    label, h1 {
        font-weight: bold;
    }
    #btn {
        margin-top: 1%;
    }
 
</style>