// 中国城乡深度事件线 v0.5.0：~250 条
// 覆盖童年求学/中学/大学求职/职场/婚恋家庭/财务房产/健康养老/时代地域
// 时代事件按「人生阶段」触发（2026 年出生的人生在 AI 基础设施、老龄化与延迟退休并存的时代）

export const DEEP_CN = [];
const L = (id, minAge, maxAge, weight, text, effect, source, extra) =>
  DEEP_CN.push({ id, type: 'log', minAge, maxAge, weight, text, effect: effect || {}, source, ...(extra || {}) });
const CN = s => s.country === 'china';

// ══════════ 童年求学 ══════════
L('cn-kindergarten-lottery', 2, 3, 8, '为了一个公立幼儿园名额，全家凌晨四点排队摇号——你还在被窝里睡觉。', { hap: 0, rel: 1 }, '一线城市公办园入园竞争激烈（教育部数据）', { cond: CN });
L('cn-xuequfang', 4, 6, 6, '为了学区房，家里把老房子挂了出去，父亲说「再苦不能苦教育」。', { know: 2, hap: -1 }, null, { cond: s => CN(s) && s.wealthIdx >= 2 });
L('cn-honglingjin', 6, 7, 10, '你戴上了红领巾，对着国旗举了手。回家路上你一直没舍得摘。', { hap: 3, know: 1 }, null, { cond: s => CN(s) && s.inSchool });
L('cn-sanhaosheng', 8, 13, 6, '你评上了「三好学生」，奖状贴在了客厅最显眼的墙上。', { know: 3, hap: 4 }, null, { cond: s => CN(s) && s.inSchool && s.know > 65 });
L('cn-parents-group', 7, 15, 8, '家长群凌晨还在响，老师在群里@了你妈——你没完成的手工成了话题。', { hap: -2, know: 0 }, null, { cond: s => CN(s) && s.inSchool });
L('cn-aoshu', 9, 13, 7, '你被送去学奥数，鸡兔同笼算得头昏眼花，但解题时确实有点上瘾。', { know: 4, hap: -1 }, null, { cond: s => CN(s) && s.inSchool && s.know > 60 });
L('cn-xiaoshengchu', 11, 12, 9, '小升初的简历做成了精装册，特长一栏母亲给你填了三行。', { know: 1, hap: -1 }, null, { cond: s => CN(s) && s.inSchool });
L('cn-hobby-class', 6, 12, 8, '周六你辗转于书法班和英语班之间，路上的面包就是午饭。', { know: 3, hap: -2 }, null, { cond: s => CN(s) && s.inSchool });
L('cn-oral-exam', 10, 15, 7, '英语口语考试，你背得滚瓜烂熟的自我介绍，到了考场却卡了壳。', { know: 1, hap: -1 }, null, { cond: s => CN(s) && s.inSchool });
L('cn-mid-autumn', 5, 16, 7, '中秋全家分一块月饼，五仁馅的，父亲说「这是传统」。', { hap: 3, rel: 2 }, null, { cond: CN });
L('cn-spring-festival-kid', 4, 14, 10, '过年你收了一沓压岁钱，母亲说「妈先帮你存着」——这一存就没见过。', { hap: 4, rel: 2, money: 100 }, null, { cond: CN });
L('cn-heat-summer', 3, 15, 7, '三伏天没有空调，你睡在竹席上，外婆用蒲扇给你扇了一整夜。', { hp: -1, rel: 2 }, null, { cond: s => CN(s) && s.region === '乡村' });
L('cn-snow-city', 3, 15, 6, '下雪了，全城的孩子都涌向广场，你的雪人被保安善意地留下了。', { hap: 4, hp: 1 }, null, { cond: s => CN(s) && s.region === '城市' });
L('cn-train-hardseat', 5, 16, 6, '你跟父母坐绿皮火车回老家，硬座坐了一夜，下车时腿都麻了。', { hap: 1, rel: 2 }, null, { cond: CN });
L('cn-village-radio', 5, 15, 6, '村口大喇叭喊你去领免费的营养午餐鸡蛋，你拎着小跑回了家。', { hp: 2, hap: 2 }, null, { cond: s => CN(s) && s.region === '乡村' });
L('cn-town-market', 6, 16, 7, '镇上赶集，你帮家里卖了一上午菜，学会了看秤和找零。', { know: 2, rel: 1, money: 50 }, null, { cond: s => CN(s) && s.region === '乡村' });

