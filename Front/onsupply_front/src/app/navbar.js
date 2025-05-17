'use client'

import { useState } from "react";
import { Heart, LogOut, ShoppingCart, Menu } from "lucide-react";
import useLogout from "../../hooks/useLogout";
import useAuth from "../../hooks/useAuth";

export default function Navbar() {
  const logout = useLogout()
  const loading = useAuth()
  const [isOpen, setIsOpen] = useState(false);

  if (loading) return null 

  return (
    <nav className="border-b">
      <div className="flex justify-between items-center py-4 px-6 md:px-10">
        <div className="text-2xl font-bold">OnSupply</div>

        {/* Mobile toggle button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          <Menu className="w-9 h-9 cursor-pointer rounded-lg hover:bg-gray-300 p-1" />
        </button>

        {/* Menu: Desktop */}
        <div className="hidden md:flex space-x-6 items-center">
          <a href="/" className="font-medium rounded-xl py-1 px-3 hover:bg-gray-200">HOME</a>
          <a href="/dashboard" className="font-medium rounded-xl py-1 px-3 hover:bg-gray-200">Dashboard</a>
          <a href="/favourite"><Heart className="w-6 h-6 hover:fill-red-500" /></a>
          <a href="/cart" className="rounded-xl py-1 px-3 hover:bg-gray-200"><ShoppingCart className="w-6 h-6" /></a>
          <button onClick={logout} className="flex items-center gap-2 py-2 px-3 hover:bg-gray-100"><LogOut className="w-5 h-5" /></button>
        </div>
      </div>

      {/* Menu: Mobile (slide down) */}
      {isOpen && (
        <div className="flex flex-col space-y-2 px-6 pb-4 md:hidden">
          <a href="/" className="font-medium rounded-xl py-2 px-3 hover:bg-gray-100">HOME</a>
          <a href="/dashboard" className="font-medium rounded-xl py-2 px-3 hover:bg-gray-100">Dashboard</a>
          <a href="/favourite" className="flex items-center gap-2 py-2 px-3 hover:bg-gray-100"><Heart className="w-5 h-5 hover:fill-red-500" /> Favourite</a>
          <a href="/cart" className="flex items-center gap-2 py-2 px-3 hover:bg-gray-100"><ShoppingCart className="w-5 h-5" /> Cart</a>
          <button onClick={logout} className="flex items-center gap-2 py-2 px-3 hover:bg-gray-100"><LogOut className="w-5 h-5" /> Logout</button>
        </div>
      )}
    </nav>
  )
}