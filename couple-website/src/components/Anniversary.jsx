import React from 'react'
import { motion } from 'framer-motion'
import { useData } from '../data/DataContext'
import { EditableText, AddButton, DeleteButton } from './EditableField'

function getNextOccurrence(dateStr) {
  const now = new Date()
  const orig = new Date(dateStr)
  const next = new Date(now.getFullYear(), orig.getMonth(), orig.getDate())
  if (next < now) next.setFullYear(now.getFullYear() + 1)
  const diff = Math.ceil((next - now) / (1000 * 60 * 60 * 24))
  return { next, diff }
}

function CountdownCard({ anni, index }) {
  const { anniversaries, editMode, updateField } = useData()
  const { diff } = getNextOccurrence(anni.date)
  const isToday = diff === 0
  const isSoon = diff <= 7

  const update = (key, val) => {
    const arr = [...anniversaries]
    arr[index] = { ...arr[index], [key]: val }
    updateField('anniversaries', arr)
  }
  const remove = () => updateField('anniversaries', anniversaries.filter((_, i) => i !== index))

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      className={`glass-card p-5 text-center hover:shadow-xl transition-all relative ${isToday ? 'ring-2 ring-rose-400 bg-rose-50/60' : ''}`}>
      <DeleteButton onClick={remove} />
      <EditableText value={anni.icon} onSave={v => update('icon', v)} className={`text-4xl mb-2 block ${isToday ? 'heartbeat' : ''}`} />
      <EditableText value={anni.name} onSave={v => update('name', v)} tag="h3" className="font-medium text-gray-700 mb-1" />
      {editMode ? (
        <input type="date" value={anni.date} onChange={e => update('date', e.target.value)}
          className="text-xs border border-yellow-300 rounded px-2 py-1 bg-yellow-50 mb-3" />
      ) : (
        <p className="text-xs text-gray-400 mb-3">{anni.date}</p>
      )}
      {isToday ? (
        <div className="px-4 py-2 rounded-full romantic-gradient text-white text-sm inline-block shadow-lg">🎉 就是今天！</div>
      ) : (
        <div>
          <span className="text-3xl font-bold text-romantic">{diff}</span>
          <span className="text-sm text-gray-400 ml-1">天后</span>
          {isSoon && <p className="text-xs text-orange-400 mt-1">⏰ 快到了，别忘了准备！</p>}
        </div>
      )}
    </motion.div>
  )
}

function GiftLibrary() {
  const { giftIdeas, editMode, updateField } = useData()

  const updateItem = (pi, ii, key, val) => {
    const arr = [...giftIdeas]
    const items = [...arr[pi].items]
    items[ii] = { ...items[ii], [key]: val }
    arr[pi] = { ...arr[pi], items }
    updateField('giftIdeas', arr)
  }
  const removeItem = (pi, ii) => {
    const arr = [...giftIdeas]
    arr[pi] = { ...arr[pi], items: arr[pi].items.filter((_, i) => i !== ii) }
    updateField('giftIdeas', arr)
  }
  const addItem = (pi) => {
    const arr = [...giftIdeas]
    arr[pi] = { ...arr[pi], items: [...arr[pi].items, { name: '新项目', value: '...' }] }
    updateField('giftIdeas', arr)
  }

  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-romantic text-romantic mb-4">🎁 礼物灵感库</h3>
      <p className="text-xs text-gray-400 mb-4">偷偷记下对方喜欢的东西，送礼不再纠结</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {giftIdeas.map((person, pi) => (
          <div key={pi} className="bg-white/40 rounded-xl p-4">
            <h4 className="font-medium text-gray-700 mb-3 text-center">
              {pi === 0 ? '🎀' : '🎩'}{' '}
              <EditableText value={person.for} onSave={v => { const arr = [...giftIdeas]; arr[pi] = { ...arr[pi], for: v }; updateField('giftIdeas', arr) }}
                className="font-medium text-gray-700 inline" /> 的喜好
            </h4>
            <div className="space-y-2">
              {person.items.map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm relative group">
                  {editMode && (
                    <button onClick={() => removeItem(pi, i)} className="text-red-400 text-xs opacity-0 group-hover:opacity-100 transition-opacity">✕</button>
                  )}
                  <span className="text-rose-300">♦</span>
                  <EditableText value={item.name} onSave={v => updateItem(pi, i, 'name', v)} className="text-gray-500 w-24 shrink-0" />
                  <EditableText value={item.value} onSave={v => updateItem(pi, i, 'value', v)} className="text-gray-600" />
                </div>
              ))}
            </div>
            {editMode && (
              <button onClick={() => addItem(pi)} className="mt-2 text-xs text-yellow-500 hover:text-yellow-600">+ 添加项目</button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function MovieList() {
  const movies = [
    { name: '你的名字', rating: '⭐⭐⭐⭐⭐', comment: '看哭了三次' },
    { name: '怦然心动', rating: '⭐⭐⭐⭐⭐', comment: '最美的初恋电影' },
    { name: '千与千寻', rating: '⭐⭐⭐⭐', comment: '一起在电影院重温' },
    { name: '爱乐之城', rating: '⭐⭐⭐⭐', comment: '结局让人意难平' },
    { name: '情书', rating: '⭐⭐⭐⭐⭐', comment: '你好吗？我很好。' },
  ]
  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-romantic text-romantic mb-4">🎬 一起看过的电影</h3>
      <div className="space-y-3">
        {movies.map((m, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
            className="flex items-center gap-3 bg-white/40 rounded-xl p-3">
            <span className="text-lg">🎞️</span>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-700">{m.name}</p>
              <p className="text-xs text-gray-400">{m.comment}</p>
            </div>
            <span className="text-xs">{m.rating}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default function Anniversary() {
  const { anniversaries, updateField } = useData()

  const add = () => {
    updateField('anniversaries', [...anniversaries, { name: '新纪念日', date: new Date().toISOString().slice(0, 10), icon: '🎉', recurring: true }])
  }

  return (
    <div>
      <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-3xl font-romantic text-romantic text-center mb-6">🎁 纪念日工具箱</motion.h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
        {anniversaries.map((a, i) => <CountdownCard key={i} anni={a} index={i} />)}
      </div>
      <div className="mb-8"><AddButton onClick={add} label="添加纪念日" /></div>
      <div className="space-y-6">
        <GiftLibrary />
        <MovieList />
      </div>
    </div>
  )
}
