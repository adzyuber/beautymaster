<template>
  <!-- Mobile: фиксированная высота = viewport - header, страница не скроллится -->
  <div class="sm:hidden flex flex-col overflow-hidden" style="position: fixed; top: 120px; left: 0; right: 0; bottom: 0; z-index: 10">
    <div class="px-4 pt-4 pb-3 shrink-0">
      <h1 class="text-xl font-bold text-[#2D4D3A]">Messages</h1>
    </div>

    <div v-if="loadingConvs" class="mx-4 mb-4 flex-1 bg-white rounded shadow-[0_2px_16px_rgba(45,77,58,0.07)] animate-pulse"></div>

    <div v-else-if="!conversations.length" class="mx-4 mb-4 flex-1 bg-white rounded shadow-[0_2px_16px_rgba(45,77,58,0.07)] flex items-center justify-center text-[#5B5B5B]">
      No conversations yet
    </div>

    <div v-else class="flex-1 min-h-0 px-4 pb-4">
      <!-- Thread view -->
      <div v-if="showThread && active" class="h-full bg-white rounded shadow-[0_2px_16px_rgba(45,77,58,0.07)] overflow-hidden flex flex-col">
        <div class="p-3 border-b border-gray-100 shrink-0">
          <button @click="showThread = false"
            class="flex items-center gap-1 text-sm text-[#5B5B5B] hover:text-[#2D4D3A] mb-2 transition-colors">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
            Back
          </button>
          <div class="flex items-center gap-3">
            <div class="flex -space-x-2">
              <div class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ring-2 ring-white overflow-hidden"
                :style="userColor(active.user1.name)">
                <img v-if="active.user1.avatarUrl" :src="active.user1.avatarUrl" class="w-full h-full object-cover">
                <span v-else>{{ active.user1.name.charAt(0) }}</span>
              </div>
              <div class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ring-2 ring-white overflow-hidden"
                :style="userColor(active.user2.name)">
                <img v-if="active.user2.avatarUrl" :src="active.user2.avatarUrl" class="w-full h-full object-cover">
                <span v-else>{{ active.user2.name.charAt(0) }}</span>
              </div>
            </div>
            <div>
              <div class="font-bold text-[#2D4D3A] text-sm">{{ active.user1.name }} & {{ active.user2.name }}</div>
              <div class="text-xs text-[#5B5B5B]">{{ active.count }} messages</div>
            </div>
          </div>
        </div>
        <div v-if="loadingMsgs" class="flex-1 flex items-center justify-center">
          <div class="text-[#5B5B5B] text-sm">Loading...</div>
        </div>
        <div v-else ref="msgContainerMobile" class="flex-1 min-h-0 overflow-y-auto p-4 space-y-2">
          <div v-for="msg in messages" :key="msg.id">
            <div :class="['flex gap-2 items-end', msg.fromUser.id === active.user1.id ? 'justify-start' : 'justify-end']">
              <div v-if="msg.fromUser.id === active.user1.id"
                class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mb-0.5 overflow-hidden"
                :style="userColor(msg.fromUser.name)">
                <img v-if="msg.fromUser.avatarUrl" :src="msg.fromUser.avatarUrl" class="w-full h-full object-cover">
                <span v-else>{{ msg.fromUser.name.charAt(0) }}</span>
              </div>
              <div class="max-w-[75%]">
                <div class="text-[10px] text-gray-400 mb-1 px-1"
                  :class="msg.fromUser.id === active.user1.id ? 'text-left' : 'text-right'">
                  {{ msg.fromUser.name }} · {{ formatTime(msg.createdAt) }}
                </div>
                <div :class="['px-3 py-2 rounded text-sm leading-relaxed',
                  msg.fromUser.id === active.user1.id
                    ? 'bg-gray-100 text-[#2D4D3A] rounded-tl-none'
                    : 'bg-[#8FD9A8]/40 text-[#2D4D3A] rounded-tr-none']">
                  {{ msg.text }}
                </div>
              </div>
              <div v-if="msg.fromUser.id === active.user2.id"
                class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mb-0.5 overflow-hidden"
                :style="userColor(msg.fromUser.name)">
                <img v-if="msg.fromUser.avatarUrl" :src="msg.fromUser.avatarUrl" class="w-full h-full object-cover">
                <span v-else>{{ msg.fromUser.name.charAt(0) }}</span>
              </div>
            </div>
          </div>
          <div ref="msgEndMobile"></div>
        </div>
      </div>

      <!-- Conversation list -->
      <div v-else class="h-full bg-white rounded shadow-[0_2px_16px_rgba(45,77,58,0.07)] overflow-hidden flex flex-col">
        <div class="border-b border-gray-100 shrink-0">
          <div class="flex items-center justify-between px-4 py-2.5">
            <span class="text-sm font-semibold text-[#2D4D3A]">Conversations</span>
            <button
              @click="searchOpen = !searchOpen"
              class="w-7 h-7 flex items-center justify-center rounded-lg transition-colors"
              :class="searchOpen ? 'bg-[#1EC3BD]/15 text-[#1EC3BD]' : 'text-gray-400 hover:bg-gray-100'"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z"/>
              </svg>
            </button>
          </div>
          <div v-show="searchOpen" class="px-4 pb-3">
            <input
              v-model="search"
              type="text"
              placeholder="Search users..."
              class="w-full px-3 py-2 border border-gray-200 rounded text-sm outline-none focus:border-[#1EC3BD]"
            />
          </div>
        </div>
        <div class="flex-1 min-h-0 overflow-y-auto">
          <button
            v-for="conv in filteredConversations" :key="conv.key"
            @click="selectConversation(conv)"
            class="w-full text-left p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors"
          >
            <div class="flex items-start gap-2.5">
              <div class="flex -space-x-2 shrink-0 mt-0.5">
                <div class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ring-2 ring-white overflow-hidden"
                  :style="userColor(conv.user1.name)">
                  <img v-if="conv.user1.avatarUrl" :src="conv.user1.avatarUrl" class="w-full h-full object-cover">
                  <span v-else>{{ conv.user1.name.charAt(0) }}</span>
                </div>
                <div class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ring-2 ring-white overflow-hidden"
                  :style="userColor(conv.user2.name)">
                  <img v-if="conv.user2.avatarUrl" :src="conv.user2.avatarUrl" class="w-full h-full object-cover">
                  <span v-else>{{ conv.user2.name.charAt(0) }}</span>
                </div>
              </div>
              <div class="flex-1 min-w-0">
                <div class="text-xs font-semibold text-[#2D4D3A] truncate">
                  {{ conv.user1.name }} & {{ conv.user2.name }}
                </div>
                <div class="text-xs text-[#5B5B5B] truncate mt-0.5">{{ conv.lastMessage }}</div>
                <div class="flex items-center justify-between mt-1">
                  <span class="text-[10px] text-gray-400">{{ formatDate(conv.lastAt) }}</span>
                  <span class="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-full">{{ conv.count }} msg</span>
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Desktop: side by side, без изменений -->
  <div class="hidden sm:block max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-[#2D4D3A]">Messages</h1>
    </div>

    <div v-if="loadingConvs" class="flex gap-4 h-[580px]">
      <div class="w-72 bg-white rounded shadow-[0_2px_16px_rgba(45,77,58,0.07)] animate-pulse"></div>
      <div class="flex-1 bg-white rounded shadow-[0_2px_16px_rgba(45,77,58,0.07)] animate-pulse"></div>
    </div>

    <div v-else-if="!conversations.length" class="bg-white rounded shadow-[0_2px_16px_rgba(45,77,58,0.07)] p-12 text-center text-[#5B5B5B]">
      No conversations yet
    </div>

    <div v-else class="flex gap-4 h-[580px]">
      <div class="w-72 shrink-0 bg-white rounded shadow-[0_2px_16px_rgba(45,77,58,0.07)] overflow-hidden flex flex-col">
        <div class="p-4 border-b border-gray-100">
          <input
            v-model="search"
            type="text"
            placeholder="Search users..."
            class="w-full px-3 py-2 border border-gray-200 rounded text-sm outline-none focus:border-[#1EC3BD]"
          />
        </div>
        <div class="flex-1 overflow-y-auto">
          <button
            v-for="conv in filteredConversations" :key="conv.key"
            @click="selectConversation(conv)"
            :class="['w-full text-left p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors',
              active?.key === conv.key ? 'bg-[#8FD9A8]/10 border-l-4 border-l-[#2D4D3A]' : '']"
          >
            <div class="flex items-start gap-2.5">
              <div class="flex -space-x-2 shrink-0 mt-0.5">
                <div class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ring-2 ring-white overflow-hidden"
                  :style="userColor(conv.user1.name)">
                  <img v-if="conv.user1.avatarUrl" :src="conv.user1.avatarUrl" class="w-full h-full object-cover">
                  <span v-else>{{ conv.user1.name.charAt(0) }}</span>
                </div>
                <div class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ring-2 ring-white overflow-hidden"
                  :style="userColor(conv.user2.name)">
                  <img v-if="conv.user2.avatarUrl" :src="conv.user2.avatarUrl" class="w-full h-full object-cover">
                  <span v-else>{{ conv.user2.name.charAt(0) }}</span>
                </div>
              </div>
              <div class="flex-1 min-w-0">
                <div class="text-xs font-semibold text-[#2D4D3A] truncate">
                  {{ conv.user1.name }} & {{ conv.user2.name }}
                </div>
                <div class="text-xs text-[#5B5B5B] truncate mt-0.5">{{ conv.lastMessage }}</div>
                <div class="flex items-center justify-between mt-1">
                  <span class="text-[10px] text-gray-400">{{ formatDate(conv.lastAt) }}</span>
                  <span class="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-full">{{ conv.count }} msg</span>
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>

      <div class="flex-1 bg-white rounded shadow-[0_2px_16px_rgba(45,77,58,0.07)] overflow-hidden flex flex-col">
        <div v-if="!active" class="flex-1 flex items-center justify-center text-[#5B5B5B]">
          <div class="text-center">
            <div class="text-4xl mb-3">💬</div>
            <p class="text-sm">Select a conversation to view</p>
          </div>
        </div>
        <template v-else>
          <div class="p-4 border-b border-gray-100 flex items-center gap-3">
            <div class="flex -space-x-2">
              <div class="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold ring-2 ring-white overflow-hidden"
                :style="userColor(active.user1.name)">
                <img v-if="active.user1.avatarUrl" :src="active.user1.avatarUrl" class="w-full h-full object-cover">
                <span v-else>{{ active.user1.name.charAt(0) }}</span>
              </div>
              <div class="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold ring-2 ring-white overflow-hidden"
                :style="userColor(active.user2.name)">
                <img v-if="active.user2.avatarUrl" :src="active.user2.avatarUrl" class="w-full h-full object-cover">
                <span v-else>{{ active.user2.name.charAt(0) }}</span>
              </div>
            </div>
            <div>
              <div class="font-bold text-[#2D4D3A] text-sm">{{ active.user1.name }} & {{ active.user2.name }}</div>
              <div class="text-xs text-[#5B5B5B]">{{ active.count }} messages</div>
            </div>
          </div>
          <div v-if="loadingMsgs" class="flex-1 flex items-center justify-center">
            <div class="text-[#5B5B5B] text-sm">Loading...</div>
          </div>
          <div v-else ref="msgContainer" class="flex-1 overflow-y-auto p-4 space-y-2">
            <div v-for="msg in messages" :key="msg.id">
              <div :class="['flex gap-2 items-end', msg.fromUser.id === active.user1.id ? 'justify-start' : 'justify-end']">
                <div v-if="msg.fromUser.id === active.user1.id"
                  class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mb-0.5 overflow-hidden"
                  :style="userColor(msg.fromUser.name)">
                  <img v-if="msg.fromUser.avatarUrl" :src="msg.fromUser.avatarUrl" class="w-full h-full object-cover">
                  <span v-else>{{ msg.fromUser.name.charAt(0) }}</span>
                </div>
                <div class="max-w-[65%]">
                  <div class="text-[10px] text-gray-400 mb-1 px-1"
                    :class="msg.fromUser.id === active.user1.id ? 'text-left' : 'text-right'">
                    {{ msg.fromUser.name }} · {{ formatTime(msg.createdAt) }}
                  </div>
                  <div :class="['px-3 py-2 rounded text-sm leading-relaxed',
                    msg.fromUser.id === active.user1.id
                      ? 'bg-gray-100 text-[#2D4D3A] rounded-tl-none'
                      : 'bg-[#8FD9A8]/40 text-[#2D4D3A] rounded-tr-none']">
                    {{ msg.text }}
                  </div>
                </div>
                <div v-if="msg.fromUser.id === active.user2.id"
                  class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mb-0.5 overflow-hidden"
                  :style="userColor(msg.fromUser.name)">
                  <img v-if="msg.fromUser.avatarUrl" :src="msg.fromUser.avatarUrl" class="w-full h-full object-cover">
                  <span v-else>{{ msg.fromUser.name.charAt(0) }}</span>
                </div>
              </div>
            </div>
            <div ref="msgEnd"></div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { userColor } from '~/utils/userColor'
