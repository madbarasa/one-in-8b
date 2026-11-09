// 美洲四文化圈 + 大洋洲事件 v0.7.0：~150 条
// hispanic-latam / brazil-luso / caribbean / anglo(加澳) / oceania

export const CUL_AMERICAS = [];
const L = (id, minAge, maxAge, weight, text, effect, source, extra) =>
  CUL_AMERICAS.push({ id, type: 'log', minAge, maxAge, weight, text, effect: effect || {}, source, ...(extra || {}) });
const HISP = s => s.culture === 'hispanic-latam';
const BRAZIL = s => s.culture === 'brazil-luso' && s.iso3 === 'BRA';
const CARIB = s => s.culture === 'caribbean';
const ANGLO2 = s => s.culture === 'anglo' && s.iso3 !== 'USA';
const OCE = s => s.culture === 'oceania';

// ══════════ 西语拉美（18 国）══════════
L('hl-quinceanera', 14, 16, 7, '你的十五岁成人礼（quinceañera）：白裙、华尔兹、和爸爸换的那支舞——一晚花掉半年积蓄。', { hap: 4, rel: 3, money: -600 }, 'Quinceañera 为拉美女孩成人礼核心仪式', { cond: s => HISP(s) && s.gender === 'female' && s.age === 15 });
L('hl-futbol-street', 8, 20, 9, '巷子里的足球从早踢到晚——「马拉多纳/梅西」是这里的宗教，球场是教堂。', { hp: 2, hap: 3, rel: 2 }, null, { cond: HISP });
L('hl-familia-lunch', 5, 70, 8, '周日全家的长桌：奶奶掌勺、叔叔们争论政治、孩子们在院子里疯跑——三小时的午餐是制度。', { hap: 3, rel: 3, hp: -1 }, null, { cond: HISP });
L('hl-machismo-pressure', 12, 30, 5, '「男孩子不许哭」——这句话你听了二十年，直到你学会它不对。', { hap: -1, know: 2, rel: 1 }, null, { cond: s => HISP(s) && s.gender === 'male' });
L('hl-us-dream', 20, 45, 7, '表哥从美国回来了——开着好车、晒着「那边」的太阳。全村的年轻人都在问路。', { hap: 1, know: 1, rel: 2 }, '墨西哥/中美洲为美国最大移民来源（UN DESA）', { cond: HISP });
L('hl-narco-shadow', 15, 60, 4, '「那家店的保护费又涨了」——大人压低声音说话的样子，你从小就会察言观色。', { hap: -2, know: 1, hp: -1 }, null, { cond: s => HISP(s) && ['MEX', 'COL', 'VEN', 'HND', 'SLV'].includes(s.iso3) });
L('hl-inflation-basket', 25, 60, 6, '超市价签一天一个价——你学会了工资一到手就换东西，「钱会瘦，牛肉不会」。', { money: -100, know: 2, hap: -1 }, '阿根廷通胀长年高企（IMF 数据）', { cond: s => HISP(s) && s.iso3 === 'ARG' });
L('hl-remesas-line', 22, 60, 6, '汇款点排队——你在美国的弟弟寄钱回来了，这笔钱是妈妈的降压药和你的学费。', { money: 350, rel: 2 }, '拉美年侨汇超千亿美元（世行）', { cond: HISP });
L('hl-day-of-dead', 5, 80, 7, '亡灵节：万寿菊铺路、糖骷髅、和坟前的一场野餐——「死亡在这里是重逢，不是告别」。', { hap: 2, know: 2, rel: 2 }, '亡灵节列入联合国非遗', { cond: s => HISP(s) && s.iso3 === 'MEX' });
L('hl-mercado-sabado', 8, 70, 6, '周六集市：手风琴、烤玉米、和砍价砍到笑场的阿姨们——「巷子经济」是拉美的心跳。', { money: -50, hap: 2, rel: 1 }, null, { cond: HISP });
L('hl-earthquake-drill', 8, 60, 5, '地震演习全班钻桌底——这个大陆的地质课，是用亲身经历上的。', { know: 2, hp: -1 }, '环太平洋地震带贯穿美洲西海岸', { cond: s => HISP(s) && ['CHL', 'PER', 'ECU', 'MEX', 'COL'].includes(s.iso3) });
L('hl-telenovela-together', 10, 70, 6, '晚上八点全家准时看电视剧——「好人坏人一目了然」的八点档，是一天的团圆时刻。', { hap: 2, rel: 2 }, null, { cond: HISP });
L('hl-political-rally', 18, 70, 5, '竞选季的街头：彩旗、音乐、和免费的三明治——「民主在这里是热闹的」。', { know: 1, rel: 1, hap: 1 }, null, { cond: HISP });

