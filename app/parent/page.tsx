'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ParentPage() {
  const router = useRouter()
  const [report, setReport] = useState<any[]>([])

  useEffect(() => {
    const role = localStorage.getItem('role')
    if (role !== 'parent') {
      router.push('/')
    } else {
      generateChatReport()
    }
  }, [])

  const generateChatReport = () => {
    const chatList = JSON.parse(localStorage.getItem('chatList') || '[]')
    const fullReport = chatList.map((chat: any) => {
      const messages = JSON.parse(localStorage.getItem(`ms_${chat.id}`) || '[]')
      return {
        chatId: chat.id,
        persona: chat.persona?.name || 'Unknown',
        numMessages: messages.length,
        messages,
      }
    })
    setReport(fullReport)
  }

  const downloadReport = () => {
    let content = ''
    report.forEach((chat) => {
      content += `=== Chat with ${chat.persona} (ID: ${chat.chatId}) ===\n\n`
      chat.messages.forEach((msg: any) => {
        content += `${msg.role.toUpperCase()}: ${msg.content}\n\n`
      })
      content += '\n\n'
    })

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'chat_report.txt'
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Parent Dashboard</h1>
      <p style={{ marginBottom: '1rem' }}>You are now viewing reports generated from your kid's chat history.</p>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <button
          onClick={downloadReport}
          style={{
            padding: '8px 16px',
            background: '#4caf50',
            color: 'white',
            border: 'none',
            borderRadius: 4,
          }}
        >
          📄 Download Full Chat Report
        </button>

        <button
          onClick={() => router.push('/parent/parentquiz')}
          style={{
            padding: '8px 16px',
            background: '#2196f3',
            color: 'white',
            border: 'none',
            borderRadius: 4,
          }}
        >
          📝 Parent Quiz
        </button>
      </div>

      <div>
        {report.map((chat, i) => (
          <div key={i} style={{ border: '1px solid #ccc', padding: '12px', marginBottom: '1rem', borderRadius: 4 }}>
            <h3>Chat with: {chat.persona}</h3>
            <p>Total messages: {chat.numMessages}</p>
            <p>
              First message:{' '}
              {chat.messages[0]?.content?.slice(0, 40) || '[No message]'}
            </p>
            <p>
              Last message:{' '}
              {chat.messages[chat.messages.length - 1]?.content?.slice(0, 40) || '[No message]'}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
