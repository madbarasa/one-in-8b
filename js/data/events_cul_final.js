// 欧洲/美洲/大洋洲加密批 v0.7.0：~110 条

export const CUL_FINAL = [];
const L = (id, minAge, maxAge, weight, text, effect, source, extra) =>
  CUL_FINAL.push({ id, type: 'log', minAge, maxAge, weight, text, effect: effect || {}, source, ...(extra || {}) });
const WNE = s => s.culture === 'west-north-euro';
const EEUR = s => s.culture === 'east-euro';
const BALKAN = s => s.culture === 'balkan';
const HISP = s => s.culture === 'hispanic-latam';
const BRAZIL = s => s.iso3 === 'BRA';
const CARIB = s => s.culture === 'caribbean';
const ANGLO2 = s => s.culture === 'anglo' && s.iso3 !== 'USA';
const OCE = s => s.culture === 'oceania';

// ══════════ 西欧-北欧-南欧加密 ══════════
L('wn2-cafe-culture', 15, 70, 14, '街角咖啡——「站着喝三口比坐着喝三小时贵」，但没人催你。', { hap: 2, rel: 2, money: -30 }, null, { cond: WNE });
L('wn2-vacation-august', 22, 65, 14, '八月全城去海边——「公司只剩一个门卫，他也在打算休假」。', { hap: 3, rel: 2, money: -400 }, null, { cond: WNE });
L('wn2-sunday-closed', 8, 70, 13, '周日商店全关——「这一天属于家庭和散步，购物是异端」。', { rel: 2, hap: 1, know: 0 }, null, { cond: WNE });
L('wn2-bureaucracy-form', 18, 70, 13, '一份表格要盖三个章——「欧洲的行政效率，是用耐心测试你的诚意」。', { hap: -1, know: 1, hap2: 0 }, null, { cond: WNE });
L('wn2-italy-pasta-rule', 8, 70, 13, '意面规则十二诫——「往奶油意面里加菠萝的人，会被祖母逐出家门」。', { hap: 2, rel: 2, know: 1 }, null, { cond: s => WNE(s) && s.iso3 === 'ITA' });
L('wn2-siesta-spain', 10, 70, 13, '午后两点的西班牙小镇——「店铺的卷帘门放下来，世界进入静音模式」。', { hp: 1, hap: 2 }, null, { cond: s => WNE(s) && s.iso3 === 'ESP' });
L('wn2-sauna-finland', 10, 70, 10, '芬兰桑拿——「每周三次桑拿，冰窟窿里一跳」，三百万人口五百万个桑拿房。', { hp: 2, hap: 2, rel: 1 }, '芬兰人均桑拿房全球第一', { cond: s => WNE(s) && ['FIN', 'SWE', 'EST'].includes(s.iso3) });
L('wn2-oktoberfest-beer', 18, 70, 10, '啤酒节——「一升装的杯子举起来，陌生人和你碰杯就是朋友」。', { hap: 3, rel: 2, money: -60, hp: -1 }, null, { cond: s => WNE(s) && ['DEU', 'AUT', 'CHE'].includes(s.iso3) });
L('wn2-israel-army', 18, 21, 13, '义务兵役——「十八岁的那两年，全以色列的年轻人都在同一个队列里」。', { hp: -1, know: 2, rel: 2 }, '以色列为全球少数全民义务兵役国', { cond: s => s.iso3 === 'ISR' && s.age >= 18 });
L('wn2-paris-strike', 22, 65, 10, '罢工日——「地铁停了，但咖啡馆满了，法国人连抗议都很会生活」。', { hap: 1, know: 1, rel: 1 }, null, { cond: s => WNE(s) && ['FRA', 'BEL'].includes(s.iso3) && s.age >= 22 });
L('wn2-nordic-winter-dark', 10, 70, 13, '冬天下午三点天黑——「维生素D 和 SAD 情绪灯，是北欧人的过冬装备」。', { hap: -2, know: 1, hp: -1 }, null, { cond: s => WNE(s) && ['FIN', 'SWE', 'NOR', 'DNK', 'ISL'].includes(s.iso3) });
L('wn2-eurotrip-interrail', 18, 28, 10, '毕业旅行坐火车横穿欧洲——「二十岁的欧铁通票，是中产家庭的标准成长包」。', { know: 2, hap: 3, money: -500 }, null, { cond: s => WNE(s) && s.age <= 28 });
L('wn2-parental-leave', 25, 40, 13, '480 天育儿假——「爸爸也在家带娃，这在瑞典不是新闻是常态」。', { hap: 2, rel: 2, money: -50 }, '瑞典育儿假共 480 天父母共享', { cond: s => s.iso3 === 'SWE' && s.children.length > 0 && s.age >= 25 });
L('wn2-ireland-pub-session', 18, 70, 10, '爱尔兰酒吧的传统音乐之夜——「小提琴一响，门口的陌生人也会跟着哼」。', { hap: 3, rel: 3, money: -40 }, null, { cond: s => WNE(s) && s.iso3 === 'IRL' });
L('wn2-swiss-canton-vote', 20, 70, 8, '全民投票日——「一年四次，政堂式的直接民主，你的那张票真的算数」。', { know: 2, hap: 1, rel: 1 }, null, { cond: s => s.iso3 === 'CHE' && s.age >= 20 });
L('wn2-dutch-boat-life', 18, 70, 8, '阿姆斯特丹的船屋——「运河上的家，冬天甲板结霜夏天开派对」。', { money: -200, hap: 2, know: 1 }, null, { cond: s => s.iso3 === 'NLD' && s.age >= 18 });

