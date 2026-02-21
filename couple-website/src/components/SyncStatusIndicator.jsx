import React from 'react'
import { useData } from '../data/DataContext'
import { motion, AnimatePresence } from 'framer-motion'

export default function SyncStatusIndicator() {
  const { syncStatus, lastSyncTime, manualSync, isCloudEnabled, editMode } = useData()

  // 如果没有配置云同步，或者不是编辑模式（0304登录），不显示
  if (!isCloudEnabled || !editMode) {
    return null
  }

  const getStatusInfo = () => {
    switch (syncStatus) {
      case 'syncing':
        return { icon: '🔄', text: '同步中...', color: 'text-blue-500' }
      case 'synced':
        return { icon: '✅', text: '已同步', color: 'text-green-500' }
      case 'error':
        return { icon: '❌', text: '同步失败', color: 'text-red-500' }
      default:
        return { icon: '⏸️', text: '待同步', color: 'text-gray-400' }
    }
  }

  const status = getStatusInfo()

  const formatTime = (date) => {
    if (!date) return ''
    const now = new Date()
    const diff = Math.floor((now - date) / 1000) // 秒

    if (diff < 60) return '刚刚'
    if (diff < 3600) return `${Math.floor(diff / 60)}分钟前`
    if (diff < 86400) return `${Math.floor(diff / 3600)}小时前`
    return date.toLocaleString('zh-CN', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-20 right-4 z-50"
    >
      <div className="glass-card px-4 py-2 flex items-center gap-2 text-sm">
        <AnimatePresence mode="wait">
          <motion.span
            key={syncStatus}
            initial={{ rotate: 0 }}
            animate={{ rotate: syncStatus === 'syncing' ? 360 : 0 }}
            transition={{ duration: 1, repeat: syncStatus === 'syncing' ? Infinity : 0, ease: 'linear' }}
            className="text-lg"
          >
            {status.icon}
          </motion.span>
        </AnimatePresence>
        <div className="flex flex-col">
          <span className={`font-medium ${status.color}`}>{status.text}</span>
          {lastSyncTime && syncStatus === 'synced' && (
            <span className="text-xs text-gray-400">{formatTime(lastSyncTime)}</span>
          )}
        </div>
        {syncStatus === 'error' && (
          <button
            onClick={manualSync}
            className="ml-2 px-2 py-1 text-xs bg-rose-500 text-white rounded hover:bg-rose-600 transition-colors"
          >
            重试
          </button>
        )}
      </div>
    </motion.div>
  )
}
