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
import PlaceAd from "@/views/PlaceAd/PlaceAd.vue";
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
            meta: {
              title: 'Купить USD'
            }
          },
          {
            path: 'place-ad',
            name: 'place-ad',
            component: PlaceAd,
            meta: {
              title: 'Разместить объявление'
            }
          },
          {
            path: 'edit-ad',
            name: 'edit-ad',
            component: PlaceAd,
            meta: {
              title: 'Редактировать объявление'
            }
          },
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