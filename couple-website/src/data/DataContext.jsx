import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react'
import * as defaults from './siteData'
import { syncService } from '../services/syncService'
import { isSupabaseConfigured } from '../lib/supabase'

const DataContext = createContext()
const STORAGE_KEY = 'couple_site_data'

// 深拷贝
const clone = (obj) => JSON.parse(JSON.stringify(obj))

// 获取默认数据
function getDefaultData() {
  return {
    coupleInfo: clone(defaults.coupleInfo),
    timelineEvents: clone(defaults.timelineEvents),
    albums: clone(defaults.albums),
    mapLocations: clone(defaults.mapLocations),
    videos: clone(defaults.videos),
    diaries: clone(defaults.diaries),
    gratitudeList: clone(defaults.gratitudeList),
    wishList: clone(defaults.wishList),
    anniversaries: clone(defaults.anniversaries),
    giftIdeas: clone(defaults.giftIdeas),
    playlist: clone(defaults.playlist),
    quizQuestions: clone(defaults.quizQuestions),
  }
}

// 从 localStorage 加载，没有就用默认值
function loadLocalData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) return JSON.parse(saved)
  } catch (e) { /* ignore */ }
  return getDefaultData()
}

export function DataProvider({ children, editMode }) {
  const [data, setData] = useState(loadLocalData)
  const [syncStatus, setSyncStatus] = useState('idle') // idle, syncing, synced, error
  const [lastSyncTime, setLastSyncTime] = useState(null)
  const isMounted = useRef(true)
  const saveTimeoutRef = useRef(null)

  // 初始化：从云端加载数据
  useEffect(() => {
    isMounted.current = true

    async function initializeData() {
      if (!isSupabaseConfigured()) {
        console.log('未配置 Supabase，使用本地存储模式')
        return
      }

      try {
        setSyncStatus('syncing')
        const cloudData = await syncService.loadFromCloud()

        if (!isMounted.current) return

        if (cloudData && cloudData.data) {
          // 云端有数据，使用云端数据
          const localData = loadLocalData()
          const cloudUpdatedAt = new Date(cloudData.updated_at).getTime()
          const localUpdatedAt = localStorage.getItem(STORAGE_KEY + '_updated_at')
          const localTime = localUpdatedAt ? new Date(localUpdatedAt).getTime() : 0

          // 使用更新的数据
          if (cloudUpdatedAt > localTime) {
            console.log('使用云端数据（更新）')
            setData(cloudData.data)
            localStorage.setItem(STORAGE_KEY, JSON.stringify(cloudData.data))
            localStorage.setItem(STORAGE_KEY + '_updated_at', cloudData.updated_at)
          } else {
            console.log('使用本地数据（更新）')
            // 本地数据更新，同步到云端
            await syncService.saveToCloud(localData)
          }
        } else {
          // 云端没有数据，上传本地数据
          console.log('云端无数据，上传本地数据')
          const localData = loadLocalData()
          await syncService.saveToCloud(localData)
        }

        setSyncStatus('synced')
        setLastSyncTime(new Date())
      } catch (error) {
        console.error('初始化数据失败:', error)
        if (isMounted.current) {
          setSyncStatus('error')
        }
      }
    }

    initializeData()

    // 初始化实时订阅
    if (isSupabaseConfigured()) {
      syncService.initialize()

      // 监听云端数据变化
      const handleCloudChange = (payload) => {
        if (payload.new && payload.new.data) {
          console.log('收到云端数据更新')
          setData(payload.new.data)
          localStorage.setItem(STORAGE_KEY, JSON.stringify(payload.new.data))
          localStorage.setItem(STORAGE_KEY + '_updated_at', payload.new.updated_at)
          setSyncStatus('synced')
          setLastSyncTime(new Date())
        }
      }

      syncService.addListener(handleCloudChange)

      return () => {
        isMounted.current = false
        syncService.removeListener(handleCloudChange)
      }
    }

    return () => {
      isMounted.current = false
    }
  }, [])

  // 数据变化时保存（本地 + 云端）
  useEffect(() => {
    // 保存到本地
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    const now = new Date().toISOString()
    localStorage.setItem(STORAGE_KEY + '_updated_at', now)

    // 防抖保存到云端
    if (isSupabaseConfigured()) {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current)
      }

      saveTimeoutRef.current = setTimeout(async () => {
        setSyncStatus('syncing')
        const result = await syncService.saveToCloud(data)
        if (isMounted.current) {
          if (result.success) {
            setSyncStatus('synced')
            setLastSyncTime(new Date())
          } else {
            setSyncStatus('error')
          }
        }
      }, 1000) // 1秒防抖
    }

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current)
      }
    }
  }, [data])

  // 通用更新方法：updateField('timelineEvents', newArray)
  const updateField = useCallback((field, value) => {
    setData(prev => ({ ...prev, [field]: typeof value === 'function' ? value(prev[field]) : value }))
  }, [])

  // 重置为默认数据
  const resetAll = useCallback(() => {
    const fresh = getDefaultData()
    setData(fresh)
  }, [])

  // 手动同步
  const manualSync = useCallback(async () => {
    if (!isSupabaseConfigured()) return

    setSyncStatus('syncing')
    const result = await syncService.saveToCloud(data)
    if (result.success) {
      setSyncStatus('synced')
      setLastSyncTime(new Date())
    } else {
      setSyncStatus('error')
    }
  }, [data])

  return (
    <DataContext.Provider value={{ 
      ...data, 
      editMode, 
      updateField, 
      resetAll,
      syncStatus,
      lastSyncTime,
      manualSync,
      isCloudEnabled: isSupabaseConfigured()
    }}>
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  return useContext(DataContext)
}
