import { createApp } from 'vue'
import App from './App.vue'
import router from './router/route.js'
import './assets/style/style.sass'

createApp(App)
	.use(router)
	.mount('#app')