'use client'

import { useCallback } from 'react'
import { Avatar, Flex, Heading, IconButton, Tooltip } from '@radix-ui/themes'
import clsx from 'clsx'
import NextLink from 'next/link'
import { BsSun, BsMoonStars } from 'react-icons/bs'
import { FaGithub } from 'react-icons/fa6'
import { HiHome } from 'react-icons/hi'
import { IoSaveOutline } from 'react-icons/io5'
import { useRouter } from 'next/navigation'
import { Link } from '../Link'
import { useTheme } from '../Themes'

export const Header = () => {
  const { theme, setTheme } = useTheme()
  const router = useRouter()

  const handleThemeChange = useCallback(
    (nextTheme: 'dark' | 'light') => {
      if (theme === nextTheme) return
      setTheme(nextTheme)
    },
    [theme, setTheme]
  )

  const exportChatHistory = useCallback(() => {
    const chatList = JSON.parse(localStorage.getItem('chatList') || '[]')
    const fullHistory = chatList.map((chat: any) => {
      const messages = JSON.parse(localStorage.getItem(`ms_${chat.id}`) || '[]')
      return {
        chatId: chat.id,
        persona: chat.persona,
        messages
      }
    })

    const blob = new Blob([JSON.stringify(fullHistory, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'chat_history.json'
    link.click()
    URL.revokeObjectURL(url)
  }, [])

  return (
    <header
      className={clsx(
        'block shadow-sm sticky top-0 dark:shadow-gray-500 py-3 px-4 z-20 transition-colors duration-300'
      )}
      style={{ backgroundColor: 'var(--color-background)' }}
    >
      <Flex align="center" gap="3">
        <NextLink href="/">
          <Heading as="h2" size="4" style={{ maxWidth: 200 }}>
            KidsGPT
          </Heading>
        </NextLink>
        <Flex align="center" gap="3" className="ml-auto">
          <Tooltip content="Export Chat History" delayDuration={100}>
            <IconButton
              size="3"
              variant="ghost"
              color="gray"
              aria-label="Export chat history"
              onClick={exportChatHistory}
              radius="full"
              tabIndex={0}
              className="transition-all duration-300"
              style={{ outline: 'none' }}
            >
              <IoSaveOutline className="text-xl" />
            </IconButton>
          </Tooltip>
          <Tooltip content="Login Page" delayDuration={100}>
            <IconButton
              size="3"
              variant="ghost"
              color="gray"
              aria-label="Go to login page"
              onClick={() => router.push('/login')}
              radius="full"
              tabIndex={0}
              className="transition-all duration-300"
              style={{ outline: 'none' }}
            >
              <HiHome className="text-xl" />
            </IconButton>
          </Tooltip>
          <Tooltip
            content={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            delayDuration={100}
          >
            <IconButton
              size="3"
              variant="ghost"
              color="gray"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              onClick={() => handleThemeChange(theme === 'dark' ? 'light' : 'dark')}
              radius="full"
              tabIndex={0}
              className="transition-all duration-300"
              style={{ outline: 'none' }}
            >
              {theme === 'dark' ? (
                <BsSun className="text-xl transition-transform duration-300 rotate-0 dark:rotate-180" />
              ) : (
                <BsMoonStars className="text-xl transition-transform duration-300 rotate-0 dark:rotate-180" />
              )}
            </IconButton>
          </Tooltip>
          <Avatar
            color="gray"
            size="2"
            radius="full"
            fallback={
              <Link href="https://github.com/blrchen/chatgpt-lite" aria-label="GitHub Repository">
                <FaGithub />
              </Link>
            }
          />
        </Flex>
      </Flex>
    </header>
  )
}
