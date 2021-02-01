import Vue from 'vue'
import axios from 'axios'

axios.defaults.baseURL = 'http://apipersonalfinances.com/api/v1'

Vue.use({
    install (Vue) {
      Vue.prototype.$http = axios
    } /* eslint-disable-line */
})
