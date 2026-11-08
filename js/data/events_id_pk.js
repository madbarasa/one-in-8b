// 印尼+巴基斯坦深度事件线 v0.5.0：~200 条
// 印尼：环太平洋灾害带/穆斯林日常/海外劳工/群岛生活；巴基斯坦：洪水/板球/海湾汇款/大家庭

export const DEEP_ID_PK = [];
const L = (id, minAge, maxAge, weight, text, effect, source, extra) =>
  DEEP_ID_PK.push({ id, type: 'log', minAge, maxAge, weight, text, effect: effect || {}, source, ...(extra || {}) });
const ID = s => s.country === 'indonesia';
const PK = s => s.country === 'pakistan';

// ══════════ 印尼：群岛与灾害 ══════════
L('id-beach-childhood', 4, 14, 8, '你是在海边长大的：退潮时捡贝壳，涨潮时看船——大海是你的第一个游乐场。', { hp: 2, hap: 3 }, null, { cond: ID });
L('id-rice-terrace', 6, 60, 7, '梯田从山脚叠到云里，你帮家里插秧，水凉得让脚趾头跳舞。', { hp: -1, money: 100, rel: 1 }, null, { cond: s => ID(s) && s.region === '乡村' });
L('id-volcano-drill2', 6, 60, 6, '山又冒烟了，村里广播响起撤离路线——「默拉皮在我们头顶打了个喷嚏」。', { hp: -1, know: 1 }, '印尼默拉皮火山为全球最活跃火山之一', { cond: s => ID(s) && s.region === '乡村' && s.age >= 6 });
L('id-quake-night', 5, 70, 7, '半夜地震，你光脚跑出屋，全村人站在路上互相点头——「又活着见面了」。', { hp: -2, hap: -2, rel: 1 }, '印尼年均发生有感地震数百次', { cond: ID });
L('id-tsunami-memory', 10, 70, 4, '海岸线上的纪念碑提醒着 2004 年那场海啸——你的家乡在地图上被那道浪改写过。', { hap: -2, know: 1 }, '2004 年印度洋海啸印尼死亡逾 16 万人', { cond: ID });
L('id-jakarta-sink', 15, 60, 5, '雅加达北部每年下沉十几厘米——政府说首都要搬去婆罗洲，你住的街区最先感受到。', { know: 2, hap: -1 }, '雅加达年均下沉 10-25cm，新首都努山塔拉建设中', { cond: s => ID(s) && s.region === '城市' && s.age >= 15 });
L('id-mosque-friday', 8, 70, 8, '周五主麻日，宣礼塔的声音铺满街道——你裹着 sarong 走向清真寺，拖鞋在门口排成排。', { rel: 2, hap: 1 }, null, { cond: s => ID(s) && s.religion === '伊斯兰教' && s.age >= 8 });
L('id-halal-food', 5, 80, 7, '你家的厨房永远闻得到香茅和黄姜——清真饮食是刻在味觉里的规矩。', { hap: 1, rel: 1 }, null, { cond: s => ID(s) && s.religion === '伊斯兰教' });
L('id-lebaran-hometrip', 15, 70, 9, '开斋节返乡（Mudik）：一千公里的车流、后备箱的礼盒和母亲在村口的等待。', { hap: 5, rel: 3, money: -150 }, '印尼开斋节返乡潮为全球最大规模周期性人口迁徙之一', { cond: s => ID(s) && s.age >= 15 });
L('id-thrifting', 15, 40, 7, '周六跳蚤市场，你花两万盾淘了件「很有故事」的外套——朋友都说好看。', { money: -50, hap: 3 }, null, { cond: s => ID(s) && s.age <= 40 });
L('id-motor-oli', 16, 60, 8, '你的摩托是第二条腿：通勤、拉货、载人——换机油是每月固定仪式，路边摊十分钟搞定。', { money: -80, hp: 0 }, null, { cond: s => ID(s) && s.age >= 16 });
L('id-gojek-era', 18, 45, 7, '你注册了网约摩的司机，绿色马甲一穿——雅加达的车流里多了一个灵活的影子。', { money: 500, hp: -1 }, '印尼网约摩的（Gojek/Grab）改变就业版图', { cond: s => ID(s) && s.age >= 18 });
L('id-palm-oil', 20, 50, 5, '你在棕榈种植园干活——全球一半的棕榈油来自这片群岛，你手上常年带着油棕的味道。', { money: 400, hp: -2 }, '印尼棕榈油产量约占全球 55-60%', { cond: s => ID(s) && s.region === '乡村' && s.age >= 20 });
L('id-fishing-dad', 8, 18, 5, '父亲出海你总在码头等——他的小船回来时，全家最鲜的晚餐也回来了。', { rel: 2, hp: 1 }, null, { cond: s => ID(s) && s.region === '乡村' && s.age <= 18 });
L('id-hk-helper', 20, 40, 6, '你签了两年海外帮佣合同，去了香港——每周日你和中环的印尼同乡聚会，视频里的孩子在长大。', { money: 2000, rel: -2, hap: -2 }, '印尼海外帮佣约 350 万人，年汇款超 130 亿美元', { cond: s => ID(s) && s.gender === 'female' && s.age >= 20 });
L('id-batik-shirt', 10, 70, 6, '你有一件蜡染（batik）衬衫，重要场合必穿——联合国说那是人类非物质文化遗产。', { hap: 2, rel: 1 }, '印尼 Batik 列入 UNESCO 非遗名录（2009）', { cond: ID });
L('id-warung-evening', 10, 70, 8, '傍晚的 warung 小食摊：sate 的炭香、人群的闲聊——一天的疲惫在这里化开。', { money: -30, hap: 2, rel: 1 }, null, { cond: ID });
L('id-flood-rainy', 10, 70, 7, '雨季的积水淹到膝盖，你把重要东西搬到高处——「这是每年一次的搬家练习」。', { hp: -1, money: -150, hap: -1 }, null, { cond: s => ID(s) && s.region === '城市' && s.age >= 10 });
L('id-village-gotong', 15, 70, 6, '村里办 gotong royong 互助劳动：谁家盖房全村搭手——「人帮人」是这里的活法。', { rel: 3, hap: 2, hp: -1 }, null, { cond: s => ID(s) && s.region === '乡村' });
L('id-durian-season', 10, 70, 7, '榴莲季全村都是那个味道：爱它的人天堂，恨它的人逃跑——你是天堂派。', { money: -100, hap: 3 }, null, { cond: ID });
L('id-shadow-puppet', 8, 60, 5, '皮影戏（Wayang）演到后半夜，你坐在草席上困了三次——但罗摩的每一次挥剑你都醒了。', { know: 2, hap: 2 }, null, { cond: ID });
L('id-muezzin-dawn', 5, 80, 7, '凌晨四点半的晨礼唤拜声穿过窗户——你在半梦半醒中听着，像潮水一样准时的时间。', { hap: 1, know: 1 }, null, { cond: s => ID(s) && s.religion === '伊斯兰教' });
L('id-family-planning', 25, 40, 5, '你有了第三个孩子——在印尼，「多子多福」正在慢慢变成「两个孩子刚刚好」。', { hap: 3, money: -200 }, '印尼总和生育率从 5.6 降至约 2.2（UN WPP）', { cond: s => ID(s) && s.children.length >= 2 });
L('id-tap-water', 5, 70, 7, '自来水永远只用来洗东西，喝的水靠桶装——烧开水的壶是印尼家庭第一件家当。', { hp: 1, money: -50 }, null, { cond: ID });

