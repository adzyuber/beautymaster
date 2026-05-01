<template>
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center gap-3">
        <NuxtLink to="/admin" class="text-sm text-[#5B5B5B] hover:text-[#2D4D3A]">← Admin</NuxtLink>
        <h1 class="text-2xl font-bold text-[#2D4D3A]">Users</h1>
      </div>
    </div>

    <div class="bg-white rounded shadow-[0_2px_16px_rgba(45,77,58,0.07)] p-4 mb-6">
      <input
        v-model="search"
        type="text"
        placeholder="Search by name or email..."
        class="w-full px-4 py-2.5 border border-gray-200 rounded text-sm outline-none transition-all duration-200 focus:border-[#1EC3BD] focus:shadow-[0_0_0_3px_rgba(30,195,189,0.12)]"
        @input="onSearch"
      />
    </div>

    <div v-if="pending" class="space-y-3">
      <div v-for="i in 5" :key="i" class="bg-white rounded h-16 animate-pulse"></div>
    </div>

    <div v-else-if="!data?.users?.length" class="bg-white rounded shadow-[0_2px_16px_rgba(45,77,58,0.07)] p-12 text-center text-[#5B5B5B]">
      No users found
    </div>

    <div v-else class="bg-white rounded shadow-[0_2px_16px_rgba(45,77,58,0.07)] overflow-hidden">
      <table class="w-full text-sm">
        <thead class="bg-[#f8faf9] border-b border-gray-100">
          <tr>
            <th class="text-left px-4 py-3 font-semibold text-[#2D4D3A]">User</th>
            <th class="text-left px-4 py-3 font-semibold text-[#2D4D3A] hidden sm:table-cell">Email</th>
            <th class="text-left px-4 py-3 font-semibold text-[#2D4D3A] hidden md:table-cell">Listings</th>
            <th class="text-left px-4 py-3 font-semibold text-[#2D4D3A]">Role</th>
            <th class="text-left px-4 py-3 font-semibold text-[#2D4D3A] hidden sm:table-cell">Joined</th>
            <th class="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-50">
          <tr v-for="user in data.users" :key="user.id" class="hover:bg-[#f8faf9] transition-colors">
            <td class="px-4 py-3">
              <div class="font-medium text-[#2D4D3A]">{{ user.name }}</div>
              <div v-if="user.organization" class="text-xs text-[#5B5B5B]">{{ user.organization }}</div>
            </td>
            <td class="px-4 py-3 text-[#5B5B5B] hidden sm:table-cell">{{ user.email }}</td>
            <td class="px-4 py-3 text-[#5B5B5B] hidden md:table-cell">{{ user._count.ads }}</td>
            <td class="px-4 py-3">
              <span :class="['text-xs font-semibold px-2 py-0.5 rounded-full',
                user.role === 'admin' ? 'bg-[#2D4D3A] text-white' : 'bg-gray-100 text-gray-600']">
                {{ user.role === 'admin' ? 'Admin' : 'User' }}
              </span>
            </td>
            <td class="px-4 py-3 text-[#5B5B5B] text-xs hidden sm:table-cell">{{ formatDate(user.createdAt) }}</td>
            <td class="px-4 py-3">
              <div class="flex gap-2 justify-end">
                <button
                  @click="toggleRole(user)"
                  class="text-xs px-2.5 py-1 rounded border border-gray-200 hover:bg-gray-50 transition-colors"
                  :title="user.role === 'admin' ? 'Remove admin' : 'Make admin'"
                >
                  {{ user.role === 'admin' ? 'Demote' : 'Promote' }}
                </button>
                <button
                  @click="deleteUser(user)"
                  class="text-xs px-2.5 py-1 rounded bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="data && data.pages > 1" class="flex justify-center gap-2 mt-6">
      <button
        v-for="p in data.pages" :key="p"
        @click="page = p; refresh()"
        :class="['w-9 h-9 rounded text-sm font-medium transition-colors',
          p === page ? 'bg-[#2D4D3A] text-white' : 'bg-white text-[#5B5B5B] hover:bg-gray-50 shadow-sm']"
      >{{ p }}</button>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'admin' })
useSeoMeta({ title: 'Users — MedBeauty Admin' })

const data = ref<any>(null)
const pending = ref(true)
const search = ref('')
const page = ref(1)
let searchTimer: ReturnType<typeof setTimeout>

async function loadUsers() {
  pending.value = true
  try {
    const q: any = { page: page.value }
    if (search.value) q.search = search.value
    data.value = await $fetch('/api/admin/users', { query: q })
  } finally {
    pending.value = false
  }
}

function refresh() { loadUsers() }

onMounted(() => loadUsers())

function onSearch() {
  clearTimeout(searchTimer)
  searchTimer = setTimeout(() => { page.value = 1; refresh() }, 400)
}

async function toggleRole(user: any) {
  const newRole = user.role === 'admin' ? 'user' : 'admin'
  const action = newRole === 'admin' ? 'promote to admin' : 'remove admin rights'
  if (!confirm(`${user.name}: ${action}?`)) return
  await $fetch(`/api/admin/users/${user.id}`, { method: 'PATCH', body: { role: newRole } })
  refresh()
}

async function deleteUser(user: any) {
  if (!confirm(`Delete user ${user.name}? All their listings will also be deleted.`)) return
  await $fetch(`/api/admin/users/${user.id}`, { method: 'DELETE' })
  refresh()
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}
</script>
