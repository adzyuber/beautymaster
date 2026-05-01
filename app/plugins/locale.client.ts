export default defineNuxtPlugin(() => {
  const locale = useState<'ru' | 'en'>('locale', () => 'ru')
  const saved = localStorage.getItem('locale') as 'ru' | 'en' | null
  if (saved === 'ru' || saved === 'en') locale.value = saved
})
