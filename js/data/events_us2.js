// 美国深度事件线 v0.5.0：~130 条
// 童年/中学/大学/职场/生活/社会现实，全部按真实美国社会结构写

export const DEEP_US = [];
const L = (id, minAge, maxAge, weight, text, effect, source, extra) =>
  DEEP_US.push({ id, type: 'log', minAge, maxAge, weight, text, effect: effect || {}, source, ...(extra || {}) });
const US = s => s.country === 'usa';

// ══════════ 童年 ══════════
L('us-scouts', 7, 13, 6, '你加入了童子军，学会了打绳结、搭帐篷——还有卖爆米花，卖得比谁都凶。', { rel: 3, hp: 2, know: 1 }, null, { cond: US });
L('us-halloween', 4, 14, 12, '万圣节你拎着南瓜桶挨家喊「Trick or Treat」，回来称了称糖：两磅半。', { hap: 5, rel: 1 }, null, { cond: s => US(s) && s.age <= 14 });
L('us-little-league', 7, 13, 7, '小联盟棒球赛季开始了，你爸是志愿教练，你们队叫「响尾蛇」。', { hp: 3, rel: 2, hap: 2 }, null, { cond: US });
L('us-summer-camp', 8, 15, 6, '夏令营你学 canoe 划翻了船，辅导员把你捞起来说「这是传统项目」。', { hp: 2, rel: 3, hap: 3, money: -300 }, null, { cond: s => US(s) && s.wealthIdx >= 2 });
L('us-sunday-school', 5, 14, 6, '周日你坐在教堂后排画漫画，牧师讲的故事一个字没进脑子。', { hap: 1, rel: 1 }, null, { cond: s => US(s) && s.religion !== '无宗教' });
L('us-parents-divorce', 5, 16, 5, '父母的离婚协议签了。你在两个家之间往返，书包永远收拾一半。', { hap: -6, rel: -2 }, '美国约 40% 儿童经历父母离婚（CDC 婚姻数据）', { cond: US, action: s => { s.stats.hap = Math.max(0, s.stats.hap - 6); } });
L('us-babysitting', 14, 17, 6, '你开始帮邻居带娃，一晚 30 刀——你学会了三件事：换尿布、讲睡前故事、谈价钱。', { money: 250, know: 1, rel: 1 }, null, { cond: s => US(s) && s.age >= 14 });
L('us-dmv-wait', 16, 18, 8, 'DMV 的队排了两小时，你考的笔试题里有道题的图根本看不清——但你过了。', { hap: 2, money: -40 }, null, { cond: s => US(s) && s.age >= 16 });
L('us-deer-hunt', 12, 60, 4, '你和叔叔去了猎季的开营地，凌晨四点的森林安静得能听见心跳。', { hp: 1, rel: 2, know: 1 }, null, { cond: s => US(s) && s.region === '乡村' && s.age >= 12 });
L('us-therapy-teen', 12, 18, 4, '学校心理辅导员每周找你聊一次。你的「情绪管理」第一次被当成正经事。', { hap: 3, know: 1 }, null, { cond: s => US(s) && s.inSchool && s.age >= 12 });
L('us-comic-con', 12, 40, 5, '你攒了半年钱去动漫展，cos 成了自己最喜欢的角色，被人求合影十一次。', { money: -200, hap: 5, rel: 1 }, null, { cond: s => US(s) && s.age >= 12 });
L('us-skate-park', 8, 17, 6, '滑板公园你摔了三十次，第三十一次稳稳落下了 kickflip——围观的陌生人给你鼓掌。', { hp: 2, hap: 4 }, null, { cond: US });

