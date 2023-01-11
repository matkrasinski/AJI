<template>
    <section>
        <div class="header">
            <div class="inner_header">
            <div class="logo_container">
                <button>
                  <h1 @click="goToMainPage()">PRODUCT<span>shop</span></h1>
                </button>
            </div>
            <ul class="nav">
                <button data-toggle="modal" data-target="#emptyCartModal">
                <a>
                  <li @click="goToCart()">
                    Cart {{ $store.state.products.length }}
                  </li>
                </a>
                </button>

                <div v-if="this.$store.state.products.length === 0" class="modal fade" id="emptyCartModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog" role="document">
                      <div class="modal-content" >
                      <div class="modal-body">
                          <div class="alert alert-danger">Your cart is empty</div>
                      </div>
                      <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                      </div>
                      </div>
                  </div>
              </div>
            </ul>
            </div>
        </div>
    </section>
</template>

<script>
export default {
  methods: {
    goToCart() {
      if (this.$store.state.products.length != 0) {
        this.$router.push({ path: '/cart'})
      }
      
    },
    goToMainPage() {
        this.$router.push({ path: '/main'})
    }
  }
}
</script>

<style scoped>
    .header {
    width: 100%;
    height: 80px;
    display: block;
    background-color: black;
  }

  .inner_header {
    width: 65%;
    height: 100%;
    display: block;
    margin: 0 auto;
  }

  .logo_container {
    height: 100%;
    display: table;
    float: left;
  }

  .logo_container h1, .logo_container span {
    color: white;
  }

  .logo_container h1 {
    height: 100%;
    display: table-cell;
    vertical-align: middle;
    font-family: 'Montserrat';
    font-size: 32px;
    font-weight: 100;
  }

  .logo_container h1 span {
    font-weight: 800;
  }
  
  .nav {
    float: right;
    height: 100%;
  }
  .nav a {
    height: 100%;
    display: table;
    float: left;
    padding: 0px 20px;
  }
  .nav a:last-child {
    padding-right: 0;
  }

  .nav a li {
    display: table-cell;
    vertical-align: middle;
    height: 100%;
    color: white;
    font-family: 'Montserrat';
  }
  button {
    height: 100%;
    vertical-align: middle;
    background-color: black;
    border: none;
  }
  .alert {
    text-align: center;
  }
</style>