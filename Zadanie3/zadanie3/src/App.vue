<template>
  <div class="container">
    <SearchEngine :movieList="movieList" @filtered-data="onUserSearchData"/>
    <MoviesTable :moviesToDisplay="moviesToDisplay" />
    <div class="grid-container">
      <div> <MovieListByGenres :movieList="movieList" /> </div>
      <div> <MovieListByCast :movieList="movieList"/> </div>
    </div>
    <div>
        <footer>
          <p> Authors : Mateusz Krasiński, Michał Andrzejczak</p>
        </footer>
    </div>
  </div>
</template>

<script>
import SearchEngine from './components/SearchEngine.vue';
import MoviesTable from './components/MoviesTable.vue';
import MovieListByGenres from './components/MovieListByGenres.vue';
import MovieListByCast from './components/MovieListByCast.vue';
import jsonData from './../data/movies.json'

export default {
  name: 'App',
  components: {
    SearchEngine,
    MoviesTable,
    MovieListByGenres,
    MovieListByCast
  }, 
  data() {
    return {
      moviesToDisplay: jsonData,
      movieList: jsonData
    }
  },
  methods: {
    onUserSearchData(filteredMovies) {
      if (filteredMovies.length === this.movieList.length) {
        this.moviesToDisplay = this.movieList; 
      } else {
        this.moviesToDisplay = filteredMovies;
      }
    }
  }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400&display=swap');
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  body {
    font-family: 'Poppins', sans-serif;
  }
  .container {
    margin: 30px auto;
    overflow: auto;
    min-height: 300px;
    border: 1px solid steelblue;
    padding: 30px;
    border-radius: 5px;
  }
  .btn {
    display: inline-block;
    background: #000;
    color: #fff;
    border: none;
    padding: 10px 20px;
    margin: 5px;
    border-radius: 5px;
    cursor: pointer;
    text-decoration: none;
    font-size: 15px;
    font-family: inherit;
  }
  .btn:focus {
    outline: none;
  }
  .btn:active {
    transform: scale(0.98);
  }
  .btn-block {
    display: block;
    width: 100%;
  }
  .grid-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
  }
  p {
    font-weight: lighter;
  }


</style>
