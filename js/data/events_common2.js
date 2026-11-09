// 通用人生深化事件 v0.5.0：学业/情感/职场/健康/财务/时代洪流 + 家人动态
// 文案手写、口语化；关键条目标注真实数据出处；weight 分层：日常 5-10、节点 12-20、灾害/罕见 2-4

export const DEEP_COMMON = [];
const L = (id, minAge, maxAge, weight, text, effect, source, extra) =>
  DEEP_COMMON.push({ id, type: 'log', minAge, maxAge, weight, text, effect: effect || {}, source, ...(extra || {}) });

// ══════════ 学业线 ══════════
L('edu-transfer', 6, 14, 5, '家里搬迁，你转到了新学校。第一周你谁都不认识，中午一个人吃饭。', { hap: -3, rel: -2, know: 1 });
L('edu-repeat', 8, 15, 3, '期末成绩单发下来，班主任找你谈话：要么留级，要么下学期拼一把。', { hap: -4, know: 1 }, null, { cond: s => s.inSchool && s.know < 55 });
L('edu-skip', 8, 13, 2, '你的成绩太突出，学校讨论让你跳一级。你既兴奋又害怕。', { know: 5, rel: -2 }, null, { cond: s => s.inSchool && s.know > 75 });
L('edu-bystander', 8, 15, 6, '你看见同学在走廊角落被人堵着，你没敢出声，装作没看见走开了。', { hap: -3, rel: -1 });
L('edu-fav-teacher', 7, 15, 6, '语文老师总让你念范文，说你「有灵气」。那学期你第一次盼着上学。', { know: 3, hap: 3 }, null, { cond: s => s.inSchool });
L('edu-wronged', 8, 15, 5, '有人打碎了教室玻璃，老师认定是你。你百口莫辩，委屈憋了一整晚。', { hap: -4, rel: -1 }, null, { cond: s => s.inSchool });
L('edu-contest', 10, 16, 5, '你在市级竞赛里拿了奖，奖状被贴在学校公告栏最中间。', { know: 4, hap: 4 }, null, { cond: s => s.inSchool && s.know > 65 });
L('edu-bad-final', 9, 15, 8, '期末成绩比想象中惨得多，你把卷子折了四折塞进书包最底下。', { hap: -3, know: -1 }, null, { cond: s => s.inSchool });
L('edu-first-day', 6, 9, 10, '开学第一天，新书包还带着塑料味，你坐在第一排紧张得不敢动。', { know: 2, hap: 1 }, null, { cond: s => s.inSchool });
L('edu-deskmate', 7, 15, 8, '你和新同桌划了「三八线」，两个月后这条线就没人记得了。', { rel: 3, hap: 2 }, null, { cond: s => s.inSchool, fill: { friend: ['小舟', '阿皓', '小满', 'Ravi', 'Emma', 'Budi', 'Zain'] } });
L('edu-duty', 8, 14, 8, '轮到你值日，你拿着扫帚把教室角落都扫了一遍，被老师夸了。', { know: 1, hap: 1 }, null, { cond: s => s.inSchool });
L('edu-trip', 7, 14, 8, '学校组织春游，大巴车上全是歌声，你吃掉了母亲准备的所有零食。', { hap: 5, rel: 2 }, null, { cond: s => s.inSchool });
L('edu-library', 10, 16, 7, '你在图书馆角落发现一整个书架的科幻小说，那个学期你把它们全看完了。', { know: 5, hap: 2 }, null, { cond: s => s.inSchool });
L('edu-cram', 10, 16, 8, '周末你被塞进了补习班，教室窗外是别的孩子在打球。', { know: 3, hap: -3 }, '「双减」前中国 K12 校外培训参与率曾超六成（教育部）', { cond: s => s.inSchool && (s.country === 'china' || s.country === 'india') });
L('edu-instrument', 7, 14, 6, '你开始学一门乐器，每天半小时，指头压出了印子，但能弹出完整的曲子了。', { know: 3, hap: 2 }, null, { cond: s => s.inSchool });
L('edu-swim', 6, 12, 6, '游泳课上你终于敢把头埋进水里了，教练在岸边为你鼓掌。', { hp: 3, hap: 3 });
L('edu-sportsday', 8, 15, 8, '运动会你跑了接力最后一棒，冲刺时全班都在吼你的名字。', { hp: 3, hap: 4, rel: 2 }, null, { cond: s => s.inSchool });
L('edu-campaign', 9, 15, 5, '你竞选班干部，上台演讲时腿有点抖，票数出来那一刻你愣住了。', { know: 2, rel: 3, hap: 2 }, null, { cond: s => s.inSchool });
L('edu-skipclass', 14, 17, 4, '你和同学翻墙出去打了半天游戏，回校门口时心跳快得像要炸开。', { hap: 3, know: -2, rel: 2 }, null, { cond: s => s.inSchool });
L('edu-exam-night', 16, 18, 7, '大考前夜你翻来覆去睡不着，脑子里全是公式和单词在打架。', { know: 1, hap: -2 }, null, { cond: s => s.inSchool });
L('edu-club', 18, 20, 9, '大学社团招新，你报了个和专业毫不相干的社团，认识了整层楼的朋友。', { rel: 4, hap: 3, know: 1 }, null, { cond: s => s.inSchool && s.age >= 18 });
L('edu-scholarship', 18, 22, 5, '你拿到了奖学金，第一件事是给家里打电话报喜。', { hap: 4, know: 2, money: 800 }, null, { cond: s => s.inSchool && s.age >= 18 && s.know > 70 });
L('edu-roommate', 18, 22, 9, '宿舍熄灯后，你们四个人躺床上聊理想聊到凌晨两点。', { rel: 4, hap: 2 }, null, { cond: s => s.inSchool && s.age >= 18 });
L('edu-thesis', 21, 23, 8, '毕业论文改到第七稿，答辩通过那刻你差点在教室里跳起来。', { know: 3, hap: 4 }, null, { cond: s => s.inSchool && s.age >= 21 });