// ══════════ 中学 ══════════
L('cn-boarding-school', 13, 17, 9, '你开始住校。第一晚宿舍熄灯后，六个人聊到宿管阿姨来敲门。', { rel: 3, hap: 1, know: -1 }, null, { cond: s => CN(s) && s.inSchool && s.age >= 13 });
L('cn-evening-study', 14, 18, 10, '晚自习到十点，你趴在成堆的卷子里，窗外寄宿楼的灯一排排亮着。', { know: 2, hp: -1 }, null, { cond: s => CN(s) && s.inSchool && s.age >= 14 });
L('cn-monthly-rank', 13, 18, 9, '月考排名贴在教室后墙，你从上往下数，数了三遍才找到自己。', { hap: -2, know: 1 }, null, { cond: s => CN(s) && s.inSchool && s.age >= 13 });
L('cn-love-caught', 14, 17, 5, '你和 TA 的纸条被班主任截获。请家长那天，你们的「地下工作」转入了更深的地下。', { hap: -3, rel: 1 }, null, { cond: s => CN(s) && s.inSchool && s.age >= 14 });
L('cn-internet-cafe', 14, 17, 6, '你和同学翻进网吧打了一下午《英雄联盟》，出门时天都黑了。', { hap: 3, know: -2 }, null, { cond: s => CN(s) && s.inSchool });
L('cn-phone-confiscated', 12, 17, 6, '上课玩手机被没收，班主任说「高考完来取」。它成了你努力的理由之一。', { know: 1, hap: -2 }, null, { cond: s => CN(s) && s.inSchool });
L('cn-repeat-year', 18, 19, 5, '高考成绩差了三分。你决定复读——那一年你把「再来一次」过成了日常。', { know: 5, hap: -3 }, null, { cond: s => CN(s) && s.age >= 18 && s.age <= 19 });
L('cn-volunteer-choice', 18, 18, 8, '填志愿那几天全家开会：计算机、师范、临床医学，每个人的意见都不一样。', { know: 2, hap: -1 }, null, { cond: CN });
L('cn-admission-letter', 18, 19, 12, '录取通知书到了。你爸在小区门口发了整整一条街的烟。', { hap: 6, rel: 3 }, null, { cond: s => CN(s) && s.age >= 18 });
L('cn-artin-exam', 16, 18, 4, '你走了艺考路：画板比人高，集训费比学费贵，联考那天你画到封考铃响。', { know: 3, money: -2000, hap: -1 }, null, { cond: s => CN(s) && s.age >= 16 });
L('cn-sports-spec', 15, 18, 4, '你是体育特长生，每天早上五点半的操场只有你和教练。', { hp: 4, know: 1, hap: -1 }, null, { cond: s => CN(s) && s.age >= 15 });

