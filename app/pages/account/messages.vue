<template>
  <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 sm:py-10">

    <div>
      <!-- Desktop layout -->
      <div class="hidden sm:flex gap-6 min-h-[600px]">
        <div class="w-72 shrink-0 bg-white rounded shadow-[0_2px_16px_rgba(45,77,58,0.07)] overflow-hidden flex flex-col">
          <div class="p-4 border-b border-gray-100">
            <h3 class="font-bold text-[#2D4D3A] text-sm">{{ t('account.dialogs') }}</h3>
          </div>
          <div class="flex-1">
            <div v-if="!chatsData?.chats?.length" class="p-6 text-center text-[#5B5B5B] text-sm">{{ t('account.noDialogs') }}</div>
            <button v-for="chat in chatsData?.chats" :key="chat.userId" @click="selectChat(chat)"
              :class="['w-full text-left p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors',
                activeChat?.userId === chat.userId ? 'bg-[#8FD9A8]/10 border-l-4 border-l-[#2D4D3A]' : '']">
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0 overflow-hidden"
                  :style="userColor(chat.userName)">
                  <img v-if="chat.userAvatarUrl" :src="chat.userAvatarUrl" class="w-full h-full object-cover">
                  <span v-else>{{ chat.userName?.charAt(0) }}</span>
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
        <div class="flex-1 bg-white rounded shadow-[0_2px_16px_rgba(45,77,58,0.07)] overflow-hidden flex flex-col">
          <div v-if="!activeChat" class="flex-1 flex items-center justify-center text-[#5B5B5B]">
            <div class="text-center"><div class="text-4xl mb-3">💬</div><p>{{ t('account.selectDialog') }}</p></div>
          </div>
          <template v-else>
            <div class="p-4 border-b border-gray-100 flex items-center gap-3">
              <div class="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold overflow-hidden"
                :style="userColor(activeChat.userName)">
                <img v-if="activeChat.userAvatarUrl" :src="activeChat.userAvatarUrl" class="w-full h-full object-cover">
                <span v-else>{{ activeChat.userName?.charAt(0) }}</span>
              </div>
              <span class="font-bold text-[#2D4D3A]">{{ activeChat.userName }}</span>
            </div>
            <div ref="msgContainerDesktop" class="flex-1 p-4 space-y-3">
              <div v-for="msg in msgList" :key="msg.id" :class="['flex', msg.fromUserId === authStore.user?.id ? 'justify-end' : 'justify-start']">
                <div :class="['max-w-[70%] px-4 py-2.5 rounded text-sm', msg.fromUserId === authStore.user?.id ? 'bg-[#8FD9A8] text-[#2D4D3A]' : 'bg-gray-100 text-[#2D4D3A]']">{{ msg.text }}</div>
              </div>
              <div ref="msgEndDesktop"></div>
            </div>
            <div class="p-4 border-t border-gray-100 flex gap-3">
              <input v-model="newMsg" type="text" :placeholder="t('account.msgPlaceholder')" @keyup.enter="sendMsg"
                class="flex-1 border border-gray-200 rounded px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1EC3BD]">
              <button @click="sendMsg" :disabled="!newMsg.trim()"
                class="bg-[#02282C] text-white px-5 py-2.5 rounded font-bold hover:bg-[#011a1d] transition-all disabled:opacity-40">
                {{ t('account.send') }}
              </button>
            </div>
          </template>
        </div>
      </div>

      <!-- Mobile layout -->
      <div class="sm:hidden flex flex-col bg-white min-h-[calc(100dvh-4rem)]">

        <!-- Chat list -->
        <template v-if="!activeChat">
          <div class="flex items-center gap-3 px-4 py-4 border-b border-gray-100 bg-white shrink-0">
            <button @click="router.back()" class="text-gray-500 hover:text-gray-800 transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
              </svg>
            </button>
            <h2 class="text-2xl font-bold text-[#02282C]">{{ t('account.dialogs') }}</h2>
          </div>
          <div class="flex-1">
            <div v-if="!chatsData?.chats?.length" class="p-8 text-center text-[#5B5B5B]">{{ t('account.noDialogs') }}</div>
            <button v-for="chat in chatsData?.chats" :key="chat.userId" @click="selectChat(chat)"
              class="w-full text-left px-4 py-4 border-b border-gray-100 active:bg-gray-50 transition-colors">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shrink-0 overflow-hidden"
                  :style="userColor(chat.userName)">
                  <img v-if="chat.userAvatarUrl" :src="chat.userAvatarUrl" class="w-full h-full object-cover">
                  <span v-else>{{ chat.userName?.charAt(0) }}</span>
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex justify-between items-center mb-0.5">
                    <span class="font-bold text-[#2D4D3A] text-base truncate">{{ chat.userName }}</span>
                    <span v-if="chat.unread > 0" class="bg-[#02282C] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center shrink-0 ml-2">{{ chat.unread }}</span>
                  </div>
                  <p class="text-sm text-[#5B5B5B] truncate">{{ chat.lastMessage }}</p>
                </div>
              </div>
            </button>
          </div>
          <div class="h-16 shrink-0"></div>
        </template>

        <!-- Active chat -->
        <template v-else>
          <div class="flex items-center gap-3 px-4 py-3 border-b border-gray-100 shrink-0">
            <button @click="activeChat = null" class="text-[#02282C] p-1 -ml-1">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
              </svg>
            </button>
            <div class="w-9 h-9 rounded-full flex items-center justify-center font-bold shrink-0 overflow-hidden"
              :style="userColor(activeChat.userName)">
              <img v-if="activeChat.userAvatarUrl" :src="activeChat.userAvatarUrl" class="w-full h-full object-cover">
              <span v-else>{{ activeChat.userName?.charAt(0) }}</span>
            </div>
            <span class="font-bold text-[#2D4D3A] text-base truncate">{{ activeChat.userName }}</span>
          </div>

          <div ref="msgContainerMobile" class="flex-1">
            <div class="flex flex-col">
              <div class="p-4 space-y-3">
                <div v-for="msg in msgList" :key="msg.id" :class="['flex', msg.fromUserId === authStore.user?.id ? 'justify-end' : 'justify-start']">
                  <div :class="['max-w-[80%] px-4 py-3 rounded text-sm leading-relaxed',
                    msg.fromUserId === authStore.user?.id ? 'bg-[#02282C] text-white' : 'bg-gray-100 text-[#2D4D3A]']">
                    {{ msg.text }}
                  </div>
                </div>
                <div ref="msgEndMobile"></div>
              </div>
            </div>
          </div>

          <div class="px-3 py-3 border-t border-gray-100 flex gap-2 shrink-0">
            <input v-model="newMsg" type="text" :placeholder="t('account.msgPlaceholder')" @keyup.enter="sendMsg"
              class="flex-1 min-w-0 border border-gray-200 rounded px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#1EC3BD]">
            <button @click="sendMsg" :disabled="!newMsg.trim()"
              class="bg-[#02282C] text-white px-4 py-3 rounded font-bold disabled:opacity-40 flex items-center justify-center shrink-0">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
              </svg>
            </button>
          </div>
          <div class="h-16 shrink-0"></div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
