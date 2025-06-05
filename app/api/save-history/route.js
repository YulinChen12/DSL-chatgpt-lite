// app/api/save-history/route.ts
import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(req: NextRequest) {
  try {
    const { prompt, response } = await req.json()
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    const logDir = path.join(process.cwd(), 'public', 'kid_logs')
    const logPath = path.join(logDir, `kidgpt_${timestamp}.txt`)

    fs.mkdirSync(logDir, { recursive: true })
    const content = `--- Prompt ---\n${prompt}\n\n--- Response ---\n${response}\n`
    fs.writeFileSync(logPath, content, 'utf-8')

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Error writing chat log:', err)
    return NextResponse.json({ success: false, error: err })
  }
}
