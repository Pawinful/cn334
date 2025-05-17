import axios from 'axios'
export default function useApi() {
  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/',
    headers: {
      "Content-Type": "application/json",
    }
  })
  
  return api
}