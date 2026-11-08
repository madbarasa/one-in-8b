// 通用人生深化第二批 v0.5.0：~150 条
// 学业/情感/职场/健康/财务/时代洪流再补充，适用五国

export const DEEP_COMMON2 = [];
const L = (id, minAge, maxAge, weight, text, effect, source, extra) =>
  DEEP_COMMON2.push({ id, type: 'log', minAge, maxAge, weight, text, effect: effect || {}, source, ...(extra || {}) });

// ══════════ 学业补充 ══════════
L('edu2-spelling-bee', 7, 13, 6, '拼写比赛你站到了最后一轮——聚光灯下，那个词怎么都想不起第三个字母。', { know: 2, hap: 1 });
L('edu2-library-card', 7, 16, 6, '你办了人生第一张借书证，一次能借三本——你抱回家的书从没按时还过。', { know: 3, hap: 1 });
L('edu2-new-deskmate', 7, 15, 7, '换了新同桌：前两周互相看不顺眼，第三周开始分享零食，从此成了十年好友。', { rel: 4, hap: 2 });
L('edu2-science-lab', 10, 16, 6, '第一节化学实验课，试管里的颜色变了——「科学」两个字从课本里站了起来。', { know: 3, hap: 2 });
L('edu2-school-play', 9, 16, 6, '你被选进了校园剧当配角——三句台词你练了一个月，演出那天一句没忘。', { hap: 3, rel: 2, know: 1 });
L('edu2-homework-night', 10, 15, 7, '作业写到十一点，你趴在桌上睡着了，第二天交上去的本子上有一片口水印。', { know: 1, hap: -1, hp: -1 });
L('edu2-lost-textbook', 8, 15, 5, '新课本丢了，你把同桌的抄了一半——「 photocopy 的友谊最牢固」。', { know: 1, rel: 1, money: -50 });
L('edu2-exam-anxiety', 12, 22, 6, '大考前夜你翻来覆去睡不着，脑子里把错题重做了一百遍——第二天反而发挥超常。', { know: 2, hap: -1 });
L('edu2-teacher-retire', 8, 17, 4, '你最喜欢的老师退休了。最后一课她说「你们要记得，分数不是全部」。全班哭了。', { hap: -1, know: 2, rel: 2 });
L('edu2-scholarship-2', 16, 24, 5, '你申请到了助学金/奖学金——通知书上那行数字，替家里扛了一学期。', { know: 2, money: 800, hap: 3 });
L('edu2-night-study', 15, 22, 6, '考前通宵的你和凌晨四点的便利店店员成了点头之交——他开始给你留热包子。', { know: 2, hp: -1, rel: 1 });
L('edu2-drop-club', 13, 20, 5, '你退掉了坚持三年的兴趣班——「不是所有的坚持都值得」，那晚你有点难过。', { hap: -2, know: 1 });
L('edu2-field-trip', 9, 16, 6, '校外教学你掉队了半小时，看见了此行最难忘的东西——一只真实世界的松鼠。', { hap: 3, know: 1 });
L('edu2-last-exam', 17, 23, 6, '人生最后一场校园考试交卷铃响——你走出教室，阳光好得不像话，青春在那刻归档。', { know: 1, hap: 4 });

// ══════════ 情感补充 ══════════
L('love2-confession', 14, 22, 6, '你鼓足勇气说了那句话——对方愣了三秒，笑了：「我等你这句话很久了。」', { hap: 6, rel: 3 });
L('love2-rejected', 15, 25, 5, '你被拒绝了。「你是个好人」这四个字，你花了一个夏天才消化完。', { hap: -4, know: 1 });
L('love2-long-distance', 20, 35, 5, '异地恋：时差、视频和「晚安」的重复——最远的距离是你说的「等我」。', { hap: 1, rel: 2, money: -200 });
L('love2-first-fight', 20, 40, 6, '你们第一次吵架，为一件小事冷战了三天——第四天谁都没提，但谁都知道过去了。', { hap: -2, rel: 1 });
L('love2-anniversary', 24, 70, 6, '你们在同一个地方拍了周年照——照片里的人在变老，背景在变新，手一直牵着。', { hap: 4, rel: 3, money: -100 }, null, { cond: s => s.spouse });
L('love2-single-pressure', 28, 40, 6, '亲戚聚会的固定议题是你的感情状态——你练就了一笑而过的专业级微笑。', { hap: -2, know: 1 }, null, { cond: s => !s.spouse && s.age >= 28 });
L('love2-partner-illness', 30, 75, 4, 'TA 生病的那段日子，你学会了量体温、熬粥和把「没事」说得像真的一样。', { hap: -2, rel: 3, hp: -1 }, null, { cond: s => s.spouse && s.age >= 30 });
L('love2-old-couple', 65, 90, 6, '你们老得走不动远路了，就每天在楼下走两圈——「走吧」，TA 递过拐杖说。', { hap: 4, rel: 3, hp: 1 }, null, { cond: s => s.spouse && s.age >= 65 });
L('love2-crush-married', 30, 60, 4, '你的初恋结婚了。你看到请柬那天平静地吃完了晚饭——成长大概就是这样。', { hap: -1, know: 1 });
L('love2-meeting-again', 35, 70, 4, '同学会上你和那个人重逢——聊了十分钟，你们都在笑，也都没提当年。', { hap: 2, rel: 1, know: 1 });

