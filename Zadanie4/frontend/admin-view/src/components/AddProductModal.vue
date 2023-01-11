<template>
     <div class="modal fade" id="addProductModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content" >
            <div class="modal-body">
                <div class="form-group">
                    <label for="newProductName">Product name : </label>
                    <input type="text" class="form-control" v-model.trim="newProductName" id="newProductName"/>

                    <label for="newDescription">Description : </label>
                    <input type="text" class="form-control" v-model.trim="newDescription" id="newDescription"/>

                    <label for="newPrice">Price : </label>
                    <input type="text" class="form-control" v-model.trim="newPrice" id="newPrice"/>

                    <label for="newWeight">Weight : </label>
                    <input type="text" class="form-control" v-model.trim="newWeight" id="newWeight"/>

                    <label for="newCategory">Category : </label>
                    <select class="form-select" v-model.trim="newCategory" id="newCategory" >
                        <option selected></option>
                        <option v-for="c in this.$props.categories" :key="c.category_name">
                            {{ c.category_name }}
                        </option>
                    </select>
                    <div v-if="this.changeStatus === 'REJECTED'" class="alert alert-danger">{{ this.message }}</div>
                    <div v-if="this.changeStatus === 'SUBMITTED'" class="alert alert-success"> {{ this.message }} </div>
            </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" @click="submitNewProduct">Save changes</button>
            </div>
            </div>
        </div>
        </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'AddProductModal.vue',
    props: ['categories'],
    data() {
        return {
            newProductName: '',
            newDescription: '',
            newPrice: null,
            newWeight: null,
            newCategory: '',
            changeStatus: '',
            message: ''
        }
    },
    methods: {
        submitNewProduct() {
            var thisCategory = this.$props.categories.find((cat) => {
                        return cat.category_name == this.newCategory
                    })
            if (typeof thisCategory === 'undefined') {
                thisCategory = 0
            }
            axios.post(`${this.API_URL}/products`, {
                product_name: this.newProductName,
                description: this.newDescription,
                price: parseFloat(this.newPrice),
                weight: parseFloat(this.newWeight),
                category_id: thisCategory.id
            }).then((res) => {
                this.changeStatus = "SUBMITTED"
                this.message = res.data.message;
                setTimeout(() => { this.$router.go() }, 1000);
            }).catch((error) => {
                this.changeStatus = "REJECTED"
                this.message = error.response.data.message
            })
        }
    }
}

</script>

<style scoped>
    .alert {
        text-align: center;
        margin-top: 5px;
    }
</style>