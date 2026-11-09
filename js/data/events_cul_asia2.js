// 亚太五文化圈加密批 v0.7.0：~95 条

export const CUL_ASIA2 = [];
const L = (id, minAge, maxAge, weight, text, effect, source, extra) =>
  CUL_ASIA2.push({ id, type: 'log', minAge, maxAge, weight, text, effect: effect || {}, source, ...(extra || {}) });
const SINIC = s => s.culture === 'sinic' && s.country !== 'china';
const SEAM = s => s.culture === 'sea-mainland';
const SEAMAR = s => s.culture === 'sea-maritime' && s.country !== 'indonesia';
const INDIC = s => s.culture === 'sas-indic' && s.country !== 'india';
const SASISLAM = s => s.culture === 'sas-islam' && s.country !== 'pakistan';

// ══════════ 儒家圈加密（日韩朝港澳新蒙）══════════
L('sn2-karaoke-box', 15, 60, 13, '卡拉OK包厢——「唱得好不好不重要，重要的是谁也不许坐着」。', { hap: 3, rel: 2, money: -40 }, null, { cond: SINIC });
L('sn2-hotpot-winter', 10, 70, 13, '冬天的火锅/汤锅——「围着锅的家庭会议，什么都能聊，什么都能煮」。', { hp: 1, rel: 2, hap: 2 }, null, { cond: SINIC });
L('sn2-newyear-envelope', 3, 16, 16, '压岁钱/红包——「收到多少，开学就有多少攀比素材」。', { money: 200, hap: 2, know: 1 }, null, { cond: s => SINIC(s) && s.age <= 16 });
L('sn2-mountain-hike', 12, 70, 10, '爬山是国民运动——「山顶的风景不稀奇，稀奇的是全家都同意一起去」。', { hp: 2, hap: 2, rel: 1 }, null, { cond: SINIC });
L('sn2-sauna-jjimjilbang', 12, 70, 13, '汗蒸房（汗蒸幕）过夜——「羊角巾、甜米露和鸡蛋」，韩国人的第二客厅。', { hap: 2, hp: 1, rel: 2, money: -25 }, null, { cond: s => SINIC(s) && s.iso3 === 'KOR' });
L('sn2-cram-school-late', 15, 20, 14, '晚上十一点的补习班走廊——「首尔的夜里最亮的地方是培优楼」。', { know: 2, hap: -2, money: -200 }, '韩国私教育支出占家庭收入比常年在 10% 级别', { cond: s => SINIC(s) && s.iso3 === 'KOR' && s.inSchool });
L('sn2-holiday-traffic', 25, 60, 10, '春节/中秋的返乡高速——「六小时车程开十小时，堵车的尽头是妈妈的饭」。', { money: -100, rel: 3, hap: 1 }, null, { cond: SINIC });
L('sn2-onsen-vacation', 15, 70, 10, '温泉旅馆——「泡汤之后的一瓶牛奶，是日本人的成人礼之一」。', { hap: 3, hp: 1, money: -120 }, null, { cond: s => SINIC(s) && s.iso3 === 'JPN' });
L('sn2-manga-shelf', 10, 30, 13, '漫画店/便利店的书架——「人生的一半答案在漫画里，另一半在综艺里」。', { hap: 2, know: 1, money: -30 }, null, { cond: s => SINIC(s) && ['JPN', 'KOR', 'HKG', 'MAC'].includes(s.iso3) });
L('sn2-kpop-audition', 13, 22, 8, '你报名了选秀/练习生面试——「三年练习生合同」摆在你面前，你把笔放下了。', { hap: 1, know: 1, rel: 1 }, null, { cond: s => SINIC(s) && ['KOR', 'JPN', 'HKG'].includes(s.iso3) && s.age <= 22 });
L('sn2-otaku-room', 12, 30, 10, '你的房间堆着手办和海报——「二次元的墙，三次元的床」。', { hap: 2, know: 1, money: -50 }, null, { cond: s => SINIC(s) && ['JPN', 'KOR', 'HKG'].includes(s.iso3) && s.age <= 30 });
L('sn2-confucius-quiz', 10, 20, 10, '孔诞日/成人礼——「二十岁的成人礼上，市长给你递了一支笔」。', { know: 1, hap: 1, rel: 1 }, null, { cond: s => SINIC(s) && s.inSchool });
L('sn2-office-noma', 24, 50, 10, '加班文化（残业/夜自素）——「下班时间是个建议，不是承诺」。', { money: 150, hp: -2, hap: -1 }, '日韩年均工时长期居 OECD 前列', { cond: s => SINIC(s) && ['JPN', 'KOR'].includes(s.iso3) && s.age >= 24 && s.income > 0 });
L('sn2-gambling-macau', 22, 65, 8, '港澳的赌桌故事——「十个人进场，一个人笑着出来，那个人是荷官」。', { money: -400, hap: -1, know: 1 }, null, { cond: s => SINIC(s) && ['MAC', 'HKG'].includes(s.iso3) && s.age >= 22 });
L('sn2-naadam-festival', 8, 70, 10, '那达慕大会——摔跤、赛马、射箭，「草原的奥运会比现代奥运老八百年」。', { hap: 3, rel: 2, hp: 1 }, '那达慕为蒙古国假日的千年传统', { cond: s => SINIC(s) && s.iso3 === 'MNG' });
L('sn2-dprk-ration', 8, 70, 8, '配给日——「排队的人群里，谁也不知道今天的定量是多少」。', { hp: -1, know: 1, hap: -1 }, null, { cond: s => s.iso3 === 'PRK' });

