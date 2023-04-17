let Vue = null

class HistoryRoute {
    constructor() {
        this.current = null
    }
}

class myVueRouter {
    constructor(options) {
        this.mode = options.mode || 'hash'
        this.routes = options.routes || []
        this.routesMap = this.createMap(this.routes)
        this.history = new HistoryRoute()
        this.init()
    }

    createMap(routes) {
        return routes.reduce((pre, current) => {
            pre[current.path] = current.component
            return pre
        }, {})
    }

    init() {
        if (this.mode === 'hash') {
            // 先判断用户打开时有没有 hash 值，没有的话跳转到 #/
            location.hash ? '' : location.hash = '/'

            window.addEventListener('load', () => {
                this.history.current = location.hash.slice(1)
            })

            window.addEventListener('hashChange', () => {
                this.history.current = location.hash.slice(1)
            })
        }
        else {
            location.pathname ? '' : location.pathname = '/'

            window.addEventListener('load', () => {
                this.history.current = location.pathname
            })

            window.addEventListener('popstate', () => {
                this.history.current = location.pathname
            })
        }
    }
}

myVueRouter.install = function (v) {
    Vue = v

    Vue.mixin({
        // 在 $options 初始化之前混入 mixin 的内容
        beforeCreate() {
            // 如果是根组件
            if (this.$options && this.$options.router) {
                // 将当前实例挂载在 _root 上
                this._root = this
                this._router = this.$options.router
                // 监听 this._router.history 对象
                Vue.util.defineReactive(this, 'xxx', this._router.history)
            }
            // 如果是子组件
            else {
                this._root = this.$parent && this.$parent._root
            }
            // 将 $router 挂载在组件实例上
            Object.defineProperty(this, '$router', {
                get() {
                    return this._root._router
                }
            })

            Object.defineProperty(this, '$route', {
                get() {
                    return this._root.router.history.current
                }
            })
        }
    })

    Vue.component('router-link', {
        props: {
            to: String
        },
        render(h) {
            let mode = this._self._root._router.mode
            let to = mode === 'hash' ? '#' + this.to : this.to
            return h('a', { attrs: { href: to } }, this.$slots.default)
        }
    })

    Vue.component('router-view', {
        render(h) {
            let current = this._self._root._router.history.current
            let routeMap = this._self._root._router.routesMap
            return h(routeMap[current])
        }
    })
}

export default myVueRouter