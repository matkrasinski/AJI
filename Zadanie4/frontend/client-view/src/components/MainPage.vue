<template>
  <div class="container">
    <header>
      <h1>Products</h1>
    </header>
    <FilteringEngine :categories="categories" :products="products" @filtered-data="onUserSearchData" />
    <ProductTable :categories="categories" :productsToDisplay="productsToDisplay" />
  </div>
</template>

<script>
import axios from 'axios'
import ProductTable from './ProductTable.vue'
import FilteringEngine from './FilteringEngine.vue';


export default {
name: 'MainPage.vue',
  components: {
    ProductTable,
    FilteringEngine
  },
  data() {
    return {
      products: [],
      productsToDisplay: [],
      categories: []
    }
  },
  mounted() {
        axios.get(`${this.API_URL}/products`).then(res => {
            this.products = res.data;
            this.productsToDisplay = res.data;
        });
        axios.get(`${this.API_URL}/categories`).then(res => {
            this.categories = res.data;
        })
    },
  methods: {
    onUserSearchData(filteredProducts) {
      if (filteredProducts.length === this.products.length) {
        this.productsToDisplay = this.products; 
      } else {
        this.productsToDisplay = filteredProducts;
      }
    }
  }
}

</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Montserrat:400,800');
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
  label, h1 {
    font-weight: bold;
    text-align: center;
  }
  
</style>