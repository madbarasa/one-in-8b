// 文化圈补强 B v0.9.3：中东四圈 + 欧洲三圈 + 美洲三圈 + 盎格鲁 + 大洋洲，每圈 16 条

export const CUL_MORE_B = [];
const L = (id, minAge, maxAge, weight, text, effect, source, extra) =>
  CUL_MORE_B.push({ id, type: 'log', minAge, maxAge, weight, text, effect: effect || {}, source, ...(extra || {}) });

// ══════════ 马格里布 ═══════════
const MA = s => s.culture === 'maghreb';
L('mg-medina-childhood', 5, 60, 8, '老城（Medina）的巷子窄得只容一头驴。你是巷子里的孩子王：十户人家的门都认识你，谁家炖肉你都闻得到。', { rel: 3, hap: 3 }, '北非老城巷弄社会结构延续千年', { cond: MA });
L('mg-mint-tea', 6, 80, 9, '薄荷茶要倒三杯：第一杯苦如生活，第二杯浓如爱情，第三杯淡如死亡。客人必须三杯全喝。', { rel: 3, hap: 3 }, '北非薄荷茶三杯礼仪（Maghreb Tea Ritual）', { cond: MA });
L('mg-ramadan-dates', 7, 80, 9, '斋月的日落炮响后，第一颗椰枣和一碗 harira 汤下肚。整月白天不吃饭，你的胃学会了等待。', { hp: 1, hap: 3, rel: 2 }, null, { cond: MA });
L('mg-tannery-smell', 10, 60, 6, '皮革染坊的石臼里泡着鸽粪和藏红花。味道分两层：游客闻到臭，你闻到几代人的饭碗。', { know: 2, money: 30 }, '菲斯染坊延续 11 世纪工艺，UNESCO 遗产', { cond: MA });
L('mg-caftan-wedding', 20, 40, 8, '婚礼连办三天：Amariya 之夜新娘穿白，Henna 之夜画满手脚，正日摆一百桌。你的婚礼是全街的节日。', { hap: 6, rel: 4, money: -300 }, null, { cond: MA, once: true });
L('mg-sahara-trek', 12, 60, 7, '你随驼队进撒哈拉。夜里的沙丘冷得像另一个星球，银河低得伸手就能搅动。柏柏尔人的星星名字你学了三十个。', { know: 3, hap: 4 }, null, { cond: MA, once: true });
L('mg-argan-women', 10, 60, 6, '妇女合作社碾阿甘油。一斤果仁一小时手工活。你的合作社把油卖到了巴黎——你的手艺有了汇率。', { money: 60, know: 1, rel: 3 }, '摩洛哥阿甘油产业全由女性合作社运营，年出口 7000 万美元', { cond: MA });
L('mg-french-school', 6, 18, 8, '学校一半课程用法语。你在家说达里贾方言，写作业用标准阿拉伯语，看电视追法国动画。三语大脑从小养成。', { know: 3 }, '马格里布法语使用率：摩洛哥 36% 人口', { cond: MA, stage: 'child' });
L('mg-migration-sea', 18, 40, 6, '那几年村里的年轻人一个个往海上走。有人寄回了欧元和新手机，有人再没消息。你家最终决定：留下。', { hap: -2, know: 1 }, '2010-2020 年经地中海马格里布移民潮超 100 万', { cond: MA, once: true });
L('mg-kasbah-restore', 25, 55, 6, '你参与了老城夯土建筑的修复。土+石灰+稻草的配方一千年没变。你修的墙要站一千年。', { money: 80, know: 3, hap: 2 }, null, { cond: MA, once: true });
L('mg-olive-season', 12, 70, 7, '橄榄收获季全家打果子。绿橄榄腌咸水、黑橄榄压榨。你家的橄榄油拌一切——这罐油就是钱包。', { money: 40, hp: 1 }, '突尼斯/摩洛哥橄榄油年产 30 万吨+', { cond: MA });
L('mg-rgaibi-music', 14, 70, 6, 'Gnaoua 音乐之夜：卢塔琴、铁响板、通宵的循环节奏。听得入迷的人会「被灵魂附体」——那是音乐在治病。', { hap: 4, rel: 2 }, 'Gnaoua 音乐 2019 年列入 UNESCO 非遗', { cond: MA });
L('mg-desert-solar', 22, 55, 6, '撒哈拉边的太阳能电站并网了。四百万面镜子追着太阳。你报名做了运维——沙漠终于开始「发电养人」。', { money: 120, know: 2 }, '摩洛哥 Noor 电站 580MW，全球最大 CSP 之一', { cond: MA, once: true });
L('mg-tagine-friday', 5, 80, 8, '周五主麻日的塔吉锅炖肉全街飘香。谁的锅盖一掀，邻居的孩子就有理由「路过」。', { hap: 4, rel: 3 }, null, { cond: MA });
L('mg-henna-ashura', 8, 30, 6, '阿舒拉节 kids 的「讨糖夜」：提灯挨家要果子和硬币。你化的鬼脸妆是巷子里最吓人的。', { hap: 4, rel: 2 }, null, { cond: MA, stage: 'child' });
L('mg-remittance-france', 20, 50, 7, '你在法国的工地/餐厅打工。每月汇回家的钱盖了一层楼。村里管你家叫「法国房子」。', { money: 250, rel: 3, hap: -2 }, '摩洛哥侨汇年均 110 亿美元，全球前十五', { cond: MA, once: true });

