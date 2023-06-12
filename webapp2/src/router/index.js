import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useUserStore } from '@/stores/user';



function buildRouter (){
  const store = useUserStore();
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
      path: '/recipe/:id',
      name: 'singleRecipe',
      component: () => import('../views/SingleRecipePostView.vue')
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
    },
    {
      path: "/search",
      name: "search",
      component: () => import("../views/SearchView.vue")
    }
  ]
  
})



return router;

}
// router.beforeEach((to, from, next) => {
//   if (to.name !== 'home' && !isAuthenticated) next({ name: 'home' })
//   else next()
// })
export default buildRouter;

