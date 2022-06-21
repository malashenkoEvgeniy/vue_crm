import { createApp } from 'vue'
import App from './App.vue'
import Vuelidate from '@vuelidate/core'
import './registerServiceWorker'
import router from './router'
import store from './store'
import messagePlugin from './utils/message.plugin'
import 'materialize-css/dist/js/materialize.min.js'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

const app1 = createApp(App)
const options = {}

app1.config.globalProperties.$filters = {
  dateFilter (value, format = 'date') {
    if (format.includes('time')) {
      options.hour = '2-digit'
      options.minute = '2-digit'
      options.second = '2-digit'
    }
    if (format.includes('date')) {
      options.day = '2-digit'
      options.month = 'long'
      options.year = 'numeric'
    }

    return new Intl.DateTimeFormat('ru-Ru', options).format(new Date(value))
  }
}

const config = {
  apiKey: 'AIzaSyBI3E1wbM3VUChZERokMvCDxhgP6LFd1r4',
  authDomain: 'vue-crm-k1808.firebaseapp.com',
  projectId: 'vue-crm-k1808',
  storageBucket: 'vue-crm-k1808.appspot.com',
  messagingSenderId: '1032574508649',
  appId: '1:1032574508649:web:ac6a327692ce7e171a8cf8'
}

firebase.initializeApp(config)

app1.use(store)
  .use(router)
  .use(messagePlugin)
  .use(Vuelidate)
  .mount('#app')

firebase.auth().onAuthStateChanged(() => {
  if (!app1) {
    app1.use(store)
      .use(router)
      .use(messagePlugin)
      .use(Vuelidate)
      .mount('#app')
  }
})