// ══════════ 情感线 ══════════
L('love-first-sight', 13, 17, 7, '你开始注意某个人的行踪：TA 坐哪个位置、几点到教室，你都门儿清。', { hap: 3, know: -1 }, null, { fill: { name: ['林晓', '阿哲', '小雨', 'Priya', 'Arjun', 'Siti', 'Emma', 'Ayesha'] } });
L('love-note', 13, 16, 5, '你把写了三天的纸条折成小方块，塞进了 TA 的课本。一整天都没等到回音。', { hap: -2, rel: 1 });
L('love-first-date', 16, 22, 7, '你们第一次单独出去，看完电影在路边站了半小时才舍得说再见。', { hap: 5, rel: 2 });
L('love-breakup', 16, 26, 6, '你们分手了。你把聊天记录翻到最顶上，一条一条看了一整夜。', { hap: -6, know: 1 });
L('love-long-distance', 19, 28, 5, '你们开始了异地恋，每天的视频通话成了那几年最重要的事。', { hap: 2, rel: 1, money: -200 });
L('love-reject', 17, 25, 5, '你鼓足勇气表白，对方沉默了很久说「我们还是做朋友吧」。', { hap: -4, know: 1 });
L('love-anniversary', 25, 60, 6, '你们的纪念日，TA 做了一桌子菜，其中一道咸得离谱但你全吃了。', { hap: 3, rel: 2 }, null, { cond: s => s.spouse });
L('love-quarrel', 28, 65, 7, '你们为一件小事吵到深夜，谁都不肯先低头，但第二天照常一起吃了早饭。', { hap: -2, rel: 1 }, null, { cond: s => s.spouse });
L('love-proposal', 25, 38, 14, '你把戒指藏在蛋糕里——差点被 TA 咬到，但答案是「我愿意」。', { hap: 8, rel: 3 }, null, { cond: s => !s.spouse && s.age >= 25 });
L('love-wedding', 26, 40, 16, '婚礼那天你紧张到说错誓词，全场大笑，你却记得 TA 眼里的光。', { hap: 8, rel: 4, money: -3000 }, null, { cond: s => !s.spouse && s.age >= 26 });
L('love-crisis', 32, 55, 5, '你们的婚姻过了最难的坎——那段日子谁都没提「分开」两个字，但谁都想过。', { hap: -4, rel: -1 }, null, { cond: s => s.spouse });
L('love-divorce', 34, 60, 3, '你们平静地办完了手续，签字时笔尖顿了两秒。从此你们是两个家庭。', { hap: -8, rel: -3, money: -2000 }, null, { cond: s => s.spouse && s.age >= 34 });
L('love-remarry', 40, 68, 3, '你遇到了一个让你重新愿意过日子的人，婚礼很小，只有亲人。', { hap: 6, rel: 3 }, null, { cond: s => s.spouse && s.age >= 40 && s.rng.chance(0.5) });
L('love-widowed', 55, 90, 3, 'TA 走了以后，你把两个人的合影摆在了床头最显眼的位置。', { hap: -10, rel: -2 }, null, { cond: s => s.spouse && s.age >= 55, action: s => s.spouseDies() });
L('love-late-bloom', 30, 45, 4, '身边人催了几轮，你说缘分没到。这年你遇到了对的人。', { hap: 4, rel: 2 }, null, { cond: s => !s.spouse && s.age >= 30 });
L('love-childless-choice', 30, 40, 3, '你们商量了很久，决定不要孩子——这是你们自己的日子。', { hap: 2, rel: 2 }, '丁克家庭在发达国家约占两成（OECD）', null);
L('love-adopt', 30, 50, 2, '你们领养了一个孩子。第一次抱 TA 时，你的手都在抖。', { hap: 7, rel: 4 }, null, { cond: s => s.spouse && s.age >= 30, action: s => s.haveChild() });
L('love-golden', 60, 85, 5, '你们的金婚纪念日，孩子们从各地赶回来，家里第一次这么挤。', { hap: 6, rel: 4 }, null, { cond: s => s.spouse && s.age >= 60 });

