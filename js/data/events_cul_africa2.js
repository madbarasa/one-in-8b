// 非洲五文化圈加密批 v0.7.0：~150 条（每圈+30）
// 场景覆盖：童年/学堂/青春期/婚恋/职场/市集/信仰/政治/老年

export const CUL_AFRICA2 = [];
const L = (id, minAge, maxAge, weight, text, effect, source, extra) =>
  CUL_AFRICA2.push({ id, type: 'log', minAge, maxAge, weight, text, effect: effect || {}, source, ...(extra || {}) });
const WEST = s => s.culture === 'west-africa';
const HORN = s => s.culture === 'horn';
const CENTRAL = s => s.culture === 'central-africa';
const EAST = s => s.culture === 'east-africa';
const SOUTH = s => s.culture === 'southern-africa';

// ══════════ 西非加密 ══════════
L('wa-tailor-apprentice', 12, 20, 13, '你跟着裁缝师傅当学徒：三个月只准碰针线，第一件成品是给你自己做的衬衫。', { know: 2, money: 50, rel: 1 }, null, { cond: WEST });
L('wa-street-football2', 8, 18, 14, '沙地球场、塑料袋绑的球——「下一个德罗巴」的梦在这里人人做过。', { hp: 2, hap: 2, rel: 2 }, null, { cond: WEST });
L('wa-nollywood-dream', 15, 30, 10, '你去拉各斯/阿克拉试镜——诺莱坞的片场门口永远排着怀揣明星梦的年轻人。', { hap: 2, know: 1, rel: 2 }, '尼日利亚诺莱坞年产电影超 2000 部', { cond: s => WEST(s) && s.age >= 15 });
L('wa-harmattan', 5, 70, 14, '哈马丹风来了——撒哈拉的沙尘把天空染成奶白色，嘴唇裂了一星期。', { hp: -1, know: 1 }, null, { cond: WEST });
L('wa-cousin-network', 20, 60, 13, '表哥在城里帮你找了份工——在西非，「表哥网络」是最强的就业中介。', { money: 200, rel: 2, know: 1 }, null, { cond: s => WEST(s) && s.age >= 20 });
L('wa-church-choir', 10, 30, 13, '你进了教堂唱诗班——排练到晚上十点，嗓子哑了但内心亮堂。', { hap: 2, rel: 2, know: 1 }, null, { cond: s => WEST(s) && s.age <= 30 });
L('wa-mosque-arabic', 6, 16, 10, '清真寺的阿拉伯语课——你用木板上抄写字母的方式学会了第一批经文。', { know: 2, rel: 1 }, null, { cond: s => WEST(s) && s.religion === '伊斯兰教' });
L('wa-market-day', 8, 70, 14, '每五天的集市日是全村的节日——布料、辣酱、二手球鞋和所有八卦都在这里集散。', { hap: 2, rel: 1, money: -30 }, null, { cond: WEST });
L('wa-cocoa-farm', 12, 60, 13, '可可季全家下地——你剥开豆荚的样子熟练得像二十年的老手。', { money: 180, hp: -1, know: 1 }, '科特迪瓦/加纳供应全球 60% 可可', { cond: s => WEST(s) && ['CIV', 'GHA'].includes(s.iso3) && s.region === '乡村' });
L('wa-name-jokes', 10, 25, 10, '你的姓在学校总被念错/编成段子——最后你笑着接受了这个外号。', { hap: 0, rel: 2, know: 1 }, null, { cond: s => WEST(s) && s.age <= 25 });
L('wa-election-year', 18, 70, 8, '大选年——收音机里的政见比集市还吵，你把票投给了承诺最多的那个（后来后悔了）。', { know: 1, hap: 0 }, null, { cond: s => WEST(s) && s.age >= 18 });
L('wa-senegalese-wrestling', 15, 40, 10, '你去看过一场摔跤（Laamb）——鼓声、咒语和泥土，这是塞内加尔的超级碗。', { hap: 3, know: 1, rel: 1 }, null, { cond: s => WEST(s) && s.iso3 === 'SEN' });
L('wa-tailor-wedding', 26, 45, 13, '你的婚礼上，印花的「蜡染布」是主角——宾ayu们会记住你穿的是哪一款。', { money: -500, hap: 3, rel: 3 }, null, { cond: s => WEST(s) && s.age >= 26 });
L('wa-griot-story', 6, 18, 10, '村里的格里奥（世袭说唱人）用琴声讲曼萨·穆萨的故事——历史不用课本，用嗓子。', { know: 2, hap: 1, rel: 1 }, '格里奥（Griot）为西非世袭口述史官传统', { cond: WEST });
L('wa-lagos-hustle', 20, 45, 13, '拉各斯式的 hustle：白天卖手机配件，晚上学代码——「这座城不养闲人」。', { money: 300, hp: -1, know: 2 }, null, { cond: s => WEST(s) && s.iso3 === 'NGA' && s.age >= 20 });
L('wa-diaspora-call', 30, 70, 13, '在美国的叔叔每周日来电话——他寄回来的钱盖了家里的二层楼。', { money: 400, rel: 2 }, '尼日利亚年侨汇约 200 亿美元', { cond: s => WEST(s) && s.age >= 30 });
L('wa-gari-processor', 10, 60, 10, '你家把木薯磨成加里粉——整条巷子都是那个酸酸的香气。', { money: 120, know: 1, hp: -1 }, null, { cond: s => WEST(s) && s.region === '乡村' });
L('wa-fufu-pounding', 5, 70, 13, '捣福福（fufu）的木杵声是厨房的心跳——你从小就被训练接住节奏。', { hp: 1, rel: 2, hap: 1 }, null, { cond: WEST });
L('wa-tro-tro-commute', 18, 60, 10, '小巴（trotro）永远差一个人——售票员挂在车门上喊站名的样子像rap。', { money: -20, know: 0, hap: 1 }, null, { cond: s => WEST(s) && s.iso3 === 'GHA' && s.age >= 18 });
L('wa-dakar-bus', 18, 65, 10, '达卡尔的公共交通是大型社交现场——卖花生水的、传教的、算命的，一站全齐。', { hap: 1, know: 1 }, null, { cond: s => WEST(s) && s.iso3 === 'SEN' && s.age >= 18 });
L('wa-hiv-aunt', 14, 35, 8, '「防艾阿姨」来学校讲课——她教的知识后来救了你至少一次的选择。', { know: 2, hp: 1 }, '西非部分国家 HIV 感染率仍超 2%', { cond: s => WEST(s) && s.age >= 14 });
L('wa-malaria-net', 2, 40, 14, '蚊帐是你童年最忠实的守护者——疟疾每年仍在非洲带走六十万人。', { hp: 2, know: 1 }, '疟疾年死亡约 60 万（WHO，95% 在非洲）', { cond: WEST });
L('wa-school-fee-crisis', 8, 18, 10, '开学那周家里凑学费——「先交一半」的谈判是每个家长的社交必修课。', { money: -150, know: 1, hap: -1 }, null, { cond: s => WEST(s) && s.inSchool });
L('wa-braiding-afternoon', 8, 30, 13, '编辫子的下午——姨妈们的手在你头上一小时，八卦也装了一小时。', { hap: 2, rel: 2, money: -30 }, null, { cond: s => WEST(s) && s.gender === 'female' });
L('wa-artisan-gold', 20, 55, 8, '你在小金矿打过工——没有防护，只有一盏头灯和对「下一镐就发财」的信仰。', { money: 260, hp: -3, know: 1 }, '西非 artisanal 采矿雇佣数百万人', { cond: s => WEST(s) && ['MLI', 'BFA', 'GIN'].includes(s.iso3) && s.age >= 20 });
L('wa-baobab-tree', 5, 70, 13, '村口的猴面包树是会议室+游乐场+日历——所有大事都在树下宣布。', { hap: 2, rel: 2, know: 1 }, null, { cond: WEST });
L('wa-fanta-return', 40, 80, 10, '离村五十年的人回乡——全村去迎接，他给每个孩子发了橙子汽水。', { hap: 3, rel: 3, money: 30 }, null, { cond: WEST });