// ══════════ 大学与求职 ══════════
L('cn-military-training', 18, 18, 10, '军训两周，你在太阳底下站了一小时的军姿，皮肤晒脱了一层。', { hp: 2, hap: 1, rel: 2 }, null, { cond: s => CN(s) && s.inSchool && s.age === 18 });
L('cn-cet4', 18, 21, 9, '你第四次考四级终于过了。全班就差你和另一个哥们，你们请全宿舍吃了顿火锅。', { know: 2, hap: 4, money: -150 }, null, { cond: s => CN(s) && s.inSchool && s.age >= 18 });
L('cn-kaoyan', 21, 23, 8, '你决定考研。图书馆五点半排队占座的日子，你过了一年。', { know: 5, hap: -2 }, '考研报名人数连年超 400 万（教育部）', { cond: s => CN(s) && s.inSchool && s.age >= 21 });
L('cn-kaoyan-fail', 22, 24, 5, '考研差了几分。调剂没成功，你开始找工作——「先就业再择业」。', { hap: -4, know: 2 }, null, { cond: s => CN(s) && s.age >= 22 });
L('cn-gongkao', 21, 32, 8, '你加入了考公大军。行测刷题、申论范文，你说「上岸」是今年唯一的词。', { know: 3, hap: -1 }, '2024 年国考报名超 300 万人，平均竞争比约 77:1（国家公务员局）', { cond: s => CN(s) && s.age >= 21 });
L('cn-gongkao-pass', 23, 33, 4, '你上岸了。面试公示那天，家族群里炸出一排「人才」。', { hap: 7, know: 2, rel: 2 }, null, { cond: s => CN(s) && s.age >= 23 });
L('cn-campus-recruit', 21, 24, 9, '秋招你投了一百多份简历，面试了十一家，最后签了offer 那家不是最大的但给了户口。', { know: 2, hap: 3, money: 500 }, null, { cond: s => CN(s) && s.inSchool && s.age >= 21 });
L('cn-rent-first', 22, 26, 9, '你租了人生第一间房：十平米隔断间，窗户对墙。但那是你自己的门。', { hap: 2, money: -600 }, null, { cond: s => CN(s) && s.age >= 22 && s.region === '城市' });
L('cn-urban-village', 22, 28, 7, '城中村的握手楼里，你和三个室友合租，谁洗澡谁等谁的时间表贴在门上。', { money: -300, rel: 2, hap: -1 }, null, { cond: s => CN(s) && s.age <= 28 && s.region === '城市' });
L('cn-five-insurance', 22, 30, 8, '你拿到了第一张社保卡。父亲在电话里说：「这下你是有单位的人了。」', { know: 1, hap: 2 }, null, { cond: s => CN(s) && s.job && s.age <= 30 });
L('cn-year-end-bonus', 24, 58, 8, '年终奖到账短信响的那刻，你把整年的委屈都原谅了。', { money: 2500, hap: 4 }, null, { cond: s => CN(s) && s.job && s.age <= 58 });
L('cn-996', 23, 40, 7, '你进了「大小周」的循环，工牌挂在脖子上，胃药放在工位抽屉里。', { money: 1200, hp: -4, hap: -3 }, '互联网大厂曾长期实行「996」工作制（人社部认定违法 2021）', { cond: s => CN(s) && s.job && s.age <= 40 });
L('cn-layoff-n', 28, 50, 5, '「毕业名单」上有你的名字。HR 谈 N+1 赔偿时，你学会了第一课：录音。', { money: 3000, hap: -5, know: 2 }, null, { cond: s => CN(s) && s.job && s.age >= 28 });
L('cn-didi-driver', 25, 55, 6, '你下班后开网约车，晚高峰跑满两小时，油钱之外净赚一百五。', { money: 900, hp: -2 }, null, { cond: s => CN(s) && s.age >= 25 });
L('cn-factory-line', 18, 30, 6, '你在电子厂流水线站了三个月，学会了十六秒完成一道工序。', { money: 800, hp: -3, know: -1 }, null, { cond: s => CN(s) && s.region === '乡村' && !s.inSchool && s.age <= 30 });
L('cn-shop-keep', 30, 55, 5, '你家楼下的小卖部盘出去了，你盘下了一间更大的——「总得试一次」。', { money: -3000, hap: 2, know: 1 }, null, { cond: s => CN(s) && s.age >= 30 });
L('cn-vegetable-stall', 28, 60, 5, '你在菜市场租了个摊位，凌晨三点进货，卖的是新鲜也是坚持。', { money: 700, hp: -2, rel: 1 }, null, { cond: s => CN(s) && s.region === '乡村' && !s.job });
L('cn-return-startup', 28, 45, 5, '你回老家搞起了农产品电商，把山里的橘子卖到了全国——「新农人」是你的新头衔。', { money: 1000, know: 2, hap: 3 }, '乡村振兴带动返乡创业累计超 1200 万人（农业农村部）', { cond: s => CN(s) && s.age >= 28 });
L('cn-team-building', 24, 50, 6, '团建拓展训练，你在「信任背摔」环节真的摔了——同事们接住了你。', { rel: 3, hap: 2 }, null, { cond: s => CN(s) && s.job });
L('cn-danwei-stable', 26, 40, 6, '进了体制的你每天八小时、双休、五险一金足额——同学聚会时大家说你「上岸了」。', { hap: 2, money: 600, know: 1 }, null, { cond: s => CN(s) && s.job && s.age >= 26 });
L('cn-side-hustle', 26, 45, 6, '你下了班摆地摊卖袜子，城管来了就跑——那半年你跑出了马拉松的体能。', { money: 500, hp: -1, hap: 1 }, null, { cond: s => CN(s) && s.job && s.age <= 45 });
L('cn-house-price-watch', 25, 45, 7, '你盯着房价看了三年——「再等等」说了三年，首付还差着一点。', { hap: -1, know: 1 }, null, { cond: s => CN(s) && s.age >= 25 && !s.house });