// ══════════ 东欧加密 ══════════
L('ee2-dacha-garden', 10, 70, 14, '乡间小屋（dacha）的土豆地——「五一假期全城人去种地，这是斯拉夫人的垂直农场」。', { hp: 1, rel: 2, hap: 1 }, null, { cond: EEUR });
L('ee2-banya-vodka', 20, 70, 10, '澡堂配伏特加——「蒸到怀疑人生，然后喝一口觉得人间值得」。', { hp: -1, hap: 2, rel: 2 }, null, { cond: s => EEUR(s) && ['RUS', 'UKR', 'BLR'].includes(s.iso3) && s.age >= 20 });
L('ee2-soviet-block-flat', 5, 70, 13, '赫鲁晓夫楼的十五平米——「三代人一套房，隐私是奢侈品，亲密是必然」。', { rel: 2, hap: 0, know: 1 }, null, { cond: EEUR });
L('ee2-banya-beriozka', 8, 18, 10, '白桦树林里的夏令营——「篝火、土豆和军训式的队列」，每个东欧人的童年标配。', { hap: 2, rel: 2, hp: 1 }, null, { cond: EEUR });
L('ee2-victory-day', 5, 80, 13, '胜利日阅兵——「爷爷的勋章在阳光下亮，他说的话你听不清，但你记得那天的花」。', { know: 2, rel: 2, hap: 1 }, null, { cond: EEUR });
L('ee2-roaming-wolves', 20, 55, 10, '九十年代的动荡——「存款一夜归零，但你学会了在废墟上重新开始」。', { money: -300, know: 2, hap: -2, rel: 1 }, '苏联解体后东欧经历恶性通胀与私有化震荡', { cond: s => EEUR(s) && s.age >= 20 });
L('ee2-oligarch-tv', 25, 70, 8, ' oligarch 的电视频道——「新闻的真相，取决于台长今天的心情」。', { know: 1, hap: -1, rel: 0 }, null, { cond: s => EEUR(s) && s.age >= 25 });
L('ee2-pierogi-sunday', 8, 70, 13, '周日的饺子——「波兰奶奶包的 pierogi，是离家游子的最大乡愁」。', { hp: 1, rel: 2, hap: 2 }, null, { cond: s => EEUR(s) && ['POL', 'CZE', 'SVK'].includes(s.iso3) });
L('ee2-romanian-diaspora', 20, 55, 10, '你去意大利/德国打工——「罗马尼亚的村子，一半人在西欧汇款」。', { money: 600, rel: 1, hap: -1 }, '罗马尼亚侨汇为其重要收入来源', { cond: s => EEUR(s) && ['ROU', 'MDA', 'BGR'].includes(s.iso3) && s.age >= 20 });
L('ee2-ukraine-war', 18, 70, 10, '战争来了——「空袭警报响起时，你在地铁站里给孩子讲故事」。', { hp: -3, hap: -4, rel: 2 }, '2022 年俄乌战争爆发，数百万人流离', { cond: s => EEUR(s) && ['UKR', 'RUS'].includes(s.iso3) && s.age >= 18 });
L('ee2-chernobyl-memory', 30, 80, 8, '切尔诺贝利那年——「蘑菇不能吃了，但森林还在长」，一些东西永远变了。', { hp: -2, know: 2, hap: -1 }, '1986 年切尔诺贝利核事故影响至今', { cond: s => EEUR(s) && ['UKR', 'BLR', 'RUS'].includes(s.iso3) && s.age >= 30 });
L('ee2-hungarian-thermal', 12, 70, 10, '温泉浴场——「布达佩斯的地下，躺着全欧洲最老的澡堂文化」。', { hp: 1, hap: 2, money: -25 }, null, { cond: s => s.iso3 === 'HUN' });

