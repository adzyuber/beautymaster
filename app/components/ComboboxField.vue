<template>
  <div :class="wrapClass ?? 'relative'">
    <input
      v-model="query"
      type="text"
      :placeholder="placeholder"
      :disabled="disabled"
      autocomplete="off"
      @focus="open = true"
      @input="open = true"
      @blur="onBlur"
      :class="inputClass ?? 'w-full border border-gray-200 rounded px-4 py-3 pr-9 focus:outline-none focus:ring-2 focus:ring-[#1EC3BD] disabled:opacity-50 bg-white'"
    >
    <button
      type="button"
      tabindex="-1"
      :disabled="disabled"
      @mousedown.prevent="toggleOpen"
      class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 p-1 disabled:opacity-30"
    >
      <svg class="w-4 h-4 transition-transform duration-200" :class="{ 'rotate-180': open }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
      </svg>
    </button>

    <ul
      v-if="open && filtered.length"
      class="absolute z-50 w-full bg-white border border-gray-200 rounded shadow-lg mt-1 max-h-52 overflow-y-auto"
    >
      <li
        v-for="opt in filtered"
        :key="opt.value"
        @mousedown.prevent="pick(opt)"
        @touchend.prevent="pick(opt)"
        class="px-4 py-3 text-base cursor-pointer hover:bg-[#f0faf4] active:bg-[#e0f5ea] transition-colors"
        :class="{ 'text-[#2D4D3A] font-semibold bg-[#f0faf4]': opt.value === modelValue }"
      >
        {{ opt.label }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
interface Option { value: string; label: string }

const props = defineProps<{
  modelValue: string
  options: Option[]
  placeholder?: string
  disabled?: boolean
  inputClass?: string
  wrapClass?: string
}>()

const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

const query = ref('')
const open = ref(false)

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return props.options
  return props.options.filter(o => o.label.toLowerCase().includes(q))
})

function pick(opt: Option) {
  query.value = opt.label
  emit('update:modelValue', opt.value)
  open.value = false
}

function toggleOpen() {
  if (props.disabled) return
  open.value = !open.value
}

function onBlur() {
  setTimeout(() => {
    open.value = false
    const match = props.options.find(o => o.label.toLowerCase() === query.value.trim().toLowerCase())
    if (match) {
      query.value = match.label
      emit('update:modelValue', match.value)
    } else {
      const current = props.options.find(o => o.value === props.modelValue)
      query.value = current?.label || ''
    }
  }, 150)
}

watch(() => [props.modelValue, props.options] as const, ([val]) => {
  const opt = props.options.find(o => o.value === val)
  query.value = opt?.label || ''
}, { immediate: true })
</script>
