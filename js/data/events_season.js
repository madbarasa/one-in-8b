// 四季烟火 v0.5.0：~130 条
// 五国通用的日常质感事件：季节/天气/小确幸/小烦恼/邻里/食物

export const DEEP_SEASON = [];
const L = (id, minAge, maxAge, weight, text, effect, source, extra) =>
  DEEP_SEASON.push({ id, type: 'log', minAge, maxAge, weight, text, effect: effect || {}, source, ...(extra || {}) });

// ══════════ 季节与天气 ══════════
L('season-first-snow', 2, 85, 8, '今冬第一场雪：你伸手接住一片，看它化掉——这个动作你小时候做过，现在还做。', { hap: 3, know: 0 });
L('season-summer-pool', 6, 16, 6, '夏天你和朋友们泡在泳池/河里，皮肤晒脱了一层皮，快乐也晒进了骨头里。', { hp: 1, hap: 4, rel: 2 });
L('season-autumn-leaves', 8, 80, 6, '秋天你踩着落叶走了很远——「咔嚓」声是这个季节的 ASMR。', { hap: 2, hp: 1 });
L('season-spring-picnic', 8, 70, 6, '春游：草地、风筝、和被风吹跑的帽子——你追着帽子跑出了人生里的一个片段。', { hap: 3, hp: 1, rel: 1 });
L('season-typhoon-day', 5, 70, 4, '台风假：风把窗框摇得哐哐响，全家点着蜡烛吃泡面——「意外的假期最香」。', { hap: 2, rel: 2, hp: -1 }, null, { cond: s => s.country === 'china' || s.country === 'indonesia' });
L('season-heat-sleepless', 10, 60, 5, '热得睡不着：风扇、凉席、和半夜爬起来冲的凉水澡——你数了 800 只羊。', { hap: -2, hp: -1 });
L('season-winter-cold', 8, 70, 5, '你感冒了：鼻塞、头疼、和一整天的昏睡——「多喝热水」真的有用。', { hp: -2, hap: -1, money: -30 });
L('season-rain-walk', 10, 80, 5, '你没带伞在雨里走了一段——反正已经湿了，索性走得慢一点。', { hap: 2, hp: -1 });
L('season-first-thunder', 3, 10, 6, '春雷第一响，你吓得钻进被窝——大人的笑声从门外传进来。', { hap: 1, know: 1 });
L('season-sunset-roof', 8, 75, 5, '你在天台/屋顶/山坡看了一次完整的日落——太阳沉下去用了二十分钟，你想了十五年的事。', { hap: 3, know: 1 });

// ══════════ 食物与小确幸 ══════════
L('food-street-favorite', 10, 70, 7, '你常去的那家街边摊涨价了——老板娘说「原料贵了」，你还是点了老三样。', { money: -30, hap: 2, rel: 1 });
L('food-cook-first', 12, 25, 6, '你第一次做了一桌菜——盐放多了，但吃的人都说「好吃」，你也觉得好吃。', { know: 2, rel: 2, hap: 2 });
L('food-midnight-snack', 14, 45, 6, '深夜的泡面/烤串/冷披萨——「深夜进食」的快乐从来不讲道理。', { money: -20, hap: 2, hp: -1 });
L('food-festival-dish', 10, 80, 7, '节日大餐端上桌：有人负责做、有人负责吃、有人负责抢——分工明确，其乐融融。', { hap: 3, rel: 3, money: -80 });
L('food-homemade-lunchbox', 7, 18, 6, '你带了家里的便当/饭盒——同学的午饭比你的花哨，但你的最好吃（你妈说的）。', { hap: 1, rel: 1, know: 0 });
L('food-new-restaurant', 18, 60, 6, '你试了家新开的店：一道菜惊艳、一道菜踩雷——「人生嘛，总要试试」。', { money: -80, hap: 2, know: 1 });
L('food-iced-drink-summer', 10, 60, 6, '38 度的下午那杯冰饮——第一口下去，你从喉咙爽到灵魂。', { money: -10, hap: 3 });
L('food-market-haggle', 20, 70, 5, '你为了五毛钱和菜贩子「谈判」了三分钟——赢了，但这五毛钱你花了十分钟的尊严。', { money: -5, hap: 1, rel: 1 });