// ══════════ 非洲之角加密 ══════════
L('hn-coffee-buna2', 8, 70, 14, '咖啡仪式：生豆现炒、现磨、三轮出壶——埃塞俄比亚人请客的最低规格是两小时。', { hap: 2, rel: 2, know: 1 }, '咖啡发源于埃塞俄比亚高原', { cond: HORN });
L('hn-injera-hand', 5, 70, 13, '英杰拉饼撕一块蘸酱——右手抓食，左手不让上桌，奶奶盯得很紧。', { hp: 1, rel: 2 }, null, { cond: HORN });
L('hn-camel-herd2', 10, 60, 13, '你家的骆驼群——「一头骆驼等于一辆车」，你从小就会数星空下的驼影。', { money: 200, hp: -1, know: 1 }, null, { cond: s => HORN(s) && ['SOM', 'DJI'].includes(s.iso3) && s.region === '乡村' });
L('hn-tsad-camel-milk', 6, 60, 10, '骆驼奶是你童年的牛奶——咸咸的，喝完一下午不饿。', { hp: 1, know: 1 }, null, { cond: s => HORN(s) && s.region === '乡村' });
L('hn-meskel-bonfire2', 8, 70, 10, '默斯克尔节（真十字架显现日）的篝火——黄的雏菊花海和火光把九月点亮。', { hap: 3, rel: 2 }, null, { cond: HORN });
L('hn-fasting-200b', 12, 60, 10, '埃塞正教的斋期一年加起来两百多天——素食吃出了素食师的功力。', { hp: 0, know: 1, hap: -1 }, '埃塞正教斋戒日约 200-250 天/年', { cond: s => HORN(s) && s.religion === '基督教' && s.age >= 12 });
L('hn-drought-jerrycan2', 10, 60, 13, '旱季打水要走四公里——黄色塑料水桶是这里最重的行李。', { hp: -1, know: 1, rel: 1 }, null, { cond: s => HORN(s) && s.region === '乡村' });
L('hn-diaspora-minn2', 20, 55, 10, '「明尼阿波利斯的小索马里」——你的表姐去了，寄回来的照片里有雪。', { money: 300, rel: 2, know: 1 }, '索马里侨民为全球最大侨民群体之一', { cond: s => HORN(s) && s.age >= 20 });
L('hn-nile-agreement2', 18, 60, 8, '电视里在谈尼罗河水协议——「水」在你们这里，是国家层面的吵架主题。', { know: 2, hap: 0 }, null, { cond: s => HORN(s) && ['SDN', 'SSD', 'ETH'].includes(s.iso3) && s.age >= 18 });
L('hn-lalibela-pilgrim2', 15, 80, 10, '全家去拉利贝拉的岩石教堂朝圣——那些教堂是整块火山岩凿出来的，八百年了。', { know: 2, hap: 2, rel: 2 }, null, { cond: s => HORN(s) && s.iso3 === 'ETH' && s.religion === '基督教' });
L('hn-goat-market2', 12, 65, 10, '牲口市场的讨价还价是一门艺术——奶奶三句话把羊价砍掉三成。', { know: 1, rel: 1, money: -80 }, null, { cond: s => HORN(s) && s.region === '乡村' });

