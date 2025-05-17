'use client'
import Image from 'next/image'
import useAuth from "../../hooks/useAuth"

export default function HomePage() {
  const loading = useAuth()
  
  if (loading) return null 

  return (
    <div className="font-sans">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a href="/catalogue" className="sm:col-span-2 relative">
            <div>
              <Image src="/math.jpg" alt="CPU" className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-lg" />
              <div className="absolute bottom-4 right-6 text-black font-semibold text-sm sm:text-base hover:underline cursor-pointer">
                MORE &gt;
              </div>
            </div>
          </a>

          <a href="/catalogue" className="relative">
            <div className="relative">
              <Image src="/computer.webp" alt="SSD" className="w-full h-48 sm:h-64 object-cover rounded-lg" />
              <div className="absolute bottom-4 left-4 text-white font-bold">Computer Course</div>
              <div className="absolute top-2 right-2 text-white font-semibold text-xs sm:text-sm">MORE &gt;</div>
            </div>
          </a>

          <a href="/catalogue" className="relative">
            <div className="relative">
              <Image src="/lifecoach.jpg" alt="Memory" className="w-full h-48 sm:h-64 object-cover rounded-lg" />
              <div className="absolute bottom-4 left-4 text-white font-bold">Life Coach</div>
              <div className="absolute top-2 right-2 text-white font-semibold text-xs sm:text-sm">MORE &gt;</div>
            </div>
          </a>
        </div>
        
        <div className="relative">
          <a href="/catalogue" className="sm:col-span-2 relative">
            <Image src="/talking.jpg" alt="Graphic Card" className="w-full h-64 sm:h-full object-cover rounded-lg" />
            <div className="absolute bottom-4 left-4 text-white text-lg sm:text-xl font-bold">Talking Skill</div>
          </a>
        </div>
      </div>
    </div>
  )
}