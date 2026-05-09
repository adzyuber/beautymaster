import { requireAuth } from '../utils/auth'
import { writeFile } from 'fs/promises'
import { join } from 'path'

export default defineEventHandler(async (event) => {
  await requireAuth(event)
  const form = await readMultipartFormData(event)
  if (!form) throw createError({ statusCode: 400, message: 'No file' })

  const file = form.find(f => f.name === 'file')
  if (!file) throw createError({ statusCode: 400, message: 'No file field' })

  const ext = file.filename?.split('.').pop() || 'jpg'
  const name = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
  const path = join(process.cwd(), 'public', 'uploads', name)
  await writeFile(path, file.data)

  return { url: `/uploads/${name}` }
})
