import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useData } from '../data/DataContext'
import { EditableText, EditableImage, AddButton, DeleteButton } from './EditableField'

export default function Videos() {
  const { videos, editMode, updateField } = useData()
  const categories = ['全部', ...new Set(videos.map(v => v.category))]
  const [cat, setCat] = useState('全部')
  const filtered = cat === '全部' ? videos : videos.filter(v => v.category === cat)

  const update = (id, key, val) => {
    updateField('videos', videos.map(v => v.id === id ? { ...v, [key]: val } : v))
  }
  const remove = (id) => updateField('videos', videos.filter(v => v.id !== id))
  const add = () => {
    const newId = Math.max(0, ...videos.map(v => v.id)) + 1
    updateField('videos', [...videos, { id: newId, title: '新视频', category: '日常', thumbnail: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=400&h=225&fit=crop', url: '#', duration: '0:00', desc: '描述...' }])
  }

  return (
    <div>
      <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-3xl font-romantic text-romantic text-center mb-6">🎬 视频</motion.h2>
      <div className="flex justify-center gap-2 mb-8 flex-wrap">
        {categories.map(c => (
          <button key={c} onClick={() => setCat(c)}
            className={`px-4 py-2 rounded-full text-sm transition-all ${cat === c ? 'romantic-gradient text-white shadow-lg' : 'bg-white/60 text-gray-500 hover:bg-rose-50'}`}
          >{c}</button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((video, i) => (
          <motion.div key={video.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="glass-card overflow-hidden group hover:shadow-xl transition-all relative">
            <DeleteButton onClick={() => remove(video.id)} />
            <div className="relative overflow-hidden">
              <EditableImage src={video.thumbnail} alt={video.title} onSave={v => update(video.id, 'thumbnail', v)}
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                  <span className="text-rose-500 text-2xl ml-1">▶</span>
                </div>
              </div>
              <span className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-lg">{video.duration}</span>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <EditableText value={video.category} onSave={v => update(video.id, 'category', v)} className="text-xs px-2 py-0.5 rounded-full bg-rose-100 text-rose-500" />
                {editMode && (
                  <input type="text" value={video.duration} onChange={e => update(video.id, 'duration', e.target.value)}
                    className="text-xs px-2 py-0.5 rounded bg-yellow-50 border border-yellow-300 w-16" placeholder="时长" />
                )}
              </div>
              <EditableText value={video.title} onSave={v => update(video.id, 'title', v)} tag="h3" className="font-medium text-gray-700" />
              <EditableText value={video.desc} onSave={v => update(video.id, 'desc', v)} tag="p" className="text-sm text-gray-400 mt-1" />
              {editMode && (
                <div className="mt-2">
                  <label className="text-xs text-yellow-500">视频链接: </label>
                  <input type="text" value={video.url} onChange={e => update(video.id, 'url', e.target.value)}
                    className="text-xs px-2 py-1 rounded bg-yellow-50 border border-yellow-300 w-full mt-1" placeholder="https://..." />
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
      <div className="mt-6"><AddButton onClick={add} label="添加视频" /></div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-10 glass-card p-6">
        <h3 className="text-lg font-romantic text-romantic mb-4">👀 对方视角</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="bg-rose-50 rounded-xl p-4 mb-2">
              <p className="text-3xl mb-2">📱</p>
              <p className="text-sm text-gray-500">他拍的她</p>
            </div>
            <p className="text-xs text-gray-400">偷拍的、认真拍的、搞怪的...</p>
          </div>
          <div className="text-center">
            <div className="bg-purple-50 rounded-xl p-4 mb-2">
              <p className="text-3xl mb-2">📱</p>
              <p className="text-sm text-gray-500">她拍的他</p>
            </div>
            <p className="text-xs text-gray-400">帅气的、犯傻的、认真的...</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
