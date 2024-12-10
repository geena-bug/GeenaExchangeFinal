// Import createRouter and createWebHistory functions from vue-router
import { createRouter, createWebHistory } from 'vue-router'

// Import the store object from the 'store' package
import store from 'store'

// Create a new router instance
const router = createRouter({
  // Use HTML5 history mode with base URL from environment variables
  history: createWebHistory(import.meta.env.BASE_URL),
  // Define the routes for the application
  routes: [
    {
      path: '/',
      name: 'user-panel',
      // Lazy-load the component for the main user panel page
      component: () => import('../pages/user/index.vue'),
      // Define child routes for the user panel
      children: [
        {
          path: '',
          name: 'user-panel.home',
          // Lazy-load the component for the user dashboard
          component: () => import('../pages/user/Dashboard.vue'),
          // Meta information for the route
          meta: {
            pageTitle: 'Dashboard'
          }
        },
        {
          path: '/conversions-history',
          name: 'user-panel.conversions-history',
          // Lazy-load the component for conversions history
          component: () => import('../pages/user/MyConversions.vue'),
          // Meta information for the route
          meta: {
            pageTitle: 'Conversions History',
          }
        },
        {
          path: '/profile',
          name: 'user-panel.profile',
          // Lazy-load the component for updating user profile
          component: () => import('../pages/user/UpdateProfile.vue'),
          // Meta information for the route
          meta: {
            pageTitle: 'My Profile',
          }
        },
        {
          path: '/update-password',
          name: 'user-panel.update-password',
          // Lazy-load the component for updating password
          component: () => import('../pages/user/UpdatePassword.vue'),
          // Meta information for the route
          meta: {
            pageTitle: 'Update Password',
          }
        },
        {
          path: '/live-exchange',
          name: 'user-panel.live-exchange',
          // Lazy-load the component for live exchange rates
          component: () => import('../pages/user/LiveExchange.vue'),
          // Meta information for the route
          meta: {
            pageTitle: 'Live Exchange Rate',
          }
        },
        {
          path: '/users',
          name: 'user-panel.users',
          // Lazy-load the component for user management
          component: () => import('../pages/user/Users.vue'),
          // Meta information for the route
          meta: {
            pageTitle: 'Users',
            isAdmin: true, // Indicates this route requires admin privileges
          }
        },
        {
          path: '/403',
          name: 'user-panel.403',
          // Lazy-load the component for forbidden access page
          component: () => import('../pages/403Page.vue'),
          // Meta information for the route
          meta: {
            pageTitle: 'Forbidden Access',
          }
        },
      ],
      // Meta information indicating authentication is required for these routes
      meta: {
        authRequired: true,
      },
    },
    {
      path: '/',
      // Redirect root path to login page
      redirect: '/auth/login',
      // Lazy-load the authentication index page
      component: () => import('../pages/auth/index.vue'),
      // Define child routes for authentication
      children: [
        {
          path: '/auth/logout',
          name: 'logout'
        },
        {
          path: '/auth/login',
          name: 'login',
          // Lazy-load the login component
          component: () => import('../pages/auth/Login.vue'),
        },
        {
          path: '/auth/sign-up',
          name: 'sign-up',
          // Lazy-load the sign-up component
          component: () => import('../pages/auth/SignUp.vue'),
        },
      ],
    },
  ],
})

// Global navigation guard for authentication check
router.beforeEach((to, from, next) => {
  // If the route requires authentication...
  if (to.matched.some((record) => record.meta.authRequired)) {
    // Check if the user is authenticated by inspecting the accessToken in store
    if (!store.get('accessToken')) {
      // If not authenticated, redirect to login page with a redirect query parameter
      next({
        path: '/auth/login',
        query: { redirect: to.fullPath },
      })
    } else {
      // If authenticated, proceed to the route
      next()
    }
  } else {
    // If no authentication is required, proceed to the route
    next()
  }
})

// Global navigation guard for logout functionality
router.afterEach((to) => {
  // If the route name is 'logout'...
  if (to.matched.some((record) => record.name === 'logout')) {
    // Remove the accessToken from the store to log the user out
    store.remove('accessToken')
    // Redirect to the login page
    window.location.href = '/auth/login'
  }
})

// Export the created router instance for use in the application
export default router
