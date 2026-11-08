// 中国城乡深度事件线第二批 v0.5.0：~130 条
// 婚恋家庭/职场进阶/财务房产/养老晚年/时代与地域

export const DEEP_CN2 = [];
const L = (id, minAge, maxAge, weight, text, effect, source, extra) =>
  DEEP_CN2.push({ id, type: 'log', minAge, maxAge, weight, text, effect: effect || {}, source, ...(extra || {}) });
const CN = s => s.country === 'china';

// ══════════ 婚恋家庭 ══════════
L('cn-xiangqin', 25, 38, 8, '你妈托了三个阿姨帮你安排相亲——咖啡馆里对面的人和你一样，是被押送来的。', { hap: 1, rel: 1, money: -80 }, null, { cond: s => CN(s) && !s.spouse && s.age >= 25 });
L('cn-caijin-talk', 26, 35, 6, '彩礼谈判桌：两边父母客客气气地讨价还价，你和对象在桌子底下拉着手。', { money: -800, hap: -1, rel: 1 }, null, { cond: s => CN(s) && !s.spouse && s.age >= 26 });
L('cn-wedding-banquet2', 27, 38, 8, '你的婚礼：酒店十八桌、接亲车队、司机的段子、和敬酒敬到胃里冒火的新郎。', { money: -2000, hap: 4, rel: 3 }, null, { cond: s => CN(s) && s.age >= 27 });
L('cn-hongbao-collection', 28, 45, 7, '婚礼收回的份子钱是一张人情存折：每一笔都记着，「下次要还」的那天心里有数。', { money: 1200, know: 1 }, null, { cond: s => CN(s) && s.spouse && s.age >= 28 });
L('cn-two-children', 28, 40, 7, '二胎政策开放后家里开了三次「家庭会议」——最终表决权在你媳妇手里，你们有了老二。', { hap: 3, money: -500, rel: 2 }, '中国 2016 全面二孩、2021 三孩政策', { cond: s => CN(s) && s.children.length >= 1 && s.age >= 28 });
L('cn-jifa-wuyi', 30, 45, 6, '暑假孩子被送到爷爷奶奶家——「隔代抚养」是双职工家庭的全国性解决方案。', { money: -300, rel: 2, hap: 1 }, '中国隔代抚养家庭比例超三成（调查显示）', { cond: s => CN(s) && s.children.length > 0 && s.age >= 30 });
L('cn-jihuaweisi', 30, 45, 5, '你妈在小区遛弯时收集了三个「适龄女青年」的信息——「都是好孩子，你加个微信」。', { hap: -1, rel: 1 }, null, { cond: s => CN(s) && !s.spouse && s.age >= 30 });
L('cn-shuangjian-after', 8, 14, 7, '「双减」之后补习班换了马甲：托管、研学、素质营——课程表换了，焦虑没换。', { know: 1, money: -400 }, null, { cond: s => CN(s) && s.children.length > 0 && s.age >= 30 });
L('cn-parents-son-fang', 26, 35, 5, '婚房首付掏空了双方父母的积蓄——「六个钱包」买了一套写你名字的房子。', { money: 2000, hap: 2 }, null, { cond: s => CN(s) && s.age >= 26 });
L('cn-ai-ren-jia', 25, 35, 5, '对象第一次上门：你妈提前一周打扫，做了一桌菜，紧张得像面试官。', { hap: 3, rel: 2 }, null, { cond: s => CN(s) && !s.spouse && s.age >= 25 });

