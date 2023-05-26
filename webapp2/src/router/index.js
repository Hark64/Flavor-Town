import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EventsView from '../views/EventsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/todos',
      name: 'todos',
      component: () => import('../views/ToDosView.vue')
    },
    {
      path: '/postrecipes',
      name: 'postrecipes',
      component: () => import('../views/PostRecipeView.vue')
    },
    {
      path: '/recipes',
      name: 'recipes',
      component: () => import('../views/RecipeView.vue')
    },
    {
      path: '/events',
      name: 'events',
      component: () => import('../views/Events.vue')
    },
    {
      path: '/createevent',
      name: 'createevent',
      component: () => import('../views/createevent.vue')
    },
    {
      path: "/account",
      name: "account",
      component: () => import("../views/Account.vue")
    },
    {
      path: "/ratings",
      name: "ratings",
      component: () => import("../views/Ratings.vue")
    }
  ]
})

export default router