<template>
  <div class="chat">
    <vue-advanced-chat
        ref="chat"
        :show-add-room="false"
        :show-audio="false"
        :single-room="true"
        :current-user-id="currentUserId"
        :rooms="JSON.stringify(rooms)"
        :rooms-loaded="JSON.stringify(roomsLoaded)"
        :loading-rooms="JSON.stringify(loadingRooms)"
        :messages="JSON.stringify(messages)"
        :messages-loaded="JSON.stringify(messagesLoaded)"
        :styles="styles"
        @fetch-messages="onFetchMessages"
    />
<!--    <div class="chat__header">-->
<!--      <Seller-->
<!--          type="seller-modal"-->
<!--          name="Константинопольский Константин"-->
<!--          :successful-num="99"-->
<!--          :done-num="100"-->
<!--      />-->
<!--    </div>-->

<!--    <div class="chat__content">-->
<!--      <div class="chat__message" :class="{ 'your-message': [1, 10, 20].includes(item) }" v-for="item in 20" :key="item">-->
<!--        Всегда готова к сделке-->
<!--        <template v-if="[1, 10, 20].includes(item)">, я 24/7 на связи, пишите звоните, помогу в чате в тг, предложу любой обмен, рада сотрудничеству и постоянным клиентам</template>-->

<!--        <div class="chat__message-time">-->
<!--          12:20-->
<!--          <ReadIcon/>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--    <div class="chat__footer">-->
<!--      <textarea placeholder="Написать сообщение" v-model="text" ref="textarea" @input="adjustHeight" :style="textareaStyle"/>-->

