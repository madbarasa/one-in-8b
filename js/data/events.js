// 事件库 v0：全年龄段骨架事件
// 事件结构：
//   id            唯一标识
//   type          'log' 自动记录 | 'choice' 重大抉择（暂停等待选择）
//   stage         生命周期阶段过滤：infant/child/teen/young/adult/mid/senior/any
//   minAge/maxAge 触发年龄区间
//   once          是否只触发一次（默认 true；false 则每年可重复）
//   weight        概率事件抽取权重（log 类）；choice 类通常固定年龄触发
//   cond          可选条件函数 (state) => bool
//   text          记录文本；支持 {name} 等占位
//   source        数据出处标注（显示在引用框）
//   options       choice 专用：[{ label, desc, effect(state), outcome }]
//   effect        log 类事件的状态效果 { hp?, hap?, know?, rel?, money? }

import { genFamilyName } from './names.js';
import { WORLD_EVENTS } from './events_world.js';

// 状态：hp 健康 / hap 幸福 / know 知识 / rel 人际关系，money 单位 PPP 国际元
const E = [];
const add = (e) => E.push(e);

// ── 出生年份（0 岁）──
add({
  id: 'born-vaccine', type: 'log', minAge: 0, maxAge: 0, weight: 30,
  text: '你完成了卡介苗和乙肝疫苗的第一针接种。',
  source: '全球约 84% 的婴儿完成了三剂 DTP 疫苗接种（WHO·UNICEF）',
  effect: { hp: 2 },
});
add({
  id: 'born-record', type: 'log', minAge: 0, maxAge: 0, weight: 20,
  text: '你的出生被登记在册，成为这个世界统计数字中的一个。',
  source: '每年约 1.3 亿名婴儿诞生（UN WPP 2024）',
  effect: {},
});

// ── 婴幼儿 1-2 岁 ──
add({
  id: 'first-steps', type: 'log', minAge: 1, maxAge: 2, weight: 25,
  text: '你摇摇晃晃迈出了人生第一步，全家人都在鼓掌。',
  effect: { hp: 2, hap: 3, rel: 2 },
});
add({
  id: 'first-words', type: 'log', minAge: 1, maxAge: 2, weight: 25,
  text: '你含混地喊出了第一个词，母亲激动得红了眼眶。',
  effect: { know: 2, rel: 3 },
});
add({
  id: 'infant-diarrhea', type: 'log', minAge: 0, maxAge: 3, weight: 12,
  cond: s => s.country === 'india' && s.wealthIdx <= 2,
  text: '一场腹泻让你虚弱了很久，幸亏及时喝上了口服补液盐。',
  source: '腹泻是 5 岁以下儿童的第三大死因（WHO）',
  effect: { hp: -6 },
});
add({
  id: 'toddler-explore', type: 'choice', minAge: 2, maxAge: 2,
  title: '两岁，陌生的外面世界',
  text: '{name} 现在已经走得很稳了。院子外面的世界充满陌生的声音和气味，你扒着门框往外看。',
  source: '综合双胞胎研究，人格差异约 40% 可由遗传解释（Vukasović & Bratko 2015）',
  options: [
    { label: '盯着泥土和小石子看好一阵子', outcome: '你蹲在门槛边研究了半个下午的蚂蚁搬家。', effect: { know: 3, hap: 1 } },
    { label: '使尽全力跑出去', outcome: '你撒腿冲进院子，摔了个屁股墩，笑得咯咯响。', effect: { hp: 2, hap: 2 } },
    { label: '走向哭泣的孩子', outcome: '你摇摇晃晃走到邻居家的娃娃面前，把自己的小饼递了过去。', effect: { rel: 4 } },
    { label: '跌倒了自己站起来，继续走', outcome: '你没哭，拍拍裤子又出发了。', effect: { hp: 1, hap: 2 } },
  ],
});

// ── 学龄前 3-5 岁 ──
add({
  id: 'why-questions', type: 'log', minAge: 3, maxAge: 5, weight: 20,
  text: '你一天要问好几十次「这是什么？」「为什么？」。',
  effect: { know: 2 },
});
add({
  id: 'play-outside', type: 'log', minAge: 3, maxAge: 6, weight: 22,
  text: '你和附近的孩子们跑跑跳跳，一直玩到太阳下山。',
  effect: { hp: 2, hap: 2, rel: 3 },
});
add({
  id: 'grandma-pocket-money', type: 'log', minAge: 3, maxAge: 8, weight: 10,
  text: '外婆偷偷塞了零用钱给你。（+{gift}元）',
  effect: { hap: 2, money: 386 },
  moneyText: { gift: [200, 500] },
});
add({
  id: 'preschool', type: 'log', minAge: 4, maxAge: 5, weight: 18,
  cond: s => !(s.country === 'india' && s.wealthIdx <= 1),
  text: '你进了学前班，学会了写自己的名字。',
  effect: { know: 4 },
});
add({
  id: 'disaster-heat', type: 'log', minAge: 2, maxAge: 12, weight: 8,
  text: '破纪录的热浪来袭，有一阵子都没办法到外面玩。',
  source: '仅 2023 年一年，全球约 9300 万人受自然灾害影响（EM-DAT）',
  effect: { hp: -3, hap: -2 },
});
add({
  id: 'talent-found', type: 'log', minAge: 4, maxAge: 10, weight: 14,
  text: '大人发现你在{talent}上特别有灵气，这是属于你的天赋。',
  effect: { hap: 3, know: 1 },
  fill: { talent: ['画画', '唱歌', '音乐', '算术', '跑跳', '与人相处', '动手做东西'] },
});