// ══════════ 阿拉伯核心 ═══════════
const AR = s => s.culture === 'arab-core';
L('ar-quran-hifz', 6, 18, 8, '你开始背诵古兰经。三年背完全部三十卷——那本「书」从此在你脑子里，你走到哪它跟到哪。', { know: 4, hap: 1 }, '全球「哈菲兹」（能全文背诵者）超 1000 万人', { cond: AR });
L('ar-desert-camp', 10, 50, 7, '家族去沙漠扎营一周。老式帐篷、炭火咖啡、星空下的驼群。爷爷说沙漠教会人「什么都可以少，除了水」。', { know: 2, hap: 4, rel: 2 }, null, { cond: AR });
L('ar-oil-boom', 20, 55, 7, '油田开发到你的村子。一夜之间柏油路、学校、医院全来了。你爸爸说：我们的沙子下面躺着黑色的河。', { money: 150, know: 2, hap: 3 }, '海湾国家石油 GDP 占比：沙特 24%、科威特 50%+', { cond: AR, once: true });
L('ar-ajwa-dates', 4, 80, 8, '椰枣季。你家的枣园产「阿吉瓦」——先知最爱的那种。一颗枣配一杯阿拉伯咖啡，就是待客的全部诚意。', { hap: 3, money: 30 }, null, { cond: AR });
L('ar-hajj-dream', 30, 75, 8, '攒了一辈子的钱终于够全家去麦加朝觐。飞机降落那一刻，你爸爸哭了。四百万人和你穿同一件白袍。', { hap: 7, rel: 4, money: -500 }, '麦加朝觐年均 250 万人，全球最大年度宗教集会', { cond: AR, once: true });
L('ar-souq-bargain', 10, 70, 7, '集市砍价是艺术：从三分之一开始谈，茶喝了三轮，最后成交价是开价的一半，你俩都觉得赚了。', { know: 2, rel: 1, money: -20 }, null, { cond: AR });
L('ar-majlis', 15, 75, 8, '傍晚的 Majlis（客厅集会）：坐垫排开、咖啡壶轮转、话题从驼价聊到卫星。没有椅子，人人平等。', { rel: 4, know: 2 }, 'Majlis 2015 年列入 UNESCO 非遗', { cond: AR });
L('ar-falconry', 12, 60, 6, '你养了一只隼。训练、放飞、猎回沙鸡。一只好隼值一辆好车——但你的隼不卖，它是家人。', { know: 3, money: -200, hap: 4 }, '鹰隼猎术 2010 年列入 UNESCO 非遗；海湾隼护照制度', { cond: AR, once: true });
L('ar-oasis-palm', 8, 70, 7, '绿洲的椰枣林是「三层农业」：椰枣遮阴、中层果树、地面种菜。一株枣树浇活了三层收成。', { money: 40, know: 2 }, '阿曼/沙特绿洲农业系统（Aflaj）列入世界遗产', { cond: AR });
L('ar-shisha-young', 16, 35, 7, '水烟馆里你和朋友们聊到半夜。烟雾绕梁，话题绕人生。医生的话你听过——听过而已。', { hp: -2, rel: 3, hap: 2 }, null, { cond: AR });
L('ar-wedding-zaffe', 22, 40, 8, '婚礼的 Zaffe 列队：鼓手开道、新娘的白纱、全场的掌声。你和新娘被红绸子围着转场——像国王和王后。', { hap: 6, rel: 4, money: -250 }, null, { cond: AR, once: true });
L('ar-dubai-wander', 20, 45, 7, '你去了海湾大城市打工/创业。哈利法塔的工地、机场的物流仓、写字楼的保安室——城市每层楼都有你老乡。', { money: 200, know: 2, rel: 1 }, '迪拜外籍人口占 88%，南亚阿拉伯劳工主力', { cond: AR, once: true });
L('ar-calligraphy', 10, 60, 6, '你学阿拉伯书法。一个字母练一百遍——老师说「字是灵魂的手印」。你的作品被清真寺采用了。', { know: 4, hap: 3 }, null, { cond: AR, once: true });
L('ar-ramadan-canon', 5, 80, 8, '斋月每晚的特拉威哈拜，诵经声从清真寺传几条街。整个月的夜晚都被同一种声音拢在一起。', { rel: 3, hap: 3 }, null, { cond: AR });
L('ar-pearl-diving', 12, 45, 6, '采珠季你潜入波斯湾。腰间石头坠下十八米，憋气九十秒。珍珠市价的运气和肺活量一样重要。', { money: 60, hp: -1, know: 2 }, '海湾采珠业 1930 年前是支柱产业，后被养殖取代', { cond: AR, once: true });
L('ar-soccer-nation', 10, 40, 8, '世界杯年：全城挂满旗帜。你的国家队赢球那晚，汽车按喇叭按到天亮。足球是阿拉伯世界唯一无争议的话题。', { hap: 5, rel: 3 }, '2022 卡塔尔世界杯：中东首次承办', { cond: AR });

// ══════════ 波斯文化圈 ═══════════
const PE = s => s.culture === 'persia';
L('pe-nowruz', 3, 80, 10, '诺鲁孜新年：七样以 S 开头的食物摆上「七鲜桌」，金鱼、镜子、麦苗。新年不是 1 月 1 日，是春分那天——春天本身就是新年。', { hap: 6, rel: 4 }, '诺鲁孜（Nowruz）3000 年历史，3 月 21 日前后，UNESCO 非遗', { cond: PE });
L('pe-ta-arof', 10, 70, 8, '「Ta’arof」的礼仪迷宫：客人婉拒三次才能收下茶；店主坚持不收钱，你必须坚持付。双方都知道这是仪式，双方都必须演完。', { know: 3, rel: 3 }, '波斯 Ta’arof 礼仪体系：拒绝即尊重', { cond: PE });
L('pe-poetry-hafez', 8, 80, 9, '冬至夜（Shab-e Yalda）全家读哈菲兹。每人随机翻开一页——那首诗就是你来年的「签」。你的那首写的是远行。', { know: 3, hap: 4, rel: 3 }, '雅尔达夜读诗 2022 年列入 UNESCO 非遗', { cond: PE });
L('pe-bazaar-carpet', 15, 65, 7, '巴扎的地毯行里，你学会了看「结密度」：一平方英寸三百个结的毯子要织一年。你家的传家毯是奶奶的嫁妆。', { know: 2, money: -150 }, '波斯手工地毯年出口 10 亿美元+', { cond: PE });
L('pe-taazi-taxi', 20, 55, 7, '德黑兰的出租车是移动辩论台：司机和你从油价聊到诗歌，从足球聊到政治。你说「那不能说」——他大笑：所以我们聊诗。', { know: 2, hap: 2, rel: 1 }, null, { cond: PE });
L('pe-saffron-rice', 5, 80, 8, '藏红花米饭：锅底要结出金黄的 Tahdig（锅巴）。谁抢到第一块锅巴，谁就是今晚最受宠的人。', { hap: 4, rel: 2 }, '伊朗藏红花占全球产量 90%', { cond: PE });
L('pe-shirazi-wine-legacy', 18, 60, 5, '你研究了家乡的诗歌史：一千年前设拉子的诗人写的酒歌至今无人超越。葡萄园早就换了作物——诗还在。', { know: 3, hap: 2 }, null, { cond: PE, once: true });
L('pe-bazaar-apprentice', 15, 35, 7, '你进了巴扎当学徒。师父教你三件事：认货、记账、沉默。十年后你有了自己的摊位——巴扎的规矩一百年没变。', { know: 3, money: 80, rel: 2 }, null, { cond: PE, once: true });
L('pe-tehran-traffic', 15, 55, 7, '德黑兰的交通：车道是「建议」不是「规定」。你练就了在混乱中找到秩序的眼睛——这座城市教的第一课。', { hp: -1, know: 1 }, null, { cond: PE });
L('pe-mountain-damavand', 12, 60, 6, '你登了达马万德峰——5610 米的休眠火山，波斯神话里被锁住的巨人之山。山顶的硫磺雾里你插了家族的旗。', { hp: 3, know: 2, hap: 5 }, null, { cond: PE, once: true });
L('pe-sanctions-econ', 20, 60, 8, '制裁年代：进口零件要「转五手」，汇率一天三变。你学会了在限制里找缝隙——这是这一代人的必修课。', { money: -150, know: 3, hap: -3 }, '伊朗里亚尔 2018-2023 贬值 90%+', { cond: PE });
L('pe-perspolis-field-trip', 10, 30, 6, '学校组织看波斯波利斯遗址。两千五百年的浮雕上刻着各族使节朝贡——你的祖先管过半个已知世界。', { know: 3, hap: 3 }, null, { cond: PE, once: true });
L('pe-zar-ritual', 20, 60, 5, '南方的 Zar 疗愈仪式：鼓声、摇晃、多神的海风。巫师「请出」附体的困扰。你见证了一次完整的治愈。', { know: 2, hap: 2 }, null, { cond: PE, once: true });
L('pe-saffron-fields', 10, 60, 6, '藏红花十月采收：凌晨摘花、当日烘干——十七万朵花出一公斤。你家三亩地是「红金」田。', { money: 80, hp: -1 }, '一公斤藏红花需 17 万朵花，手工采摘', { cond: PE });
L('pe-chess-nard', 8, 70, 6, '爷爷教你玩双陆棋（Nard），说这是萨珊王朝的宫廷游戏。骰子一响，一千四百年就这么过去了。', { know: 2, hap: 3, rel: 2 }, null, { cond: PE });
L('pe-diaspora-call', 20, 60, 7, '每周日你跟洛杉矶的表亲视频。你家的表在洛杉矶凌晨三点，他们那头阳光正盛。波斯人的散居地比帝国还大。', { rel: 3, know: 1 }, '伊朗侨民 400 万+，洛杉矶「Tehrangeles」为最大海外社区', { cond: PE });

