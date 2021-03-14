import SearchModel from './models/SearchModel.js'
import KeywordModel from './models/KeywordModel.js'
import HistoryModel from './models/HistoryModel.js'
import FormComponent from './components/FormComponent.js';
import ResultComponent from './components/ResultComponent.js';
import ListComponent from './components/ListComponent.js';

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
    components: {
        'search-form': FormComponent,
        'search-result' : ResultComponent,
        'list' : ListComponent
    },
    created() {
        this.selectedTab = this.tabs[0]
        this.fetchKeyword()
        this.fetchHistory()
    },
    methods : {
        onSubmit(query) {
            this.query = query
            this.search()
        },
        onReset() {
            this.resetForm()
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