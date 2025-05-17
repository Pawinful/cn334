'use client'

import { useEffect, useState } from 'react'
import useAuth from '../../../hooks/useAuth'
import useAxiosAuth from '../../../hooks/useAxiosAuth'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function CourseRegistrationPage() {
  const loading = useAuth()
  const [cart, setCart] = useState([])
  const [courses, setCourses] = useState([])
  const [loadings, setLoadings] = useState(true)
  const api = useAxiosAuth()
  const router = useRouter()

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [cartRes, courseRes] = await Promise.all([
          api.get('/cart/'),
          api.get('/courses/')
        ])
        setCart(cartRes.data)
        setCourses(courseRes.data)
      } catch (err) {
        console.error(err.message)
      } finally {
        setLoadings(false)
      }
    }

    fetchAll()
  }, [api])
    
  
  const [formData, setFormData] = useState({
    payment: '',
    receipt: null,
  })

  const totalPrice = cart.reduce((sum, item) => {
    const courseDetail = courses.find(course => course.id === item.course)
    return sum + Number(courseDetail?.price || 0)
  }, 0)

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked })
    } else if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleEnroll = async (e) => {
    e.preventDefault()

    if (!formData.receipt) {
      alert('กรุณาแนบสลิปก่อนสมัครเรียน')
      return
    }
    if(cart.length < 1) {
      alert('Please add some course to cart before enroll')
      return
    }

    try {
      for (const item of cart) {
        await api.post('/enrollments/', { course: item.course })
      }
      for (const item of cart) {
        await api.delete(`/cart/${item.id}/`)
      }
      setFormData({
        payment: '',
        receipt: null,
      })

      console.log("enrolled successfully")
      router.push('/dashboard')
    } catch (err) {
      console.error(err.message)
    }
  }
  if (loading) return null 
  if(loadings) return <p className="p-4 text-center w-full">Loading...</p>
  return (
    <div className="font-sans px-10 py-10 max-w-4xl mx-auto bg-white shadow-lg rounded-2xl">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">สมัครเรียนคอร์สออนไลน์</h1>

      <div className="mb-8 bg-gray-50 border border-gray-200 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">คอร์สที่คุณเลือก</h2>
        <ul className="space-y-2 text-gray-700">
          {cart.map((item, idx) => {
              const courseDetail = courses.find(course => course.id === item.course)
              if (!courseDetail) return null

              return (
            <li key={idx} className="flex justify-between">
              <span>{courseDetail.title}</span>
              <span>THB {courseDetail.price}</span>
            </li>
          )})}
        </ul>
        <div className="flex justify-between mt-4 pt-4 border-t font-semibold text-lg">
          <span>รวมทั้งหมด</span>
          <span>THB {totalPrice}</span>
        </div>
      </div>

      <form className="space-y-6">
        <div className="flex flex-col">
          <label className="mb-2 font-medium text-gray-700">แนบสลิปการชำระเงิน</label>
          <input type="file" name="receipt" onChange={handleChange} className="border px-4 py-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>

        <div className="text-center">
          <label className="block mb-2 font-medium text-gray-700">QR Code สำหรับการชำระเงิน</label>
          <img src="/qrcode.jpg" alt="QR Code" className="mx-auto w-64 object-contain border rounded-2xl" />
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition duration-200" onClick={(e) => handleEnroll(e)}>
          สมัครเรียน
        </button>
      </form>
    </div>
  )
}