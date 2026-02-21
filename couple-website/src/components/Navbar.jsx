import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useData } from '../data/DataContext'

export default function Navbar({ pages, current, onChange }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const { coupleInfo } = useData()

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 glass-card rounded-none border-x-0 border-t-0" style={{ marginTop: 0 }}>
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <button onClick={() => onChange('home')} className="flex items-center gap-2 hover:scale-105 transition-transform">
            <span className="text-xl heartbeat">💕</span>
            <span className="font-romantic text-lg text-romantic">{coupleInfo.motto}</span>
          </button>
          <div className="hidden md:flex items-center gap-1">
            {pages.map(p => (
              <button key={p.id} onClick={() => onChange(p.id)}
                className={`px-3 py-2 rounded-xl text-sm transition-all duration-300 ${current === p.id ? 'bg-rose-100 text-rose-600 font-medium' : 'text-gray-500 hover:text-rose-400 hover:bg-rose-50'}`}
              ><span className="mr-1">{p.icon}</span>{p.label}</button>
            ))}
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-2xl text-rose-400 hover:text-rose-500 transition-colors" aria-label="菜单">
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 left-0 right-0 z-40 glass-card rounded-t-none border-t-0 p-4 md:hidden">
            <div className="grid grid-cols-2 gap-2">
              {pages.map(p => (
                <button key={p.id} onClick={() => { onChange(p.id); setMenuOpen(false) }}
                  className={`px-4 py-3 rounded-xl text-sm text-left transition-all ${current === p.id ? 'bg-rose-100 text-rose-600 font-medium' : 'text-gray-500 hover:bg-rose-50'}`}
                ><span className="mr-2">{p.icon}</span>{p.label}</button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