// ══════════ 中部非洲加密 ══════════
L('ca-rumba-dance2', 10, 60, 14, '伦巴从金沙萨传遍了整个非洲——你家的婚宴上，爷爷的舞步比DJ还快。', { hap: 3, rel: 2, hp: 1 }, '刚果伦巴 2021 年列入 UNESCO 非遗', { cond: CENTRAL });
L('ca-river-ferry2', 10, 60, 10, '刚果河上的渡船——河比海宽，你的「跨省探亲」是一场两天的航行。', { know: 1, hap: 1, hp: -1 }, null, { cond: CENTRAL });
L('ca-cobalt-mine2', 18, 50, 10, '你在矿区打过工——手机电池里的钴，可能就出自你们那座山的深处。', { money: 300, hp: -3, know: 1 }, '刚果（金）供应全球 70% 钴', { cond: s => CENTRAL(s) && s.iso3 === 'COD' && s.age >= 18 });
L('ca-lingala-music2', 8, 30, 13, '林加拉语情歌在你家音响里循环——「santé（干杯）」是你学的第一个词。', { hap: 2, know: 1 }, null, { cond: CENTRAL });
L('ca-french-school2', 7, 18, 13, '学校全法语授课，回家说本族语——你的舌头在两套语法之间自由切换。', { know: 2, rel: 1 }, null, { cond: s => CENTRAL(s) && s.inSchool });
L('ca-bush-meat2', 10, 60, 10, '叔叔从林子里带回来的「野味」——在你家是蛋白质，在城里是奢侈品。', { hp: 1, money: 80, know: 1 }, null, { cond: s => CENTRAL(s) && s.region === '乡村' });
L('ca-mayala-taxi2', 18, 60, 10, '摩托车出租（mayala）——金沙萨的堵车里，摩托车是唯一的确定性。', { money: 150, hp: -1, know: 0 }, null, { cond: s => CENTRAL(s) && s.iso3 === 'COD' && s.age >= 18 });
L('ca-sapere-suit2', 20, 60, 10, '「Sapeur」们穿着名牌西装走过泥路——「贫穷不是邋遢的理由」。', { hap: 2, know: 1 }, '萨普（La Sape）文化：刚果的西装雅士运动', { cond: CENTRAL });
L('ca-ebola-checkpoint2', 10, 70, 8, '疫区设卡测温洗手——那几年，洗手这件事成了生死攸关的仪式。', { hp: 1, know: 1, hap: -1 }, '刚果（金）2018-2020 埃博拉疫情逾两千例', { cond: CENTRAL });
L('ca-palm-oil2', 10, 60, 10, '你家榨棕榈油——橙红色的油是这片区所有菜的底色。', { money: 140, know: 1, hp: -1 }, null, { cond: s => CENTRAL(s) && s.region === '乡村' });

