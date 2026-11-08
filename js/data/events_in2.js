// 印度深度事件线 v0.5.0：~115 条
// 板球/宝莱坞/IIT/UPSC/联合家庭/节庆/海湾劳务，真实印度社会结构

export const DEEP_IN = [];
const L = (id, minAge, maxAge, weight, text, effect, source, extra) =>
  DEEP_IN.push({ id, type: 'log', minAge, maxAge, weight, text, effect: effect || {}, source, ...(extra || {}) });
const IN = s => s.country === 'india';

// ══════════ 童年与节庆 ══════════
L('in-gully-cricket', 6, 14, 12, '巷子里的板球：一支木棍、一只网球加半截砖头当桩，你打出了人生第一个「six」。', { hp: 3, hap: 4, rel: 2 }, null, { cond: IN });
L('in-diwall-lamps', 5, 80, 9, '排灯节的晚上，你们家窗台摆满了 oil lamp，烟花从天黑响到半夜。', { hap: 5, rel: 3, money: -100 }, '排灯节（Diwali）为印度最盛大节日', { cond: IN });
L('in-holi-colors', 5, 60, 8, '洒红节你被邻居孩子们泼成了彩虹，回家路上连狗都没认出你。', { hap: 5, rel: 2 }, null, { cond: IN });
L('in-bollywood-dance', 8, 25, 8, '婚宴上你被亲戚推上台跳宝莱坞歌舞——「Dola Re」的前奏一响，全村人都在跳。', { hap: 4, rel: 3 }, null, { cond: IN });
L('in-temple-prasad', 4, 70, 8, '每周你跟祖母去寺庙，回来时手里总有一把 prasad——甜的，温的，带着祝福。', { hap: 2, rel: 2 }, null, { cond: IN });
L('in-joint-meals', 4, 16, 8, '爷爷奶奶、叔叔婶婶、堂兄堂妹十一个人围着一张桌吃饭，dal 和 roti 永远轮着添。', { rel: 4, hap: 3 }, null, { cond: IN });
L('in-rain-day-off', 6, 16, 7, '季风把街淹成了河，学校停课——你在窗边看雨，妈妈在数屋顶接水的盆。', { hap: 2, know: 0 }, null, { cond: IN });
L('in-hindi-english', 6, 16, 7, '你同时学三门语言：印地语、母语方言、还有英语——「英语说得好，工作就好找」。', { know: 3, hap: 1 }, '印度三语教育政策', { cond: IN });
L('in-private-school', 5, 15, 6, '父母咬牙把你送进了私立英语学校，学费占去家收入两成——「不能输」。', { know: 3, money: -400 }, null, { cond: s => IN(s) && s.wealthIdx >= 2 });
L('in-govt-school', 5, 15, 6, '公立学校一个班六十人，老师照本宣科——但米餐是热的，你把午餐吃完才回家。', { know: 1, hap: 1 }, '印度公立学校提供免费午餐（Mid-Day Meal 计划）', { cond: s => IN(s) && s.wealthIdx <= 2 });
L('in-auto-rickshaw', 10, 60, 7, '突突车挤了六个人、一只鸡和一筐菜，司机在坑洼路面上开出了漂移的感觉。', { money: -20, hap: 1 }, null, { cond: IN });
L('in-well-water', 5, 18, 6, '夏天停水，你跟邻居们围着公用水龙头排队——水桶就是社交货币。', { hp: -1, rel: 1 }, null, { cond: s => IN(s) && s.region === '乡村' && s.age <= 18 });