// ══════════ 职场线 ══════════
L('job-interview', 22, 30, 10, '你穿着最正式的衣服去面试，手心全是汗，出门时感觉后背都湿透了。', { know: 1, hap: -1 }, null, { cond: s => !s.inSchool && !s.job && s.age >= 22 });
L('job-rejected', 22, 32, 8, '你被第七家公司拒了，面试官说你「没什么亮点」。你在楼下站了很久。', { hap: -4, know: 1 }, null, { cond: s => !s.inSchool && !s.job && s.age >= 22 });
L('job-overtime', 24, 50, 10, '项目冲刺，你连着三周九点后下班，周末也在改方案。', { money: 600, hp: -3, hap: -2 }, null, { cond: s => s.job && s.age < 60 });
L('job-boss', 24, 55, 7, '新来的领导爱开会，一小时能讲完的事开了一下午，你在本子上画了只猫。', { hap: -1, know: 0 }, null, { cond: s => s.job });
L('job-jump', 25, 50, 7, '你跳槽了。工资涨了两成，新同事问你要不要一起去吃楼下新开的面馆。', { hap: 3, money: 1500 }, null, { cond: s => s.job && s.age < 60 });
L('job-promotion', 26, 55, 6, '你升职了。消息传出后，请客的红包比工资条先到。', { hap: 5, money: 2000, know: 2 }, null, { cond: s => s.job && s.age < 60 });
L('job-office-politics', 26, 55, 6, '办公室的站队传闻满天飞，你选择两边都不沾，埋头干自己的活。', { hap: -2, know: 1 }, null, { cond: s => s.job });
L('job-travel', 25, 55, 8, '你第一次因公出差，在酒店窗前看了座陌生城市的夜景。', { hap: 2, know: 1, money: 400 }, null, { cond: s => s.job });
L('job-burnout', 28, 52, 5, '某个周日晚上，你盯着电脑屏幕忽然一个字也打不出来。你请了一周年假。', { hp: -3, hap: -4, money: -300 }, null, { cond: s => s.job });
L('job-late-career', 50, 58, 6, '年轻人学新工具比你快，你加班到半夜偷偷记笔记，第二天照样请教他们。', { know: 2, hap: -1 }, null, { cond: s => s.job && s.age >= 50 });
L('job-rehired', 60, 68, 4, '退休不到半年，老东家请你回去做顾问——他们说「这摊子离了你玩不转」。', { hap: 3, money: 1200 }, null, { cond: s => s.retired });
L('biz-start', 26, 50, 6, '你辞了稳定工作去创业。注册公司那天，你给自己发了条朋友圈：「新旅程」。', { hap: 3, know: 3, money: -5000 }, null, { cond: s => s.job || s.retired });
L('biz-fail', 27, 55, 5, '你的小店撑了一年半，关门那天你把招牌擦得干干净净才走。', { hap: -6, know: 3, money: -4000 }, null, { cond: s => s.age >= 27 });
L('biz-side', 25, 45, 7, '你下班后搞起了副业，凌晨剪视频、周末跑单，存款数字慢慢爬升。', { money: 1800, hp: -2, know: 2 }, null, { cond: s => s.job });
L('biz-success', 28, 58, 2, '你的生意终于回本了——庆祝那天，你把当年劝你别折腾的人都请到了。', { hap: 7, money: 8000 }, null, { cond: s => s.age >= 28 });
L('job-retirement-party', 58, 66, 10, '退休欢送会上，同事们给你戴了大红花。你抱着纸箱走出办公室时忽然鼻子一酸。', { hap: 2, rel: 2, know: 1 }, null, { cond: s => s.job && s.age >= 58 });
L('job-discrimination', 35, 55, 4, '你在招聘会上被以「年纪大了」为由婉拒了三家——你明明干这行二十年了。', { hap: -5 }, '年龄歧视在多国招聘中普遍存在（ILO 调查）', { cond: s => s.job === null && s.age >= 35 });
L('job-gig', 22, 45, 8, '你开始接零活：送外卖、跑代驾、摆摊。多劳多得，但风雨都得自己扛。', { money: 1200, hp: -2, hap: -1 }, '全球灵活就业者已超 4 亿（ILO 估算）', { cond: s => (!s.job || s.retired) && s.age >= 22 });
L('job-union', 25, 55, 4, '你和同事们联名向管理层提了加班费的事——谈判桌上你手一直在抖。', { hap: 2, rel: 2 }, null, { cond: s => s.job });
L('job-first-paycheck', 18, 25, 14, '你拿到人生第一笔完整工资，请全家人吃了顿饭，剩下的钱存了整存整取。', { hap: 6, rel: 3, money: 500 }, null, { cond: s => s.job && s.age <= 25 });