// ══════════ 职场进阶 ══════════
L('cn-shiyongqi', 22, 28, 8, '试用期三个月：你把「您好」说得比家人都多，把工位擦得比家里都亮。', { know: 2, money: 400 }, null, { cond: s => CN(s) && s.job && s.age <= 28 });
L('cn-wuxianyijin', 22, 60, 7, '第一份工作的五险一金：公积金账户里那个数字，是你在城市扎根的第一颗种子。', { money: 200, know: 1 }, null, { cond: s => CN(s) && s.job && s.age >= 22 });
L('cn-nianzhongjiang', 23, 58, 8, '年终奖到账的短信比任何情话都动人——你截了图，先发给了爸妈。', { money: 1200, hap: 3 }, null, { cond: s => CN(s) && s.job && s.age >= 23 });
L('cn-996-days', 24, 40, 7, '项目上线那三个月，你十一点下班是常态——公司楼下保安都认识你了，还帮你留车位。', { money: 800, hp: -3, hap: -2 }, null, { cond: s => CN(s) && s.job && s.region === '城市' && s.age <= 40 });
L('cn-caiyuan-peichang', 28, 50, 5, '裁员谈判，你拿到了 N+1——签完字走出园区，你在门口站了十分钟才打车。', { money: 3000, hap: -3, know: 1 }, null, { cond: s => CN(s) && s.job && s.age >= 28, action: s => { s.job = null; } });
L('cn-kaogong-2', 22, 32, 7, '你加入了考公大军：行测申论、刷题群、「上岸」这个词是你的年度关键词。', { know: 3, hap: -1 }, '国考报名人数连年超 200 万，最热岗位竞争比超 1000:1', { cond: s => CN(s) && s.age <= 32 });
L('cn-tizhi-shang-an', 24, 34, 4, '考公上岸那天你请全家吃了饭——「稳定」两个字，在长辈心里值千金。', { know: 2, hap: 4, money: 300 }, null, { cond: s => CN(s) && s.age >= 24 && s.know > 65 });
L('cn-baitian-shangban', 26, 45, 6, '白天上班晚上摆摊：烧烤、袜子、手机贴膜——「搞副业」是成年人的新必修课。', { money: 500, hp: -1, hap: 1 }, null, { cond: s => CN(s) && s.job && s.age >= 26 });
L('cn-didi-driver2', 26, 55, 6, '你跑了一年网约车：早晚高峰、导航绕路、和乘客聊完一车的人生。', { money: 700, hp: -2, know: 1 }, null, { cond: s => CN(s) && s.age >= 26 });
L('cn-factory-line2', 18, 45, 6, '工厂流水线：两班倒、计件工资、宿舍八人间——你在电子厂拧了半年螺丝。', { money: 500, hp: -2, hap: -1 }, null, { cond: s => CN(s) && s.wealthIdx <= 2 && s.age >= 18 });
L('cn-hometown-startup', 26, 40, 5, '你回乡创业：电商卖农产品——「乡村振兴」的文件里，第一次出现了你家的果园。', { money: 800, know: 2, hap: 3 }, null, { cond: s => CN(s) && s.region === '乡村' && s.age >= 26 });
L('cn-shetuan-tuanjian', 23, 40, 6, '公司团建：爬山、拓展、篝火晚会——「自愿参加」，但考勤。', { hap: 1, rel: 2, hp: -1 }, null, { cond: s => CN(s) && s.job && s.age <= 40 });
L('cn-workplace-guru', 25, 50, 5, '办公室的老张退休前教你三招：「汇报留痕、开会带本、话别说满」——用了一辈子。', { know: 3, rel: 2 }, null, { cond: s => CN(s) && s.job && s.age >= 25 });

