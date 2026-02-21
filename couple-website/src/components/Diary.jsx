import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useData } from '../data/DataContext'
import { EditableText, AddButton, DeleteButton } from './EditableField'

function DiaryCard({ diary, index }) {
  const { diaries, editMode, updateField } = useData()
  const [open, setOpen] = useState(false)
  const isLetter = diary.type === 'letter'

  const update = (key, val) => {
    const arr = [...diaries]
    arr[index] = { ...arr[index], [key]: val }
    updateField('diaries', arr)
  }
  const remove = () => updateField('diaries', diaries.filter((_, i) => i !== index))

  return (
    <motion.div layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      className={`glass-card overflow-hidden cursor-pointer hover:shadow-xl transition-all relative ${isLetter ? 'border-l-4 border-rose-300' : ''}`}
      onClick={() => setOpen(!open)}>
      <DeleteButton onClick={remove} />
      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <EditableText value={diary.mood} onSave={v => update('mood', v)} className="text-xl" />
            {editMode ? (
              <select value={diary.type} onChange={e => update('type', e.target.value)}
                className="text-xs px-2 py-0.5 rounded-full bg-yellow-50 border border-yellow-300">
                <option value="letter">💌 信件</option>
                <option value="daily">📝 日常</option>
              </select>
            ) : (
              <span className={`text-xs px-2 py-0.5 rounded-full ${isLetter ? 'bg-rose-100 text-rose-500' : 'bg-blue-100 text-blue-500'}`}>
                {isLetter ? '💌 信件' : '📝 日常'}
              </span>
            )}
          </div>
          {editMode ? (
            <input type="date" value={diary.date} onChange={e => update('date', e.target.value)}
              className="text-xs border border-yellow-300 rounded px-2 py-0.5 bg-yellow-50" />
          ) : (
            <span className="text-xs text-gray-300">{diary.date}</span>
          )}
        </div>
        <EditableText value={diary.title} onSave={v => update('title', v)} tag="h3" className="font-medium text-gray-700 mb-1" />
        <div className="flex items-center gap-1">
          <span className="text-xs text-gray-400">——</span>
          <EditableText value={diary.from} onSave={v => update('from', v)} className="text-xs text-gray-400" />
        </div>
        <AnimatePresence>
          {open && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
              <div className={`mt-4 p-4 rounded-xl text-sm leading-relaxed ${isLetter ? 'bg-rose-50/50 text-gray-600 italic' : 'bg-blue-50/50 text-gray-600'}`}>
                {isLetter && <p className="text-rose-300 text-xs mb-2">亲爱的，</p>}
                <EditableText value={diary.content} onSave={v => update('content', v)} className="text-sm text-gray-600" multiline />
                {isLetter && <p className="text-rose-300 text-xs mt-3 text-right">永远爱你的 {diary.from}</p>}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

function GratitudeWall() {
  const { gratitudeList, editMode, updateField } = useData()

  const update = (i, key, val) => {
    const arr = [...gratitudeList]
    arr[i] = { ...arr[i], [key]: val }
    updateField('gratitudeList', arr)
  }
  const remove = (i) => updateField('gratitudeList', gratitudeList.filter((_, idx) => idx !== i))
  const add = () => updateField('gratitudeList', [...gratitudeList, { date: new Date().toISOString().slice(0, 10), text: '谢谢你...', from: '我' }])

  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-romantic text-romantic mb-4">🙏 感谢清单</h3>
      <p className="text-xs text-gray-400 mb-4">记录对方做过的每一件小事</p>
      <div className="space-y-3">
        {gratitudeList.map((item, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
            className="flex items-start gap-3 bg-white/40 rounded-xl p-3 relative">
            <DeleteButton onClick={() => remove(i)} />
            <span className="text-rose-400 mt-0.5">♥</span>
            <div className="flex-1">
              <EditableText value={item.text} onSave={v => update(i, 'text', v)} className="text-sm text-gray-600" />
              <div className="flex items-center gap-1 mt-1">
                <span className="text-xs text-gray-300">——</span>
                <EditableText value={item.from} onSave={v => update(i, 'from', v)} className="text-xs text-gray-300" />
                <span className="text-xs text-gray-300">·</span>
                {editMode ? (
                  <input type="date" value={item.date} onChange={e => update(i, 'date', e.target.value)}
                    className="text-xs border border-yellow-300 rounded px-1 bg-yellow-50" />
                ) : (
                  <span className="text-xs text-gray-300">{item.date}</span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="mt-3"><AddButton onClick={add} label="添加感谢" /></div>
    </div>
  )
}

function MoodTracker() {
  const moods = ['😊', '🥰', '😢', '😤', '😴', '🤗', '😂', '🥺']
  const [selected, setSelected] = useState(null)
  const [note, setNote] = useState('')
  const [saved, setSaved] = useState(false)
  const handleSave = () => { if (selected !== null) { setSaved(true); setTimeout(() => setSaved(false), 2000) } }

  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-romantic text-romantic mb-4">😊 今日心情打卡</h3>
      <div className="flex gap-2 justify-center mb-4 flex-wrap">
        {moods.map((m, i) => (
          <button key={i} onClick={() => setSelected(i)}
            className={`text-2xl p-2 rounded-xl transition-all ${selected === i ? 'bg-rose-100 scale-125 shadow-md' : 'hover:scale-110'}`}
          >{m}</button>
        ))}
      </div>
      <input type="text" value={note} onChange={e => setNote(e.target.value)} placeholder="用10个字描述今天..." maxLength={10}
        className="w-full px-4 py-2 rounded-full bg-white/60 border border-rose-100 focus:border-rose-300 focus:outline-none text-sm text-center text-gray-600 placeholder-gray-300" aria-label="心情备注" />
      <button onClick={handleSave} className="w-full mt-3 py-2 rounded-full romantic-gradient text-white text-sm hover:shadow-lg transition-all">
        {saved ? '已记录 ✓' : '打卡'}
      </button>
    </div>
  )
}

export default function Diary() {
  const { diaries, updateField } = useData()
  const [tab, setTab] = useState('all')
  const filtered = tab === 'all' ? diaries : tab === 'letter' ? diaries.filter(d => d.type === 'letter') : diaries.filter(d => d.type === 'daily')

  const add = () => {
    const newId = Math.max(0, ...diaries.map(d => d.id)) + 1
    updateField('diaries', [...diaries, { id: newId, date: new Date().toISOString().slice(0, 10), type: 'daily', title: '新日记', content: '写点什么...', mood: '😊', from: '我' }])
  }

  return (
    <div>
      <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-3xl font-romantic text-romantic text-center mb-6">✉️ 日记 & 信箱</motion.h2>
      <div className="flex justify-center gap-2 mb-8">
        {[{ id: 'all', label: '全部' }, { id: 'letter', label: '💌 信件' }, { id: 'daily', label: '📝 日常' }].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`px-4 py-2 rounded-full text-sm transition-all ${tab === t.id ? 'romantic-gradient text-white shadow-lg' : 'bg-white/60 text-gray-500 hover:bg-rose-50'}`}
          >{t.label}</button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {filtered.map((diary, i) => <DiaryCard key={diary.id} diary={diary} index={diaries.indexOf(diary)} />)}
      </div>
      <div className="mb-8"><AddButton onClick={add} label="写新日记" /></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MoodTracker />
        <GratitudeWall />
      </div>
    </div>
  )
}
