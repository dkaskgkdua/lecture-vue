<template>
  <div>
    Card
    <div v-if="loading">loading card...</div>
    <div v-else>cid: {{ cid }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cid: 0,
      loading: false
    }
  },
  watch: {
    // 방법 1
    // '$route'() {
    //   this.fetchData()
    // }
    // 방법 2
    '$route': {
      handler: 'fetchData',
      immediate: true // 즉시 실행 옵션(created랑 중복)
    }
  },
  // created() {
  //   this.fetchData()
  // },
  methods: {
    fetchData() {
      this.loading = true
      setTimeout(() => {
        this.cid = this.$route.params.cid
        this.loading = false
      }, 500)
    }
  }
}
</script>

<style scoped>

</style>