// ══════════ 职场补充 ══════════
L('job2-first-salary', 20, 26, 8, '第一笔工资到账的短信你看了五遍——请了全家吃饭，剩下的钱买了双好鞋。', { money: 500, hap: 4, rel: 2 }, null, { cond: s => s.job && s.age <= 26 });
L('job2-office-politics', 25, 55, 6, '办公室政治：两个领导暗中较劲，你被迫站队——你选择了认真干活那一队。', { hap: -2, know: 2 }, null, { cond: s => s.job && s.age >= 25 });
L('job2-mentor', 22, 35, 6, '你遇到了职业生涯的贵人：TA 教你的第一课是「先做人，再做技术」。', { know: 4, rel: 3 }, null, { cond: s => s.job && s.age <= 35 });
L('job2-burnout', 28, 55, 5, '某个周一你对着电脑一个字都打不出来——那是 burnout 来敲门的声音。', { hap: -4, hp: -2, know: 1 }, null, { cond: s => s.job && s.age >= 28 });
L('job2-vacation', 24, 60, 7, '你攒了一年的假，去了一个查过一百次攻略的地方——机票订下的那刻就已经快乐了一半。', { money: -800, hap: 5, rel: 1 }, null, { cond: s => s.job && s.age >= 24 });
L('job2-promotion-2', 30, 55, 6, '你升职了。新办公室有窗，你把第一盆多肉摆在了窗台——「要活下来啊，我们都是」。', { money: 1500, hap: 3, know: 1 }, null, { cond: s => s.job && s.age >= 30 });
L('job2-training', 22, 50, 6, '公司派你去外地培训两周——学到的技能一半有用，另一半是认识了三个同行朋友。', { know: 3, rel: 2, money: 200 }, null, { cond: s => s.job });
L('job2-resign-letter', 30, 60, 5, '辞职信你写了三版：体面版、真实版和「说真话版」——你交的是体面版。', { hap: 3, know: 1 }, null, { cond: s => s.job && s.age >= 30 });
L('job2-retirement-party', 58, 68, 6, '退休欢送会上同事们的致辞让你红了眼——你干了三十年，把手艺留给了三个徒弟。', { hap: 5, rel: 3, money: 800 }, null, { cond: s => s.age >= 58 && s.job });
L('job2-side-hustle', 25, 50, 6, '你搞了份副业：晚上两小时，收入不大但「睡后的钱」这个词让你着迷。', { money: 400, hp: -1, know: 1 }, null, { cond: s => s.age >= 25 });

// ══════════ 健康补充 ══════════
L('health2-appendix', 10, 45, 4, '半夜阑尾炎发作，手术做了四十分钟——你醒来第一句问「我的阑尾留纪念了吗」。', { hp: -4, money: -800, hap: -1 });
L('health2-broken-arm', 6, 30, 5, '你摔断了胳膊，石膏上被同学们签满了名——「限量版手办」。', { hp: -3, hap: -1, rel: 1, money: -300 });
L('health2-glasses', 8, 18, 8, '你配了人生第一副眼镜——世界忽然清晰，也忽然变丑了（每个人都变丑了）。', { know: 1, money: -150 });
L('health2-insomnia-2', 25, 60, 5, '失眠的第三个星期，你终于去看了医生——「睡前一小时，放下手机」，医生说得轻巧。', { hp: -1, hap: -2, money: -50 });
L('health2-quit-smoking', 30, 60, 4, '戒烟第七次终于成功——秘诀是「把打火机也扔了」，你和牙医都为你骄傲。', { hp: 3, money: 200, hap: 1 }, null, { cond: s => s.age >= 30 });
L('health2-dental-scare', 35, 70, 5, '牙医说你有一颗「潜伏的智齿」——拔完你肿了三天，靠粥和电视剧活着。', { hp: -2, money: -200, hap: -1 }, null, { cond: s => s.age >= 35 });
L('health2-blood-pressure', 40, 75, 6, '体检单上的血压偏高，医生开了药和一份「生活方式处方」——后者更难执行。', { hp: 1, money: -150, know: 1 }, null, { cond: s => s.age >= 40 });
L('health2-surgery', 30, 70, 4, '一场手术让你在医院住了两周——出院时你看着阳光，觉得呼吸都是赚的。', { hp: 2, money: -1200, hap: 1 });
L('health2-rehab', 45, 80, 4, '康复训练的日子：从扶着走到自己走——「复健室里人人都是英雄」。', { hp: 2, hap: 2, money: -400 }, null, { cond: s => s.age >= 45 });
L('health2-vaccine-adult', 20, 60, 6, '你补打了成人疫苗——「大人也需要保护」，护士笑着说。', { hp: 2, money: -80 });

