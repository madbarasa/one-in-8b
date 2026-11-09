// 欧亚四文化圈事件 v0.7.0：~140 条
// west-north-euro / east-euro / balkan / turkic-caucasus 补充，共 47 国

export const CUL_EUROPE = [];
const L = (id, minAge, maxAge, weight, text, effect, source, extra) =>
  CUL_EUROPE.push({ id, type: 'log', minAge, maxAge, weight, text, effect: effect || {}, source, ...(extra || {}) });
const WNE = s => s.culture === 'west-north-euro';
const EEUR = s => s.culture === 'east-euro';
const BALKAN = s => s.culture === 'balkan';
const TURKIC = s => s.culture === 'turkic-caucasus';

// ══════════ 西欧-北欧-南欧（31 国）══════════
L('wn-bike-commute', 8, 70, 16, '自行车是你的「车」——阿姆斯特丹/哥本哈根式的通勤，风雨无阻，车筐里装着生活。', { hp: 1, hap: 1, money: -20 }, '荷兰/丹麦自行车通勤率为全球前列', { cond: WNE });
L('wn-uni-free-tuition', 18, 24, 14, '大学几乎免费——「教育是权利不是商品」，你爸那代人是这么说的，你也这么信。', { know: 3, money: -100, hap: 1 }, '北欧/德法公立大学免学费或低学费', { cond: s => WNE(s) && s.inSchool && s.age >= 18 });
L('wn-summer-house', 10, 70, 13, '七月的红房子/海岛小屋——「夏天要离开城市」，这是北欧人的宪法级共识。', { hap: 3, rel: 2, money: -150 }, null, { cond: WNE });
L('wn-cafe-terrace', 16, 70, 14, '露天咖啡座的一小时——在南欧，坐着看路过的行人是一项正经事业。', { money: -40, hap: 2, rel: 1 }, null, { cond: WNE });
L('wn-sunday-family-lunch', 6, 70, 14, '周日的家庭午餐能从下午一点吃到五点——开胃菜、主菜、沙拉、奶酪、甜点、咖啡。', { hap: 3, rel: 2, hp: -1 }, null, { cond: WNE });
L('wn-winter-dark', 10, 70, 13, '下午三点天就黑了——北欧的冬天，全靠蜡烛、桑拿和「hygge」活着。', { hap: -1, know: 1, hp: -1 }, null, { cond: WNE });
L('wn-youth-drinking', 15, 25, 10, '周末的青年聚会绕不开酒——欧洲的青春期，一半是社交，一半是学喝酒。', { hp: -2, rel: 2, hap: 1 }, null, { cond: s => WNE(s) && s.age >= 15 });
L('wn-refugee-neighbor', 20, 60, 8, '你所在的城市接纳了一批难民——友好的邻居、有距离的目光，两者都是真的。', { know: 1, rel: 1, hap: 0 }, '欧洲 2015 年后接收数百万难民（UNHCR）', { cond: WNE });
L('wn-strike-day', 22, 60, 10, '今天全国大罢工——火车停了，你骑了六公里自行车上班，「罢工也是公民课」。', { hap: 0, know: 1, hp: 1 }, null, { cond: s => WNE(s) && s.age >= 22 });
L('wn-pension-worry', 40, 60, 10, '你和同事算退休金——「我们这代人退休年龄又推迟了」。多干两年， europe-wide。', { know: 1, hap: -1 }, '欧洲多国延迟退休年龄（65→67）', { cond: s => WNE(s) && s.age >= 40 });
L('wn-vote-election', 18, 80, 13, '大选投票日——你的票和总理的票一样重，这是你们家三代人认真对待的仪式。', { hap: 1, know: 1, rel: 1 }, null, { cond: WNE });
L('wn-sauna-friendship', 15, 70, 10, '桑拿房里的友谊最坦诚——一百度的蒸汽里，人人平等。', { hp: 1, rel: 2, hap: 2 }, '芬兰人均桑拿房数量全球第一', { cond: WNE });
L('wn-siesta-south', 14, 60, 10, '午后两点店铺全关——「siesta 不是懒，是和太阳的休战协议」。', { hap: 1, know: 1, hp: 1 }, null, { cond: s => WNE(s) && ['ITA', 'ESP'].includes(s.iso3) });
L('wn-israel-army', 18, 21, 13, '成年礼是入伍——两年的义务兵役，教会你的第一课是「和完全不同背景的人共处」。', { hp: -1, know: 2, rel: 2 }, '以色列实行全民义务兵役制', { cond: s => s.iso3 === 'ISR' && s.age >= 18 });

