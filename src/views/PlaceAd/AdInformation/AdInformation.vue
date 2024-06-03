<template>
  <div class="ad-information">
    <div class="ad-information__title title-h2 fw-700">
      Размещаемое объявление

      <CrossIcon/>
    </div>

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
            <div class="fw-700">{{ getPrice }} {{ selectedOuterCurrency?.name }}</div>
          </div>
          <div class="ad-information__row">
            <div>Общее количество</div>
            <div>{{ amountOfCurrency ?? 0 }} {{ props.selectedInnerCurrency?.name }}</div>
          </div>
          <div class="ad-information__row">
            <div>Лимиты</div>
            <div>
              {{ +props.minAmount ? props.minAmount : 0 }}{{ selectedOuterCurrency?.name }}
              -
              {{ +props.maxAmount ? props.maxAmount : 0 }}{{ selectedOuterCurrency?.name }}
            </div>
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
              <MyCheckbox
                  id="agreement"
                  :error="props.invalidFields.includes('agreement')"
                  :active="props.agreement"
                  @set-value="emit('set-agreement')"
              >
                <div class="ad-information__checkbox-text">
                  Я прочитал(-а) и соглашаюсь с <a href="#">Условиями</a> и <a href="#">Политикой конфидентиальности P2P</a>
                </div>
              </MyCheckbox>
            </div>

            <div class="ad-information__buttons">
              <MyButton
                  type="second-primary-btn"
                  size="big"
                  width="100%"
                  name="Назад"
                  :disabled="saveBtnDisabled"
                  @click="goBack"
              />
              <MyButton
                  size="big"
                  width="100%"
                  name="Разместить объявление"
                  :disabled="saveBtnDisabled"
                  @click="emit('create-ad')"
              />
            </div>
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
// @ts-ignore
import CrossIcon from '@/assets/svg/cross.svg?component';
import PaymentMethods from "@/components/UI/PaymentMethods/PaymentMethods.vue";
import {
  computed,
  ComputedRef,
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
  factor: {
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
  },
  saveBtnDisabled: {
    type: Boolean,
    default: false,
  },
  agreement: {
    type: Boolean,
    required: true,
  },
  invalidFields: {
    type: Array as PropType<any[]>,
  },
  priceType: {
    type: String,
    required: true,
  }
})

const emit = defineEmits(['create-ad', 'set-agreement']);

const store = useStore();
const router = useRouter();
const route = useRoute();

const showDeleteAdModal = ref(false);

const currencies = computed(() => store.state.currencies)
const detailAd = computed(() => store.state.profile.detailAd)

const amountOfCurrency = computed(() => store.state.profile.profile?.wallets?.[props.selectedInnerCurrency?.name ?? '']?.amount);
const currentRate: ComputedRef<number> = computed(() => currencies.value.currentRate)

const getPrice = computed(() =>
    props.priceType === 'fixed' ?
        props.sellingPrice ?? 0 :
        parseFloat((currentRate.value * (props.factor / 100)).toFixed(4))
);

const deleteAd = async () => {
  showDeleteAdModal.value = false
  await store.dispatch('profile/deleteAd', detailAd.value.id)
  await router.push({ name: 'sale' })
}

const toggleStatusAd = () => {
  store.dispatch('profile/updateAdStatus', detailAd.value.id)
}

const goBack = () => {
  router.push(localStorage.getItem('prevPage'))
}
</script>

<style scoped lang="scss">
@import "adInformation";
</style>