// ══════════ 健康线 ══════════
L('health-flu', 1, 70, 12, '流感折腾了你一整周，高烧那晚你梦见自己在雪地里走。', { hp: -4, hap: -2 }, null, { moneyText: { c: [50, 400] }, action: s => { s.money -= s.fills.c; } });
L('health-wisdom', 17, 28, 6, '智齿发炎肿了半边脸，拔牙那天你攥着椅背出了一身汗。', { hp: -2, hap: -2, money: -150 });
L('health-appendix', 8, 45, 3, '半夜剧烈腹痛，急诊诊断阑尾炎。手术很顺利，但你记住了什么叫「疼到打滚」。', { hp: -5, hap: -3, money: -800 });
L('health-fracture', 6, 50, 5, '你摔断了胳膊/腿，打石膏的日子里洗澡都要人帮忙。', { hp: -4, hap: -3, money: -500 });
L('health-burn', 3, 60, 4, '开水烫到了手，皮肤红了一大片，母亲一边涂药膏一边念叨你。', { hp: -2, hap: -1 });
L('health-insomnia', 16, 65, 8, '你连续失眠了一个月，凌晨三点的天花板看得比月亮还熟。', { hp: -3, hap: -3 });
L('health-anxiety', 18, 55, 5, '你总是莫名心慌，查了半天身体没事——医生说，去看看心理科吧。', { hap: -4, hp: -2 }, '全球约 3 亿人受焦虑障碍困扰（WHO）');
L('health-depression', 16, 60, 3, '你被确诊抑郁。吃药、复诊、坚持出门晒太阳——你说「我在学着好起来」。', { hap: -5, hp: -3, know: 2 }, '全球约 2.8 亿人患抑郁症（WHO 2023）');
L('health-therapy', 20, 60, 5, '你开始规律做心理咨询，第八次咨询后你发现自己笑得多了。', { hap: 4, money: -900 });
L('health-recover', 18, 60, 4, '复诊结果出来了：各项指标好转。你在医院门口买了杯平时舍不得的奶茶。', { hp: 4, hap: 4 });
L('health-bp', 38, 75, 7, '体检查出血压偏高，医生嘱咐少盐。你看着那袋咸菜叹了口气。', { hp: -2, know: 1, money: -100 }, null, { cond: s => s.age >= 38 });
L('health-diabetes-early', 40, 70, 5, '空腹血糖超标，你被贴上「糖尿病前期」的标签，从此米饭减了三分之一。', { hp: -2, know: 2, money: -200 }, '全球糖尿病患者已超 8 亿（《柳叶刀》2024）', { cond: s => s.age >= 40 });
L('health-checkup-bad', 45, 75, 6, '体检报告有个「建议复查」，你盯着那行小字看了十分钟才敢继续往下翻。', { hap: -4, know: 1, money: -300 }, null, { cond: s => s.age >= 45 });
L('health-checkup-ok', 40, 70, 8, '体检全部正常，医生说「继续保持」。你走出医院感觉年轻了五岁。', { hap: 3, hp: 1 }, null, { cond: s => s.age >= 40 && s.money > 400 });
L('health-quit-smoking', 25, 65, 4, '你戒了抽了十几年的烟。最难的头两周，你嘴里一直嚼着口香糖。', { hp: 5, hap: -2, money: 300 });
L('health-vaccine', 2, 70, 9, '你按时打了流感疫苗，胳膊酸了两天，但整个冬天没发烧。', { hp: 2 }, null, { cond: s => s.money > 100 });
L('health-glasses-deep', 10, 22, 8, '近视又加深了五十度，你眯着眼看新配的眼镜盒，还是看不清度数。', { know: 0, hap: -1, money: -200 }, '东亚青少年近视率超 80%（《柳叶刀》）', { cond: s => s.inSchool || s.age <= 22 });
L('health-weight', 30, 60, 7, '你站在体重秤上决定减肥。三个月后，裤子松了一圈。', { hp: 3, hap: 2 });
L('health-teeth', 40, 75, 6, '你补了三颗牙、种了一颗，结账时才明白为什么老人说「牙是最贵的器官」。', { hp: 2, money: -1500 }, null, { cond: s => s.age >= 40 && s.money > 1500 });
L('health-hosp-guard', 30, 70, 5, '你在陪护椅上守了家人三个晚上，学会了在医院走廊里睡着。', { hp: -3, rel: 2, money: -400 }, null, { cond: s => s.age >= 30 });

