<template>
  <div>
    Board
    <div>bid : {{bid}}</div>
  </div>
</template>

<script>
// $route를 통해 route 정보를 받아볼 수 있음
export default {
  data() {
    return {
      bid: 0
    }
  },
  created() {
    this.bid = this.$route.params.bid
  }
}
</script>

<style scoped>

</style>
