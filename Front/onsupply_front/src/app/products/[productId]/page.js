'use client'

import { useParams, useRouter } from 'next/navigation'
import { Heart, ShoppingCart } from 'lucide-react'
import useAuth from '../../../../hooks/useAuth'
import { useEffect, useState } from 'react'
import useAxiosAuth from '../../../../hooks/useAxiosAuth'

export default function ProductPage() {
  const loading = useAuth()
  const api = useAxiosAuth()
  const [course, setCourse] = useState({})
  const [isFavourite, setIsFavourite] = useState(false)
  const [loadings, setLoadings] = useState(true)
  const params = useParams()
  const router = useRouter()
  const productId = params.productId

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [courseRes, favRes] = await Promise.all([
          api.get(`/courses/${productId}`),
          api.get('/favourites/')
        ])

        setCourse(courseRes.data)

        const isFav = favRes.data.some(fav => fav.course === courseRes.data.id)
        setIsFavourite(isFav)
      } catch (err) {
        console.log(err.message)
      } finally {
        setLoadings(false)
      }
    }

    fetchData()
  }, [api])

  const handleFavourite = async () => {
    try {
      if (isFavourite) {
        const favRes = await api.get('/favourites/')
        const target = favRes.data.find(fav => fav.course === course.id)
        if (target) {
          await api.delete(`/favourites/${target.id}/`)
          setIsFavourite(false)
        }
      } else {
        await api.post('/favourites/', { course: course.id })
        setIsFavourite(true)
      }
    } catch (err) {
      console.log(err.message)
    }
  }

  const handleAddToCart = async () => {
    const payload = {
      "course": productId
    }
    try {
      const res = await api.post(
        '/cart/',
        payload
      )

      router.push('/cart')
    } catch (err) {
      console.log(err)
    }
  }

  if (loading) return null
  if (loadings) return <p className="p-4 text-center">Loading...</p>

  return (
    <div className="font-sans px-4 sm:px-6 lg:px-20 py-6 w-full">
      <div className="text-base sm:text-lg text-gray-500">
        Courses / <span className="font-medium text-gray-700">{course.title}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-6 items-start">
        <div className="w-full aspect-[4/3] bg-gray-100 rounded flex items-center justify-center">
          <img
            src={course.image}
            alt={course.title}
            className="max-w-full max-h-full object-contain p-4"
          />
        </div>

        <div className="space-y-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">{course.title}</h1>
          <div className="text-green-500 text-xl sm:text-2xl font-bold">THB {course.price}</div>

          <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
            {course.description}
          </p>

          <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
            <b>Instructor:</b> {course.instructor}
          </p>

          <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
            <b>Institution:</b> {course.institution}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button onClick={() => handleAddToCart()} className="w-full sm:w-auto bg-red-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-red-700 flex items-center justify-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              เพิ่มลงตะกร้า
            </button>

            <button
              onClick={handleFavourite}
              className="w-full sm:w-auto border border-red-600 text-red-600 px-6 py-3 rounded-full font-semibold hover:bg-red-50 flex items-center justify-center gap-2 group"
            >
              <Heart
                className={`w-5 h-5 ${
                  isFavourite ? 'fill-red-600 text-red-600' : 'text-red-600'
                } group-hover:fill-red-600`}
              />
              <span className="hidden sm:inline">
                {isFavourite ? 'ลบจากรายการโปรด' : 'เพิ่มรายการโปรด'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
