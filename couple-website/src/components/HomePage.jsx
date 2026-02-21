import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useData } from '../data/DataContext'
import { EditableText, EditableImage } from './EditableField'

function DayCounter() {
  const { coupleInfo, editMode, updateField } = useData()
  const start = new Date(coupleInfo.startDate)
  const now = new Date()
  const days = Math.floor((now - start) / (1000 * 60 * 60 * 24))

  return (
    <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.3 }} className="glass-card p-8 text-center">
      <p className="text-gray-400 text-sm mb-2">我们已经在一起</p>
      {editMode && (
        <div className="mb-2">
          <label className="text-xs text-yellow-500 mr-2">起始日期:</label>
          <input type="date" value={coupleInfo.startDate}
            onChange={e => updateField('coupleInfo', { ...coupleInfo, startDate: e.target.value })}
            className="text-xs border border-yellow-300 rounded px-2 py-1 bg-yellow-50"
          />
        </div>
      )}
      <div className="flex items-center justify-center gap-1">
        {String(days).split('').map((d, i) => (
          <motion.span key={i} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 + i * 0.1 }}
            className="inline-block w-12 h-16 leading-[4rem] text-3xl font-bold text-romantic bg-rose-50 rounded-xl"
          >{d}</motion.span>
        ))}
      </div>
      <p className="text-gray-400 text-sm mt-2">天 💕</p>
    </motion.div>
  )
}

function TodayMemory() {
  const { timelineEvents } = useData()
  const today = new Date()
  const mm = String(today.getMonth() + 1).padStart(2, '0')
  const dd = String(today.getDate()).padStart(2, '0')
  const todayEvents = timelineEvents.filter(e => e.date.slice(5) === `${mm}-${dd}`)
  if (todayEvents.length === 0) return null
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="glass-card p-6">
      <h3 className="text-sm text-rose-400 mb-3">📅 今日推荐回忆 · 历史上的今天</h3>
      {todayEvents.map((e, i) => (
        <div key={i} className="flex gap-4 items-center">
          <img src={e.image} alt={e.title} className="w-20 h-20 rounded-xl object-cover" />
          <div>
            <p className="font-medium text-gray-700">{e.title}</p>
            <p className="text-sm text-gray-400">{e.date} · {e.location}</p>
            <p className="text-sm text-gray-500 mt-1">{e.text}</p>
          </div>
        </div>
      ))}
    </motion.div>
  )
}

function RandomMemory() {
  const { timelineEvents, diaries } = useData()
  const [memory, setMemory] = useState(null)
  const allMemories = useMemo(() => [
    ...timelineEvents.map(e => ({ type: 'event', ...e })),
    ...diaries.map(d => ({ type: 'diary', ...d })),
  ], [timelineEvents, diaries])

  const roll = () => {
    const m = allMemories[Math.floor(Math.random() * allMemories.length)]
    setMemory(m)
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="glass-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm text-rose-400">🎲 随机回忆</h3>
        <button onClick={roll} className="px-4 py-2 rounded-full bg-rose-100 text-rose-500 text-sm hover:bg-rose-200 transition-colors">抽一个回忆</button>
      </div>
      {memory && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white/50 rounded-xl p-4">
          {memory.image && <img src={memory.image} alt="" className="w-full h-40 object-cover rounded-lg mb-3" />}
          <p className="font-medium text-gray-700">{memory.title}</p>
          <p className="text-sm text-gray-400 mt-1">{memory.date}</p>
          <p className="text-sm text-gray-500 mt-2">{memory.text || memory.content}</p>
        </motion.div>
      )}
      {!memory && <p className="text-gray-300 text-sm text-center py-4">点击按钮，随机回忆一个美好瞬间 ✨</p>}
    </motion.div>
  )
}

function WeeklySummary() {
  const { albums } = useData()
  const photos = albums[0]?.photos?.slice(0, 3) || []
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} className="glass-card p-6">
      <h3 className="text-sm text-rose-400 mb-3">📸 精选回忆</h3>
      <div className="grid grid-cols-3 gap-2 mb-3">
        {photos.map((p, i) => (
          <img key={i} src={p.url} alt={p.caption} className="w-full h-24 object-cover rounded-lg" />
        ))}
      </div>
      <p className="text-sm text-gray-500 italic">"每一张照片都是一个故事，每一个故事都有你。"</p>
    </motion.div>
  )
}

export default function HomePage({ onNavigate }) {
  const { coupleInfo, editMode, updateField } = useData()

  const updateInfo = (key, val) => {
    updateField('coupleInfo', { ...coupleInfo, [key]: val })
  }

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-8">
        <EditableText value={coupleInfo.motto} onSave={v => updateInfo('motto', v)} tag="h1" className="text-4xl md:text-5xl font-romantic text-romantic mb-3" />
        <div className="text-gray-400">
          <EditableText value={coupleInfo.person1} onSave={v => updateInfo('person1', v)} className="text-gray-400 inline" />
          <span> & </span>
          <EditableText value={coupleInfo.person2} onSave={v => updateInfo('person2', v)} className="text-gray-400 inline" />
        </div>
        <EditableText value={coupleInfo.subtitle} onSave={v => updateInfo('subtitle', v)} tag="p" className="text-sm text-gray-300 mt-1" />
      </motion.div>

      <DayCounter />
      <TodayMemory />
      <RandomMemory />
      <WeeklySummary />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }} className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { id: 'timeline', icon: '📖', label: '我们的故事', color: 'from-rose-400 to-pink-400' },
          { id: 'albums', icon: '📷', label: '相册', color: 'from-purple-400 to-pink-400' },
          { id: 'diary', icon: '✉️', label: '日记信箱', color: 'from-orange-400 to-rose-400' },
          { id: 'wishlist', icon: '⭐', label: '愿望清单', color: 'from-blue-400 to-purple-400' },
        ].map(item => (
          <button key={item.id} onClick={() => onNavigate(item.id)}
            className={`bg-gradient-to-br ${item.color} text-white rounded-2xl p-5 text-center hover:scale-105 hover:shadow-lg transition-all duration-300`}
          >
            <div className="text-3xl mb-2">{item.icon}</div>
            <div className="text-sm font-medium">{item.label}</div>
          </button>
        ))}
      </motion.div>
    </div>
  )
}
