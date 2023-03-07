import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import store from '@/store'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'dashboard',
    alias: '/dashboard',
    component: () => import('@/views/DashboardView.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue'),
    meta: {
      requiresAuth: false
    }
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})


const isUserLogged = function() {
  return store.getters["user/isLoggedIn"];
};

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if( requiresAuth && !isUserLogged() && to.name !== 'login' ) {
    next({ name: "login" });
  } else if( isUserLogged() && to.name === 'login' ) {
    next({ name: "dashboard" });
  } else {
    next();
  }
})


export default router
