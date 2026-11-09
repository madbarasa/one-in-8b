// 中东四文化圈加密批 v0.7.0：~110 条

export const CUL_MIDEAST2 = [];
const L = (id, minAge, maxAge, weight, text, effect, source, extra) =>
  CUL_MIDEAST2.push({ id, type: 'log', minAge, maxAge, weight, text, effect: effect || {}, source, ...(extra || {}) });
const MAGHREB = s => s.culture === 'maghreb';
const ARAB = s => s.culture === 'arab-core';
const PERSIA = s => s.culture === 'persia';
const TURKIC = s => s.culture === 'turkic-caucasus';

// ══════════ 马格里布加密 ══════════
L('mg2-harira-ramadan', 5, 70, 14, '斋月的哈利拉汤——落日炮一响，整条街的餐桌同时开动。', { hp: 1, rel: 2, hap: 2 }, null, { cond: MAGHREB });
L('mg2-caftan-wedding', 25, 45, 13, '婚礼上你换三套卡夫坦——金线的重量就是祝福的重量。', { money: -700, hap: 3, rel: 3 }, null, { cond: s => MAGHREB(s) && s.age >= 25 });
L('mg2-tagine-clay', 8, 70, 13, '塔吉锅的圆盖从来不漏气——「蒸汽循环回来，就像家人的话」。', { hp: 1, rel: 1, know: 1 }, null, { cond: MAGHREB });
L('mg2-argan-women', 15, 60, 10, '阿甘油合作社的女人排成一排砸坚果——你的工资第一次让婆婆沉默了。', { money: 200, rel: 1, know: 1 }, '阿甘油产业为摩洛哥西南部女性主要收入', { cond: s => MAGHREB(s) && s.iso3 === 'MAR' && s.gender === 'female' && s.age >= 15 });
L('mg2-desert-couscous', 10, 70, 10, '沙丘边的宴席——游牧表亲的骆驼队来了，全村的锅都端了出来。', { rel: 2, hap: 2, know: 1 }, null, { cond: MAGHREB });
L('mg2-derb-narrow', 6, 18, 10, '巷子窄到晾衣杆能横跨两侧——你的童年是在「头顶的天空一条线」里跑大的。', { hap: 2, know: 1, rel: 1 }, null, { cond: MAGHREB });
L('mg2-francophone-job', 20, 45, 10, '你进了法企的客服中心——法语口音决定你的时薪，这是马格里布的职场潜规则。', { money: 300, know: 2, hap: 0 }, null, { cond: s => MAGHREB(s) && s.know > 55 && s.age >= 20 });
L('mg2-marrakech-market', 10, 65, 10, '杰马夫纳广场的夜市——耍蛇人、橙汁摊和讲故事的人，你的周末娱乐全齐。', { hap: 2, know: 1, money: -30 }, null, { cond: s => MAGHREB(s) && s.iso3 === 'MAR' });
L('mg2-migration-boat', 18, 40, 8, '有人劝你「坐船去欧洲」——你看着地中海，想了很久，还是留下来修好了摩托车。', { know: 1, hap: 1, rel: 1 }, null, { cond: s => MAGHREB(s) && s.age >= 18 && s.wealthIdx <= 2 });
L('mg2-babouches-craft', 12, 60, 10, '你学做巴布什皮鞋——一针一线的手艺，在机器时代反而成了奢侈品。', { know: 2, money: 100, rel: 1 }, null, { cond: MAGHREB });

