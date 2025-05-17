'use client'

import useAuth from "../../../hooks/useAuth"
import { useEffect, useState } from "react"
import useAxiosAuth from "../../../hooks/useAxiosAuth"
import { useRouter } from "next/navigation"
import Image from 'next/image'

export default function CartPage() {
  const loading = useAuth()
  const api = useAxiosAuth()
  const [loadings, setLoadings] = useState(true)
  const [cart, setCart] = useState([])
  const [courses, setCourses] = useState([])
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

  const handleRemove = async (id) => {
    try {
      await api.delete(`/cart/${id}/`)
      setCart(prev => prev.filter(item => item.id !== id))
    } catch (err) {
      console.log(err.message)
    }
  }

  if (loading) return null
  if (loadings) return <p className="p-4 text-center w-full">Loading...</p>

  return (
    <div className="font-sans px-4 py-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
        <div className="md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">คอร์สที่เลือก</h2>
          <div className="space-y-4">
            {cart.map((item) => {
              const courseDetail = courses.find(course => course.id === item.course)
              if (!courseDetail) return null

              return (
                <div key={item.id} className="flex items-center justify-between border-b pb-3">
                  <div className="flex items-center space-x-4">
                    <img src={courseDetail.image} alt={courseDetail.title} className="w-24 h-24 object-cover rounded-md" />
                    <div>
                      <div className="font-medium text-gray-800">{courseDetail.title}</div>
                      <div className="text-sm text-gray-500">จำนวน: 1</div>
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <div className="font-semibold text-gray-700">ราคา: THB {courseDetail.price}</div>
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="text-sm text-red-500 hover:underline mt-2"
                    >
                      ลบออกจากตะกร้า
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="border border-gray-300 rounded-md p-6 w-auto h-fit">
            <h3 className="text-lg font-semibold mb-4">สรุปคำสั่งซื้อ</h3>

            {(() => {
                const shippingFee = 0
                const totalPrice = cart.reduce((sum, item) => {
                    const courseDetail = courses.find(course => course.id === item.course)
                    return sum + Number(courseDetail?.price || 0)
                }, 0)
                const grandTotal = totalPrice + shippingFee

                return (
                    <>
                    <div className="flex justify-between mb-2">
                        <span>รวมราคาคอร์ส</span>
                        <span>THB {totalPrice.toFixed(2).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between mb-4">
                        <span>ค่าธรรมเนียมเพิ่มเติม</span>
                        <span>THB {shippingFee.toFixed(2).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between mb-6 font-bold text-lg">
                        <span>ยอดรวม</span>
                        <span>THB {grandTotal.toFixed(2).toLocaleString()}</span>
                    </div>
                    <button className="w-full bg-blue-600 text-white font-semibold py-2 rounded-full mb-3 hover:bg-blue-700" onClick={() => router.push('/confirm')}>
                        ชำระเงินและสมัครเรียน
                    </button>
                    <button onClick={() => {router.push('/catalogue')}} className="w-full border border-blue-600 text-blue-600 font-semibold py-2 rounded-full hover:bg-blue-50">
                        เลือกคอร์สเพิ่มเติม
                    </button>
                    </>
                )
            })()}
        </div>
      </div>
    </div>
  )
}