// ══════════ 财务线 ══════════
L('fin-savings', 20, 55, 8, '你开了个只存不取的账户。年底看余额，比想象中耐看。', { money: 1000, hap: 2 }, null, { cond: s => s.money > 500 });
L('fin-scam', 18, 65, 4, '你被「稳赚不赔」的项目骗走了一笔钱，报警后警察叹气说「又是一个」。', { money: -1500, hap: -5, know: 2 }, null, { cond: s => s.money > 1500 });
L('fin-found', 10, 60, 4, '你在路上捡到钱包，在原地等了四十分钟，物归原主时对方请你吃了顿饭。', { hap: 4, rel: 1 });
L('fin-lend-friend', 22, 55, 5, '老同学开口借钱周转，你咬牙转了。三个月后他连本带利还了，还捎了箱水果。', { money: 300, rel: 2 }, null, { cond: s => s.money > 800 });
L('fin-lend-lost', 22, 55, 4, '你借出去的钱再没回来。对方朋友圈照常晒旅游，你默默把他删了。', { money: -800, hap: -3, rel: -1 }, null, { cond: s => s.money > 800 });
L('fin-invest-loss', 28, 60, 6, '你跟风买的基金跌了三成。你关掉 APP 告诉自己「长期主义」。', { money: -1200, know: 2, hap: -3 }, null, { cond: s => s.money > 2000 });
L('fin-invest-win', 30, 60, 4, '你定投的基金终于回了本还赚了一点，你第一次理解了什么叫「复利」。', { money: 1500, know: 1, hap: 2 }, null, { cond: s => s.money > 2000 });
L('fin-lottery-small', 18, 70, 5, '你随手买的彩票中了小奖，不够一顿大餐，但兑奖那天你走路带风。', { money: 200, hap: 3 }, null, { cond: s => s.money > 100 });
L('fin-inflation', 25, 75, 7, '你常买的那家早餐店又涨价了，老板娘苦笑说「面粉又贵了」。', { money: -150, hap: -1 }, null, { cond: s => s.money > 300 });
L('fin-debt-free', 30, 55, 4, '你还清了最后一笔欠款。那天晚上你睡了这些年最踏实的一觉。', { hap: 6, money: -1000 }, null, { cond: s => s.money > 1000 });
L('fin-budget-app', 22, 45, 6, '你开始记账。第一个月发现外卖花掉了近三分之一，你吓了一跳。', { money: 500, know: 1 }, null, { cond: s => s.money > 200 });
L('fin-inherit', 45, 80, 3, '长辈留下了遗产，一家人坐下来商量分配——庆幸的是，没有人红脸。', { money: 3000, rel: 2, hap: 1 }, null, { cond: s => s.age >= 45 });
L('fin-wardrobe', 20, 60, 6, '你断舍离了一大箱旧衣服，捐给了旧衣回收箱，衣柜清爽了。', { hap: 2, know: 1 });
L('fin-cheap-find', 15, 60, 6, '你在二手市场淘到一件几乎全新的好东西，价格是原价的两成。', { money: -100, hap: 3 });

