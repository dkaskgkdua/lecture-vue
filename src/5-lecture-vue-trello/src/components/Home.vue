<template>
  <div>
    <div class="home-title">Personal Boards</div>
    <div class="board-list" ref="boardList">
      <div class="board-item" v-for="b in boards" :key="b.id"
           :data-bgcolor="b.bgColor" ref="boardItem">
        <router-link :to="`/b/${b.id}`">
          <div class="board-item-title">{{b.title}}</div>
        </router-link>
      </div>
      <div class="board-item board-item-new">
        <a class="new-board-btn" href="" @click.prevent="SET_IS_ADD_BOARD(true)">
          Create new board...
        </a>
      </div>
    </div>
    <AddBoard v-if="isAddBoard" @close="isAddBoard=false" @submit="onAddBoard"></AddBoard>
  </div>
</template>

<script>
import {board} from '../api'
import AddBoard from './AddBoard.vue'
import {mapState, mapMutations} from 'vuex'

export default {
  components: {
    AddBoard
  },
  data() {
    return {
      loading: false,
      boards: [],
      error: ''
    }
  },
  computed: {
    ...mapState([
      'isAddBoard'
    ]),
    // foo() {
    //
    // }
  },
  created() {
    this.fetchData()
  },
  /**
   * --------  updated  ----------
   * 가상 DOM을 렌더링 하고 실제 DOM이 변경된 이후 호출됨.
   * 만약 변경된 값들을 DOM을 이용해 접근하고 싶다면, updated 훅이 적절
   * 여기서 data를 변경하는 것은 무한 루프를 일으킬 수 있음(주의)
   */
  updated() {
    // 컴포넌트의 reference 중에 boardItem을 찾아옴
    this.$refs.boardItem.forEach(el => {
      el.style.backgroundColor = el.dataset.bgcolor
    })
  },
  methods: {
    ...mapMutations([
      'SET_IS_ADD_BOARD'
    ]),
    fetchData() {
      this.loading = true
      board.fetch()
        .then(data => {
          this.boards = data.list
        })
        .finally(()=> {
          this.loading = false
        })
    },
    // 방법 1 - commit을 이용해서 상태 변경
    // addBoard() {
    //   // this.isAddBoard = true
    //   this.$store.commit('SET_IS_ADD_BOARD', true)
    // },
    onAddBoard(title) {
      board.create({title})
        .then(() => this.fetchData())
    }
  }
}
</script>

<style scoped>
.home-title {
  padding: 10px;
  font-size: 18px;
  font-weight: bold;
}
.board-list {
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
}
.board-item {
  width: 23%;
  height: 100px;
  margin: 0 2% 20px 0;
  border-radius: 3px;
}
.board-item-new {
  background-color: #ddd;
}
.board-item a {
  text-decoration: none;
  display: block;
  width: 100%;
  height: 100%;
}
.board-item a:hover,
.board-item a:focus {
  background-color: rgba(0,0,0, .1);
  color: #666;
}
.board-item-title {
  color: #fff;
  font-size: 18px;
  font-weight: 700;
  padding: 10px;
}
.board-item a.new-board-btn {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  height: 100px;
  width: inherit;
  color: #888;
  font-weight: 700;
}
</style>