// ══════════ 中南半岛加密 ══════════
L('sm2-songkran-water', 5, 70, 16, '泼水节（宋干节）——「被泼得越透，新年越湿越顺」。', { hap: 4, rel: 2 }, '宋干节列入 UNESCO 非遗（2023）', { cond: SEAM });
L('sm2-monk-alms', 6, 70, 14, '清晨布施——「和尚走过，你跪下把糯米放进钵里」，这是东南亚的每日仪式。', { rel: 1, hap: 1, know: 1 }, null, { cond: SEAM });
L('sm2-rice-farm-child', 8, 16, 14, '插秧季你逃课下田——「水牛比老师脾气好，但泥巴两者都有」。', { hp: -1, know: 0, money: 30 }, null, { cond: s => SEAM(s) && s.region === '乡村' });
L('sm2-temple-school', 8, 18, 13, '你在寺庙学校读书——「和尚是老师，庙是学校，功德是学费」。', { know: 2, rel: 1, hap: 1 }, null, { cond: s => SEAM(s) && s.inSchool });
L('sm2-tuktuk-ride', 10, 70, 13, '嘟嘟车/双条车的江湖——「开价十块，还价三块，成交价五块，友谊一块」。', { money: -30, hap: 1, know: 1 }, null, { cond: SEAM });
L('sm2-night-market', 12, 70, 13, '夜市——「烤串、芒果糯米饭和砍价」，东南亚人的社交健身房。', { money: -40, hap: 2, rel: 1 }, null, { cond: SEAM });
L('sm2-mekong-ferry', 8, 70, 10, '湄公河渡船——「河的两岸就是两个世界，但渡船十分钟一趟」。', { money: -10, know: 1, hap: 1 }, null, { cond: SEAM });
L('sm2-family-migration', 20, 45, 13, '你去曼谷/胡志明市打工——「寄回家的钱，是村里新房子的一层」。', { money: 500, rel: 1, hap: -1 }, null, { cond: s => SEAM(s) && s.age >= 20 });
L('sm2-water-festival-boat', 15, 60, 10, '送水节龙舟赛——「河上的鼓声一响，全城都到了岸边」。', { hap: 3, rel: 2 }, null, { cond: s => SEAM(s) && ['KHM', 'LAO', 'THA'].includes(s.iso3) });
L('sm2-vietnam-ao-dai', 14, 45, 10, '奥黛/民族服饰日——「白裙子上学的女孩，是越南的国民记忆」。', { hap: 2, rel: 1, know: 1 }, null, { cond: s => SEAM(s) && s.iso3 === 'VNM' });
L('sm2-burmese-tea', 10, 70, 10, '缅甸奶茶铺——「一小杯甜茶，一份 Newspa­per，半天的社交」。', { money: -10, hap: 1, rel: 1 }, null, { cond: s => SEAM(s) && s.iso3 === 'MMR' });
L('sm2-luang-prabang', 18, 70, 8, '琅勃拉邦的清晨——「游客来拍布施，你来卖椰子饼，大家都有光明的未来」。', { money: 80, hap: 1, know: 1 }, null, { cond: s => SEAM(s) && s.iso3 === 'LAO' });
L('sm2-angkor-field-trip', 10, 25, 8, '学校组织去看吴哥窟——「石头上的笑脸看了九百年，看你的时间只有半天」。', { know: 2, hap: 2, money: -20 }, null, { cond: s => SEAM(s) && s.iso3 === 'KHM' && s.inSchool });

