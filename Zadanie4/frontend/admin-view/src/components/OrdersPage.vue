<template>
    <div class="container">
        <div class="form-group">    
            <label for="currStatus">Statuses : </label>
            <select class="form-select" v-model="currStatus" id="currStatus" >
                <option selected></option>
                <option v-for="status in statuses" :key="status">
                    {{ status.status_name }}
                </option>
            </select>
            <input class="btn btn-primary col-12" type="button" id="searchBtn" value="Search" @click="filterByStatus()"  />
        </div>

        <table class="table align-middle">
        <tr>
            <th>Order date</th>
            <th>Status</th>
            <th>User name</th>
            <th>Email</th>
            <th>Phone number</th>
            <th>Ordered products</th>
        </tr>
        <tr v-for="order in ordersToDisplay" :key="order">
            <td> {{ this.getReadableDate(order.order_date) }} </td>
            <td>
                <button @click="currOrder = order.id" data-toggle="modal" data-target="#updateStatusModal">
                 {{ this.getStatusById(order.status_id) }} 
                </button>
            </td>
            <td> {{ order.user_name }} </td>
            <td> {{ order.email }} </td>
            <td> {{ order.phone_number }} </td>
            <td> 
                <table v-for="p in getReadableProducts(order.order_products)" :key="p">
                     {{ p.product_name }} : {{ p.quantity }}
                </table>
             
            </td>
        </tr>
        </table>
        <UpdateStatusModal :order_id="currOrder" :statuses="statuses"/>

    </div>
</template>

<script>
import axios from 'axios'
import UpdateStatusModal from './UpdateStatusModal.vue'

export default {
    name: 'OrdersPage.vue',
    components: {
        UpdateStatusModal
    },
    data() {
        return {
            orders: [],
            ordersToDisplay: [],
            categories: [],
            products: [],
            statuses: [],
            currStatus: null,
            currOrder: null
        }
    },
    methods: {
        filterByStatus() {
            if (this.currStatus) {
                axios.get(`${this.API_URL}/orders/${this.getStatusByName(this.currStatus)}`)
                .then((res) => {
                    this.ordersToDisplay = res.data
                })
            } else {
                this.ordersToDisplay = this.orders;
            }
        },
        getStatusById(status_id) {
            const foundStatus = this.statuses.find(status => {
                return status.id == status_id
            })
            if (foundStatus) {
                return foundStatus.status_name
            }
        }, 
        getStatusByName(status_name) {
            const foundStatus = this.statuses.find(status => {
                return status.status_name == status_name
            })
            if (foundStatus) {
                return foundStatus.id
            }
        }, 
        getReadableProducts(order_products) {
            let readableProducts = []
                for (var product of order_products) {
                let found = this.products.find((p) => {
                    return p.id == product.product_id
                })
                if (found) 
                    readableProducts.push({product_name: found.product_name, quantity: product.quantity})
            }
            return readableProducts;
        },
        getReadableDate(date) {
            date = new Date(date);
            var currentDayOfMonth = date.getDate();
            var currentMonth = date.getMonth() + 1;
            if (currentMonth < 10) {
                currentMonth = "0" + currentMonth;
            } 
            if (currentDayOfMonth < 10) {
                currentDayOfMonth = "0" + currentDayOfMonth;
            }
            return currentDayOfMonth + '/' + currentMonth + '/' +  date.getFullYear();
        }
    },
    mounted() {
        axios.get(`${this.API_URL}/orders`).then((res) => {
            this.orders = res.data;
            this.ordersToDisplay = res.data
        })
        axios.get(`${this.API_URL}/products`).then(res => {
            this.products = res.data;
        });
        axios.get(`${this.API_URL}/categories`).then(res => {
            this.categories = res.data;
        });
        axios.get(`${this.API_URL}/status`).then(res => {
            this.statuses = res.data;
        });
    }
}
</script>

<style scoped>
    tr:nth-child(even) {background: rgb(241, 241, 241)}
    tr:nth-child(odd) {background: #FFF}
    button {
        padding: 0;
        border: none;
        background: none;   
        font-weight: 800;
    }
    tr button{
        align-content: center;
        display: inline-flex;
        vertical-align: center;
    }
</style>