// ── 小学 6-11 岁 ──
add({
  id: 'primary-school', type: 'choice', minAge: 6, maxAge: 6,
  title: '六岁，背上书包',
  text: '到了上学的年纪。村口学校的铃声、陌生的同学、坐不住的板凳——你的学生时代开始了。',
  source: '全球初等教育入学率约 87%（UNESCO UIS）',
  options: [
    { label: '开开心心去上学', outcome: '你成了班里举手最积极的那一个。', effect: { know: 5, hap: 2, rel: 2 } },
    { label: '躲在家人身后不肯进教室', outcome: '老师在门口牵了你很久，你才抽抽搭搭坐进座位。', effect: { know: 3, hap: -1 } },
  ],
});
add({
  id: 'best-friend', type: 'log', minAge: 7, maxAge: 13, weight: 16,
  text: '{friend} 和你成了最要好的朋友，上学放学都黏在一起。',
  effect: { rel: 4, hap: 2 },
  fill: { friend: ['阿伟', '小虎', '小雨', 'Rahul', 'Amit', 'Manoj', 'Pooja'] },
});
add({
  id: 'study-star', type: 'log', minAge: 7, maxAge: 15, weight: 12,
  cond: s => s.focus === 'study',
  text: '今年的重心在读书，你的成绩在班里名列前茅。',
  effect: { know: 5 },
});
add({
  id: 'football', type: 'log', minAge: 7, maxAge: 16, weight: 10,
  cond: s => s.focus === 'sport',
  text: '放学后你都在球场上疯跑，晒得黑黢黢的，身体也越来越结实。',
  effect: { hp: 4, hap: 2, rel: 1 },
});
add({
  id: 'help-family', type: 'log', minAge: 6, maxAge: 15, weight: 10,
  cond: s => s.focus === 'family',
  text: '你放学后帮家里干活，大人嘴上不说，眼里都是欣慰。',
  effect: { rel: 4, know: -1, money: 200 },
});
add({
  id: 'bullied', type: 'log', minAge: 8, maxAge: 14, weight: 8,
  text: '班上有几个孩子总拿你取乐，你把这事藏在了心里。',
  effect: { hap: -5, rel: -2 },
});
add({
  id: 'prize', type: 'log', minAge: 8, maxAge: 15, weight: 8,
  cond: s => s.know >= 60,
  text: '你捧回了一张奖状，家里把它贴在了最显眼的墙上。',
  effect: { hap: 4, know: 2 },
});

// ── 青少年 12-17 岁 ──
add({
  id: 'teen-phone', type: 'log', minAge: 13, maxAge: 16, weight: 10,
  text: '你有了自己的智能手机，世界一下子大了一圈。',
  effect: { know: 2, hap: 3 },
});
add({
  id: 'teen-love', type: 'log', minAge: 15, maxAge: 18, weight: 8,
  text: '你悄悄喜欢上了同班的一个人，上课总忍不住回头看。',
  effect: { hap: 3, know: -2 },
});
add({
  id: 'teen-exam-pressure', type: 'log', minAge: 15, maxAge: 18, weight: 10,
  cond: s => s.country === 'china' && s.inSchool,
  text: '模拟考的排名贴在走廊里，你的名字往前挪了十几位。',
  effect: { know: 3, hap: -1 },
});
add({
  id: 'teen-work-or-school', type: 'choice', minAge: 12, maxAge: 12,
  title: '要升初中吗？',
  text: '小学毕业了。家里的经济状况和你的成绩，都在替你权衡这条路。',
  source: '在印度，大约有 86% 的孩子读完初中（UNESCO UIS）',
  options: [
    { label: '继续读书', outcome: '你背上新书包走进了中学。', effect: { know: 5 }, setSchool: true },
    { label: '开始工作，帮忙家里', outcome: '你放下了书包，稚嫩的肩膀扛起了生活的重量。', effect: { money: 1500, know: -3, hap: -2 }, setSchool: false },
  ],
});
add({
  id: 'teen-high-school', type: 'choice', minAge: 15, maxAge: 15,
  title: '初中毕业的岔路口',
  text: '中考/升学考近在眼前。读高中意味着更多年不能挣钱，但门后会是不一样的世界。',
  source: '中国初中毕业生升学率约 91%；印度完成高中阶段者不足一半（UNESCO）',
  options: [
    { label: '继续读高中', outcome: '你考进了高中，教室后墙的倒计时牌开始了。', effect: { know: 6 }, setSchool: true },
    { label: '去读职业学校', outcome: '你选了一门手艺，实训车间成了你的新教室。', effect: { know: 3, money: 800 }, setSchool: false, setVocational: true },
    { label: '直接工作', outcome: '你提前走进了成人世界。', effect: { money: 3000, know: -2, hap: -2 }, setSchool: false },
  ],
});