// ══════════ 突厥-高加索圈 ═══════════
const TU = s => s.culture === 'turkic-caucasus';
L('tu-tea-tulip-glass', 5, 80, 9, '茶永远装在郁金香形的小杯里，配两块方糖——一块咬着喝，一块泡着喝。茶不问事，只续杯。', { hap: 3, rel: 3 }, '土耳其人均年饮茶 3.2 公斤，全球第一', { cond: TU });
L('tu-hamam-bath', 10, 70, 7, '土耳其浴：大理石台面上蒸、搓、冲、裹。搓澡师傅的手像熨斗。出来时你觉得换了一层皮。', { hp: 3, hap: 4 }, 'Hamam 传统自奥斯曼时代延续 600 年', { cond: TU });
L('tu-backgammon-tea', 12, 70, 7, '街边双陆棋摊：骰子声、茶杯声、骂骰子声。高手下棋不用看骰子——用听的去判运气。', { know: 2, hap: 3, rel: 2 }, null, { cond: TU });
L('tu-kebab-family', 5, 80, 8, '烤肉店是家族产业：爷爷切的肉、爸爸掌的火、你端盘子。每张烤饼都是三代人的接力。', { hap: 3, rel: 3, money: 20 }, null, { cond: TU });
L('tu-carpet-knot', 12, 60, 6, '你学打地毯结——土耳其结和波斯结的差别在「剪断方向」。奶奶说：结的密度就是媳妇的耐心。', { know: 3, hap: 1 }, null, { cond: TU });
L('tu-eid-sacrifice', 10, 80, 8, '宰牲节：全家分工处理羊肉，三分之一送穷人。你负责分肉上门——每敲一扇门都有一句「愿真主赐福」。', { rel: 4, hap: 3 }, '古尔邦节全球 20 亿穆斯林同步举行', { cond: TU });
L('tu-mountain-yayla', 10, 60, 6, '夏季高原牧场（Yayla）迁徙：全家赶着牛羊上山避暑。黑海山区的云雾就在你脚边。', { know: 2, hap: 3 }, '土耳其黑海高原迁徙牧业传统', { cond: TU });
L('tu-nazar-bead', 0, 80, 8, '「邪眼珠」挂在你家门口、车上、婴儿襁褓上。碎了不是坏事——它替你挡了一次。新的一年换新的蓝眼睛。', { hap: 2, know: 1 }, '土耳其邪眼护符（Nazar Boncuğu）五千年历史', { cond: TU });
L('tu-dolma-night', 12, 70, 7, '包菜叶之夜：全家分工卷葡萄叶。你卷的头十个都散了，外婆说手劲要像哄孩子，不能像捆柴。', { hap: 4, rel: 3, know: 1 }, null, { cond: TU });
L('tu-mevlana-poetry', 14, 70, 6, '你听了旋转舞（Sema）仪式：白袍僧侣旋转、右手指天左手抚地——像一根针缝起天地。鲁米的诗在场内回响。', { know: 3, hap: 3 }, '鲁米是全球最畅销诗人之一；Mevlevi 旋转舞 UNESCO 非遗', { cond: TU, once: true });
L('tu-migration-germany', 18, 45, 7, '你去了德国打工。土耳其烤肉店在柏林开了一万家——你家的那家成了本地网红。你的孩子在德语学校长大。', { money: 250, know: 2, rel: 2 }, '德国土耳其裔 300 万+，1961 年劳务协议起', { cond: TU, once: true });
L('tu-hair-cutting', 6, 15, 6, '孩子第一次理发的「剪发礼」：亲友喂甜食、念祝词。你坐在椅子上又紧张又馋。', { rel: 3, hap: 3 }, null, { cond: TU, once: true });
L('tu-boat-bosphorus', 10, 70, 6, '你坐渡轮横渡博斯普鲁斯海峡——一海欧群跟着船。一边是亚洲一边是欧洲，你的通勤横跨两个大洲。', { know: 2, hap: 3 }, '伊斯坦布尔渡轮日均 15 万人次', { cond: TU });
L('tu-simit-breakfast', 5, 80, 8, '清晨的芝麻圈（Simit）配红茶加奶酪——站着的早餐叫「街头早餐」，坐着吃的才叫讲究。', { hap: 2, money: -5 }, null, { cond: TU });
L('tu-georgia-toast', 15, 70, 6, '高加索的酒桌规矩：Tamada（司酒人）祝酒才能举杯，一场酒十七轮祝词——从祖先到邻居的驴。', { rel: 3, know: 2, hap: 3 }, '格鲁吉亚 Supra 酒宴传统：Tamada 制度千年', { cond: s => TU(s) && ['GEO', 'ARM', 'AZE'].includes(s.iso3) });
L('tu-cappadocia-raft', 20, 60, 5, '你家在卡帕多奇亚开了民宿。每天清晨一百个热气球飞过你家的烟囱岩。游客的惊叹声是你的闹钟。', { money: 150, know: 1, hap: 3 }, '卡帕多奇亚年游客 300 万+，全球热气球之都', { cond: TU, once: true });

// ══════════ 巴尔干圈 ═══════════
const BK = s => s.culture === 'balkan';
L('bk-rakija-distill', 15, 70, 7, '秋天全家蒸拉基娅果酒：李子、桑葚、无花果。第一杯要洒在地上敬祖先。度数是脸红的家谱。', { rel: 3, hap: 3, money: -20 }, '巴尔干 Rakija 蒸馏酒：家家户户自酿传统', { cond: BK });
L('bk-sarma-sunday', 5, 80, 8, '周日全家卷酸菜卷（Sarma）：外婆的配方要手抄不许拍照。谁娶了会卷酸菜的媳妇，谁在家族里有地位。', { hap: 4, rel: 3 }, null, { cond: BK });
L('bk-coffee-fortune', 12, 70, 7, '土耳其咖啡喝完后倒扣杯子——用残渣算命。姨婆说你杯子里的图案是「一条路和一座桥」。后来你真出了国。', { know: 2, hap: 3, rel: 2 }, null, { cond: BK });
L('bk-kolo-dance', 12, 70, 7, '科洛圆环舞：全村手拉手，脚步不超过三 种，节奏却能跳一夜。你的位置在曾祖母和你女儿之间。', { hap: 4, rel: 4, hp: 1 }, null, { cond: BK });
L('bk-slivovitz-wedding', 22, 45, 7, '巴尔干婚礼：乐队、整只烤猪、永不散场的科洛舞。新郎家抬着酒桶来，新娘家抬着烤炉去。', { hap: 6, rel: 4, money: -200 }, null, { cond: BK, once: true });
L('bk-guslar-epic', 10, 60, 6, '琴师（Guslar）用单弦琴唱英雄史诗——唱的是一三八九年的科索沃战役，听客里有八岁的你和八十岁的老兵。', { know: 3, hap: 2, rel: 2 }, '巴尔干史诗琴歌（Guslarske pesme）传统', { cond: BK });
L('bk-pipe-smoke', 25, 80, 6, '咖啡馆是你的第二客厅。浓咖啡、烟斗、棋盘。你在这张桌上认识了你一半的朋友和全部的对手。', { rel: 3, hap: 2, hp: -1 }, null, { cond: BK });
L('bk-mountains-herd', 10, 50, 7, '你赶着羊群翻山。巴尔干的山路陡得像楼梯。你的牧羊犬比你更熟悉每一头羊的名字。', { hp: 2, know: 2, money: 30 }, null, { cond: BK });
L('bk-war-memory', 30, 75, 6, '战争过去二十年了。你的邻居当年在另一边。你们如今一起钓鱼——鱼不在乎你们曾是敌人。', { rel: 2, hap: 1, know: 1 }, '1990s 南斯拉夫战争死亡 13 万+', { cond: BK, once: true });
L('bk-ski-vacation', 12, 50, 6, '冬假全家上山滑雪。巴尔干的雪场便宜又陡——你的小腿肌肉证明了一切。', { hp: 3, hap: 4, money: -80 }, null, { cond: BK });
L('bk-slava-saint', 8, 80, 8, '家族守护神圣日（Slava）：教堂、蛋糕、三天宴席。塞尔维亚人的 Slava 是家族身份证——不随搬家而变。', { rel: 4, hap: 4 }, 'Slava 2014 年列入 UNESCO 非遗，塞尔维亚独有', { cond: s => BK(s) && s.iso3 === 'SRB' });
L('bk-ajvar-autumn', 12, 70, 7, '秋天全家烤辣椒做 Ajvar 酱：几百个辣椒在炉上烤出黑皮，剥皮、打酱、装罐。一罐酱的工序等于一个周末。', { hap: 3, rel: 3, know: 1 }, null, { cond: BK });
L('bk-truck-art-highway', 20, 55, 6, '你跑贝尔格莱德-萨格勒布长途货运。高速公路一通，物流像解开了锁链。你见证了国境线从墙变成一条虚线。', { money: 120, know: 2 }, null, { cond: BK, once: true });
L('bk-dj-mix', 16, 35, 6, '你成了婚礼 DJ。巴尔干铜管乐+电子舞曲+圆舞曲三合一。你的歌单是整个地区的情绪晴雨表。', { hap: 4, money: 60, rel: 2 }, null, { cond: BK, once: true });
L('bk-guca-festival', 14, 60, 6, 'Guća 铜管乐节：全世界最响的节日。五十支乐队、七天七夜。你的耳膜和心一样热。', { hap: 6, money: -50, rel: 2 }, 'Guća 铜管乐节年游客 50 万', { cond: BK, once: true });
L('bk-children-swim', 8, 25, 7, '夏天就在多瑙河/亚得里亚海边过。你五岁学会游泳——巴尔干小孩的水性跟走路一起学的。', { hp: 2, hap: 3 }, null, { cond: BK });

