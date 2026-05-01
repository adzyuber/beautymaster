export interface CategoryIcon {
  bg: string
  color: string
  paths: string
}

export const categoryIcons: Record<string, CategoryIcon> = {
  'Стоматология': {
    bg: '#E0F7F6', color: '#02282C',
    paths: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8.5 5h7c.8 0 1.5.7 1.5 1.5v2A4.5 4.5 0 0112 13a4.5 4.5 0 01-4.5-4.5v-2C7.5 5.7 8.2 5 9 5z"/><path stroke-linecap="round" stroke-width="1.5" d="M10 13l-.8 7h5.6L14 13"/>`
  },
  'Психология': {
    bg: '#EDE9FE', color: '#5B21B6',
    paths: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 3.5C7.3 3.5 6 4.8 6 6.5c0 .7.2 1.3.6 1.8C5.6 9 5 10.2 5 11.5c0 1.8 1.1 3.4 2.7 4.1V18h8.6v-2.4c1.6-.7 2.7-2.3 2.7-4.1 0-1.3-.6-2.5-1.6-3.2.4-.5.6-1.1.6-1.8C18 4.8 16.7 3.5 15 3.5c-.9 0-1.7.4-2.3 1A3.5 3.5 0 009 3.5z"/>`
  },
  'Терапия': {
    bg: '#FEF3C7', color: '#92400E',
    paths: `<path fill="currentColor" d="M10.5 3h3v7.5H21v3h-7.5V21h-3v-7.5H3v-3h7.5z"/>`
  },
  'Гинекология': {
    bg: '#FCE7F3', color: '#9D174D',
    paths: `<circle cx="12" cy="9" r="5" stroke-width="1.5"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 14v7M9 18h6"/>`
  },
  'Реабилитация': {
    bg: '#ECFDF5', color: '#065F46',
    paths: `<circle cx="12" cy="4" r="2" fill="currentColor"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 9.5l5 2 5-2M9 8l-3 5 4 1.5-1.5 6.5M15 8l3 5-4 1.5 1.5 6.5"/>`
  },
  'Массаж': {
    bg: '#FFF7ED', color: '#9A3412',
    paths: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 4.5v7M11 3.5v8M14 4.5v7M17 6v5M6 11.5A6 6 0 0018 11.5M9 18h6M12 17.5V22"/>`
  },
  'Диетология': {
    bg: '#F0FDF4', color: '#166534',
    paths: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 3c0 0 2-2 4-1M12 3C8.5 3 6 7 6 11c0 5 2.5 8 6 8s6-3 6-8c0-4-2.5-8-6-8z"/><path stroke-linecap="round" stroke-width="1.5" d="M12 3v3"/>`
  },
  'ЛФК': {
    bg: '#EEF2FF', color: '#3730A3',
    paths: `<rect x="2" y="10" width="3" height="4" rx="1" fill="currentColor"/><rect x="19" y="10" width="3" height="4" rx="1" fill="currentColor"/><rect x="5" y="8" width="3" height="8" rx="1" fill="currentColor"/><rect x="16" y="8" width="3" height="8" rx="1" fill="currentColor"/><path stroke-width="2" d="M8 12h8"/>`
  },
  'Косметология': {
    bg: '#FDF2F8', color: '#86198F',
    paths: `<path fill="currentColor" d="M12 2l1.8 5.4L19.2 9l-5.4 1.8L12 16.2l-1.8-5.4L4.8 9l5.4-1.8z"/><path stroke-linecap="round" stroke-width="1.5" d="M8.5 18a4 4 0 007 0"/>`
  },
  'Маникюр / Педикюр': {
    bg: '#FFF1F2', color: '#9F1239',
    paths: `<rect x="9" y="10" width="6" height="10" rx="2" stroke-width="1.5"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11 10V7.5l1-3.5 1 3.5V10M9 14h6"/>`
  },
  'Парикмахер': {
    bg: '#F5F3FF', color: '#4C1D95',
    paths: `<circle cx="6.5" cy="7" r="3" stroke-width="1.5"/><circle cx="6.5" cy="17" r="3" stroke-width="1.5"/><path stroke-linecap="round" stroke-width="1.5" d="M9 9.5l10 9M9 14.5L19 5.5"/>`
  },
  'Барбер': {
    bg: '#E0F2FE', color: '#0C4A6E',
    paths: `<rect x="3" y="9" width="18" height="6" rx="3" stroke-width="1.5"/><path stroke-linecap="round" stroke-width="1.5" d="M7 9V6m4 3V6m4 3V6M7 15v3m4-3v3m4-3v3"/>`
  },
  'Визажист': {
    bg: '#FEF0F5', color: '#BE185D',
    paths: `<rect x="9.5" y="11" width="5" height="9" rx="1.5" stroke-width="1.5"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.5 11V8.5L12 4l2.5 4.5V11M9.5 14.5h5"/>`
  },
  'Лазерная эпиляция': {
    bg: '#FFFBEB', color: '#B45309',
    paths: `<path fill="currentColor" d="M13.5 2L3 14h8.5L10 22l11-13H13L13.5 2z"/>`
  },
  'Бровист / Лешмейкер': {
    bg: '#F5F3FF', color: '#4338CA',
    paths: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3" stroke-width="1.5"/><circle cx="12" cy="12" r="1" fill="currentColor"/>`
  },
  'SPA': {
    bg: '#ECFDF5', color: '#064E3B',
    paths: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 21c0 0-7-4.5-7-11a7 7 0 0114 0c0 6.5-7 11-7 11z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 21c0 0-3.5-3-3.5-7a3.5 3.5 0 017 0c0 4-3.5 7-3.5 7z"/>`
  }
}
