// 小圈补强 v0.7.0：brazil-luso / caribbean / sinic / sea-maritime / sas-islam 各+5~8 条

export const CUL_SMALL = [];
const L = (id, minAge, maxAge, weight, text, effect, source, extra) =>
  CUL_SMALL.push({ id, type: 'log', minAge, maxAge, weight, text, effect: effect || {}, source, ...(extra || {}) });
const BRAZIL = s => s.iso3 === 'BRA' || s.iso3 === 'PRT';
const CARIB = s => s.culture === 'caribbean';
const SINIC = s => s.culture === 'sinic' && s.country !== 'china';
const SEAMAR = s => s.culture === 'sea-maritime' && s.country !== 'indonesia';
const SASISLAM = s => s.culture === 'sas-islam' && s.country !== 'pakistan';

// ══════════ 巴西葡语圈 ══════════
L('bz2-feijoada-sunday', 5, 70, 9, '周日黑豆炖肉（feijoada）——「一大锅炖一切，包括上周的分歧」。', { hp: 1, rel: 2, hap: 2 }, null, { cond: BRAZIL });
L('bz2-samba-school', 12, 70, 8, '桑巴舞校的排练夜——「鼓点一响，整个街区就是你的舞台」。', { hap: 3, rel: 2, hp: 1 }, null, { cond: BRAZIL });
L('bz2-beach-volley', 10, 60, 7, '海滩足球/排球——「科帕卡巴纳的沙地上，人人都是运动员」。', { hp: 2, hap: 2, rel: 1 }, null, { cond: BRAZIL });
L('bz2-churrasco-family', 8, 70, 7, '家庭烤肉日——「烤肉师傅（churrasqueiro）在巴西家庭地位崇高」。', { hp: 1, hap: 2, rel: 2, money: -40 }, null, { cond: BRAZIL });
L('bz2-futebol-academy', 8, 18, 7, '你去了足球学校试训——「这里的每个男孩都有球星梦，教练见过一万个你」。', { hp: 2, hap: 1, know: 1 }, null, { cond: s => BRAZIL(s) && s.age <= 18 });
L('bz2-novela-communal', 12, 70, 6, '八点档——「全国人民同一秒讨论同一个反派」。', { hap: 1, rel: 2 }, null, { cond: BRAZIL });

// ══════════ 加勒比 ══════════
L('cb2-carnival-jouvert', 10, 70, 8, '清晨狂欢（Jouvert）——「天没亮，全身抹满油和泥，音乐一响全年最野」。', { hap: 4, rel: 2, hp: -1 }, null, { cond: CARIB });
L('cb2-remittance-north', 20, 55, 7, '你去北美打工——「全岛一半人有海外亲戚，机场是村里最忙的地方」。', { money: 800, rel: -1, hap: -1 }, '加勒比侨汇占多国 GDP 两成以上', { cond: s => CARIB(s) && s.age >= 20 });
L('cb2-cricket-sunday', 8, 70, 7, '周日板球——「一场球打一天，观众喝的朗姆酒比得分还多」。', { hp: 1, hap: 3, rel: 2 }, null, { cond: CARIB });
L('cb2-shutter-season2', 10, 70, 6, '飓风季的六月——「木板钉窗、存水存罐头，听天由命但永不慌乱」。', { hp: -1, know: 1, rel: 1 }, null, { cond: CARIB });
L('cb2-jerk-grill', 8, 70, 6, '烟熏辣椒烤鸡（jerk）——「辣得跳脚也停不下来，这是 islander 的尊严」。', { hp: 1, hap: 3, money: -20 }, null, { cond: CARIB });
L('cb2-double-house', 10, 60, 5, '你家一半人海外一半人在岛——「圣诞视频通话要排三个时区」。', { rel: 2, know: 1, hap: 0 }, null, { cond: CARIB });

