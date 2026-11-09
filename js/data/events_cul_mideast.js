// 中东四文化圈事件 v0.7.0：~130 条
// maghreb / arab-core / persia / turkic-caucasus，共 28 国
// 斋月/朝觐/茶文化/巴扎/侨汇/水烟/足球/语言多轨

export const CUL_MIDEAST = [];
const L = (id, minAge, maxAge, weight, text, effect, source, extra) =>
  CUL_MIDEAST.push({ id, type: 'log', minAge, maxAge, weight, text, effect: effect || {}, source, ...(extra || {}) });
const MAGHREB = s => s.culture === 'maghreb';
const ARAB = s => s.culture === 'arab-core';
const PERSIA = s => s.culture === 'persia';
const TURKIC = s => s.culture === 'turkic-caucasus';

// ══════════ 马格里布（5 国）══════════
L('mg-couscous-friday', 4, 70, 16, '周五的库斯库斯是法定仪式：全家围一大盘，奶奶分配的肉永远比别人的大。', { hp: 1, rel: 2, hap: 2 }, null, { cond: MAGHREB });
L('mg-mint-tea', 6, 70, 16, '薄荷甜茶一天三巡——「第一杯苦如人生，第二杯浓如爱情，第三杯淡如死亡」。', { hap: 2, rel: 1 }, '摩洛哥薄荷茶文化列入非遗提名实践', { cond: MAGHREB });
L('mg-medina-hide', 6, 14, 13, '你在老城区的九千条巷子里玩捉迷藏——游客拿着地图迷路，你闭着眼都能到家。', { hp: 1, hap: 2, know: 1 }, null, { cond: MAGHREB });
L('mg-french-school', 8, 20, 13, '上午阿拉伯语下午法语——你的大脑从小学会了两套思维来回切换。', { know: 3, hap: -1 }, '马格里布教育为阿法双语制', { cond: MAGHREB });
L('mg-ramadan-harira', 8, 70, 14, '斋月的开斋饭从一碗哈里拉浓汤开始——然后全家去清真寺，再回来吃第二轮。', { rel: 2, hap: 2, hp: -1 }, null, { cond: s => MAGHREB(s) && s.religion === '伊斯兰教' });
L('mg-hammam-day', 8, 70, 13, '土耳其浴（hammam）日：热气、黑皂、搓澡巾——搓下来的泥能证明你活着很努力。', { hp: 1, hap: 2, rel: 1 }, null, { cond: MAGHREB });
L('mg-cousins-europe', 20, 45, 13, '堂哥从法国回来了，开着租的车、带着欧洲的礼物——全村都在讨论「去不去」。', { hap: 1, know: 1, rel: 2 }, '马格里布为欧洲最大移民来源地之一', { cond: MAGHREB });
L('mg-argan-oil', 12, 60, 8, '你帮家里榨阿甘油——坚果树只长在这片土地上，全世界都来买。', { money: 200, know: 1 }, null, { cond: s => MAGHREB(s) && s.gender === 'female' });

// ══════════ 阿拉伯核心（13 国）══════════
L('ab-quran-school', 5, 14, 16, '放学后的 kuttab：你跪坐在地毯上跟老师一句句读古兰经——背错的段落要重来。', { know: 3, hap: -1, rel: 1 }, null, { cond: s => ARAB(s) && s.religion === '伊斯兰教' });
L('ab-ramadan-canon', 8, 70, 16, '斋月白天滴水不进——日落炮声一响，椰枣和凉水先下肚，然后全家开席。', { hp: -1, rel: 3, hap: 2 }, '斋月（Ramadan）为伊斯兰五功之一', { cond: s => ARAB(s) && s.religion === '伊斯兰教' });
L('ab-eid-money', 8, 20, 16, '开斋节你穿着新衣服挨家拜年——口袋里的 eid 纸币是一年里最快乐的收入。', { hap: 4, money: 80, rel: 2 }, null, { cond: ARAB });
L('ab-hookah-night', 18, 60, 13, '晚间咖啡馆：水烟、扑克牌、和从伊斯兰聊到足球的一切——男士们的精神客厅。', { rel: 2, hap: 1, hp: -1 }, null, { cond: s => ARAB(s) && s.gender === 'male' && s.age >= 18 });
L('ab-wedding-zaffa', 26, 40, 14, '你的婚礼有 zaffa 仪仗：鼓手开道、剑舞助兴——三百位宾客，一半是亲戚的亲戚。', { money: -1500, hap: 3, rel: 3 }, null, { cond: s => ARAB(s) && s.age >= 26 });
L('ab-umrah-trip', 30, 70, 10, '你带父母去了副朝——麦加禁寺里几十万人同时礼拜，你哭了但没有告诉他们。', { money: -800, hap: 4, know: 1 }, null, { cond: s => ARAB(s) && s.religion === '伊斯兰教' });
L('ab-petroleum-job', 20, 50, 10, '你进了石油公司——「黑金」给这个国家发工资，也给你发了_foreign 岗位的offer。', { money: 900, know: 1, hap: 1 }, '海湾国家石油业占出口主导（OPEC 数据）', { cond: s => ARAB(s) && ['SAU', 'ARE', 'QAT', 'KWT', 'BHR', 'OMN', 'IRQ'].includes(s.iso3) });
L('ab-kanafeh-evening', 6, 70, 13, '夜市甜品摊的 kunafa 还在冒糖浆——你要了加芝士的，甜得睫毛都黏住了。', { money: -30, hap: 3, hp: -1 }, null, { cond: ARAB });
L('ab-soccer-cafe', 12, 60, 14, '足球之夜的咖啡馆：英超、阿拉伯杯、和一屋子为别国球队吵翻的忠实「专家」。', { hap: 3, rel: 2, hp: -1 }, null, { cond: s => ARAB(s) && s.gender === 'male' });
L('ab-wasta-life', 25, 55, 10, '办任何事都要「关系」（wasta）——你的表舅的战友在部门里，事情办成了。', { know: 1, rel: 1, hap: 0 }, null, { cond: ARAB });
L('ab-sheeple-honor', 15, 40, 8, '村里关于你家的一条流言让父亲一夜白头——「体面」在这里重得像山。', { hap: -2, rel: 1, know: 1 }, null, { cond: ARAB });

