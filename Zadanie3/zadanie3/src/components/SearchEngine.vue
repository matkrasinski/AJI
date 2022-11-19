<template>
    <header>
        <h1> Movies </h1>
    </header>
    <div>
        <div class="form-group">
            <label for="movieTitle">Title : </label>
            <input type="text" class="form-control" id="movieTitle" placeholder="Movie title"/>
        </div>
        <div class="form-group">
            <label for="fromDate">From the year of production : </label>
            <input type="text" class="form-control" id="fromDate" placeholder="Year from"/>
        </div>
        <div class="form-group">
            <label for="tillDate">Until the year of production : </label>
            <input type="text" class="form-control" id="tillDate" placeholder="Year till"/>
        </div>
        <div class="form-group">
            <label for="actorName">Cast : </label>
            <input type="text" class="form-control" id="actorName" placeholder="Actor">
        </div>
        <div>
            <button class="btn btn-primary col-12" >Search</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'SearchEngine.vue'
    }
</script>

<style>
    label {
        font-weight: bold;
    }
 
</style>