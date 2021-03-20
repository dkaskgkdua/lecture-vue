<template>
  <div>
    Board
    <div v-if="loading">loading board...</div>
    <div v-else>
      <div>bid : {{bid}}</div>
      <router-link :to="`/b/${bid}/c/1`">Card 1</router-link>
      <router-link :to="`/b/${bid}/c/2`">Card 2</router-link>
    </div>

    <hr/>
    <!-- 중첩 라우팅을 구현하기 위해(Card)-->
    <router-view></router-view>
  </div>
</template>

<script>
// $route를 통해 route 정보를 받아볼 수 있음
export default {
  data() {
    return {
      bid: 0,
      loading: false
    }
  },
  created() {
    this.fetchData()

  },
  methods: {
    fetchData() {
      this.loading = true
      setTimeout(() => {
        this.bid = this.$route.params.bid
        this.loading = false
      }, 500)

    }
  }
}
</script>

<style scoped>

</style>
