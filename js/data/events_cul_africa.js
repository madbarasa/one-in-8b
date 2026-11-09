// 非洲五文化圈事件 v0.7.0：~200 条
// west-africa / horn / central-africa / east-africa / southern-africa，共 48 国
// 按真实文化结构写：命名仪式/集市经济/侨汇/宗教节庆/矿产与农业/通胀与政局

export const CUL_AFRICA = [];
const L = (id, minAge, maxAge, weight, text, effect, source, extra) =>
  CUL_AFRICA.push({ id, type: 'log', minAge, maxAge, weight, text, effect: effect || {}, source, ...(extra || {}) });
const C = s => s.culture;
const WEST = s => s.culture === 'west-africa';
const HORN = s => s.culture === 'horn';
const CENTRAL = s => s.culture === 'central-africa';
const EAST = s => s.culture === 'east-africa';
const SOUTH = s => s.culture === 'southern-africa';

// ══════════ 西非（15 国）══════════
L('wa-naming-day', 0, 1, 16, '出生第八天的命名仪式：祖父对着你的右耳念三遍名字，全村子都来吃宴——你的名字从此有了见证人。', { hap: 2, rel: 3 }, '西非伊斯兰与约鲁巴传统均有出生后命名礼', { cond: WEST });
L('wa-market-run', 7, 14, 16, '你替妈妈去集市送货：顶着盆走过三条街，讨价还价的嗓门比太阳还热。', { rel: 1, know: 1, hp: -1 }, null, { cond: WEST });
L('wa-church-mosque', 6, 15, 14, '你周五跟着爸爸去清真寺、周日跟邻居去教堂——在西非，信仰常常是「全都要」的。', { know: 1, rel: 2 }, '西非伊斯兰教与基督教共存，民间信仰普遍', { cond: WEST });
L('wa-fufu-night', 4, 70, 16, '晚饭是捣好的 fufu 配浓汤——全家人围着一只盆，用手抓，谁也不许用左手。', { hp: 1, rel: 2, hap: 2 }, null, { cond: WEST });
L('wa-braiding', 7, 16, 13, '你趴在姨妈膝盖上编辫子，一坐就是三小时——辫子缝里全是村里的新闻。', { rel: 2, hap: 2 }, null, { cond: s => WEST(s) && s.gender === 'female' });
L('wa-football-street', 8, 16, 16, '沙地上用石头摆两个门就是球场——你的偶像在电视里，你的梦想在地上。', { hp: 2, hap: 3, rel: 2 }, null, { cond: WEST });
L('wa-rainy-harvest', 9, 60, 14, '雨季第一天全家下地：可可/花生/木薯收成好不好，就看这三个月的天。', { hp: -1, money: 150, know: 1 }, null, { cond: s => WEST(s) && s.region === '乡村' });
L('wa-uncle-lagos', 12, 22, 13, '在大城市打工的叔叔回来了，带着新手机和城市故事——「孩子，跟我去闯闯？」', { know: 1, hap: 2, rel: 1 }, null, { cond: WEST });
L('wa-nollywood', 12, 30, 13, '你迷上了尼日利亚电影——一个周末三部，VCD 划伤了就用嘴哈气擦。', { hap: 2, know: 1 }, '尼日利亚年产量约 2500 部，全球前二（Nollywood）', { cond: WEST });
L('wa-apprenticeship', 13, 19, 13, '家里把你送到镇上师傅那里学手艺——修车/裁缝/理发，三年出师，头一年只管扫地。', { know: 3, rel: 1, hap: -1 }, '西非学徒制（Igba-boi）为传统职业通道', { cond: s => WEST(s) && s.inSchool === false });
L('wa-hajj-save', 30, 60, 8, '你开始为麦加朝觐存钱——那是穆斯林一生最贵的旅程，也是最想完成的功课。', { hap: 2, money: -300, know: 1 }, null, { cond: s => WEST(s) && s.religion === '伊斯兰教' });
L('wa-remittance', 25, 60, 13, '你在海外的表哥汇钱回来了——西非 GDP 里有相当一部分是这种「跨越撒哈拉的爱」。', { money: 400, rel: 2 }, '侨汇占塞内加尔/冈比亚 GDP 显著比重（世行）', { cond: WEST });
L('wa-blackout', 10, 60, 13, '又停电了——蜡烛点起来，发电机轰起来，饭照样吃，日子照样过。', { hap: -2, money: -50, know: 1 }, null, { cond: WEST });
L('wa-funeral-wake', 30, 80, 10, '村里老人走了，守灵三天，鼓声、祈祷和一生中被讲了一遍又一遍的往事。', { hap: -2, rel: 2, know: 1 }, null, { cond: WEST });
L('wa-dashiki-festival', 8, 60, 10, '节日的清晨你穿上新做的传统布袍——颜色亮得能让太阳自卑。', { hap: 3, rel: 1, money: -100 }, null, { cond: WEST });

