'use client'

import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()

  const handleLogin = (role: 'kid' | 'parent') => {
    localStorage.setItem('role', role)
    if (role === 'kid') {
      router.push('/chat')
    } else {
      router.push('/parent')
    }
  }

  return (
    <main className="flex flex-col items-center justify-center h-screen gap-6 px-4">
      <h1 className="text-3xl font-bold">Welcome to KidsGPT</h1>

      <div className="flex gap-4 mt-4">
        <button
          onClick={() => handleLogin('kid')}
          className="px-6 py-2 bg-purple-500 text-white rounded-md"
        >
          I’m a Kid
        </button>
        <button
          onClick={() => handleLogin('parent')}
          className="px-6 py-2 bg-gray-600 text-white rounded-md"
        >
          I’m a Parent
        </button>
      </div>
    </main>
  )
}
