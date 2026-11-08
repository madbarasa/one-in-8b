// 四国追加事件 v0.5.0：美国/印度/印尼/巴基斯坦各 40-50 条

export const DEEP_EXTRA3 = [];
const L = (id, minAge, maxAge, weight, text, effect, source, extra) =>
  DEEP_EXTRA3.push({ id, type: 'log', minAge, maxAge, weight, text, effect: effect || {}, source, ...(extra || {}) });
const US = s => s.country === 'usa';
const IN = s => s.country === 'india';
const ID = s => s.country === 'indonesia';
const PK = s => s.country === 'pakistan';

// ══════════ 美国追加 ══════════
L('us2-dmv-line', 16, 60, 7, 'DMV 排队三小时，办一张十分钟的卡——「数字叫号」是你对美国效率的最早认识。', { know: 0, hap: -1 }, null, { cond: US });
L('us2-campsite', 10, 70, 6, '国家公园露营：熊箱、篝火、银河——「Leave No Trace」是刻进基因的规矩。', { money: -200, hap: 4, hp: 1 }, '美国国家公园年访客超 3 亿人次（NPS）', { cond: US });
L('us2-superbowl', 12, 75, 8, '超级碗之夜：鸡翅、广告比比赛好看、中场秀全家人都在唱——你的队伍输了，但你吃爽了。', { hap: 3, rel: 2, money: -60 }, null, { cond: US });
L('us2-fourth-july', 5, 80, 8, '独立日：后院烧烤、烟花、和邻居家的草坪——「美式夏天」的标配三件套。', { hap: 4, rel: 2 }, null, { cond: US });
L('us2-credit-score', 20, 60, 7, '信用分数是这个国家的隐形身份证：按时还卡、别开太多户——「你的分数决定你的利率」。', { know: 2, hap: 0 }, null, { cond: s => US(s) && s.age >= 20 });
L('us2-ambulance-bill', 20, 70, 4, '那次叫了救护车，900 刀的账单比伤口还疼——「在 America，先问价格再喊救命」。', { money: -900, hap: -3, hp: -1 }, '美国救护车平均费用约 $900-$2000（研究显示）', { cond: s => US(s) && s.age >= 20 });
L('us2-er-wait', 25, 70, 5, '急诊室候诊六小时：你看着叫号屏，从愤怒到麻木到学会了欣赏天花板的纹路。', { hp: 1, hap: -2, money: -500 }, null, { cond: s => US(s) && s.age >= 25 });
L('us2-tax-season', 22, 70, 8, '报税季（4/15 前）：W-2、1099、抵扣项——你不是会计，但四月你必须是。', { money: -300, know: 1 }, null, { cond: s => US(s) && s.age >= 22 && s.job });
L('us2-jury-duty', 25, 65, 4, '陪审团传票来了——「公民义务」，你坐了三天法院，听了一个无趣又严肃的故事。', { money: 30, know: 2 }, null, { cond: s => US(s) && s.age >= 25 });
L('us2-college-tour', 16, 18, 5, '大学参观团： Fake 的热情、真实的草坪、和爸妈的「这学费值吗」的眼神。', { know: 1, hap: 1, money: -200 }, null, { cond: s => US(s) && s.age >= 16 });
L('us2-dorm-life', 18, 21, 6, '宿舍生活：室友的闹钟、公共厨房的旧披萨、和凌晨两点走廊里的人生讨论。', { rel: 3, hap: 2, know: 1 }, null, { cond: s => US(s) && s.inSchool && s.age >= 18 });
L('us2-internship', 20, 23, 6, '暑期实习：咖啡、打印、和「假装很忙」的艺术——但简历上那行字是真的。', { money: 600, know: 2 }, null, { cond: s => US(s) && s.inSchool && s.age >= 20 });
L('us2-first-apartment', 22, 30, 7, '第一套公寓：押金、信用审查、和宜家的说明书——「组装的人生从书架开始」。', { money: -1000, hap: 3, know: 1 }, null, { cond: s => US(s) && s.age >= 22 });
L('us2-craigslist-roommate', 21, 32, 5, '室友从网上找的：第一个爱猫，第二个爱派对，第三个把客厅搬空了——你搬走那天很平静。', { hap: -1, rel: 1, know: 1 }, null, { cond: s => US(s) && s.age <= 32 });
L('us2-health-insurance-choice', 22, 60, 6, '开放注册季你要选保险计划：金计划、银计划、免赔额和自付额——选择困难症患者的地狱。', { know: 2, money: -300 }, null, { cond: s => US(s) && s.age >= 22 });
L('us2-roadtrip', 18, 60, 6, '公路旅行：66 号公路、大峡谷、路边怪博物馆——「旅程比目的地重要」是美国人的人生哲学。', { money: -500, hap: 5, hp: 1, rel: 2 }, null, { cond: s => US(s) && s.age >= 18 });
L('us2-black-friday-line', 15, 55, 6, '黑色星期五你凌晨三点去排队——为了半价的电视，你认识了三个新朋友和一场群架。', { money: -400, hap: 2, know: 1 }, null, { cond: s => US(s) && s.age <= 55 });
L('us2-gun-range', 25, 60, 4, '你去了靶场——在美国，「拥枪权」是话题也是体验，教官说「安全第一，永远」。', { money: -100, know: 2, hp: 0 }, null, { cond: s => US(s) && s.age >= 25 });
L('us2-small-town-fair', 8, 70, 5, '小镇集市：炸奥利奥、套圈游戏、摩天轮——「 county fair」是中西部孩子的夏天记忆。', { hap: 3, rel: 1, money: -50 }, null, { cond: US });
L('us2-church-bake-sale', 10, 70, 5, '义卖会上你买了布朗尼——钱进了社区基金，胃进了幸福，双方都赢了。', { money: -20, hap: 2, rel: 1 }, null, { cond: US });
L('us2-volunteer-fire', 25, 60, 4, '你成了志愿消防员——小镇上「出警」那天，你的正职老板给你放了假。', { rel: 3, hp: -1, hap: 2, know: 1 }, null, { cond: s => US(s) && s.age >= 25 });
L('us2-college-debt-forgive', 26, 40, 4, '学贷减免的谣言年年有——你点进去看了一眼，政策还在路上，利息照走。', { money: -200, know: 1, hap: -1 }, null, { cond: s => US(s) && s.age >= 26 });
L('us2-midlife-sports', 35, 55, 6, '你加入了中年垒球联赛：膝盖不行了，但对赢的渴望没变——Beer after game 是传统。', { hp: 1, hap: 3, rel: 2 }, null, { cond: s => US(s) && s.age >= 35 });
L('us2-thanksgiving-parade', 5, 70, 6, '感恩节大游行：巨大的气球飘过第五大道——你冻得鼻涕直流但没舍得走。', { hap: 3, rel: 2 }, null, { cond: US });
L('us2-truck-culture', 20, 60, 5, '皮卡是美国男人的第二个家：货斗里装过家具、泥土和一整个青春。', { money: -200, hap: 2 }, null, { cond: s => US(s) && s.age >= 20 });
L('us2-garage-sale', 30, 70, 5, '自家车库拍卖：旧物标价一美元两美元——一天下来赚了 87 刀和一堆「下次再来」。', { money: 90, hap: 2 }, null, { cond: s => US(s) && s.age >= 30 });
L('us2-home-repair', 35, 70, 6, '房屋维修是成年人的地狱：热水器的报价让你考虑「洗澡重要吗」这个哲学问题。', { money: -800, know: 1, hap: -1 }, null, { cond: s => US(s) && s.house && s.age >= 35 });
L('us2-neighbor-borrow', 30, 70, 5, '你借了邻居的割草机，还回去时附了自烤的饼干——「美国好邻居」是这么养成的。', { rel: 2, hap: 1 }, null, { cond: s => US(s) && s.age >= 30 });
L('us2-food-bank', 30, 65, 4, '那段最难的日子，食品银行撑住了你家三个月——「领取的时候，没人问你为什么」。', { money: 200, hap: -1, rel: 1 }, '美国食品银行体系每年服务数千万人', { cond: s => US(s) && s.money < 2000 });
L('us2-second-job', 25, 55, 5, '你同时打了两份工：白天 office，晚上 rideshare——「睡眠是成功人士的第一个牺牲品」。', { money: 900, hp: -3, hap: -2 }, null, { cond: s => US(s) && s.age >= 25 });