// ══════════ 巴尔干加密 ══════════
L('bk2-rakija-distill', 18, 70, 13, '秋天全家酿拉基亚白兰地——「李子/葡萄/桑葚，蒸馏器的火不灭，邻居家的酒也不灭」。', { hp: -1, hap: 2, rel: 2 }, null, { cond: BALKAN });
L('bk2-coffee-rijeka', 15, 70, 13, '波斯尼亚咖啡——「铜壶煮出来的，配 Turkish delight，一坐就是三小时」。', { hap: 2, rel: 2, money: -20 }, null, { cond: BALKAN });
L('bk2-yugo-nostalgia', 35, 80, 10, '「南斯拉夫时代」的回忆——「那时候一本护照走遍世界，虽然现在想起来像传说」。', { know: 1, rel: 1, hap: 1 }, null, { cond: s => BALKAN(s) && s.age >= 35 });
L('bk2-war-1990s', 20, 70, 10, '九十年代的战争——「 neighbours 变成了敌人，而你永远记得谁帮你藏过面包」。', { hp: -3, hap: -3, rel: 2 }, '南斯拉夫解体战争为二战后欧洲最惨烈冲突', { cond: s => BALKAN(s) && ['BIH', 'SRB', 'HRV', 'MKD', 'XKX'].includes(s.iso3) && s.age >= 20 });
L('bk2-greek-island-summer', 15, 70, 10, '夏天回岛——「白房子、蓝门、和永远吵闹的表兄妹们」。', { hap: 3, rel: 2, hp: 1 }, null, { cond: s => s.iso3 === 'GRC' });
L('bk2-croatian-coast', 18, 70, 10, '亚得里亚海的海岸线——「欧洲人的度假天堂，你的后院」。', { hap: 2, rel: 1, money: -50 }, null, { cond: s => s.iso3 === 'HRV' });
L('bk2-orthodox-easter', 8, 70, 13, '东正教复活节——「红鸡蛋互碰，谁的蛋壳不碎谁赢一年好运」。', { hap: 2, rel: 2, know: 1 }, null, { cond: BALKAN });
L('bk2-albanian-kanun', 12, 60, 8, '卡努法典——「荣誉高于生命」的古老规矩，爷爷讲得严肃，你听得心惊。', { know: 2, rel: 1, hap: 0 }, '卡努法典为阿尔巴尼亚北部传统习惯法', { cond: s => BALKAN(s) && ['ALB', 'XKX'].includes(s.iso3) });