// ══════════ 巴西（+葡）══════════
L('bz-carnival-year', 8, 70, 8, '狂欢节是你一年的心跳——桑巴学校的排练从八月就开始，一年的积蓄献给四天的天堂。', { hap: 5, rel: 3, money: -150 }, '里约狂欢节每年吸引数百万人', { cond: BRAZIL });
L('bz-favela-life', 6, 70, 6, '山坡上的社区（favela）——「这里是城市，也是村庄：每条巷子都认识你的名字」。', { rel: 2, know: 1, hap: 0 }, '约 6% 巴西人口居住于 favela（IBGE）', { cond: s => BRAZIL(s) && s.wealthIdx <= 2 });
L('bz-beach-sunday', 8, 70, 7, '周日的海滩：足球、沙滩排球、和一公斤装的冰啤酒——「海滩是巴西的客厅」。', { hap: 3, rel: 2, hp: 1 }, null, { cond: BRAZIL });
L('bz-feijoada-wed', 5, 70, 6, '黑豆炖肉（feijoada）配橙子和木薯粉——「周三吃这个」是全巴西的默契。', { hp: 1, hap: 2, rel: 1 }, null, { cond: BRAZIL });
L('bz-futebol-academy', 10, 18, 6, '你在家乡俱乐部的青训营——「每一个贝利/罗纳尔多/内马尔都从这样的红土场开始」。', { hp: 2, hap: 2, know: 1 }, null, { cond: s => BRAZIL(s) && s.gender === 'male' && s.age <= 18 });
L('bz-bolo-casamento', 26, 40, 5, '你的婚礼要「从中午跳到天亮」——巴西婚宴没有散场时间，只有累趴的新人。', { money: -1000, hap: 4, rel: 3 }, null, { cond: s => BRAZIL(s) && s.age >= 26 });

// ══════════ 加勒比（23 国）══════════
L('cb-carnival-monday', 8, 70, 7, '狂欢节大游行：羽毛、亮片、和钢鼓乐队——「一年就为了这两天活着」。', { hap: 5, rel: 2, money: -100 }, '特立尼达狂欢节为加勒比文化之巅', { cond: CARIB });
L('cb-hurricane-season', 8, 70, 7, '六月到十一月是「台风季」——你学会了看云识天，「头顶的云不对劲」就是警报。', { hp: -1, know: 2, hap: -1 }, '加勒比飓风季年均多场强飓风', { cond: CARIB });
L('cb-remittance-miami', 20, 60, 6, '你在迈阿密/纽约打工——「加勒比人的钱包在美国，心在岛上」。', { money: 500, rel: 1, hap: -1 }, '加勒比侨汇占多国 GDP 两成以上（世行）', { cond: CARIB });
L('cb-cricket-sunday', 10, 60, 6, '周日的板球赛——全岛停摆，「西印度群岛队」是十几国的同一个心脏。', { hap: 3, rel: 2 }, null, { cond: CARIB });
L('cb-reggae-roots', 12, 60, 5, '你听着雷鬼长大——「音乐是我们向世界发言的方式」，从 Bob Marley 到你的耳机。', { hap: 2, know: 1 }, '雷鬼列入联合国非遗（2018）', { cond: s => CARIB(s) && s.iso3 === 'JAM' });
L('cb-sugarcane-cut', 16, 55, 5, '你在甘蔗地里挥了一整天砍刀——这份甜，是加勒比四百年的甜与苦。', { money: 180, hp: -3, know: 1 }, null, { cond: s => CARIB(s) && s.region === '乡村' });
L('cb-haiti-struggle', 10, 70, 5, '「又停电了」和「又涨价了」是村里的两句口头禅——但周日教堂的歌声从没停过。', { hap: -1, rel: 1, know: 1 }, '海地为美洲最不发达国家（世行 LDC）', { cond: s => CARIB(s) && s.iso3 === 'HTI' });
L('cb-tourism-job', 18, 55, 6, '你在度假村打工——「游轮来的那天，全岛的物价都漂起来了」。', { money: 300, know: 1, rel: 1 }, '旅游业为多数加勒比经济体支柱', { cond: CARIB });

