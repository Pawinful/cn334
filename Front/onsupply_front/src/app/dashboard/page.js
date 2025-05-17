'use client'

import { useEffect, useState } from 'react'
import { Download, UploadCloud, ShoppingCart } from 'lucide-react'
import useAuth from '../../../hooks/useAuth'
import useAxiosAuth from '../../../hooks/useAxiosAuth'
import { useRouter } from 'next/navigation'
import moment from 'moment'

export default function UserDashboard() {
  const loading = useAuth()
  const [cart, setCart] = useState([])
  const [courses, setCourses] = useState([])
  const [enrolled, setEnrolled] = useState([])
  const [loadings, setLoadings] = useState(true)
  const api = useAxiosAuth()
  const router = useRouter()
    
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [cartRes, courseRes, enrollRes] = await Promise.all([
          api.get('/cart/'),
          api.get('/courses/'),
          api.get('/enrollments')
        ])
        setCart(cartRes.data)
        setCourses(courseRes.data)
        setEnrolled(enrollRes.data)
      } catch (err) {
        console.error(err.message)
      } finally {
        setLoadings(false)
      }
    }

    fetchAll()
  }, [])

  if (loading) return null 
  return (
    <div className="font-sans px-4 sm:px-6 lg:px-10 py-10 w-full max-w-screen-xl mx-auto space-y-10">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">แดชบอร์ดของฉัน</h1>

      <div className="bg-white border rounded-xl shadow p-4 sm:p-6 overflow-x-auto">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4">📚 คอร์สที่ลงทะเบียนไว้</h2>
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100 text-left text-gray-600 text-sm sm:text-base">
            <tr>
              <th className="py-3 px-4 whitespace-nowrap">ชื่อคอร์ส</th>
              <th className="py-3 px-4 whitespace-nowrap">วันที่สมัคร</th>
              <th className="py-3 px-4 whitespace-nowrap">Course</th>
            </tr>
          </thead>
          <tbody>
            {enrolled.map((item, index) => {
              const courseDetail = courses.find(course => course.id === item.course)
              if (!courseDetail) return null

              return (
                <tr key={index} className="border-t text-sm sm:text-base">
                  <td className="py-3 px-4 whitespace-nowrap">{courseDetail.title}</td>
                  <td className="py-3 px-4 whitespace-nowrap">{moment(item.enrolled_at).format('YYYY-MM-DD HH:mm')}</td>
                  <td className="py-3 px-4 whitespace-nowrap">
                      <a href="https://anywhere.learn.co.th/" className="text-gray-600 hover:text-blue-700 hover:underline text-sm">Course Link</a>
                  </td>
                </tr>
            )})}
          </tbody>
        </table>
      </div>

      <div className="bg-white border rounded-xl shadow p-4 sm:p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">🛒 คอร์สในตะกร้า</h2>
        <ul className="space-y-4">
          {cart.map((item, idx) => {
            const courseDetail = courses.find(course => course.id === item.course)
            if (!courseDetail) return null

            return (
              <li key={idx} className="border-b pb-3">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <div>
                    <p className="font-medium text-gray-700 text-base">{courseDetail.title}</p>
                    <p className="text-sm text-gray-500">THB {courseDetail.price}</p>
                  </div>
                  <button className="mt-2 sm:mt-0 text-blue-600 hover:underline text-sm flex items-center gap-1" onClick={() => router.push('/confirm')}>
                    <ShoppingCart className="w-4 h-4" /> สมัครเรียน
                  </button>
                </div>
              </li>
          )})}
        </ul>
      </div>
    </div>
  )
}
