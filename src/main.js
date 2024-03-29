// =========================================================
// * Vuetify Material Dashboard - v2.1.0
// =========================================================
//
// * Product Page: https://www.creative-tim.com/product/vuetify-material-dashboard
// * Copyright 2019 Creative Tim (https://www.creative-tim.com)
//
// * Coded by Creative Tim
//
// =========================================================
//
// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
// require('./bootstrap')
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import './plugins/base'
import './plugins/chartist'
// import './plugins/vee-validate'
import './plugins/axios'
import vuetify from './plugins/vuetify'
import VueSweetalert2 from 'vue-sweetalert2'
// import VeeValidate from 'vee-validate';
import Notifications from 'vue-notification'
import money from  'vuejs-money'

Vue.config.productionTip = false

Vue.use(VueSweetalert2)
Vue.use(money)
Vue.filter('money', valor => {
return `R$ ${parseFloat(valor).toFixed(2)}`.replace('.', ',')
})

Vue.use(require('vue-moment'))
Vue.use(require('vue-chartist'))

Vue.use(Notifications)

// Vue.use(VeeValidate);


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')

store.dispatch('getMe')