// ══════════ 时代洪流 ══════════
L('era-smartphone-first', 10, 18, 8, '你拥有了第一部智能手机。头一周你把所有 APP 都点了一遍。', { hap: 4, know: 2 }, null, { moneyText: { c: [300, 1500] }, action: s => { s.money -= s.fills.c; } });
L('era-social-media', 12, 30, 8, '你开通了社交账号，第一条动态发出去后，你每隔十分钟就刷新一次。', { hap: 2, rel: 1, know: 1 });
L('era-shortvideo', 14, 55, 9, '你刷短视频刷到凌晨一点，第二天顶着黑眼圈发誓「最后一次」。', { hap: 1, know: -1, hp: -1 });
L('era-ai-tool', 15, 60, 8, '你开始用 AI 帮你写周报、改简历、出主意——你第一次觉得「未来已来」。', { know: 3, hap: 2 }, null, { cond: s => s.age >= 15 });
L('era-remote-work', 22, 55, 6, '公司实行远程办公，你把工位搬到了阳台，效率反而高了。', { hap: 3, hp: 1 }, null, { cond: s => s.job });
L('era-online-shop', 16, 70, 9, '你第一次网购，等快递那三天每隔两小时就查一次物流。', { hap: 2, money: -150 });
L('era-food-delivery', 18, 60, 9, '外卖彻底改变了你的饮食结构——厨房成了摆设。', { money: -200, hap: 1, hp: -1 }, null, { cond: s => s.money > 300 });
L('era-ride-hailing', 20, 65, 7, '你第一次叫网约车，看着小车在地图上朝你移动，莫名有种掌控感。', { money: -50, hap: 1 }, null, { cond: s => s.money > 100 });
L('era-ev-bike', 20, 60, 6, '你换了辆电动车，充电比加油便宜太多，你逢人就安利。', { money: -800, hap: 2 }, null, { cond: s => s.money > 800 });
L('era-env-sort', 15, 70, 7, '你所在的社区开始垃圾分类，头一个月你扔袋装奶都要犹豫三秒。', { know: 2, hap: 0 });
L('era-video-call', 20, 70, 6, '你和远方的家人第一次视频通话，屏幕那头的脸清晰得让你鼻酸。', { hap: 3, rel: 2 }, null, { cond: s => s.age >= 20 });
L('era-mobile-pay', 15, 60, 8, '你出门不再带钱包——一部手机走天下，连菜市场都挂着二维码。', { know: 1, hap: 1 }, null, { cond: s => s.money > 100 });
L('era-climate-news', 12, 70, 6, '新闻里那个「百年一遇」的台风，十年内已经是第三次「百年一遇」了。', { know: 1, hap: -1 }, '极端天气事件频率显著上升（IPCC AR6）');
L('era-old-phone', 62, 85, 7, '你终于学会了用智能手机，第一件事是把孙辈的照片设成了壁纸。', { know: 2, hap: 4 }, null, { cond: s => s.age >= 62 });
L('era-vr', 18, 45, 4, '你体验了一次 VR，摘下眼镜后愣了半天——刚才那个世界太真了。', { hap: 3, know: 1, money: -100 }, null, { cond: s => s.money > 300 });
L('era-trend-diet', 20, 50, 5, '你跟风试了一种流行饮食法，坚持了三周，体重没变，钱包瘦了。', { money: -150, hap: -1, hp: 1 });

// ══════════ 家人动态：兄弟姐妹 ══════════
L('sib-rival', 3, 12, 8, '你和兄弟姐妹为了最后一块排骨「谈判」，最后一人一半。', { hap: 1, rel: 1 }, null, { cond: s => s.siblings.length > 0, fill: { name: ['大哥', '二姐', '弟弟', '妹妹'] } });
L('sib-fight', 4, 14, 8, '你和兄弟/姐妹打了一架，谁也没告状，晚上又挤在一张床上看漫画。', { rel: 2, hap: 1 }, null, { cond: s => s.siblings.length > 0 });
L('sib-drift', 15, 25, 6, '你们上了不同的学校，话越来越少，但每次回家 TA 总给你带点吃的。', { rel: 1, hap: 1 }, null, { cond: s => s.siblings.length > 0 });
L('sib-marry', 22, 45, 7, '你的姐妹出嫁/兄弟成家了，婚宴上你喝多了，抱着 TA 哭了一场。', { hap: 2, rel: 2, money: -300 }, null, { cond: s => s.siblings.length > 0 && s.age >= 22 });
L('sib-help', 25, 60, 6, '你手头紧的时候，是兄弟姐妹先转来的钱。TA 只说了句「先花着」。', { money: 600, rel: 3, hap: 2 }, null, { cond: s => s.siblings.length > 0 && s.money < 400 });
L('sib-care-parent', 40, 70, 7, '父母生病的那几年，你们兄弟姐妹排了值班表，谁也没掉链子。', { rel: 3, hp: -2, money: -500 }, null, { cond: s => s.siblings.length > 0 && s.age >= 40 });
L('sib-inherit-dispute', 50, 75, 3, '老屋拆迁款下来后，你们为分配吵得半年没说话。最后还是母亲生日饭桌上和解的。', { rel: -2, hap: -3, money: 800 }, null, { cond: s => s.siblings.length > 0 && s.age >= 50 });
L('sib-lose', 55, 90, 3, '你的兄弟/姐妹先走了。葬礼上你们几个白发人站成一排，谁都没先开口。', { hap: -8, rel: -2 }, null, { cond: s => s.siblings.length > 0 && s.age >= 55 });
L('sib-grandkids', 50, 80, 5, '兄弟姐妹家添了孙辈，家庭群里连发了三天红包。', { hap: 2, rel: 1 }, null, { cond: s => s.siblings.length > 0 && s.age >= 50 });

