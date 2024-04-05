<template>
  <Modal width="560px" padding="24px 0 16px" action-in-header="back">
    <template #content>
      <div class="remove-requisites-modal">
        <div class="remove-requisites-modal__content">
          <img src="@/assets/images/exclamation.png" alt="icon">
          <div class="title-h2">Удаление реквизитов</div>
          <div class="remove-requisites-modal__description">Вы уверены что хотие удалить реквизиты 4521 4714 8978 0000?</div>
        </div>
        <div class="remove-requisites-modal__buttons">
          <MyButton type="neutral-btn" size="big" width="100%" name="Отмена"/>
          <MyButton size="big" width="100%" name="Продолжить"/>
        </div>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import Modal from "@/components/Modals/Modal.vue";
import MyButton from "@/components/UI/MyButton/MyButton.vue";
</script>

<style scoped lang="scss">
@import "removeRequisitesModal";
</style>