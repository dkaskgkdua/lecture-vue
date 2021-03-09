import SearchModel from './models/SearchModel.js'

new Vue({
    el: '#app',
    data : {
        msg: 'hello world',
        query: '',
        submitted: false,
        searchResult: []
    },
    methods : {
        onSubmit(e) {
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
        }
    }
})