// ══════════ 中学与应试 ══════════
L('in-board-exam-10', 15, 16, 10, '十年级 board exam 是人生第一道大关：亲戚们从分数出来那天起就开始打电话。', { know: 3, hap: -2 }, '印度 10 年级全国统考（CBSE Board Exam）', { cond: s => IN(s) && s.age >= 15 });
L('in-iit-coaching', 15, 18, 8, '你进了 IIT 备考班：早上五点起，晚上十一点睡，题库里躺着一万道题。', { know: 5, hap: -3, money: -500 }, 'IIT-JEE 录取率约 2%，被称为全球最激烈入学考试', { cond: s => IN(s) && s.age >= 15 });
L('in-jee-result', 17, 18, 6, 'JEE 放榜那晚，全家围着电脑——你考进 IIT 的那一刻，父亲的眼泪没忍住。', { know: 4, hap: 8, rel: 3 }, null, { cond: s => IN(s) && s.age >= 17 && s.know > 75 });
L('in-board-exam-12', 17, 18, 9, '十二年级 board exam，考场外的父母比考生还多——你妈给你塞了第三支备用笔。', { know: 2, hap: -1 }, null, { cond: s => IN(s) && s.age >= 17 });
L('in-cricket-selection', 12, 18, 4, '区队板球选拔你打出了全场最快球速——教练记下了你的名字。', { hp: 3, hap: 5, rel: 1 }, null, { cond: s => IN(s) && s.age <= 18 });
L('in-tuition-teacher', 14, 18, 6, '你给邻居家小孩补课赚零花钱——「老师」这个称呼你比同龄人早听了十年。', { money: 150, know: 1 }, null, { cond: s => IN(s) && s.age >= 14 });

// ══════════ 大学 ══════════
L('in-iit-life', 18, 21, 6, 'IIT 宿舍的 mess 食堂永远是 dal、sabzi、roti 三件套，你靠 maggi 面活着。', { know: 4, rel: 3, hap: 1 }, null, { cond: s => IN(s) && s.inSchool && s.age >= 18 && s.know > 75 });
L('in-eng-default', 18, 20, 8, '「工程或医学」是你人生的默认选项——你选了 B.Tech 计算机，全家签字通过。', { know: 3, hap: 0 }, null, { cond: s => IN(s) && s.inSchool && s.age >= 18 });
L('in-first-laptop', 18, 22, 6, '你买了人生第一台笔记本，35000 卢比，分期——这台机器后来陪你写了四年代码。', { money: -500, know: 2, hap: 3 }, null, { cond: s => IN(s) && s.inSchool });
L('in-campus-placement', 21, 23, 8, '校园招聘日，IT 公司组团来抢人——你拿到了 offer，起薪是父亲退休金的四倍。', { money: 1000, know: 2, hap: 5 }, '印度 IT 校招每年吸纳数十万工程师', { cond: s => IN(s) && s.inSchool && s.age >= 21 });
L('in-mbbs-path', 18, 24, 5, '你走上了 MBBS 的路：五年医学、一年实习——白大褂第一次上身那晚你拍了个照。', { know: 5, hap: 2, money: -300 }, null, { cond: s => IN(s) && s.inSchool && s.know > 70 });

