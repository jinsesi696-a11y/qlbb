import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useData } from '../data/DataContext'
import { EditableText, AddButton, DeleteButton } from './EditableField'

export default function MusicPlayer() {
  const { playlist, editMode, updateField } = useData()
  const [open, setOpen] = useState(false)
  const [current, setCurrent] = useState(0)

  const update = (i, key, val) => {
    const arr = [...playlist]
    arr[i] = { ...arr[i], [key]: val }
    updateField('playlist', arr)
  }
  const remove = (i) => {
    const arr = playlist.filter((_, idx) => idx !== i)
    updateField('playlist', arr)
    if (current >= arr.length) setCurrent(Math.max(0, arr.length - 1))
  }
  const add = () => {
    updateField('playlist', [...playlist, { title: '新歌曲', artist: '歌手', story: '这首歌的故事...' }])
  }

  if (playlist.length === 0) {
    if (!editMode) return null
    return (
      <button onClick={() => { add(); setOpen(true) }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full romantic-gradient text-white shadow-xl hover:shadow-2xl hover:scale-110 transition-all flex items-center justify-center text-xl"
        aria-label="音乐播放器">🎵</button>
    )
  }

  const song = playlist[current] || playlist[0]

  return (
    <>
      <button onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full romantic-gradient text-white shadow-xl hover:shadow-2xl hover:scale-110 transition-all flex items-center justify-center text-xl"
        aria-label="音乐播放器">🎵</button>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: 50, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-24 right-6 z-50 w-80 glass-card p-5 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-romantic text-romantic text-lg">🎵 我们的歌单</h3>
              <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-600 text-sm">✕</button>
            </div>

            <div className="bg-white/50 rounded-xl p-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl romantic-gradient flex items-center justify-center text-white text-xl animate-pulse-slow">♪</div>
                <div className="flex-1">
                  <EditableText value={song.title} onSave={v => update(current, 'title', v)} className="text-sm font-medium text-gray-700" />
                  <EditableText value={song.artist} onSave={v => update(current, 'artist', v)} className="text-xs text-gray-400" />
                </div>
              </div>
              <EditableText value={song.story} onSave={v => update(current, 'story', v)} className="text-xs text-rose-400 italic mt-2 block" />
              <div className="mt-3 h-1 bg-gray-100 rounded-full overflow-hidden"><div className="h-full w-1/3 romantic-gradient rounded-full" /></div>
              <div className="flex items-center justify-center gap-6 mt-3">
                <button onClick={() => setCurrent((current - 1 + playlist.length) % playlist.length)} className="text-gray-400 hover:text-rose-400 transition-colors">⏮</button>
                <button className="w-10 h-10 rounded-full romantic-gradient text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all">▶</button>
                <button onClick={() => setCurrent((current + 1) % playlist.length)} className="text-gray-400 hover:text-rose-400 transition-colors">⏭</button>
              </div>
            </div>

            <div className="max-h-48 overflow-y-auto space-y-1 pr-1">
              {playlist.map((s, i) => (
                <div key={i} className="flex items-center gap-1 relative group">
                  {editMode && (
                    <button onClick={() => remove(i)} className="text-red-400 text-xs opacity-0 group-hover:opacity-100 shrink-0">✕</button>
                  )}
                  <button onClick={() => setCurrent(i)}
                    className={`flex-1 text-left px-3 py-2 rounded-lg text-sm transition-all ${current === i ? 'bg-rose-100 text-rose-600' : 'text-gray-500 hover:bg-rose-50'}`}>
                    <span className="mr-2">{current === i ? '♪' : `${i + 1}.`}</span>
                    {s.title}
                    <span className="text-xs text-gray-300 ml-2">- {s.artist}</span>
                  </button>
                </div>
              ))}
            </div>

            {editMode && (
              <button onClick={add} className="w-full mt-2 py-2 border-2 border-dashed border-yellow-300 rounded-xl text-yellow-500 text-xs hover:bg-yellow-50 transition-all">
                + 添加歌曲
              </button>
            )}

            <p className="text-xs text-gray-300 text-center mt-3 italic">（接入真实音频后即可播放）</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
