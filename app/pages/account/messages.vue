<template>
  <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 sm:py-10">

    <div>
      <!-- Desktop layout -->
      <div class="hidden sm:block">
        <div class="flex gap-6 h-[calc(100dvh-140px)] min-h-[520px]">
          <div class="w-72 shrink-0 bg-white rounded ring-1 ring-black/5 shadow-[0_2px_16px_rgba(45,77,58,0.06)] overflow-hidden flex flex-col">
            <div class="px-4 py-3.5 border-b border-black/5 flex items-center gap-2">
              <h3 class="font-bold text-[#2D4D3A] text-sm">{{ t('account.dialogs') }}</h3>
              <span v-if="chatsData?.chats?.length" class="text-xs text-[#5B5B5B]">· {{ chatsData.chats.length }}</span>
            </div>
            <div class="flex-1 overflow-y-auto p-2 space-y-1">
              <div v-if="!chatsData?.chats?.length" class="flex flex-col items-center text-center px-4 py-8">
                <div class="relative mb-4">
                  <div class="absolute inset-0 -m-4 rounded-full bg-gradient-to-br from-[#E0F7F6] via-[#F0FFFE] to-transparent blur-xl" aria-hidden="true"></div>
                  <div class="relative w-16 h-16 rounded-full bg-gradient-to-br from-[#E0F7F6] to-white flex items-center justify-center ring-1 ring-[#1EC3BD]/10">
                    <svg class="w-8 h-8 text-[#1EC3BD]" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M21 12a8 8 0 01-11.8 7.04L4 20l1.04-5.2A8 8 0 1121 12z"/>
                    </svg>
                  </div>
                </div>
                <p class="text-sm font-bold text-[#2D4D3A]">{{ t('account.noDialogs') }}</p>
              </div>
              <button v-for="chat in chatsData?.chats" :key="chat.userId" @click="selectChat(chat)"
                :class="['w-full text-left p-2.5 rounded ring-1 transition-all',
                  activeChat?.userId === chat.userId
                    ? 'ring-[#1EC3BD]/30 bg-gradient-to-br from-[#F0FFFE] to-white'
                    : 'ring-transparent hover:ring-[#1EC3BD]/20 hover:bg-[#f8faf9]']">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 overflow-hidden"
                    :style="userColor(chat.userName)">
                    <img v-if="chat.userAvatarUrl" :src="chat.userAvatarUrl" class="w-full h-full object-cover">
                    <span v-else>{{ chat.userName?.charAt(0) }}</span>
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="flex justify-between items-center gap-2">
                      <span class="font-bold text-[#2D4D3A] text-sm truncate">{{ chat.userName }}</span>
                      <span v-if="chat.unread > 0" class="bg-[#1EC3BD] text-white text-[11px] font-bold min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center shrink-0">{{ chat.unread }}</span>
                    </div>
                    <p class="text-xs text-[#5B5B5B] truncate mt-0.5">{{ chat.lastMessage || (chat.lastImageUrl ? t('account.imagePreview') : '') }}</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
          <div class="flex-1 bg-white rounded ring-1 ring-black/5 shadow-[0_2px_16px_rgba(45,77,58,0.06)] overflow-hidden flex flex-col">
            <div v-if="!activeChat" class="flex-1 flex items-center justify-center px-6">
              <div class="flex flex-col items-center text-center">
                <div class="relative mb-6">
                  <div class="absolute inset-0 -m-6 rounded-full bg-gradient-to-br from-[#E0F7F6] via-[#F0FFFE] to-transparent blur-xl" aria-hidden="true"></div>
                  <div class="relative w-24 h-24 rounded-full bg-gradient-to-br from-[#E0F7F6] to-white flex items-center justify-center ring-1 ring-[#1EC3BD]/10">
                    <svg class="w-12 h-12 text-[#1EC3BD]" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M21 12a8 8 0 01-11.8 7.04L4 20l1.04-5.2A8 8 0 1121 12z"/>
                    </svg>
                  </div>
                </div>
                <p class="text-lg font-bold text-[#2D4D3A]">{{ t('account.selectDialog') }}</p>
              </div>
            </div>
            <template v-else>
              <div class="px-4 py-3 border-b border-black/5 flex items-center gap-3">
                <div class="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold overflow-hidden"
                  :style="userColor(activeChat.userName)">
                  <img v-if="activeChat.userAvatarUrl" :src="activeChat.userAvatarUrl" class="w-full h-full object-cover">
                  <span v-else>{{ activeChat.userName?.charAt(0) }}</span>
                </div>
                <span class="font-bold text-[#2D4D3A]">{{ activeChat.userName }}</span>
              </div>
              <div ref="msgContainerDesktop" class="flex-1 px-4 py-5 space-y-2.5 overflow-y-auto bg-[#fafdfd]">
                <div v-for="msg in msgList" :key="msg.id" :class="['flex', msg.fromUserId === authStore.user?.id ? 'justify-end' : 'justify-start']">
                  <button v-if="msg.imageUrl" type="button" @click="openImage(msg.imageUrl)"
                    class="max-w-[70%] block rounded overflow-hidden cursor-zoom-in ring-1 ring-black/5">
                    <img :src="msg.imageUrl" class="block max-h-72 w-auto object-contain rounded">
                  </button>
                  <div v-else :class="['max-w-[70%] px-4 py-2.5 rounded text-sm leading-relaxed',
                    msg.fromUserId === authStore.user?.id
                      ? 'bg-[#02282C] text-white'
                      : 'bg-[#F0FFFE] text-[#2D4D3A] ring-1 ring-[#1EC3BD]/15']">
                    {{ msg.text }}
                  </div>
                </div>
                <div ref="msgEndDesktop"></div>
              </div>
              <div class="px-4 py-3 border-t border-black/5 flex gap-3 items-center bg-white">
                <button @click="fileInputDesktop?.click()" :disabled="uploading" :title="t('account.attachImage')"
                  class="text-[#5B5B5B] hover:text-[#02282C] transition-colors disabled:opacity-40 shrink-0 p-1.5 rounded hover:bg-[#F0FFFE]">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                    <path d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"/>
                  </svg>
                </button>
                <input ref="fileInputDesktop" type="file" accept="image/*" class="hidden" @change="onPickImage">
                <input v-model="newMsg" type="text" :placeholder="t('account.msgPlaceholder')" @keyup.enter="sendMsg" :disabled="uploading"
                  class="flex-1 border border-black/10 rounded px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1EC3BD] focus:border-transparent disabled:opacity-60">
                <button @click="sendMsg" :disabled="!newMsg.trim() || uploading"
                  class="bg-[#02282C] text-white px-5 py-2.5 rounded font-bold hover:bg-[#011a1d] transition-all disabled:opacity-40">
                  {{ t('account.send') }}
                </button>
              </div>
            </template>
          </div>
        </div>
      </div>

      <!-- Mobile layout: chat list (flows with page) -->
      <div v-if="!activeChat" class="sm:hidden flex flex-col bg-white min-h-[calc(100dvh-4rem)]">
          <div class="flex items-center gap-3 px-4 py-4 border-b border-black/5 bg-white shrink-0">
            <button @click="router.back()" class="text-[#5B5B5B] hover:text-[#02282C] transition-colors p-1 -ml-1">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                <path d="M15 19l-7-7 7-7"/>
              </svg>
            </button>
            <h2 class="text-2xl font-bold text-[#2D4D3A]">{{ t('account.dialogs') }}</h2>
            <span v-if="chatsData?.chats?.length" class="text-base text-[#5B5B5B]">· {{ chatsData.chats.length }}</span>
          </div>
          <div class="flex-1">
            <div v-if="!chatsData?.chats?.length" class="flex flex-col items-center text-center px-4 py-16">
              <div class="relative mb-6">
                <div class="absolute inset-0 -m-6 rounded-full bg-gradient-to-br from-[#E0F7F6] via-[#F0FFFE] to-transparent blur-xl" aria-hidden="true"></div>
                <div class="relative w-24 h-24 rounded-full bg-gradient-to-br from-[#E0F7F6] to-white flex items-center justify-center ring-1 ring-[#1EC3BD]/10">
                  <svg class="w-12 h-12 text-[#1EC3BD]" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M21 12a8 8 0 01-11.8 7.04L4 20l1.04-5.2A8 8 0 1121 12z"/>
                  </svg>
                </div>
              </div>
              <p class="text-lg font-bold text-[#2D4D3A]">{{ t('account.noDialogs') }}</p>
            </div>
            <button v-for="chat in chatsData?.chats" :key="chat.userId" @click="selectChat(chat)"
              class="w-full text-left px-4 py-4 border-b border-black/5 active:bg-[#F0FFFE] transition-colors">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shrink-0 overflow-hidden"
                  :style="userColor(chat.userName)">
                  <img v-if="chat.userAvatarUrl" :src="chat.userAvatarUrl" class="w-full h-full object-cover">
                  <span v-else>{{ chat.userName?.charAt(0) }}</span>
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex justify-between items-center gap-2 mb-0.5">
                    <span class="font-bold text-[#2D4D3A] text-base truncate">{{ chat.userName }}</span>
                    <span v-if="chat.unread > 0" class="bg-[#1EC3BD] text-white text-xs font-bold min-w-[20px] h-5 px-1.5 rounded-full flex items-center justify-center shrink-0">{{ chat.unread }}</span>
                  </div>
                  <p class="text-sm text-[#5B5B5B] truncate">{{ chat.lastMessage || (chat.lastImageUrl ? t('account.imagePreview') : '') }}</p>
                </div>
              </div>
            </button>
          </div>
          <div class="h-16 shrink-0"></div>
      </div>

      <!-- Mobile layout: active chat (fixed overlay above bottom nav) -->
      <div v-else class="sm:hidden fixed inset-x-0 top-0 bottom-16 z-30 bg-white flex flex-col">
          <div class="flex items-center gap-3 px-4 py-3 border-b border-black/5 shrink-0 bg-white">
            <button @click="activeChat = null" class="text-[#02282C] p-1 -ml-1">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                <path d="M15 19l-7-7 7-7"/>
              </svg>
            </button>
            <div class="w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0 overflow-hidden"
              :style="userColor(activeChat.userName)">
              <img v-if="activeChat.userAvatarUrl" :src="activeChat.userAvatarUrl" class="w-full h-full object-cover">
              <span v-else>{{ activeChat.userName?.charAt(0) }}</span>
            </div>
            <span class="font-bold text-[#2D4D3A] text-base truncate">{{ activeChat.userName }}</span>
          </div>

          <div ref="msgContainerMobile" class="flex-1 overflow-y-auto bg-[#fafdfd]">
            <div class="flex flex-col">
              <div class="p-4 space-y-2.5">
                <div v-for="msg in msgList" :key="msg.id" :class="['flex', msg.fromUserId === authStore.user?.id ? 'justify-end' : 'justify-start']">
                  <button v-if="msg.imageUrl" type="button" @click="openImage(msg.imageUrl)"
                    class="max-w-[80%] block rounded overflow-hidden cursor-zoom-in ring-1 ring-black/5">
                    <img :src="msg.imageUrl" class="block max-h-80 w-auto object-contain rounded">
                  </button>
                  <div v-else :class="['max-w-[80%] px-4 py-2.5 rounded text-sm leading-relaxed',
                    msg.fromUserId === authStore.user?.id
                      ? 'bg-[#02282C] text-white'
                      : 'bg-[#F0FFFE] text-[#2D4D3A] ring-1 ring-[#1EC3BD]/15']">
                    {{ msg.text }}
                  </div>
                </div>
                <div ref="msgEndMobile"></div>
              </div>
            </div>
          </div>

          <div class="px-3 py-3 border-t border-black/5 flex gap-2 shrink-0 items-center bg-white">
            <button @click="fileInputMobile?.click()" :disabled="uploading" :title="t('account.attachImage')"
              class="text-[#5B5B5B] hover:text-[#02282C] transition-colors disabled:opacity-40 shrink-0 p-1.5 rounded hover:bg-[#F0FFFE]">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                <path d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"/>
              </svg>
            </button>
            <input ref="fileInputMobile" type="file" accept="image/*" class="hidden" @change="onPickImage">
            <input v-model="newMsg" type="text" :placeholder="t('account.msgPlaceholder')" @keyup.enter="sendMsg" :disabled="uploading"
              class="flex-1 min-w-0 border border-black/10 rounded px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#1EC3BD] focus:border-transparent disabled:opacity-60">
            <button @click="sendMsg" :disabled="!newMsg.trim() || uploading"
              class="bg-[#02282C] text-white px-4 py-3 rounded font-bold hover:bg-[#011a1d] disabled:opacity-40 flex items-center justify-center shrink-0 transition-all">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
              </svg>
            </button>
          </div>
      </div>
    </div>

    <ImageLightbox
      v-model:open="lightboxOpen"
      :images="chatImages"
      :initial-index="lightboxIndex" />
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
  chats: Array<{ userId: number; userName: string; userAvatarUrl: string | null; lastMessage: string; lastImageUrl: string | null; createdAt: string; unread: number }>
}>('/api/messages')

