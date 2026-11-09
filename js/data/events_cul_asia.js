// 亚太五文化圈事件 v0.7.0：~180 条
// sinic / sea-mainland / sea-maritime / sas-indic / sas-islam，共 23 国
// 手工五国（中印印尼巴）有专属线，此处写同圈其他国家

export const CUL_ASIA = [];
const L = (id, minAge, maxAge, weight, text, effect, source, extra) =>
  CUL_ASIA.push({ id, type: 'log', minAge, maxAge, weight, text, effect: effect || {}, source, ...(extra || {}) });
const SINIC = s => s.culture === 'sinic' && s.country !== 'china';
const SEAM = s => s.culture === 'sea-mainland';
const SEAMAR = s => s.culture === 'sea-maritime' && s.country !== 'indonesia';
const INDIC = s => s.culture === 'sas-indic' && s.country !== 'india';
const SASISLAM = s => s.culture === 'sas-islam' && s.country !== 'pakistan';

// ══════════ 儒家圈（日韩朝港澳新蒙，7 国）══════════
L('sn-juku-cram', 10, 18, 16, '放学后你背着书包钻进补习班（塾）——「隔壁小孩已经学到第十册了」。', { know: 3, hap: -2, money: -300 }, '日韩影子教育参与率长期高企', { cond: SINIC });
L('sn-exam-hell', 15, 19, 14, '「考试地狱」这个词不是比喻——大学入试前夜你梦到自己写不完答题卡。', { know: 2, hap: -2 }, null, { cond: s => SINIC(s) && s.inSchool });
L('sn-cram-school-korea', 12, 19, 14, '晚自习结束已是十一点——首尔江南的补习街上，全是和你一样背着书包的夜行动物。', { know: 3, hp: -1, hap: -1 }, '韩国私教育支出占家庭支出显著比重（统计厅）', { cond: s => SINIC(s) && s.iso3 === 'KOR' });
L('sn-convenience-dinner', 18, 30, 13, '加班到九点，晚饭是便利店的饭团加关东煮——独自在大城市的第 N 个夜晚。', { money: -60, hap: -1, know: 0 }, null, { cond: s => SINIC(s) && s.age >= 18 });
L('sn-sauna-nomikai', 22, 45, 13, '公司的聚会（nomikai/hoesik）你没法缺席——上级倒的酒，社会规则让你干了。', { rel: 1, hap: -1, hp: -1, money: -80 }, null, { cond: s => SINIC(s) && s.age >= 22 });
L('sn-sauna-jjimjilbang', 8, 70, 13, '汗蒸房过夜：羊角巾、烤鸡蛋、和睡椅上此起彼伏的呼噜——25 元的酒店。', { money: -40, hp: 1, hap: 2 }, '韩式汗蒸房（jjimjilbang）可通宵过夜', { cond: s => SINIC(s) && s.iso3 === 'KOR' });
L('sn-anime-subway', 10, 30, 13, '通勤地铁里你追着漫画更新——东京/首尔的地铁上，一半人在看屏，一半人在睡。', { hap: 1, know: 1 }, null, { cond: s => SINIC(s) && s.age >= 10 });
L('sn-north-uncle', 15, 60, 3, '你有个亲戚在「那边」——同一民族、两个世界，你们在板门店式的沉默里各自生活。', { know: 1, hap: -1, rel: 1 }, null, { cond: s => SINIC(s) && ['KOR', 'PRK'].includes(s.iso3) });
L('sn-hongkong-flat', 5, 70, 14, '你家 40 平，住五口人——「劏房/公屋」这几个字里装着这座城市全部的拥挤与坚韧。', { hap: 0, know: 1, rel: 1 }, '香港人均居住面积长期偏低', { cond: s => SINIC(s) && s.iso3 === 'HKG' });
L('sn-macau-casino', 25, 60, 10, '你在赌场找了份工作——「这里每天都有人一夜暴富，但更多人是慢慢变穷」。', { money: 600, hap: -1, know: 1 }, '澳门博彩业占政府收入主体', { cond: s => SINIC(s) && s.iso3 === 'MAC' });
L('sn-mongolia-herd', 8, 30, 13, '你帮家里迁徙牧场——草原上的冬天叫 dzud，能把羊群一夜冻成冰雕。', { hp: 1, know: 1, money: 100 }, '蒙古 dzud 极寒灾害周期性重创牧业', { cond: s => SINIC(s) && s.iso3 === 'MNG' });
L('sn-singapore-hdb', 5, 70, 13, '你在组屋（HDB）长大——楼下的小贩中心，是这座国家的胃。', { hap: 1, know: 1, rel: 1 }, '新加坡八成人口住组屋', { cond: s => SINIC(s) && s.iso3 === 'SGP' });

