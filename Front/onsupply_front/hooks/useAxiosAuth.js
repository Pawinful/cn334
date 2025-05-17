import axios from 'axios'

export default function useAxiosAuth() {
  const token = typeof window !== 'undefined' && localStorage.getItem('access_token')
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  })
  if (token) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }
  return instance
}