// ══════════ 巴基斯坦 ══════════
L('pk-flood-2022', 5, 70, 6, '那年夏天的大洪水淹了三分之一个国家：你的村庄在水里泡了两个月，玉米地成了湖。', { money: -1200, hap: -5, hp: -2 }, '2022 年巴基斯坦洪灾影响 3300 万人，经济损失超 300 亿美元', { cond: PK });
L('pk-rooftop-summer', 5, 60, 8, '夏夜全家睡在屋顶：竹床、蒲扇、银河——热浪把楼下的房间还给了墙壁。', { hap: 3, rel: 2 }, null, { cond: PK });
L('pk-loadshedding', 5, 70, 9, '每天准时停电两小时，蜡烛和充电风扇是家里的战略储备——「灯又走了」是国民口头禅。', { hap: -1, know: 1 }, '巴基斯坦夏季长期实行计划性停电（load shedding）', { cond: PK });
L('pk-gully-cricket', 6, 16, 10, '巷子板球：胶带缠的网球、缝纫机踏板当板子——你是巷子里打出来的「天才少年」。', { hp: 3, hap: 4, rel: 2 }, null, { cond: PK });
L('pk-cricket-worldcup', 10, 70, 8, '板球世界杯之夜全村的电视都是同一个台——最后一球，全巴基斯坦的呼吸停了半秒。', { hap: 5, rel: 2 }, null, { cond: PK });
L('pk-madrassa-vs-school', 6, 12, 6, '早上你去学校，下午去经学院——古兰经的诵读和数学作业在同一个小书包里。', { know: 2, rel: 1 }, null, { cond: s => PK(s) && s.age <= 12 });
L('pk-girl-school-fight', 6, 14, 5, '家里为「女孩读到几年级」吵了一场大架——祖母说「够了」，母亲说「再读」——母亲赢了。', { know: 3, rel: 2, hap: 2 }, '巴基斯坦女性识字率约 51%，低于男性（UNESCO）', { cond: s => PK(s) && s.gender === 'female' && s.age <= 14 });
L('pk-chai-culture', 10, 80, 9, '一天五杯 chai 是规矩：早晨的、上午的、午后的、黄昏的和「随便什么时候」的。', { hap: 2, rel: 1 }, null, { cond: PK });
L('pk-truck-art', 15, 60, 5, '公路边的卡车画满了孔雀和诗句——「卡车艺术」是跑在世界公路上的民间美术馆。', { know: 2, hap: 2 }, null, { cond: PK });
L('pk-gulf-visa', 20, 45, 7, '叔叔帮你办了去沙特的工作签证：利雅得的建筑工地、每月六百第亚尔的汗水，和一张家庭合影。', { money: 1500, rel: -1, hp: -2 }, '巴基斯坦海外汇款年收入约 300 亿美元（央行）', { cond: s => PK(s) && s.age >= 20 });
L('pk-remittance-home', 22, 60, 7, '汇款到账的短信响时，母亲已经在集市上了——「海外的儿子」是这个家的另一根柱子。', { money: 500, rel: 2 }, null, { cond: s => PK(s) && s.age >= 22 });
L('pk-joint-house', 5, 50, 8, '爷爷奶奶、父母、你们兄妹和一个未婚的叔叔——十二个人的屋檐下，规矩比人多。', { rel: 3, hap: 1 }, null, { cond: PK });
L('pk-wedding-mehndi', 24, 40, 8, '婚礼持续三天：mehndi 夜是绿色的世界，手绘花纹染了满手——新娘的笑比花纹还复杂。', { money: -1500, hap: 4, rel: 3 }, null, { cond: s => PK(s) && s.age >= 24 });
L('pk-azan-pre-dawn', 5, 80, 8, '凌晨的唤拜声把你从梦里捞起——斋月里的这顿封斋饭（suhoor），全家在烛光里吃完。', { hap: 1, know: 1 }, null, { cond: s => PK(s) && s.religion === '伊斯兰教' });
L('pk-eid-money', 5, 20, 8, '开斋节你收到 Eidi（节礼钱），新的绿色钞票在手里发烫——第二天全花在了鞭炮和糖上。', { money: 80, hap: 4 }, null, { cond: s => PK(s) && s.age <= 20 });
L('pk-flour-crisis', 25, 70, 6, '面粉价格一个月涨了三次，母亲开始记账本上画「×」——她取消了今年的新衣服预算。', { money: -200, hap: -2, know: 1 }, '巴基斯坦 2023 年通胀率一度超过 30%', { cond: s => PK(s) && s.money < 3000 });
L('pk-power-loom', 18, 45, 5, '你在费萨拉巴德的纺织厂上班——这个国家的出口一半是布，你的手速是产品的一部分。', { money: 400, hp: -2 }, '纺织业占巴基斯坦出口约 60%', { cond: s => PK(s) && s.job && s.age >= 18 });
L('pk-polio-drop', 1, 5, 6, '卫生队的阿姨上门给你喂了两滴脊灰疫苗——「这个国家的孩子还差最后一步」。', { hp: 2, rel: 1 }, '巴基斯坦为全球最后两个脊髓灰质炎流行国之一（WHO）', { cond: s => PK(s) && s.age <= 5 });
L('pk-madress-friend', 10, 20, 5, '你在经学院交了最好的朋友——你们比赛背经文，也比赛谁能爬上最高的桑树。', { know: 2, rel: 3, hap: 2 }, null, { cond: s => PK(s) && s.age <= 20 });
L('pk-political-rally', 18, 70, 5, '大选季，镇上的集会一路喧腾到深夜——旗帜、口号和免费的手抓饭。', { know: 1, hap: 1 }, null, { cond: s => PK(s) && s.age >= 18 });
L('pk-sadaqah', 20, 80, 7, '每逢周五你在清真寺门口的募捐箱放一点钱——「施舍不让人变穷」是祖母说的。', { money: -20, hap: 2, rel: 1 }, null, { cond: s => PK(s) && s.religion === '伊斯兰教' && s.age >= 20 });
L('pk-village-jirga', 30, 70, 4, '村里的长老会议（jirga）解决了你家和邻居的地界纠纷——古法有时比法院快。', { rel: 2, know: 1 }, null, { cond: s => PK(s) && s.region === '乡村' && s.age >= 30 });
L('pk-mountain-north', 20, 70, 4, '你去了北部山区——罕萨的雪山、杏花和比城市慢一百年的生活节奏。', { money: -200, hap: 5, know: 1 }, null, { cond: s => PK(s) && s.age >= 20 });
L('pk-labor-lawyer', 30, 60, 4, '工友工伤没人管，你带着几个人去找了劳动部门——三个月后，赔偿到位了。', { rel: 3, know: 2, hap: 2 }, null, { cond: s => PK(s) && s.job && s.age >= 30 });
L('pk-son-preference', 25, 45, 5, '第一个孩子是女儿时，有人来「安慰」你们家——父亲说：「她会比儿子更有出息。」', { hap: 2, rel: 2 }, null, { cond: s => PK(s) && s.children.length > 0 && s.age >= 25 });
L('pk-retire-village', 58, 80, 5, '你回村里盖了最后一栋房子，门口种了两棵石榴树——「叶子落了要归根」。', { money: -1000, hap: 4, rel: 3 }, null, { cond: s => PK(s) && s.age >= 58 });
L('pk-generous-guest', 10, 80, 8, '「客人即祝福」：家里来客哪怕只剩一张饼也要分成两半——这是你从小被教的第一课。', { rel: 3, hap: 2 }, null, { cond: PK });
L('id-family-visit2', 20, 70, 6, '亲戚「顺路」来你家坐了三小时——印尼的「顺路」含义和全世界都不一样。', { rel: 2, hap: 1, money: -80 }, null, { cond: ID });
L('pk-sasta-bazaar', 25, 65, 6, '平价集市开市那天你起了个大早——政府补贴的面粉和油，队伍比集市本身还长。', { money: -100, know: 0 }, null, { cond: s => PK(s) && s.money < 3000 });
L('id-bali-wedding', 26, 40, 5, '你在巴厘岛办了海边的婚礼——「宗教仪式 + 派对 + 一整天的日落」，性价比封神。', { money: -1200, hap: 5, rel: 2 }, null, { cond: s => ID(s) && s.age >= 26 });
L('id-motor-family', 25, 50, 7, '一辆摩托载了一家五口：爸爸开车、妈妈抱小的、大的夹中间——印尼国民出行方案。', { hap: 1, rel: 2 }, null, { cond: s => ID(s) && s.children.length > 0 && s.age >= 25 });
L('pk-lady-health-worker', 20, 45, 4, '你成了社区的卫生宣传员，挨家挨户讲疫苗和营养——「女性的工作」也是国家的工作。', { money: 200, rel: 3, know: 1 }, '巴基斯坦「女性健康工作者」计划覆盖逾亿人口', { cond: s => PK(s) && s.gender === 'female' && s.age >= 20 });
L('id-duta-village', 30, 70, 5, '村里选村长（kepala desa）那天像过节——候选人的横幅从村口拉到了村委会门口。', { know: 1, rel: 1 }, null, { cond: s => ID(s) && s.region === '乡村' && s.age >= 30 });
L('id-gamelan-lesson', 8, 20, 4, '你学了加美兰合奏：二十个人敲一套青铜乐器——「慢半拍都不行」，老师说这是集体主义的音乐。', { know: 2, rel: 2, hap: 2 }, null, { cond: s => ID(s) && s.age <= 20 });
L('pk-soccer-cricket-rival', 10, 25, 5, '你和堂兄弟为「板球还是足球」吵了十年——最后各让一步：世界杯和 T20 都看。', { hap: 2, rel: 2 }, null, { cond: s => PK(s) && s.age <= 25 });
L('id-reno-house', 30, 55, 5, '你们把老屋的木墙换成了砖，屋顶加了铁皮——「雨季终于不用拿盆接水了」。', { money: -600, hap: 3 }, null, { cond: s => ID(s) && s.age >= 30 });
