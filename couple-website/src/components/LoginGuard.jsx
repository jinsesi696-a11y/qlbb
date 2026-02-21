import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { coupleInfo } from '../data/siteData'

export default function LoginGuard({ onLogin }) {
  const [pw, setPw] = useState('')
  const [error, setError] = useState(false)
  const [shake, setShake] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (pw === coupleInfo.password) {
      onLogin(false) // 观看模式
    } else if (pw === '0304') {
      onLogin(true) // 编辑模式
    } else {
      setError(true)
      setShake(true)
      setTimeout(() => setShake(false), 500)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-100 via-pink-50 to-purple-100 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="absolute text-2xl animate-float" style={{
            left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`, opacity: 0.3,
          }}>💕</div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className={`glass-card p-10 w-full max-w-sm text-center`}
        style={shake ? { animation: 'shake 0.5s ease-in-out' } : {}}
      >
        <div className="text-6xl mb-4 heartbeat">💑</div>
        <h1 className="text-2xl font-romantic text-romantic mb-2">{coupleInfo.motto}</h1>
        <p className="text-sm text-gray-400 mb-8">{coupleInfo.person1} & {coupleInfo.person2} 的专属空间</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={pw}
            onChange={e => { setPw(e.target.value); setError(false) }}
            placeholder="输入我们的暗号..."
            className="w-full px-5 py-3 rounded-full bg-white/70 border border-rose-200 focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-200 text-center text-gray-600 placeholder-gray-300 transition-all"
            aria-label="密码"
          />
          {error && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-rose-400 text-sm">
              暗号不对哦，再想想～
            </motion.p>
          )}
          <button type="submit" className="w-full py-3 rounded-full romantic-gradient text-white font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
            进入我们的世界 💕
          </button>
        </form>
      </motion.div>
    </div>
  )
}