// ══════════ 东欧（10 国）══════════
L('ee-soviet-grandpa', 8, 60, 14, '祖父的旧相册里全是红旗时代——「那时候所有人都一样穷，但都一样有活干」。', { know: 2, hap: 0, rel: 1 }, null, { cond: EEUR });
L('ee-banya-saturday', 10, 70, 13, '周六澡堂（banya）：桦树枝抽背、冰水浇头——「蒸透了，一周的罪都没了」。', { hp: 1, hap: 2, rel: 1 }, null, { cond: EEUR });
L('ee-dacha-potato', 8, 70, 13, '周末全家去乡下小屋（dacha）挖土豆——「土豆罐头是过冬的命」。', { hp: -1, rel: 2, money: 60 }, null, { cond: EEUR });
L('ee-oligarch-story', 15, 40, 10, '「那个从我们楼里走出去的孩子，现在是寡妇……不，寡头。」——暴富神话在这里人人会讲。', { know: 1, hap: -1 }, null, { cond: EEUR });
L('ee-brain-drain', 20, 35, 13, '你的同学一半去了欧盟西部打工——「留下来的人，也在计划着离开」。', { rel: -1, hap: -1, know: 1 }, '东欧多国面临人口外流（世行数据）', { cond: EEUR });
L('ee-block-flat', 5, 70, 13, '你在水泥板楼里长大——全世界长得一模一样的阳台，晾着完全不同的人生。', { hap: 0, rel: 1, know: 1 }, null, { cond: EEUR });
L('ee-war-shadow', 18, 60, 8, '边境那边的战争新闻每天更新——你们家的餐桌话题，多了个不敢深说的词。', { hap: -2, know: 1, rel: 1 }, null, { cond: s => EEUR(s) && ['UKR', 'POL', 'MDA', 'ROU'].includes(s.iso3) });
L('ee-pelmeni-night', 4, 70, 13, '全家包饺子（pelmeni/vareniki）——几百个，冻在阳台的自然冰箱里。', { hap: 2, rel: 2, hp: 1 }, null, { cond: EEUR });
L('ee-victory-day', 8, 80, 10, '胜利日的游行——「我爷爷打到过柏林」这句话，在这片土地上是真实的重量。', { know: 1, rel: 2, hap: 1 }, null, { cond: EEUR });
L('ee-corridor-doctor', 20, 60, 10, '公立医院走廊排了三小时——「免费医疗」和「效率」是两个需要平衡的词。', { hp: -1, hap: -1, know: 1 }, null, { cond: EEUR });

// ══════════ 巴尔干（9 国）══════════
L('bk-rakija-toast', 18, 70, 14, '家里来客第一件事：白酒（rakija）——「不喝就是不给我面子」，推让三轮才准停。', { hp: -1, rel: 2, hap: 1 }, null, { cond: s => BALKAN(s) && s.age >= 18 });
L('bk-slava-day', 8, 70, 13, '家族主保圣日（Slava）——塞尔维亚人一年一次的「家族生日」，烤全羊和大饼。', { hap: 3, rel: 3, money: -80 }, 'Slava 列入联合国非遗', { cond: s => BALKAN(s) && s.iso3 === 'SRB' });
L('bk-war-story', 10, 60, 10, '长辈们讲九十年代——「那时候邻居变敌人，现在邻居还是邻居，只是不提当年」。', { know: 2, hap: -1, rel: 1 }, '南斯拉夫战争 1991-2001', { cond: BALKAN });
L('bk-coffee-slow', 10, 70, 13, '土耳其式小杯咖啡配上一块土耳其软糖——巴尔干的咖啡时间，短不了。', { money: -20, hap: 2, rel: 1 }, null, { cond: BALKAN });
L('bk-football-tribal', 10, 60, 13, '同城德比日——你的球队是身份的一部分，「赛前别穿错颜色出门」。', { hap: 2, rel: 2, hap2: 0 }, null, { cond: BALKAN });
L('bk-greek-island', 12, 70, 10, '夏天的海岛：白房子、蓝顶教堂、和永远晒不够的太阳——「旅游业就是我们的一切」。', { hap: 3, money: 200, know: 1 }, null, { cond: s => BALKAN(s) && s.iso3 === 'GRC' });
L('bk-remittance-germany', 22, 55, 10, '你在德国/奥地利打工——「半个村子的人都在慕尼黑」，寄回来的钱盖起了新楼。', { money: 700, rel: 1, hap: -1 }, null, { cond: s => BALKAN(s) && s.age >= 22 });
L('bk-albanian-besa', 12, 60, 8, '爷爷教你「Besa」（信义）——「答应过的事，命也要保住」。这个词你记了一辈子。', { know: 2, rel: 2, hap: 1 }, null, { cond: s => BALKAN(s) && s.iso3 === 'ALB' });

// ══════════ 突厥-高加索补充（用工移民/棉田/雪峰）══════════
L('tk2-cotton-autumn', 10, 60, 10, '秋天棉花收成季——你放学就下地，手指被棉壳划出小口子，但棉花价就是学费。', { money: 150, hp: -1, know: 1 }, null, { cond: s => TURKIC(s) && ['UZB', 'TKM', 'AZE'].includes(s.iso3) && s.region === '乡村' });
L('tk2-earthquake-1999', 10, 60, 8, '你永远记得那晚的晃动——「房子塌了，但没塌的我们学会了互相扶着」。', { hp: -2, hap: -2, rel: 2 }, '土耳其位于活跃地震带，1999 年伊兹米特大地震 1.7 万人遇难', { cond: s => s.iso3 === 'TUR' });
L('tk2-gecekondu-home', 5, 60, 10, '你家是「一夜盖起来的房」（gecekondu）——进城农民用一晚时间在城郊立起四堵墙。', { know: 1, rel: 2, hap: 0 }, 'Gecekondu 为土耳其城市化进程的独特现象', { cond: s => s.iso3 === 'TUR' && s.region === '城市' });
