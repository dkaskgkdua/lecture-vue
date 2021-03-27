<template>
  <modal class="modal-card">
    <div slot="header" class="modal-card-header">
      <div class="modal-card-header-title">
        <input class="form-control" type="text" :value="card.title"
               :readonly="!toggleTitle" @click="toggleTitle=true" @blur="onBlurTitle"
               ref="inputTitle">
      </div>
      <a class="modal-close-btn" href="" @click.prevent="onClose">&times;</a>
    </div>
    <div slot="body">
      <h3>Description</h3>
      <textarea  class="form-control" cols="30" rows="3" placeholder="Add a more detailed description..."
                 :readonly="!toggleDesc" v-model="card.description" ref="inputDesc"
                 @click="toggleDesc=true" @blur="onBlurDesc"></textarea>
    </div>
    <div slot="footer"></div>
  </modal>
</template>

<script>
import Modal from './Modal.vue'
import {mapActions, mapState} from 'vuex'

export default {
  components: {
    Modal
  },
  data() {
    return {
      toggleTitle: false,
      toggleDesc: false
    }
  },
  computed: {
    ...mapState({
      card: 'card',
      board: 'board'
    })
  },
  created() {
    this.fetchCard()
  },
  methods: {
    ...mapActions([
      'FETCH_CARD',
      'UPDATE_CARD'
    ]),
    onClose() {
      this.$router.push(`/b/${this.board.id}`)
    },
    fetchCard() {
      const id = this.$route.params.cid
      this.FETCH_CARD({id})
    },
    onBlurTitle() {
      this.toggleTitle = false
      const title = this.$refs.inputTitle.value.trim()
      if(!title) return
      this.UPDATE_CARD({id: this.card.id, title})
        .then(() => this.fetchCard())
    },
    onBlurDesc() {
      this.toggleDesc = false
      const description = this.$refs.inputDesc.value.trim()
      if(!description) return
      this.UPDATE_CARD({id: this.card.id, description})
        .then(() => this.fetchCard())
    }
  }

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
  // watch: {
  //   // 방법 1
  //   // '$route'() {
  //   //   this.fetchData()
  //   // }
  //   // 방법 2
  //   '$route': {
  //     handler: 'fetchData',
  //     immediate: true // 즉시 실행 옵션(created랑 중복)
  //   }
  // },
}
</script>

<style scoped>
.modal-card .modal-container {
  min-width: 300px;
  max-width: 800px;
  width: 60%;
}
.modal-card-header-title {
  padding-right: 30px;
}
.modal-close-btn {
  position: absolute;
  top: 0px;
  right: 0px;
  font-size: 24px;
  text-decoration: none;
}
.modal-card-header {
  position: relative;
}
</style>
