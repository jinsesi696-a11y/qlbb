import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useData } from '../data/DataContext'
import { EditableText, EditableImage, AddButton, DeleteButton } from './EditableField'

function PhotoViewer({ photo, onClose }) {
  if (!photo) return null
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={onClose}>
      <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }} className="max-w-3xl w-full" onClick={e => e.stopPropagation()}>
        <img src={photo.url} alt={photo.caption} className="w-full rounded-2xl shadow-2xl" />
        <p className="text-white text-center mt-4 text-sm">{photo.caption}</p>
        <button onClick={onClose} className="absolute top-4 right-4 text-white text-2xl hover:scale-110 transition-transform">✕</button>
      </motion.div>
    </motion.div>
  )
}

function AlbumGrid({ albumIndex, onBack }) {
  const { albums, editMode, updateField } = useData()
  const album = albums[albumIndex]
  const [viewPhoto, setViewPhoto] = useState(null)

  const updatePhoto = (pi, key, val) => {
    const arr = [...albums]
    const photos = [...arr[albumIndex].photos]
    photos[pi] = { ...photos[pi], [key]: val }
    arr[albumIndex] = { ...arr[albumIndex], photos }
    updateField('albums', arr)
  }
  const removePhoto = (pi) => {
    const arr = [...albums]
    arr[albumIndex] = { ...arr[albumIndex], photos: arr[albumIndex].photos.filter((_, i) => i !== pi) }
    updateField('albums', arr)
  }
  const addPhoto = () => {
    const arr = [...albums]
    arr[albumIndex] = { ...arr[albumIndex], photos: [...arr[albumIndex].photos, { url: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=600&h=400&fit=crop', caption: '新照片' }] }
    updateField('albums', arr)
  }

  return (
    <div>
      <button onClick={onBack} className="mb-4 text-rose-400 hover:text-rose-500 text-sm flex items-center gap-1">← 返回相册</button>
      <EditableText value={album.name} onSave={v => { const arr = [...albums]; arr[albumIndex] = { ...arr[albumIndex], name: v }; updateField('albums', arr) }}
        tag="h3" className="text-xl font-romantic text-romantic mb-6" />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {album.photos.map((photo, i) => (
          <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }} className="group relative">
            <DeleteButton onClick={() => removePhoto(i)} />
            <div className="cursor-pointer" onClick={() => !editMode && setViewPhoto(photo)}>
              <div className="overflow-hidden rounded-xl">
                <EditableImage src={photo.url} alt={photo.caption} onSave={v => updatePhoto(i, 'url', v)}
                  className="w-full h-40 md:h-52 object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
            </div>
            <EditableText value={photo.caption} onSave={v => updatePhoto(i, 'caption', v)} className="text-xs text-gray-400 mt-1 text-center block" />
          </motion.div>
        ))}
      </div>
      <div className="mt-4"><AddButton onClick={addPhoto} label="添加照片" /></div>
      <AnimatePresence>{viewPhoto && <PhotoViewer photo={viewPhoto} onClose={() => setViewPhoto(null)} />}</AnimatePresence>
    </div>
  )
}

function MapAlbum() {
  const { mapLocations, editMode, updateField } = useData()

  const updateLoc = (i, key, val) => {
    const arr = [...mapLocations]
    arr[i] = { ...arr[i], [key]: val }
    updateField('mapLocations', arr)
  }
  const removeLoc = (i) => updateField('mapLocations', mapLocations.filter((_, idx) => idx !== i))
  const addLoc = () => updateField('mapLocations', [...mapLocations, { name: '新地点', lat: 0, lng: 0, desc: '描述...', photo: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=300&h=200&fit=crop' }])

  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-romantic text-romantic mb-4">🗺️ 我们去过的地方</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {mapLocations.map((loc, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }}
            className="bg-white/50 rounded-xl overflow-hidden hover:shadow-lg transition-shadow relative">
            <DeleteButton onClick={() => removeLoc(i)} />
            <EditableImage src={loc.photo} alt={loc.name} onSave={v => updateLoc(i, 'photo', v)} className="w-full h-32 object-cover" />
            <div className="p-3">
              <div className="flex items-center gap-1">
                <span className="text-xs">📍</span>
                <EditableText value={loc.name} onSave={v => updateLoc(i, 'name', v)} className="font-medium text-gray-700 text-sm" />
              </div>
              <EditableText value={loc.desc} onSave={v => updateLoc(i, 'desc', v)} className="text-xs text-gray-400 mt-1" />
            </div>
          </motion.div>
        ))}
      </div>
      <div className="mt-4"><AddButton onClick={addLoc} label="添加地点" /></div>
    </div>
  )
}

export default function Albums() {
  const { albums, editMode, updateField } = useData()
  const [tab, setTab] = useState('theme')
  const [selectedAlbumIndex, setSelectedAlbumIndex] = useState(null)

  const removeAlbum = (i) => {
    updateField('albums', albums.filter((_, idx) => idx !== i))
  }
  const addAlbum = () => {
    updateField('albums', [...albums, { id: 'new-' + Date.now(), name: '📁 新相册', cover: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=400&h=300&fit=crop', photos: [] }])
  }

  return (
    <div>
      <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-3xl font-romantic text-romantic text-center mb-6">📷 相册</motion.h2>
      <div className="flex justify-center gap-2 mb-8">
        {[{ id: 'theme', label: '🎨 主题相册' }, { id: 'map', label: '🗺️ 地图相册' }].map(t => (
          <button key={t.id} onClick={() => { setTab(t.id); setSelectedAlbumIndex(null) }}
            className={`px-5 py-2 rounded-full text-sm transition-all ${tab === t.id ? 'romantic-gradient text-white shadow-lg' : 'bg-white/60 text-gray-500 hover:bg-rose-50'}`}
          >{t.label}</button>
        ))}
      </div>

      {tab === 'map' && <MapAlbum />}

      {tab === 'theme' && selectedAlbumIndex === null && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {albums.map((album, i) => (
              <motion.div key={album.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className="glass-card overflow-hidden cursor-pointer group hover:shadow-xl transition-all relative"
                onClick={() => setSelectedAlbumIndex(i)}>
                <DeleteButton onClick={() => removeAlbum(i)} />
                <div className="overflow-hidden">
                  <EditableImage src={album.cover} alt={album.name} onSave={v => { const arr = [...albums]; arr[i] = { ...arr[i], cover: v }; updateField('albums', arr) }}
                    className="w-full h-36 md:h-44 object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-3">
                  <EditableText value={album.name} onSave={v => { const arr = [...albums]; arr[i] = { ...arr[i], name: v }; updateField('albums', arr) }}
                    className="text-sm font-medium text-gray-700" />
                  <p className="text-xs text-gray-400">{album.photos.length} 张照片</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-4"><AddButton onClick={addAlbum} label="添加相册" /></div>
        </>
      )}

      {tab === 'theme' && selectedAlbumIndex !== null && (
        <AlbumGrid albumIndex={selectedAlbumIndex} onBack={() => setSelectedAlbumIndex(null)} />
      )}
    </div>
  )
}
