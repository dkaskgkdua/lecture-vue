import FormView from '../views/FormView.js'
import ResultView from '../views/ResultView.js'
import KeywordView from '../views/KeywordView.js'
import HistoryView from '../views/HistoryView.js'
import TabView from '../views/TabView.js'
import SearchModel from '../models/SearchModel.js'
import KeywordModel from '../models/KeywordModel.js'
import HistoryModel from '../models/HistoryModel.js'


const tag = '[MainController]'

export default {
    init() {
        console.log(tag, 'init()')
        // 체인닝을 사용했는데 FormView에서 setup시 return this를 해줘야함.
        FormView.setup(document.querySelector('form'))
            .on('@submit', e => this.onSubmit(e.detail.input))
            .on('@reset', e => this.onResetForm(e.detail.input))
        TabView.setup(document.querySelector('#tabs'))
            .on('@Change', e => this.onChangeTab(e.detail.tabName))
        ResultView.setup(document.querySelector('#search-result'))
        KeywordView.setup(document.querySelector('#search-keyword'))
            .on('@Click', e => this.onClickKeyword(e.detail.keyword))

        HistoryView.setup(document.querySelector('#search-history'))
            .on('@Click', e => this.onClickHistory(e.detail.keyword))

        this.selectedTab = TabView.tabName.recommand
        this.renderView()
    },

    renderView() {
        console.log(tag, 'renderView()')
        TabView.setActiveTab(this.selectedTab)

        if(this.selectedTab === TabView.tabName.recommand) {
            this.fetchSearchKeyword()
            HistoryView.hide()
        } else {
            this.fetchHistoryKeyword()
            KeywordView.hide()
        }
        ResultView.hide()
    },

    fetchSearchKeyword() {
        KeywordModel.list().then(data => {
            KeywordView.render(data)
        })
    },
    fetchHistoryKeyword() {
        HistoryModel.list().then(data => {
            HistoryView.render(data)
        })
    },

    search(query) {
        console.log(tag, 'search()', query)
        FormView.setValue(query)
        // search api
        SearchModel.list(query).then(data => {
            this.onSearchResult(data)
        })


    },

    onSubmit(input) {
        console.log(tag, 'onSubmit()', input)
        this.search(input)
    },

    onResetForm(input) {
        input.value = ''
        this.renderView()
    },

    onSearchResult(data) {
        ResultView.render(data)
        KeywordView.hide()
        TabView.hide()
    },

    onChangeTab(tabName) {
        this.selectedTab = tabName
        this.renderView()
    },
    onClickKeyword(keyword) {

        this.search(keyword)
    },
    onClickHistory(keyword) {
        this.search(keyword)
    }
}