// ══════════ 东欧圈 ═══════════
const EU = s => s.culture === 'east-euro';
L('eu-dacha-potato', 8, 70, 9, '全家去「达恰」种土豆。三亩地、一把锄头、一整个夏天。回城时后备箱装满——冬天的罐头从此有着落。', { hp: 1, rel: 3, money: 30 }, '俄罗斯/乌克兰达恰菜园：家庭食品自给率 50%+', { cond: EU });
L('eu-banya-steam', 15, 75, 8, '澡堂（Banya）：桦树枝拍打、雪地打滚、冷水浇头。三蒸三凉之后，你觉得自己能活一百岁。', { hp: 3, hap: 4, rel: 2 }, null, { cond: EU });
L('eu-vareniki-night', 10, 70, 8, '包饺子之夜：土豆馅、樱桃馅、奶酪馅。奶奶包的褶子永远十八个。你数过——十八个，一个不多。', { hap: 4, rel: 3, know: 1 }, null, { cond: EU });
L('eu-conservatory', 15, 65, 8, '秋天腌菜季：酸黄瓜、番茄、卷心菜一排排上架。地窖是你家的「银行」——存的是整个冬天。', { know: 2, rel: 2, money: -30 }, null, { cond: EU });
L('eu-victory-day', 8, 85, 8, '胜利日：爷爷戴着勋章去游行。他给你看一张照片——照片上的人只有一半活着回来。他从不讲细节。', { rel: 3, know: 2, hap: -1 }, '苏联二战死亡 2700 万，5 月 9 日胜利日', { cond: s => EU(s) && (s.birthYear + s.age >= 1950), once: true });
L('eu-train-samovar', 12, 70, 7, '长途火车三天三夜。茶炉（Samovar）永远在烧，过道里的陌生人第三天变成朋友。你们交换了地址——那年头真的会写信。', { rel: 3, know: 1, hap: 2 }, null, { cond: EU });
L('eu-church-babushka', 10, 80, 7, '教堂里 babushka（老太太）们最虔诚。你跟着她们学会了画十字的顺序——从右到左，和西方相反。', { rel: 2, know: 1 }, '东正教堂礼仪：画十字方向与西方教会相反', { cond: EU });
L('eu-oil-town', 20, 50, 6, '你进了油田/天然气公司。西伯利亚的井架零下四十度照转。你的工资是矿区物价的四倍——但商店只有三种香肠。', { money: 250, hp: -2, know: 1 }, '俄罗斯油气占出口收入 50%+', { cond: EU, once: true });
L('eu-university-free', 17, 25, 8, '你考上了公立大学——学费全免，还发奖学金。父母的婚礼礼物是一只行李箱：装你的未来。', { know: 5, hap: 3 }, '东欧公立大学免学费传统（苏联遗产）', { cond: EU, once: true });
L('eu-shashlik-dacha', 12, 70, 7, '达恰的烧烤日：炭火、羊肉串、伏特加和吉他。歌声从下午唱到星星出来。邻居隔着栅栏合唱。', { hap: 5, rel: 4 }, null, { cond: EU });
L('eu-winter-swim', 20, 70, 5, '主显节你跳了冰窟——零下二十度的洗礼。上岸后你觉得世界是崭新的。信仰有时候是用温度量的。', { hp: 2, hap: 4 }, '东正教主显节（1 月 19 日）冰水洗礼传统', { cond: EU, once: true });
L('eu-mushroom-hunt', 8, 75, 8, '蘑菇季全家进林子。你能分辨二十种能吃的、三种「吃了全家哭」的。白蘑菇是荣誉，鸡油菌是晚饭。', { know: 3, hp: 1, money: 10 }, '东欧采蘑菇是全民传统：人均年采 5 公斤+', { cond: EU });
L('eu-borsch-war', 15, 70, 7, '你家关于红菜汤的「家谱之争」：放不加番茄？要不要酸奶油？奶奶的配方是圣旨——你们吵了三十年，每次都吃得精光。', { hap: 3, rel: 3, know: 1 }, '乌克兰红菜汤（Borsch）2022 年列入 UNESCO 急需保护非遗', { cond: EU });
L('eu-oligarch-nephew', 20, 45, 5, '九十年代私有化那几年，有人一夜暴富，有人一夜失去一切。你选择去教书——你的工资没变，你的良心还在。', { know: 2, hap: 1, money: -50 }, '1990s 俄罗斯私有化：人均财富缩水 40%', { cond: s => EU(s) && s.birthYear + s.age >= 1992 && s.birthYear + s.age <= 1998, once: true });
L('eu-ember-lullaby', 2, 12, 7, '奶奶的摇篮曲是方言唱的。那种语言学校不教、电视不说——但它会像火炉的余温一样陪你一生。', { rel: 3, hap: 2 }, null, { cond: EU, stage: 'child' });
L('eu-hockey-rink', 8, 30, 7, '冬天运河冻实了就是冰球场。你家的「联赛」有四个队——按楼栋分组。守门员的帽子是毛线织的。', { hp: 3, hap: 4, rel: 3 }, null, { cond: s => EU(s) && ['RUS', 'CZE', 'SVK', 'FIN'].includes(s.iso3) });

