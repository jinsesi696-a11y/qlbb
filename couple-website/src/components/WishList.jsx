import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useData } from '../data/DataContext'
import { EditableText, AddButton, DeleteButton } from './EditableField'

function WishCard({ wish, index }) {
  const { wishList, editMode, updateField } = useData()
  const update = (key, val) => {
    const arr = [...wishList]
    arr[index] = { ...arr[index], [key]: val }
    updateField('wishList', arr)
  }
  const remove = () => updateField('wishList', wishList.filter((_, i) => i !== index))
  const toggleDone = () => {
    update('done', !wish.done)
    if (!wish.done) update('doneDate', new Date().toISOString().slice(0, 10))
  }

  return (
    <motion.div layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
      className={`glass-card p-4 flex items-center gap-4 transition-all relative ${wish.done ? 'bg-green-50/60' : ''}`}>
      <DeleteButton onClick={remove} />
      {editMode && (
        <button onClick={toggleDone} className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${wish.done ? 'bg-green-400 border-green-400 text-white' : 'border-gray-300 hover:border-green-400'}`}>
          {wish.done && '✓'}
        </button>
      )}
      <EditableText value={wish.icon} onSave={v => update('icon', v)} className="text-3xl" />
      <div className="flex-1">
        <EditableText value={wish.text} onSave={v => update('text', v)} className={`font-medium ${wish.done ? 'text-green-600 line-through' : 'text-gray-700'}`} />
        {wish.done && <p className="text-xs text-green-400 mt-1">✅ 已完成 · {wish.doneDate}</p>}
      </div>
      {wish.done && (
        <div className="px-3 py-1 rounded-full bg-gradient-to-r from-green-400 to-emerald-400 text-white text-xs shadow-md">🏆 达成</div>
      )}
    </motion.div>
  )
}

function RandomDateGenerator() {
  const { dateActivities = [] } = useData()
  const activities = dateActivities.length > 0 ? dateActivities : ['散步30分钟', '买一杯奶茶', '拍5张合照', '去书店逛逛', '一起做饭', '看一部电影', '去公园野餐', '一起画画', '逛夜市', '骑自行车']
  const [plan, setPlan] = useState(null)
  const generate = () => { const s = [...activities].sort(() => Math.random() - 0.5); setPlan(s.slice(0, 3)) }

  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-romantic text-romantic mb-4">🎲 随机约会生成器</h3>
      <button onClick={generate} className="w-full py-3 rounded-full romantic-gradient text-white font-medium hover:shadow-lg hover:scale-105 transition-all mb-4">
        生成今日约会计划 💫
      </button>
      <AnimatePresence mode="wait">
        {plan && (
          <motion.div key={plan.join(',')} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-white/50 rounded-xl p-4">
            <p className="text-sm text-gray-400 mb-3">今天的约会安排：</p>
            {plan.map((item, i) => (
              <div key={i} className="flex items-center gap-3 mb-2">
                <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-500 text-xs flex items-center justify-center font-medium">{i + 1}</span>
                <span className="text-sm text-gray-600">{item}</span>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function QuizGame() {
  const { quizQuestions, editMode, updateField } = useData()
  const [qIndex, setQIndex] = useState(0)
  const [answers, setAnswers] = useState([null, null])
  const [phase, setPhase] = useState('p1')
  const q = quizQuestions[qIndex]

  const handleAnswer = (optIndex) => {
    if (phase === 'p1') { setAnswers([optIndex, null]); setPhase('p2') }
    else if (phase === 'p2') { setAnswers(prev => [prev[0], optIndex]); setPhase('result') }
  }
  const nextQ = () => { setQIndex((qIndex + 1) % quizQuestions.length); setAnswers([null, null]); setPhase('p1') }
  const match = answers[0] === answers[1]

  const updateQ = (key, val) => {
    const arr = [...quizQuestions]
    arr[qIndex] = { ...arr[qIndex], [key]: val }
    updateField('quizQuestions', arr)
  }
  const updateOpt = (oi, val) => {
    const arr = [...quizQuestions]
    const opts = [...arr[qIndex].options]
    opts[oi] = val
    arr[qIndex] = { ...arr[qIndex], options: opts }
    updateField('quizQuestions', arr)
  }

  if (!q) return null

  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-romantic text-romantic mb-4">🎯 默契问答</h3>
      <div className="bg-white/50 rounded-xl p-4 mb-4">
        <p className="text-sm text-gray-400 mb-1">第 {qIndex + 1} 题</p>
        <EditableText value={q.q} onSave={v => updateQ('q', v)} className="text-gray-700 font-medium" />
      </div>
      {phase !== 'result' && (
        <>
          <p className="text-xs text-rose-400 mb-3">{phase === 'p1' ? '👤 第一个人作答（别让对方看到）' : '👤 第二个人作答'}</p>
          <div className="grid grid-cols-2 gap-2">
            {q.options.map((opt, i) => (
              <button key={i} onClick={() => handleAnswer(i)}
                className="px-4 py-3 rounded-xl bg-white/60 text-sm text-gray-600 hover:bg-rose-100 hover:text-rose-500 transition-all">
                {editMode ? (
                  <input type="text" value={opt} onChange={e => updateOpt(i, e.target.value)} onClick={e => e.stopPropagation()}
                    className="bg-yellow-50 border border-yellow-300 rounded px-1 w-full text-center text-sm" />
                ) : opt}
              </button>
            ))}
          </div>
        </>
      )}
      {phase === 'result' && (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <div className={`text-5xl mb-3 ${match ? 'heartbeat' : ''}`}>{match ? '💕' : '😅'}</div>
          <p className={`text-lg font-medium ${match ? 'text-green-500' : 'text-orange-400'}`}>{match ? '默契满分！' : '还需要更了解对方哦～'}</p>
          <p className="text-sm text-gray-400 mt-2">答案：{q.options[answers[0]]} vs {q.options[answers[1]]}</p>
          <button onClick={nextQ} className="mt-4 px-6 py-2 rounded-full romantic-gradient text-white text-sm hover:shadow-lg transition-all">下一题 →</button>
        </motion.div>
      )}
    </div>
  )
}

function VoteWidget() {
  const [options] = useState(['火锅', '日料', '烧烤', '麻辣烫', '自己做'])
  const [votes, setVotes] = useState({})
  const [voted, setVoted] = useState(false)
  const handleVote = (opt) => { setVotes(prev => ({ ...prev, [opt]: (prev[opt] || 0) + 1 })); setVoted(true) }
  const total = Object.values(votes).reduce((a, b) => a + b, 0)

  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-romantic text-romantic mb-4">🗳️ 今晚吃什么？</h3>
      <div className="space-y-2">
        {options.map(opt => {
          const count = votes[opt] || 0
          const pct = total > 0 ? Math.round((count / total) * 100) : 0
          return (
            <button key={opt} onClick={() => !voted && handleVote(opt)} disabled={voted}
              className="w-full relative overflow-hidden rounded-xl bg-white/60 text-left transition-all hover:bg-rose-50 disabled:cursor-default">
              {voted && <div className="absolute inset-y-0 left-0 bg-rose-100 transition-all duration-500" style={{ width: `${pct}%` }} />}
              <div className="relative px-4 py-3 flex justify-between items-center">
                <span className="text-sm text-gray-600">{opt}</span>
                {voted && <span className="text-xs text-rose-400">{pct}%</span>}
              </div>
            </button>
          )
        })}
      </div>
      {voted && <button onClick={() => { setVotes({}); setVoted(false) }} className="mt-3 text-xs text-gray-400 hover:text-rose-400 transition-colors">重新投票</button>}
    </div>
  )
}

export default function WishList() {
  const { wishList, updateField } = useData()
  const done = wishList.filter(w => w.done)
  const todo = wishList.filter(w => !w.done)

  const add = () => {
    const newId = Math.max(0, ...wishList.map(w => w.id)) + 1
    updateField('wishList', [...wishList, { id: newId, text: '新愿望...', done: false, icon: '✨' }])
  }

  return (
    <div>
      <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-3xl font-romantic text-romantic text-center mb-6">⭐ 愿望清单</motion.h2>
      <div className="glass-card p-4 mb-6 text-center">
        <p className="text-sm text-gray-400 mb-2">完成进度</p>
        <div className="w-full bg-gray-100 rounded-full h-3 mb-2">
          <div className="h-3 rounded-full romantic-gradient transition-all duration-500" style={{ width: `${wishList.length > 0 ? (done.length / wishList.length) * 100 : 0}%` }} />
        </div>
        <p className="text-xs text-gray-400">{done.length} / {wishList.length} 已完成</p>
      </div>
      <h3 className="text-sm text-gray-400 mb-3">🌟 还想一起做的事</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
        {todo.map((w) => <WishCard key={w.id} wish={w} index={wishList.indexOf(w)} />)}
      </div>
      <h3 className="text-sm text-gray-400 mb-3">✅ 已经一起做过的事</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
        {done.map((w) => <WishCard key={w.id} wish={w} index={wishList.indexOf(w)} />)}
      </div>
      <div className="mb-10"><AddButton onClick={add} label="添加愿望" /></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <RandomDateGenerator />
        <VoteWidget />
      </div>
      <QuizGame />
    </div>
  )
}