// ══════════ 中学 ══════════
L('us-sat-prep', 16, 18, 8, 'SAT 备考班一千五百刀，你妈咬咬牙报了。你刷了八套真题，背了三百个词汇卡。', { know: 4, money: -800 }, '美国大学申请标准化考试 SAT（College Board）', { cond: s => US(s) && s.age >= 16 });
L('us-ap-classes', 15, 18, 7, '你选了三门 AP 课，五月考试周的咖啡消耗量是平时的五倍。', { know: 4, hap: -1 }, null, { cond: s => US(s) && s.inSchool && s.know > 60 });
L('us-varsity', 14, 18, 6, '你进了校队。周五晚上的球场灯亮起来时，看台上坐满了整个小镇的人。', { hp: 3, rel: 4, hap: 3 }, null, { cond: s => US(s) && s.inSchool && s.age >= 14 });
L('us-cheerleader', 14, 18, 4, '你成了啦啦队员——彩球、队形、笑容，还有每周三次的体能训练。', { hp: 2, hap: 2, rel: 2 }, null, { cond: s => US(s) && s.inSchool && s.gender === 'female' && s.age >= 14 });
L('us-homecoming', 15, 18, 7, 'Homecoming 舞会，你在中场走廊被同学起哄表白，慌乱中把 corsage 别歪了。', { hap: 4, rel: 3, money: -100 }, null, { cond: s => US(s) && s.inSchool && s.age >= 15 });
L('us-mcdonalds-job', 16, 19, 8, '你在麦当劳打第一份工，时薪 12 刀，下班免费带走的汉堡是最好的深夜食堂。', { money: 800, know: 1, hp: -1 }, null, { cond: s => US(s) && s.age >= 16 });
L('us-volunteer-hours', 14, 18, 6, '申请大学要志愿时长：你在食物银行分拣了一百小时罐头——「假装很忙但很充实」。', { rel: 2, know: 1, hap: 1 }, null, { cond: s => US(s) && s.inSchool && s.age >= 14 });
L('us-essay-night', 17, 18, 8, '大学文书写到凌晨三点：「描述一次让你改变的经历」——你写的是外婆的厨房。', { know: 2, hap: 1 }, null, { cond: s => US(s) && s.age >= 17 });
L('us-fafsa', 17, 19, 7, 'FAFSA 表格填得全家火大，最后算出的补助——聊胜于无。', { know: 1, money: 500 }, '美国联邦学生助学金申请系统', { cond: s => US(s) && s.age >= 17 });
L('us-first-car', 16, 19, 8, '你花两千五买了辆二手凯美瑞——保险却要一千二一年，「这车比我金贵」。', { money: -1500, hap: 4 }, null, { cond: s => US(s) && s.age >= 16 });
L('us-red-cups', 16, 20, 5, '朋友的湖边派对，红色塑料杯、篝火和走调的吉他——青春的标配。', { hap: 3, rel: 3, hp: -1 }, null, { cond: s => US(s) && s.age >= 16 });

// ══════════ 大学 ══════════
L('us-dorm-life', 18, 20, 9, '宿舍楼下永远飘着微波炉爆米花味，你的室友是个凌晨三点练吉他的人。', { rel: 3, hap: 1, know: 1 }, null, { cond: s => US(s) && s.inSchool && s.age === 18 });
L('us-frat-party', 18, 21, 6, '兄弟会的派对音乐震到楼下投诉——你玩了 beer pong，输多赢少。', { hap: 3, rel: 2, hp: -1 }, null, { cond: s => US(s) && s.inSchool && s.age <= 21 });
L('us-gen-ed', 18, 19, 7, '通识课「世界音乐史」和你专业毫无关系，但你 lifetime 记住了非洲鼓的节奏。', { know: 2, hap: 1 }, null, { cond: s => US(s) && s.inSchool && s.age <= 19 });
L('us-change-major', 18, 21, 5, '大二你换了专业，辅导老师说「这很正常」——多读的那一年，学费不会正常。', { know: 2, hap: 1, money: -500 }, null, { cond: s => US(s) && s.inSchool && s.age <= 21 });
L('us-work-study', 18, 22, 7, '你在图书馆前台做 work-study，时薪 15 刀，顺便读完了三十本书。', { money: 700, know: 2 }, null, { cond: s => US(s) && s.inSchool && s.age <= 22 });
L('us-internship', 19, 23, 8, '暑期实习你搬去了另一个城市，工牌上的头衔比工资单好看——实习工资 19 刀/小时。', { know: 3, money: 1200, rel: 1 }, null, { cond: s => US(s) && s.inSchool && s.age >= 19 });
L('us-grad-school', 21, 26, 5, '你决定读研——「躲两年就业市场」这句实话你没写在个人陈述里。', { know: 4, money: -1000 }, null, { cond: s => US(s) && s.age >= 21 });
L('us-ivy-dream', 16, 18, 4, '常春藤的拒信到了，措辞体面。你爸说「他们的损失」——但那晚他叹了三次气。', { hap: -3, know: 1 }, null, { cond: s => US(s) && s.age >= 16 && s.know > 70 });
L('us-commuter-student', 18, 22, 5, '你是走读生，每天开一小时车上课——省了宿舍钱，错过了大学的夜生活。', { money: 300, rel: -1, know: 1 }, null, { cond: s => US(s) && s.inSchool && s.wealthIdx <= 2 });

