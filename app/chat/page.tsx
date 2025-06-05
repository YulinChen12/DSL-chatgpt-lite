'use client'

import { Suspense, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Flex } from '@radix-ui/themes'
import { Chat, ChatContext, ChatSideBar, useChatHook } from '@/components'
import PersonaModal from './PersonaModal'
import PersonaPanel from './PersonaPanel'

const ChatProvider = () => {
  const provider = useChatHook()

  return (
    <ChatContext.Provider value={provider}>
      <Flex style={{ height: 'calc(100% - 56px)' }} className="relative">
        <ChatSideBar />
        <div className="flex-1 relative">
          <Chat ref={provider.chatRef} />
          <PersonaPanel />
        </div>
      </Flex>
      <PersonaModal />
    </ChatContext.Provider>
  )
}

const ChatPage = () => {
  const router = useRouter()

  useEffect(() => {
    const role = localStorage.getItem('role')
    if (!role) {
      router.push('/login')
    }
  }, [])

  return (
    <Suspense>
      <ChatProvider />
    </Suspense>
  )
}

export default ChatPage
