import Vue from "vue";
import Router from 'vue-router'
import Albums from './components/Albums.vue'
Vue.use(Router);
const router = new Router({
    mode: "history",
    routes: [
        {
            path: '/', component: Albums
        }
    ],
});

export default router;