import { userColor } from '~/utils/userColor'
const { t } = useLocale()
const authStore = useAuthStore()
const route = useRoute()
const router = useRouter()

if (!authStore.isLoggedIn) {
  await navigateTo(`/login?redirect=${encodeURIComponent(route.fullPath)}`)
}
const { fetchUnread } = useUnreadCount()

const { data: chatsData, refresh: refreshChats } = await useFetch<{
  chats: Array<{ userId: number; userName: string; userAvatarUrl: string | null; lastMessage: string; createdAt: string; unread: number }>
}>('/api/messages')

const activeChat = ref<any>(null)
const msgList = ref<any[]>([])
const newMsg = ref('')
const msgContainerDesktop = ref<HTMLElement | null>(null)
const msgContainerMobile = ref<HTMLElement | null>(null)
const msgEndDesktop = ref<HTMLElement | null>(null)
const msgEndMobile = ref<HTMLElement | null>(null)

function scrollToBottom() {
  requestAnimationFrame(() => {
    const sentinel = msgEndMobile.value || msgEndDesktop.value
    if (sentinel) {
      sentinel.scrollIntoView({ behavior: 'auto', block: 'end' })
      return
    }
    const el = msgContainerMobile.value || msgContainerDesktop.value
    if (el) el.scrollTop = el.scrollHeight
  })
}

watch(() => msgList.value.length, async () => {
  await nextTick()
  scrollToBottom()
})

watch(activeChat, async (v) => {
  if (!v) return
  await nextTick()
  scrollToBottom()
})

async function selectChat(chat: any) {
  activeChat.value = chat
  const res = await $fetch<{ messages: any[] }>('/api/messages', { query: { with: chat.userId } })
  msgList.value = res.messages
  refreshChats()
  fetchUnread()
}

async function sendMsg() {
  if (!newMsg.value.trim() || !activeChat.value) return
  const msg = await $fetch('/api/messages', {
    method: 'POST',
    body: { toUserId: activeChat.value.userId, text: newMsg.value }
  }) as any
  msgList.value.push(msg)
  newMsg.value = ''
}

useSeoMeta({ title: () => `${t('nav.messages')} — BeautyMaster` })
</script>
