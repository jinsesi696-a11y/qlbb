// ============================================
// 🌸 情侣网站数据配置 - 在这里修改所有内容
// ============================================

// 基本信息
export const coupleInfo = {
  person1: '小宋',
  person2: '小陈',
  startDate: '2022-05-20', // 相恋日期 YYYY-MM-DD
  firstMeetDate: '2022-03-14',
  motto: '我们的小宇宙',
  subtitle: '每一天，都是最好的纪念日',
  password: 'love520', // 登录密码
};

// 时间轴事件
export const timelineEvents = [
  { date: '2022-03-14', title: '初次见面', text: '在朋友聚会上第一次见到你，你穿了一件白色连衣裙，笑起来像春天。', location: '城市咖啡馆', mood: '💕 心动', image: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=400&h=300&fit=crop' },
  { date: '2022-04-02', title: '第一次约会', text: '一起去了那家小小的日料店，你说你最喜欢三文鱼，我偷偷记住了。', location: '樱花日料', mood: '🥰 甜蜜', image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400&h=300&fit=crop' },
  { date: '2022-05-20', title: '在一起啦', text: '520这天，我鼓起勇气牵了你的手，你没有松开。', location: '江边步道', mood: '❤️ 幸福', image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=300&fit=crop' },
  { date: '2022-08-15', title: '第一次旅行', text: '一起去了海边，你在沙滩上写了我们的名字，浪花来了又去。', location: '三亚', mood: '🌊 自由', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop' },
  { date: '2022-12-25', title: '第一个圣诞节', text: '你送了我一条围巾，我送了你一只小熊，我们在雪地里拍了好多照片。', location: '家里', mood: '🎄 温暖', image: 'https://images.unsplash.com/photo-1512389142860-9c449e58a814?w=400&h=300&fit=crop' },
  { date: '2023-05-20', title: '一周年纪念', text: '一年了，感谢你出现在我的生命里，未来的每一年都要一起走。', location: '我们的餐厅', mood: '🎂 感恩', image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=400&h=300&fit=crop' },
  { date: '2023-10-01', title: '一起养了猫', text: '小橘来到我们家，从此家里多了一个小毛球。', location: '家里', mood: '🐱 开心', image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=300&fit=crop' },
  { date: '2024-02-14', title: '情人节惊喜', text: '你偷偷准备了一屋子气球和蜡烛，我感动到哭。', location: '家里', mood: '😭 感动', image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400&h=300&fit=crop' },
  { date: '2025-01-01', title: '未来想做的事', text: '一起看极光、一起学冲浪、一起走遍世界每个角落。', location: '未来', mood: '✨ 期待', image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=400&h=300&fit=crop' },
];

// 主题相册
export const albums = [
  { id: 'travel', name: '🌍 第一次旅行', cover: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop', photos: [
    { url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop', caption: '海边的日落' },
    { url: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&h=400&fit=crop', caption: '山间小路' },
    { url: 'https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=600&h=400&fit=crop', caption: '旅途中的风景' },
  ]},
  { id: 'daily', name: '📸 街拍日常', cover: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=400&h=300&fit=crop', photos: [
    { url: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=600&h=400&fit=crop', caption: '午后散步' },
    { url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&h=400&fit=crop', caption: '咖啡时光' },
  ]},
  { id: 'food', name: '🍰 吃过的好吃的', cover: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400&h=300&fit=crop', photos: [
    { url: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&h=400&fit=crop', caption: '最爱的甜品' },
    { url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=400&fit=crop', caption: '一起做的披萨' },
  ]},
  { id: 'couple', name: '💑 我们的合照墙', cover: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=300&fit=crop', photos: [
    { url: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600&h=400&fit=crop', caption: '牵手的那天' },
    { url: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&h=400&fit=crop', caption: '情人节' },
  ]},
  { id: 'pet', name: '🐱 小橘专辑', cover: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=300&fit=crop', photos: [
    { url: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=600&h=400&fit=crop', caption: '小橘来家的第一天' },
    { url: 'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=600&h=400&fit=crop', caption: '小橘晒太阳' },
  ]},
  { id: 'best', name: '✨ 最爱的20个瞬间', cover: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=400&h=300&fit=crop', photos: [
    { url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&h=400&fit=crop', caption: '最美的笑容' },
  ]},
];

// 地图标记点
export const mapLocations = [
  { name: '城市咖啡馆', lat: 31.23, lng: 121.47, desc: '我们第一次见面的地方', photo: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=300&h=200&fit=crop' },
  { name: '三亚', lat: 18.25, lng: 109.5, desc: '第一次一起看海', photo: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&h=200&fit=crop' },
  { name: '我们的家', lat: 31.22, lng: 121.48, desc: '最温暖的地方', photo: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=300&h=200&fit=crop' },
];


// 视频列表
export const videos = [
  { id: 1, title: '2023 年度回顾', category: '年度回顾', thumbnail: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=400&h=225&fit=crop', url: '#', duration: '5:30', desc: '这一年，感谢有你' },
  { id: 2, title: '三亚旅行 Vlog', category: '旅行vlog', thumbnail: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=225&fit=crop', url: '#', duration: '8:20', desc: '阳光、沙滩、和你' },
  { id: 3, title: '一起做饭的日常', category: '日常', thumbnail: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=225&fit=crop', url: '#', duration: '0:30', desc: '你切菜我炒菜' },
  { id: 4, title: '车里唱歌合集', category: '日常', thumbnail: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=400&h=225&fit=crop', url: '#', duration: '2:15', desc: '五音不全但很快乐' },
];

// 日记/信箱
export const diaries = [
  { id: 1, date: '2024-02-14', type: 'letter', title: '给你的第一封信', content: '亲爱的，今天是我们在一起的第635天。每一天醒来看到你在身边，都觉得是世界上最幸运的事。谢谢你愿意陪我走过春夏秋冬，未来的日子，我们继续一起。', mood: '❤️', from: '小明' },
  { id: 2, date: '2024-03-08', type: 'daily', title: '今天一起去了花市', content: '春天来了，我们去花市买了一束向日葵和两盆多肉。你说向日葵像我，永远朝着你笑。', mood: '🌻', from: '小红' },
  { id: 3, date: '2024-05-20', type: 'letter', title: '两周年快乐', content: '两年了呀，时间过得好快。还记得两年前的今天，我紧张得手心都是汗，但你的手很温暖。感谢你让我相信，爱情真的很美好。', mood: '🎂', from: '小明' },
  { id: 4, date: '2024-07-15', type: 'daily', title: '小橘今天偷吃了蛋糕', content: '下班回家发现蛋糕被小橘偷吃了一角，它还一脸无辜地看着我们。笑死了，拍了好多照片。', mood: '😂', from: '小红' },
  { id: 5, date: '2024-12-31', type: 'letter', title: '写在2024最后一天', content: '这一年有开心有难过，但最重要的是，我们一直在一起。新的一年，继续做彼此的依靠。', mood: '✨', from: '小明' },
];

// 感谢清单
export const gratitudeList = [
  { date: '2024-01-15', text: '谢谢你每天早上给我倒好水', from: '小红' },
  { date: '2024-02-03', text: '谢谢你生病时照顾我到半夜', from: '小明' },
  { date: '2024-03-20', text: '谢谢你记得我喜欢的每一种花', from: '小红' },
  { date: '2024-04-10', text: '谢谢你在我难过时什么都不说只是抱着我', from: '小明' },
  { date: '2024-06-01', text: '谢谢你偷偷给我买了想要很久的耳机', from: '小红' },
];

// 愿望清单
export const wishList = [
  { id: 1, text: '一起看一次极光', done: false, icon: '🌌' },
  { id: 2, text: '一起去日本看樱花', done: false, icon: '🌸' },
  { id: 3, text: '一起学冲浪', done: false, icon: '🏄' },
  { id: 4, text: '一起拍一套写真', done: true, icon: '📷', doneDate: '2024-06-15' },
  { id: 5, text: '一起养一只猫', done: true, icon: '🐱', doneDate: '2023-10-01' },
  { id: 6, text: '一起做一顿大餐', done: true, icon: '🍳', doneDate: '2023-08-20' },
  { id: 7, text: '一起看日出', done: false, icon: '🌅' },
  { id: 8, text: '一起去蹦极', done: false, icon: '🎢' },
  { id: 9, text: '一起学一支舞', done: false, icon: '💃' },
  { id: 10, text: '一起走遍中国每个省', done: false, icon: '🗺️' },
];

// 纪念日
export const anniversaries = [
  { name: '相恋纪念日', date: '2022-05-20', icon: '💕', recurring: true },
  { name: '初次见面', date: '2022-03-14', icon: '👋', recurring: true },
  { name: '小明生日', date: '1998-08-15', icon: '🎂', recurring: true },
  { name: '小红生日', date: '1999-03-22', icon: '🎂', recurring: true },
  { name: '小橘生日', date: '2023-10-01', icon: '🐱', recurring: true },
];

// 礼物灵感库
export const giftIdeas = [
  { for: '小红', items: [
    { name: '喜欢的颜色', value: '粉色、白色' },
    { name: '衣服尺码', value: 'S / 155-160' },
    { name: '鞋码', value: '37' },
    { name: '喜欢的品牌', value: 'MUJI, Uniqlo' },
    { name: '想要的东西', value: 'Kindle, 一条珍珠项链, 拍立得' },
    { name: '喜欢的花', value: '向日葵、满天星' },
  ]},
  { for: '小明', items: [
    { name: '喜欢的颜色', value: '黑色、深蓝' },
    { name: '衣服尺码', value: 'L / 175-180' },
    { name: '鞋码', value: '42' },
    { name: '喜欢的品牌', value: 'Nike, Apple' },
    { name: '想要的东西', value: 'AirPods Max, 机械键盘, Switch游戏' },
    { name: '喜欢的零食', value: '薯片、巧克力' },
  ]},
];

// 歌单
export const playlist = [
  { title: '告白气球', artist: '周杰伦', story: '第一次约会时车里放的歌' },
  { title: '小幸运', artist: '田馥甄', story: '你说这首歌让你想到我' },
  { title: '晴天', artist: '周杰伦', story: '一起淋雨时唱的歌' },
  { title: '喜欢你', artist: 'Beyond', story: '你在KTV唱给我听的' },
  { title: '甜甜的', artist: '周杰伦', story: '每次想你就会听的歌' },
  { title: '爱你', artist: '王心凌', story: '你跳这首歌的样子超可爱' },
];

// 随机约会生成器
export const dateActivities = [
  '散步30分钟', '买一杯奶茶', '拍5张合照', '去书店逛逛', '一起做饭',
  '看一部电影', '去公园野餐', '一起画画', '逛夜市', '骑自行车',
  '去咖啡馆坐坐', '一起运动', '去看日落', '逛花市', '一起唱歌',
  '去博物馆', '一起烘焙', '去游乐园', '拍一组照片', '写信给对方',
];

// 默契问答
export const quizQuestions = [
  { q: '我们第一次见面时，对方穿了什么颜色的衣服？', options: ['白色', '黑色', '蓝色', '粉色'] },
  { q: '对方最喜欢吃什么？', options: ['火锅', '日料', '烧烤', '甜品'] },
  { q: '如果只能去一个地方旅行，对方会选？', options: ['海边', '山里', '城市', '乡村'] },
  { q: '对方的口头禅是？', options: ['哈哈哈', '好吧', '真的吗', '随便'] },
  { q: '对方最怕什么？', options: ['蟑螂', '打雷', '黑暗', '蛇'] },
];