// ══════════ 婚恋家庭 ══════════
L('cn-blind-date', 24, 36, 8, '你被安排了一场相亲：公园长椅上，双方母亲远远地「偶遇」。', { hap: -1, rel: 1 }, null, { cond: s => CN(s) && !s.spouse && s.age >= 24 });
L('cn-blind-date-park', 28, 45, 5, '你路过相亲角，替自己挂了一张「个人简介」——学历收入写得比简历还细。', { hap: 0, know: 1 }, null, { cond: s => CN(s) && !s.spouse && s.age >= 28 });
L('cn-caili', 26, 34, 7, '彩礼和嫁妆谈了三轮。最后一顿饭吃得有点沉，但两家人终究坐在了一张桌上。', { money: -4000, rel: 1, hap: -1 }, null, { cond: s => CN(s) && !s.spouse && s.age >= 26 });
L('cn-wedding-banquet', 27, 38, 9, '你的婚礼摆了二十桌，司仪把你的名字念错了一次，全场就当没听见。', { hap: 5, money: -3500, rel: 3 }, null, { cond: s => CN(s) && s.age >= 27 });
L('cn-mother-in-law', 28, 55, 6, '婆媳同住的第一年，你学会了「都听您的」和「回头再说」两句话的用法。', { rel: 1, hap: -2 }, null, { cond: s => CN(s) && s.spouse && s.age >= 28 });
L('cn-urge-marry', 24, 34, 8, '过年饭桌上，七大姑八大姨轮番问「有对象了吗」——你练就了微笑转移话题术。', { hap: -2, rel: 1 }, null, { cond: s => CN(s) && !s.spouse && s.age >= 24 });
L('cn-second-child', 30, 42, 6, '三胎政策放开了，你们开了个家庭会议——最后决定，一个挺好。', { hap: 1, rel: 1 }, null, { cond: s => CN(s) && s.spouse && s.children.length >= 1 });
L('cn-jiva', 30, 42, 7, '你开始给孩子报班：钢琴、编程、口才——「不能输在起跑线上」这句话你说过又说。', { money: -800, know: 1, hap: -1 }, null, { cond: s => CN(s) && s.children.length > 0 && s.age >= 30 });
L('cn-grandparent-care', 30, 45, 7, '孩子主要由老人带。「隔代抚养」让你省了心，也让你们为喂养方式吵了又和。', { rel: 2, money: 400, hap: -1 }, '中国约七成城市儿童由祖辈参与照料（中国老龄中心调查）', { cond: s => CN(s) && s.children.length > 0 && s.age >= 30 });
L('cn-hukou-move', 26, 40, 5, '你的户口终于迁到了这座大城市——那张纸等了你好几年。', { hap: 3, know: 1 }, null, { cond: s => CN(s) && s.age >= 26 && s.region === '城市' });
L('cn-spring-family', 20, 60, 7, '年夜饭桌上，四代人挤一张桌，电视里的春晚是背景音，吵吵嚷嚷才是年味。', { hap: 5, rel: 3 }, null, { cond: CN });
L('cn-qingming', 30, 85, 6, '清明回乡祭祖，山路滑，你扶着长辈一步一步走。香火纸钱，山风替你们捎话。', { rel: 2, hap: 0 }, null, { cond: s => CN(s) && s.age >= 30 });