// ══════════ 东非加密 ══════════
L('ea-mpesa-first2', 16, 70, 14, '你注册了 M-PESA——「手机就是银行」这件事，肯尼亚比全世界早了十年。', { know: 2, money: 50 }, '肯尼亚 M-PESA 移动支付用户超 3000 万', { cond: s => EAST(s) && s.iso3 === 'KEN' && s.age >= 16 });
L('ea-swahili-blend2', 6, 20, 13, '斯瓦希里语是阿拉伯语、班图语和葡萄牙语的合体——你的日常对话就是一部贸易史。', { know: 2, hap: 1 }, null, { cond: EAST });
L('ea-maasai-rite2', 13, 20, 8, '你经历了成人礼（马赛/相邻族群）——从这天起，你被当作大人说话。', { know: 1, hap: 1, rel: 3 }, null, { cond: s => EAST(s) && ['KEN', 'TZA'].includes(s.iso3) && s.region === '乡村' });
L('ea-kilimanjaro-view2', 8, 70, 13, '晴天时你能看见乞力马扎罗——「雪顶每年在退」，爷爷说山的雪比他记忆里薄了。', { know: 1, hap: 2 }, null, { cond: s => EAST(s) && s.iso3 === 'KEN' });
L('ea-safari-tourist2', 15, 55, 10, '你在保护区/酒店打过工——游客为一小时拍照付的钱，是你一个月的工资。', { money: 250, know: 1, rel: 1 }, '肯尼亚/坦桑旅游业为外汇支柱', { cond: s => EAST(s) && ['KEN', 'TZA'].includes(s.iso3) && s.age >= 15 });
L('ea-runner-training2', 12, 35, 10, '你清晨沿着红土路跑步——在这个山谷里，「跑步改变人生」是真实的经济学。', { hp: 3, know: 1, hap: 1 }, '肯尼亚长跑选手统治中长跑数十年', { cond: s => EAST(s) && s.iso3 === 'KEN' && s.age <= 35 });
L('ea-tazara-rail2', 10, 70, 8, '爷爷讲坦赞铁路——「中国人修的，一八六零公里，我坐过全程」。', { know: 2, rel: 1 }, '坦赞铁路 1975 年建成', { cond: s => EAST(s) && ['TZA', 'KEN'].includes(s.iso3) });
L('ea-banana-beer2', 16, 70, 10, '香蕉啤酒（mbege）是乌干达婚宴的标配——你成年后第一次被允许喝一杯。', { hap: 2, rel: 1, hp: -1 }, null, { cond: s => EAST(s) && s.iso3 === 'UGA' && s.age >= 16 });
L('ea-dala-dala2', 18, 60, 10, '小巴（dala dala）的音响永远最大——「在路上」在这里是字面意义的生活方式。', { money: -20, hap: 1, know: 0 }, null, { cond: s => EAST(s) && s.iso3 === 'TZA' && s.age >= 18 });
L('ea-clove-season2', 12, 60, 10, '桑给巴尔的丁香季——整座岛都是那个香味，你家的收入也跟着香。', { money: 160, know: 1 }, '桑给巴尔为全球最大丁香产地之一', { cond: s => EAST(s) && s.iso3 === 'TZA' && s.region === '乡村' });
L('ea-genocide-memory2', 25, 80, 3, '「那年四月」是村子里没人主动提起、但所有人都记得的话题。', { hap: -3, rel: 2, know: 2 }, '1994 年卢旺达大屠杀约 80 万人遇难', { cond: s => s.iso3 === 'RWA' && s.age >= 25 });
L('ea-mzungu-greeting2', 8, 20, 10, '街上见到外国人，孩子们齐喊「mzungu!（白人）」然后笑着跑开——你的童年也是这么过的。', { hap: 1, know: 0 }, null, { cond: EAST });
L('ea-cassava-flour2', 10, 60, 10, '木薯粉做的乌伽黎（ugali）——用手捏着吃，蘸着菜汤，这是正经的一餐。', { hp: 1, rel: 2 }, null, { cond: EAST });