// ══════════ 阿拉伯核心加密 ══════════
L('ab2-hajj-family', 45, 80, 10, '全家攒了半辈子的钱，送你完成朝觐——白布缠身的时刻，你和两百万人一起站着。', { hap: 5, know: 2, money: -1000 }, '朝觐每年吸引约 250 万人', { cond: s => ARAB(s) && s.religion === '伊斯兰教' && s.age >= 45 });
L('ab2-umrah-young', 10, 30, 10, '小朝（副朝）第一次——你在麦地那的夜里睡在礼拜殿外的毯子上。', { hap: 3, know: 1, rel: 1 }, null, { cond: s => ARAB(s) && s.religion === '伊斯兰教' });
L('ab2-karak-tea', 8, 70, 14, '袋装红茶加三勺糖——「阿拉伯甜度」是待客的诚意刻度。', { hap: 1, rel: 1, hp: -1 }, null, { cond: ARAB });
L('ab2-shisha-evening', 18, 50, 13, '水烟馆的夜晚——薄荷双苹果味，聊到半夜，账单AA。', { hap: 2, rel: 2, hp: -2 }, null, { cond: s => ARAB(s) && s.gender === 'male' && s.age >= 18 });
L('ab2-cairo-traffic', 18, 65, 10, '开罗的早高峰——「喇叭是这座城的方言」，你的通勤是一场谈判。', { hp: -1, know: 1, hap: 0 }, null, { cond: s => ARAB(s) && s.iso3 === 'EGY' && s.region === '城市' && s.age >= 18 });
L('ab2-falafel-morning', 5, 70, 14, '早上的炸豆丸子（falafel）配芝麻酱——「醒来闻到那个味，就知道今天还能过」。', { hp: 1, hap: 2, money: -10 }, null, { cond: ARAB });
L('ab2-arabic-calligraphy', 8, 25, 10, '你学了书法——「一笔一划都有呼吸」，你的字被裱起来挂在客厅。', { know: 2, hap: 2 }, null, { cond: ARAB });
L('ab2-dubai-dream', 20, 40, 13, '你去迪拜/利雅得打工——「高工资、高物价、回不去的假期」，攒钱是唯一的信仰。', { money: 900, rel: -1, hp: -1, know: 1 }, '海湾六国侨民占比约 70%', { cond: s => ARAB(s) && ['EGY', 'JOR', 'YEM', 'SYR', 'IRQ', 'PSE'].includes(s.iso3) && s.age >= 20 });
L('ab2-family-names', 6, 20, 10, '你的全名报出来要三十秒——「本（某某之子）」的链子能拉到曾曾祖。', { know: 1, rel: 2, hap: 0 }, null, { cond: ARAB });
L('ab2-kanafeh-night', 8, 70, 13, '深夜的库纳法（甜奶酪酥）——「甜品是阿拉伯人的第二语言」。', { hap: 2, money: -20, hp: -1 }, null, { cond: ARAB });
L('ab2-school-arabic-english', 8, 20, 13, '学校里阿拉伯语、英语、法语三门课——「会三国语言」在这里是标配不是特长。', { know: 3, hap: -1 }, null, { cond: s => ARAB(s) && ['LBN', 'EGY', 'JOR', 'SYR'].includes(s.iso3) && s.inSchool });
L('ab2-wedding-zaffa', 26, 45, 13, '婚礼的 Zaffa 队伍——鼓手开路、新娘在中间，全城都知道你结婚了。', { money: -900, hap: 4, rel: 3 }, null, { cond: s => ARAB(s) && s.age >= 26 });
L('ab2-beirut-cafe', 20, 60, 10, '贝鲁特的咖啡馆文化——诗人、政客和学生挤在一张桌上吵文学。', { hap: 2, know: 2, rel: 1 }, null, { cond: s => ARAB(s) && s.iso3 === 'LBN' && s.age >= 20 });
L('ab2-refugee-cousin', 15, 50, 10, '表亲一家从战区搬来——你家多了四张吃饭的嘴，也多了一屋子故事。', { rel: 2, money: -200, know: 1 }, null, { cond: s => ARAB(s) && s.age >= 15 });
L('ab2-oasis-date', 10, 60, 10, '椰枣收获季——「一棵椰枣树的高度，就是一年的甜度」。', { money: 150, hp: -1, know: 1 }, null, { cond: s => ARAB(s) && ['EGY', 'SAU', 'IRQ', 'OMN'].includes(s.iso3) && s.region === '乡村' });
L('ab2-futr-football', 10, 25, 13, '街头足球（futbol salona）——「齐达内是北非移民的儿子」，你信这个。', { hp: 2, hap: 2, rel: 2 }, null, { cond: s => ARAB(s) && s.age <= 25 });
L('ab2-arabic-drama', 15, 70, 10, '斋月的「电视剧大战」——三十集连播，全家每天晚上准时蹲守。', { hap: 2, rel: 2, know: 1 }, '斋月为阿拉伯影视收视最高峰', { cond: ARAB });
L('ab2-khat-al-jami', 20, 70, 8, '你资助了老家的清真寺翻新——「功德碑上刻了你的名字」。', { money: -400, hap: 2, rel: 2 }, null, { cond: s => ARAB(s) && s.religion === '伊斯兰教' && s.age >= 35 });
L('ab2-nile-boat', 10, 60, 8, '尼罗河上的 Felucca 三桅小帆船——「风来了，整个城的节奏都慢了」。', { hap: 2, know: 1 }, null, { cond: s => ARAB(s) && s.iso3 === 'EGY' });

