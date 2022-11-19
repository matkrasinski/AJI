<template>
    <div v-for="movie in movieList" :key="movie.ttle">
        <p>{{movie.title}}, {{movie.year}}, {{movie.genres}}, {{movie.cast}}</p>
    </div>
</template>

<script>
import jsonData from '..//../data/movies.json'
export default {
    name: 'MoviesTable.vue',
    data() {
        return {
            movieList: jsonData
        }
    }
}
</script>