import { createRouter, createWebHistory } from 'vue-router'
import store from 'store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'user-panel',
      component: () => import('../pages/user/index.vue'),
      children: [
        {
          path: '',
          name: 'user-panel.home',
          component: () => import('../pages/user/Dashboard.vue'),
          meta: {
            pageTitle: 'Dashboard'
          }
        },
        {
          path: '/conversions-history',
          name: 'user-panel.conversions-history',
          component: () => import('../pages/user/MyConversions.vue'),
          meta: {
            pageTitle: 'Conversions History',
          }
        },
        {
          path: '/profile',
          name: 'user-panel.profile',
          component: () => import('../pages/user/UpdateProfile.vue'),
          meta: {
            pageTitle: 'My Profile',
          }
        },
        {
          path: '/update-password',
          name: 'user-panel.update-password',
          component: () => import('../pages/user/UpdatePassword.vue'),
          meta: {
            pageTitle: 'Update Password',
          }
        },
        {
          path: '/live-exchange',
          name: 'user-panel.live-exchange',
          component: () => import('../pages/user/LiveExchange.vue'),
          meta: {
            pageTitle: 'Live Exchange Rate',
          }
        },
      ],
      meta: {
        authRequired: true,
      },
    },
    {
      path: '/',
      redirect: '/auth/login',
      component: () => import('../pages/auth/index.vue'),
      children: [
        {
          path: '/auth/logout',
          name: 'logout'
        },
        {
          path: '/auth/login',
          name: 'login',
          component: () => import('../pages/auth/Login.vue'),
        },
        {
          path: '/auth/sign-up',
          name: 'sign-up',
          component: () => import('../pages/auth/SignUp.vue'),
        },
      ],
    },
  ],
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.authRequired)) {
    if (!store.get('accessToken')) {
      next({
        path: '/auth/login',
        query: { redirect: to.fullPath },
      })
    } else {
      next()
    }
  } else {
    next()
  }
})
router.afterEach((to) => {
  if (to.matched.some((record) => record.name === 'logout')) {
    store.remove('accessToken')
    window.location.href = '/auth/login'
  }
})

export default router