// ══════════ 财务房产 ══════════
L('cn-mortgage-sign', 28, 42, 9, '你在贷款合同上签了字——三十年。银行经理说「恭喜」，你笑得有点勉强。', { money: -800, hap: 1 }, null, { cond: s => CN(s) && s.age >= 28 && s.money > 5000, action: s => { s.money -= 30000; s.house = true; } });
L('cn-mortgage-prepay', 35, 55, 5, '你提前还了一笔房贷。手机银行上那个数字变小，你盯着看了十分钟。', { money: -2000, hap: 3 }, null, { cond: s => CN(s) && s.house && s.money > 5000 });
L('cn-yuebao', 24, 55, 7, '你把零钱放进了货币基金，每天收益几分钱，但你每天都看。', { money: 100, know: 1 }, null, { cond: s => CN(s) && s.money > 200 });
L('cn-double-eleven', 20, 55, 8, '双十一凌晨你付了尾款，第二天开始研究「满减凑单攻略」——你又买多了。', { money: -300, hap: 1 }, null, { cond: s => CN(s) && s.money > 300 });
L('cn-refund-11', 20, 55, 5, '双十一冲动下单的八件商品，你退了五件。快递员和你都习惯了。', { money: 150, hap: 0 }, null, { cond: s => CN(s) && s.money > 100 });
L('cn-p2p-storm', 30, 50, 4, '你曾经放进 P2P 的钱没能全拿回来。那个平台倒下时，新闻里都是和你一样的人。', { money: -2000, know: 2, hap: -4 }, '2018-2020 年 P2P 网贷平台全面清退（银保监会）', { cond: s => CN(s) && s.age >= 30 });
L('cn-social-group-buy', 30, 60, 6, '你成了小区团购群的「团长」，帮邻居砍价，自己赚个跑腿钱。', { money: 300, rel: 2 }, null, { cond: s => CN(s) && s.age >= 30 });
L('cn-house-swap', 40, 58, 5, '你们把两居室换成了离学校近的三居室——「为了孩子」这句话又立功了。', { money: -1500, hap: 2 }, null, { cond: s => CN(s) && s.house && s.children.length > 0 });
L('cn-digital-rmb', 25, 50, 5, '你领了数字人民币的体验红包，用完之后觉得——好像和扫码也没差。', { money: 50, know: 1 }, null, { cond: CN });
L('cn-lottery-station', 25, 60, 6, '你家楼下彩票站老板娘认识你十年了——「就差一个号」，这句话你说了十年。', { money: -100, hap: 1 }, null, { cond: s => CN(s) && s.age >= 25 });

// ══════════ 健康养老 ══════════
L('cn-baofan', 25, 55, 8, '你的办公室保温杯里开始泡枸杞——「养生」从一个梗变成了习惯。', { hp: 2, know: 1 }, null, { cond: s => CN(s) && s.age >= 25 && s.job });
L('cn-taiji', 55, 80, 7, '清晨的公园里你跟着队伍打太极，一招一式，呼吸比年轻时慢了，人却更定了。', { hp: 3, hap: 2 }, null, { cond: s => CN(s) && s.age >= 55 });
L('cn-chess-park', 58, 85, 6, '公园棋摊上你杀了个回马枪，围观的老头们齐声喝彩「将！好棋！」。', { hap: 4, rel: 2, know: 1 }, null, { cond: s => CN(s) && s.age >= 58 });
L('cn-senior-university', 58, 78, 5, '你报了老年大学的书法班，第一节课交的「福」字被老师夸「有筋骨」。', { know: 3, hap: 4, rel: 2, money: -200 }, null, { cond: s => CN(s) && s.age >= 58 });
L('cn-community-canteen', 60, 85, 6, '社区食堂一顿十二块，三菜一汤。你跟邻座的老王处成了饭搭子。', { money: -200, hap: 2, rel: 2 }, null, { cond: s => CN(s) && s.age >= 60 });
L('cn-nursing-visit', 62, 88, 5, '你跟孩子们去看了养老院，回来路上大家一路沉默。你说了句「先不急」。', { know: 1, hap: -1, rel: 1 }, null, { cond: s => CN(s) && s.age >= 62 });
L('cn-delayed-retire', 55, 62, 7, '延迟退休的政策落到你头上：多干两年半。你算了算，多领的养老金也多了些。', { know: 1, hap: -1, money: 500 }, '渐进式延迟法定退休年龄改革启动（2025）', { cond: s => CN(s) && s.age >= 55 && s.job && s.age <= 62 });
L('cn-hpv', 20, 40, 5, '你约到了 HPV 疫苗，三针打完，医生说「这半年的号比演唱会还难抢」。', { hp: 3, money: -600 }, null, { cond: s => CN(s) && s.gender === 'female' && s.age >= 20 });
L('cn-eye-surgery', 22, 40, 4, '你做了近视激光手术，摘镜那一刻，你看清了视力表最下面那行。', { hp: 3, hap: 4, money: -1500 }, null, { cond: s => CN(s) && s.money > 2000 });
L('cn-yimiao-3', 1, 6, 8, '你按国家免疫规划打完了基础疫苗，接种本上的绿章盖了满满一页。', { hp: 3 }, '国家免疫规划疫苗覆盖 14 种疾病（卫健委）', { cond: CN });

