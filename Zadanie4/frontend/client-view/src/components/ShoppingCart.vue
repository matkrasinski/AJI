<template>
    <div class="container">
        <table class="table align-middle">
            <tr>
                <th>Product name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Amount</th>
                <th></th>
            </tr>
            <tr v-for="product in groupedProducts" :key="product">
                <td> {{ product.product_name }}</td>
                <td> {{ product.description }}</td>
                <td> {{ product.price }}</td>
                <td> {{ findProductOccurence(product.id) }}
                    <a id="occurenceBtn" class="btn btn-info" @click="lowerAmount(product)" >-</a>
                    <a id="occurenceBtn" class="btn btn-info" @click="raiseAmount(product)">+</a>
                </td> 
                <input class="btn btn-danger col-8" type="button" value="Delete" @click="removeProducts(product)"/>
            </tr>
        </table>
        <div id="priceDiv">
            <span>Full Price : </span> {{ Math.round($store.state.fullPrice * 100) / 100 }}
        </div>
        
        <div>
            <div class="form-group">
                <label for="username">User name : </label>
                <input type="text" class="form-control" 
                v-model.trim="username" id="username" placeholder="User name">
            </div>
            <div class="form-group">
                <label for="email">Email : </label>
                <input type="text" class="form-control" 
                v-model.trim="email" id="email" placeholder="Email">
            </div>
            <div class="form-group">
                <label for="phoneNumber">Phone number : </label>
                <input type="text" class="form-control" 
                v-model.trim="phoneNumber" id="phoneNumber" placeholder="Phone number">
            </div>
            <button id="submitBtn" class="btn btn-primary col-12" @click="submitted = validateUserData()">Submit order</button>
            <div v-if="submitted === 'SUBMITTED'" class="alert alert-success" role="alert"> <a> Your order has been submitted </a> </div> 
            <div v-else-if="submitted === 'EMPTY'" class="alert alert-danger" role="alert"> <a> Your cart is empty </a>
                <br>
                <a> Go back to main page and choose products </a></div> 
            <div v-else-if="submitted === 'REJECTED'" class="alert alert-danger" role="alert"> <a> Your data is incorrect </a></div>        
            
        </div>
    </div>  
</template>

<script>
// import MyModal from './MyModal.vue'
import axios from "axios";

export default {
  name: "ShoppingCart.vue",
  props: ["product"],
  components: {
    // MyModal
  },
  data() {
    return {
        groupedProducts: [],
        productOccurences: {},
        username: "",
        email: "",
        phoneNumber: "",
        submitted: ""
    };
  },
  methods: {
    findProductOccurence(product_id) {
        return this.productOccurences[product_id];
    },
    removeProducts(product) {
        this.$store.commit("removeProduct", product);
        this.groupedProducts = this.groupedProducts.filter(function (p) {
            return p.id != product.id;
        });
        this.$store.commit("sumUp");
    },
    lowerAmount(product) {
        this.productOccurences[product.id] -= 1;

        this.$store.commit('removeOnlyOne', product)

        if (this.productOccurences[product.id] === 0) {
            this.groupedProducts = this.groupedProducts.filter(function (p) {
            return p.id != product.id;
        });
      }
        this.$store.commit("lowerFullPrice", product.price);
    },
    raiseAmount(product) {
        this.productOccurences[product.id] += 1;
        this.$store.commit("lowerFullPrice", -product.price);
        this.$store.commit('addProduct', product)
    },
    validateUserData() {
      if (this.groupedProducts.length === 0) {
        return 'EMPTY'
      } else if (
            !this.email.match(/^([a-zA-Z0-9_.]+)@([a-zA-Z0-9])+.([a-z]+)(.[a-z]+)?$/) ||
            !/^[0-9]+$/.test(this.phoneNumber) || this.phoneNumber.length != 9 ||
            this.email.length < 3 || this.username.length < 6
        ) {
        return 'REJECTED';
      } 
      const submitedProducts = this.groupedProducts.map((obj) => ({
        product_id: obj.id,
        quantity: this.productOccurences[obj.id],
      }));
        axios.post(`${this.API_URL}/orders`, {
            user_name: this.username,
            email: this.email,
            phone_number: this.phoneNumber,
            order_products: submitedProducts,
        })
        this.$store.commit("clearProducts");
        return 'SUBMITTED';
    },
  },
  mounted() {
    this.$store.commit("sumUp");
    for (const element of this.$store.state.products) {
        if (this.productOccurences[element.id]) {
            this.productOccurences[element.id] += 1;
        } else {
            this.productOccurences[element.id] = 1;
        }
    }
    this.groupedProducts = [...new Map(this.$store.state.products.map((item) =>
        [item["id"], item])
    ).values()];
  },
  updated() {
    if (this.submitted === 'SUBMITTED') {
        setTimeout(() => { this.$router.push({path: '/main'}) }, 1500);
    }
  }
};
</script>

<style scoped>
.btn {
  background-color: red;
  text-align: center;
}

#priceDiv {
  display: block;
  text-align: center;
}
span {
  font-weight: 800;
  font-family: "Montserrat";
}
.btn-info {
  background-color: rgb(66, 102, 102);
}
#occurenceBtn {
  margin: auto;
  line-height: 1.25rem;
  width: 20px;
  padding: 0px;
  margin-left: 2%;
}
#submitBtn {
  background-color: black;
}
#submitBtn:hover {
  background-color: rgb(204, 92, 120);
}
#submitBtn:active {
  background-color: rgb(212, 163, 200) !important;
}
#submitBtn:active:after {
  background-color: rgb(158, 161, 158);
}
.alert {
    text-align: center;
}
</style>