// ══════════ 西欧-北欧-南欧圈 ═══════════
const WN = s => s.culture === 'west-north-euro';
L('wn-bike-commute', 8, 75, 9, '你骑车通勤——风雨无阻。车筐里的面包、雨披下的公文包。这个国家的自行车道比高速路宽。', { hp: 3, money: -20 }, '荷兰人均自行车 1.3 辆；阿姆斯特丹骑行通勤率 38%', { cond: s => WN(s) && ['NLD', 'DNK', 'DEU', 'BEL'].includes(s.iso3) });
L('wn-cafe-terrace', 15, 80, 8, '咖啡馆的露天座位你一坐就是一下午。一杯咖啡两小时——没人催你，账单永远只有一杯。', { hap: 3, rel: 3, money: -15 }, null, { cond: WN });
L('wn-sunday-closed', 8, 70, 7, '周日全城关门。你学会了周日要「计划」：家庭、散步、烤肉。无所事事是一种被保护的权力。', { hap: 3, rel: 3 }, '德国「Ladenschlussgesetz」周日歇业法延续百年', { cond: s => WN(s) && ['DEU', 'AUT', 'CHE'].includes(s.iso3) });
L('wn-fika-ritual', 10, 75, 8, '每天下午三点 Fika：咖啡+肉桂卷+聊天。老板带头——他说 productivity 是从休息里长出来的。', { hap: 4, rel: 3 }, '瑞典 Fika 制度：每天法定休息文化', { cond: s => WN(s) && ['SWE', 'NOR', 'DNK', 'FIN', 'ISL'].includes(s.iso3) });
L('wn-sauna-lake', 12, 75, 8, '桑拿后跳进零度的湖里。蒸与冰之间来回三次。芬兰人说：不跳的桑拿等于没蒸。', { hp: 3, hap: 4 }, '芬兰人均桑拿 1 间：全国 300 万桑拿/550 万人', { cond: s => WN(s) && ['FIN', 'EST', 'SWE', 'NOR'].includes(s.iso3) });
L('wn-midnight-sun', 10, 70, 6, '极昼来了：太阳午夜不落。你半夜十一点在花园里烧烤，邻居们穿着睡衣来喝啤酒。黑夜要等到八月。', { hap: 4, know: 1 }, '北极圈内极昼持续 60-90 天', { cond: s => WN(s) && s.iso3 !== 'MLT', once: true });
L('wn-christmas-market', 5, 80, 8, '圣诞市集：热红酒、姜饼、木屋摊位。你买的不是货——是「节日开始了」的确认仪式。', { hap: 5, rel: 3, money: -30 }, '德语区圣诞市集传统 700 年+', { cond: WN });
L('wn-recycle-religion', 10, 80, 8, '垃圾分类十二个桶。瓶子押金制——你从不乱扔，因为每个瓶子都是钱。孩子在学校学的环保比你懂得多。', { know: 2, money: 20 }, '德国瓶子押金回收率 98%，全球最高', { cond: WN });
L('wn-university-hike', 18, 30, 7, '大学毕业礼是徒步——全班背包走一百公里。你的教授也来了，他说他毕业那年也这么走的。传统比学分硬。', { know: 2, hap: 5, hp: 2 }, null, { cond: s => WN(s) && s.iso3 !== 'ITA', once: true });
L('wn-garden-allotment', 30, 70, 7, '你租了块「分配花园」：十平米、一个小棚。退休者们在这儿种花——和种了一辈子的「闲情」。', { hap: 4, rel: 3, hp: 1 }, '德国分配花园（Kleingarten）110 万块', { cond: WN, once: true });
L('wn-flat-pack-furniture', 20, 60, 7, '你买了平板家具——自己装。说明书没有文字只有图。装完的柜子斜了一毫米，你决定当作设计感。', { money: -80, know: 1, hap: 1 }, null, { cond: WN });
L('wn-ski-week', 10, 60, 7, '滑雪周是全民假期。三岁的孩子和七十岁的爷爷在同一条雪道上。你摔的每跤都是年票的分期付款。', { hp: 3, hap: 5, money: -150 }, '阿尔卑斯滑雪年游客 4000 万', { cond: s => WN(s) && ['AUT', 'CHE', 'FRA', 'ITA', 'SWE', 'NOR'].includes(s.iso3) });
L('wn-overtime-shame', 20, 60, 7, '六点后办公室没人了——加班在这里是「效率差」的信号。你准时下班去接孩子，没有人看你一眼。', { hap: 3, rel: 3 }, '欧盟工时指令：每周 48 小时上限+20 天年假下限', { cond: WN });
L('wn-euro-exchange', 20, 70, 6, '你的国家换了欧元。老马克/法郎/里拉成了记忆。奶奶把一张旧钞票裱起来挂在墙上——「这钱上有国王的脸」。', { know: 2, hap: 1 }, '欧元 2002 年流通，19 国使用', { cond: s => WN(s) && ['DEU', 'FRA', 'NLD', 'BEL', 'LUX', 'ESP', 'ITA', 'FIN', 'GRC'].includes(s.iso3), once: true });
L('wn-siesta-south', 15, 70, 7, '南方的小镇午后两点全城打烊。街上只有你和阳光。你学会了把午睡当作对身体的正式 appointments。', { hp: 2, hap: 3 }, '西班牙/意大利南部午休传统：14-17 点商店歇业', { cond: s => WN(s) && ['ESP', 'ITA', 'GRC', 'MLT'].includes(s.iso3) });
L('wn- retire-boat', 60, 75, 6, '退休后你买了艘小帆船——年轻时的梦。你花三个月学绳结、看潮汐。第一次独自出海那天，你在甲板上敬了海一杯。', { hap: 6, know: 2, money: -400 }, null, { cond: WN, once: true });

// ══════════ 拉丁美洲（西语）══════════
const LA = s => s.culture === 'hispanic-latam';
L('la-quinceanera', 14, 16, 9, '你的十五岁生日是人生第一次「 Society 登场」：白裙、华尔兹、爸爸的第一支舞。这场舞会你的家庭筹备了一年。', { hap: 7, rel: 5, money: -200 }, '十五岁成人礼（Quinceañera）：拉美女孩的人生里程碑', { cond: s => LA(s) && s.gender === 'female', once: true });
L('la-futbol-street', 6, 30, 9, '街角的足球赛用两只砖头当门。马拉多纳和梅西的海报贴在同一面墙。你的球鞋永远比书包旧。', { hp: 3, hap: 5, rel: 3 }, null, { cond: LA });
L('la-carnaval', 8, 70, 9, '狂欢节：桑巴、彩车、街舞团。你家的阳台是「VIP 看台」。五天的狂欢之后，全国集体「戒糖式」疲惫。', { hap: 7, rel: 4, money: -50 }, '里约狂欢节年游客 200 万+，经济影响 10 亿美元', { cond: LA });
L('la-quince-moto', 18, 45, 8, '你买了辆摩托跑外卖。红绿灯是同行的社交节点——每一轮红灯都是三十秒的信息交换所。', { money: 70, know: 1, hp: -1 }, '拉美零工经济：外卖骑手 300 万+', { cond: LA });
L('la-narco-shadow', 15, 55, 6, '那几年镇上的规矩变了。夜里的枪声、消失的人。你爸爸换了三条不同的回家路线。', { hap: -5, know: 1, hp: -1 }, '拉美凶杀案占全球 1/3，人口只占 8%', { cond: LA, once: true });
L('la-diaspora-usa', 18, 45, 9, '你北上去了美国。建筑工地、后厨、花园——每天汇钱回家。你孩子出生在洛杉矶，他的第一语言是英语，第二才是你的歌。', { money: 300, rel: 2, hap: -2 }, '拉美侨汇年 1500 亿美元；墨裔美国人 3700 万', { cond: LA, once: true });
L('la-remesa-house', 22, 55, 8, '侨汇到账：你用十年把三间土房改成了两层砖楼。屋顶的水泥板上插着钢筋——「等以后再盖第三层」。', { money: -200, hap: 4, rel: 3 }, '拉美「未完工砖楼」文化：钢筋预留=永久希望', { cond: LA });
L('la-machismo-shift', 20, 45, 6, '你开始学着分担家务——这在你的父辈是「不像男人」的事。你儿子看你洗衣服的眼神，你记得自己看父亲的眼神。', { rel: 3, know: 1, hap: 1 }, null, { cond: s => LA(s) && s.gender === 'male', once: true });
L('la-arepa-morning', 4, 80, 8, '早晨的玉米饼（Arepa）配奶酪和鸡蛋。摊主的手势二十年没变过——铁板上的油花是城市的心电图。', { hap: 3, money: -5 }, null, { cond: LA });
L('la-earthquake', 10, 70, 7, '大地震那三十秒，你家的墙裂了。全国救援队三天到达。之后的每个月，你都能听到「余震」两个字就抬头。', { hap: -5, money: -300, rel: 2 }, '2010 智利 8.8 级/海地 7.0 级同年地震', { cond: LA, once: true });
L('la-soccer-cup-view', 10, 60, 8, '世界杯年：全城挂满旗帜，连垃圾车都贴着球星。你队输球那晚全国安静了十分钟——赢球那晚蹦了十小时。', { hap: 5, rel: 3 }, null, { cond: LA });
L('la-catholic-baptism', 0, 3, 9, '你的洗礼：全家族到场，神父用圣水在你额头画十字。干爹干妈当场指定——他们从此是你「第二父母」。', { rel: 4, hap: 2 }, '拉美教父母（Padrinos）制度：干亲=终身契约', { cond: LA });
L('la-day-of-dead', 6, 80, 9, '亡灵节：全家带着万寿菊、糖骷髅和先人的最爱吃的菜去墓地。你弹着吉他唱歌——外婆生前最爱那首。死亡在这里是聚会的一部分。', { hap: 4, rel: 4, know: 1 }, '亡灵节（Día de Muertos）UNESCO 非遗，11 月 1-2 日', { cond: s => LA(s) && s.iso3 === 'MEX' });
L('la-dengue-season', 3, 60, 7, '雨季的登革热又来了。你发烧到骨头疼。全镇动员清积水——花瓶、轮胎、屋顶的塑料布，一滴水都不留。', { hp: -3, know: 1 }, '拉美登革热年均 200 万病例（PAHO）', { cond: LA });
L('la-volleyball-beach', 12, 40, 7, '沙滩排球是你的青春：加勒比的海风、赤脚、音乐从不会停。你的扣杀是全镇最快的——输赢都是笑声。', { hp: 3, hap: 5, rel: 3 }, null, { cond: LA });
L('la-market-tianguis', 10, 70, 7, '每周二的露天大集市：三条街全摆满。水果论堆卖、鞋论「两只送一只」卖。你帮妈妈看摊，学会了在十秒内算完一笔账。', { know: 2, money: 20, rel: 2 }, null, { cond: LA });

