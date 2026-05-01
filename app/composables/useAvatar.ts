export function useAvatar() {
  function getAvatar(user: { avatarUrl?: string | null; name?: string; id?: number }): string {
    if (user.avatarUrl) return user.avatarUrl
    const seed = encodeURIComponent(user.name || String(user.id || 'user'))
    return `https://api.dicebear.com/9.x/fun-emoji/svg?seed=${seed}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`
  }
  return { getAvatar }
}