<!--      <div class="chat__widgets">-->
<!--        <svg width="24" height="24" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">-->
<!--          <path fill-rule="evenodd" clip-rule="evenodd" d="M8 1.5C8.27614 1.5 8.5 1.72386 8.5 2V14C8.5 14.2761 8.27614 14.5 8 14.5C7.72386 14.5 7.5 14.2761 7.5 14V2C7.5 1.72386 7.72386 1.5 8 1.5Z" fill="#7B879D"/>-->
<!--          <path fill-rule="evenodd" clip-rule="evenodd" d="M14.5 8C14.5 8.27614 14.2761 8.5 14 8.5L2 8.5C1.72386 8.5 1.5 8.27614 1.5 8C1.5 7.72386 1.72386 7.5 2 7.5L14 7.5C14.2761 7.5 14.5 7.72386 14.5 8Z" fill="#7B879D"/>-->
<!--        </svg>-->
<!--        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">-->
<!--          <template v-if="text">-->
<!--            <path fill-rule="evenodd" clip-rule="evenodd" d="M5.93326 2.27738C7.04422 2.38331 8.36283 2.817 9.84571 3.55971L18.4055 7.83958C20.4342 8.85396 21.7 10.3189 21.7 12.0004C21.7 13.6819 20.4342 15.1468 18.4055 16.1612L9.84545 20.4412C8.36016 21.1839 7.04035 21.6175 5.92901 21.7234C4.82089 21.829 3.81579 21.614 3.12436 20.9216C2.43301 20.2294 2.21919 19.2241 2.32567 18.1166C2.43247 17.0058 2.86676 15.6873 3.60945 14.2045L4.47952 12.4744C4.52286 12.3873 4.56504 12.2184 4.56504 12.0054C4.56504 11.7919 4.52266 11.6227 4.47922 11.5358L3.60922 9.79581C2.86659 8.31304 2.43295 6.99452 2.32702 5.88362C2.22138 4.77575 2.43657 3.77071 3.12846 3.07882C3.82035 2.38694 4.82539 2.17175 5.93326 2.27738ZM4.68945 12C4.68945 12.4142 5.02524 12.75 5.43945 12.75H5.96979H10.8395C11.2537 12.75 11.5895 12.4142 11.5895 12C11.5895 11.5858 11.2537 11.25 10.8395 11.25H5.96683H5.43945C5.02524 11.25 4.68945 11.5858 4.68945 12Z" fill="#B043FF"/>-->
<!--          </template>-->
<!--          <template v-else>-->
<!--            <path fill-rule="evenodd" clip-rule="evenodd" d="M3.82025 5.74124C3.90213 6.59992 4.2534 7.73249 4.95063 9.12453L5.82086 10.865C5.99742 11.2181 6.06504 11.6339 6.06504 12.0054C6.06504 12.3769 5.99742 12.7927 5.82086 13.1458L5.82009 13.1474L4.95063 14.8763C4.25354 16.2682 3.90135 17.4014 3.81879 18.2601C3.73589 19.1224 3.92957 19.6052 4.18572 19.8617C4.44179 20.1181 4.9242 20.3124 5.7867 20.2302C6.64599 20.1483 7.77992 19.7969 9.17463 19.0996L17.7346 14.8196C19.5459 13.914 20.2 12.8489 20.2 12.0004C20.2 11.1519 19.5459 10.0868 17.7346 9.18122L9.17463 4.90122C7.7826 4.204 6.64956 3.85249 5.79088 3.77061C4.92907 3.68844 4.44598 3.88262 4.18912 4.13948C3.93226 4.39635 3.73807 4.87943 3.82025 5.74124ZM9.84571 3.55971C8.36283 2.817 7.04422 2.38331 5.93326 2.27738C4.82539 2.17175 3.82035 2.38694 3.12846 3.07882C2.43657 3.77071 2.22138 4.77575 2.32702 5.88362C2.43295 6.99452 2.86659 8.31304 3.60922 9.79581L4.47922 11.5358C4.52266 11.6227 4.56504 11.7919 4.56504 12.0054C4.56504 12.2184 4.52286 12.3873 4.47952 12.4744L3.60945 14.2045C2.86676 15.6873 2.43247 17.0058 2.32567 18.1166C2.21919 19.2241 2.43301 20.2294 3.12436 20.9216C3.81579 21.614 4.82089 21.829 5.92901 21.7234C7.04035 21.6175 8.36016 21.1839 9.84545 20.4412L18.4055 16.1612C20.4342 15.1468 21.7 13.6819 21.7 12.0004C21.7 10.3189 20.4342 8.85396 18.4055 7.83958L9.84571 3.55971Z" fill="#7B879D"/>-->
<!--            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.68945 12C4.68945 11.5858 5.02524 11.25 5.43945 11.25H10.8395C11.2537 11.25 11.5895 11.5858 11.5895 12C11.5895 12.4142 11.2537 12.75 10.8395 12.75H5.43945C5.02524 12.75 4.68945 12.4142 4.68945 12Z" fill="#7B879D"/>-->
<!--          </template>-->
<!--        </svg>-->
<!--      </div>-->
<!--    </div>-->
  </div>
</template>

<script setup lang="ts">
// import ReadIcon from '@/assets/svg/read.svg?component'
// import Seller from "@/components/Seller/Seller.vue";
import {
  onMounted,
  reactive,
  Ref,
  ref
} from "vue";

const styles = '.vac-textarea { border-color: #000000; } .vac-room-header { border-bottom: 1px solid #000000; }';

// const text = ref('');
const textarea: Ref<HTMLTextAreaElement | null> = ref(null);
// const minHeight = 24; // Минимальная высота для 1 строки
const maxHeight = 80; // Максимальная высота для 5 строк

// const textareaStyle = computed(() => ({
//   minHeight: `${minHeight}px`,
//   maxHeight: `${maxHeight}px`,
//   overflowY: 'auto',
// }));

const adjustHeight = () => {
  if (textarea.value) {
    textarea.value.style.height = '24px'; // Сброс высоты
    const newHeight = Math.min(textarea.value.scrollHeight, maxHeight);
    textarea.value.style.height = `${newHeight}px`;
  }
};

onMounted(() => {
  adjustHeight()
}); // Настройка высоты при монтировании

import { register } from 'vue-advanced-chat';
register()

const chat = ref();

