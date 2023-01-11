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
            <input class="btn btn-primary col-8" type="button" value="Select" @click="$store.commit('addProduct', product)"/>
        </tr>
    </table>
    </div>
</template>

<script>
export default {
    name: 'ProductTable.vue',
    props: ['productsToDisplay', 'categories'],
    methods: {
        getCategoryName(category_id) {
            for (let i in this.$props.categories) {
                if (this.$props.categories[i].id == category_id) {
                    return this.$props.categories[i].category_name
                }
            }
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
        margin-top: 15;
    }
    
    p {
        height: 5px;
        text-align: center;
    }
    .btn {
        background-color: rgb(104, 192, 104);
    }
    .btn:hover {
        background-color: rgb(179, 223, 179);
    }
    .btn-primary:active {
        background-color: rgb(45, 128, 45) !important;
    }
    

</style>