// ══════════ 海洋东南亚加密（印尼外）══════════
L('sf2-penang-hawker', 10, 70, 13, '槟城小贩中心——「炒粿条的锅气，是马来西亚的国宝」。', { hp: 1, hap: 2, money: -20 }, null, { cond: s => SEAMAR(s) && s.iso3 === 'MYS' });
L('sf2-hawker-multiracial', 8, 70, 13, '马来邻居、华人同学、印度朋友——「一个学校三种新年，假期比别人多」。', { rel: 2, know: 1, hap: 1 }, null, { cond: s => SEAMAR(s) && s.iso3 === 'MYS' });
L('sf2-ofw-hongkong', 22, 50, 13, '你去香港做家务工（OFW）——「周日在中环的纸板野餐，是菲律宾人的海外客厅」。', { money: 700, rel: 1, hap: -1 }, '菲律宾海外劳工约 200 万人，汇款占 GDP 约 8%', { cond: s => s.iso3 === 'PHL' && s.gender === 'female' && s.age >= 22 });
L('sf2-bahay-family', 5, 70, 13, '菲律宾大家庭——「表兄妹多到记不住，但谁生病全村都知道」。', { rel: 3, hap: 2 }, null, { cond: s => s.iso3 === 'PHL' });
L('sf2-brunei-mosque', 6, 70, 8, '金顶清真寺——「文莱的安静，是石油铺出来的」。', { hap: 1, know: 1, rel: 1 }, null, { cond: s => s.iso3 === 'BRN' });
L('sf2-jeepney-art', 10, 60, 10, '吉普尼（jeepney）涂装——「菲律宾的公共汽车，是流动的美术展」。', { hap: 1, know: 1, money: -10 }, null, { cond: s => s.iso3 === 'PHL' });
L('sf2-typhoon-haiyan', 10, 70, 8, '超强台风过境——「房子没了可以重建，村里少了的那几户，再也回不来」。', { hp: -2, hap: -3, rel: 2 }, '2013 年海燕台风致 6000+ 人遇难', { cond: s => s.iso3 === 'PHL' });
L('sf2-timorese-craft', 12, 60, 8, '你学传统编织（tais）——「一匹布要一个月，机器不懂这种耐心」。', { know: 2, money: 60, rel: 1 }, null, { cond: s => s.iso3 === 'TLS' });
L('sf2-singapore-tuition', 10, 20, 13, '新加坡的补习链——「小学就开始分流，家长比你先焦虑」。', { know: 3, hap: -1, money: -250 }, '新加坡私教育产业规模居全球前列', { cond: s => s.iso3 === 'SGP' && s.inSchool });

