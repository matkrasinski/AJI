<template>
    <div class="modal fade" id="updateModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content" >
            <div class="modal-body">
                <div class="form-group">
                    <label for="newProductName">New product name : </label>
                    <input type="text" class="form-control" v-model.trim="newProductName" id="newProductName"/>

                    <label for="newDescription">New description : </label>
                    <input type="text" class="form-control" v-model.trim="newDescription" id="newDescription"/>

                    <label for="newPrice">New price : </label>
                    <input type="text" class="form-control" v-model.trim="newPrice" id="newPrice"/>

                    <label for="newWeight">New weight : </label>
                    <input type="text" class="form-control" v-model.trim="newWeight" id="newWeight"/>

                    <label for="newCategory">New category : </label>
                    <select class="form-select" v-model.trim="newCategory" id="newCategory" >
                        <option selected></option>
                        <option v-for="c in this.$props.categories" :key="c.category_name">
                            {{ c.category_name }}
                        </option>
                    </select>
                    <div v-if="this.changeStatus === 'REJECTED'" class="alert alert-danger">{{ this.message }}</div>
                    <div v-if="this.changeStatus === 'SUBMITTED'" class="alert alert-success">{{ this.message }}</div>
            </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" @click="clearChangeStatus" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" @click="submitChanges">Save changes</button>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'UpdateProductModal.vue',
    props: ['product', 'categories'],
    data() {
        return {
            newProductName: '',
            newDescription: '',
            newPrice: null,
            newWeight: null,
            newCategory: null,
            changeStatus: '',
            message: ''
        }
    },
    methods: {
        submitChanges() {
            const requestBody = this.getRequestBody();
            axios.put(`${this.API_URL}/products`, requestBody).then((res) => {
                this.changeStatus = "SUBMITTED"
                this.message = res.data.message;
                setTimeout(() => { this.$router.go() }, 1000);
            }).catch((error) => {
                this.changeStatus = "REJECTED"
                this.message = error.response.data.message
            })
        },
        clearChangeStatus() {
            this.changeStatus = ''
        },
        getRequestBody() {
            var requestBody = {id: this.$props.product.id}
            if (this.newProductName != '') {
                requestBody.product_name = this.newProductName;
            }
            if (this.newDescription != '') {
                requestBody.description = this.newDescription   
            }
            if (parseFloat(this.newPrice) || parseFloat(this.newPrice) == 0) {
                requestBody.price = parseFloat(this.newPrice)
            }
            if (parseFloat(this.newWeight) || parseFloat(this.newWeight) == 0) {
                requestBody.weight = parseFloat(this.newWeight)
            }
            if (this.newCategory) {
                requestBody.category_id = this.categories.find((category) => {
                    return category.category_name === this.newCategory
                }).id;
            }
            return requestBody;
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