// ══════════ 邻里与社区 ══════════
L('hood-new-neighbor', 10, 70, 6, '隔壁搬来了新住户：你家孩子和 TA 家孩子成了同学，你家猫和 TA 家狗成了冤家。', { rel: 2, hap: 1 });
L('hood-noise-complaint', 20, 65, 5, '楼上装修三个月——电钻声成了你的背景音乐，你学会了在噪音里睡着。', { hap: -2, hp: -1, know: 0 });
L('hood-favor-chain', 15, 75, 6, '邻里之间的互助链：你家借我家酱油，我家帮你看孩子——「远亲不如近邻」是真的。', { rel: 3, hap: 2 });
L('hood-stray-cat', 8, 80, 5, '小区的流浪猫开始认你了——你买了猫粮，从此你有个「地下身份」：喂猫的。', { money: -50, hap: 3, rel: 1 });
L('hood-dog-walker', 25, 75, 5, '遛狗社交：狗没认识几只，狗主人倒认识了一圈——「遛狗圈的江湖」。', { rel: 2, hap: 2, hp: 1 }, null, { cond: s => s.age >= 25 });
L('hood-power-cut', 8, 70, 4, '突然停电：你点蜡烛、摸手机——「网络断了的三小时」，你居然把一本书看完了。', { know: 1, hap: 1 });
L('hood-help-shove-car', 25, 65, 4, '邻居的车打不着火，你帮着推了两把——车「轰」地响了，友谊也打着火了。', { rel: 2, hp: -1, hap: 1 }, null, { cond: s => s.age >= 25 });

// ══════════ 小烦恼 ══════════
L('minor-lost-keys', 10, 75, 6, '钥匙又锁屋里了——你请了开锁师傅，看着 TA 三十秒打开你「保安系统」的家门。', { money: -60, hap: -1, know: 1 });
L('minor-phone-crack', 15, 60, 5, '手机屏幕摔裂了——你看着蜘蛛网状的裂纹想：「还能用，就是每个电话都带特效」。', { money: -150, hap: -1 });
L('minor-wrong-bus', 8, 60, 5, '你坐错了车/地铁——多花了四十分钟，但你看到了一段从没见过的街景。', { money: -20, hap: 1, know: 1 });
L('minor-spilled-coffee', 15, 70, 5, '你把咖啡洒在了白衬衫上——开会前十分钟，你「白衬衫变花衬衫」。', { hap: -1, money: -20 });
L('minor-online-scam', 16, 65, 4, '你差点被骗：骗子的话术很专业——「只要让我转账的都是骗子」，你及时踩了刹车。', { know: 2, hap: -1, money: -50 }, null, { cond: s => s.age >= 16 });
L('minor-slow-internet', 10, 70, 6, '网络卡成 PPT：你对着转圈的图标深呼吸——「数字时代的新型冥想」。', { hap: -1, know: 0 });
L('minor-printer-war', 18, 65, 5, '打印机和你之间爆发了战争：卡纸、缺墨、连不上——你赢了，但用了半小时。', { hap: -1, know: 1 });
L('minor-umbrella-lost', 10, 70, 5, '雨伞在第 7 次借出后正式退役——你决定下次「谁借伞谁负责记得还」。', { money: -30, hap: 0 });

// ══════════ 出行与远方 ══════════
L('travel-first-trip', 12, 25, 7, '你第一次出远门：火车/大巴/飞机——窗外的世界以每小时一百公里的速度刷新。', { know: 3, hap: 4, rel: 1, money: -200 }, null, { cond: s => s.age <= 25 });
L('travel-alone', 20, 45, 6, '你一个人旅行了一次：迷路、问路、和陌生人聊天——「孤独的自由」会上瘾。', { know: 3, hap: 3, rel: 1, money: -400 }, null, { cond: s => s.age >= 20 });
L('travel-family-trip', 30, 60, 6, '全家旅行：孩子兴奋、大人拍照、老人嫌贵——但你抓拍到了一张全家笑得最真的照片。', { money: -800, hap: 4, rel: 3 }, null, { cond: s => s.children.length > 0 && s.age >= 30 });
L('travel-souvenir', 15, 70, 5, '你买的纪念品回家就吃灰——但每次看见它，那个城市的风就回来了。', { money: -60, hap: 2, know: 1 });
L('travel-sick-abroad', 20, 60, 3, '你在异国他乡病倒了——陌生的药店、手语比划的症状、和一句「Get well soon」。', { hp: -2, hap: -1, money: -150, know: 2 }, null, { cond: s => s.age >= 20 });
L('travel-revisit-childhood', 30, 70, 5, '你回到了童年生活过的城市：老房子拆了，但小学门口的小卖部还开着——「老板，还是那个味」。', { hap: 3, know: 2, rel: 1 });