// ══════════ 中南半岛（5 国）══════════
L('sm-monk-blessing', 6, 70, 16, '清晨布施：你赤脚捧钵跪在路边，僧侣走过的队伍是橙色的河。', { hap: 2, rel: 1, know: 1 }, '南传佛教布施（托钵）为中南半岛日常', { cond: SEAM });
L('sm-temple-boy', 10, 20, 13, '你短期出家当了小沙弥——「男人一生要出一次家」是这里的成人礼。', { know: 3, rel: 2, hap: 1 }, null, { cond: s => SEAM(s) && s.gender === 'male' && s.religion === '佛教' });
L('sm-rainy-moto', 12, 60, 14, '雨季的摩托大军披着雨衣洪流般穿过积水——你溅了一身泥，也淋了一身痛快。', { hp: -1, hap: 1, know: 0 }, null, { cond: SEAM });
L('sm-noodle-stall', 5, 70, 14, '街边粉摊的一碗粉（pho/kuay/mt）——汤头是老板娘二十年的手艺。', { money: -40, hp: 1, hap: 2 }, null, { cond: SEAM });
L('sm-khmer-newyear', 8, 70, 10, '泼水节/宋干节你被浇透了——「湿身」在这里是祝福不是尴尬。', { hap: 4, rel: 2 }, '宋干节（泼水节）列入联合国非遗', { cond: SEAM });
L('sm-garment-work', 16, 35, 13, '你进了制衣厂——欧洲快时尚的订单表，就是你们全村的日历。', { money: 250, hp: -2, know: 1 }, '柬埔寨/缅甸制衣业为出口支柱', { cond: s => SEAM(s) && s.age >= 16 && s.gender === 'female' });
L('sm-landmine-field', 10, 50, 3, '学校组织看了排雷教育片——你们村口的田，直到今天还有人不敢深耕。', { know: 1, hap: -1 }, '越战遗留未爆弹至今仍造成伤亡', { cond: s => SEAM(s) && ['LAO', 'VNM', 'KHM'].includes(s.iso3) });
L('sm-rice-transplant', 9, 60, 13, '插秧季全家下田——弯腰一天，腰像断了一样，但稻花香的夜晚很值。', { money: 100, hp: -2, rel: 1 }, null, { cond: s => SEAM(s) && s.region === '乡村' });
L('sm-mekong-float', 8, 60, 10, '湄公河的漂浮市场：小船挤着小船，卖的全是早晨刚摘的一切。', { know: 1, hap: 2, money: -30 }, null, { cond: s => SEAM(s) && s.iso3 === 'VNM' });

// ══════════ 海洋东南亚（印尼以外 4 国）══════════
L('sf-halal-check', 6, 70, 13, '买零食先看清真认证标志——这个习惯跟着你从家到超市到机场。', { know: 1, hap: 0 }, null, { cond: s => SEAMAR(s) && s.religion === '伊斯兰教' });
L('sf-jeepney-ride', 8, 60, 14, '吉普尼司机的车尾标语比车还精彩——「Bahala na（听天由命）」是全菲律宾的人生哲学。', { money: -20, hap: 2, know: 1 }, 'Jeepney 由二战美军吉普改装，为菲律宾国民交通', { cond: s => SEAMAR(s) && s.iso3 === 'PHL' });
L('sf-ofw-goodbye', 22, 50, 14, '机场送别你姐——她去香港做家政。「记住，是为了一家人才走的。」', { money: 400, rel: -1, hap: -2 }, '菲律宾海外劳工（OFW）约千万级，侨汇为经济支柱', { cond: s => SEAMAR(s) && s.iso3 === 'PHL' });
L('sf-bahay-kubo', 5, 16, 10, '高脚屋（bahay kubo）底下养着鸡和猪——台风来的时候，你在二楼听雨打铁皮。', { hp: -1, hap: 1, know: 1 }, null, { cond: s => SEAMAR(s) && s.region === '乡村' });
L('sf-typhoon-drill', 6, 60, 13, '台风预警升级了：钉木板、囤净水、把牲口拴牢——「台风季」是刻在DNA的日历。', { hp: -1, know: 2, hap: -1 }, '菲律宾年均约 20 个台风过境，为全球最频', { cond: s => SEAMAR(s) && s.iso3 === 'PHL' });
L('sf-brunei-mosque', 8, 60, 8, '金色圆顶的清真寺是全镇最亮的建筑——周五祷告日，一切生意都停下来。', { rel: 2, hap: 1, know: 1 }, null, { cond: s => SEAMAR(s) && s.religion === '伊斯兰教' });
L('sf-timor-struggle', 20, 70, 3, '长辈低声讲起那些年——「独立之前的冬天很难」。你们是新生国家的一代。', { know: 2, hap: -1, rel: 1 }, '东帝汶 2002 年独立，为二十一世纪首个新主权国', { cond: s => SEAMAR(s) && s.iso3 === 'TLS' });

