import SearchModel from './models/SearchModel.js'
import KeywordModel from './models/KeywordModel.js'
import HistoryModel from './models/HistoryModel.js'

new Vue({
    el: '#app',
    data : {
        msg: 'hello world',
        query: '',
        submitted: false,
        searchResult: [],
        tabs:['추천 검색어', '최근 검색어'],
        selectedTab : '',
        keywords: []
    },
    created() {
        this.selectedTab = this.tabs[0]
        this.fetchKeyword()
    },
    methods : {
        onSubmit() {
            this.search()
        },
        onReset() {
            this.query = ''
            // todo 검색결과를 숨기기
            this.submitted = false
            this.searchResult = []
        },
        onKeyup() {
            if(!this.query.length) this.onReset()
        },
        search() {
            SearchModel.list().then(data => {
                this.submitted = true
                this.searchResult = data
            })
        },
        onClickTab(tabName) {
            this.selectedTab = tabName
        },
        fetchKeyword() {
            KeywordModel.list().then(data => {
                this.keywords = data
            })
        },
        onClickKeyword(keyword) {
            this.query = keyword
            this.search()
        }
    }
})