// ── 青年 18-22 岁 ──
add({
  id: 'young-college', type: 'choice', minAge: 18, maxAge: 18,
  title: '十八岁，大学还是社会？',
  text: '高考/毕业季到了。录取通知书和招聘广告同时摆在你的面前。',
  source: '中国高等教育毛入学率约 60%；印度青年入学率约 33%（UNESCO）',
  options: [
    { label: '考大学', outcome: '你如愿走进大学校园，在图书馆里泡了四年。', effect: { know: 12, hap: 3 }, setSchool: true, setDegree: '大学' },
    { label: '找一份工作', outcome: '你提前进入了劳动力市场。', effect: { money: 2000 }, setSchool: false },
  ],
});
add({
  id: 'young-first-job', type: 'choice', minAge: 19, maxAge: 22,
  title: '你找到了第一份工作',
  text: '学历：{degree}。摆在面前的机会都不算体面，但每一份都真实地摆在那里。',
  source: '印度劳工统计约 82% 为非正规就业（ILO 推估）；农业就业者约 43%',
  options: [
    { label: '小农/家庭帮工', outcome: '你开始了靠天吃饭的日子。', effect: { hp: 2 }, job: '小农', income: 4900 },
    { label: '渔民/短工', outcome: '风吹日晒，收入不稳但自由。', effect: { hp: 1 }, job: '短工', income: 5100 },
    { label: '农场工人', outcome: '你成了雇农队伍里的一员。', effect: { hp: -1 }, job: '农场工人', income: 5000 },
    { label: '再等等更好的机会', outcome: '你决定再攒一年力气和运气。', effect: { hap: -2 }, job: '求职中', income: 0 },
  ],
  cond: s => !s.inSchool && !s.job,
});
add({
  id: 'young-engaged', type: 'log', minAge: 19, maxAge: 26, weight: 14,
  cond: s => !s.spouse,
  text: '经人介绍，你与 {spouse} 订了婚。',
  effect: { hap: 2, rel: 2 },
  action: s => s.engage(),
});
add({
  id: 'young-marriage', type: 'choice', minAge: 22, maxAge: 30,
  title: '婚姻的大日子',
  text: '婚期定下来了。婚礼是一生中最热闹的一天，也是两家人最操心的一天。',
  source: '中国平均初婚年龄约 28 岁；印度女性约 22 岁（UN）',
  options: [
    { label: '办一场体面的婚礼', outcome: '热闹了三天，家底也薄了一层，但值得。', effect: { hap: 6, rel: 3, money: -20000 }, marry: true },
    { label: '简单领证就好', outcome: '两家人吃了一顿饭，日子从简过。', effect: { hap: 4, rel: 1, money: -2000 }, marry: true },
  ],
  cond: s => s.Engaged && !s.spouse,
});

