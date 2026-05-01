<template>
  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <h1 class="text-2xl font-bold text-[#2D4D3A] mb-8">Сообщения</h1>

    <div v-if="!authStore.isLoggedIn" class="text-center py-20">
      <NuxtLink to="/login" class="bg-[#2D4D3A] text-white px-6 py-2.5 rounded-xl font-semibold text-sm">Войти</NuxtLink>
    </div>

    <div v-else class="flex gap-6 h-[600px]">
      <!-- Chats list -->
      <div class="w-72 shrink-0 bg-white rounded-[18px] shadow-[0_2px_16px_rgba(45,77,58,0.07)] overflow-hidden flex flex-col">
        <div class="p-4 border-b border-gray-100">
          <h3 class="font-bold text-[#2D4D3A] text-sm">Диалоги</h3>
        </div>
        <div class="flex-1 overflow-y-auto">
          <div v-if="!chatsData?.chats?.length" class="p-6 text-center text-[#5B5B5B] text-sm">
            Нет диалогов
          </div>
          <button v-for="chat in chatsData?.chats" :key="chat.userId"
            @click="selectChat(chat)"
            :class="['w-full text-left p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors',
              activeChat?.userId === chat.userId ? 'bg-[#8FD9A8]/10 border-l-4 border-l-[#2D4D3A]' : '']">
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 bg-[#2D4D3A] rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0">
                {{ chat.userName?.charAt(0) }}
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex justify-between items-center">
                  <span class="font-semibold text-[#2D4D3A] text-sm truncate">{{ chat.userName }}</span>
                  <span v-if="chat.unread > 0" class="bg-[#2D4D3A] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center shrink-0">{{ chat.unread }}</span>
                </div>
                <p class="text-xs text-[#5B5B5B] truncate mt-0.5">{{ chat.lastMessage }}</p>
              </div>
            </div>
          </button>
        </div>
      </div>

      <!-- Chat window -->
      <div class="flex-1 bg-white rounded-[18px] shadow-[0_2px_16px_rgba(45,77,58,0.07)] overflow-hidden flex flex-col">
        <div v-if="!activeChat" class="flex-1 flex items-center justify-center text-[#5B5B5B]">
          <div class="text-center">
            <div class="text-4xl mb-3">💬</div>
            <p>Выберите диалог для просмотра</p>
          </div>
        </div>

        <template v-else>
          <div class="p-4 border-b border-gray-100 flex items-center gap-3">
            <div class="w-9 h-9 bg-[#2D4D3A] rounded-full flex items-center justify-center text-white font-bold text-sm">
              {{ activeChat.userName?.charAt(0) }}
            </div>
            <span class="font-bold text-[#2D4D3A]">{{ activeChat.userName }}</span>
          </div>

          <div ref="msgContainer" class="flex-1 overflow-y-auto p-4 space-y-3">
            <div v-for="msg in messages" :key="msg.id"
              :class="['flex', msg.fromUserId === authStore.user?.id ? 'justify-end' : 'justify-start']">
              <div :class="['max-w-[70%] px-4 py-2.5 rounded-2xl text-sm',
                msg.fromUserId === authStore.user?.id
                  ? 'bg-[#2D4D3A] text-white rounded-br-sm'
                  : 'bg-gray-100 text-[#2D4D3A] rounded-bl-sm']">
                {{ msg.text }}
              </div>
            </div>
          </div>

          <div class="p-4 border-t border-gray-100 flex gap-3">
            <input v-model="newMsg" type="text" placeholder="Написать сообщение..."
              @keyup.enter="sendMsg"
              class="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#8FD9A8]">
            <button @click="sendMsg" :disabled="!newMsg.trim()"
              class="bg-[#2D4D3A] text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-[#3d6650] transition-all disabled:opacity-40">
              Отправить
            </button>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
const authStore = useAuthStore()

const { data: chatsData, refresh: refreshChats } = await useFetch('/api/messages')

const activeChat = ref<any>(null)
const messages = ref<any[]>([])
const newMsg = ref('')
const msgContainer = ref<HTMLElement | null>(null)

async function selectChat(chat: any) {
  activeChat.value = chat
  const res = await $fetch<{ messages: any[] }>('/api/messages', { query: { with: chat.userId } })
  messages.value = res.messages
  await nextTick()
  if (msgContainer.value) msgContainer.value.scrollTop = msgContainer.value.scrollHeight
  refreshChats()
}

async function sendMsg() {
  if (!newMsg.value.trim() || !activeChat.value) return
  const msg = await $fetch('/api/messages', {
    method: 'POST',
    body: { toUserId: activeChat.value.userId, text: newMsg.value }
  }) as any
  messages.value.push(msg)
  newMsg.value = ''
  await nextTick()
  if (msgContainer.value) msgContainer.value.scrollTop = msgContainer.value.scrollHeight
}

useSeoMeta({ title: 'Сообщения — MedBeauty Board' })
</script>
