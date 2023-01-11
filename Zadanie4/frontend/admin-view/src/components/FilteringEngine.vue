<template>
    <div>
        <div>
            <div class="form-group">
                <label for="productName">Product name : </label>
                <input type="text" class="form-control" 
                v-model.trim="textField" id="textField" placeholder="Product name">
            </div>
            <div class="form-group">
                <label for="category">Category : </label>
                <select class="form-select" v-model.trim="category" id="category" >
                    <option selected></option>
                    <option v-for="c in categories" :key="c.category_name">
                        {{ c.category_name }}
                    </option>
                </select>
                <input class="btn btn-primary col-12" type="button" id="searchBtn" value="Search" @click="this.$emit('filtered-data', findProduct())"  />
            </div>
        </div>
    </div>
</template>

<script>
var _ = require('underscore');
export default {
    name: 'FilteringEngine.vue',
    props: ['categories', 'products'],
    emits: ['filtered-data'],
    data() {
        return {
            textField: '',
            category: ''
        }
    },
    methods: {
        findProduct() {
            var foundProducts = _.filter(this.$props.products, (product) => {
                const productName = product.product_name.toLowerCase().includes(this.textField.toLowerCase());
                const description = product.description.toLowerCase().includes(this.textField.toLowerCase());
                const categorized = _.find(this.$props.categories, (category) => {
                        return product.category_id == category.id})

                return (productName || description) &&
                 (categorized.category_name == this.category || this.category == '');
            })           
            return foundProducts;
        }
    }
}
</script>

<style>
    input, #searchBtn {
        margin-bottom: 0.5%;
    }
    label {
        margin-right: 1%;
        margin-bottom: 0.5%;
    }
    #searchBtn {
        background-color: black;
        margin-top: 1%;
    }
    
    #searchBtn:hover {
        background-color: grey !important;
    }

</style>