// ══════════ 巴西-葡萄牙圈 ═══════════
const BR = s => s.culture === 'brazil-luso';
L('br-futebol-arte', 6, 30, 10, '沙滩足球、五人制、街上随便踢。你练「牛尾巴」过人练了三百次。你的城市里每个球场都「出产过职业球员」。', { hp: 3, hap: 5, rel: 3 }, '巴西注册球员 1100 万+，世界杯五冠', { cond: BR });
L('br-samba-school', 12, 60, 8, '你加入了桑巴舞校的鼓队。整年排练只为狂欢节那一晚——九十分钟的行进，全世界都在看。', { hap: 6, rel: 4, hp: 1 }, '里约桑巴舞校 70+ 所，狂欢节产业 4 万人就业', { cond: BR });
L('br-churrasco-sunday', 8, 80, 8, '周日 Churrasco 烤肉日：烤架上的牛肉按部位轮着吃。你爷爷管火——他说火候比 meat 的价格重要。', { hap: 4, rel: 3, money: -30 }, null, { cond: BR });
L('br-feijoada-wed', 5, 80, 8, '周三的黑豆炖肉日：全城的餐馆都卖 Feijoada。猪身上所有部位一锅炖——这道菜是「把日子炖成一锅」。', { hap: 3, money: -15 }, null, { cond: BR });
L('br-bossa-nova', 15, 70, 7, '你学吉他——第一首是 Bossa Nova。那种「懒洋洋的忧伤」只有你们的语言唱得出。你爸说他年轻时这首曲子刚出。', { know: 2, hap: 4 }, 'Bossa Nova 1958 年诞生于里约，全球爵士史转折点', { cond: BR, once: true });
L('br-amazon-visit', 10, 60, 6, '你第一次进亚马逊腹地看亲戚。河是公路，粉色的海豚是真的。你的手机在那里是「相机+手电筒」两用机。', { know: 3, hap: 3 }, '亚马逊河流量占全球河流总量 20%', { cond: BR, once: true });
L('br-carnival-rehearsal', 14, 50, 7, '狂欢节前的排练场每周三开跳。你的桑巴舞校是社区的学校：排练费交学费、乐器买课本——舞校先于一切。', { hap: 5, rel: 4, money: -20 }, null, { cond: BR });
L('br-bolsa-familia', 8, 45, 7, '「家庭补助金」到账那天，妈妈第一次给你买了新球鞋。条件是你必须上学——于是你上了。', { know: 2, money: 30, hap: 2 }, 'Bolsa Família 覆盖 1400 万家庭，贫困率降 15%', { cond: BR, once: true });
L('br-rio-safety', 15, 60, 7, '城里的规矩你要学：天黑不去某几条街、手机不放口袋。你的「城市本能」长在求生欲里。', { know: 2, hap: -2, hp: -1 }, null, { cond: s => BR(s) && s.region === '城市' });
L('br-coffee-fazenda', 10, 60, 6, '你家的咖啡园在米纳斯。采收季你用帆布兜接咖啡豆——你的咖啡有一天会出现在东京的菜单上，标着你的农场地名。', { money: 50, know: 2 }, '巴西咖啡占全球产量 37%，米纳斯州占国内 50%', { cond: BR });
L('br-german-south', 10, 60, 5, '你南部老家是德裔社区：啤酒节、木桁架房、德语教堂唱诗。巴西这个「拼盘国家」里，你的盘子是德国的。', { know: 2, rel: 2, hap: 2 }, '巴西南部德裔 1200 万，全球第二德语文化圈', { cond: s => BR(s) && ['RS', 'SC'].includes(s.region || ''), once: true });
L('br-copacabana-ny', 10, 70, 7, '跨年夜的 Copacabana：二百万人白衣、七艘花船、海里跳十一个浪许十一个愿。你的愿望永远是「明年还要来」。', { hap: 6, rel: 3 }, '里约跨年晚会全球最大海滩派对', { cond: BR });
L('br-volley-sand', 12, 40, 7, '沙滩排球两打两：赤脚、太阳、BGM 是海浪。你的「虚拟挡网」技术是十年沙滩练出来的。', { hp: 3, hap: 4, rel: 2 }, null, { cond: BR });
L('br-education-enem', 15, 20, 8, '你备考 ENEM（全国高考）—— 这是巴西穷孩子最公平的梯子。你的补习班是 YouTube，你的图书馆是手机。', { know: 4, hap: 1 }, 'ENEM 年考生 500 万+，全球最大规模入学考试之一', { cond: BR });
L('br-pandemic-favela', 12, 70, 7, '疫情进了贫民窟。你家六个房间住十二个人——「隔离」是个听不起的词。社区互助厨灶开始运转。', { hap: -4, rel: 3, hp: -2 }, '里约贫民窟人口密度是市区 3 倍，疫情死亡率翻倍', { cond: s => BR(s) && s.wealthIdx <= 2 });
L('br-jeitinho', 20, 65, 7, '「Jeitinho brasileiro」：规则卡住时，总有第三条路。有人骂这是投机，有人说这是生存智慧。你两种都当过。', { know: 2, money: 30, hap: 1 }, null, { cond: BR });