// ══════════ 时代与地域 ══════════
L('cn-ai-era', 18, 50, 7, 'AI 成了基础设施：你用 AI 改简历、做PPT、给孩子辅导作业——「会用」和「会用好」是两种工资。', { know: 3, hap: 1 }, null, { cond: s => CN(s) && s.age >= 18 });
L('cn-ev-family', 28, 50, 6, '你家换了辆绿牌新能源车，充电桩装在了小区车位上，油钱成了历史词。', { money: -1500, hap: 2 }, '中国新能源汽车渗透率已过 50%（中汽协 2024）', { cond: s => CN(s) && s.money > 2000 });
L('cn-guochao', 18, 40, 6, '你买了件国潮卫衣，老花绣在你袖口上——这波审美，长辈们看不懂但觉得亲切。', { money: -250, hap: 2 }, null, { cond: s => CN(s) && s.age <= 40 });
L('cn-passport', 22, 55, 5, '你办了人生第一本护照，签证页崭新——「世界那么大」，这回轮到你说了。', { money: -120, hap: 3, know: 1 }, null, { cond: CN });
L('cn-abroad-trip', 25, 65, 5, '你第一次出境游，在免税店门口拍照发朋友圈，定位是你人生最远的坐标。', { money: -2500, know: 2, hap: 4 }, null, { cond: s => CN(s) && s.money > 3000 });
L('cn-premade-food', 20, 50, 6, '你发现外卖和堂吃是同一家中央厨房出品——预制菜的话题，你边吃边参与了。', { money: -80, know: 1, hap: -1 }, null, { cond: s => CN(s) && s.age >= 20 });
L('cn-wet-cold-winter', 3, 20, 6, '南方没有暖气，湿冷入骨。你裹着毯子写作业，脚边放着一杯热水。', { hp: -1, hap: -1 }, null, { cond: s => CN(s) && s.region === '城市' && s.age <= 20 });
L('cn-heating-north', 3, 20, 6, '供暖季一到，屋里二十六度，你穿着短袖吃冰棍——这是北方孩子的特权。', { hap: 2, hp: 1 }, null, { cond: s => CN(s) && s.region === '乡村' && s.age <= 20 });
L('cn-newyear-return', 22, 60, 7, '除夕夜你抢到一张回乡的高铁票，四个小时穿越半个中国，家乡话在耳边响起。', { hap: 4, rel: 3, money: -300 }, null, { cond: s => CN(s) && s.age >= 22 });
L('cn-village-tea', 30, 70, 5, '村头老槐树下，你和发小泡了一下午茶。聊的还是小时候那点事，笑的还是当年。', { hap: 4, rel: 3 }, null, { cond: s => CN(s) && s.region === '乡村' && s.age >= 30 });
L('cn-city-metro', 20, 55, 7, '早高峰的地铁里，你被人流推着走——「上车的都不用自己迈腿」。', { hp: -1, hap: -1 }, null, { cond: s => CN(s) && s.region === '城市' && s.age >= 20 });
L('cn-township-bus', 16, 60, 6, '镇上的中巴车逢集必挤，你抱着年货站了一路，司机师傅在弯道喊「扶稳」。', { money: -20, hap: 0 }, null, { cond: s => CN(s) && s.region === '乡村' });

