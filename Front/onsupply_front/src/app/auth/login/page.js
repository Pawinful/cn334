'use client'

import { useState } from 'react'
import { User, Lock } from 'lucide-react'
import useApi from '../../../../hooks/useApi'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const api = useApi()
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = {
      "email": email,
      "password": password
    }

    try {
      const res = await api.post(
        '/auth/login/',
        payload
      )
      localStorage.setItem("access_token", res.data.access)
      localStorage.setItem("refresh_token", res.data.refresh)
      router.push('/')
    } catch(err) {
      if(err.response && err.response.status === 401) {
        setError('Invalid username or password!')
      } else {
        setError('Internal Server Error')
      }
    }
    
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-sm">
        <h1 className="text-center text-xl font-semibold mb-6">LOGIN</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1">
            <label htmlFor="email" className="text-sm text-gray-600">EMAIL</label>
            <div className="flex items-center border-b border-gray-400">
              <User className="w-4 h-4 text-gray-500 mr-2" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full py-2 outline-none text-sm"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label htmlFor="password" className="text-sm text-gray-600">PASSWORD</label>
            <div className="flex items-center border-b border-gray-400">
              <Lock className="w-4 h-4 text-gray-500 mr-2" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full py-2 outline-none text-sm"
              />
            </div>
            <div className="text-center text-xs mt-5">
              Not have an account? <button type="button" className="text-blue-500 hover:underline" onClick={() => router.push('/auth/register')}>Register</button>
            </div>
            <div className="text-center text-xs text-red-500 mt-1">
              {error}
            </div>
          </div>

          <button type="submit" className="w-full bg-red-600 text-white py-2 rounded-full font-semibold hover:bg-red-700">
            LOGIN
          </button>
        </form>
      </div>
    </div>
  )
}