// ══════════ 印度教圈加密（尼泊尔/不丹/斯里兰卡）══════════
L('si2b-pashupatinath', 10, 70, 10, '帕斯帕提那神庙的火葬河坛——「生死在河边并行」，你第一次看懂了「无常」。', { know: 2, hap: -1, rel: 1 }, null, { cond: s => INDIC(s) && s.iso3 === 'NPL' });
L('si2b-sherpa-trek', 15, 60, 10, '你做了背夫/向导——「外国人花钱来喘不上气，你靠这个养全家」。', { money: 300, hp: -1, know: 1 }, null, { cond: s => INDIC(s) && s.iso3 === 'NPL' && s.region === '乡村' });
L('si2b-gurung-village', 8, 70, 10, '廊尔喀村庄的征兵传统——「当廓尔喀兵，是几代人的荣耀通道」。', { money: 500, rel: 1, hap: 1 }, '廓尔喀雇佣兵传统超过 200 年', { cond: s => s.iso3 === 'NPL' && s.gender === 'male' && s.age >= 18 });
L('si2b-bhutan-gnh', 15, 70, 10, '不丹的「国民幸福总值」——「GDP 买不到的东西，这里写进了宪法」。', { hap: 2, know: 2, rel: 1 }, '不丹以 GNH 替代 GDP 作为发展核心指标', { cond: s => s.iso3 === 'BTN' });
L('si2b-bhutan-gho', 6, 70, 8, '全民穿「帼」（袍服）上学上班——「穿西装上班不算正式，穿袍子才算」。', { hap: 1, know: 1, rel: 1 }, null, { cond: s => s.iso3 === 'BTN' });
L('si2b-ceylon-tea', 12, 65, 10, '锡兰茶园的清晨——「采茶女的手速决定全家的饭桌」。', { money: 150, hp: -1, know: 1 }, '斯里兰卡茶叶出口为其支柱产业', { cond: s => s.iso3 === 'LKA' && s.region === '乡村' });
L('si2b-kandy-perahera', 10, 70, 10, '康提佛牙节——「大象披着灯饰走夜路，全城的鼓声不许停」。', { hap: 3, rel: 2, know: 1 }, null, { cond: s => s.iso3 === 'LKA' });
L('si2b-civil-war-memory', 25, 80, 8, '内战那几年——「有些村子的名字，说出来全家都沉默」。', { hap: -2, rel: 2, know: 1 }, '斯里兰卡内战 1983-2009', { cond: s => s.iso3 === 'LKA' && s.age >= 25 });
L('si2b-nepali-dashain', 5, 70, 13, '德赛节——「长辈在额头点提卡，你收到红包和一只山羊腿」。', { hap: 3, rel: 2, money: 100 }, null, { cond: s => INDIC(s) && s.iso3 === 'NPL' });

// ══════════ 南亚伊斯兰加密（孟加拉/马尔代夫）══════════
L('si2c-pohela-boishakh', 5, 70, 13, '孟加拉新年（Pohela Boishakh）——「红白纱丽的游行队伍，是达卡最美的一天」。', { hap: 3, rel: 2, know: 1 }, null, { cond: s => SASISLAM(s) && s.iso3 === 'BGD' });
L('si2c-rickshaw-puller', 18, 60, 10, '你蹬三轮车养家——「一天十小时，膝盖是消耗品，孩子是存款」。', { money: 180, hp: -2, hap: 0, know: 0 }, null, { cond: s => SASISLAM(s) && s.iso3 === 'BGD' && s.gender === 'male' && s.age >= 18 });
L('si2c-madrasa-girl', 8, 18, 10, '妹妹们也去 madrasa 了——「上一代不让，这一代非让不可」，你在旁边看着时代转弯。', { know: 2, rel: 1, hap: 1 }, '孟加拉女童入学率近 20 年大幅提升', { cond: s => SASISLAM(s) && s.iso3 === 'BGD' });
L('si2c-rohingya-camp', 20, 70, 8, '考克斯巴扎的难民营在你隔壁——「一百万人住在你的国家的边上，无国无籍」。', { know: 1, rel: 1, hap: -1 }, '孟加拉收容罗兴亚难民约 100 万人', { cond: s => s.iso3 === 'BGD' && s.age >= 20 });
L('si2c-maldives-resort', 20, 60, 10, '你在度假岛打工——「游客眼里的天堂，是你通勤两小时的上班地点」。', { money: 500, know: 1, rel: -1 }, null, { cond: s => s.iso3 === 'MDV' && s.age >= 20 });