// ══════════ 南部非洲加密 ══════════
L('sa-mine-town2', 18, 55, 13, '你在金矿/铜矿下了井——「矿灯一亮，就知道谁家有人上夜班」。', { money: 350, hp: -2, know: 1 }, '南非约翰内斯堡为「黄金之城」矿业核心', { cond: s => SOUTH(s) && ['ZAF', 'ZMB', 'ZWE'].includes(s.iso3) && s.age >= 18 });
L('sa-township-tavern2', 22, 65, 10, '镇区酒馆（tavern）的周末——音乐、烤肉和所有邻里的悲欢都在这里。', { money: -40, rel: 2, hap: 1 }, null, { cond: s => SOUTH(s) && s.iso3 === 'ZAF' && s.age >= 22 });
L('sa-braai-culture2', 10, 70, 14, ' braai（烧烤）是南部非洲的社交仪式——「会烤肉的男人/女人」是硬通货。', { hap: 3, rel: 2, hp: 1 }, null, { cond: SOUTH });
L('sa-heritage-day2', 8, 70, 10, '遗产日（九月廿四）你穿着传统服饰上班/上学——「彩虹之国」的一天有十一种颜色。', { hap: 2, know: 1, rel: 1 }, null, { cond: s => SOUTH(s) && s.iso3 === 'ZAF' });
L('sa-zim-inflation2', 30, 80, 10, '恶性通胀那几年——「早上能买面包的钱，晚上只够买面粉」。你学会了把钱当天花。', { money: -300, know: 2, hap: -2 }, '津巴布韦 2008 年通胀率曾达 89.7 万亿%', { cond: s => s.iso3 === 'ZWE' && s.age >= 30 });
L('sa-malawi-tobacco2', 12, 60, 10, '烟草拍卖季——你家的全年收入在几周内定生死。', { money: 170, hp: -1, know: 1 }, '马拉维为烟草依赖度最高国家之一', { cond: s => s.iso3 === 'MWI' && s.region === '乡村' });
L('sa-victoria-falls2', 12, 70, 10, '你去看过维多利亚瀑布——「雷鸣之烟」的水雾在二十公里外就看得见。', { hap: 3, know: 1, money: -80 }, null, { cond: s => SOUTH(s) && ['ZWE', 'ZMB'].includes(s.iso3) });
L('sa-madagascar-vanilla2', 12, 60, 10, '香草授粉季——每朵兰花只有一天花期，全家总动员用小签子人工授粉。', { money: 180, know: 2, hp: -1 }, '马达加斯加供应全球 80% 香草', { cond: s => s.iso3 === 'MDG' && s.region === '乡村' });
L('sa-mozambique-cyclone2', 10, 70, 10, '气旋「伊代」过后——你家的屋顶在邻居家的院子里，全村一起盖新的。', { hp: -2, hap: -2, rel: 2 }, '2019 年气旋伊代重创莫桑比克', { cond: s => s.iso3 === 'MOZ' });
L('sa-lesotho-sheep2', 10, 60, 10, '高原的羊群和毛毯——巴索托人的毛毯四季不离身，跟身份证一样重要。', { know: 1, rel: 1, hap: 1 }, null, { cond: s => s.iso3 === 'LSO' });
L('sa-rugby-worldcup2', 12, 70, 10, '跳羚队夺世界杯那年——全城的喇叭按了一整夜，「一支球队解释了什么叫国家」。', { hap: 4, rel: 2, know: 0 }, '南非跳羚队 1995/2007/2019/2023 四夺世界杯', { cond: s => s.iso3 === 'ZAF' });
L('sa-ngo-intern2', 20, 35, 10, '你在国际 NGO 实习——会议桌上的「可持续发展」，翻译成村里话就是「明年别饿肚子」。', { know: 2, money: 200, rel: 1 }, null, { cond: s => SOUTH(s) && s.age >= 20 && s.know > 60 });
L('sa-traditional-healer2', 12, 70, 10, '外婆带你去看传统医师（sangoma）——掷骨头、念咒语，科学和信仰在这里各管一摊。', { know: 1, rel: 1, hp: 1 }, null, { cond: SOUTH });
L('sa-minibus-taxi2', 18, 65, 13, '小巴出租（taxi rank）的江湖——手语指挥、抢客大战和永不让座的规矩。', { money: -25, know: 1, hap: 1 }, null, { cond: s => SOUTH(s) && s.age >= 18 });
L('sa-cape-wine2', 25, 70, 8, '开普敦酒庄的秋天——你学会了品酒，也学会了「风土」这个词。', { hap: 2, know: 1, money: -60 }, null, { cond: s => s.iso3 === 'ZAF' && s.age >= 25 });
L('sa-e-waste-salvage2', 12, 40, 8, '你在电子垃圾山里「淘金」——一块好板子能换一周的口粮。', { money: 90, hp: -2, know: 1 }, null, { cond: s => SOUTH(s) && s.age >= 12 && s.wealthIdx <= 1 });
L('sa-ubuntu-lesson2', 8, 20, 10, '奶奶教你 Ubuntu——「人在人群中才成为人」，这句话后来成了你的处世底色。', { know: 2, rel: 3, hap: 1 }, null, { cond: SOUTH });
