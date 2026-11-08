// 岁月长线 v0.5.0：~120 条
// 中年沉思/晚年平静/时代之尾/人生回顾——给「人生模拟」加灵魂

export const DEEP_LIFE = [];
const L = (id, minAge, maxAge, weight, text, effect, source, extra) =>
  DEEP_LIFE.push({ id, type: 'log', minAge, maxAge, weight, text, effect: effect || {}, source, ...(extra || {}) });

// ══════════ 中年沉思 ══════════
L('life-mirror-morning', 38, 55, 7, '某天早晨你在镜子里看见了你爸——白发、眼袋、和当年你顶嘴时他不耐烦的表情。', { hap: 0, know: 2 });
L('life-old-song-radio', 35, 60, 6, '出租车电台放起了你十几岁的歌——前奏一响，后排的你直接回到了那个夏天。', { hap: 3, know: 1 });
L('life-career-halfway', 40, 50, 6, '「干这行二十年」的某天你算了下：如果干到退休，还要重复它两万次。你愣了很久。', { hap: -1, know: 2 });
L('life-parent-reverse', 40, 55, 6, '你发现父亲开始重复讲同一个故事——第三次听时你没打断，认真听完还问了个问题。', { rel: 3, know: 1, hap: 1 });
L('life-own-boss-day', 35, 60, 5, '你成了自己讨厌的那种「领导」吗？你花了一个失眠夜认真核对，结论是：有一半。', { know: 2, hap: 1 });
L('life-health-scare', 40, 60, 5, '体检报告上「建议复查」四个字让你一晚没睡好——结果出来虚惊一场，你请全家吃了顿饭。', { hap: 4, hp: 1, money: -400 });
L('life-childhood-friend-lost', 35, 55, 5, '最好的朋友搬去了另一个大洲——你们的聊天频率从每周变成每年，但每次都像没分开过。', { rel: 2, hap: 1 });
L('life-books-reread', 30, 70, 5, '你重读了二十岁时读过的书——「当年完全没看懂」，你在扉页上给年轻的自己留了句话。', { know: 3, hap: 2 });
L('life-grandparent-last', 35, 60, 5, '最后一个祖辈走了。你忽然意识到：现在「老人」那一排里，是你和你爱人了。', { hap: -4, rel: 1, know: 2 });
L('life-mortgage-freedom', 45, 60, 5, '还清最后一期贷款那晚你开了瓶酒——这套房子终于「完全是你的了」。你在客厅里走了三圈。', { hap: 5, money: -200 }, null, { cond: s => s.house });
L('life-station-photo', 30, 65, 5, '车站送别：孩子背着包进了检票口，没回头——你在原地站到人流散尽。', { hap: -1, rel: 1 }, null, { cond: s => s.children.length > 0 && s.age >= 30 });
L('life-city-changed', 35, 60, 5, '你回到年轻时打拼的城市——老楼拆了，路改了，只有那家面馆还开着，味道没变。', { hap: 2, know: 1, rel: 1 });
L('life-colleague-farewell', 40, 58, 5, '同事退休欢送会上，他红着眼眶说「三十七年，就这么过来了」——你算了算自己的三十七年。', { hap: 1, know: 2, rel: 1 });
L('life-midlife-hobby', 35, 50, 6, '你捡起了年轻时放弃的爱好——吉他、画笔、或那台落灰的相机，手生了，心跳没生。', { hap: 4, know: 2, rel: 1 });
L('life-anniversary-quiet', 40, 70, 6, '结婚纪念日你们哪都没去，在家里煮了顿面——「老夫老妻」的浪漫是一起吃口热饭。', { hap: 3, rel: 3 }, null, { cond: s => s.spouse && s.age >= 40 });
L('life-class-reunion', 38, 60, 6, '同学聚会：当年最皮的当了校长，最安静的成了老板——你呢？你过得挺好，真的。', { hap: 2, rel: 2, know: 1 });
L('life-old-neighbor-move', 45, 70, 4, '住了二十年的老邻居搬走了——走之前他把你家孩子小时候骑过的木马还了回来。', { hap: 1, rel: 1 });
L('life-parent-nursing', 50, 65, 5, '父母住进了医院——你第一次在缴费单上签字，忽然明白「上有老」三个字的重量。', { money: -800, hap: -2, rel: 1, know: 1 });
L('life-insurance-review', 40, 60, 5, '你认真研究了保险条款——「受益人」那一栏，你写了家人名字，然后给生活多了一份踏实。', { money: -300, know: 1, hap: 1 });
L('life-second-language', 35, 60, 5, '你自学了一门外语——不为升职不为考试，就为了看懂那部没字幕的老电影。', { know: 3, hap: 2 });
L('life-mentor-young', 35, 55, 6, '一个年轻人来请教，你说了些当年别人教你的话——说完才懂了当年那些话的分量。', { know: 2, rel: 2, hap: 2 });
L('life-canceled-trip', 45, 65, 4, '你们计划了十年的旅行又没去成——「等退休」「等孩子高考完」「等天气好点」。', { hap: -1, know: 1 });
L('life-apprentice-son', 45, 60, 4, '孩子说你「观念过时了」——你气了一天，然后偷偷上网查了他说的那个新词。', { hap: 1, know: 2, rel: 1 }, null, { cond: s => s.children.length > 0 && s.age >= 45 });
L('life-old-photo-album', 45, 75, 6, '翻老相册：泛黄的照片里的人都不在了——你把相册传给了孩子，用手机翻拍。', { hap: 2, rel: 2, know: 1 });
L('life-doctor-friend', 45, 65, 4, '你终于有个医生朋友了——他说的每一句话你都截图，比领导的话都重要。', { know: 2, hap: 1, hp: 1 });
L('life-pet-companion', 50, 75, 5, '你养了只猫/狗——孩子大了不在家，这个毛茸茸的家伙承包了整个屋子的声音。', { hap: 4, rel: 1, money: -200 }, null, { cond: s => s.age >= 50 });
L('life-quiet-sunday', 45, 80, 6, '周日下午你什么都没干：阳台、茶、和慢慢往下挪的影子——「虚度」原来这么珍贵。', { hap: 3, hp: 1 });
L('life-grandma-wisdom', 35, 60, 5, '你想起祖母的一句话，在人生的这个节点忽然懂了——有些道理要二十年后才发货。', { know: 2, hap: 2 });
L('life-choose-slow', 40, 58, 5, '你拒绝了升职——「往上再一步，家就没人管了」，你选了准时下班的那条路。', { money: -200, hap: 4, rel: 2 });
L('life-sibling-reunion', 40, 70, 5, '兄弟姐妹难得凑齐：小时候争过的东西都笑了——饭桌上抢最后一筷子的人，如今都白了头。', { hap: 3, rel: 3 }, null, { cond: s => s.siblings && s.siblings.length > 0 && s.age >= 40 });
L('life-old-street-food', 40, 70, 5, '你找了三年终于找到当年校门口那个摊——摊主认出你：「你小时候只敢要小份」。', { hap: 4, rel: 1, money: -20 });
L('life-witness-era', 40, 75, 5, '你给孩子讲「我们那时候」——讲到一半发现 TA 在刷手机，你笑了：代沟也是一种传承。', { know: 1, rel: 1, hap: 1 }, null, { cond: s => s.children.length > 0 && s.age >= 40 });
L('life-two-phone-calls', 45, 70, 5, '你给父母打了电话，又接了孩子的电话——你是「 Sandwich Generation」的中间那片。', { rel: 2, hap: 1, hp: -1 }, null, { cond: s => s.children.length > 0 && s.age >= 45 });

