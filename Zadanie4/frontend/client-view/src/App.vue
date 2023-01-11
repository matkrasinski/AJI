<template>
  <div id="App">
    <main-header />
    <router-view />
    <main-footer />
  </div>
</template>

<script>
import MainHeader from './layout/MainHeader.vue'
import MainFooter from './layout/MainFooter.vue'

export default {
  name: 'App',
  components: {
    MainHeader,
    MainFooter
  }
}
</script>
