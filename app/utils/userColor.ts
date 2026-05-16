const palette: Array<{ bg: string; fg: string }> = [
  { bg: '#FECACA', fg: '#7F1D1D' }, // red
  { bg: '#FED7AA', fg: '#7C2D12' }, // orange
  { bg: '#FDE68A', fg: '#78350F' }, // amber
  { bg: '#FEF08A', fg: '#713F12' }, // yellow
  { bg: '#D9F99D', fg: '#365314' }, // lime
  { bg: '#BBF7D0', fg: '#14532D' }, // green
  { bg: '#A7F3D0', fg: '#064E3B' }, // emerald
  { bg: '#99F6E4', fg: '#134E4A' }, // teal
  { bg: '#A5F3FC', fg: '#164E63' }, // cyan
  { bg: '#BAE6FD', fg: '#0C4A6E' }, // sky
  { bg: '#BFDBFE', fg: '#1E3A8A' }, // blue
  { bg: '#C7D2FE', fg: '#312E81' }, // indigo
  { bg: '#DDD6FE', fg: '#4C1D95' }, // violet
  { bg: '#E9D5FF', fg: '#581C87' }, // purple
  { bg: '#F5D0FE', fg: '#701A75' }, // fuchsia
  { bg: '#FBCFE8', fg: '#831843' }, // pink
  { bg: '#FECDD3', fg: '#881337' }, // rose
  { bg: '#E7E5E4', fg: '#1C1917' }, // stone
]

function hash(s: string): number {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return (h >>> 0)
}

export function userColor(name?: string | null): { backgroundColor: string; color: string } {
  const key = name?.trim()?.toLowerCase() ?? ''
  const idx = key ? hash(key) % palette.length : 0
  const c = palette[idx]!
  return { backgroundColor: c.bg, color: c.fg }
}