// ══════════ 印度教圈（印度以外 3 国）══════════
L('si-nepal-puja', 6, 70, 14, '家里的神龛点起了油灯——每天清晨妈妈摇铃的铃声，是你最早的时间观念。', { rel: 1, hap: 1, know: 1 }, null, { cond: INDIC });
L('si-himalaya-trek', 12, 60, 10, '你背着书包翻山去上学——海拔三千米的风里，你的肺比平原孩子大一号。', { hp: 2, know: 1, hap: 1 }, null, { cond: s => INDIC(s) && s.iso3 === 'NPL' && s.region === '乡村' });
L('si-dashain-tika', 8, 70, 13, '德赛因节长辈给你点 tika（额头朱砂）——祝福从额头开始，红包从口袋结束。', { hap: 3, rel: 2, money: 100 }, null, { cond: s => INDIC(s) && s.iso3 === 'NPL' });
L('si-gurung-remittance', 25, 55, 13, '你在海湾/马来打工——「喜马拉雅的儿子在别人的城市盖楼」，侨汇是全村的血管。', { money: 600, rel: -1 }, '侨汇占尼泊尔 GDP 约 1/4（世行）', { cond: s => INDIC(s) && s.iso3 === 'NPL' && s.age >= 25 });
L('si-bhutan-gnh', 10, 60, 8, '学校教「国民幸福总值」——「发展不止是钱」，这句话在别国是理想，在你们这儿是课本。', { know: 2, hap: 2 }, '不丹提出 GNH（国民幸福总值）发展哲学', { cond: s => INDIC(s) && s.iso3 === 'BTN' });
L('si-lanka-tea', 10, 60, 10, '茶山的一生：摘茶娘的手指快得像风——你家的茶园，是殖民时代留下的一整条产业链。', { money: 150, know: 1, hp: -1 }, '斯里兰卡锡兰茶为出口支柱', { cond: s => INDIC(s) && s.iso3 === 'LKA' });

// ══════════ 南亚伊斯兰圈（巴基斯坦以外 2 国）══════════
L('si2-bangla-flood', 8, 70, 16, '洪水来的时候你爬上屋顶——「恒河三角洲的人生，就是和水谈判的一生」。', { hp: -2, hap: -2, know: 1 }, '孟加拉国为全球最脆弱三角洲，常年洪灾', { cond: s => SASISLAM(s) && s.iso3 === 'BGD' });
L('si2-rickshaw-art', 10, 60, 10, '人力三轮车画着电影明星和孔雀——达卡的堵车里，每一辆车都是移动画廊。', { hap: 1, know: 1 }, null, { cond: s => SASISLAM(s) && s.iso3 === 'BGD' });
L('si2-garment-dhaka', 16, 35, 14, '你进了达卡的成衣厂——你缝的衬衫明天就挂在欧洲的橱窗里，标价是你们全村一年收入。', { money: 200, hp: -2, know: 1 }, '孟加拉为全球第二大成衣出口国', { cond: s => SASISLAM(s) && s.iso3 === 'BGD' && s.gender === 'female' && s.age >= 16 });
L('si2-cyclone-shelter', 10, 70, 10, '气旋警报响了，全村往避难所跑——这些年避难所多了，死的人少了，这是进步。', { hp: -1, know: 2, hap: -1 }, '孟加拉气旋死亡人数从 1970 年 50 万降至近年千人内（防灾体系）', { cond: s => SASISLAM(s) && s.iso3 === 'BGD' });
L('si2-maldives-island', 6, 70, 10, '你家所在的环礁——涨潮时海滩只剩三步宽，「海平面上升」在你们村不是新闻是日程。', { know: 1, hap: 0, hp: -1 }, '马尔代夫为全球海拔最低国（平均 1.5 米）', { cond: s => SASISLAM(s) && s.iso3 === 'MDV' });
L('si2-madrasa-bangla', 6, 15, 10, '放学后你去 madrasa 读经——阿拉伯字母和孟加拉字母在你本子上排排坐。', { know: 2, rel: 1 }, null, { cond: s => SASISLAM(s) && s.religion === '伊斯兰教' });