// ── 成年 23-39 岁 ──
add({
  id: 'adult-baby', type: 'choice', minAge: 24, maxAge: 34,
  title: '要孩子吗？',
  text: '婚后，两家人都在盼着新生命的到来。你也无数次问过自己。',
  source: '中国总和生育率约 1.0；印度约 2.0（UN WPP 2024）',
  options: [
    { label: '要一个孩子', outcome: '十月怀胎，产房外你听见了一声啼哭。', effect: { hap: 6, rel: 2, money: -5000 }, haveChild: true },
    { label: '再过两年二人世界', outcome: '你们决定先把日子过稳。', effect: { hap: 1 }, haveChild: false },
    { label: '不打算要孩子', outcome: '你们成为了别人眼里「不一样」的那种家庭。', effect: { hap: 2 }, haveChild: false },
  ],
  cond: s => s.spouse && !s.children.length,
});
add({
  id: 'adult-childcare', type: 'choice', minAge: 25, maxAge: 38,
  title: '谁来照顾孩子？',
  text: '孩子还小，工作放不下，家里离不开。这道题几乎没有完美答案。',
  source: '印度女性劳动参与率约 22%（ILO 2019）',
  options: [
    { label: '自己减少工作照顾', outcome: '你的职业停了半拍，孩子的童年被填得很满。', effect: { hap: 3, money: -8000 }, jobBreak: true },
    { label: '交给祖辈照顾', outcome: '老人重新操起了带娃的手艺，隔代的亲昵无可替代。', effect: { rel: 4 }, jobBreak: false },
    { label: '送托育机构', outcome: '每月一笔不小的开销，但你保住了工作。', effect: { money: -14000 }, jobBreak: false },
  ],
  cond: s => s.children.some(c => c.age >= 0 && c.age <= 3) && !s.childcareDone,
});
add({
  id: 'adult-lottery', type: 'choice', minAge: 18, maxAge: 70,
  title: '路边的彩票摊',
  text: '「两块钱搏一搏。」摊主朝你晃了晃手里的票据。',
  options: [
    { label: '买一注碰碰运气', outcome: '刮开涂层——谢谢惠顾。你笑了笑，把这当成了零头的娱乐。', effect: { money: -2, hap: 1 } },
    { label: '省下这笔钱', outcome: '你把两块钱放回了口袋。', effect: {} },
  ],
  once: false, weight: 1,
});
add({
  id: 'adult-promotion', type: 'log', minAge: 26, maxAge: 45, weight: 10,
  cond: s => s.job && s.job !== '求职中',
  text: '你的勤恳被看见了，收入涨了一截。（年收入 +{raise}元）',
  effect: { hap: 3, money: 0 },
  applyRaise: true,
});
add({
  id: 'adult-buy-house', type: 'choice', minAge: 28, maxAge: 45,
  title: '要不要买房？',
  text: '中介把钥匙串拍在桌上。这是这个年代最重的一笔账。',
  source: '中国城镇住房自有率约 70%（央行调查）；印度城市租房比例过半',
  options: [
    { label: '咬牙买下', outcome: '掏空积蓄加上父母的帮衬，你们有了自己的屋檐。', effect: { money: -60000, hap: 4 }, buyHouse: true },
    { label: '继续租房', outcome: '搬家打包成了家常便饭，但钱包相对轻松。', effect: { hap: -1 } },
  ],
  cond: s => s.spouse && !s.house,
});

// ── 中年 40-59 岁 ──
add({
  id: 'mid-parent-aging', type: 'log', minAge: 35, maxAge: 55, weight: 12,
  text: '父母的头发白了大半，你开始常往老家跑。',
  effect: { rel: 3, hap: -1 },
});
add({
  id: 'mid-hypertension', type: 'log', minAge: 40, maxAge: 65, weight: 10,
  text: '体检单上出现了「高血压」三个字，医生叮嘱你少吃咸、多走路。',
  source: '全球 30-79 岁人群中约 1/3 患高血压（WHO）',
  effect: { hp: -5 },
});
add({
  id: 'mid-child-college', type: 'log', minAge: 42, maxAge: 55, weight: 8,
  cond: s => s.children.some(c => c.age >= 17 && c.age <= 19),
  text: '孩子考大学的日子到了，你比自己当年还紧张。',
  effect: { hap: 3 },
});
add({
  id: 'mid-career-choice', type: 'choice', minAge: 38, maxAge: 50,
  title: '安稳还是折腾？',
  text: '熟人递来了一个机会：换个行当，收入更高，但一切要从头学起。',
  options: [
    { label: '守住现在的工作', outcome: '你摇了摇头，手里的饭碗踏实要紧。', effect: { hap: 1 } },
    { label: '搏一把新的', outcome: '你重新做回了学徒，半夜常惊醒，但眼里有光。', effect: { hap: 2, hp: -2, money: 3000 }, raiseIncome: 0.25 },
  ],
  cond: s => s.job && s.job !== '求职中',
});

// ── 老年 60+ ──
add({
  id: 'senior-retire', type: 'choice', minAge: 58, maxAge: 68,
  title: '退休的决定',
  text: '干了一辈子，腿脚和心气都在提醒你：该歇歇了。可手里这点活计，说放下哪那么容易。',
  source: '中国法定退休年龄男 60 岁；印度多在 58-60 岁',
  options: [
    { label: '正式退休', outcome: '你把工具擦干净收好，从此晨练、买菜、带孙。', effect: { hap: 4, hp: 1 }, retire: true },
    { label: '再干几年', outcome: '你说自己还硬朗得很，工位上又多了几年风霜。', effect: { hp: -2, money: 5000 }, retire: false },
  ],
  cond: s => s.job && s.job !== '求职中' && !s.retired,
});
add({
  id: 'senior-grandchild', type: 'log', minAge: 55, maxAge: 75, weight: 14,
  cond: s => s.children.length > 0,
  text: '孙辈出生了。你抱着那个小小的襁褓，忽然想起很多年前。',
  effect: { hap: 6, rel: 3 },
});
add({
  id: 'senior-spouse-death', type: 'log', minAge: 60, maxAge: 95, weight: 8,
  cond: s => s.spouse,
  text: '陪伴了你大半生的 {spouse} 走了。屋里忽然安静得可怕。',
  effect: { hap: -15, rel: -5 },
  action: s => s.spouseDies(),
});
add({
  id: 'senior-frail', type: 'log', minAge: 75, maxAge: 100, weight: 14,
  text: '你的腿脚越来越不利索，出门需要拄拐了。',
  effect: { hp: -5, hap: -2 },
});
add({
  id: 'senior-peace', type: 'log', minAge: 70, maxAge: 100, weight: 12,
  text: '傍晚你坐在门口晒太阳，看着街上跑过的孩子，心里很平静。',
  effect: { hap: 3 },
});

