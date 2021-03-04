import FormView from '../views/FormView.js'
import ResultView from '../views/ResultView.js'
import TabView from '../views/TabView.js'
import SearchModel from '../models/SearchModel.js'


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

        this.selectedTab = '추천 검색어'
        this.renderView()
    },

    renderView() {
        console.log(tag, 'renderView()')
        TabView.setActiveTab(this.selectedTab)
        ResultView.hide()
    },

    search(query) {
        console.log(tag, 'search()', query)
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
        ResultView.hide()
    },

    onSearchResult(data) {
        ResultView.render(data)
    },

    onChangeTab(tabName) {
        debugger

    }
}