// ══════════ 加勒比圈 ═══════════
const CB = s => s.culture === 'caribbean';
L('cb-carnival-monday', 10, 70, 9, '狂欢节 Monday：你穿了三个月做的羽毛装。街上游行十小时，你的脚磨破，你的心飞上天。', { hap: 7, rel: 4, money: -80 }, '特立尼达狂欢节：全球最大加勒比狂欢', { cond: CB });
L('cb-steelpan', 10, 60, 7, '你学了钢鼓（Steelpan）——用废弃油桶敲出的国家乐器。你的乐队拿了全国赛冠军，整个社区放了三天鞭炮。', { know: 3, hap: 5, rel: 3 }, '钢鼓：特立尼达「国民乐器」，20 世纪唯一新发明乐器', { cond: CB, once: true });
L('cb-hurricane-season', 8, 75, 9, '六月一号 hurricane season 开始。你家的「备灾包」常备：蜡烛、收音机、罐头。台风警报一响，全岛木板封窗。', { hp: -1, know: 2, money: -100 }, '加勒比年均 2-3 次强飓风，2017 Irma/Maria 损失 1000 亿美元', { cond: CB });
L('cb-jerk-chicken', 6, 80, 8, 'Jerk 烤鸡的香料是祖传的：多香果、苏格兰帽椒、百里香。烟从铁皮棚里冒出来——那是「社区的路标」。', { hap: 4, rel: 2, money: -10 }, null, { cond: CB });
L('cb-remittance-uk', 18, 50, 8, '你去了英国/北美打工。「Windrush 一代」的后代、你表哥的路径、你的行李箱——同一张路线图。', { money: 250, rel: 2, hap: -1 }, '加勒比侨汇占 GDP：牙买加 20%+，全球前列', { cond: CB, once: true });
L('cb-cricket-beach', 8, 40, 7, '沙滩板球是全岛的「全民联赛」：球板是椰木板、门柱是可乐罐。西印度群岛队赢球那天，全国汽笛长鸣。', { hap: 4, hp: 2, rel: 3 }, '板球是加勒比唯一的「跨岛共同语言」', { cond: CB });
L('cb-reggae-sound', 12, 60, 7, 'Sound System 文化：你家楼下的酒吧摆着几吨重的音箱。Bass 从脚底穿到胸口——那是「地板在唱歌」。', { hap: 4, rel: 2 }, '雷鬼 2018 年列入 UNESCO 非遗', { cond: CB });
L('cb-mango-season', 5, 70, 7, '芒果季：二十个品种轮流熟。你家后院那棵「Julie」树是奶奶种的——熟透的芒果掉下来，全楼的猫都知道。', { hap: 4, hp: 1 }, null, { cond: CB });
L('cb-turtle-watch', 12, 60, 6, '你参加了海龟保护志愿队：凌晨守巢、帮幼龟下海。一窝八十只，只有一只能活到成年——你护送的就是那一只的可能性。', { know: 2, hap: 3, rel: 2 }, null, { cond: CB, once: true });
L('cb-coral-bleach', 15, 60, 6, '你潜进珊瑚礁——白化得像雪后的墓地。潜水店的老板把「珊瑚种植」做成了旅游项目。你学了接枝。', { know: 3, hap: -2, money: 40 }, '加勒比珊瑚覆盖率 1970 年 50% → 如今 10%', { cond: CB });
L('cb-cricket-legend', 15, 45, 5, '你打进了岛队。整个社区凑钱买了你的第一副真正球板。首秀那天全岛的收音机都在播你的名字。', { hap: 6, rel: 4, money: 80 }, null, { cond: CB, once: true });
L('cb-saltfish-breakfast', 4, 80, 7, '周日早餐：咸鱼煎 Ackee（国家水果，你妈反复提醒：没开口的果子有毒）。面包果、大蕉、可可茶。', { hp: 2, hap: 3 }, null, { cond: CB });
L('cb-storm-shelter', 12, 70, 7, '五级飓风登陆那夜，全家挤在洗手间。风像要掀开世界的盖子。天亮后你家屋顶没了——邻居的也没了，你们开始共用一张防水布。', { money: -300, hap: -4, rel: 4, know: 1 }, '2017 年 Maria 摧毁多米尼克 90% 建筑', { cond: CB, once: true });
L('cb-boat-build', 18, 55, 5, '你跟老船匠学造渔船。白松船板、龙骨弯曲靠「蒸汽加湿」。这条船三十年后还在海上——师傅说「船比人活得久，所以要用好木」。', { know: 3, money: 60, hap: 3 }, null, { cond: CB, once: true });
L('cb-lime-evening', 15, 75, 8, '傍晚的「Liming」：路灯下、海堤边，一瓶汽水聊两小时。Liming 不聊出结果——它本身就是结果。', { rel: 3, hap: 4 }, '加勒比 Liming 文化：闲坐社交的核心', { cond: CB });
L('cb-diaspora-return', 40, 70, 6, '你在海外四十年后回了岛。你带回了钱、口音变了的心和一屋子的行李。妈妈的第一句话：饭在锅里，先吃饭。', { hap: 5, rel: 4, money: -100 }, null, { cond: CB, once: true });

// ══════════ 盎格鲁圈 ═══════════
const AN = s => s.culture === 'anglo';
L('an-backyard-bbq', 10, 80, 9, '后院烧烤：香肠、草坪、板球或橄榄球在电视里响。邻居隔着栅栏聊天气——聊天气是 Anglo 世界的握手。', { hap: 4, rel: 3, money: -25 }, null, { cond: AN });
L('an-uni-loan', 18, 25, 9, '你签了助学贷款。六位数、利率、二十年——「我的学位是我最大的投资，也是我最大的债」。你选了就业率高的专业。', { know: 4, money: -300 }, '美国学生贷款总额 1.7 万亿美元，人均 3.7 万', { cond: s => AN(s) && s.iso3 === 'USA', once: true });
L('an-credit-score', 18, 30, 8, '你学会了「信用分」是成年人的成绩单：按时还卡、别开太多户。你的第一张卡额度五百刀——你用了四百九十。', { know: 3, money: -50 }, null, { cond: AN });
L('an-black-friday', 15, 70, 7, '黑色星期五：凌晨排队、推车冲突、网页崩溃。你抢到了那台电视——省的两百刀是你站了四小时的时薪。', { money: -200, hap: 1, know: 1 }, null, { cond: AN });
L('an-thanksgiving', 6, 80, 9, '感恩节：火鸡、蔓越莓罐头的凹痕、全家围着说「感谢的事」。你爸的感谢词永远一样——你妈的眼泪也永远一样。', { hap: 5, rel: 4 }, null, { cond: s => AN(s) && s.iso3 === 'USA' });
L('an-pub-quiz', 18, 70, 7, '酒馆问答夜：你的队名永远不正经。影视题靠你、历史题靠工程师、体育题谁都靠不住。奖品是一轮免费酒——值了。', { know: 2, rel: 3, hap: 4, money: -15 }, null, { cond: AN });
L('an-campervan-trip', 20, 60, 7, '你租了辆露营车环游。房车营地的邻居来自五个国家——灶台边的「营地社交」比酒店真诚十倍。', { money: -200, know: 2, hap: 5 }, null, { cond: s => AN(s) && ['AUS', 'NZL', 'USA', 'CAN'].includes(s.iso3), once: true });
L('an-gap-year', 17, 22, 7, '间隔年：你去了东南亚教英语/去欧洲摘葡萄/在南美做义工。回来时你的护照和你的世界观都被盖满了章。', { know: 4, hap: 5, money: -150 }, '澳新英美 gap year 参与率 30%+', { cond: AN, once: true });
L('an-hoa-rules', 25, 60, 6, '业委会的信又来了：你的草坪「超过标准高度 2 英寸」。你剪了草——这个国家的自由是从草坪开始的。', { money: -30, hap: -1 }, null, { cond: s => AN(s) && s.iso3 === 'USA' });
L('an-sport-saturday', 6, 18, 8, '周六上午是「运动注册儿童」的集合时间：足球、游泳、橄榄球。你爸妈是看台上的「业余教练」——嗓子比教练哑。', { hp: 2, rel: 3, hap: 2 }, null, { cond: AN, stage: 'child' });
L('an-halloween', 3, 15, 9, '万圣节你扮的鬼脸是全家「最吓人奖」。讨来的糖按种类分类——你的交易技巧在这晚第一次成型。', { hap: 5, rel: 2, money: 5 }, null, { cond: AN, stage: 'child' });
L('an-mental-health', 15, 45, 8, '你开始看心理咨询师。第一次预约的手比考试还抖。第八次你学会了说「我不行」——这是你能说出的最强的话。', { hap: 5, know: 2, money: -100 }, '美国成年人 23% 曾接受心理治疗', { cond: AN, once: true });
L('an-freelance-econ', 22, 50, 8, '你成了自由职业者：三个客户、五个平台、一份医疗保险自己买。你的「办公室」是任何有 WiFi 的地方。', { money: 120, know: 2, hap: 1 }, '美国自由职业者占劳动力 36%', { cond: AN, once: true });
L('an-open-house', 28, 60, 7, '你买了房——开放日看了二十套、竞价输过三次。签字那天你的手抖。钥匙转动的声音是「 American Dream」的音效。', { money: -5000, hap: 4, rel: 2 }, null, { cond: AN, once: true });
L('an-gym-culture', 16, 70, 8, '你办了健身卡——新年立的第一条 flag。你去的频率从每天降到每周再到……你又办了一张。', { hp: 2, hap: 1, money: -40 }, '美国健身房会员年流失率 28%', { cond: AN });
L('an-truck-country', 16, 70, 6, '你开着皮卡跑乡村公路。加油站的咖啡永远在续、电台永远是乡村乐。你的后斗装过干草、家具和一只走失的羊。', { know: 1, hap: 2, money: -40 }, null, { cond: s => AN(s) && ['USA', 'AUS', 'CAN'].includes(s.iso3) });