// ══ 少年补充（12-17）══
add({
  id: 'peer-smoke', type: 'choice', minAge: 14, maxAge: 17,
  cond: s => s.gender === 'male' && s.stats.rel > 45,
  title: '巷子口的烟',
  text: '要好的朋友递来一支烟：「就一口，试试而已。」周围的人都在看。',
  source: '全球首次吸烟年龄集中在 13-15 岁（WHO 全球学生健康调查）',
  options: [
    { label: '接过来看看', outcome: '你咳得眼泪都出来了。但那一晚你觉得自己合群了。', effect: { hp: -3, rel: 4 } },
    { label: '明确拒绝', outcome: '有人笑你胆小。但后来想抽烟时，第一个想到的是你的话。', effect: { hap: 1, rel: -2 } },
    { label: '岔开话题去打球', outcome: '球赛比想象中尽兴。那支烟被忘在了原地。', effect: { hp: 3, rel: 2 } },
  ],
});
add({
  id: 'teen-competition', type: 'log', minAge: 12, maxAge: 17, weight: 8,
  cond: s => s.interests.some(i => i.lv >= 3),
  text: '你带着练了多年的{hobby}参加比赛，拿回一张奖状。母亲把它贴在了客厅最显眼的位置。',
  effect: { hap: 8, know: 2 },
  fill: s => ({ hobby: s.interests[0].name }),
});
add({
  id: 'school-bully', type: 'log', minAge: 11, maxAge: 15, weight: 7,
  text: '班里几个高个子总在放学路上堵你。你开始绕远路回家，谁也没告诉。',
  source: '全球约 32% 的学生曾遭受校园欺凌（UNESCO）',
  effect: { hap: -8, rel: -3 },
});
add({
  id: 'teen-crush', type: 'log', minAge: 15, maxAge: 17, weight: 10,
  text: '你开始在意一个人。上课传的小纸条被你夹在课本里，保留了很多年。',
  effect: { hap: 6 },
});
add({
  id: 'gaokao-stress', type: 'log', minAge: 17, maxAge: 17,
  cond: s => s.inSchool && s.country === 'china',
  text: '高考倒计时牌翻到了两位数。教室里的空气紧得像拉满的弓弦。',
  source: '2024 年全国高考报名人数约 1342 万（教育部）',
  effect: { hap: -4, know: 3 },
});
add({
  id: 'rural-dropout-work', type: 'log', minAge: 15, maxAge: 17, weight: 6,
  cond: s => s.country === 'india' && s.region === '乡村' && s.wealthIdx <= 1,
  text: '家里的债压得紧。你收拾书包那年，同村的伙伴们大多已经在外省的工地上了。',
  source: '印度约有 1,040 万名儿童青少年失学（UNESCO UIS）',
  effect: { know: -6, hap: -4 }, action: s => { s.inSchool = false; },
});
add({
  id: 'city-library', type: 'log', minAge: 12, maxAge: 17, weight: 7,
  cond: s => s.region === '城市' && s.wealthIdx >= 2,
  text: '你办了人生第一张图书馆借书证。整个暑假都泡在三楼靠窗的位子上。',
  effect: { know: 5, hap: 2 },
});

// ══ 大学时代（19-22）══
add({
  id: 'uni-club', type: 'log', minAge: 19, maxAge: 21, weight: 10,
  cond: s => s.inSchool && s.degree === '大学',
  text: '你加入了社团，认识了一群熬夜聊天到天亮的人。多年后你们还在同一个群里。',
  effect: { rel: 6, hap: 3 },
});
add({
  id: 'uni-love', type: 'choice', minAge: 19, maxAge: 21,
  cond: s => s.inSchool && s.degree === '大学' && !s.spouse,
  title: '图书馆的同一张桌子',
  text: '那个人总坐在你斜对面。今天，对面的位子空着，桌上留了一张字条。',
  options: [
    { label: '写下回应', outcome: '你们在一起了。那是一段很多年后想起来还会笑的日子。', effect: { hap: 10, rel: 6 } },
    { label: '专注学业', outcome: '你把字条压回了书页里。期末成绩单很漂亮，深夜偶尔会想起那张桌子。', effect: { know: 6, hap: -2 } },
  ],
});
add({
  id: 'uni-fail', type: 'log', minAge: 19, maxAge: 22, weight: 8,
  cond: s => s.inSchool && s.degree === '大学' && s.stats.know < 55,
  text: '你挂了一门课。重修教室里，你第一次认真听完了一整个学期的课。',
  effect: { know: 4, hap: -3 },
});
add({
  id: 'uni-scholarship', type: 'log', minAge: 19, maxAge: 22, weight: 6,
  cond: s => s.inSchool && s.degree === '大学' && s.stats.know > 70,
  text: '你的名字出现在奖学金公示栏。这是你第一次靠自己的本事挣到钱。',
  effect: { hap: 8, know: 2 }, action: s => { s.money += Math.round(s.gdpPpp * 0.15); },
});

