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
              <div v-for="chat in chatsData?.chats" :key="chat.userId" class="group relative">
                <button @click="selectChat(chat)"
                  :class="['w-full text-left p-2.5 pr-9 rounded ring-1 transition-all',
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
                <button type="button" @click.stop="askDeleteChat(chat)"
                  class="absolute top-1/2 -translate-y-1/2 right-1.5 w-7 h-7 rounded-full text-[#5B5B5B]/60 hover:text-red-500 hover:bg-red-50 transition-all flex items-center justify-center opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto focus:opacity-100 focus:pointer-events-auto"
                  :aria-label="t('account.deleteChat')">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M6 6l12 12M6 18L18 6"/>
                  </svg>
                </button>
              </div>
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
                      ? 'bg-[#FFF1EC] text-[#2D4D3A] ring-1 ring-[#F4B59F]/25'
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
              <h2 class="text-xl font-bold text-[#2D4D3A]">{{ t('account.noDialogs') }}</h2>
              <p class="text-sm text-[#5B5B5B] mt-2 max-w-[260px] leading-relaxed">{{ t('account.noDialogsDesc') }}</p>
            </div>
            <div v-for="chat in chatsData?.chats" :key="chat.userId"
              class="relative border-b border-black/5 overflow-hidden bg-white">
              <button type="button"
                @click="askDeleteChat(chat)"
                class="absolute inset-y-0 right-0 w-20 bg-red-500 text-white flex items-center justify-center"
                :aria-label="t('account.deleteChat')">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6 6l12 12M6 18L18 6"/>
                </svg>
              </button>
              <button type="button" @click="onChatRowClick(chat)"
                @touchstart.passive="onSwipeStart($event, chat.userId)"
                @touchmove.passive="onSwipeMove($event, chat.userId)"
                @touchend="onSwipeEnd(chat.userId)"
                class="relative w-full text-left px-4 py-4 active:bg-[#F0FFFE] bg-white transition-transform duration-200 ease-out"
                :style="{ transform: `translateX(${swipeOffsetFor(chat.userId)}px)` }">
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
                      ? 'bg-[#FFF1EC] text-[#2D4D3A] ring-1 ring-[#F4B59F]/25'
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

    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-150 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0">
        <div v-if="chatToDelete" class="fixed inset-0 z-[60] bg-[#02282C]/40 backdrop-blur-[2px] flex items-center justify-center px-4"
          @click.self="chatToDelete = null">
          <Transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="opacity-0 translate-y-2 scale-[0.98]"
            enter-to-class="opacity-100 translate-y-0 scale-100"
            leave-active-class="transition duration-150 ease-in"
            leave-from-class="opacity-100 translate-y-0 scale-100"
            leave-to-class="opacity-0 translate-y-2 scale-[0.98]">
            <div v-if="chatToDelete"
              class="relative bg-white rounded ring-1 ring-black/5 shadow-[0_8px_24px_rgba(2,40,44,0.12),0_2px_8px_rgba(2,40,44,0.06)] w-full max-w-md overflow-hidden">
              <button type="button" @click="chatToDelete = null"
                class="absolute top-3 right-3 w-8 h-8 rounded-full text-[#5B5B5B]/60 hover:text-[#02282C] hover:bg-[#F0FFFE] transition-colors flex items-center justify-center"
                :aria-label="t('common.cancel')">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6 6l12 12M6 18L18 6"/>
                </svg>
              </button>
              <div class="px-6 pt-9 pb-2 flex flex-col items-center text-center">
                <div class="relative mb-5">
                  <div class="absolute inset-0 -m-5 rounded-full bg-gradient-to-br from-[#FFE6E0] via-[#FFF1EC] to-transparent blur-xl" aria-hidden="true"></div>
                  <div class="relative w-20 h-20 rounded-full bg-gradient-to-br from-[#FFF1EC] to-white flex items-center justify-center ring-1 ring-[#F4B59F]/30">
                    <svg class="w-10 h-10 text-[#E5734B]" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M4 7h16M10 11v6M14 11v6M5 7l1 13a2 2 0 002 2h8a2 2 0 002-2l1-13M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3"/>
                    </svg>
                  </div>
                </div>
                <h3 class="text-xl font-bold text-[#2D4D3A]">{{ t('account.deleteChatTitle') }}</h3>
                <p class="text-sm text-[#5B5B5B] mt-2 leading-relaxed max-w-sm">
                  {{ t('account.deleteChatDesc', { name: chatToDelete.userName }) }}
                </p>
              </div>
              <div class="px-6 pt-5 pb-6 flex flex-col sm:flex-row-reverse gap-2.5">
                <button type="button" @click="confirmDeleteChat" :disabled="deleting"
                  class="flex-1 px-5 py-3 rounded font-bold text-white bg-[#02282C] hover:bg-[#011a1d] transition-colors disabled:opacity-50">
                  {{ deleting ? '...' : t('account.delete') }}
                </button>
                <button type="button" @click="chatToDelete = null" :disabled="deleting"
                  class="flex-1 px-5 py-3 rounded font-bold text-[#02282C] ring-1 ring-black/10 hover:bg-[#F0FFFE] hover:ring-[#1EC3BD]/30 transition-all disabled:opacity-50">
                  {{ t('common.cancel') }}
                </button>
              </div>
            </div>
          </Transition>
        </div>
      </Transition>
    </Teleport>
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