// ══════════ 太平洋岛国圈 ═══════════
const OC = s => s.culture === 'oceania';
L('oc-village-fono', 10, 70, 8, '村里的 Fono（议事会）：长老们坐在面包树下议了三小时。你七岁时被允许旁听——听「怎么决定全村的事」。', { know: 3, rel: 3 }, '萨摩亚/汤加 Fono 村社议事制度千年', { cond: OC });
L('oc-taro-patch', 8, 70, 7, '芋头田是你的家庭课：水要引对、叶要留三片。爷爷说芋头有「脸」——你对它好，它对你好。', { hp: 1, know: 2, money: 20 }, '芋头是波利尼西亚主粮与文化核心', { cond: OC });
L('oc-kava-ceremony', 15, 70, 8, '卡瓦仪式：木碗里的泥水色饮料，一口敬天、一口敬地、一口敬酋长。喝完舌头麻了——心也静了。', { rel: 4, hap: 3 }, '卡瓦（Kava）仪式：斐济/汤加/萨摩亚社交核心', { cond: OC });
L('oc-outrigger-canoes', 10, 60, 7, '你学了舷外浮舟：配重撑在浪外——「借海的力量平衡」。你的祖先用这种船横渡了两千公里找到这座岛。', { know: 3, hp: 1, hap: 2 }, '波利尼西亚双体帆船：史前最伟大航海术', { cond: OC });
L('oc-cyclone-rebuild', 12, 70, 8, '气旋把你的学校掀了顶。全村三天建成临时教室——「共享屋顶」是这里的基本人情。你的课本干了，但卷了边。', { hap: -3, rel: 4, money: -50 }, '太平洋岛国年均 2-4 次强气旋，灾损可达 GDP 60%', { cond: OC });
L('oc-remittance-nz', 18, 50, 8, '你去新西兰/澳洲摘果打工。季节签证、十二小时工、寄回家的钱盖了教堂的新顶。你一年回岛一次——全村来接机。', { money: 250, rel: 3, hap: -1 }, '萨摩亚/汤加侨汇占 GDP 40%+，全球最高', { cond: OC, once: true });
L('oc-sunday-quiet', 6, 80, 8, '周日全国静音：商店关门、船不出海、孩子不许跑。白衬衫、蒲扇、长椅上的讲道。周日的岛是另一个岛。', { rel: 3, hap: 2 }, null, { cond: OC });
L('oc-fale-house', 5, 70, 7, '你家的 Fale（圆顶草屋）没有墙——柱子和屋顶之间全是风。隐私是现代概念，「共享」才是默认设置。', { rel: 3, know: 1 }, null, { cond: OC });
L('oc-land-tenure', 20, 60, 7, '「土地是祖先的脊椎」：你家 95% 的地是 customary land（传统地）——不可卖、只可传。开发商的钱改变不了族谱。', { know: 2, money: 50 }, '斐济/萨摩亚传统土地占比 87%+，宪法保护', { cond: OC });
L('oc-rugby-island', 10, 35, 8, '你打橄榄球——人口九千的小岛出过世界冠军队。你的「岛队基因」是谣言也是事实：八分之一的人口在海外职业联赛。', { hp: 3, hap: 4, rel: 2 }, '斐济七人制橄榄 2016/2020 两届奥运冠军', { cond: s => OC(s) && ['FJI', 'WSM', 'TON'].includes(s.iso3) });
L('oc-king-corpse', 8, 80, 5, '王室葬礼是全国事件：二十天的 tapu（禁忌期）、数百头猪、全岛的黑衣。你的工作是用草席给来客铺座。', { rel: 2, know: 2, hap: -1 }, '汤加王室葬礼传统：tapu 制度', { cond: s => OC(s) && s.iso3 === 'TON', once: true });
L('oc-sea-level', 12, 75, 9, '涨潮那天海水漫进了你家的院子——不是台风，就是普通的满月潮。政府讨论「举国搬迁」。你的国家在地图上正在变浅。', { hap: -5, know: 3, money: -100 }, '图瓦卢海拔中位数 1.8 米，2100 年预测淹没 90%', { cond: s => OC(s) && ['TUV', 'KIR', 'MHL'].includes(s.iso3) });
L('oc-fish-fads', 10, 60, 7, '渔队回港：金枪鱼、鹦嘴鱼、石斑。你妈的分配：鲜吃一半、晒干一半、送亲戚一半——送出去的会以别的方式回来。', { money: 30, rel: 3, hp: 2 }, null, { cond: OC });
L('oc-dance-festival', 12, 60, 7, '太平洋艺术节：各国岛民聚齐——你的舞蹈、你的草裙、你的纹身。台上三分钟，台下二十年。', { hap: 6, rel: 3, know: 1 }, '太平洋艺术节（FestPac）四年一届', { cond: OC, once: true });
L('oc-missionary-school', 6, 18, 7, '教会学校：英语、圣经、还有「不许说土语」的规矩。你偷偷用母语和同学讲悄悄话——语言是藏得住的火种。', { know: 3, rel: 2 }, null, { cond: OC, stage: 'child' });
L('oc-tattoo-pea', 14, 30, 5, '你受了传统的 Pe’a 纹身——从腰到膝、全手敲、数周完成。疼得像「被火烧」，但那是一张「族谱穿在身上」。', { hap: 3, rel: 3, hp: -2 }, '萨摩亚 Pe’a/Malofie：UNESCO 非遗', { cond: s => OC(s) && s.gender === 'male', once: true });
