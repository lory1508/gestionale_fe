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
  {
    path: '/customers',
    name: 'customers',
    component: () => import('@/views/CustomersView.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/drivers',
    name: 'drivers',
    component: () => import('@/views/DriversView.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/expenses',
    name: 'expenses',
    component: () => import('@/views/ExpensesView.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/invoices',
    name: 'invoices',
    component: () => import('@/views/InvoicesView.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/maintenance',
    name: 'maintenance',
    component: () => import('@/views/MaintenanceView.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/suppliers',
    name: 'suppliers',
    component: () => import('@/views/SuppliersView.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/travels',
    name: 'travels',
    component: () => import('@/views/TravelsView.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/vehicles',
    name: 'vehicles',
    component: () => import('@/views/VehiclesView.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFound.vue'),
  }
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