// ══════════ 财务房产 ══════════
L('cn-mortgage-30y', 28, 40, 8, '三十年房贷签下来那刻，你的手是抖的——「每月还款日」从此是人生最稳定的约会。', { money: 1500, hap: 1 }, null, { cond: s => CN(s) && s.house && s.age >= 28 });
L('cn-house-appreciation', 30, 55, 6, '你那套房子账面涨了——邻居们聊天永远绕不开「早知道多买一套」。', { money: 2000, hap: 2, know: 1 }, null, { cond: s => CN(s) && s.house && s.age >= 30 });
L('cn-house-correction', 35, 60, 5, '房价开始回调，中介的电话少了一半——你算了算账面，决定「不看就不亏」。', { money: -1000, hap: -2, know: 1 }, null, { cond: s => CN(s) && s.house && s.age >= 35 });
L('cn-early-repayment', 35, 55, 5, '你提前还了一笔房贷——银行柜员说「这是今年第三笔」，你们的表情都很复杂。', { money: -1000, hap: 2 }, null, { cond: s => CN(s) && s.house && s.money > 2000 });
L('cn-yuebao-era', 22, 50, 6, '你把钱放进了货币基金——「每天有一块八的利息进账」让你体验了一阵「睡后收入」。', { money: 100, know: 1, hap: 1 }, null, { cond: s => CN(s) && s.age >= 22 });
L('cn-fund-green', 28, 55, 6, '你的基金绿了一个季度——群里的大 V 删了动态，你学会了「定投」和「闭眼」。', { money: -500, know: 2, hap: -2 }, null, { cond: s => CN(s) && s.age >= 28 });
L('cn-p2p-collapse', 28, 50, 3, 'P2P 平台爆雷了，你本金的一半消失在一场「金融创新」里——国家帮你追回了三成。', { money: -800, know: 2, hap: -3 }, null, { cond: s => CN(s) && s.age <= 50 });
L('cn-lottery-station2', 22, 70, 6, '彩票站你每周买两注——「中五百万」的规划你做了十年，中过的最大奖是二十块。', { money: -50, hap: 1 }, null, { cond: CN });
L('cn-gongjijin-withdraw', 30, 55, 5, '公积金提取成功：装修用的那笔钱到账时，你给银行系统点赞了——「这钱终于变成了我的」。', { money: 800, hap: 2 }, null, { cond: s => CN(s) && s.house && s.age >= 30 });
L('cn-digital-rmb2', 20, 60, 5, '你用数字人民币付了一碗面——「新的支付方式又来了」，老板娘比你还熟练。', { know: 1, hap: 1 }, null, { cond: s => CN(s) && s.age >= 20 });

// ══════════ 养老晚年 ══════════
L('cn-yanglao-jin', 58, 75, 8, '退休金每月十五号到账——你学会了在手机上查「社保卡余额」，比查股票勤。', { money: 600, hap: 2 }, null, { cond: s => CN(s) && s.age >= 58 });
L('cn-delayed-retire2', 55, 65, 6, '延迟退休政策落地，你的退休年龄被「顺延」——同事群里哀嚎一片，你默默改了计划。', { hap: -2, know: 1 }, '中国渐进式延迟法定退休年龄改革', { cond: s => CN(s) && s.age >= 55 });
L('cn-laonian-daxue', 60, 80, 6, '老年大学你报了书法班——同桌是个退休教师，你们互相点评对方的「永字八法」。', { know: 2, hap: 3, rel: 2, money: -100 }, null, { cond: s => CN(s) && s.age >= 60 });
L('cn-shequ-shitang', 65, 85, 6, '社区食堂一顿十二块：两荤一素汤管够——你和老伙计们占了靠窗那桌。', { money: -150, hap: 2, rel: 2 }, null, { cond: s => CN(s) && s.age >= 65 });
L('cn-yanglaoyuan-visit', 70, 88, 5, '子女带你考察了养老院：护工年轻、饭菜清淡、活动表贴满了墙——「以后我可能住这儿」。', { hap: 1, know: 1, money: -300 }, null, { cond: s => CN(s) && s.age >= 70 });
L('cn-taiji-morning', 55, 90, 7, '清晨的公园太极队，你是新来的——领队大爷说「意到气到」，你只听懂了「慢一点」。', { hp: 2, hap: 2, rel: 2 }, null, { cond: s => CN(s) && s.age >= 55 });
L('cn-xiayi-generation', 60, 85, 5, '独生子女的一代：你和老伴互相照顾，孩子在外地——视频通话成了每天的必修课。', { rel: 2, hap: 1 }, '中国第一代独生子女父母正进入养老高峰', { cond: s => CN(s) && s.age >= 60 });
L('cn-gugong-visit', 55, 90, 5, '你终于去了一趟故宫——人多、砖旧、屋檐好看，你拍了张照片发家族群，收获十八个赞。', { money: -200, hap: 3, know: 2 }, null, { cond: s => CN(s) && s.age >= 55 });