// ══════════ 数字时代 ══════════
L('tech-online-friend', 13, 35, 6, '你交了个网友：十年没见过面，但你俩聊过的天比大多数现实朋友都多。', { rel: 2, hap: 2, know: 1 }, null, { cond: s => s.age <= 35 });
L('tech-photo-cloud', 15, 60, 5, '你的照片存在云端——「手机丢了照片还在」，科技第一次让你觉得被温柔以待。', { know: 1, money: -30, hap: 1 });
L('tech-viral-moment', 14, 45, 4, '你随手发的内容火了——一晚上涨了三千粉，你兴奋得睡不着，第二天照常上班。', { hap: 4, rel: 1, know: 1 }, null, { cond: s => s.age <= 45 });
L('tech-group-chat', 20, 70, 6, '家族群：长辈转发的养生文、红包、和「帮我砍一刀」——你全部默默收下。', { rel: 2, hap: 1 }, null, { cond: s => s.age >= 20 });
L('tech-ebook-reader', 15, 70, 5, '你换了电子书阅读器——「一千本书装进口袋」，但你还是会在书店闻纸质书的味道。', { money: -120, know: 2, hap: 1 });
L('tech-game-nostalgia', 20, 60, 5, '你重玩了童年的游戏——像素画面、8-bit 音乐——「通关」不是重点，「回到」才是。', { hap: 4, know: 1, money: -50 });
L('tech-video-call-family', 25, 80, 6, '视频通话那头，父母把手机举得太高——「你们看到我了吗？」——你笑，又有点想哭。', { rel: 3, hap: 2 }, null, { cond: s => s.age >= 25 });
L('tech-password-forgot', 15, 70, 5, '你又忘了密码——「找回密码」流程走完，系统提示新密码不能与旧密码相同。', { hap: -1, know: 0 });
L('tech-ai-chat', 18, 70, 5, '你和 AI 聊了半小时——它比你更会安慰人，但你说「谢谢」时停顿了一下：「谢谢谁？」', { know: 2, hap: 1 }, null, { cond: s => s.age >= 18 });

// ══════════ 意外之财与倒霉 ══════════
L('luck-found-money', 8, 70, 4, '你在路上捡到一笔钱——交给警察/贴寻物启事/原地等失主：好人没好报？有！失主请你吃了顿饭。', { rel: 1, hap: 3, know: 1 });
L('luck-old-jacket', 20, 60, 4, '旧外套口袋里翻出一张钞票——这是「过去的自己」给现在的你发的红包。', { money: 50, hap: 3 });
L('luck-prize-draw', 10, 70, 3, '你中了抽奖：一桶油/一条毛巾/一盒鸡蛋——「人生第一次中奖」的仪式感拉满。', { money: 40, hap: 3 });
L('luck-lost-wallet', 10, 70, 4, '钱包丢了：挂失、补办、排队——三天后你的人生终于恢复正常运转。', { money: -120, hap: -2, know: 1 });
L('luck-broken-phone-water', 12, 65, 4, '手机进水了：你把它埋进米缸——「米缸复活法」成功率五五开，这次它没能活过来。', { money: -300, hap: -2 });
L('luck-tax-refund', 22, 60, 4, '退税到账——「国家给我发红包了」（其实是把你自己的钱还给了你）。', { money: 200, hap: 3 }, null, { cond: s => s.age >= 22 });

