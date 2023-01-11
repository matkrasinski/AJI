import { createStore } from 'vuex'

const store = createStore({
    state() {
        return {
            products: [],
            fullPrice: 0
        }
    }, 
    mutations: {
        addProduct(state, product) {
            state.products.push(product);
        },
        removeProduct(state, product) {
            state.products = state.products.filter(function(p) {
                return p.id != product.id
             })
        },
        sumUp(state) {
            var sum = 0;
            for (var i in this.state.products) {
                sum += this.state.products[i].price;
            }
            state.fullPrice = sum;
        },
        lowerFullPrice(state, price) {
            state.fullPrice -= price;
        },
        clearProducts(state) {
            state.products = []
        },
        removeOnlyOne(state, product) {
            state.products.splice(state.products.indexOf(product), 1)
        }

    }
})
export default store;