// ══ 成年空窗（18-40）══
add({
  id: 'job-search-adult', type: 'log', minAge: 23, maxAge: 38, weight: 14,
  cond: s => !s.job && !s.inSchool && s.degree !== '（辍学）',
  text: '你投出几十份简历后，终于收到了录用通知。上班第一天，你把工牌擦了又擦。',
  source: 'ILO：全球青年就业质量持续分化（2024）',
  action: s => {
    s.job = s.degree === '大学' ? '公司职员' : s.degree === '职业学校' ? '技术工人' : '商店店员';
    s.income = Math.round(s.gdpPpp * (s.degree === '大学' ? 0.9 : 0.55));
  },
  effect: { hap: 5 },
});
add({
  id: 'promotion', type: 'choice', minAge: 30, maxAge: 50, weight: 10,
  cond: s => s.job && !s.retired,
  title: '升职的代价',
  text: '上司找你谈话：升职加薪三成，但接下来两年要常驻外地项目，家里的事就顾不上了。',
  options: [
    { label: '接下来', outcome: '两年里你换了三座城市，收入大涨，孩子的家长会你一次没去。', effect: { hap: -3 }, money: s => Math.round(s.gdpPpp * 0.6), action: s => { s.income = Math.round(s.income * 1.3); } },
    { label: '婉拒', outcome: '你按时下班的那天，全家吃了顿很久没有过的团圆饭。', effect: { hap: 6, rel: 4 } },
  ],
});
add({
  id: 'buy-house', type: 'choice', minAge: 28, maxAge: 45,
  cond: s => !s.house && s.money > s.gdpPpp * 1.5 && !s.retired,
  title: '一套自己的房子',
  text: `中介带你看了一天的房。首付要掏空大半积蓄，之后每个月都是固定的月供。买，还是继续租？`,
  source: '全球主要经济体房价收入比持续走高（IMF 住房监测）',
  options: [
    { label: '咬牙买下', outcome: '拿到钥匙那天你在空荡荡的客厅坐了很久。这是你的了。', effect: { hap: 8, rel: 3 }, money: s => -Math.round(s.gdpPpp * 1.2), action: s => { s.house = true; } },
    { label: '再等等', outcome: '后来房价涨了又跌。你始终没能下定决心。', effect: { hap: -1 } },
  ],
});
add({
  id: 'late-marriage', type: 'choice', minAge: 31, maxAge: 40,
  cond: s => !s.spouse && !s.engaged,
  title: '相亲桌上的第三个人',
  text: '亲戚又安排了一场相亲。对方条件合适，性格也温和。但你总觉得少了点什么。',
  source: '全球初婚年龄持续推迟（UN 世界婚姻数据 2022）',
  options: [
    { label: '认真处下去', outcome: '半年后你们领了证。日子不轰轰烈烈，但很踏实。', effect: { hap: 6, rel: 4 }, action: s => { s.spouse = genFamilyName(s.rng, s.country, s.gender === 'male' ? 'female' : 'male'); s.spouseAge = s.age + s.rng.int(-4, 3); } },
    { label: '再等等对的人', outcome: '家人叹气。你搬去了离他们更远一点的地方，自己过日子。', effect: { rel: -4 } },
  ],
});
add({
  id: 'second-child', type: 'choice', minAge: 30, maxAge: 40,
  cond: s => s.spouse && s.children.length === 1 && !s.childcareDone,
  title: '要不要二胎',
  text: '夜里孩子睡熟了，你们说起再要一个的事。一个孩子的孤单，还是一家人的辛苦？',
  options: [
    { label: '要', outcome: '一年后家里多了个小婴儿。老大学会了让着别人。', effect: { hap: 5 }, action: s => { const g = s.rng.chance(0.5) ? 'male' : 'female'; s.children.push({ name: genFamilyName(s.rng, s.country, g), gender: g, age: 0 }); } },
    { label: '一个就够了', outcome: '你们把所有的资源与爱都给了这一个孩子。', effect: { rel: 3 } },
  ],
});
add({
  id: 'child-school-choice', type: 'choice', minAge: 30, maxAge: 42,
  cond: s => s.children.length > 0 && s.children.some(c => c.age === 6),
  title: '孩子的学校',
  text: '孩子到了上学的年纪。片内学校免费但普通，好学校要交一笔不小的赞助费，还得托关系。',
  source: '家庭的教育支出与入学机会高度相关（世界银行教育简报）',
  options: [
    { label: '花钱进好学校', outcome: '赞助费肉疼了一整年。孩子在新的班级里如鱼得水。', effect: { money: s => -Math.round(s.gdpPpp * 0.4), hap: 3 } },
    { label: '就近入学', outcome: '孩子在家门口上学，每天放学你自己接。省下的钱存进了教育基金。', effect: { rel: 4 } },
  ],
});
add({
  id: 'invest-stock', type: 'choice', minAge: 30, maxAge: 55, weight: 8,
  cond: s => s.money > s.gdpPpp * 0.5,
  title: '同事的荐股',
  text: '同事神神秘秘地说一只股票「稳赚」，他已经赚了一辆车的钱。你账户里躺着一笔闲钱。',
  options: [
    { label: '跟进一把', outcome: st => { const win = st.rng.chance(0.4); st.money += (win ? 1 : -1) * Math.round(st.money * 0.25); st.stats.hap = Math.max(0, st.stats.hap + (win ? 4 : -6)); return win ? '你赶上了尾巴，小赚一笔就跑了。之后这只股连续跌停半年。' : '三个月后腰斩。你删掉了那个软件，很久没有再打开。'; } },
    { label: '不碰', outcome: '半年后那只股果然翻了倍。你平静地关掉了同事发来的走势图。', effect: { hap: 1 } },
  ],
});
add({
  id: 'parents-illness', type: 'choice', minAge: 40, maxAge: 60,
  cond: s => s.father.alive || s.mother.alive,
  title: '病房外的长夜',
  text: '父亲住了院。医生把你拉到一边说需要长期照护。你是家里的独苗，工作请不了长假。',
  source: '全球老龄化加速，长期照护缺口扩大（WHO 老年健康报告）',
  options: [
    { label: '辞职回家照顾', outcome: '你陪父亲走完了治疗期。再找工作时，简历上有了一段两年的空白。', effect: { rel: 6, hap: 2 }, action: s => { s.job = null; s.income = 0; s.father.alive = false; } },
    { label: '请护工分担', outcome: '护工很尽责，你每周探望两次。父亲嘴上说不用总来，眼睛却一直追着你。', effect: { money: s => -Math.round(s.gdpPpp * 0.5), rel: 2 } },
  ],
});
add({
  id: 'health-check', type: 'log', minAge: 38, maxAge: 70, weight: 7,
  text: '体检报告出来：血压偏高，其他尚可。医生叮嘱少油少盐，多走路。',
  source: '全球约 13 亿人患高血压，知晓率不足半数（WHO 2023）',
  effect: { hp: -2 }, action: s => { s.chronic = s.chronic || []; s.chronic.push('高血压'); },
});
add({
  id: 'class-reunion', type: 'log', minAge: 32, maxAge: 55, weight: 8,
  text: '同学聚会。有人发了财，有人离了婚，有人已经不在了。散场时你们在校门口合了最后一张影。',
  effect: { hap: 3, rel: 5 },
});
add({
  id: 'mid-life-crisis', type: 'log', minAge: 42, maxAge: 50, weight: 9,
  text: '某个加班的深夜，你在写字楼卫生间镜子里看见一个眼角下垂的中年人，愣了很久没认出是自己。',
  effect: { hap: -6 },
});
add({
  id: 'mid-walk', type: 'log', minAge: 40, maxAge: 60, weight: 9,
  text: '你开始每天晚饭后走路一小时。走到第三个月，体检单上的箭头少了两个。',
  effect: { hp: 5, hap: 2 },
});

