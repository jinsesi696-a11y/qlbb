import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useData } from '../data/DataContext'
import { EditableText, EditableImage, AddButton, DeleteButton } from './EditableField'

const emptyEvent = { date: new Date().toISOString().slice(0, 10), title: '新事件', text: '写下这一天的故事...', location: '某个地方', mood: '💕 心动', image: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=400&h=300&fit=crop' }

export default function Timeline() {
  const { timelineEvents, editMode, updateField } = useData()

  const update = (index, key, val) => {
    const arr = [...timelineEvents]
    arr[index] = { ...arr[index], [key]: val }
    updateField('timelineEvents', arr)
  }
  const remove = (index) => {
    updateField('timelineEvents', timelineEvents.filter((_, i) => i !== index))
  }
  const add = () => {
    updateField('timelineEvents', [...timelineEvents, { ...emptyEvent }])
  }

  return (
    <div>
      <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-3xl font-romantic text-romantic text-center mb-10">
        📖 我们的故事
      </motion.h2>
      <div className="relative">
        <div className="absolute left-1/2 transform -translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-rose-300 via-pink-300 to-purple-300 hidden md:block" />
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-rose-300 via-pink-300 to-purple-300 md:hidden" />

        {timelineEvents.map((event, index) => {
          const isLeft = index % 2 === 0
          return (
            <motion.div key={index} initial={{ opacity: 0, x: isLeft ? -50 : 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.15 }}
              className={`relative mb-12 md:flex ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
            >
              <div className="absolute left-6 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 border-4 border-white shadow-lg z-10 mt-6" />
              <div className={`ml-14 md:ml-0 md:w-[45%] ${isLeft ? 'md:pr-8' : 'md:pl-8'}`}>
                <div className="glass-card p-5 hover:shadow-xl transition-shadow duration-300 group relative">
                  <DeleteButton onClick={() => remove(index)} />
                  {event.image && (
                    <div className="overflow-hidden rounded-xl mb-4">
                      <EditableImage src={event.image} alt={event.title} onSave={v => update(index, 'image', v)}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                  )}
                  <div className="flex items-center gap-2 mb-2">
                    {editMode ? (
                      <input type="date" value={event.date} onChange={e => update(index, 'date', e.target.value)}
                        className="text-xs px-2 py-1 rounded-full bg-yellow-50 border border-yellow-300" />
                    ) : (
                      <span className="text-xs px-2 py-1 rounded-full bg-rose-100 text-rose-500">{event.date}</span>
                    )}
                    <EditableText value={event.mood} onSave={v => update(index, 'mood', v)} className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-500" />
                  </div>
                  <EditableText value={event.title} onSave={v => update(index, 'title', v)} tag="h3" className="text-lg font-medium text-gray-700 mb-2" />
                  <EditableText value={event.text} onSave={v => update(index, 'text', v)} tag="p" className="text-sm text-gray-500 leading-relaxed" multiline />
                  <div className="flex items-center gap-1 mt-3">
                    <span className="text-xs text-gray-300">📍</span>
                    <EditableText value={event.location} onSave={v => update(index, 'location', v)} className="text-xs text-gray-300" />
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
      <div className="mt-6">
        <AddButton onClick={add} label="添加新事件" />
      </div>
    </div>
  )
}