// ══════════ 西语拉美加密 ══════════
L('hl2-dia-muertos', 5, 80, 14, '亡灵节——「万寿菊铺路，糖骷髅微笑，死亡在这里是被庆祝的回归」。', { hap: 3, rel: 3, know: 1 }, '亡灵节列入 UNESCO 非遗', { cond: s => HISP(s) && s.iso3 === 'MEX' });
L('hl2-machismo-talk', 15, 40, 10, '「男子汉」的规训——「不许哭、要硬气」，你花了很多年才解开这个结。', { hap: -1, know: 2, rel: 1 }, null, { cond: s => HISP(s) && s.gender === 'male' && s.age >= 15 });
L('hl2-remittance-usa', 20, 50, 13, '你去美国打工——「北边的美元，南边的房子」，你家的新墙是汇款单砌的。', { money: 900, rel: -1, hap: -1 }, '拉美侨汇总额超 1500 亿美元/年', { cond: s => HISP(s) && ['MEX', 'GTM', 'HND', 'SLV', 'NIC'].includes(s.iso3) && s.age >= 20 });
L('hl2-carnival-brazil', 10, 70, 13, '狂欢节——「一年的辛苦，五天的桑巴，全城都是舞台」。', { hap: 4, rel: 2, hp: 1, money: -80 }, null, { cond: BRAZIL });
L('hl2-favela-life', 8, 70, 10, '山坡上的社区（favela）——「台阶是街道，屋顶是阳台，喇叭是闹钟」。', { rel: 2, hap: 1, know: 1 }, null, { cond: s => BRAZIL(s) && s.region === '城市' });
L('hl2-telenovela-evening', 12, 70, 13, '晚间的电视剧场——「全家追同一部苦情剧，反派比亲戚还熟」。', { hap: 2, rel: 2 }, null, { cond: s => HISP(s) || s.iso3 === 'BRA' });
L('hl2-machete-farm', 12, 60, 10, '香蕉园/甘蔗地里的弯刀——「一挥一收，就是一天的工资」。', { money: 150, hp: -2, know: 1 }, null, { cond: s => HISP(s) && s.region === '乡村' });
L('hl2-venezuela-line', 20, 70, 10, '排队买面粉——「三小时的队，两袋玉米粉，一个说不清的明天」。', { hp: -1, hap: -2, know: 1 }, '委内瑞拉经济危机 2014-2021', { cond: s => s.iso3 === 'VEN' && s.age >= 20 });
L('hl2-argentina-asado', 15, 70, 13, '周日的烤肉（asado）——「牛肉是阿根廷人的信仰，火候是尊严」。', { hp: 1, hap: 3, rel: 2, money: -60 }, null, { cond: s => s.iso3 === 'ARG' });
L('hl2-chile-terremoto', 10, 70, 10, '地震——「 shake 、 shake 、 shake ，然后大家排队买酒庆祝还活着」。', { hp: -2, hap: -1, rel: 2 }, '智利为全球地震最频发国家之一', { cond: s => s.iso3 === 'CHL' });
L('hl2-colombia-coffee', 12, 65, 10, '咖啡山区的清晨——「你背的咖啡篮，比你还重」。', { money: 180, hp: -1, know: 1 }, null, { cond: s => s.iso3 === 'COL' && s.region === '乡村' });
L('hl2-cuban-malecon', 12, 70, 10, '哈瓦那海滨大道（Malecón）——「海浪拍岸，老人钓鱼，姑娘跳舞，时间在这里慢半拍」。', { hap: 2, rel: 2, know: 1 }, null, { cond: s => s.iso3 === 'CUB' });
L('hl2-cartel-shadow', 16, 45, 8, '「别走那条街」——有组织犯罪的阴影，是某些城市的日常地理。', { hp: -1, hap: -2, know: 2 }, '拉美部分城市凶杀率为全球最高（UNODC）', { cond: s => HISP(s) && s.age >= 16 });

// ══════════ 加勒比加密 ══════════
L('cb2-carnival-jamaica', 12, 70, 13, '狂欢节——「羽毛、亮片和 calypso 节拍，全岛都走出家门」。', { hap: 3, rel: 2, hp: 1 }, null, { cond: CARIB });
L('cb2-cricket-beach', 10, 60, 10, '海滩板球——「一块木板当球拍，椰子树当三柱门」。', { hp: 2, hap: 2, rel: 2 }, null, { cond: CARIB });
L('cb2-hurricane-season', 10, 70, 13, '飓风季——「六月到十一月，收音机里的名字，每年换一批」。', { hp: -1, know: 1, hap: -1 }, '加勒比年均遭遇 1-2 场强飓风', { cond: CARIB });
L('cb2-remittance-canada', 20, 55, 10, '你去加拿大/英国打工——「岛上的日子好过，但工资单在多伦多」。', { money: 700, rel: 1, hap: -1 }, null, { cond: s => CARIB(s) && s.age >= 20 });
L('cb2-haiti-tap-tap', 10, 70, 10, 'Tap-Tap 小巴的涂装——「海地的公共交通，是全加勒比最亮的移动艺术」。', { hap: 1, know: 1, money: -10 }, null, { cond: s => s.iso3 === 'HTI' });
L('cb2-haiti-earthquake', 15, 80, 8, '大地震那年——「太子港的灰色，很多年没散去」。', { hp: -3, hap: -3, rel: 2 }, '2010 年海地地震 22 万+ 人遇难', { cond: s => s.iso3 === 'HTI' && s.age >= 15 });
L('cb2-suga-cane-cut', 14, 60, 8, '甘蔗地里弯腰——「刀起刀落，是这个国家好几代人的日程表」。', { money: 150, hp: -2, know: 1 }, null, { cond: s => CARIB(s) && s.region === '乡村' });