// ══════════ 职场 ══════════
L('in-it-cubicle', 22, 55, 9, '班加罗尔的写字楼格子间里，你和三百个工程师敲着键盘——楼下茶摊的 chai 是灵魂补给。', { money: 900, know: 1, hap: 0 }, '印度 IT 服务业年营收超 2500 亿美元（NASSCOM）', { cond: s => IN(s) && s.job && s.age >= 22 });
L('in-onsite-onsite', 25, 40, 5, '你被外派去美国项目现场——同批人是十二个，签证抽中的只有你。', { money: 2500, know: 2, hap: 3 }, null, { cond: s => IN(s) && s.job && s.age >= 25 && s.know > 65 });
L('in-gulf-labor', 20, 45, 7, '你去了海湾国家打工：迪拜的烈日、集装箱宿舍、每月往家汇的卢比。', { money: 1800, hp: -3, rel: -2 }, '印度是全球最大侨汇接收国，年入超 1200 亿美元（世界银行）', { cond: s => IN(s) && !s.inSchool && s.age >= 20 });
L('in-upsc-dream', 21, 30, 6, '你加入了 UPSC 备考行列——「公务员」在印度是神坛职业，录取率万分之一。', { know: 4, hap: -2 }, '印度 UPSC 公务员考试录取率约 0.1%-0.2%，全球最难之一', { cond: s => IN(s) && s.age >= 21 });
L('in-upsc-clear', 24, 32, 3, 'UPSC 放榜，你的名字在名单上。村里贴了海报，母亲把你的照片供在了神龛旁。', { know: 3, hap: 9, rel: 4, money: 500 }, null, { cond: s => IN(s) && s.age >= 24 && s.know > 80 });
L('in-railway-exam', 20, 32, 5, '铁路招聘「百万申请百岗位」，你排进了这支史上最长求职队伍。', { know: 2, hap: -1 }, '印度铁路一次招聘曾收到 2300 万份申请', { cond: s => IN(s) && s.age >= 20 });
L('in-bollywood-extra', 18, 30, 4, '你在孟买做过群演：一场婚礼戏跳了十四个小时——片尾字幕没有你的名字，但录像里有你的笑。', { money: 200, hap: 2, hp: -1 }, null, { cond: s => IN(s) && s.age <= 30 });
L('in-call-center', 19, 35, 7, '夜班呼叫中心里你起了个英文名「Sam」——客户不知道你正喝着第三杯 chai。', { money: 600, know: 2, hp: -2 }, null, { cond: s => IN(s) && s.age <= 35 && s.job });
L('in-farm-family', 8, 60, 8, '农忙全家下田：季风来之前必须播种，你和父亲在天黑前种完了最后两亩。', { hp: -2, money: 200, rel: 2 }, null, { cond: s => IN(s) && s.region === '乡村' });
L('in-bore-well', 20, 50, 5, '村里打了第二口深井——地下水位一年比一年低，父亲的眉头也是。', { money: -300, know: 1 }, '印度地下水超采为全球最严重国家之一（世界银行）', { cond: s => IN(s) && s.region === '乡村' && s.age >= 20 });
L('in-startup-night', 24, 40, 5, '你加入了班加罗尔一家初创公司——期权、披萨、凌晨两点的代码和「下一个 Flipkart」的梦。', { money: 500, know: 3, hap: 1 }, null, { cond: s => IN(s) && s.job && s.age <= 40 });

// ══════════ 家庭 ══════════
L('in-arranged-meeting', 23, 32, 8, '包办相亲：两家客厅、一杯 chai、二十分钟的「自由交谈」——你妈在厨房竖着耳朵。', { hap: 1, rel: 2 }, '印度多数婚姻仍由家庭安排（多项社会调查）', { cond: s => IN(s) && !s.spouse && s.age >= 23 });
L('in-wedding-1000', 24, 36, 8, '你的婚宴来了一千人：三个宴会厅同时开席，你换了三套衣服，认了半年人才认全亲戚。', { money: -2500, hap: 4, rel: 3 }, null, { cond: s => IN(s) && s.age >= 24 });
L('in-joint-living', 25, 50, 7, '婚后你和公婆住在一起——「联合家庭」意味着三个 mother-in-law 视角的早上。', { rel: 2, hap: -1 }, null, { cond: s => IN(s) && s.spouse && s.age >= 25 });
L('in-daughter-born', 25, 40, 6, '女儿出生了。祖母抱着她哭了——这次是喜极而泣，「新时代的女孩一样撑起家」。', { hap: 6, rel: 3 }, null, { cond: s => IN(s) && s.children.length > 0 && s.age >= 25 });
L('in-relatives-visit', 20, 70, 8, '亲戚「顺路来访」——在印度，这可能是二十个人，两顿饭，和一整天的热闹。', { rel: 2, hap: 1, money: -150 }, null, { cond: IN });
L('in-gold-jewelry', 25, 55, 6, '母亲开始为你的婚事攒金饰——在印度，黄金既是嫁妆，也是「移动的存款」。', { money: -400, know: 1 }, '印度家庭黄金持有量全球第一', { cond: s => IN(s) && s.age >= 25 });
L('in-son-duty', 45, 75, 7, '赡养父母是长子的义务。你把工资的一部分雷打不动寄回家——「这是循环，不是负担」。', { money: -300, rel: 3, hap: 1 }, null, { cond: s => IN(s) && s.age >= 45 });

