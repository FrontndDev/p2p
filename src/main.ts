import {
  createApp,
  nextTick
} from 'vue'
import 'element-plus/dist/index.css'
import './assets/scss/style.scss'
import App from './App.vue'
import router from "./router";
import store from "./store";

const app = createApp(App)

app
  .use(router)
  .use(store)
  .mount('#p2p-app')

nextTick(() => {
  store.commit('SET_SHOW_LOADER', false)
})