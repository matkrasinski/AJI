<template>
    <header>
        <h1> Movies </h1>
    </header>
    <div>
        <div class="form-group">
            <label for="movieTitle">Title : </label>
            <input type="text" class="form-control" v-model="title" id="movieTitle" placeholder="Movie title"/>
        </div>
        <div class="form-group">
            <label for="fromDate">From the year of production : </label>
            <input type="text" class="form-control" v-model="fromDate" id="fromDate" placeholder="Year from"/>
        </div>
        <div class="form-group">
            <label for="tillDate">Until the year of production : </label>
            <input type="text" class="form-control" v-model="tillDate" id="tillDate" placeholder="Year till"/>
        </div>
        <div class="form-group">
            <label for="actorName">Cast : </label>
            <input type="text" class="form-control" v-model="cast" id="actorName" placeholder="Actor">
        </div>
        <div>
            <button class="btn btn-primary col-12" @click="this.$emit('filtered-data', this.findMovie())">Search</button>
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
            tillDate: '',
            cast: ''
        }
    },
    props: ['movieList'],
    emits: ['filtered-data'],
    methods: {
        findMovie() {
            
            const searchedMovies = _.filter(this.$props.movieList, (movie) => { 
            
            let dateToVal = false;
            let dateFromVal = false;
            let haveActor = false;
            const title = movie.title.toLowerCase().includes(this.title.toLowerCase());
            const actor = _.filter(movie.cast, (actor) =>{
            // return actor === this.actor;
            return actor.toLowerCase().includes(this.actor);
            });

            if (actor.length > 0) {
            haveActor = true;
            } else if (!this.actor) {
            haveActor = true;
            }
            
            if (parseInt(movie.year) <= parseInt(this.dateTo)) {
            dateToVal = true;
            } else if (!this.dateTo) {
            dateToVal = true;
            }

            if (parseInt(movie.year) >= parseInt(this.dateFrom)) {
            dateFromVal = true;
            } else if (!this.dateFrom) {
            dateFromVal = true;
            }

            return title && dateToVal && dateFromVal && haveActor;
        });
        return searchedMovies;
        }
    }

}
</script>

<style>
    label {
        font-weight: bold;
    }
 
</style>