// ══════════ 家人动态：父母 ══════════
L('par-quarrel', 5, 18, 7, '父母又吵起来了，你把自己关进房间，把音乐开到最大。', { hap: -3 }, null, { cond: s => s.father.alive && s.mother.alive });
L('par-encourage', 7, 20, 9, '父亲看了你的成绩单，没说话，但那晚的排骨给你多夹了两块。', { hap: 3, know: 1 }, null, { cond: s => s.father.alive || s.mother.alive });
L('par-unemploy', 8, 25, 5, '父亲失业了。那阵子家里的饭菜变简单了，但他嘴上从不说难。', { hap: -3, money: -200 }, null, { cond: s => s.father.alive });
L('par-illness', 15, 50, 7, '母亲查出慢性病，从此家里的药盒按星期分格摆放。', { hap: -3, money: -300 }, null, { cond: s => s.mother.alive });
L('par-cohabit', 35, 60, 6, '父母搬来和你们同住。头一个月磨合得鸡飞狗跳，后来慢慢成了默契。', { rel: 3, hap: 1 }, null, { cond: s => (s.father.alive || s.mother.alive) && s.age >= 35 && s.children.length > 0 });
L('par-anniversary', 45, 80, 5, '父母的金婚宴上，父亲致辞时念错了年份，全场笑着替他圆场。', { hap: 3, rel: 2 }, null, { cond: s => s.father.alive && s.mother.alive && s.age >= 45 });
L('par-old-care', 45, 70, 8, '父亲走路开始需要扶东西了。你发现他不再逞强，开始听你的话了。', { hap: -2, rel: 2 }, null, { cond: s => s.father.alive && s.age >= 45 });
L('par-death-father', 35, 80, 5, '父亲走了。整理遗物时，你翻出一本他记了几十年的家庭账本。', { hap: -10, rel: -2 }, null, { cond: s => s.father.alive && s.age >= 35, action: s => { s.father.alive = false; } });
L('par-death-mother', 38, 85, 5, '母亲走了。你把她常哼的那段戏腔记了下来，怕自己以后忘。', { hap: -10, rel: -2 }, null, { cond: s => s.mother.alive && s.age >= 38, action: s => { s.mother.alive = false; } });
L('par-grave', 40, 90, 5, '每年清明你都回去扫墓。坟前的树比记忆里高了一截。', { hap: -1, rel: 1 }, null, { cond: s => (!s.father.alive || !s.mother.alive) && s.age >= 40 });

