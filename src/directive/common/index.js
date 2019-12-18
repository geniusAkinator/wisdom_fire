import clickOutSide from './clickOutSide'

const install = function (Vue) {
    Vue.directive('clickOutSide', clickOutSide)
}

if (window.Vue) {
    window['clickOutSide'] = clickOutSide
    Vue.use(install); // eslint-disable-line
}

export default install