// ══ 中老年（55+）══
add({
  id: 'grandchild', type: 'log', minAge: 55, maxAge: 80, weight: 12,
  cond: s => s.children.length > 0,
  text: '孩子打来电话：你当爷爷奶奶了。你在电话这头应了好几声，手一直在抖。',
  effect: { hap: 12, rel: 4 },
});
add({
  id: 'spouse-death', type: 'log', minAge: 55, maxAge: 100, weight: 7,
  cond: s => s.spouse,
  text: '跟你吵了一辈子也暖了一辈子的那个人，先走了。屋里安静得可怕。',
  effect: { hap: -18, rel: -4 }, action: s => { s.spouse = null; },
});
add({
  id: 'elder-fall', type: 'log', minAge: 70, maxAge: 105, weight: 10,
  cond: s => s.stats.hp < 60,
  text: '浴室里滑了一跤，股骨骨折。躺在病床上你第一次承认：自己是老人了。',
  source: '跌倒是全球 65 岁以上老人伤害死亡的首要原因（WHO）',
  effect: { hp: -10, hap: -6 },
});
add({
  id: 'elder-hospital-choice', type: 'choice', minAge: 75, maxAge: 105,
  cond: s => s.stats.hp < 45,
  title: '手术同意书',
  text: '医生说手术还有机会，但以现在的身体，风险不小。孩子们围在病床边等你拿主意。',
  options: [
    { label: '做手术搏一把', outcome: st => { const ok = st.rng.chance(0.6); if (ok) st.stats.hp = Math.min(100, st.stats.hp + 25); else st.diedInChoice = true; return ok ? '手术很成功。出院那天你请全家吃了顿饭。' : '手术没能扛过去。你是听着孩子说话的声音离开的。'; } },
    { label: '保守治疗', outcome: '你选了不折腾。剩下的日子，想吃什么吃什么，想去哪去哪。', effect: { hap: 8, hp: -3 } },
  ],
});
add({
  id: 'grandcare', type: 'log', minAge: 58, maxAge: 78, weight: 11,
  cond: s => s.children.length > 0,
  text: '你每天去接孙辈放学。小区里的老人都认得你，说你气色比十年前还好。',
  effect: { hap: 6, rel: 3, hp: 2 },
});
add({
  id: 'elder-garden', type: 'log', minAge: 60, maxAge: 90, weight: 10,
  cond: s => s.region === '乡村' || s.house,
  text: '你在院子里开了一小片菜地。番茄和辣椒长得好，邻居来讨了几次种。',
  effect: { hap: 7, hp: 2 },
});
add({
  id: 'elder-memoir', type: 'log', minAge: 70, maxAge: 100, weight: 8,
  text: '你开始把这辈子的事讲给孙辈听。有些情节连你的孩子都是第一次听说。',
  effect: { hap: 6, rel: 4 },
});
add({
  id: 'retire-peace', type: 'log', minAge: 62, maxAge: 85, weight: 10,
  cond: s => s.retired,
  text: '清晨的公园里，你打完一套太极，坐在长椅上看鸽子。日子慢了下来，心也慢了下来。',
  effect: { hap: 5, hp: 2 },
});
add({
  id: 'diabetes', type: 'log', minAge: 50, maxAge: 85, weight: 6,
  text: '查出糖尿病。从这天起，甜的东西都要忌口了。',
  source: '全球约 8.3 亿人患糖尿病，过半未获治疗（Lancet 2024）',
  effect: { hp: -4 }, action: s => { s.chronic = s.chronic || []; s.chronic.push('糖尿病'); },
});
add({
  id: 'widen-world', type: 'log', minAge: 60, maxAge: 75, weight: 7,
  cond: s => s.money > s.gdpPpp * 2 && s.stats.hap > 55,
  text: '你带着老伴坐了一趟很远很远的火车，看了年轻时没看成的大海。',
  effect: { hap: 9, rel: 3 },
});

