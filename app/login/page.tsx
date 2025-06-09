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
    <main className="flex flex-col items-center justify-center min-h-screen gap-8 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="text-center -mt-20">
        <h1 className="text-4xl font-bold text-gray-800">Welcome to KidsGPT</h1>
      </div>

      <div className="flex gap-6">
        <button
          onClick={() => handleLogin('kid')}
          className="px-8 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors duration-200 shadow-md"
        >
          I'm a Kid
        </button>
        <button
          onClick={() => handleLogin('parent')}
          className="px-8 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 shadow-md"
        >
          I'm a Parent
        </button>
      </div>
    </main>
  )
}
