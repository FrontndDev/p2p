<template>
  <div class="seller-details">
    <div class="my-content-container">
      <div class="seller-details__title title-h3">Реквизиты продавца</div>

      <div class="seller-details__body">
        <div class="seller-details__header">
          <RadionButton name="Сбербанк"/>
        </div>
        <ol class="seller-details__content">
          <li class="seller-details__step">
            <div class="seller-details__step-line"/>
            1. Войдите в ваш аккаунт: Sberbank
          </li>
          <li class="seller-details__step">
            <div class="seller-details__step-line"/>
            2. Переведите продавцу<span><span>1 000 000 RUB</span><CopyIcon/></span>

            <div class="seller-details__step-content">
              <div class="seller-details__step-content-item">
                <div>Имя</div>
                <div>
                  Иван Иванов Иванович
                  <CopyIcon/>
                </div>
              </div>
              <div class="seller-details__step-content-item">
                <div>Реквизиты</div>
                <div>
                  1234 4567 0000 7412
                  <CopyIcon/>
                </div>
              </div>
            </div>
          </li>
          <li class="seller-details__step">3. Нажмите на кнопку “Платеж отправлен”</li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CopyIcon from '@/assets/svg/copy.svg?component';
import RadionButton from "@/components/UI/RadioButton/RadionButton.vue";
</script>

<style scoped lang="scss">
@import "sellerDetails";
</style>