<template>
  <div class="chat">
    <vue-advanced-chat
        ref="chat"
        height="85vh"
        :show-add-room="false"
        :show-audio="false"
        :single-room="true"
        :current-user-id="currentUserId"
        :rooms="JSON.stringify(rooms)"
        :rooms-loaded="JSON.stringify(roomsLoaded)"
        :loading-rooms="JSON.stringify(loadingRooms)"
        :messages="JSON.stringify(messages)"
        :messages-loaded="JSON.stringify(messagesLoaded)"
        @fetch-messages="onFetchMessages"
    />
  </div>
</template>

<script setup lang="ts">
import {
  onMounted,
  reactive,
  ref,
} from "vue";

import { register } from 'vue-advanced-chat';
import mockData from "@/components/Chat/mock-data.ts";
register()

const chat = ref();

const currentUserId = '1234';
const rooms = reactive(mockData.rooms);
let messages: any = reactive([]);

const roomsLoaded = ref(true),
    messagesLoaded = ref(false),
    loadingRooms = ref(false);

const onFetchMessages = () => {
  setTimeout(() => {
    messages = mockData.messages
    messagesLoaded.value = true
  })
}

const setStylesForChat = () => {
  const style = document.createElement('style');
  const styles = {
    // containerScroll: '.vac-container-scroll { margin-top: 88px !important; }',
    // roomHeader: '.vac-room-header { padding: 0 8px; height: 87px; border-bottom: 1px solid #E0E5EB; }',
    // avatar: '.vac-avatar { flex-shrink: 0; border-radius: 12px; }',
    // textEllipsis: '.vac-text-ellipsis { display: flex; flex-direction: column; row-gap: 4px; }',
    // vacEmojiPicker: '.vac-emoji-picker { background: #FFFFFF !important; }',
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