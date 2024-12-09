import './assets/base.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Vue3Toastify  from 'vue3-toastify';
import "../node_modules/flag-icons/css/flag-icons.min.css";
import '../node_modules/flowbite-vue/dist/index.css'
import 'vue3-toastify/dist/index.css';


import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(Vue3Toastify, {
  autoClose: 3000,
});
app.use(createPinia())
app.use(router)

app.mount('#app')