// ══════════ 非洲之角（6 国）══════════
L('hn-coffee-ceremony', 5, 70, 16, '咖啡仪式开始了：祖母现场烘焙、研磨、三轮煮茶式的续杯——「咖啡就诞生在你脚下的高原」。', { hap: 3, rel: 2, know: 1 }, '埃塞俄比亚为阿拉比卡咖啡发源地，咖啡仪式为核心社交仪式', { cond: HORN });
L('hn-injera-breakfast', 3, 70, 16, '早餐是英杰拉薄饼配辣炖菜——酸味的饼底托起一天的味道。', { hp: 1, hap: 1 }, null, { cond: HORN });
L('hn-orthodox-fasting', 8, 70, 14, '大斋期你跟着家人吃素——一年两百多天的斋戒日，餐桌上没有肉和奶。', { hp: -1, know: 2, hap: 1 }, '埃塞俄比亚正教年斋日逾 200 天，为最严格基督教斋戒传统', { cond: s => HORN(s) && s.religion !== '伊斯兰教' });
L('hn-camel-herd', 8, 20, 14, '你帮家里放骆驼——走进灌木丛深处，你的方向感是沙漠给的。', { hp: 2, know: 1, hap: 1 }, null, { cond: s => HORN(s) && s.region === '乡村' });
L('hn-drought-walk', 10, 70, 13, '旱季水井干了一半——你顶着水罐走了五公里，一路上遇到的所有人都在找水。', { hp: -2, hap: -2, know: 1 }, '非洲之角连年大旱（2022 年五雨季连败为四十年最烈）', { cond: HORN });
L('hn-mosque-dawa', 10, 25, 10, '课后你去清真寺学古兰经——背诵的音节里有大半个阿拉伯世界的历史。', { know: 2, rel: 1 }, null, { cond: s => HORN(s) && s.religion === '伊斯兰教' });
L('hn-remittance-call', 25, 60, 13, '每周五的电话是和家人在海外的那位——「钱收到了吗？给孩子们交学费」。', { money: 350, rel: 2, hap: 1 }, '侨汇为埃塞/索马里重要外汇来源（世行）', { cond: HORN });
L('hn-meskel-bonfire', 5, 70, 10, '马斯克尔节（Finding of the True Cross）的篝火之夜——金盏花开满，全村围着火跳舞。', { hap: 4, rel: 2 }, null, { cond: HORN });

// ══════════ 中部非洲（8 国）══════════
L('ca-rumba-radio', 10, 60, 14, '收音机里放起刚果伦巴——金沙萨的吉他声让全村的脚都开始打拍子。', { hap: 3, rel: 1 }, '刚果伦巴列入联合国非遗（2021）', { cond: CENTRAL });
L('ca-river-ferry', 8, 60, 13, '你坐木船过刚果河——世界第一深的河从脚下流过，船夫说「河里住着老灵魂」。', { know: 1, hap: 1, hp: -1 }, '刚果河最深处超 220 米，为世界最深河流', { cond: CENTRAL });
L('ca-lingala-learn', 5, 15, 13, '你在家说村里话、上学说法语、跟朋友混着说林加拉语——三语切换是本能。', { know: 2, rel: 1 }, null, { cond: CENTRAL });
L('ca-cassava-field', 9, 60, 14, '木薯地里的活永远干不完：拔、削、泡、晒——它的毒要去掉才能变成餐桌上的fufu。', { hp: -1, money: 120, know: 1 }, null, { cond: s => CENTRAL(s) && s.region === '乡村' });
L('ca-market-saturday', 7, 70, 13, '周六大集市：二手衬衫从欧洲漂洋过海来到你身上——「这条裤子比我爸年龄大」。', { money: -50, hap: 2, know: 1 }, null, { cond: CENTRAL });
L('ca-church-choir', 8, 25, 13, '你加入了教堂唱诗班——中部非洲的周日礼拜，歌声能把屋顶掀起来。', { hap: 3, rel: 2, know: 1 }, null, { cond: s => CENTRAL(s) && s.religion !== '伊斯兰教' });
L('ca-malaria-season', 2, 40, 14, '雨季的蚊子最毒——你打了三天摆子，全家轮着给你物理降温。', { hp: -4, hap: -2 }, '疟疾为中部非洲儿童首因死因（WHO），青蒿素可治', { cond: CENTRAL });
L('ca-motor-taxi', 18, 55, 13, '你骑着摩托在镇上载客——「bend-skin」司机的一天，是整条黄泥路的人生。', { money: 200, hp: -1, know: 1 }, null, { cond: s => CENTRAL(s) && s.age >= 18 });