const currentUserId = '1234';
const rooms = reactive([
  {
    roomId: 1,
    roomName: "Room 1",
    avatar: "assets/imgs/people.png",
    unreadCount: 4,
    index: 3,
    lastMessage: {
      content: "Last message received",
      senderId: 1234,
      username: "John Doe",
      timestamp: "10:20",
      saved: true,
      distributed: false,
      seen: false,
      new: true,
    },
    users: [
      {
        _id: 1234,
        username: "John Doe",
        avatar: "assets/imgs/doe.png",
        status: {
          state: "online",
          lastChanged: "today, 14:30",
        },
      },
      {
        _id: 4321,
        username: "John Snow",
        avatar: "assets/imgs/snow.png",
        status: {
          state: "offline",
          lastChanged: "14 July, 20:00",
        },
      },
    ],
    typingUsers: [4321],
  },
]);
let messages: any = reactive([]);

const roomsLoaded = ref(true),
    messagesLoaded = ref(false),
    loadingRooms = ref(false);

const onFetchMessages = () => {
  setTimeout(() => {
    messages = [
      {
        _id: 7890,
        indexId: 12092,
        content: "Message 1",
        senderId: 1234,
        username: "John Doe",
        avatar: "assets/imgs/doe.png",
        date: "13 November",
        timestamp: "10:20",
        system: false,
        saved: true,
        distributed: true,
        seen: true,
        deleted: false,
        disableActions: false,
        disableReactions: false,
        files: [
          {
            name: "My File",
            size: 67351,
            type: "png",
            audio: true,
            duration: 14.4,
            url: "https://firebasestorage.googleapis.com/v0/b/vuexfire-a9c43.appspot.com/o/files%2F6R0MijpK6M4AIrwaaCY2%2F5RM2yf2TBCVmAUpaHbCD%2Fimage.png?alt=media&token=141dc7d8-1665-438b-871e-6e8566fabd2c",
            preview:
                "https://firebasestorage.googleapis.com/v0/b/vuexfire-a9c43.appspot.com/o/files%2F6R0MijpK6M4AIrwaaCY2%2F5RM2yf2TBCVmAUpaHbCD%2Fimage.png?alt=media&token=141dc7d8-1665-438b-871e-6e8566fabd2c",
          },
        ],
        reactions: {
          "😁": [
            1234, // USER_ID
            4321,
          ],
          "🥰": [1234],
        },
        replyMessage: {
          content: "Reply Message",
          senderId: 4321,
          files: [
            {
              name: "My Replied File",
              size: 67351,
              type: "png",
              audio: true,
              duration: 14.4,
              url: "https://firebasestorage.googleapis.com/v0/b/vuexfire-a9c43.appspot.com/o/files%2F6R0MijpK6M4AIrwaaCY2%2F5RM2yf2TBCVmAUpaHbCD%2Fimage.png?alt=media&token=141dc7d8-1665-438b-871e-6e8566fabd2c",
              preview:
                  "https://firebasestorage.googleapis.com/v0/b/vuexfire-a9c43.appspot.com/o/files%2F6R0MijpK6M4AIrwaaCY2%2F5RM2yf2TBCVmAUpaHbCD%2Fimage.png?alt=media&token=141dc7d8-1665-438b-871e-6e8566fabd2c",
            },
          ],
        },
      },
    ]
    messagesLoaded.value = true
  })
}

const setStylesForChat = () => {
  const style = document.createElement('style');
  const styles = {
    containerScroll: '.vac-container-scroll { margin-top: 88px !important; }',
    roomHeader: '.vac-room-header { padding: 0 8px; height: 87px; border-bottom: 1px solid #E0E5EB; }',
    avatar: '.vac-avatar { flex-shrink: 0; margin-right: 16px; width: 48px; height: 48px; border-radius: 12px; }',
    textEllipsis: '.vac-text-ellipsis { display: flex; flex-direction: column; row-gap: 4px; }',
  }

  style.textContent = Object.values(styles).join('');
  chat.value.shadowRoot.appendChild(style)
}

onMounted(() => {
  setStylesForChat()
})
</script>

<style scoped lang="scss">
@import "chat";
</style>