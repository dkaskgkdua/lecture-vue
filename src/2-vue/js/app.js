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
        keywords: [],
        history : []
    },
    created() {
        this.selectedTab = this.tabs[0]
        this.fetchKeyword()
        this.fetchHistory()
    },
    methods : {
        onSubmit() {
            this.search()
        },
        onReset() {
            this.resetForm()
        },
        onKeyup() {
            if(!this.query.length) this.onReset()
        },
        search() {
            SearchModel.list().then(data => {
                this.submitted = true
                this.searchResult = data
            })
            HistoryModel.add(this.query)
            this.fetchHistory()
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
        },
        fetchHistory() {
            HistoryModel.list().then(data => {
                this.history = data
            })
        },
        onClickRemoveHistory(keyword) {
            HistoryModel.remove(keyword)
            this.fetchHistory()
        },
        resetForm() {
            this.query = ''
            this.submitted = false
            this.searchResult = []
        }
    }
})