// ══════════ 儒家圈补充 ══════════
L('sn2b-hanja-kanji', 7, 15, 6, '汉字课——「繁体字的笔画是祖先的密码」，抄写一百遍后你忽然认识了它。', { know: 2, hap: 0, money: -30 }, null, { cond: SINIC });
L('sn2b-kimchi-side', 8, 70, 7, '腌菜缸/泡菜冰箱——「发酵的时间感，是这类家庭的传家宝」。', { hp: 1, hap: 2, rel: 1 }, null, { cond: SINIC });
L('sn2b-exam-parent-fee', 15, 22, 6, '补课费单——「一张单子，半个月工资」。你妈看了一眼就签了字。', { know: 2, money: -200, hap: -1 }, null, { cond: s => SINIC(s) && s.inSchool });
L('sn2b-gaming-cafe', 12, 28, 6, '网吧/游戏厅——「凌晨两点的键盘声，是青春期最响的心跳」。', { hap: 2, rel: 2, hp: -1, money: -20 }, null, { cond: s => SINIC(s) && s.age <= 28 });
L('sn2b-sauna-communication', 18, 70, 5, '汗蒸房/澡堂——「赤裸相见之后，生意都好谈了」。', { hp: 1, hap: 2, rel: 1, money: -25 }, null, { cond: SINIC });
L('sn2b-company-dinner', 22, 55, 6, '公司聚餐（회식/飲み会）——「酒桌上的座次和敬酒顺序，是职场第二张考卷」。', { rel: 2, hap: 1, hp: -1, money: 0 }, null, { cond: s => SINIC(s) && s.age >= 22 && s.job });

// ══════════ 海洋东南亚补充 ══════════
L('sf2-jeepney-ride', 10, 70, 7, '吉普尼/三轮摩托——「涂装是车主的脸面，挤满人是基本礼仪」。', { money: -15, hap: 1, know: 1 }, null, { cond: SEAMAR });
L('sf2-ofw-sacrifice', 22, 55, 8, '你成了 OFW（海外菲律宾劳工）——「一百万个你，撑起全国两成的经济」。', { money: 900, rel: -2, hap: -1 }, '菲侨汇约占 GDP 9%（世行）', { cond: s => SEAMAR(s) && s.iso3 === 'PHL' && s.age >= 22 });
L('sf2-videoke-night', 12, 70, 7, 'Videoke 唱到凌晨——「菲律宾人的麦霸之夜，跑调也是权利」。', { hap: 3, rel: 2, money: -15 }, null, { cond: SEAMAR });
L('sf2-typhoon-arrival', 8, 70, 6, '台风命名都耳熟——「一年二十个，名字像老朋友，来的却总不怀好意」。', { hp: -1, know: 1, hap: -1 }, '菲律宾年均遭 20 个台风登陆', { cond: s => SEAMAR(s) && s.iso3 === 'PHL' });
L('sf2-basketball-court', 8, 30, 8, '村里的篮球场——「半场、拖鞋、和永不散场的观众」。', { hp: 2, hap: 3, rel: 2 }, null, { cond: s => SEAMAR(s) && s.iso3 === 'PHL' });

// ══════════ 南亚伊斯兰补充 ══════════
L('si2d-biryani-friday', 8, 70, 8, '周五的印度香饭——「一锅 biryani 的层次，是这个家庭的脸面」。', { hp: 1, hap: 2, rel: 2 }, null, { cond: SASISLAM });
L('si2d-cha-time', 10, 70, 7, '奶茶时间（cha）——「一天五杯，杯杯是社交」。', { hap: 1, rel: 2, money: -10 }, null, { cond: SASISLAM });
L('si2d-cricket-street', 8, 25, 8, '巷子板球——「木板当球拍，拖鞋当桩， Sachin 是所有人的哥哥」。', { hp: 2, hap: 3, rel: 2 }, null, { cond: s => SASISLAM(s) && s.age <= 25 });
L('si2d-hawwa-grandma', 5, 15, 6, '奶奶的黑袍与故事——「她一生去过两次朝觐，讲起麦加眼里有光」。', { know: 1, rel: 3, hap: 2 }, null, { cond: s => SASISLAM(s) && s.age <= 15 });
L('si2d-overseas-gulf', 20, 50, 8, '你去海湾国家打工——「迪拜的高楼里有你拧的螺丝，家里的地砖是你汇的钱」。', { money: 850, rel: -2, hap: -1 }, '巴基斯坦/孟加拉海湾劳工数百万计', { cond: s => SASISLAM(s) && s.age >= 20 });