// ══════════ 职场 ══════════
L('us-linkedin', 21, 55, 7, '你更新了 LinkedIn，加了「Open to Work」—— recruiter 们从各个时区涌来。', { know: 1, money: 300 }, null, { cond: s => US(s) && s.age >= 21 });
L('us-barista', 17, 30, 6, '你端了一阵子咖啡，学会了拉花，也学会了记住每个常客的名字和脾气。', { money: 700, rel: 2 }, null, { cond: s => US(s) && !s.inSchool && s.age <= 30 });
L('us-unpaid-intern', 20, 25, 4, '你做了三个月不付薪实习——「为了简历」。房租是靠父母转账续的。', { know: 2, money: -500, hap: -2 }, null, { cond: s => US(s) && s.age <= 25 && s.wealthIdx >= 2 });
L('us-severance', 30, 58, 5, '裁员时你谈下三个月 severance，hr 的话术被你逐条拆解——「我读过员工手册」。', { money: 4000, hap: -2, know: 2 }, null, { cond: s => US(s) && s.job && s.age >= 30 });
L('us-job-hop', 25, 45, 8, '跳槽涨薪 25%——你的老板挽留你说「再考虑考虑」，你考虑了一晚上就签了。', { money: 1500, know: 2 }, null, { cond: s => US(s) && s.job && s.age <= 45 });
L('us-health-insurance', 22, 60, 8, 'open enrollment 季节你研究了三小时的保险套餐——deductible 越高月费越低，你赌自己不生病。', { money: -400, know: 2 }, null, { cond: s => US(s) && s.job });
L('us-tax-season', 20, 70, 8, '报税季你对着 W-2 和 1040 表格抓了一星期头发，最后用了报税软件——还得交钱。', { money: -80, know: 1 }, '美国所得税自行申报制度（IRS）', { cond: s => US(s) && s.age >= 20 });
L('us-jury-duty', 25, 65, 4, '你收到陪审团传票。法院大楼里等了一整天，最后没被选上——白请了一天假。', { know: 1, hap: 0, money: -100 }, null, { cond: s => US(s) && s.age >= 25 });
L('us-union', 25, 60, 4, '你加入了工会。集体谈判那年，时薪涨了 3 刀——老会员说「这就是规矩的力量」。', { money: 800, rel: 2 }, null, { cond: s => US(s) && s.job && s.age >= 25 });
L('us-remote-work', 25, 55, 7, '公司全面远程化后你搬去了生活成本低的小城——工资没降，房子大了三倍。', { money: 800, hap: 3 }, null, { cond: s => US(s) && s.job && s.age >= 25 });
L('us-401k-match', 24, 60, 7, '你把 401(k) 供到公司 match 的上限——「白拿的钱不要是傻子」。', { money: 600, know: 1 }, null, { cond: s => US(s) && s.job && s.age >= 24 });