// ══ 灾害与时代（全年龄，低频）══
add({
  id: 'disaster-flood', type: 'log', minAge: 1, maxAge: 100, weight: 4,
  cond: s => s.region === '乡村',
  text: '夏天暴雨连下了半个月，河水漫进了院子。全村人蹲在房顶上等救援。',
  source: '仅 2023 年就有约 9300 万人受自然灾害影响（EM-DAT）',
  effect: { hap: -7 }, action: s => { s.money = Math.max(0, s.money - Math.round(s.gdpPpp * 0.2)); },
});
add({
  id: 'disaster-heatwave', type: 'log', minAge: 1, maxAge: 100, weight: 4,
  text: '破纪录的热浪持续了四十天，有一阵子谁都没法出门。',
  source: '2023 年为有记录以来最热一年（WMO）',
  effect: { hap: -3, hp: -2 },
});
add({
  id: 'era-phone', type: 'log', minAge: 8, maxAge: 60, weight: 5,
  text: '你拥有了人生第一部手机。头几个晚上，你把它放在枕头旁边睡着了。',
  effect: { hap: 5, know: 1 },
});

add({
  id: 'father-death', type: 'log', minAge: 30, maxAge: 75, weight: 6,
  cond: s => s.father.alive,
  text: '你的父亲走了。你在灵前跪了很久很久。',
  effect: { hap: -10, rel: -3 },
  action: s => { s.father.alive = false; },
});
add({
  id: 'mother-death', type: 'log', minAge: 30, maxAge: 80, weight: 6,
  cond: s => s.mother.alive,
  text: '你的母亲走了。你在灵前跪了很久很久。',
  effect: { hap: -10, rel: -3 },
  action: s => { s.mother.alive = false; },
});

// 国别特色事件并入主池
E.push(...WORLD_EVENTS);

export const EVENTS = E;

// 按年龄过滤 + 条件过滤 + once 过滤
export function filterEvents(events, state) {
  return events.filter(ev => {
    if (ev.minAge !== undefined && state.age < ev.minAge) return false;
    if (ev.maxAge !== undefined && state.age > ev.maxAge) return false;
    if (ev.once !== false && state.firedEvents.has(ev.id)) return false;
    if (ev.stage && !stageMatch(ev.stage, state.age)) return false;
    if (ev.cond && !ev.cond(state)) return false;
    return true;
  });
}

function stageMatch(stage, age) {
  const ranges = {
    infant: [0, 5], child: [6, 11], teen: [12, 17], young: [18, 25],
    adult: [26, 39], mid: [40, 59], senior: [60, 115], any: [0, 115],
  };
  const [lo, hi] = ranges[stage] || [0, 115];
  return age >= lo && age <= hi;
}