// ══════════ 印度追加 ══════════
L('in2-milk-delivery', 5, 30, 6, '清晨送奶人把牛奶挂在门把上——玻璃瓶时代的记忆，塑料袋时代的日常。', { hap: 1, rel: 1 }, null, { cond: IN });
L('in2-tuition-center', 10, 18, 8, '放学后的补习中心（tuition）：四十个孩子挤一间屋——「第五名之后都是失败」的风气。', { know: 2, hap: -1 }, null, { cond: s => IN(s) && s.age <= 18 });
L('in2-telephone-interview', 21, 30, 5, '面试官问「你为什么想加入我们公司」——你背好的答案和心跳一样快。', { know: 1, money: 300 }, null, { cond: s => IN(s) && s.age <= 30 });
L('in2-metro-city', 20, 40, 6, '德里/孟买/班加罗尔的地铁：安检、女士车厢、和挤上车后的十分钟人生放空。', { hp: -1, know: 1, money: -20 }, null, { cond: s => IN(s) && s.region === '城市' && s.age >= 20 });
L('in2-festival-saree', 18, 70, 6, '节前市场买纱丽：七个市场、五场砍价、一种颜色——妈妈说「红色喜庆」，你选了蓝色。', { money: -150, hap: 3 }, null, { cond: s => IN(s) && s.gender === 'female' && s.age >= 18 });
L('in2-dowry-progressive', 24, 35, 5, '你们家决定「不要嫁妆」——父亲说「我教她的东西比黄金贵」，亲戚沉默了。', { rel: 2, hap: 2, know: 1 }, null, { cond: s => IN(s) && s.age >= 24 });
L('in2-cousin-marriage', 26, 40, 6, '表哥的婚礼你帮忙了七天：布置、招待、唱歌——「婚礼是全村的大型团建」。', { rel: 2, hap: 2, money: -100 }, null, { cond: IN });
L('in2-monsoon-dengue', 15, 60, 5, '雨季后的登革热警报：你被蚊子咬了三十个包，测了两次体温——万幸只是过敏。', { hp: -2, know: 1 }, null, { cond: IN });
L('in2-street-vendor', 20, 60, 7, '街边摊是你的一半食堂：vada pav、pani puri、chaat——「干净又卫生」是这个世界的暗号。', { money: -30, hap: 3, hp: -1 }, null, { cond: IN });
L('in2-cricket-idol', 8, 20, 6, '你的偶像从 Sachin 换到 Kohli——但后院练出的那记 cut shot，是自己的传奇。', { hp: 2, hap: 3, rel: 1 }, null, { cond: s => IN(s) && s.age <= 20 });
L('in2-village-school-walk', 6, 14, 6, '你每天走五公里去上学——路过的牛、田和那条「下雨就消失」的桥。', { hp: 1, know: 1, hap: 0 }, null, { cond: s => IN(s) && s.region === '乡村' && s.age <= 14 });
L('in2-family-savings-circle', 25, 55, 5, '你们家加入了邻里「轮流储蓄会」（chit fund）——每人每月一份，一年轮一次大的。', { money: 300, rel: 2, know: 1 }, null, { cond: s => IN(s) && s.age >= 25 });
L('in2-gold-loan', 30, 60, 4, '急用钱时母亲把金镯子拿去 gold loan——「黄金救急」是印度家庭的老智慧。', { money: 500, hap: -1 }, null, { cond: s => IN(s) && s.age >= 30 });
L('in2-temple-donation', 25, 75, 6, '你在寺庙投了 donation：不一定求什么，但扔进功德箱那刻心里踏实。', { money: -50, hap: 2 }, null, { cond: IN });
L('in2-english-fluency', 15, 25, 5, '你的英语从「考试英语」进化到「点奶茶英语」——口音是印度特色，自信是世界通行证。', { know: 2, hap: 1 }, null, { cond: s => IN(s) && s.age <= 25 });
L('in2-medical-shop', 20, 70, 5, '街角药店不看处方就卖药——「半片扑尔敏、一板布洛芬」是印度人的家庭常备问答。', { money: -30, hp: 1 }, null, { cond: IN });
L('in2-wedding-photographer', 25, 35, 4, '婚礼摄影师把你的全家福修得发光——「印度的婚礼照片，人比场景美十倍」。', { money: -80, hap: 3, rel: 1 }, null, { cond: IN });
L('in2-politics-debate', 20, 60, 5, '茶摊上的政治辩论：两人吵到面红耳赤，然后一起喝完最后一口 chai 走人。', { know: 1, rel: 1, hap: 1 }, null, { cond: s => IN(s) && s.age >= 20 });
L('in2-daughter-education', 28, 50, 5, '你坚持让女儿读到大学毕业——「她的嫁妆是她的文凭」。', { money: -500, know: 2, hap: 2 }, null, { cond: s => IN(s) && s.children.length > 0 && s.age >= 28 });
L('in2-retire-temple-town', 58, 85, 4, '退休后你搬去了蒂鲁帕提/瓦拉纳西的朝圣小城——清晨的钟声、恒河的雾、和一世修行。', { hap: 3, know: 2, money: -200 }, null, { cond: s => IN(s) && s.age >= 58 });
L('in2-first-flight', 25, 50, 5, '人生第一次坐飞机：LCC 航空、没有餐食、窗户外的云——你拍了三十七张照片。', { money: -150, hap: 4, know: 1 }, null, { cond: s => IN(s) && s.age >= 25 });
L('in2-old-friend-village', 35, 70, 5, '你回村看小学同学——他还在种地，你在大城市敲键盘，但一开口还是当年的梗。', { rel: 3, hap: 3 }, null, { cond: s => IN(s) && s.age >= 35 });