// ══════════ 财务补充 ══════════
L('fin2-savings-goal', 22, 55, 6, '你定了个存钱目标：第一桶「应急金」攒满那天，你在心里给自己放了鞭炮。', { money: 600, hap: 2 }, null, { cond: s => s.age >= 22 });
L('fin2-scam-call', 25, 70, 5, '诈骗电话说你的账户被冻结——你差点信了，最后一步时银行职员救了你。', { money: -50, know: 2, hap: -2 }, null, { cond: s => s.age >= 25 });
L('fin2-lend-friend', 25, 60, 5, '朋友借走了三个月工资说「周转一下」——钱回来了，友情也回来了，但你犹豫过。', { money: -500, rel: 1, know: 1 }, null, { cond: s => s.age >= 25 });
L('fin2-lucky-find', 10, 70, 3, '你在路边捡到一个装着现金的信封，交给了警察——失主找到你时哭了：「那是孩子的学费。」', { hap: 4, rel: 1, know: 1 });
L('fin2-stock-loss', 30, 65, 5, '你入市的第一年，账户绿得像片森林——你学会了「不懂的不要碰」这条昂贵真理。', { money: -600, know: 3, hap: -2 }, null, { cond: s => s.age >= 30 });
L('fin2-lottery-small', 18, 70, 4, '你中了张小彩票，兑了奖请朋友吃了顿——「我的运气用在刀刃上了」。', { money: 200, hap: 3, rel: 1 });
L('fin2-insurance-payout', 40, 80, 4, '多年前买的一份保险赔付到账——你第一次庆幸自己「多虑」过。', { money: 1500, hap: 2 }, null, { cond: s => s.age >= 40 });
L('fin2-price-inflation', 30, 75, 6, '菜市场转了一圈，你发现常买的东西悄悄涨了三成——工资单表示它也在努力。', { money: -200, know: 1 }, null, { cond: s => s.age >= 30 });

// ══════════ 时代洪流 ══════════
L('era2-social-media', 12, 30, 7, '你注册了第一个社交账号——头像选了半天，第一条动态纠结了半小时，零个赞。', { know: 1, hap: 1, rel: 1 }, null, { cond: s => s.age <= 30 });
L('era2-short-video', 10, 60, 8, '短视频平台你一刷就是两小时——「电子瓜子」，嗑起来停不下来。', { hap: 2, know: 1, hp: -1 }, null, { cond: s => s.age >= 10 });
L('era2-ai-assistant', 10, 60, 8, 'AI 助手成了你生活的空气：问路、写邮件、翻译、陪聊——你有时分不清它是工具还是同事。', { know: 3, hap: 1 }, null, { cond: s => s.age >= 10 });
L('era2-online-shopping', 15, 70, 8, '你第一次网购：物流信息每天刷三次——快递到的那天，快乐像小时候等包裹一样。', { money: -150, hap: 3 }, null, { cond: s => s.age >= 15 });
L('era2-remote-learn', 8, 22, 5, '你上了一年网课——屏幕那头的老师永远在「能听到吗」，你学会了快捷键静音。', { know: 1, hap: -1 }, null, { cond: s => s.age <= 22 });
L('era2-ebike', 15, 60, 6, '你买了辆电动车，通勤时间缩短一半——「堵车是汽车的痛苦，与我无关」。', { money: -400, hp: 1, hap: 2 }, null, { cond: s => s.age >= 15 });
L('era2-climate-news', 10, 70, 6, '新闻里的极端天气一年比一年多——你开始留意气象预警，冰箱里常备三日存粮。', { know: 1, hap: -1 }, '全球气候变暖背景下极端天气频率上升（IPCC）', null);
L('era2-recycle-habit', 15, 70, 5, '你开始做垃圾分类和自带杯——「个人努力很小，但垃圾场知道」。', { know: 1, hap: 1, money: -20 });
L('era2-online-bank', 18, 70, 7, '你去银行网点的次数五年内降到了三次——「柜台窗口」成了博物馆展品。', { know: 1, hap: 1 }, null, { cond: s => s.age >= 18 });
L('era2-ehealth', 30, 80, 5, '你的健康数据开始自动同步：步数、心率、睡眠——手机比你自己更懂你的身体。', { hp: 1, know: 1, hap: 0 }, null, { cond: s => s.age >= 30 });
L('era2-smart-home', 30, 75, 5, '你家有了第一个智能音箱——「明天叫醒我」，它做到了，就是嗓门大得像警报。', { money: -200, hap: 2, know: 1 }, null, { cond: s => s.age >= 30 });
L('era2-robot-aid', 55, 90, 4, '社区送来了适老化机器人，能提醒吃药、喊人求助——你嫌它笨嘴，但夜里摔倒那次是它救的。', { hp: 2, hap: 1, money: -100 }, null, { cond: s => s.age >= 55 });