// ══════════ 波斯圈加密 ══════════
L('pe2-nowruz-haftsin', 5, 80, 16, '诺鲁孜节的 Haft-Sin 七鲜桌——金鱼、青麦苗和镜子，新年从春分开始。', { hap: 4, rel: 3 }, '诺鲁孜节列入 UNESCO 非遗', { cond: PERSIA });
L('pe2-poetry-hafez', 12, 80, 14, '哈菲兹诗集在每家客厅都有——「大事不决，翻开一页」，这叫 fal-e-Hafez。', { know: 2, hap: 2 }, '哈菲兹为波斯诗歌最高峰，家家户户藏诗集', { cond: PERSIA });
L('pe2-chelo-kabab', 8, 70, 13, '藏红花米饭配烤肉串（chelo kabab）——「周五的家庭聚餐是波斯历法的一部分」。', { hp: 1, hap: 2, rel: 2 }, null, { cond: PERSIA });
L('pe2-tarosh-university', 17, 25, 13, '高考（konkur）出分那夜——「波斯数学家的儿子也睡不着」。', { know: 2, hap: -2 }, null, { cond: s => PERSIA(s) && s.inSchool && s.age >= 17 });
L('pe2-bazaar-apprentice', 16, 30, 13, '你在巴扎学做生意——「巴扎是伊朗的另一半政府」，长辈这样教你。', { money: 250, know: 2, rel: 2 }, null, { cond: s => PERSIA(s) && s.age >= 16 });
L('pe2-saffron-harvest', 10, 60, 10, '藏红花收获季——清晨四点采花，「一克藏红花，一百五十朵花」。', { money: 200, hp: -1, know: 1 }, '伊朗供应全球 90% 藏红花', { cond: s => PERSIA(s) && s.iso3 === 'IRN' && s.region === '乡村' });
L('pe2-sanctions-saving', 25, 70, 10, '制裁年——「钱一夜之间缩水一半」，你学会了黄金和美元并存的家庭理财。', { money: -300, know: 2, hap: -1 }, null, { cond: s => PERSIA(s) && s.iso3 === 'IRN' && s.age >= 25 });
L('pe2-hijab-choice', 15, 30, 10, '头巾的松紧——你在这件事上做过多少次「个人谈判」，只有你自己知道。', { hap: -1, know: 1, rel: 1 }, null, { cond: s => PERSIA(s) && s.gender === 'female' && s.age >= 15 });
L('pe2-teahouse-qalyan', 18, 70, 10, '老茶馆的水烟和说书人——「伊朗的故事，一半在茶里」。', { hap: 2, rel: 1, hp: -1 }, null, { cond: s => PERSIA(s) && s.age >= 18 });
L('pe2-afghan-cousin', 20, 60, 10, '从阿富汗来的表亲——「战争把亲戚变成了邻居」。', { rel: 2, know: 1, money: -150 }, null, { cond: s => PERSIA(s) && s.age >= 20 });
L('pe2-taqsim-daf', 10, 40, 10, '你学了达夫鼓——「节奏是波斯的另一种语法」。', { hap: 2, know: 1, rel: 1 }, null, { cond: PERSIA });

// ══════════ 突厥-高加索加密 ══════════
L('tk2b-simit-morning', 6, 70, 14, '清晨的芝麻圈面包（simit）配茶——「土耳其的早餐比很多国家的国宴丰盛」。', { hp: 1, hap: 2, money: -15 }, null, { cond: s => TURKIC(s) && s.iso3 === 'TUR' });
L('tk2b-cauldron-plov', 8, 70, 13, '结婚/割礼/葬礼都吃抓饭——「大锅翻搅的声音，就是中亚的社区心跳」。', { rel: 2, hap: 2, hp: 1 }, null, { cond: s => TURKIC(s) && ['UZB', 'KGZ', 'TKM'].includes(s.iso3) });
L('tk2b-khash-winter', 16, 70, 10, '冬天的 Khash（牛蹄汤）——「解酒、暖身、修兄弟情」，一锅三用。', { hp: 1, rel: 2, hap: 1 }, null, { cond: s => TURKIC(s) && ['ARM', 'GEO'].includes(s.iso3) });
L('tk2b-duduk-sound', 10, 70, 10, '杜杜克笛的声音——「亚美尼亚的忧伤，全在这根杏木管里」。', { hap: 1, know: 2, rel: 1 }, '杜杜克列入 UNESCO 非遗', { cond: s => TURKIC(s) && s.iso3 === 'ARM' });
L('tk2b-grape-vineyard', 12, 70, 10, '格鲁吉亚的 Qvevri 陶罐酿酒——「八千年了，酿造方式没变过」。', { know: 2, hap: 1, money: -40 }, '格鲁吉亚陶罐酿酒法为人类非遗（8000 年历史）', { cond: s => TURKIC(s) && s.iso3 === 'GEO' });
L('tk2b-russian-returnee', 22, 60, 10, '在俄罗斯打工的邻居回来了——带回来的不止钱，还有一顿俄式抱怨。', { rel: 1, know: 1, money: 100 }, null, { cond: s => TURKIC(s) && s.age >= 22 });
L('tk2b-circassian-dance', 10, 30, 10, '高加索刀舞——「脚跟敲地板的速度，是部落荣誉的计量单位」。', { hp: 1, hap: 2, rel: 2 }, null, { cond: TURKIC });
L('tk2b-azeri-tea-pear', 8, 70, 10, '茶配梨形糖块——「咬着糖喝茶，甜味自己会调」。', { hap: 1, rel: 2 }, null, { cond: s => TURKIC(s) && s.iso3 === 'AZE' });
L('tk2b-shepherd-summer', 10, 60, 10, '夏天随羊群上山牧场（yayla）——「搬家三次，等于过三个季节」。', { hp: 1, know: 1, hap: 2 }, null, { cond: s => TURKIC(s) && s.region === '乡村' });
L('tk2b-football-national', 12, 40, 10, '国家队比赛日——「九十分钟里，整个国家是同一个心跳」。', { hap: 3, rel: 2, hp: 1 }, null, { cond: s => TURKIC(s) && s.age <= 40 });
