<template>
  <div id="app">
    {{msg}}
    <Navbar/>
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'

export default {
  name: 'app',
  components: { Navbar },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

