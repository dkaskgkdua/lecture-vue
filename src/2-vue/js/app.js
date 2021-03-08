new Vue({
    el: '#app',
    data : {
        msg: 'hello world',
        query: ''
    },
    methods : {
        onSubmit(e) {

        },
        onReset() {
            this.query = ''
            // todo 검색결과를 숨기기
            debugger
        },
        onKeyup() {
            if(!this.query.length) this.onReset()
        }
    }
})