const activeChat = ref<any>(null)
const msgList = ref<any[]>([])
const newMsg = ref('')
const uploading = ref(false)
const msgContainerDesktop = ref<HTMLElement | null>(null)
const msgContainerMobile = ref<HTMLElement | null>(null)
const msgEndDesktop = ref<HTMLElement | null>(null)
const msgEndMobile = ref<HTMLElement | null>(null)
const fileInputDesktop = ref<HTMLInputElement | null>(null)
const fileInputMobile = ref<HTMLInputElement | null>(null)

const lightboxOpen = ref(false)
const lightboxIndex = ref(0)
const chatImages = computed(() => msgList.value.filter(m => m.imageUrl).map(m => m.imageUrl as string))
function openImage(url: string) {
  const i = chatImages.value.indexOf(url)
  lightboxIndex.value = i >= 0 ? i : 0
  lightboxOpen.value = true
}

function scrollToBottom() {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const el = msgContainerDesktop.value || msgContainerMobile.value
      if (el) el.scrollTop = el.scrollHeight
    })
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
  await nextTick()
  scrollToBottom()
  refreshChats()
}

async function onPickImage(e: Event) {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  input.value = ''
  if (!file || !activeChat.value) return
  if (!file.type.startsWith('image/')) return
  uploading.value = true
  try {
    const fd = new FormData()
    fd.append('file', file)
    const { url } = await $fetch<{ url: string }>('/api/upload', { method: 'POST', body: fd })
    const msg = await $fetch('/api/messages', {
      method: 'POST',
      body: { toUserId: activeChat.value.userId, imageUrl: url }
    }) as any
    msgList.value.push(msg)
    await nextTick()
    scrollToBottom()
    refreshChats()
  } finally {
    uploading.value = false
  }
}

useSeoMeta({ title: () => `${t('nav.messages')} — BeautyMaster` })
</script>
