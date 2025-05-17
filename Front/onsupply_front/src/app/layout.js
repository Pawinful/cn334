// components/layout.jsx
'use client'
import { usePathname } from "next/navigation";
import "./globals.css";

import { Heart, LogOut, ShoppingCart } from 'lucide-react'
import Navbar from "./navbar";

export default function Layout({ children }) {
  const pathname = usePathname();
  const hideLayout = pathname.startsWith('/auth');

  return (
    <html>
      <body>
          {hideLayout
          ?
            <>{children}</>
          :
            <div className="font-sans px-4 py-4">
              <Navbar />
              <main className="mt-6">
                {children}
              </main>
            </div>
          }
      </body>
    </html>
  )
}
