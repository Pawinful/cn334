'use client'

import { useState } from 'react'
import { User, Lock } from 'lucide-react'
import useApi from '../../../../hooks/useApi'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const api = useApi()
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setError('password not match')
      return
    }
    const payload = {
      'email': email,
      'password': password,
      'confirm_password': confirmPassword
    }
    try {
      const res = await api.post(
        '/auth/register/',
        payload
      )
      alert(`Sign up for ${res.data.email} Successfully`)
      router.push('/auth/login')
    } catch (err) {
      console.log(err.message)
    }

    console.log('Register', { email, password })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-sm">
        <h1 className="text-center text-xl font-semibold mb-6">Register</h1>
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
          </div>

          <div className="space-y-1">
            <label htmlFor="confirmPassword" className="text-sm text-gray-600">CONFIRM PASSWORD</label>
            <div className="flex items-center border-b border-gray-400">
              <Lock className="w-4 h-4 text-gray-500 mr-2" />
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full py-2 outline-none text-sm"
              />
            </div>
            <div className="text-center text-xs mt-5">
              Already have an account? <button type="button" className="text-blue-500 hover:underline" onClick={() => router.push('/auth/login')}>Login</button>
            </div>
            <div className="text-center text-red-500">
              {error}
            </div>
          </div>

          <button type="submit" className="w-full bg-red-600 text-white py-2 rounded-full font-semibold hover:bg-red-700">
            Register
          </button>
        </form>
      </div>
    </div>
  )
}