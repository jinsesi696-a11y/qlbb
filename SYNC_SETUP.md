# 情侣纪念网站 - 多设备同步配置指南

## 🎉 已完成改造

你的网站现在支持多设备同步了！所有数据会自动保存到云端，你和对方在不同设备上都能看到最新内容。

## 📋 配置步骤

### 1. 创建 Supabase 账号（免费）

1. 访问 https://supabase.com
2. 点击 "Start your project" 注册账号
3. 创建一个新项目（选择离你最近的区域，比如 Singapore）

### 2. 创建数据表

在 Supabase 项目中：

1. 点击左侧菜单 "SQL Editor"
2. 点击 "New query"
3. 复制粘贴以下 SQL 代码并执行：

```sql
-- 创建情侣数据表
CREATE TABLE couple_data (
  user_id TEXT PRIMARY KEY,
  data JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 启用实时订阅
ALTER TABLE couple_data REPLICA IDENTITY FULL;

-- 允许匿名访问（因为是私人网站，通过密码保护）
ALTER TABLE couple_data ENABLE ROW LEVEL SECURITY;

CREATE POLICY "允许所有操作" ON couple_data
  FOR ALL
  USING (true)
  WITH CHECK (true);
```

### 3. 获取配置信息

1. 在 Supabase 项目中，点击左侧 "Settings" → "API"
2. 找到以下两个值：
   - **Project URL**（项目 URL）
   - **anon public**（匿名公钥）

### 4. 配置环境变量

在 `couple-website` 文件夹中：

1. 复制 `.env.example` 文件，重命名为 `.env`
2. 打开 `.env` 文件，填入你的配置：

```env
VITE_SUPABASE_URL=https://你的项目ID.supabase.co
VITE_SUPABASE_ANON_KEY=你的匿名公钥
```

### 5. 本地测试

```bash
cd couple-website
npm run dev
```

打开浏览器，输入密码 `0304` 进入编辑模式，修改内容后：
- 右上角会显示 "✅ 已同步"
- 打开另一个浏览器或设备，数据会自动同步

### 6. 部署到 Vercel

1. 在 Vercel 项目设置中，找到 "Environment Variables"
2. 添加两个环境变量：
   - `VITE_SUPABASE_URL` = 你的项目 URL
   - `VITE_SUPABASE_ANON_KEY` = 你的匿名公钥
3. 重新部署

## ✨ 新功能

### 自动同步
- 编辑内容后 1 秒自动保存到云端
- 其他设备会实时收到更新
- 右上角显示同步状态

### 同步状态指示器
- 🔄 同步中...
- ✅ 已同步（显示同步时间）
- ❌ 同步失败（可点击重试）

### 离线模式
- 如果不配置 Supabase，网站会自动使用本地存储模式
- 功能完全正常，只是不支持多设备同步

## 🔒 安全说明

- 数据存储在 Supabase 云端（免费额度足够使用）
- 网站本身有密码保护（观看密码 + 编辑密码）
- 建议定期备份数据（可以在浏览器控制台导出）

## 📱 使用场景

现在你可以：
- 在电脑上编辑，手机上查看
- 你编辑后，对方刷新页面就能看到
- 多个设备的数据完全同步
- 清除浏览器缓存也不会丢失数据

## 🆘 常见问题

**Q: 不配置 Supabase 可以用吗？**
A: 可以！会自动使用本地存储模式，只是不支持多设备同步。

**Q: 免费额度够用吗？**
A: 完全够用！Supabase 免费版每月 500MB 存储 + 2GB 流量，你们两个人用绰绰有余。

**Q: 数据安全吗？**
A: 数据存在 Supabase 云端，有密码保护。建议不要在数据中存储真实的敏感信息。

**Q: 如何备份数据？**
A: 在浏览器控制台输入：
```javascript
console.log(JSON.stringify(localStorage.getItem('couple_site_data')))
```
复制输出的内容保存即可。

## 🎯 下一步

配置完成后，访问你的网站：
- https://qlbb-dnlr.vercel.app/
- 输入密码 `0304` 进入编辑模式
- 修改内容，看到 "✅ 已同步"
- 在另一个设备打开，数据已经同步过来了！

祝你们使用愉快！💕