// ══════════ 印尼追加 ══════════
L('id2-warung-kopi', 18, 70, 7, '街角咖啡摊（warung kopi）是印尼男人的客厅：一杯 kopi tubruk，聊天下事——从油价聊到国足。', { money: -20, rel: 2, hap: 1 }, null, { cond: s => ID(s) && s.age >= 18 });
L('id2-ojek-school', 6, 15, 5, '父母用 ojek（摩的）送你上学——你坐在前杠上，风把校服吹成了披风。', { hap: 2, rel: 1 }, null, { cond: s => ID(s) && s.age <= 15 });
L('id2-gampong-mosque', 10, 70, 6, '村里的清真寺是社区中心：婚礼、葬礼、吵架调解——人生大事都在这屋檐下。', { rel: 2, hap: 1 }, null, { cond: s => ID(s) && s.religion === '伊斯兰教' && s.region === '乡村' });
L('id2-angkot-driver', 20, 50, 5, '你开过 angkot（小巴）：一条固定线路、乘客喊「kiri!」你就停车——首尔的地铁学不了这个。', { money: 300, know: 1 }, null, { cond: s => ID(s) && s.age >= 20 });
L('id2-online-ojol', 20, 45, 6, '你注册了 ojol（网约摩的）：雨天订单最多——「别人的下雨天，是我的旺季」。', { money: 500, hp: -2 }, '印尼网约车骑手数百万，多为灵活就业', { cond: s => ID(s) && s.age >= 20 });
L('id2-bakso-cart', 15, 65, 7, '推车卖肉丸面（bakso）的大爷走街串巷二十年——你从小学吃到大学毕业。', { money: -30, hap: 3 }, null, { cond: ID });
L('id2-earthquake-rebuild', 30, 70, 4, '地震后你家重建了三次：每次都更结实一点——「印尼人的房子是震出来的经验」。', { money: -800, know: 1, hap: -1 }, null, { cond: s => ID(s) && s.age >= 30 });
L('id2-volcano-farmland', 30, 60, 4, '火山灰让田里的菜长得格外好——「灾害的馈赠」，村里老人这么说。', { money: 300, know: 1 }, null, { cond: s => ID(s) && s.region === '乡村' && s.age >= 30 });
L('id2-school-uniform-white', 6, 18, 6, '红白校服是印尼学生的标配：周一升旗、宣誓、和永远熨不平的白衬衫。', { know: 1, hap: 1 }, null, { cond: s => ID(s) && s.age <= 18 });
L('id2-family-plan-card', 25, 45, 5, '计划生育宣传车来村里发了卡片和避孕套——「两个就够了」的口号贴在诊所墙上。', { know: 1, hap: 0 }, null, { cond: s => ID(s) && s.age >= 25 });
L('id2-fishing-boat', 22, 55, 5, '你上过远洋渔船：三个月一签、公海的风浪、和回家那天港口的日落。', { money: 1000, hp: -3, rel: -1 }, null, { cond: s => ID(s) && s.region === '乡村' && s.age >= 22 });
L('id2-hajj-dream', 40, 75, 4, '去麦加朝觐（Hajj）是排十几年的队——你把名额排队这件事，当成人生的一个日期。', { money: -300, hap: 2, know: 1 }, '印尼每年朝觐名额约 22 万，排队常超 10 年', { cond: s => ID(s) && s.religion === '伊斯兰教' && s.age >= 40 });
L('id2-wedding-siraman', 25, 40, 5, '婚礼前的 siraman 仪式：长辈给你淋七种花水——「洗净从前，迎接将来」。', { hap: 3, rel: 2 }, null, { cond: s => ID(s) && s.age >= 25 });
L('id2-duku-season', 8, 70, 5, '榴梿季之外的第二个天堂：蛇皮果和杜古的季节——果园亲戚的快递永远超重。', { money: -50, hap: 3 }, null, { cond: ID });
L('id2-flood-rescue', 25, 65, 4, '暴雨夜你帮忙转移了邻居的老人——皮划艇、手电、和「还有谁没出来」的喊声。', { rel: 3, hp: -1, hap: 1 }, null, { cond: s => ID(s) && s.age >= 25 });