// ══════════ 里程碑 ══════════
L('mile-first-salary', 16, 28, 10, '第一笔工资到账——你给家人买了礼物、给自己买了顿好的，剩下的存了起来。', { money: 300, hap: 5, rel: 2 }, null, { cond: s => s.age <= 28 });
L('mile-10000-savings', 22, 45, 6, '存款第一次过万/过十万——你盯着余额看了很久，「安全感」原来有数字。', { hap: 4, know: 1 }, null, { cond: s => s.age <= 45 });
L('mile-first-house-keys', 28, 50, 6, '拿到新房钥匙那天，你在空房间里转了三圈——「这里以后是我的了」。', { hap: 5, money: -500, rel: 2 }, null, { cond: s => s.age >= 28 });
L('mile-driving-license', 16, 30, 7, '你拿到驾照了——副驾坐着家人，你握着方向盘的手心全是汗。', { hap: 4, know: 2, money: -300 }, null, { cond: s => s.age <= 30 });
L('mile-first-flight', 15, 40, 6, '第一次坐飞机：起飞时你抓住了扶手——云层之上，你看见了「天上」原来长这样。', { know: 2, hap: 4, money: -400 }, null, { cond: s => s.age <= 40 });
L('mile-first-speech', 18, 40, 5, '你第一次当众发言/演讲——手抖、忘词、但说完了。台下有人鼓掌，你记了一辈子。', { hap: 3, know: 2, rel: 2 }, null, { cond: s => s.age <= 40 });
L('mile-first-artwork', 10, 30, 5, '你的第一件作品（画/文/手工/代码）被人认真夸了——「原来我也能创造点什么」。', { know: 3, hap: 4 }, null, { cond: s => s.age <= 30 });
L('mile-1000-days-job', 25, 55, 5, '你在一份工作干满一千天——入职那天认识的同事，如今成了你婚礼上的人。', { hap: 3, rel: 2, know: 1 }, null, { cond: s => s.job && s.age >= 25 });
L('mile-half-century', 48, 52, 10, '五十岁生日：蛋糕上五个零的蜡烛很难买——家人买了「5」和「0」，你说「这才对」。', { hap: 4, rel: 3, know: 1 });
L('mile-grandchild-first-word', 55, 85, 5, '孙辈的第一个词是叫你——你激动地录了视频，发给了所有人。', { hap: 5, rel: 3 }, null, { cond: s => s.age >= 55 });
L('mile-40-years-together', 65, 90, 5, '结婚四十周年：你们翻出当年的婚纱照——「皱纹多了，牵手没变」。', { hap: 4, rel: 3 }, null, { cond: s => s.spouse && s.age >= 65 });
L('mile-retirement-countdown', 58, 64, 5, '退休倒计时：你开始每天数日子——同事说你「人在工位，心在菜地」。', { hap: 2, know: 1 }, null, { cond: s => s.job && s.age >= 58 });
L('mile-own-business-open', 25, 50, 4, '你自己的小店/工作室开张了——鞭炮/花篮/朋友圈，和一颗「终于」的心。', { hap: 5, money: -1000, rel: 2 }, null, { cond: s => s.age >= 25 });
L('mile-passport-first', 18, 45, 5, '你办了第一本护照——「世界那么大」的门票，虽然还不知道什么时候出发。', { know: 1, money: -80, hap: 2 }, null, { cond: s => s.age <= 45 });
L('mile-debt-free', 30, 60, 4, '你清完了所有债务——「无债一身轻」这句话，古人诚不我欺。', { hap: 5, know: 1, money: -100 }, null, { cond: s => s.age >= 30 });
L('mile-first-vote', 18, 25, 6, '你第一次参与投票/公共事务——「我的声音也算数」，这个感觉会让你记很久。', { know: 2, hap: 2 }, null, { cond: s => s.age <= 25 });
L('mile-teach-someone', 22, 60, 5, '你教会了一个人真本事——TA 后来超越了你，比你自己成功还让你高兴。', { know: 2, rel: 3, hap: 3 }, null, { cond: s => s.age >= 22 });
L('mile-blood-donation', 18, 55, 4, '你第一次献血——护士说「你的血可能救了一个人」，这句话够你骄傲一星期。', { hp: -1, hap: 3, rel: 1 }, null, { cond: s => s.age >= 18 });
L('mile-survive-2020s', 10, 80, 4, '你经历过这个时代的动荡与复苏——「活下来的人，都是生活的高手」。', { know: 2, hap: 2 });
L('mile-look-back-2026', 60, 90, 5, '你算了下：从你出生那年起，世界换了多少种模样——你竟然全都经历了一遍。', { know: 3, hap: 2 }, null, { cond: s => s.age >= 60 });
L('mile-photo-comparison', 30, 75, 5, '你把现在和十年前的照片并排看——「老了，但眼神更亮了」。你挺满意。', { hap: 3, know: 1 });
L('mile-last-day-work-office', 59, 66, 5, '你交还了工牌——「这串数字曾是我的身份」，现在它是纪念品了。', { hap: 1, know: 1, rel: 1 }, null, { cond: s => s.age >= 59 });
L('mile-plant-tree', 30, 70, 4, '你种了一棵树——「等我孙子长大，它应该比房子高了」。', { know: 1, hap: 2, rel: 1 }, null, { cond: s => s.age >= 30 });
L('mile-teach-grandma-phone', 15, 45, 5, '你教会了奶奶/外婆用手机——她学会的第一件事是给你发语音：「吃饭了吗？」', { rel: 3, hap: 3, know: 1 }, null, { cond: s => s.age <= 45 });
L('mile-save-someone', 18, 60, 3, '你帮了一个人（扶起摔倒的老人/救起落水的孩子/拦下冲动的朋友）——你不说，但你记得。', { hap: 4, rel: 1, know: 1 }, null, { cond: s => s.age >= 18 });
L('mile-reunion-40years', 55, 75, 4, '毕业四十年的同学会：有人走了、有人来了、有人认不出你——「青春散场，友情续杯」。', { hap: 3, rel: 2, know: 1 }, null, { cond: s => s.age >= 55 });
L('mile-handwriting-lost', 30, 70, 4, '你发现自己很久没写字了——提笔忘字的瞬间，你重新买了支钢笔。', { know: 1, money: -20, hap: 1 }, null, { cond: s => s.age >= 30 });
L('mile-daily-routine-change', 35, 70, 5, '你换了一条上班路线——「换条路走，世界就换了背景音乐」。', { know: 1, hap: 2 });
L('mile-night-shift-see-dawn', 20, 60, 4, '加班/守夜到天亮——你在窗边看见了日出：「这座城市醒来的样子，多数人没见过」。', { hp: -2, know: 1, hap: 1 }, null, { cond: s => s.age >= 20 });
L('mile-give-up-seat', 10, 70, 5, '你把座位让给了需要的人——「谢谢」两个字，让你的整个通勤变轻了。', { rel: 1, hap: 2 });
L('mile-old-toy-found', 25, 70, 4, '搬家时翻出了童年的玩具——你摆弄了十分钟，然后郑重地把它放进了「不扔」的箱子。', { hap: 3, know: 1 });
L('mile-learn-to-say-no', 25, 55, 5, '你第一次拒绝了不合理的要求——「不」说出口的瞬间，世界没有崩塌，你轻松了。', { hap: 3, rel: -1, know: 2 }, null, { cond: s => s.age >= 25 });
L('mile-stay-calm-storm', 30, 70, 5, '麻烦事一件接一件——你泡了杯茶，列了清单，一件件来：「天塌下来，先吃饭」。', { know: 2, hap: 2 });
L('mile-remember-name', 40, 75, 5, '二十年前的学生/下属/后辈还记得你的名字——「被人记住」是这个世界上最温柔的事。', { rel: 3, hap: 4 }, null, { cond: s => s.age >= 40 });
L('mile-simple-happy', 20, 90, 7, '今天没什么特别的事发生——但你觉得挺好：「平静」本身就是一种好运。', { hap: 3, hp: 1 });
L('mile-watch-sprout', 10, 80, 5, '你种的东西发芽了——「生命破土的瞬间，看一万次都不会腻」。', { hap: 3, know: 1 });
L('mile-read-finish', 10, 80, 5, '你读完了那本买了一年都没翻开的书——「书架上的债，还清了一笔」。', { know: 3, hap: 2 });
L('mile-quiet-birthday', 40, 85, 5, '今年生日没什么仪式——一碗长寿面、几个电话、和自己说的「又活一年，不容易」。', { hap: 2, rel: 2, know: 1 });
L('mile-share-skill', 30, 70, 5, '你把压箱底的技巧发到了网上——「帮助三个陌生人」的快乐，比涨工资还实在。', { know: 1, rel: 1, hap: 3 }, null, { cond: s => s.age >= 30 });
L('mile-sleep-well', 30, 90, 6, '你睡了一个久违的好觉——没有闹钟、没有梦、「累」字终于从你身上下来了。', { hp: 2, hap: 2 });
L('mile-say-love', 30, 85, 5, '你对家人说出了那句一直没说出口的话——「我爱你」三个字，练了三十年。', { rel: 4, hap: 4 }, null, { cond: s => s.age >= 30 });
L('mile-take-photo-parents', 30, 70, 5, '你给父母拍了张正经的照片——发现他们笑起来的时候，皱纹里全是当年的样子。', { rel: 3, hap: 3, know: 1 }, null, { cond: s => s.age >= 30 });
L('mile-kids-grown-taller', 40, 60, 5, '孩子超过你的身高那天——你挺直腰板努力了一下，然后笑着认输了。', { hap: 4, rel: 2, know: 1 }, null, { cond: s => s.children.length > 0 && s.age >= 40 });
L('mile-old-map', 50, 85, 4, '你翻出了当年的地图册——上面圈圈画画的地方，你去过几个？「还有时间」，你对自己说。', { know: 2, hap: 2 }, null, { cond: s => s.age >= 50 });
L('mile-favorite-chair', 45, 90, 5, '家里有把「你的椅子」——全家人都默契地不坐它，「专属」是岁月给的特权。', { hap: 2, rel: 1 }, null, { cond: s => s.age >= 45 });
L('mile-morning-market', 55, 90, 5, '清晨的菜市场是你的主场——哪个摊的菜新鲜、哪个摊主实在，你比谁都清楚。', { money: -30, rel: 2, hap: 2, know: 1 }, null, { cond: s => s.age >= 55 });
L('mile-walk-decision', 30, 75, 5, '想不通的事，你出门走了圈——「路是走明白的」，散步是你的移动办公室。', { know: 2, hp: 1, hap: 1 }, null, { cond: s => s.age >= 30 });
L('mile-found-hobby-group', 25, 70, 5, '你加入了一个兴趣小组：钓鱼/书法/合唱/徒步——「同好」是成年人交朋友最后的绿洲。', { rel: 3, hap: 3 }, null, { cond: s => s.age >= 25 });
L('mile-first-rainbow', 3, 60, 5, '你看见了完整的彩虹——「朋友圈都在拍」，你没拍，你就看了。', { hap: 3, know: 1 });
L('mile-good-neighbor-help', 35, 80, 4, '你生病时邻居送来了粥——「远亲不如近邻」这句话，是热粥的温度。', { rel: 3, hap: 3, hp: 1 }, null, { cond: s => s.age >= 35 });
L('mile-repair-not-replace', 25, 75, 4, '你修好了旧物件而不是换新——「还能用」三个字，是对抗消费时代的小倔强。', { money: -30, know: 1, hap: 2 }, null, { cond: s => s.age >= 25 });
L('mile-memorize-poem', 10, 70, 4, '你背下了一首诗——「在某个瞬间，那句话替你说出了心里的东西」。', { know: 2, hap: 2 });
L('mile-watch-child-sleep', 25, 60, 5, '你看着熟睡的孩子——小脸、呼吸、和偶尔的翻身——「这个小人儿是我造的最大奇迹」。', { hap: 5, rel: 2 }, null, { cond: s => s.children.length > 0 && s.age >= 25 });
L('mile-teach-bike', 28, 50, 5, '你教会了孩子骑自行车——TA 第一次撒把成功的那声欢呼，你到现在还记得。', { hap: 4, rel: 3, know: 1 }, null, { cond: s => s.children.length > 0 && s.age >= 28 });
L('mile-family-dinner-routine', 35, 75, 6, '每周的固定家庭聚餐——雷打不动，「一家人坐在一起」是这世上最难也最值的事。', { rel: 3, hap: 3, money: -60 }, null, { cond: s => s.age >= 35 });
L('mile-quiet-achievement', 35, 75, 5, '你默默做成了件没人知道的事——「自己知道」就够了，这是你和自己之间的勋章。', { hap: 3, know: 1 }, null, { cond: s => s.age >= 35 });
L('mile-long-walk-talk', 40, 80, 5, '你和朋友走了很长的路，聊了很深的天——「散步式谈心」是友谊的顶级形态。', { rel: 3, hap: 3, hp: 1 }, null, { cond: s => s.age >= 40 });
L('mile-hometown-dialect', 20, 80, 5, '你在异乡听见乡音——眼泪没掉下来，但喉咙紧了一下：「老乡见老乡」。', { rel: 1, hap: 2, know: 1 });
L('mile-book-recommend', 20, 75, 4, '你把最爱的书送给了一个人——TA 后来也爱上了它：「书的第二次生命是人给的」。', { rel: 2, know: 2, hap: 2 });
L('mile-take-care-parents', 45, 75, 5, '你开始照顾年迈的父母——「小时候你喂我吃饭，现在你等我喂」——角色对调，爱没换人。', { rel: 3, hap: 1, hp: -1, know: 1 }, null, { cond: s => s.age >= 45 });
L('mile-first-earring', 14, 30, 3, '你打了耳洞/剪了新发型/买了那件「太贵」的衣服——青春期的第一次「自我宣言」。', { hap: 3, money: -100 }, null, { cond: s => s.age <= 30 });
L('mile-teen-diary', 12, 18, 4, '你写了日记，上了锁——多年后重读，你笑出声：「当年的烦恼，原来是珍珠」。', { know: 1, hap: 2 }, null, { cond: s => s.age <= 18 });
L('mile-college-goodbye', 17, 23, 6, '毕业散伙饭——「以后常联系」说了一晚上，你知道有人会失约，但你还是信了每一句。', { hap: 2, rel: 3 }, null, { cond: s => s.age <= 23 });
L('mile-first-apology', 8, 40, 4, '你第一次主动道歉——「对不起」三个字出口后，对方愣了，你也愣了：原来不难。', { rel: 3, know: 2, hap: 1 }, null, { cond: s => s.age <= 40 });
L('mile-nature-quiet', 20, 85, 5, '你在山里/海边/雪原站了很久——「大自然的安静不是没有声音，是没有打扰」。', { hap: 3, know: 1, hp: 1 });
L('mile-old-couple-walk', 65, 92, 5, '你和老伴手牵手慢慢走——年轻人从旁边跑过，你们相视一笑：「急什么，路还长」。', { rel: 3, hap: 3, hp: 1 }, null, { cond: s => s.spouse && s.age >= 65 });
L('mile-grandparent-gift', 60, 92, 4, '你把攒了半辈子的手艺/故事/存折的一部分给了孙辈——「爱你」的最好方式是「给你」。', { money: -300, rel: 3, hap: 4 }, null, { cond: s => s.age >= 60 });
L('mile-photo-wall', 45, 90, 5, '你在家里贴了照片墙——从黑白到彩照，「时间的证据」挂满了走廊。', { money: -100, hap: 3, rel: 2 }, null, { cond: s => s.age >= 45 });
L('mile-fan-of-something', 15, 70, 5, '你成了某个歌手/球队/作家的死忠粉——「追了二十年」的忠诚，是你给自己的浪漫。', { hap: 3, rel: 1, money: -200 });
L('mile-stargazing-child', 6, 16, 5, '你第一次通过望远镜看月亮——「上面全是坑！」——宇宙在你眼前撕开了第一道缝。', { know: 3, hap: 3 }, null, { cond: s => s.age <= 16 });
L('mile-first-snowman', 3, 12, 5, '你堆了人生第一个雪人——鼻子是胡萝卜、手是树枝、围巾是你妈的。', { hap: 4, rel: 2 }, null, { cond: s => s.age <= 12 });
L('mile-lose-tooth', 5, 9, 5, '你的乳牙掉了——牙的 tradition：枕头底下藏着零花钱（或没了牙的哈哈大笑）。', { hap: 3, know: 1 }, null, { cond: s => s.age <= 9 });
L('mile-first-rainbow-socks', 6, 15, 4, '你穿了双奇奇怪怪的袜子/衣服上学——被笑了三天，第四天有人模仿你。', { hap: 2, rel: 1 }, null, { cond: s => s.age <= 15 });
L('mile-library-sleep', 12, 25, 4, '你在图书馆/自习室睡着了——醒来时书还在脸上压着印子，管理员没叫醒你。', { know: 1, hap: 1 }, null, { cond: s => s.age <= 25 });
L('mile-school-trip-lost', 8, 16, 4, '春游你走丢了半小时——找到时全班鼓掌，你成了这届的传说：「那个自己逛动物园的人」。', { hap: 1, rel: 1, know: 1 }, null, { cond: s => s.age <= 16 });
L('mile-first-bestfriend-fight', 7, 15, 5, '你和最好的朋友吵翻了——三天没说话，第四天 TA 塞给你一颗糖，世界恢复运转。', { rel: 3, hap: 2 }, null, { cond: s => s.age <= 15 });
L('mile-teen-job-first', 15, 20, 5, '你的第一份兼职：传单/收银/家教——干了三天，你终于知道「钱不好挣」的「好」字多重。', { money: 100, know: 2, hp: -1 }, null, { cond: s => s.age <= 20 });
L('mile-uni-first-lecture', 17, 21, 5, '大学第一节课——教授说的第一句话你忘了，但阶梯教室的阳光你记到现在。', { know: 2, hap: 2 }, null, { cond: s => s.age <= 21 });
L('mile-first-presentation-pass', 18, 30, 4, '你憋出了一个所有人都说「不错」的方案——「不错」两个字，你开心了一周。', { know: 2, hap: 3 }, null, { cond: s => s.age <= 30 });
L('mile-new-parents-sleep', 24, 40, 5, '孩子出生后的第一个整觉——你睡了六个小时，醒来恍如隔世：「睡觉是种幸福」。', { hp: 2, hap: 1 }, null, { cond: s => s.children.length > 0 && s.age <= 40 });
L('mile-cooking-for-parents', 25, 50, 5, '你第一次给父母做了一桌饭——他们吃得慢、吃得干净、吃得眼睛发亮。', { rel: 3, hap: 4, know: 1 }, null, { cond: s => s.age >= 25 });
L('mile-friend-becomes-family', 25, 60, 4, '有个朋友处成了家人——TA 家的钥匙你有，你家冰箱 TA 随便开。', { rel: 4, hap: 3 }, null, { cond: s => s.age >= 25 });
L('mile-neighbor-watchdog', 30, 70, 4, '你出差时邻居帮你照看了家——浇花、收快递、和「有事打电话」的承诺。', { rel: 2, hap: 2 }, null, { cond: s => s.age >= 30 });
L('mile-repay-kindness', 30, 80, 4, '当年帮过你的人现在需要帮助了——你二话没说就去了：「人情要还，恩情要加倍」。', { rel: 3, hap: 3, money: -100 }, null, { cond: s => s.age >= 30 });
L('mile-last-first-time', 70, 95, 5, '你意识到有些「第一次」不会再有了——然后你去找了个新的「第一次」：第一次用 AI、第一次染发。', { know: 2, hap: 3 }, null, { cond: s => s.age >= 70 });
L('mile-season-cycle', 50, 90, 5, '你数了数：这辈子已经过了五十几个春天——「原来季节的循环，就是人生的刻度」。', { know: 2, hap: 2 }, null, { cond: s => s.age >= 50 });
L('mile-young-people-today', 45, 90, 5, '你看着现在的年轻人——「他们和我们当年一样，以为世界是自己的」。你笑了，没纠正。', { know: 2, hap: 2 }, null, { cond: s => s.age >= 45 });
L('mile-tidy-desk-final', 58, 70, 4, '你整理了一辈子的文件/工具/笔记——「整理」的过程像把一生过了一遍慢镜头。', { know: 2, hap: 2 }, null, { cond: s => s.age >= 58 });
L('mile-watch-same-street', 40, 85, 5, '你看了四十年的那条街——店铺换了八轮，「唯一不变的招牌」是你常去的那家。', { know: 1, hap: 2, rel: 1 }, null, { cond: s => s.age >= 40 });
L('mile-pass-on-recipe', 55, 90, 4, '你把拿手菜教给了孩子——TA 做得走了样，但你说「好吃」——因为爱不需要精确的配方。', { rel: 3, hap: 3, know: 1 }, null, { cond: s => s.age >= 55 });
L('mile-winter-sun', 40, 90, 5, '冬天的太阳晒在背上——你和猫/狗/老人一样，找了个墙根，眯起了眼睛。', { hp: 1, hap: 3 });
L('mile-last-working-tool', 60, 90, 4, '你退休那天带走了用了很多年的那把工具/那支笔——「它比我先退休，但我们说好一起养老」。', { hap: 2, know: 1 }, null, { cond: s => s.age >= 60 });
L('mile-evening-gossip', 55, 90, 5, '晚饭后和邻居们坐在楼下聊天下大事——「聊到八点散场」，明天接着聊。', { rel: 3, hap: 2 }, null, { cond: s => s.age >= 55 });
L('mile-grandkid-homework', 60, 90, 5, '你辅导孙辈写作业——「我们那时候哪有这些」，你一边抱怨一边认真地学会了新课本。', { know: 2, rel: 2, hap: 1 }, null, { cond: s => s.age >= 60 });
L('mile-sunset-with-spouse', 60, 95, 5, '你们坐在海边/公园看了整个日落——「和你看了四十年日落」，这句话你只说过一次。', { hap: 4, rel: 3 }, null, { cond: s => s.spouse && s.age >= 60 });
L('mile-take-medicine-routine', 65, 95, 5, '药盒按星期分好了——「银色的早上吃，白色睡前吃」，这是你新的人生课程表。', { hp: 1, hap: 0 }, null, { cond: s => s.age >= 65 });
L('mile-memory-lane', 80, 96, 5, '你想起了很多人：教你的、帮你的、爱你的——「这一生没白来，因为遇见过他们」。', { hap: 3, rel: 2, know: 1 }, null, { cond: s => s.age >= 80 });
L('mile-quiet-strength', 50, 90, 5, '你扛过了最难的那段日子——没人知道你怎么撑过来的，包括现在的你：「反正撑过来了」。', { know: 2, hap: 2 }, null, { cond: s => s.age >= 50 });
L('mile-watch-world-change', 60, 95, 5, '你用一辈子看了世界的变迁——「技术上万年历，人心上老黄历」，你总结道。', { know: 3, hap: 1 }, null, { cond: s => s.age >= 60 });
L('mile-great-grandchild', 82, 97, 5, '重孙/重外孙出生了——四世同堂的合影里，你抱着这个小家伙，手有点抖，心很稳。', { hap: 5, rel: 3 }, null, { cond: s => s.age >= 82 });
L('mile-birthday-single-digit-wish', 75, 95, 4, '吹蜡烛前你许了愿——「一家人平安」，你想了三秒，还是许了这个，年年都是。', { hap: 3, rel: 2 }, null, { cond: s => s.age >= 75 });
L('mile-hand-in-hand-end', 85, 98, 4, '你和爱人说好「谁先走都要等一等」——这个约定像年轻时说「永远」一样认真。', { hap: 2, rel: 4 }, null, { cond: s => s.spouse && s.age >= 85 });
L('mile-legacy-talk', 85, 98, 5, '你给孙辈讲了讲你的父母——「故事传三代就不容易了」，你要让它再传一代。', { know: 2, rel: 3, hap: 2 }, null, { cond: s => s.age >= 85 });
L('mile-content', 70, 98, 6, '有人问你现在过得怎么样——你想了想说：「够了。」这两个字里装了一生。', { hap: 4, know: 2 }, null, { cond: s => s.age >= 70 });