// ══════════ 家人动态：祖辈与子女 ══════════
L('gp-story', 4, 12, 8, '夏夜的院子里，祖母摇着蒲扇给你讲她年轻时候的事，蚊子比故事多。', { hap: 3, rel: 2, know: 1 });
L('gp-cook', 5, 14, 7, '祖母做的菜是全世界最好吃的——这个结论你在任何年龄都没改过口。', { hap: 3, rel: 2 }, null, { cond: s => s.age <= 14 });
L('gp-death', 12, 40, 5, '祖父母中的一位走了。你第一次明白，「人没了」是什么意思。', { hap: -6, rel: -1 });
L('gp-death-2', 20, 55, 5, '又一位老人离开了。老家的院子里从此少了一个人影。', { hap: -6, rel: -1 });
L('gp-legacy', 25, 60, 4, '祖母留下的老箱子打开，里面是一层一层码好的旧毛衣——每件都织给你的。', { hap: 2, money: 500 }, null, { cond: s => s.age >= 25 });
L('child-birth', 24, 42, 16, '你的孩子出生了。产房外的走廊上，你来回走了几千步。', { hap: 8, rel: 3, money: -800 }, null, { cond: s => s.spouse && s.age >= 24 && s.age <= 42, action: s => s.haveChild() });
L('child-first-word', 25, 45, 8, '孩子第一次喊出「爸爸/妈妈」，你激动得录了十几遍发给全家。', { hap: 6, rel: 2 }, null, { cond: s => s.children.length > 0 });
L('child-school', 28, 50, 8, '孩子上学了。你在家门口目送小书包走远，站了很久。', { hap: 2, know: 1, money: -300 }, null, { cond: s => s.children.length > 0 && s.age >= 28 });
L('child-rebel', 33, 55, 7, '孩子进入叛逆期，摔门、顶嘴、把自己锁在房间里。你学着闭嘴和等待。', { hap: -3, know: 1 }, null, { cond: s => s.children.length > 0 && s.age >= 33 });
L('child-grad', 40, 60, 7, '孩子大学毕业了，照片里 TA 笑得和你当年一样。', { hap: 5, know: 1, money: -500 }, null, { cond: s => s.children.length > 0 && s.age >= 40 });
L('child-marry', 48, 68, 7, '孩子成家了。婚礼上你致辞时笑得眼泪都出来了。', { hap: 5, rel: 2, money: -2000 }, null, { cond: s => s.children.length > 0 && s.age >= 48 });
L('child-grandchild', 50, 75, 8, '孙辈出生了。你抱着这个小东西，忽然理解了你父母当年的心情。', { hap: 7, rel: 3 }, null, { cond: s => s.children.length > 0 && s.age >= 50 });
L('child-away', 50, 75, 6, '孩子在远方定居了。视频里的 TA 越来越像你，时差却越来越难约。', { hap: -1, rel: 1 }, null, { cond: s => s.children.length > 0 && s.age >= 50 });
L('child-support', 65, 90, 6, '孩子每周都给你打电话，逢年过节雷打不动地往家寄东西。', { hap: 4, rel: 2, money: 300 }, null, { cond: s => s.children.length > 0 && s.age >= 65 });

// 家人动态合计约 60 条，加上学业/情感/职场/健康/财务/时代约 160 条

// ── 移民抉择（官方同款：出国改变一生）──
// 仅面向发展中地区的生成国；目标国按现实移民流：撒哈拉→欧美/拉美、南亚→海湾/欧美、东南亚→东亚
const MIGRATE_TARGETS = {
  SSF: ['fra', 'usa', 'gbr', 'bra', 'can'],
  SAS: ['are', 'sau', 'gbr', 'usa', 'deu'],
  MENA: ['deu', 'tur', 'sau', 'fra'],
  LCN: ['usa', 'esp', 'can', 'prt'],
  EAS: ['kor', 'jpn', 'sgp', 'usa'],
};
import { COUNTRIES as _C } from './countries.js';
DEEP_COMMON.push({
  id: 'move-abroad', type: 'choice', minAge: 18, maxAge: 38,
  cond: s => s.group && ['SSF', 'SAS', 'MENA', 'LCN'].includes(s.group) && COUNTRIES_SAFE[s.country] && !COUNTRIES_SAFE[s.country].handmade5,
  title: '一张单程票',
  text: '有人劝你出国碰碰运气——「在那边，一个月能挣这边一年的钱」。但语言、身份、和家人，都要重新开始。',
  source: '国际移民总量约 2.8 亿人，占全球人口 3.6%（UN DESA）',
  options: [
    {
      label: '走。趁着年轻去看更大的世界',
      outcome: (st) => {
        const pool = (MIGRATE_TARGETS[st.group] || ['usa', 'deu']).filter(c => COUNTRIES_SAFE[c]);
        const target = COUNTRIES_SAFE[pool[st.rng.int(0, pool.length)]] || COUNTRIES_SAFE['usa'];
        st.country = target.id; st.countryName = target.name; st.code = target.code;
        st.group = target.group; st.gdpPpp = target.gdpPpp; st.region = '城市';
        st.migrated = true;
        return `你到了${target.name}。头一年听不懂也不习惯，但你开始把这里叫「家」——带着两个家的人。`;
      },
      effect: { hap: 2, know: 3, rel: -3, money: -800 },
    },
    {
      label: '留下。这里有爸妈和熟悉的一切',
      outcome: '你留下来了。后来你偶尔会想那张没买的票——但饭桌上的笑声是真的。',
      effect: { rel: 2, hap: 1 },
    },
  ],
});
// COUNTRIES 引用安全垫（避免命名冲突）
const COUNTRIES_SAFE = _C;
// 手工五国不触发移民（有专属国别线）
for (const c of Object.values(_C)) if (['china', 'india', 'usa', 'indonesia', 'pakistan'].includes(c.id)) c.handmade5 = true;