// ══════════ 波斯圈（2 国）══════════
L('pe-nowruz-table', 3, 80, 16, '诺鲁孜节（新年）的七鲜桌摆好了：金鱼、青苗、镜子——你按传统对着镜子许愿。', { hap: 4, rel: 2 }, '诺鲁孜节列入联合国非遗，波斯历新年春分', { cond: PERSIA });
L('pe-taarof-dance', 10, 70, 14, '你学会了 taarof：别人给你东西要先拒绝三轮——「不不不您太客气了」是技术活。', { know: 2, rel: 1, hap: 1 }, 'Taarof 为波斯礼节体系（客气推让仪式）', { cond: PERSIA });
L('pe-safran-rice', 4, 70, 14, '藏红花米饭底部那层金黄的锅巴（tahdig）——全家的筷子为它而战。', { hap: 2, rel: 1, hp: 1 }, null, { cond: PERSIA });
L('pe-poetry-hafez', 12, 70, 13, '你翻开哈菲兹诗集占卜——闭眼翻开一页，那一首诗就是新年的签。', { know: 2, hap: 1 }, '哈菲兹诗集占卜（fal-e Hafez）为波斯新年传统', { cond: PERSIA });
L('pe-bazaar-walk', 8, 70, 13, '巴扎的穹顶下全是味道：香料、地毯、铜器和商人喊了三百年的「来看看不买没关系」。', { know: 1, hap: 2, money: -60 }, null, { cond: PERSIA });
L('pe-sanctions-life', 20, 60, 13, '兑换美金的地下价一天三变——你学会了在通胀里游泳：今天赚的钱今天花。', { know: 2, hap: -2, money: -150 }, '伊朗受国际制裁多年，里尔汇率剧烈波动', { cond: s => PERSIA(s) && s.iso3 === 'IRN' });
L('pe-chador-choice', 7, 25, 10, '出门前妈妈替你把头巾掖好——「在外面要多注意」，这句话里有一整个世界的复杂。', { know: 1, hap: -1, rel: 1 }, null, { cond: s => PERSIA(s) && s.gender === 'female' });
L('pe-ashura-procession', 10, 70, 10, '阿舒拉节的哀悼游行——黑衣、鼓声和钉水（免费饮品）沿街分发，整座城市在共情一千多年前的悲剧。', { know: 1, rel: 2, hap: -1 }, null, { cond: s => PERSIA(s) && s.religion === '伊斯兰教' });

// ══════════ 突厥-高加索（9 国）══════════
L('tk-chai-glass', 6, 70, 16, '郁金香形小茶杯续了八轮——「茶要烫，话要长」，这是待客的第一定律。', { hap: 2, rel: 2 }, null, { cond: TURKIC });
L('tk-bazaar-bargain', 10, 70, 13, '大巴扎里你帮妈妈砍价——砍到一半老板请你喝茶，「生意不成情义在」。', { know: 1, hap: 2, money: -40 }, null, { cond: TURKIC });
L('tk-pilaf-gathering', 5, 70, 14, '节庆的抓饭（pilaf/plov）用大锅炒——中亚的说法：香气的半径就是请客的半径。', { hp: 1, rel: 2, hap: 2 }, 'Plov/pilaf 在中亚为节庆核心料理', { cond: TURKIC });
L('tk-navruz-sumalak', 5, 70, 10, '纳吾肉孜节前夜全村轮流搅大锅麦芽浆（sumalak）——搅到天亮，歌声不断。', { hap: 3, rel: 3 }, null, { cond: TURKIC });
L('tk-turkish-course', 8, 18, 10, '课后班你在补奥数和英语——「考个好大学」在突厥家庭的分量不输任何地方。', { know: 3, hap: -1, money: -100 }, null, { cond: s => TURKIC(s) && s.inSchool });
L('tk-hamam-bath', 10, 70, 10, '周末全家去浴场——搓澡师傅的力度让你怀疑他和你有仇。', { hp: 1, hap: 2, rel: 1 }, null, { cond: TURKIC });
L('tk-remittance-russia', 25, 55, 13, '你在俄罗斯工地打了三年工——高加索和中亚的男人，很多都在异乡攒「回家的钱」。', { money: 800, rel: -1, hap: -1 }, '侨汇占塔吉克斯坦 GDP 一度近半（世行）', { cond: s => TURKIC(s) && s.age >= 25 && s.gender === 'male' });
L('tk-wedding-toy', 24, 40, 14, '你的婚礼（toy）摆了两天——第一天唱歌，第二天继续唱歌，账单让你清醒了三次。', { money: -1200, hap: 3, rel: 3 }, null, { cond: s => TURKIC(s) && s.age >= 24 });
L('tk-grandfather-epos', 6, 16, 10, '祖父弹着都塔尔讲《玛纳斯》和草原英雄——史诗是游牧民族的图书馆。', { know: 2, rel: 2, hap: 1 }, null, { cond: s => TURKIC(s) && s.region === '乡村' });
