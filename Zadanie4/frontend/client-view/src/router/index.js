import { createRouter, createWebHistory } from 'vue-router';

import MainPage from '../components/MainPage'
import ShoppingCart from '../components/ShoppingCart'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/main', props: true },
        { path: '/main', name: 'main', component: MainPage, props: true },
        { path: '/cart', name: 'cart', component: ShoppingCart, props: true }
    ]
});

export default router;