definePageMeta({ layout: 'admin', middleware: 'admin' })
useSeoMeta({ title: 'Messages — BeautyMaster Admin' })

onMounted(() => {
  window.scrollTo(0, 0)
  document.body.style.overflow = 'hidden'
  const main = document.querySelector('main')
  if (main) (main as HTMLElement).style.overflow = 'hidden'
})
onUnmounted(() => {
  document.body.style.overflow = ''
  const main = document.querySelector('main')
  if (main) (main as HTMLElement).style.overflow = ''
})

const conversations = ref<any[]>([])
const loadingConvs = ref(true)
const active = ref<any>(null)
const messages = ref<any[]>([])
const loadingMsgs = ref(false)
const search = ref('')
const showThread = ref(false)
const searchOpen = ref(false)
const msgContainer = ref<HTMLElement | null>(null)
const msgEnd = ref<HTMLElement | null>(null)
const msgContainerMobile = ref<HTMLElement | null>(null)
const msgEndMobile = ref<HTMLElement | null>(null)

const filteredConversations = computed(() => {
  if (!search.value.trim()) return conversations.value
  const q = search.value.toLowerCase()
  return conversations.value.filter(c =>
    c.user1.name.toLowerCase().includes(q) || c.user2.name.toLowerCase().includes(q)
  )
})

onMounted(async () => {
  const res = await $fetch<any>('/api/admin/messages')
  conversations.value = res.conversations
  loadingConvs.value = false
})

async function selectConversation(conv: any) {
  showThread.value = true
  active.value = conv
  loadingMsgs.value = true
  messages.value = []
  const res = await $fetch<any>('/api/admin/messages/conversation', {
    query: { user1: conv.user1.id, user2: conv.user2.id }
  })
  messages.value = res.messages
  loadingMsgs.value = false
  await nextTick()
  if (msgContainer.value) msgContainer.value.scrollTop = msgContainer.value.scrollHeight
  if (msgContainerMobile.value) msgContainerMobile.value.scrollTop = msgContainerMobile.value.scrollHeight
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })
}

function formatTime(d: string) {
  const dt = new Date(d)
  return dt.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' }) + ' ' +
    dt.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
}
</script>