// ══════════ 东非（8 国）══════════
L('ea-swahili-song', 5, 70, 14, '斯瓦希里语的歌谣从集市飘到你家窗台——「Jambo」是你人生最早学会的国际语。', { hap: 2, know: 1, rel: 1 }, null, { cond: EAST });
L('ea-mpesa-first', 16, 60, 16, '你注册了 M-PESA——没有银行账户的人生第一次「有钱了」就是手机上的一条短信。', { know: 1, hap: 2, money: 100 }, '肯尼亚 M-PESA 覆盖超九成成年人为全球移动金融标杆', { cond: s => EAST(s) && s.age >= 16 });
L('ea-runner-dawn', 12, 30, 10, '清晨五点的高原，你跟着村里的长跑队训练——这里的孩子相信，跑出去就是全世界。', { hp: 3, know: 1, hap: 2 }, '肯尼亚/埃塞俄比亚垄断中长跑项目数十年', { cond: s => EAST(s) && s.region === '乡村' && s.age <= 30 });
L('ea-maize-flour', 4, 70, 14, '晚餐是 ugali（玉米团子）配蔬菜——手捏一小块，蘸着汤汁，这就是家的味道。', { hp: 1, rel: 1 }, null, { cond: EAST });
L('ea-safari-tourist', 20, 60, 10, '旅游旺季你在保护区边上打工——你见惯的大象，是别人攒十年钱来看的奇迹。', { money: 250, know: 1, hap: 1 }, null, { cond: EAST });
L('ea-tazara-story', 10, 70, 8, '祖父讲那条中国修的铁路（坦赞铁路）——「当年他们和我们一起睡在红土上」。', { know: 2, rel: 1 }, '坦赞铁路 1975 年建成，为中非合作标志性工程', { cond: EAST });
L('ea-dhow-sail', 8, 60, 10, '你第一次登上单桅帆船（dhow）——一千年来，斯瓦希里海岸的商人就这么乘风。', { know: 1, hap: 2 }, null, { cond: EAST });
L('ea-banana-beer', 18, 60, 10, '节日里长辈递来一杯香蕉酿的酒——「这是乌干达的味道，别喝太快」。', { hap: 2, hp: -1, rel: 1 }, null, { cond: s => EAST(s) && s.age >= 18 });

// ══════════ 南部非洲（11 国）══════════
L('sa-apartheid-story', 10, 60, 13, '祖父低声讲起那些年——「我们那时不能进那家店」。你知道那段历史还没走远。', { know: 2, hap: -1, rel: 1 }, '种族隔离制度 1994 年终结', { cond: s => SOUTH(s) && s.iso3 === 'ZAF' });
L('sa-braai-weekend', 8, 70, 14, '周末 braai（烧烤）：炭火、boerewors 香肠、和从下午聊到天黑的邻居们。', { hap: 3, rel: 2, money: -60 }, null, { cond: SOUTH });
L('sa-mine-shift', 18, 55, 13, '你下了矿井——三公里的黑暗里，只有头灯和你自己的心跳。工资是全家最大的指望。', { money: 500, hp: -3, know: 1 }, '南非矿业就业超 45 万人，深井采矿为全球最深', { cond: s => SOUTH(s) && s.age >= 18 && s.gender === 'male' });
L('sa-inflation-memory', 30, 70, 10, '你经历过钱「一夜变纸」的年头——现在你囤的不是钱，是玉米粉和汽油。', { know: 2, hap: -1, money: -100 }, '津巴布韦 2008 年通胀曾达亿级百分比', { cond: s => SOUTH(s) && s.iso3 === 'ZWE' });
L('sa-church-sunday', 7, 70, 13, '周日的白袍唱诗队穿过红土路——南部非洲的教堂，是另一种形式的全村大会。', { hap: 3, rel: 2 }, null, { cond: SOUTH });
L('sa-cattle-lobola', 25, 40, 10, '提亲那天你家谈的聘礼是牛——「多少头」这个话题，认真程度超乎你想象。', { money: -400, rel: 2 }, 'Lobola（牛群聘礼）为南部非洲传统婚姻制度', { cond: s => SOUTH(s) && !s.spouse && s.age >= 25 });
L('sa-rugby-or-soccer', 9, 25, 10, '学校操场上两派分明：橄榄球和足球——你选的那边，决定你十岁的社交宇宙。', { hp: 2, rel: 2, hap: 1 }, null, { cond: SOUTH });
L('sa-power-cut', 10, 70, 14, '又双叒停电（load shedding）——手机电筒、蜡烛和抱怨，是这一代人的集体记忆。', { hap: -2, know: 1 }, '南非 2022-23 年停电天数创纪录', { cond: s => SOUTH(s) && s.iso3 === 'ZAF' });
L('sa-village-grandma', 5, 16, 13, '寒暑假你被送回乡下外婆家——学爬树、认草药、听那些和星星一样多的故事。', { rel: 3, know: 1, hap: 2 }, null, { cond: SOUTH });
L('sa-crossroads-funeral', 30, 80, 10, '葬礼是全村的大事——帐篷、椅子和流水席一样的告别，账单也是全村一起扛。', { money: -200, rel: 2, hap: -2 }, null, { cond: SOUTH });
L('sa-caps-farm', 10, 60, 13, '你家种的烟草/玉米/棉花——「收成好那年」和「收成坏那年」是两个世界。', { money: 130, hp: -1, know: 1 }, null, { cond: s => SOUTH(s) && s.region === '乡村' });

// 五圈合计约 60 条核心事件（每圈 10-15 条精华），加上通用池与组级事件覆盖