// ══════════ 生活 ══════════
L('us-security-deposit', 22, 40, 6, '搬走时房东扣了你 600 刀押金，理由是「地毯磨损」——你为此学写了措辞严谨的抗议信。', { money: -300, know: 1, hap: -1 }, null, { cond: s => US(s) && s.age >= 22 });
L('us-credit-score', 22, 60, 7, '你的信用分数攒到了 780——租房、贷款、甚至找工作，这三个数字都在替你说话。', { know: 1, hap: 1 }, '美国 FICO 信用评分体系', { cond: s => US(s) && s.age >= 22 });
L('us-parking-ticket', 18, 70, 6, '停车罚单 65 刀，你申诉信写了三页，驳回。从此你把停车标志背得比课文熟。', { money: -65, know: 1, hap: -1 }, null, { cond: US });
L('us-dentist-bill', 10, 60, 7, '补一颗牙 300 刀，做个根管 1500 刀——你养成了用牙线的好习惯。', { money: -400, hp: 1 }, '美国无全民牙科保险，自费比例高', { cond: US });
L('us-cvs-line', 15, 70, 7, '你在 CVS 的处方柜台前等了四十分钟——药剂师是全店最忙的人。', { hp: 1, money: -60 }, null, { cond: US });
L('us-couponing', 25, 65, 6, '你成了优惠券高手：buy one get one 加 clip coupon，账单省下 40%。', { money: 150, know: 1, hap: 1 }, null, { cond: US });
L('us-road-trip', 18, 60, 6, '公路旅行：66 号公路、汽车旅馆、加油站的劣质咖啡和最好听的电台。', { money: -600, hap: 5, know: 1 }, null, { cond: s => US(s) && s.age >= 18 });
L('us-national-park', 10, 70, 6, '你去了国家公园——80 刀年票跑遍 63 座园子，这是美国政府卖得最亏的门票。', { money: -150, hp: 2, hap: 4 }, '美国国家公园系统年票 America the Beautiful $80', { cond: US });
L('us-july4-fireworks', 5, 80, 9, '独立日晚上，后院烧烤、西瓜和烟花——邻居家的比去年响了一倍。', { hap: 4, rel: 2 }, null, { cond: US });
L('us-superbowl', 15, 70, 8, '超级碗周末：鸡翅、广告和对你支持球队的心脏考验——今年他们又输了。', { hap: 1, rel: 2, money: -100 }, null, { cond: US });
L('us-bbq-summer', 20, 70, 7, '七月傍晚的后院 BBQ，汉堡在烤架上滋滋响，邻居家的狗在等着捡漏。', { hap: 3, rel: 2 }, null, { cond: US });
L('us-gym-membership', 22, 60, 6, '你办了健身房年卡，去了十一次——平均一次 45 刀，教练说你「潜力很大」。', { money: -500, hp: 1 }, null, { cond: s => US(s) && s.age >= 22 });
L('us-camping', 20, 65, 6, '你和朋友们去露营，生了三次火才成功——山里没有信号，星星多到吓人。', { money: -150, hp: 2, hap: 4, rel: 2 }, null, { cond: s => US(s) && s.age >= 20 });

