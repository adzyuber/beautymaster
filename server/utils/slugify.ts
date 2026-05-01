export function slugify(text: string, id: number): string {
  const slug = text
    .toLowerCase()
    .replace(/[а-яёa-z0-9\s-]/gi, (char) => {
      const map: Record<string, string> = {
        а:'a',б:'b',в:'v',г:'g',д:'d',е:'e',ё:'yo',ж:'zh',з:'z',
        и:'i',й:'y',к:'k',л:'l',м:'m',н:'n',о:'o',п:'p',р:'r',
        с:'s',т:'t',у:'u',ф:'f',х:'h',ц:'ts',ч:'ch',ш:'sh',щ:'sch',
        ъ:'',ы:'y',ь:'',э:'e',ю:'yu',я:'ya',' ':'-'
      }
      return map[char] ?? char
    })
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
  return `${slug}-${id}`
}
