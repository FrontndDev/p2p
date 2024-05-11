<template>
  <div class="ad-information">
    <div class="ad-information__title title-h2 fw-700">Размещаемое объявление</div>

    <div class="ad-information__body">
      <div class="ad-information__content">
        <div class="ad-information__content-header">
          <div class="ad-information__content-title">Продажа</div>
          <div class="ad-information__content-wallet bg-currency" :class="`currency-${props.selectedInnerCurrency?.name}`">
            {{ props.selectedInnerCurrency?.name }}
          </div>
        </div>

        <div class="ad-information__rows">
          <div class="ad-information__row">
            <div>Цена</div>
            <div class="fw-700">{{ props.sellingPrice ?? 0 }} {{ selectedOuterCurrency?.name }}</div>
          </div>
          <div class="ad-information__row">
            <div>Общее колличество</div>
            <div>{{ amountOfCurrency ?? 0 }} {{ props.selectedInnerCurrency?.name }}</div>
          </div>
          <div class="ad-information__row">
            <div>Лимиты</div>
            <div>{{ props.minAmount ?? 0}}Р - {{ props.maxAmount ?? 0 }}Р</div>
          </div>
          <div class="ad-information__row">
            <div>Способ оплаты</div>
            <PaymentMethods :payment-methods="[props.selectedPaymentMethod]" v-if="props.selectedPaymentMethod"/>
            <div v-else>-</div>
          </div>
        </div>

        <div class="ad-information__footer">
          <template v-if="route.name === 'place-ad'">
            <div class="ad-information__conditions">
              <MyCheckbox :active="conditions" @set-value="conditions = !conditions">
                <div class="ad-information__checkbox-text">
                  Я прочитал(-а) и соглашаюсь с <a href="#">Условиями</a> и <a href="#">Политикой конфидентиальности P2P</a>
                </div>
              </MyCheckbox>
            </div>
            <MyButton size="big" width="100%" name="Разместить объявление" @click="emit('create-ad')"/>
          </template>
          <template v-else-if="route.name === 'edit-ad'">
            <div class="ad-information__buttons">
              <MyButton
                  type="neutral-btn"
                  size="big"
                  width="100%"
                  name="Удалить"
                  @click="showDeleteAdModal = true"
              >
                <template #icon-left>
                  <TrashIcon/>
                </template>
              </MyButton>
              <MyButton
                  size="big"
                  width="100%"
                  :name="detailAd.isActive ? 'Остановить' : 'Запустить'"
                  v-if="!props.showSaveBtn"
                  @click="toggleStatusAd"
              >
                <template #icon-left>
                  <PauseIcon v-if="detailAd.isActive"/>
                  <PlayIcon v-else/>
                </template>
              </MyButton>
              <MyButton
                  size="big"
                  width="100%"
                  name="Сохранить"
                  v-else
                  @click="emit('create-ad')"
              >
                <template #icon-left>
                  <CheckMarkIcon/>
                </template>
              </MyButton>
            </div>
          </template>
        </div>
      </div>
    </div>

    <DeleteModal
        v-if="showDeleteAdModal"
        @close-modal="showDeleteAdModal = false"
        @delete="deleteAd"
    />
  </div>
</template>

<script setup lang="ts">
// @ts-ignore
import TrashIcon from '@/assets/svg/trash.svg?component';
// @ts-ignore
import PauseIcon from '@/assets/svg/pause.svg?component';
// @ts-ignore
import CheckMarkIcon from '@/assets/svg/deal/check-mark.svg?component';
// @ts-ignore
import PlayIcon from '@/assets/svg/play.svg?component';
import PaymentMethods from "@/components/UI/PaymentMethods/PaymentMethods.vue";
import {
  computed,
  PropType,
  ref
} from "vue";
import MyCheckbox from "@/components/UI/MyCheckbox/MyCheckbox.vue";
import MyButton from "@/components/UI/MyButton/MyButton.vue";
import {
  useRoute,
  useRouter
} from "vue-router";
import { ISelect } from "@/components/UI/Select/select.interface.ts";
import { useStore } from "vuex";
import DeleteModal from "@/components/Modals/Contents/DeleteModal/DeleteModal.vue";

const props = defineProps({
  selectedInnerCurrency: {
    type: Object as PropType<ISelect | null>,
    required: true,
  },
  selectedOuterCurrency: {
    type: Object as PropType<ISelect | null>,
    required: true,
  },
  sellingPrice: {
    type: Number,
  },
  minAmount: {
    type: Number,
  },
  maxAmount: {
    type: Number,
  },
  selectedPaymentMethod: {
    type: Object as PropType<ISelect | null>,
    required: true,
  },
  showSaveBtn: {
    type: Boolean,
    default: false,
  }
})

const emit = defineEmits(['create-ad']);

const store = useStore();
const router = useRouter();
const route = useRoute();

const conditions = ref(false);
const showDeleteAdModal = ref(false);

const detailAd = computed(() => store.state.profile.detailAd)
const amountOfCurrency = computed(() => store.state.profile.profile?.wallets?.[props.selectedInnerCurrency?.name ?? '']?.realAmount);

const deleteAd = async () => {
  showDeleteAdModal.value = false
  await store.dispatch('profile/deleteAd', detailAd.value.id)
  await router.push({ name: 'sale' })
}

const toggleStatusAd = () => {
  store.dispatch('profile/updateAdStatus', detailAd.value.id)
}
</script>

<style scoped lang="scss">
@import "adInformation";
</style>