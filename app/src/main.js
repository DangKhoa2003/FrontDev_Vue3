import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import './assets/css/animate.css';
import './assets/css/owl.theme.default.min.css';
import './assets/css/magnific-popup.css';
import './assets/css/flaticon.css';
import './assets/css/style.css';
import Vue from 'vue';
import VueSweetalert2 from 'vue-sweetalert2';


loadFonts()
createApp(App)
.use(router)
.use(store)
.use(vuetify)
.use(VueSweetalert2)
.mount('#app')
