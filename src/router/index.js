import Vue from 'vue'
import VueRouter from 'vue-router'

const Win = () => import('@/pages/Win');


Vue.use(VueRouter);
const router = new VueRouter({
    // mode: 'history',
    routes: [
        {
            path: '',
            name: 'win',
            component: Win
        }
    ],
    scrollBehavior() {
        return {x: 0, y: 0}
    }
});

router.beforeEach((to, from, next) => {
    next();
});
export default router;