// ══════════ 社会现实 ══════════
L('in-train-crowd2', 16, 65, 8, '通勤火车进站时，你学会了印度式上车法：先挤，再找立足点，最后感谢天花板。', { hp: -1, know: 0 }, null, { cond: IN });
L('in-power-cut', 5, 70, 9, '又一次停电。你点起蜡烛写作业，隔壁的发电机轰鸣像固执的蚊子。', { know: 1, hap: -1 }, null, { cond: IN });
L('in-dh-water', 25, 70, 6, '水罐车每周来两次，全村的铁皮桶排队——「水务冲突」是这个夏天最热的话题。', { hp: 0, rel: 1 }, null, { cond: s => IN(s) && s.region === '乡村' && s.age >= 25 });
L('in-govt-hospital', 25, 75, 7, '公立医院走廊里躺满了人。你排了六个小时，最后拿到的药——免费，但药盒上印着「捐赠」。', { hp: 1, money: -20, hap: -1 }, null, { cond: IN });
L('in-delhi-smog', 10, 70, 6, '十一月，雾霾把太阳糊成了一枚硬币。你戴上了那只有点漏气的口罩。', { hp: -2, know: 1 }, '印度北部冬季 PM2.5 常年爆表（IQAir）', { cond: IN });
L('in-reservation-quota', 17, 22, 5, '大学的保留配额制度决定了你的座位——「出身」在这里是政策词汇。', { know: 1, hap: 0 }, '印度宪法保留配额制（Reservation）覆盖教育公职', { cond: s => IN(s) && s.inSchool && s.age >= 17 });
L('in-night-caution', 16, 45, 5, '天黑后你不独自走偏僻的路——姐姐在电话里说「到家了再说」，这是约定。', { hap: 0, know: 1 }, null, { cond: s => IN(s) && s.gender === 'female' && s.age >= 16 });
L('in-chai-break', 16, 70, 9, '街角的 chai 摊两卢比一杯：玻璃杯烫手，姜味呛喉——印度的社交宇宙中心。', { money: -10, hap: 2, rel: 1 }, null, { cond: IN });
L('in-cow-traffic', 10, 70, 7, '路口的神牛慢悠悠横穿马路，所有车都在等——包括赶时间的公交车司机。', { hap: 1, know: 0 }, null, { cond: IN });
L('in-festival-sweets', 4, 80, 8, '节日的甜食篮子在你家客厅转了一圈：laddu、barfi、jalebi——你一样拿了一个。', { hap: 3, rel: 2 }, null, { cond: IN });
L('in-mobile-data', 15, 40, 7, '4G 数据费跌到白菜价那天起，你奶奶也开始看短视频了——YouTube 订阅了三个频道。', { know: 1, hap: 2 }, '印度移动数据资费全球最低（Trai）', { cond: s => IN(s) && s.age <= 40 });
L('in-upi-payment', 16, 60, 7, '连街边卖菜的阿婆都挂出了 UPI 收款码——纸币在印度的进化速度快过很多国家。', { know: 1, hap: 1 }, '印度 UPI 月交易量超百亿笔（NPCI）', { cond: s => IN(s) && s.age >= 16 });

// ══════════ 老年 ══════════
L('in-retire-ashram', 60, 85, 4, '你考虑过搬到圣城瓦拉纳西养老——恒河边上，日出、冥想和一生最后的平静。', { hap: 3, know: 2 }, null, { cond: s => IN(s) && s.age >= 60 });
L('in-grandkid-name', 55, 80, 5, '孙辈的起名仪式上，祖父把家族传了三代的名字给了这个小家伙。', { hap: 5, rel: 3 }, null, { cond: s => IN(s) && s.children.length > 0 && s.age >= 55 });
L('in-pilgrimage', 55, 85, 5, '你完成了那趟想了半辈子的朝圣：四十五天，四个圣地，一副走坏的膝盖。', { hap: 5, know: 2, hp: -1 }, null, { cond: s => IN(s) && s.age >= 55 });