// ══════════ 盎格鲁（加澳英爱）加密 ══════════
L('an2-summer-camp-lake', 8, 16, 13, '湖边夏令营——「独木舟、营火和失踪的袜子」，北美孩子的独立训练场。', { hap: 3, rel: 2, hp: 1, money: -300 }, null, { cond: ANGLO2 });
L('an2-boxing-day-sale', 15, 70, 10, '节礼日抢购——「凌晨排队的人，比去教堂的人多」。', { money: -200, hap: 1, rel: 1 }, null, { cond: ANGLO2 });
L('an2-australian-beach', 10, 70, 13, '海滩文化——「滑板、冲浪和防晒霜，澳洲的夏天从十月开始」。', { hp: 2, hap: 3, rel: 1 }, null, { cond: s => ANGLO2(s) && s.iso3 === 'AUS' });
L('an2-bushfire-season', 15, 70, 10, '山火季——「橘色的天空，和浓烟里的邻居们互相收留」。', { hp: -2, hap: -2, rel: 2 }, '2019-20 澳洲黑色夏季山火烧毁 2400 万公顷', { cond: s => s.iso3 === 'AUS' });
L('an2-bbq-backyard', 12, 70, 13, '后院烧烤——「香肠、洋葱和邻居家的狗」，澳洲周末的国教。', { hap: 2, rel: 2, money: -30 }, null, { cond: s => ANGLO2(s) && s.iso3 === 'AUS' });
L('an2-uk-pub-quiz', 18, 70, 10, '酒吧问答夜——「一队五人，啤酒不限，输的人买单」。', { hap: 2, rel: 3, money: -35, know: 1 }, null, { cond: s => ANGLO2(s) && ['GBR', 'IRL'].includes(s.iso3) && s.age >= 18 });
L('an2-queens-holiday', 20, 70, 8, 'Bank Holiday——「英国的假期名，一半和女王有关，另一半和天气有关」。', { hap: 2, rel: 1, money: -40 }, null, { cond: s => ANGLO2(s) && ['GBR', 'IRL'].includes(s.iso3) });
L('an2-canada-winter', 10, 70, 10, '加拿大的冬天——「零下三十度是常态，冰球是抗议寒冷的方式」。', { hp: 1, hap: 1, know: 1 }, null, { cond: s => s.iso3 === 'CAN' });
L('an2-irish-emigration', 20, 40, 10, '「移居伦敦/纽约」的传统——「爱尔兰的机场，永远有一半人在告别」。', { money: 500, rel: -1, hap: -1 }, null, { cond: s => s.iso3 === 'IRL' && s.age >= 20 });

// ══════════ 大洋洲加密 ══════════
L('oc2-sunday-church-sing', 6, 70, 10, '周日教堂唱诗——「太平洋的福音，是和声最干净的地方」。', { hap: 2, rel: 3 }, null, { cond: s => OCE(s) && ['TON', 'WSM', 'FJI'].includes(s.iso3) });
L('oc2-land-custom', 12, 70, 10, '「土地不属于你，你属于土地」——美拉尼西亚的习惯法产权，写不在纸上但写在心里。', { know: 2, rel: 2 }, null, { cond: OCE });
L('oc2-cyclone-pam', 15, 70, 8, '气旋帕姆过境后——「铁皮屋顶在别的岛找到了新家，你家的新屋顶是全村的杰作」。', { hp: -2, hap: -1, rel: 3 }, '2015 年气旋 Pam 重创瓦努阿图', { cond: s => s.iso3 === 'VUT' });
L('oc2-fiji-sugar', 14, 60, 10, '斐济的甘蔗季——「小火车载着甘蔗去磨坊，载着你的学费」。', { money: 180, hp: -1, know: 1 }, null, { cond: s => s.iso3 === 'FJI' && s.region === '乡村' });
L('oc2-tonga-whale', 20, 70, 8, '座头鲸路过——「八月，全汤加都在等海里的客人」。', { hap: 3, know: 1, rel: 1 }, null, { cond: s => s.iso3 === 'TON' });
L('oc2-png-mountain', 10, 70, 10, '高地省的山路——「步行四小时到集市，回程五小时（负重）」。', { hp: 1, money: 60, know: 1 }, null, { cond: s => s.iso3 === 'PNG' && s.region === '乡村' });
L('oc2-kiribati-tide', 15, 70, 10, '涨潮那天——「海水漫过防波堤，村里的椰子树喝到了咸水」。', { know: 1, hap: -1, hp: -1 }, null, { cond: s => OCE(s) && ['KIR', 'TUV'].includes(s.iso3) });
L('oc2-remittance-aus', 22, 55, 10, '你在澳洲果园打工——「季节签证、汇款单和永远回不去的完整家庭」。', { money: 700, rel: -1, hap: -1 }, null, { cond: s => OCE(s) && s.age >= 22 });
