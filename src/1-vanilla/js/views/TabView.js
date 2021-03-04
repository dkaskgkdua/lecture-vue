import View from './View.js'

const tag = '[TabView]'

const TabView = Object.create(View)

TabView.tabName = {
    recommand : '추천 검색어',
    recent : '최근 검색어'
}

TabView.setup = function(el) {
    this.init(el)
    this.bindEvents()
    return this
}

TabView.bindEvents = function() {
    Array.from(this.el.querySelectorAll('li')).forEach(li => {
        li.addEventListener('click', () => this.ClickTab(li.innerHTML))
    })
}

TabView.ClickTab = function(tabName) {
    this.setActiveTab(tabName)
    this.emit('@Change', {tabName})
}

TabView.setActiveTab = function(tabName) {
    Array.from(this.el.querySelectorAll('li')).forEach(li => {
        li.className = li.innerHTML === tabName ? 'active' : ''
    })
    this.show()
}

export default TabView