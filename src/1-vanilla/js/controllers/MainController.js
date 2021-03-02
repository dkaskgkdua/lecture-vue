import FormView from '../views/FormView.js'

const tag = '[MainController]'

export default {
    init() {
        console.log(tag, 'init()')
        // 체인닝을 사용했는데 FormView에서 setup시 return this를 해줘야함.
        FormView.setup(document.querySelector('form'))
            .on('@submit', e => this.onSubmit(e.detail.input))
    },

    onSubmit(input) {
        console.log(tag, 'onSubmit()', input)
    }
}