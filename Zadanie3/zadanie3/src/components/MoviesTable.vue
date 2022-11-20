<template>
    <ul>
        <li v-for="movie in moviesToDisplay.slice(0, this.step) " 
        :key="movie.ttle" >
            <p>{{movie.title}} {{movie.year}}, {{movie.genres}}, {{movie.cast}}</p>
        </li>
    </ul>
    <div>
        <button type="button" id="displayLessButton" @click="displayLess()" 
                class="btn btn-outline-dark">Display less</button>
        <button type="button" id="displayMoreButton" @click="displayMore()" 
                class="btn btn-outline-dark">Display more</button>
    </div>
</template>

<script>
export default {
    name: 'MoviesTable.vue',
    props: ['moviesToDisplay'],
    data() {
        return {
            step : 10
        }
    },
    methods: {
        displayMore() {
            if (this.step < this.$props.moviesToDisplay.length - 10)
                this.step += 10;
        },
        displayLess() {
            if (this.step > 10)
            this.step -= 10
        },
        setDataToDisplay(filteredMovies) {
            if (this.filteredMovieList.length === this.movieList.length) {
                this.filteredMovieList = this.movieList;
            } else {
                this.filteredMovieList = filteredMovies;
            }
        }
    },
}
</script>

<style>
    #displayMoreButton {
        float: right;
        margin-left: -50%;
    }
</style>