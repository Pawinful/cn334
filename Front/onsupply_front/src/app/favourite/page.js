'use client'

import { useEffect, useState } from 'react'
import { Heart } from 'lucide-react'
import useAuth from '../../../hooks/useAuth'
import useAxiosAuth from '../../../hooks/useAxiosAuth'

export default function WishlistPage() {
  const loading = useAuth()
  const api = useAxiosAuth()
  const [favourites, setFavourites] = useState([])
  const [courses, setCourses] = useState([])
  const [loadings, setLoadings] = useState(true)

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [favRes, courseRes] = await Promise.all([
          api.get('/favourites/'),
          api.get('/courses/')
        ])
        setFavourites(favRes.data)
        setCourses(courseRes.data)
      } catch (err) {
        console.error(err.message)
      } finally {
        setLoadings(false)
      }
    }

    fetchAll()
  }, [])

  const handleRemove = async (id) => {
    try {
      await api.delete(`/favourites/${id}/`)
      setFavourites(prev => prev.filter(item => item.id !== id))
    } catch (err) {
      console.log(err.message)
    }
  }

  if (loading) return null
  if (loadings) return <p className="p-4 text-center w-full">Loading...</p>

  return (
    <div className="font-sans px-4 sm:px-6 md:px-10 py-4">
      <div className="grid grid-cols-1 gap-6 mt-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">รายการที่ชื่นชอบ</h2>
          <div className="space-y-4">
            {favourites.map((item, idx) => {
              const courseDetail = courses.find(course => course.id === item.course)
              if (!courseDetail) return null

              return (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b pb-4 gap-4 px-5"
                >
                  {/* Left: Image + Info */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <img
                      src={courseDetail.image || '/cpu.jpg'}
                      alt={courseDetail.title}
                      className="w-24 h-24 object-cover rounded-md"
                    />
                    <div>
                      <div className="font-medium text-gray-800 text-base sm:text-lg">
                        {courseDetail.title}
                      </div>
                      <div className="text-sm text-gray-500">ผู้สอน: {courseDetail.instructor || '-'}</div>
                      <div className="text-sm text-gray-500">จำนวน: 1</div>
                    </div>
                  </div>

                {/* Right: Price + Actions */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6">
                  <div className="text-left sm:text-right">
                    <div className="font-semibold text-gray-700">
                      ราคา: THB {courseDetail.price?.toLocaleString()}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Heart className="w-6 h-6 text-red-600 fill-red-600 cursor-pointer" onClick={() => handleRemove(item.id)} />
                  </div>
                </div>
              </div>
            )})}
          </div>
        </div>
      </div>
    </div>
  )
}
