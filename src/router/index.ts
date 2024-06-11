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
const baseUrl: string = '/app/p2p/new'

function getDefaultRoute(): string {
  const appElement = document.getElementById('p2p-app');
  if (appElement) {
    const defaultRoute = appElement.getAttribute('default-route');
    return defaultRoute || '/app/p2p';
  }
  return '/app/p2p';
}

const routes = [
  {
    path: getDefaultRoute(),
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
            path: 'deal/:transactionId',
            name: 'deal',
            component: BuyCurrency,
            meta: {
              action: 'Отменить сделку'
            }
          },
          {
            path: 'place-ad',
            name: 'place-ad',
            component: PlaceAd,
            meta: {
              action: ''
            },
          },
          {
            path: 'edit-ad/:id',
            name: 'edit-ad',
            component: PlaceAd,
            meta: {
              title: 'Редактировать объявление',
              action: ''
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
  // @ts-ignore
  routes
})

export { baseUrl }
export default router