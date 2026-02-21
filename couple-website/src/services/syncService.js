import { supabase, isSupabaseConfigured } from '../lib/supabase'

const TABLE_NAME = 'couple_data'
const USER_ID = 'couple_user_1' // 固定用户ID，你们两个人共享同一个数据

/**
 * 云端同步服务
 */
class SyncService {
  constructor() {
    this.listeners = []
    this.isInitialized = false
  }

  /**
   * 初始化实时订阅
   */
  initialize() {
    if (!isSupabaseConfigured() || this.isInitialized) return

    // 订阅数据变化
    supabase
      .channel('couple_data_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: TABLE_NAME,
          filter: `user_id=eq.${USER_ID}`
        },
        (payload) => {
          console.log('数据变化:', payload)
          this.notifyListeners(payload)
        }
      )
      .subscribe()

    this.isInitialized = true
  }

  /**
   * 从云端加载数据
   */
  async loadFromCloud() {
    if (!isSupabaseConfigured()) {
      return null
    }

    try {
      const { data, error } = await supabase
        .from(TABLE_NAME)
        .select('data, updated_at')
        .eq('user_id', USER_ID)
        .single()

      if (error) {
        if (error.code === 'PGRST116') {
          // 数据不存在，返回 null
          return null
        }
        throw error
      }

      return data
    } catch (error) {
      console.error('从云端加载数据失败:', error)
      return null
    }
  }

  /**
   * 保存数据到云端
   */
  async saveToCloud(data) {
    if (!isSupabaseConfigured()) {
      return { success: false, error: '未配置 Supabase' }
    }

    try {
      const { error } = await supabase
        .from(TABLE_NAME)
        .upsert({
          user_id: USER_ID,
          data: data,
          updated_at: new Date().toISOString()
        })

      if (error) throw error

      return { success: true }
    } catch (error) {
      console.error('保存到云端失败:', error)
      return { success: false, error: error.message }
    }
  }

  /**
   * 添加数据变化监听器
   */
  addListener(callback) {
    this.listeners.push(callback)
  }

  /**
   * 移除监听器
   */
  removeListener(callback) {
    this.listeners = this.listeners.filter(l => l !== callback)
  }

  /**
   * 通知所有监听器
   */
  notifyListeners(payload) {
    this.listeners.forEach(callback => {
      try {
        callback(payload)
      } catch (error) {
        console.error('监听器执行失败:', error)
      }
    })
  }
}

export const syncService = new SyncService()
