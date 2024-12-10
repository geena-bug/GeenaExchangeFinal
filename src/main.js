// Import base CSS to apply global styles to the application
import './assets/base.css'

// Import the createApp function from the Vue package to initialize the app
import { createApp } from 'vue'

// Import the createPinia function from the Pinia package to create a state management store
import { createPinia } from 'pinia'

// Import the Vue3Toastify plugin for toast notifications
import Vue3Toastify from 'vue3-toastify';

// Import flag-icons CSS for flag icon support
import "../node_modules/flag-icons/css/flag-icons.min.css";

// Import Flowbite Vue component styles
import '../node_modules/flowbite-vue/dist/index.css'

// Import Vue3Toastify styles for toast notifications
import 'vue3-toastify/dist/index.css';

// Import the root Vue component
import App from './App.vue'

// Import the router instance for handling application routes
import router from './router'

// Create a new Vue application instance with the root component
const app = createApp(App)

// Use the Vue3Toastify plugin in the app with custom configuration
app.use(Vue3Toastify, {
  // Set the automatic close time for toast notifications to 3000 milliseconds
  autoClose: 3000,
});

// Use the Pinia store for state management in the app
app.use(createPinia())

// Use the router for managing navigation in the app
app.use(router)

// Mount the Vue application to the DOM element with the ID 'app'
app.mount('#app')