// ══════════ 乡村专项 ══════════
L('cn-farm-harvest', 8, 60, 8, '秋收那几天全家下地，你割了一垄麦子直不起腰，但粮仓满了的踏实是真的。', { hp: -2, hap: 3, money: 300 }, null, { cond: s => CN(s) && s.region === '乡村' });
L('cn-land-transfer', 35, 65, 5, '家里的地流转出去了，一年一亩八百块——父亲说「地没荒，人也轻省了」。', { money: 600, hap: 1 }, null, { cond: s => CN(s) && s.region === '乡村' && s.age >= 35 });
L('cn-oldhouse-rebuild', 30, 55, 6, '你们把老屋翻新了，白墙红瓦，父亲在门口挂了盏灯笼——「像样了」。', { money: -2500, hap: 4, rel: 2 }, null, { cond: s => CN(s) && s.region === '乡村' && s.age >= 30 });
L('cn-left-behind', 6, 14, 6, '父母去城里打工，你和奶奶过了一个学期。每周日傍晚的公用电话是最长的等待。', { hap: -4, rel: 1, know: -1 }, '农村留守儿童规模曾达 900 万级（民政部 2018）', { cond: s => CN(s) && s.region === '乡村' });
L('cn-return-festival', 12, 30, 6, '过年前父母打工回来了。你远远看见他们拖着编织袋下车，撒腿就跑。', { hap: 5, rel: 3 }, null, { cond: s => CN(s) && s.region === '乡村' && s.age <= 30 });
L('cn-village-doctor', 3, 12, 6, '村里的赤脚医生给你看嗓子，一根压舌板、一包冲剂，收五块钱。', { hp: 2, money: -20 }, null, { cond: s => CN(s) && s.region === '乡村' && s.age <= 12 });
L('cn-high-speed-rail-home', 25, 70, 6, '高铁通到了县城，回老家从八小时变成两小时——父亲在出站口站得笔直。', { money: -150, hap: 4, rel: 2 }, null, { cond: s => CN(s) && s.age >= 25 });

// ══════════ 城市专项 ══════════
L('cn-commute-two-hours', 24, 50, 8, '你的通勤单程两小时：地铁换乘三次，外加共享单车一公里。耳机成了必需品。', { hp: -1, hap: -1, know: 1 }, null, { cond: s => CN(s) && s.region === '城市' && s.age >= 24 });
L('cn-share-bike', 20, 50, 7, '共享单车解决了你「最后一公里」的问题——从此你家楼下永远停着橙黄青三种车。', { hp: 1, hap: 1, money: -100 }, null, { cond: s => CN(s) && s.region === '城市' && s.age >= 20 });
L('cn-museum-free', 15, 60, 6, '你预约了免费博物馆，在青铜器前站了半小时——「三千年」三个字忽然具体了。', { know: 3, hap: 2 }, null, { cond: CN });
L('cn-marathon', 25, 60, 5, '你报名了城市马拉松。42 公里跑到 35 公里处，你看见了个举牌子的老头：「还有 7 公里，别怂」。', { hp: 3, hap: 4 }, null, { cond: s => CN(s) && s.age >= 25 && s.hp > 60 });
L('cn-city-night-view', 20, 60, 6, '加班到十一点，你在天桥上看了眼这座城市的灯——「挺好看的，但不是我的」。', { hap: 1, know: 0 }, null, { cond: s => CN(s) && s.region === '城市' && s.age >= 20 });
L('cn-airbnb-host', 30, 55, 4, '你把次卧挂上了短租平台，周末接待天南海北的房客，客厅永远有故事。', { money: 600, rel: 1, hap: 1 }, null, { cond: s => CN(s) && s.house && s.age >= 30 });
L('cn-park-run', 22, 55, 7, '你加入了公园夜跑团，领队是个五十多岁的大姐，配速让你怀疑人生。', { hp: 3, rel: 2, hap: 2 }, null, { cond: s => CN(s) && s.age >= 22 });
L('cn-expat-coffee', 25, 50, 6, '你养成了喝咖啡的习惯，公司楼下那家店的店员已经会直接做你的「老位子」。', { money: -400, hap: 2 }, null, { cond: s => CN(s) && s.region === '城市' && s.age >= 25 });
