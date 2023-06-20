import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue,IconsPlugin } from 'bootstrap-vue'
import { MdButton, MdContent, MdTabs, MdTable } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import VueApexCharts from 'vue-apexcharts'

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(MdButton)
Vue.use(MdContent)
Vue.use(MdTabs)
Vue.use(MdTable)
Vue.use(VueApexCharts)

Vue.component('apexchart', VueApexCharts)
new Vue({
  render: h => h(App),
}).$mount('#app')

