import React, { useState, useEffect } from 'react'
import { DataProvider } from './data/DataContext'
import Navbar from './components/Navbar'
import HomePage from './components/HomePage'
import Timeline from './components/Timeline'
import Albums from './components/Albums'
import Videos from './components/Videos'
import Diary from './components/Diary'
import WishList from './components/WishList'
import Anniversary from './components/Anniversary'
import PrivateCorner from './components/PrivateCorner'
import MusicPlayer from './components/MusicPlayer'
import LoginGuard from './components/LoginGuard'
import SyncStatusIndicator from './components/SyncStatusIndicator'
import { EditModeBanner } from './components/EditableField'

const pages = [
  { id: 'home', label: '首页', icon: '🏠' },
  { id: 'timeline', label: '时间轴', icon: '📖' },
  { id: 'albums', label: '相册', icon: '📷' },
  { id: 'videos', label: '视频', icon: '🎬' },
  { id: 'diary', label: '日记', icon: '✉️' },
  { id: 'wishlist', label: '愿望清单', icon: '⭐' },
  { id: 'anniversary', label: '纪念日', icon: '🎁' },
  { id: 'private', label: '私密角落', icon: '🔒' },
]

function FallingPetals() {
  const petals = Array.from({ length: 15 }, (_, i) => ({
    id: i, left: Math.random() * 100, delay: Math.random() * 10,
    duration: 8 + Math.random() * 8, size: 10 + Math.random() * 14,
  }))
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {petals.map(p => (
        <div key={p.id} className="petal" style={{
          left: `${p.left}%`, animationDelay: `${p.delay}s`,
          animationDuration: `${p.duration}s`, fontSize: `${p.size}px`,
        }}>🌸</div>
      ))}
    </div>
  )
}

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [currentPage, setCurrentPage] = useState('home')

  useEffect(() => {
    const s = sessionStorage.getItem('couple_logged_in')
    const e = sessionStorage.getItem('couple_edit_mode')
    if (s === 'true') { setLoggedIn(true); setEditMode(e === 'true') }
  }, [])

  const handleLogin = (isEdit) => {
    setLoggedIn(true)
    setEditMode(isEdit)
    sessionStorage.setItem('couple_logged_in', 'true')
    sessionStorage.setItem('couple_edit_mode', isEdit ? 'true' : 'false')
  }

  if (!loggedIn) return <LoginGuard onLogin={handleLogin} />

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage onNavigate={setCurrentPage} />
      case 'timeline': return <Timeline />
      case 'albums': return <Albums />
      case 'videos': return <Videos />
      case 'diary': return <Diary />
      case 'wishlist': return <WishList />
      case 'anniversary': return <Anniversary />
      case 'private': return <PrivateCorner />
      default: return <HomePage onNavigate={setCurrentPage} />
    }
  }

  return (
    <DataProvider editMode={editMode}>
      <div className="min-h-screen relative">
        <FallingPetals />
        <EditModeBanner />
        <SyncStatusIndicator />
        <Navbar pages={pages} current={currentPage} onChange={setCurrentPage} />
        <main className={`relative z-10 pb-24 px-4 max-w-6xl mx-auto ${editMode ? 'pt-26' : 'pt-20'}`} style={editMode ? { paddingTop: '6.5rem' } : {}}>
          {renderPage()}
        </main>
        <MusicPlayer />
      </div>
    </DataProvider>
  )
}
