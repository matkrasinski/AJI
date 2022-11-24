<template>
    <div v-if="moviesToDisplay.length > 0" class="container">
        <table  class="table align-middle bg-white">
            <tr>
                <th>Title</th>
                <th>Production Year</th>
                <th>Cast</th>
                <th>Genres</th>
            </tr>
            <tr v-for="movie in moviesToDisplay.slice(0, this.step)" :key="movie" >
                <td> {{ movie.title }} </td>
                <td> {{ movie.year }} </td>
                <td> {{ displayArrayAsString(movie.cast) }} </td>
                <td> {{ displayArrayAsString(movie.genres) }} </td>
            </tr>
        </table>
        <input type="button" id="displayLessButton" @click="displayLess()" 
                class="btn btn-outline-dark" value="Display less">
        <input type="button" id="displayMoreButton" @click="displayMore()" 
                class="btn btn-outline-dark" value="Display more">

        <p>{{moviesToDisplay.length > step ? step : moviesToDisplay.length}} to {{moviesToDisplay.length}}</p>
    </div>
    <div v-else class="container">  
        <div class="alert alert-info"> <p> No results </p> </div>
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
            if (this.step < this.$props.moviesToDisplay.length)
                this.step += 10;
        },
        displayLess() {
            if (this.step > 10)
            this.step -= 10
        },
        displayArrayAsString(list) {
            var res = ''
            for (var li in list) {
                res += li != list.length - 1 ? list[li] + ', ' : list[li]
            }
            return res;
        }
    }
}
</script>

<style>
    #displayMoreButton {
        float: right;
        margin-left: -50%;   
    }

    tr:nth-child(even) {background: rgb(241, 241, 241)}
    tr:nth-child(odd) {background: #FFF}

    .alert{ 
        margin-top: 15%;
    }
    
    p {
        height: 5px;
        text-align: center;
    }
</style>