// ══════════ 社会现实 ══════════
L('us-ambulance-bill', 10, 75, 5, '那一次救护车 900 刀——「我只是晕了一下」，账单比你晕的时间还长。', { money: -900, hap: -3 }, '美国救护车平均费用 $900-$2000 且多数不_covered by 基本保险', { cond: US });
L('us-er-wait', 15, 70, 6, '急诊室等了六个小时，你看着候诊区的钟从 3 点走到 9 点——护士说「不是先到先得」。', { hp: 1, money: -300, hap: -2 }, null, { cond: US });
L('us-food-bank', 25, 65, 4, '最难的那几个月，你去食物银行领了一箱罐头——工作人员什么都没问，只是笑了下。', { money: 100, hap: -2, rel: 1 }, 'Feeding America 网络每年服务超过 4500 万人', { cond: s => US(s) && s.money < 1000 });
L('us-credit-debt', 25, 60, 5, '信用卡账单滚了半年，你签了债务合并协议——利率 24% 的教训很贵。', { money: -800, know: 2, hap: -3 }, null, { cond: s => US(s) && s.money < 2000 });
L('us-medical-bankruptcy', 35, 70, 3, '一场大病几乎掏空积蓄。医生说「人会好的」，账单说「你们家会瘦的」。', { money: -5000, hap: -5, hp: 2 }, '美国每年约 50 万例破产与医疗债务有关（公共卫生研究）', { cond: US });
L('us-gun-news', 10, 80, 6, '新闻里又是一场枪击。你下意识确认了家门锁没锁——这在很多国家不是习惯。', { hap: -2, know: 1 }, '美国每年逾 4 万人死于枪械（CDC）', { cond: US });
L('us-police-stop', 16, 60, 4, '夜间开车被临检。你把双手放在方向盘上等了十分钟——什么都没发生，但你记住了那束灯。', { hap: -2, know: 1 }, null, { cond: s => US(s) && s.age >= 16 });
L('us-small-town', 20, 70, 5, '你生活的镇上只有一家加油站、两个教堂和三个红绿灯——「熟人社会」的美国版。', { rel: 3, hap: 1 }, null, { cond: s => US(s) && s.region === '乡村' && s.age >= 20 });
L('us-mall-closed', 15, 40, 4, '镇上的购物中心彻底关门了，那家 Sears 关门前你进去买了一双打折鞋。', { hap: -1, know: 1 }, '美国购物中心数量二十年间持续萎缩（CoStar）', { cond: s => US(s) && s.age <= 40 });
L('us-military-enlist', 18, 28, 4, '你签了入伍协议。训练营八周，战友成了你一辈子的兄弟——这是条「可以读大学的路」。', { hp: 3, know: 2, money: 1500, rel: 3 }, '美军服役提供 GI Bill 教育福利', { cond: s => US(s) && s.age >= 18 && s.wealthIdx <= 2 });
L('us-veteran', 30, 70, 3, '退伍那天你领到了 GI Bill——大学学费，国家买单。你把那个文件夹摸了很久。', { know: 3, money: 2000, hap: 3 }, null, { cond: s => US(s) && s.age >= 30 });
L('us-opioid-town', 18, 45, 3, '你高中同学里，有三个没熬过那几年——止痛药把你的小镇挖走了一代人。', { hap: -5, rel: -1 }, '阿片类药物危机在小城镇尤其严重（CDC 数据）', { cond: s => US(s) && s.region === '乡村' && s.age >= 18 });
L('us-homeless-neighbor', 20, 70, 5, '街角的帐篷越来越多了。你给那位老先生买过几次咖啡，他叫 Joe，以前是木匠。', { hap: -1, rel: 1, know: 1 }, '美国无家可归者超 65 万（HUD 2023 统计）', { cond: US });
L('us-covid-memory', 5, 12, 4, '口罩三年你的整个童年都在屏幕里上课——你学会了静音键的十八种用法。', { know: 1, hap: -2 }, null, { cond: s => US(s) && s.age <= 12 });

// ══════════ 家庭与人生 ══════════
L('us-wedding-registry', 26, 40, 6, '你的婚礼走了「_registry」流程：客人们对着清单下单，砂锅和吸尘器堆成了山。', { money: 800, hap: 3, rel: 2 }, null, { cond: s => US(s) && s.spouse && s.age >= 26 });
L('us-divorce-lawyer', 35, 65, 4, '离婚律师一小时 400 刀，你们的婚姻最后变成了一场会计审计。', { money: -4000, hap: -5, rel: -2 }, '美国离婚律师平均时薪 $250-$500', { cond: s => US(s) && s.spouse && s.age >= 35, action: s => s.spouseDies() });
L('us-empty-nest', 50, 62, 6, '最后一个孩子搬出去了。你把 TA 的房间收拾了两遍，然后关灯，站在门口很久。', { hap: -3, rel: 1 }, null, { cond: s => US(s) && s.children.length > 0 && s.age >= 50 });
L('us-senior-living', 70, 90, 5, '你搬进了 senior living 社区：高尔夫小车、桥牌室和周三的 bingo 之夜。', { money: -800, hap: 2, rel: 2 }, null, { cond: s => US(s) && s.age >= 70 });
L('us-social-security', 62, 85, 6, '你的社保金每月到账。政府寄来的那张年度说明信，你终于不用扔了。', { money: 600, hap: 1 }, null, { cond: s => US(s) && s.age >= 62 });
L('us-grandkids-visit', 58, 85, 7, '孙子孙女来住了一周，走的时候你冰箱门上贴满了蜡笔画。', { hap: 6, rel: 3, money: -200 }, null, { cond: s => US(s) && s.age >= 58 });
