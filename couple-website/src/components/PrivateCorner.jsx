import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useData } from '../data/DataContext'
import { EditableText, AddButton, DeleteButton } from './EditableField'
import { coupleInfo as defaultInfo } from '../data/siteData'

function ConflictReview() {
  const reviews = [
    { date: '2023-06-15', what: '因为忘记纪念日吵架了', myFault: '太粗心了，没有把重要的日子记在日历上', hopeNext: '以后所有纪念日都设提醒，提前准备', howResolve: '买了一大束花去道歉，一起吃了火锅，约定以后有什么不开心要说出来' },
    { date: '2024-01-20', what: '因为加班太多冷落了对方', myFault: '工作再忙也不应该忽略你的感受', hopeNext: '每天至少留30分钟只属于我们的时间', howResolve: '请了一天假，一起去了我们第一次约会的地方' },
  ]
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-romantic text-romantic">📝 吵架复盘区</h3>
      <p className="text-xs text-gray-400">每一次争吵都是更了解彼此的机会</p>
      {reviews.map((r, i) => (
        <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }}
          className="bg-white/40 rounded-xl p-5 space-y-3">
          <p className="text-xs text-gray-300">{r.date}</p>
          <div><p className="text-xs text-rose-400 mb-1">发生了什么</p><p className="text-sm text-gray-600">{r.what}</p></div>
          <div><p className="text-xs text-orange-400 mb-1">我哪里做得不好</p><p className="text-sm text-gray-600">{r.myFault}</p></div>
          <div><p className="text-xs text-blue-400 mb-1">我希望下次怎样</p><p className="text-sm text-gray-600">{r.hopeNext}</p></div>
          <div><p className="text-xs text-green-400 mb-1">我们如何和好</p><p className="text-sm text-gray-600">{r.howResolve}</p></div>
        </motion.div>
      ))}
    </div>
  )
}

function SecretList() {
  const { coupleInfo } = useData()
  const secrets = [
    { text: '其实第一次见面我就心动了，但装作很淡定', from: coupleInfo.person1 },
    { text: '你不知道的是，我手机里存了300多张你的照片', from: coupleInfo.person2 },
    { text: '每次你先睡着，我都会偷偷看你一会儿', from: coupleInfo.person1 },
    { text: '你送我的第一个礼物我一直放在枕头下面', from: coupleInfo.person2 },
  ]
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-romantic text-romantic">🤫 秘密清单</h3>
      <p className="text-xs text-gray-400">那些没说出口的小秘密</p>
      {secrets.map((s, i) => (
        <motion.div key={i} initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.15 }}
          className={`p-4 rounded-2xl max-w-[85%] ${i % 2 === 0 ? 'bg-rose-100/60 ml-0 rounded-bl-sm' : 'bg-purple-100/60 ml-auto rounded-br-sm'}`}>
          <p className="text-sm text-gray-600 italic">"{s.text}"</p>
          <p className="text-xs text-gray-400 mt-1 text-right">—— {s.from}</p>
        </motion.div>
      ))}
    </div>
  )
}

function VoiceWall() {
  const { coupleInfo } = useData()
  const messages = [
    { from: coupleInfo.person1, text: '晚安，今天辛苦了，做个好梦 🌙', duration: '0:08' },
    { from: coupleInfo.person2, text: '早安呀，今天也要开开心心的 ☀️', duration: '0:05' },
    { from: coupleInfo.person1, text: '想你了...快回来', duration: '0:03' },
    { from: coupleInfo.person2, text: '生日快乐！永远爱你 🎂', duration: '0:10' },
  ]
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-romantic text-romantic">🎙️ 语音留言墙</h3>
      <p className="text-xs text-gray-400">像语音明信片，每一条都是温暖</p>
      {messages.map((m, i) => (
        <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
          className="bg-white/40 rounded-xl p-4 flex items-center gap-3">
          <button className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-500 hover:bg-rose-200 transition-colors shrink-0">▶</button>
          <div className="flex-1">
            <div className="h-2 bg-rose-100 rounded-full overflow-hidden"><div className="h-full w-0 bg-rose-400 rounded-full" /></div>
            <p className="text-xs text-gray-400 mt-1">{m.from} · {m.duration}</p>
          </div>
        </motion.div>
      ))}
      <p className="text-xs text-gray-300 text-center italic mt-2">（语音功能需要上传真实音频文件）</p>
    </div>
  )
}

export default function PrivateCorner() {
  const [unlocked, setUnlocked] = useState(false)
  const [pw, setPw] = useState('')
  const { editMode } = useData()

  // 编辑模式直接进入
  if (editMode && !unlocked) setUnlocked(true)

  const handleUnlock = (e) => {
    e.preventDefault()
    if (pw === defaultInfo.password || pw === '0304') setUnlocked(true)
  }

  if (!unlocked) {
    return (
      <div className="max-w-sm mx-auto mt-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-8 text-center">
          <div className="text-5xl mb-4">🔒</div>
          <h2 className="text-xl font-romantic text-romantic mb-2">私密角落</h2>
          <p className="text-sm text-gray-400 mb-6">这里只属于我们两个人</p>
          <form onSubmit={handleUnlock} className="space-y-3">
            <input type="password" value={pw} onChange={e => setPw(e.target.value)} placeholder="再输一次暗号..."
              className="w-full px-4 py-3 rounded-full bg-white/70 border border-rose-200 focus:border-rose-400 focus:outline-none text-center text-sm text-gray-600 placeholder-gray-300" aria-label="私密区域密码" />
            <button type="submit" className="w-full py-3 rounded-full romantic-gradient text-white text-sm hover:shadow-lg transition-all">解锁 💕</button>
          </form>
        </motion.div>
      </div>
    )
  }

  return (
    <div>
      <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-3xl font-romantic text-romantic text-center mb-8">🔓 私密角落</motion.h2>
      <div className="space-y-8">
        <div className="glass-card p-6"><ConflictReview /></div>
        <div className="glass-card p-6"><SecretList /></div>
        <div className="glass-card p-6"><VoiceWall /></div>
      </div>
    </div>
  )
}
