import Vue from 'vue'
import Router from 'vue-router'
import { TOKEN_NAME } from '@/configs/api'

Vue.use(Router)


const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/', redirect: '/dashboard',
      component: () => import('@/views/AuthTemplate'),
      children: [
        {
          name: 'Register',
          path: '/register',
          component: () => import('@/views/components/auth/Register'),
          meta: { guestOnly: true}
        },
        {
          name: 'Login',
          path: '/login',
          component: () => import('@/views/components/auth/Login'),
          meta: { guestOnly: true}
        }
      ]
    },

    {
      path: '/',
      component: () => import('@/views/DashboardTemplate'),
      children: [
        {
          name: 'Dashboard',
          path: '/dashboard',
          component: () => import('@/views/components/pages/Dashboard'),
          meta: { authOnly: true }
        },
        {
          name: 'Receitas',
          path: '/receitas',
          component: () => import('@/views/components/pages/Income'),
          meta: { authOnly: true }
        },
        {
          name: 'Categorias',
          path: 'categories',
          component: () => import('@/views/components/pages/Categories'),
          meta: { authOnly: true }
        },
        {
          name: 'Despesas',
          path: 'despesas',
          component: () => import('@/views/components/pages/Expenses'),
          meta: { authOnly: true }
        },
        {
          name: 'Despesas recorrentes',
          path: 'recorrentes',
          component: () => import('@/views/components/pages/RecurringExpenses'),
          meta: { authOnly: true }
        },
      ],
    },
  ],
})

function isLoggedIn() {
  return localStorage.getItem(TOKEN_NAME)
}

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.authOnly)) {
    if (!isLoggedIn()) {
      next({
        name: 'Login',
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.guestOnly)) {
    if (isLoggedIn()) {
      next({
        name: 'Dashboard'
      });
    } else {
      next();
    }
  } else {
    next()
  }
})

export default router
