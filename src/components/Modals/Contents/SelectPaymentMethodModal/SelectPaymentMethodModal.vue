<template>
  <Modal title="Выберите способ оплаты" width="560px" padding="24px" @close-modal="emit('close-modal')">
    <template #content>
      <div class="select-payment-method-modal">
        <div class="select-payment-method-modal__content">
          <div
              class="select-payment-method-modal__item"
              v-for="requisite in requisites"
              :key="requisite.id"
              :class="{ active: requisite.id === selectedPaymentMethod?.id }"
              @click="setPaymentMethod(requisite)"
          >
            <div class="select-payment-method-modal__item-left">
              <div class="select-payment-method-modal__item-title">{{ requisite.paymentMethod }}</div>
              <div class="select-payment-method-modal__item-info bg-currency small-icon" :class="`currency-${requisite.currency}`">
                <div class="select-payment-method-modal__item-num">{{ requisite.requisite }}</div>
              </div>
            </div>
            <div class="select-payment-method-modal__item-checkbox" :class="{ active: requisite.id === selectedPaymentMethod?.id }">
              <CheckMarkIcon/>
            </div>
          </div>

          <MyButton
              class="ad__row-button ad__row-button_first"
              type="second-primary-btn"
              size="big"
              width="100%"
              name="Добавить реквизиты"
              @click="showAddRequisitesModal = true"
          >
            <template #icon-left>
              <AddIcon/>
            </template>
          </MyButton>
        </div>
        <div class="select-payment-method-modal__buttons">
          <MyButton
              type="neutral-btn"
              size="big"
              width="100%"
              name="Отмена"
              @click="emit('close-modal')"
          />
          <MyButton
              size="big"
              width="100%"
              name="Продолжить"
              @click="selectPaymentMethod"
          />
        </div>
      </div>
    </template>
  </Modal>
  <AddRequisitesModal
      :selected-outer-currency="props.selectedOuterCurrency"
      v-if="showAddRequisitesModal"
      @close-modal="closeShowAddRequisitesModal"
  />
</template>

<script setup lang="ts">
// @ts-ignore
import AddIcon from '@/assets/svg/add.svg?component';
// @ts-ignore
import CheckMarkIcon from '@/assets/svg/deal/check-mark.svg?component'
import Modal from "@/components/Modals/Modal.vue";
import MyButton from "@/components/UI/MyButton/MyButton.vue";
import AddRequisitesModal from "@/components/Modals/Contents/AddRequisitesModal/AddRequisitesModal.vue";
import {
  computed,
  PropType,
  Ref,
  ref
} from "vue";
import { ISelect } from "@/components/UI/Select/select.interface.ts";
import { useStore } from "vuex";
import { IRequisite } from "@/interfaces/store/modules/profile.interface.ts";

const showAddRequisitesModal = ref(false);

const props = defineProps({
  selectedPaymentMethod: {
    type: Object as PropType<ISelect | null>,
    required: true,
  },
  selectedOuterCurrency: {
    type: Object as PropType<ISelect>,
    required: true,
  }
});

const emit = defineEmits(['close-modal', 'select-payment-method']);

const store = useStore();

const selectedPaymentMethod: Ref<ISelect | null> = ref(props.selectedPaymentMethod);

const requisites = computed(() =>
    store.state.profile.profile?.requisites.filter((requisite: IRequisite) => requisite.currency === props.selectedOuterCurrency.name)
);

const setPaymentMethod = (requisite: IRequisite) => {
  selectedPaymentMethod.value = {
    id: requisite.id,
    name: requisite.paymentMethod
  }
};

const selectPaymentMethod = () => {
  if (selectedPaymentMethod.value) {
    emit('select-payment-method', selectedPaymentMethod.value);
    emit('close-modal')
  }
};

const closeShowAddRequisitesModal = (requisite?: IRequisite) => {
  showAddRequisitesModal.value = false
  if (requisite) setPaymentMethod(requisite)
};
</script>

<style scoped lang="scss">
@import "selectPaymentMethodModal";
</style>