// ══════════ 晚年平静 ══════════
L('life-morning-walk', 60, 90, 8, '清晨散步成了雷打不动的功课——路线固定：公园长椅、早点摊、和一条认识你的狗。', { hp: 2, hap: 2, rel: 1 });
L('life-retirement-routine', 62, 85, 7, '退休第三个月你终于适应了：不用闹钟的日子，你反而起得更早。', { hap: 3, hp: 1 }, null, { cond: s => s.retired });
L('life-old-letters', 65, 90, 5, '你翻出几十年前的信——手写的字迹、邮票、和那时候的「慢」。你读了一下午。', { hap: 3, know: 1 });
L('life-teach-grandchild', 62, 90, 6, '孙辈问你「以前的事」——你讲了三个小时，TA 听得比学校任何课都认真。', { hap: 4, rel: 3, know: 1 }, null, { cond: s => s.age >= 62 });
L('life-garden-years', 60, 90, 6, '你把阳台/院子种满了：番茄、辣椒、和月季——每天早上先去看它们，比自己吃饭还准时。', { hp: 1, hap: 4, money: -100 }, null, { cond: s => s.age >= 60 });
L('life-last-working-day', 58, 68, 6, '最后一个工作日：你把工位收拾干净，把经验写成了文档，然后说了句「那我先走了」。', { hap: 2, know: 1, money: 500 }, null, { cond: s => s.job && s.age >= 58 });
L('life-community-elder', 65, 90, 5, '小区里大家都叫你「X 叔/X 姨」——调解过谁家的婆媳、修过哪栋的门锁，都是你的功绩。', { rel: 3, hap: 2, know: 1 }, null, { cond: s => s.age >= 65 });
L('life-old-love-letter', 68, 92, 4, '你翻到了当年写给爱人的信——TA 在旁边看报纸，你说「那年我胆子真大」，TA 笑了。', { hap: 5, rel: 3 }, null, { cond: s => s.spouse && s.age >= 68 });
L('life-simplify', 65, 90, 5, '你开始「扔东西」：旧物送人、房子腾空——「一辈子攒的，最后要的是空的」。', { know: 2, hap: 2, money: 100 }, null, { cond: s => s.age >= 65 });
L('life-hospital-routine', 70, 92, 6, '医院成了你的「季度打卡点」：老病友群互相问候——「又见面了，还活着，挺好」。', { hp: -1, hap: 1, rel: 2, money: -300 }, null, { cond: s => s.age >= 70 });
L('life-grandchild-phone', 65, 92, 5, '孙辈教你用新手机：你学会了视频、抢红包——「发朋友圈」成了你的新社交。', { know: 1, rel: 2, hap: 2 }, null, { cond: s => s.age >= 65 });
L('life-old-friends-gone', 75, 95, 5, '通讯录里的名字一个个灰了——你给还活着的老伙计打了电话：「老头子，活着就多聊」。', { hap: -2, rel: 3, know: 1 }, null, { cond: s => s.age >= 75 });
L('life-final-wish', 75, 95, 4, '你立了遗嘱、交代了后事——「不给子女添麻烦」是你此生最后一个家长式的关怀。', { know: 1, hap: 1 }, null, { cond: s => s.age >= 75 });
L('life-sunset-photos', 65, 95, 5, '你拍了张日落发到家庭群——孩子回复「爸你拍的比我好」——你觉得这一天生没白活。', { hap: 4, rel: 2 }, null, { cond: s => s.age >= 65 });
L('life-watch-young', 70, 95, 5, '长椅上看年轻人跑过——你想起自己当年的速度，不羡慕了，只觉得「他们跑得真好看」。', { hap: 2, know: 1 }, null, { cond: s => s.age >= 70 });
L('life-birthday-90', 88, 95, 8, '九十大寿：四代人同堂——你数了数，你的身体里住了将近一个世纪的世界。', { hap: 5, rel: 3 }, null, { cond: s => s.age >= 88 });
L('life-life-review', 70, 95, 5, '深夜你想了一遍这一生：遗憾的、幸运的、骄傲的——然后想「明天的早餐吃什么」。', { hap: 2, know: 2 }, null, { cond: s => s.age >= 70 });
L('life-passing-on', 68, 95, 5, '你把用了三十年的工具/厨艺/手艺传给了年轻人——「东西会坏，手艺不会」。', { know: 2, rel: 2, hap: 3 }, null, { cond: s => s.age >= 68 });
L('life-small-world-day', 60, 90, 5, '你在异国他乡的街头听见乡音——你上去搭了句话，世界这么大，回家这么近。', { hap: 3, rel: 1, know: 1 }, null, { cond: s => s.age >= 60 });
L('life-window-rain', 60, 95, 6, '下雨天你在窗边看了很久——「年轻时讨厌的雨天，现在听着挺舒服」。', { hap: 2, hp: 1 }, null, { cond: s => s.age >= 60 });
L('life-family-recipes', 55, 90, 5, '你把家传的菜谱写了下来——每道菜后面都注明「谁爱吃的」：这是你家的族谱，用胃读的。', { rel: 3, know: 2, hap: 2 }, null, { cond: s => s.age >= 55 });
L('life-old-worker-visit', 62, 90, 4, '你回了一趟退休前的单位——门卫不认识你了，但那栋楼记得你爬过的每一层楼梯。', { hap: 1, know: 1 }, null, { cond: s => s.age >= 62 });
L('life-give-away-books', 60, 90, 4, '你把一辈子的书分给了年轻人——每本里都有你写的批注，「这是我的遗产，用脑读的」。', { know: 2, rel: 2, hap: 3 }, null, { cond: s => s.age >= 60 });
L('life-time-capsule', 60, 90, 4, '你埋了个时间胶囊给二十年后的家人——里面有你现在的照片、字条、和这个时代的车票。', { hap: 3, know: 1, rel: 2 }, null, { cond: s => s.age >= 60 });
L('life-night-stars', 55, 95, 5, '你在乡下看了次银河——「城市的灯再亮，也盖不住这个」。你拍给孙辈看，TA 问「这是滤镜吗」。', { hap: 3, know: 1 }, null, { cond: s => s.age >= 55 });
L('life-hometown-last', 70, 95, 4, '你回了趟出生的地方——老屋塌了半边，但村口那棵树还在，你摸了摸树干：「我回来了」。', { hap: 3, know: 1, rel: 1 }, null, { cond: s => s.age >= 70 });
L('life-grandma-candy', 62, 95, 4, '你口袋里永远有糖——不是为了自己吃，是给孙辈和街坊的小孩：「来，爷爷/奶奶这里有的」。', { rel: 3, hap: 3 }, null, { cond: s => s.age >= 62 });
L('life-last-teaching', 70, 95, 4, '你给社区的年轻人讲了你这一行的事——讲到一半发现他们都在记笔记，你讲了三个小时。', { know: 2, rel: 3, hap: 3 }, null, { cond: s => s.age >= 70 });
L('life-peaceful-evening', 75, 96, 6, '晚饭后你和老伴坐在门口：谁都没说话，看着巷子里的灯一盏盏亮起来。', { hap: 3, rel: 2 }, null, { cond: s => s.age >= 75 });
L('life-tell-no-regret', 80, 96, 5, '有人问你「后悔吗」——你想了想这一生说「重来一次大概还是这么过」，这不是妥协，是和解。', { hap: 3, know: 2 }, null, { cond: s => s.age >= 80 });
L('life-grandpa-clock', 75, 96, 4, '你修好了那座老座钟——滴答声和几十年前一样，时间没变，只是听的人换了几轮。', { know: 1, hap: 3 }, null, { cond: s => s.age >= 75 });
L('life-final-garden', 80, 97, 4, '你在院子里种下了最后一棵树——「我看不到它长成的那天，但有人会坐在下面乘凉」。', { hap: 2, know: 1, rel: 1 }, null, { cond: s => s.age >= 80 });
L('life-every-day-counts', 85, 97, 6, '你醒来后做的第一件事是拉开窗帘——「又多赚了一天」，你是这么跟自己说的。', { hap: 2, hp: 1 }, null, { cond: s => s.age >= 85 });
L('life-four-generation-photo', 82, 97, 6, '四世同堂的全家福拍好了：你坐在正中间——照片里你的身后，站着一整个世纪。', { hap: 5, rel: 4 }, null, { cond: s => s.children.length > 0 && s.age >= 82 });
L('life-death-ready', 90, 98, 5, '你把一切都安排好了：存款、房产、最后想说的话——然后你继续浇花，「日子还长」。', { hap: 2, know: 1, rel: 1 }, null, { cond: s => s.age >= 90 });
L('life-century-memory', 90, 98, 6, '有人采访你——你见证了从「信」到「AI」的一生：「世界变得太快，人没变。」', { know: 2, hap: 2 }, null, { cond: s => s.age >= 90 });
