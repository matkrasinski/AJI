<template>
    <div class="container">
        <table class="table align-middle">
        <tr>
            <th>Product name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Weight</th>
            <th>Category</th>
        </tr>
        <tr v-for="product in productsToDisplay" :key="product">
            <td> {{ product.product_name }}</td>
            <td> {{ product.description }}</td>
            <td> {{ product.price }}</td>
            <td> {{ product.weight }} </td>
            <td> {{ getCategoryName(product.category_id) }}</td>
            <button type="button" class="btn btn-secondary col-8" @click="selectProductToEdit(product), this.newProduct = product" data-toggle="modal" data-target="#updateModal" >Edit</button>
        </tr>
        
        </table>
        <div id="addProductDiv">
            <button type="button" class="btn btn-primary col-8" data-toggle="modal" data-target="#addProductModal">Add product</button>

        </div>

        <UpdateProductModal :product="newProduct" :categories="categories"/>
        <AddProductModal :categories="categories"/>
        
     </div>
</template>

<script>
import UpdateProductModal from './UpdateProductModal.vue';
import AddProductModal from './AddProductModal.vue';

export default {
    name: 'ProductTable.vue',
    components: {
        UpdateProductModal,
        AddProductModal
    },
    props: ['productsToDisplay', 'categories'],
    data() {
        return {
            newProduct: null
        }
    },
    methods: {
        getCategoryName(category_id) {
            for (let i in this.$props.categories) {
                if (this.$props.categories[i].id == category_id) {
                    return this.$props.categories[i].category_name
                }
            }
        },
        selectProductToEdit(product) {
            this.newProduct = product
        }
    }
}
</script>   

<style scoped>
    #displayMoreButton {
        float: right;
        margin-left: -50%;   
    }

    tr:nth-child(even) {background: rgb(241, 241, 241)}
    tr:nth-child(odd) {background: #FFF}

    .alert{ 
        margin-top: 15;
    }
    
    p {
        height: 5px;
        text-align: center;
    }
    .btn {
        background-color: rgb(108, 117, 108);
    }
    .btn:hover {
        background-color: rgb(167, 170, 167);
    }
    #addProductDiv {
        justify-content: center;
        text-align: center;
        align-items: center;
    }
    #addProductDiv button {
        background-color: rgb(129, 182, 129);
    }
    #addProductDiv button:hover {
        background-color: rgb(118, 143, 118);
    }

</style>