// ══════════ 盎格鲁圈（加澳新英爱）══════════
L('an2-cottage-lake', 8, 70, 6, '湖边小屋（cottage/lake house）的夏天：划船、篝火、和没信号的日子。', { hap: 3, rel: 2, money: -100 }, null, { cond: ANGLO2 });
L('an2-gap-year', 17, 20, 5, '你 gap year 去了东南亚/欧洲打工旅行——「先看世界再读大学」是这里的默认选项。', { know: 2, hap: 3, money: -500 }, 'Gap year 在英澳新为中产普遍安排', { cond: s => ANGLO2(s) && s.age >= 17 && s.age <= 20 });
L('an2-university-debt', 18, 25, 6, '你的助学贷款（HECS/Student Loan）——「毕业那天开始，和税务局分享你的工资」。', { know: 1, money: -200, hap: -1 }, '澳新加学生贷随收入比例偿还', { cond: s => ANGLO2(s) && s.age >= 18 });
L('an2-pub-quiz', 20, 60, 6, '酒吧问答夜：你的队伍名很荒诞，答对酒水打折——「这是英国人的夜生活标配」。', { money: -30, hap: 3, rel: 2 }, null, { cond: s => ANGLO2(s) && ['GBR', 'IRL'].includes(s.iso3) });
L('an2-bushfire-alert', 10, 70, 4, '山火警报把天空染成橙色——「准备好撤离包」是这个大陆每个夏天都用得上的常识。', { hp: -1, know: 2, hap: -2 }, '澳洲 2019-20 黑夏山火烧毁逾千万公顷', { cond: s => s.iso3 === 'AUS' });
L('an2-nhs-wait', 20, 70, 5, '公立医疗免费但要排——「非急症等六个月」和「一分钱不花」是同一枚硬币的两面。', { hp: -1, hap: 0, money: 100 }, null, { cond: s => ['GBR', 'CAN'].includes(s.iso3) });
L('an2-remembrance-poppy', 8, 80, 5, '十一月你胸前别上罂粟花——「Lest We Forget」，追悼仪式上全国静默两分钟。', { know: 1, rel: 1, hap: 0 }, null, { cond: s => ANGLO2(s) && ['GBR', 'IRL', 'AUS', 'NZL', 'CAN'].includes(s.iso3) });

// ══════════ 大洋洲（17 国）══════════
L('oc-village-fono', 8, 70, 6, '村里的会议（fono）——长老们说话时你学着闭嘴，「社区的决定比个人的想法大」。', { rel: 2, know: 1, hap: 1 }, null, { cond: OCE });
L('oc-land-ties', 10, 70, 7, '「土地就是血脉」——你们家的地和祖坟在同一片椰林里，卖地是全村级别的耻辱。', { know: 1, rel: 2, hap: 1 }, null, { cond: OCE });
L('oc-church-sunday-best', 6, 70, 7, '周日你穿上「最白的白」去教堂——太平洋岛国的教会是学校、银行和社交中心。', { hap: 2, rel: 2, know: 1 }, null, { cond: OCE });
L('oc-cyclone-pam', 10, 70, 5, '气旋把你家的铁皮屋顶送去了邻国方向——重建用了两年，合唱只用了一晚。', { hp: -2, hap: -2, rel: 2 }, '2015 年气旋 Pam 重创瓦努阿图', { cond: OCE });
L('oc-sea-level-home', 15, 70, 6, '涨潮那天海水漫进了村里的水井——「我们可能是第一批搬走的人，也可能是最后一代住在这里的人」。', { know: 2, hap: -2, rel: 1 }, '海平面上升威胁低环礁国家存续（IPCC）', { cond: s => OCE(s) && ['KIR', 'TUV', 'MHL'].includes(s.iso3) });
L('oc-fale-family', 5, 70, 5, '开放式大屋（fale）里睡着全家十几口——「隐私是富人才有的奢侈品，但我们有彼此」。', { rel: 3, hap: 2, hap2: 0 }, null, { cond: s => OCE(s) && ['WSM', 'TON', 'VUT'].includes(s.iso3) });
L('oc-remittance-nz', 22, 55, 6, '你去新西兰摘果子打工——「季节工签证」是太平洋岛国的成人礼之一。', { money: 700, rel: 1, hap: -1 }, '新西兰 RSE 计划雇佣太平洋岛国季节工', { cond: s => OCE(s) && s.age >= 22 });
L('oc-png-tribe', 10, 70, 5, '你们村有八百种语言里的两种——巴新的语言多样性，是全世界最密的迷宫。', { know: 2, rel: 1, hap: 1 }, '巴布亚新几内亚语言超 800 种，全球最多', { cond: s => OCE(s) && s.iso3 === 'PNG' });
L('oc-kava-ceremony', 18, 70, 5, '卡瓦酒仪式：你盘腿坐进圆圈，喝下那碗泥土味的饮品——「喝了卡瓦，我们就是兄弟」。', { hap: 2, rel: 3, hp: -1 }, null, { cond: s => OCE(s) && ['FJI', 'VUT', 'WSM', 'TON'].includes(s.iso3) && s.age >= 18 });