// ══════════ 家人补充 ══════════
L('fam2-sibling-phone', 10, 20, 6, '你偷用了哥/姐的手机发了条朋友圈——被发现后你俩冷战了一天，又和好了一辈子。', { rel: 2, hap: 1 }, null, { cond: s => s.siblings.length > 0 });
L('fam2-sibling-fight', 6, 16, 6, '你和兄弟姐妹抢遥控器升级成了「谁是妈妈最爱」的世纪辩论——妈妈说「都爱」，谁都不信。', { rel: 1, hap: 1 }, null, { cond: s => s.siblings.length > 0 && s.age <= 16 });
L('fam2-parent-anniversary', 15, 40, 5, '父母的结婚纪念日你们订了蛋糕——爸说「瞎花钱」，但蜡烛吹灭时他在笑。', { rel: 2, hap: 2, money: -80 }, null, { cond: s => s.father.alive && s.mother.alive });
L('fam2-parent-illness', 20, 55, 5, '父亲住院那两周，你学会了在医院走廊打地铺——成年人的世界里，「陪护」两个字很重。', { hap: -3, rel: 2, money: -500 }, null, { cond: s => s.age >= 20 });
L('fam2-parent-retirement', 40, 60, 5, '父亲退休那天把工牌挂在了墙上——第二天他五点就醒了，忽然不知道干什么。', { rel: 2, know: 1 }, null, { cond: s => s.father.alive && s.age >= 40 });
L('fam2-move-out', 18, 30, 7, '你搬出去独立生活那天，母亲塞了一袋子吃的——「够你吃一周」，够你吃一周。', { hap: 2, rel: 1, money: -200 }, null, { cond: s => s.age >= 18 && s.age <= 30 });
L('fam2-family-trip', 12, 50, 6, '全家去旅行了一次：路线吵了三天，照片拍了两百张，回忆用了余生。', { money: -600, hap: 4, rel: 3 });
L('fam2-reunion', 30, 75, 6, '家族大团圆：三代人挤满了老屋，厨房里的锅就没凉过——「热闹」是最好的年货。', { hap: 4, rel: 3, money: -200 }, null, { cond: s => s.age >= 30 });
L('fam2-grandparent-story', 5, 14, 7, '祖父讲的故事永远讲不完：他年轻时走过的路、打过的仗、爱过的人——你是唯一听众。', { know: 2, rel: 3, hap: 2 }, null, { cond: s => s.age <= 14 });
L('fam2-inherit', 45, 80, 4, '遗产分配那天大家都很体面——体面地拿走了各自的部分，也体面地松开了一些东西。', { money: 1000, rel: -1, hap: -1 }, null, { cond: s => s.age >= 45 });
L('fam2-family-debt', 30, 65, 4, '亲戚开口借钱应急——你借了，这钱后来变成了亲戚间没说破的账。', { money: -400, rel: -1, know: 1 }, null, { cond: s => s.age >= 30 });
L('fam2-pet-death', 8, 60, 4, '养了十年的狗走了。你把它埋在院子里，埋的时候想「下次要早点回家」。', { hap: -4, rel: 1, know: 1 }, null, { cond: s => s.age >= 8 });
L('fam2-new-year-eve', 5, 80, 8, '除夕夜全家守岁：电视里的晚会、饺子/汤圆/粽子（按你家规矩）、和零点的炮竹。', { hap: 4, rel: 3 }, null, { cond: s => s.country === 'china' || s.country === 'india' });
L('fam2-naming-argument', 0, 1, 5, '你出生那几天，全家为你的名字开了三次会——最后定的这个，你会讨厌它二十年。', { hap: 0, rel: 1 });
L('fam2-cousin-bond', 6, 18, 6, '表兄妹是你童年最大的快乐来源：每年寒暑假的「农村/城市交换生」生活。', { rel: 3, hap: 3 }, null, { cond: s => s.age <= 18 });
