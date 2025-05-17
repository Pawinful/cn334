'use client'
import { useRouter } from 'next/navigation'
import useAxiosAuth from './useAxiosAuth'

export default function useLogout() {
  const router = useRouter()
  const api = useAxiosAuth()

  const logout = async () => {
    try {
      const payload = {
        refresh: localStorage.getItem('refresh_token'),
      }

      const headers = {
        'Content-Type': 'application/json',
      }

      await api.post('/auth/logout/', payload, { headers })

      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      router.push('/auth/login')
    } catch (err) {
      console.log('Logout failed:', err.message)
      router.push('/')
    }
  }

  return logout
}