// ══════════ 时代与地域 ══════════
L('cn-shuang11-checkout', 20, 55, 7, '双十一凌晨你蹲点付尾款——省了八十块，花了三千块，还会莫名其妙多买一箱纸巾。', { money: -300, hap: 2 }, null, { cond: s => CN(s) && s.age >= 20 });
L('cn-shuang11-return', 21, 55, 5, '双十一的第二天你申请了七个退货——「冲动是魔鬼，七天无理由是天使」。', { money: 200, know: 1 }, null, { cond: s => CN(s) && s.age >= 21 });
L('cn-newenergy-car', 28, 60, 6, '你换了辆绿牌电动车——省油钱、上牌快、静音到让人不适应，后排娃爱得不行。', { money: -2000, hap: 3 }, '中国新能源汽车渗透率已过五成（中汽协）', { cond: s => CN(s) && s.region === '城市' && s.age >= 28 });
L('cn-passport-trip', 25, 65, 5, '你办了护照，第一站去了东南亚——「出国原来这么近」，入境章盖下那刻你笑了。', { money: -800, hap: 4, know: 2 }, null, { cond: s => CN(s) && s.age >= 25 });
L('cn-guguo-chao', 20, 50, 6, '你买了国潮牌的卫衣和运动鞋——「中国设计」这四个字，穿在身上理直气壮。', { money: -300, hap: 2 }, null, { cond: s => CN(s) && s.age <= 50 });
L('cn-yuchuan-medic', 30, 70, 5, '老家通了高铁，回县城从一天变成三小时——你爸在站台上，第一次觉得「儿子离家近了」。', { money: -150, hap: 3, rel: 2 }, '中国高铁运营里程全球第一（超 4.5 万公里）', { cond: s => CN(s) && s.age >= 30 });
L('cn-south-heating', 10, 70, 6, '南方冬天靠「一身正气」取暖：被子里、电热毯、暖手宝——北方的朋友不理解。', { hp: -1, hap: 1 }, null, { cond: s => CN(s) && s.age >= 10 });
L('cn-north-sauna', 15, 75, 5, '北方澡堂搓澡师傅的三下五除二——第一次体验的你出来时感觉自己轻了二斤。', { hp: 1, hap: 2, money: -30 }, null, { cond: s => CN(s) && s.age >= 15 });
L('cn-village-loudspeaker', 10, 70, 5, '村口大喇叭通知：「今晚七点村委开会，各家来人」——这声音你从小听到大。', { rel: 1, know: 0 }, null, { cond: s => CN(s) && s.region === '乡村' });
L('cn-zhen-shang-ganji', 8, 60, 6, '镇上赶集：五天一集，卖啥的都有——你买过菜苗、棉鞋和人生第一只小鸡。', { money: -50, hap: 2 }, null, { cond: s => CN(s) && s.region === '乡村' && s.age >= 8 });
L('cn-spring-festival-travel2', 22, 60, 7, '春运高铁上你抢到了靠窗座——过道里站着的小伙子拎着大包小包，你把行李往里挪了挪。', { money: -300, hap: 1, rel: 1 }, '春运单周期客流可达数十亿人次（交通运输部）', { cond: s => CN(s) && s.age >= 22 });
L('cn-ai-course', 15, 45, 6, '你报了 AI 兴趣课：提示词、模型、微调——「会用 AI 的人不会被淘汰」是这代人的信仰。', { know: 3, money: -200 }, null, { cond: s => CN(s) && s.age >= 15 });
L('cn-esports-dream', 13, 22, 4, '你认真考虑过打职业电竞——段位确实高，但爸妈说「先把书读完」，梦想进了收藏夹。', { hap: 1, know: 1 }, null, { cond: s => CN(s) && s.age <= 22 });
L('cn-e-scooter-rule', 16, 60, 5, '电动车新规：头盔、牌照、限速——你买了人生第一个头盔，是粉色的（没得选）。', { money: -80, hp: 1, know: 1 }, null, { cond: s => CN(s) && s.age >= 16 });
L('cn-community-volunteer', 25, 70, 5, '你注册了社区志愿者：防疫站过岗、暴雨夜守过闸——「红马甲」穿上就脱不下来了。', { rel: 2, hap: 2, know: 1 }, null, { cond: s => CN(s) && s.age >= 25 });