// ══════════ 巴基斯坦追加 ══════════
L('pk2-madrasa-recite', 6, 15, 6, '经学院里你背完了第一章——老师用糖果奖励你，那颗糖你记到现在。', { know: 2, hap: 2, rel: 1 }, null, { cond: s => PK(s) && s.age <= 15 });
L('pk2-dal-chawal', 5, 80, 7, 'dal chawal（豆子饭）是这个家的保底菜——「再穷，这锅管够」是母亲的承诺。', { hap: 1, rel: 1 }, null, { cond: PK });
L('pk2-eid-sacrifice', 10, 80, 6, '宰牲节（Eid-ul-Adha）：全家分肉、三分之一给邻居——「分享」是被写进节日的。', { money: -200, hap: 3, rel: 2 }, null, { cond: s => PK(s) && s.religion === '伊斯兰教' && s.age >= 10 });
L('pk2-bus-top-travel', 15, 30, 4, '你试过坐大巴车顶（年轻时敢）——摇晃、灰尘、风景——后来公路局管严了，你只讲给孙子听。', { hp: -2, hap: 2, know: 1 }, null, { cond: s => PK(s) && s.age <= 30 });
L('pk2-karachi-traffic', 18, 60, 6, '卡拉奇的交通是一场上瘾的混乱：三轮、摩托、公交车和牛——绿灯只是个建议。', { hp: -1, know: 1 }, null, { cond: s => PK(s) && s.region === '城市' && s.age >= 18 });
L('pk2-army-recruit', 20, 30, 5, '你考虑过参军——在巴基斯坦，「军队」是最稳定的职业和最硬的荣誉。', { hap: 1, know: 1 }, null, { cond: s => PK(s) && s.age <= 30 });
L('pk2-cricket-street-fame', 12, 22, 5, '你在巷子板球赛拿过「最佳击球手」——奖品是两瓶汽水和全巷的尊重。', { hp: 2, hap: 4, rel: 2 }, null, { cond: s => PK(s) && s.age <= 22 });
L('pk2-power-loom-worker', 20, 50, 5, '织机声里你干了十年——「手速就是工资」，你的手指记得每一个线头。', { money: 400, hp: -2 }, null, { cond: s => PK(s) && s.job && s.age >= 20 });
L('pk2-relative-lifetime', 30, 75, 5, '远房亲戚的婚丧嫁娶你都得到场——「人到场就是情分」，缺席的代价是三年冷场。', { rel: 2, money: -100 }, null, { cond: s => PK(s) && s.age >= 30 });
L('pk2-girl-bicycle', 8, 16, 4, '你学会了骑自行车——在那个小区里，女孩骑车本身就有点「叛逆」。', { hp: 2, hap: 3, know: 1 }, null, { cond: s => PK(s) && s.gender === 'female' && s.age <= 16 });
L('pk2-village-well', 10, 60, 5, '村里的老井是社交场：打水的妇女、放学的孩子、和一只永远蹲着的狗。', { rel: 2, hp: 1 }, null, { cond: s => PK(s) && s.region === '乡村' && s.age >= 10 });
L('pk2-tuition-fee-crisis', 10, 18, 5, '学费涨了，父亲去学校「谈判」——最后你交上了，他这月戒了烟。', { know: 1, hap: -1, rel: 2 }, null, { cond: s => PK(s) && s.age <= 18 });
L('pk2-shalwar-kameez', 5, 80, 6, '你一年有两套 shalwar kameez：节日一套、日常一套——「体面」是这个国家的重要事项。', { hap: 1, money: -50 }, null, { cond: PK });
L('pk2-sadaqah-friday2', 25, 75, 5, '周五聚礼后你在清真寺门口放了一点钱——旁边放钱的人比你穷，你们互相点头。', { money: -30, hap: 2, rel: 1 }, null, { cond: s => PK(s) && s.religion === '伊斯兰教' && s.age >= 25 });
L('pk2-heatwave-2022', 10, 70, 5, '那年的热浪让气温破了五十度——学校停课、电扇罢工、你和冰块结成了同盟。', { hp: -2, hap: -1, know: 1 }, '2022 年巴基斯坦曾出现超 50°C 的极端高温', { cond: PK });
L('pk2-quota-job', 22, 35, 4, '你通过了政府岗位考试——发榜那天，全村人都知道了你的名字（包括媒婆）。', { know: 2, money: 300, hap: 4, rel: 2 }, null, { cond: s => PK(s) && s.age >= 22 && s.know > 65 });
L('pk2-mosque-ifar', 10, 80, 7, '斋月的开斋饭（iftar）在清真寺免费发放——陌生人递来的椰枣，甜得像一天的意义。', { hap: 3, rel: 2 }, null, { cond: s => PK(s) && s.religion === '伊斯兰教' });
L('pk2-boat-manual', 30, 60, 4, '你帮村里修过堤坝：沙袋、铁锹、和「洪水要来了」的广播——三天没合眼。', { rel: 3, hp: -2, know: 1 }, null, { cond: s => PK(s) && s.region === '乡村' && s.age >= 30 });
L('pk2-dream-abroad2', 18, 35, 6, '「去欧洲/去海湾/去北美」是小镇青年的三大梦——签证拒章盖下来那天，梦碎了但人还在。', { hap: -2, know: 1 }, null, { cond: s => PK(s) && s.age <= 35 });
L('pk2-return-village', 45, 75, 5, '你在海湾干了二十年，回村时大家差点认不出你——「头发白了，钱袋厚了，心还是那颗」。', { money: 1000, rel: 3, hap: 3 }, null, { cond: s => PK(s) && s.age >= 45 });
L('in2-temple-festival-elephant', 15, 60, 4, '寺庙节的巨象（喀拉拉/泰米尔）走在人群里——金冠、彩伞、鼓声——你跟着走了三条街。', { hap: 4, know: 1 }, null, { cond: s => IN(s) && s.age >= 15 });
L('in2-filter-coffee', 20, 75, 5, '南印度的 filter coffee：黄铜杯里拉得老高的泡沫——「速溶？那不叫咖啡」。', { money: -20, hap: 2 }, null, { cond: IN });
L('in2-bank-queue', 30, 70, 5, '银行排号机喊了你的号——从进门到出门四十分钟，业务只办了四分钟。', { know: 0, hap: -1 }, null, { cond: s => IN(s) && s.age >= 30 });
L('id2-gotong-clean', 20, 70, 5, '周五社区大扫除（gotong royong）：扫帚、竹篱、和互相嫌弃又合作的邻居们。', { rel: 3, hp: -1, hap: 1 }, null, { cond: ID });
L('us2-parking-ticket', 20, 65, 6, '停车罚单贴在雨刷上——「这个街区的停车规则比我的合同还复杂」。', { money: -60, hap: -2 }, null, { cond: s => US(s) && s.age >= 20 });
