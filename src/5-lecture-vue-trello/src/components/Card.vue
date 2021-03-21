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
  /**
   * ------  watch  ---------
   * watch는 기존 Vue 인스턴스 내에 선언된 값의 변화를 감시하는 역할
   * ex) 아래 코드와 같이 가능 -> 기존 data() 내의 count가 변경되었을 경우
   * watch: {
      count: function (newVal, oldVal) {
        this.text = oldVal + '에서 ' + newVal + '로 변경되었습니다.'
      }
     }
   * computed와 용도가 비슷하다고 볼 수도 있는데
   * computed는 계산된 값을 출력하는 용이라면
   * watch는 어떤 조건이 되었을 때 함수를 실행시키기 위한 트리거로 사용
   */
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
