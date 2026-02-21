import React, { useState, useRef, useEffect } from 'react'
import { useData } from '../data/DataContext'

// 可编辑文本（点击即编辑）
export function EditableText({ value, onSave, className = '', tag = 'span', placeholder = '点击编辑...', multiline = false }) {
  const { editMode } = useData()
  const [editing, setEditing] = useState(false)
  const [text, setText] = useState(value)
  const ref = useRef(null)

  useEffect(() => { setText(value) }, [value])
  useEffect(() => {
    if (editing && ref.current) ref.current.focus()
  }, [editing])

  if (!editMode) {
    const Tag = tag
    return <Tag className={className}>{value || placeholder}</Tag>
  }

  if (editing) {
    if (multiline) {
      return (
        <textarea
          ref={ref}
          value={text}
          onChange={e => setText(e.target.value)}
          onBlur={() => { setEditing(false); onSave(text) }}
          onKeyDown={e => { if (e.key === 'Escape') { setEditing(false); setText(value) } }}
          className={`${className} bg-yellow-50 border border-yellow-300 rounded-lg px-2 py-1 outline-none resize-y w-full min-h-[60px]`}
          placeholder={placeholder}
        />
      )
    }
    return (
      <input
        ref={ref}
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        onBlur={() => { setEditing(false); onSave(text) }}
        onKeyDown={e => {
          if (e.key === 'Enter') { setEditing(false); onSave(text) }
          if (e.key === 'Escape') { setEditing(false); setText(value) }
        }}
        className={`${className} bg-yellow-50 border border-yellow-300 rounded-lg px-2 py-1 outline-none w-full`}
        placeholder={placeholder}
      />
    )
  }

  const Tag = tag
  return (
    <Tag
      className={`${className} cursor-pointer hover:bg-yellow-50 hover:outline hover:outline-2 hover:outline-yellow-300 hover:outline-dashed rounded transition-all`}
      onClick={() => setEditing(true)}
      title="点击编辑"
    >
      {value || <span className="text-gray-300 italic">{placeholder}</span>}
    </Tag>
  )
}

// 可编辑图片（点击上传/输入URL）
export function EditableImage({ src, onSave, className = '', alt = '' }) {
  const { editMode } = useData()
  const [showModal, setShowModal] = useState(false)
  const [url, setUrl] = useState(src || '')
  const fileRef = useRef(null)

  if (!editMode) {
    return <img src={src} alt={alt} className={className} />
  }

  const handleFile = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      onSave(ev.target.result)
      setShowModal(false)
    }
    reader.readAsDataURL(file)
  }

  const handleUrlSave = () => {
    onSave(url)
    setShowModal(false)
  }

  return (
    <>
      <div className="relative group cursor-pointer" onClick={() => setShowModal(true)}>
        <img src={src} alt={alt} className={className} />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl">
          <span className="text-white text-sm bg-black/50 px-3 py-1 rounded-full">📷 更换图片</span>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-medium text-gray-700 mb-4">更换图片</h3>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 mb-2">方式一：上传本地图片</p>
                <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="text-sm text-gray-500" />
              </div>

              <div className="border-t pt-4">
                <p className="text-sm text-gray-500 mb-2">方式二：输入图片链接</p>
                <input
                  type="text"
                  value={url}
                  onChange={e => setUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-rose-300"
                />
                <button onClick={handleUrlSave} className="mt-2 px-4 py-2 rounded-full romantic-gradient text-white text-sm">
                  确认
                </button>
              </div>
            </div>

            <button onClick={() => setShowModal(false)} className="mt-4 text-sm text-gray-400 hover:text-gray-600">取消</button>
          </div>
        </div>
      )}
    </>
  )
}

// 编辑模式下的添加按钮
export function AddButton({ onClick, label = '添加' }) {
  const { editMode } = useData()
  if (!editMode) return null
  return (
    <button
      onClick={onClick}
      className="w-full py-3 border-2 border-dashed border-yellow-300 rounded-xl text-yellow-500 text-sm hover:bg-yellow-50 transition-all flex items-center justify-center gap-2"
    >
      <span className="text-lg">+</span> {label}
    </button>
  )
}

// 编辑模式下的删除按钮
export function DeleteButton({ onClick }) {
  const { editMode } = useData()
  if (!editMode) return null
  return (
    <button
      onClick={(e) => { e.stopPropagation(); onClick() }}
      className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-400 text-white text-xs flex items-center justify-center hover:bg-red-500 shadow-md z-20 transition-all"
      title="删除"
    >✕</button>
  )
}

// 编辑模式标识条
export function EditModeBanner() {
  const { editMode, resetAll } = useData()
  if (!editMode) return null
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-yellow-400 text-yellow-900 text-center py-1 text-xs font-medium flex items-center justify-center gap-4">
      <span>✏️ 编辑模式 — 点击任意文字或图片即可修改，数据自动保存到浏览器</span>
      <button onClick={() => { if (confirm('确定要重置所有数据为默认值吗？')) resetAll() }} className="px-2 py-0.5 bg-yellow-600 text-white rounded text-xs hover:bg-yellow-700">
        重置数据
      </button>
    </div>
  )
}
