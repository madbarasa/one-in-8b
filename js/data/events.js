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

// ── 家人死亡事件（父母）──
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