const chatToDelete = ref<any>(null)
const deleting = ref(false)
const swipedChatId = ref<number | null>(null)
const swipeStartX = ref(0)
const swipeBaseDx = ref(0)
const swipeDx = ref(0)
const SWIPE_REVEAL = 80
const SWIPE_THRESHOLD = 40

function askDeleteChat(chat: any) {
  swipedChatId.value = null
  swipeDx.value = 0
  chatToDelete.value = chat
}

async function confirmDeleteChat() {
  if (!chatToDelete.value || deleting.value) return
  const userId = chatToDelete.value.userId
  deleting.value = true
  try {
    await $fetch(`/api/messages/${userId}`, { method: 'DELETE' })
    if (chatsData.value?.chats) {
      chatsData.value = {
        ...chatsData.value,
        chats: chatsData.value.chats.filter((c: any) => c.userId !== userId)
      }
    }
    if (activeChat.value?.userId === userId) {
      activeChat.value = null
      msgList.value = []
    }
    chatToDelete.value = null
    fetchUnread()
  } finally {
    deleting.value = false
  }
}

function swipeOffsetFor(userId: number) {
  if (swipedChatId.value !== userId) return 0
  return swipeDx.value
}

function onSwipeStart(e: TouchEvent, userId: number) {
  if (swipedChatId.value && swipedChatId.value !== userId) {
    swipedChatId.value = null
    swipeDx.value = 0
  }
  swipeStartX.value = e.touches[0].clientX
  swipeBaseDx.value = swipedChatId.value === userId ? -SWIPE_REVEAL : 0
}

function onSwipeMove(e: TouchEvent, userId: number) {
  const dx = e.touches[0].clientX - swipeStartX.value
  let next = swipeBaseDx.value + dx
  if (next > 0) next = 0
  if (next < -SWIPE_REVEAL - 20) next = -SWIPE_REVEAL - 20
  swipeDx.value = next
  swipedChatId.value = userId
}

function onSwipeEnd(userId: number) {
  if (swipeDx.value <= -SWIPE_THRESHOLD) {
    swipedChatId.value = userId
    swipeDx.value = -SWIPE_REVEAL
  } else {
    swipedChatId.value = null
    swipeDx.value = 0
  }
}

function onChatRowClick(chat: any) {
  if (swipedChatId.value === chat.userId) {
    swipedChatId.value = null
    swipeDx.value = 0
    return
  }
  selectChat(chat)
}
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
