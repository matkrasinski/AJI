import { createRouter, createWebHistory } from 'vue-router';

import MainPage from '../components/MainPage'
import OrdersPage from '../components/OrdersPage'


const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/main', props: true },
        { path: '/main', name: 'main', component: MainPage, props: true },
        { path: '/orders', name: 'orders', component: OrdersPage}
    ]
});


export default router;