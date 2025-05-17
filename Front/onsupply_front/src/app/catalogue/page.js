'use client'

import { useEffect, useState } from 'react'
import { Heart} from 'lucide-react'
import useAuth from '../../../hooks/useAuth'
import useAxiosAuth from '../../../hooks/useAxiosAuth'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function CataloguePage() {
  const api = useAxiosAuth()
  const [course, setCourse] = useState([])
  const [favourite, setFavourite] = useState([])
  const [loadings, setLoadings] = useState(true)
  const router = useRouter()
  const loading = useAuth()

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const [courseRes, favRes] = await Promise.all([
          api.get('/courses/'),
          api.get('/favourites/')
        ])
        setCourse(courseRes.data)
        setFavourite(favRes.data.map(f => f.course))
      } catch(err) {
        console.log(err.message)
      } finally {
        setLoadings(false)
      }
    }

    fetchCourses()
  }, [api])

  const handleLike = async (id) => {
  const isFavourited = favourite.includes(id)

  try {
    if (isFavourited) {
      const fav = await api.get('/favourites/')
      const target = fav.data.find(f => f.course === id)
      await api.delete(`/favourites/${target.id}/`)
      setFavourite(prev => prev.filter(favId => favId !== id))
    } else {
      const res = await api.post('/favourites/', { course: id })
      setFavourite(prev => [...prev, id])
    }
  } catch (err) {
    console.log(err.message)
  }
}

  if (loading) return null 
  if(loadings) return <p className="text-center w-full">Loading....</p>
  return (
    <div className="font-sans px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {course.map((item, index) => (
          <div key={index} className="border border-gray-200 p-4 rounded-lg hover:shadow-sm transition-shadow cursor-pointer">
            <div className="w-full aspect-[4/3] overflow-hidden flex items-center justify-center">
              <Image src={item.image} alt={item.title} className="max-w-full max-h-full object-contain" onClick={() => {router.push(`/products/${item.id}/`)}} />
            </div>
            <div className="mt-3 text-xl font-bold text-gray-800" onClick={() => {router.push(`/products/${item.id}/`)}}>{item.title}</div>
            <div className="flex justify-between items-center mt-2">
              <div>
                <div className={'font-semibold text-gray-800'} onClick={() => {router.push(`/products/${item.id}/`)}}>
                  THB {item.price}
                </div>
              </div>
              <Heart
                className={`w-5 h-5 cursor-pointer transition-colors ${
                  favourite.includes(item.id) ? 'text-red-600 fill-red-600' : 'text-gray-500'
                }`}
                onClick={() => handleLike(item.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}