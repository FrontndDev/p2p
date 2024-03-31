import {
  createRouter,
  createWebHistory
} from "vue-router";
import HomeLayout from "@/layouts/HomeLayout/HomeLayout.vue";
import Purchase from "@/views/Purchase/Purchase.vue";
import Sale from "@/views/Sale/Sale.vue";
import ProfileSettings from "@/views/ProfileSettings/ProfileSettings.vue";
import MainLayout from "@/layouts/MainLayout/MainLayout.vue";
import BuyCurrency from "@/views/BuyCurrency/BuyCurrency.vue";
// @ts-ignore
const baseUrl: string = '/app/p2p'

const routes = [
  {
    path: baseUrl,
    children: [
      {
        path: '',
        component: HomeLayout,
        children: [
          {
            path: 'purchase',
            name: 'purchase',
            component: Purchase,
          },
          {
            path: 'sale',
            name: 'sale',
            component: Sale,
          }
        ]
      },
      {
        path: '',
        component: MainLayout,
        children: [
          {
            path: 'buy-currency',
            name: 'buy-currency',
            component: BuyCurrency,
          }
        ]
      },
      {
        path: 'profile-settings',
        name: 'profile-settings',
        component: ProfileSettings,
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export { baseUrl }
export default router