// 文化圈专属抉择引擎 v1.0：24 个决策骨架 × 22 圈素材表 → 1000+ 条完整叙事抉择
// 红线：每条必须是「只有这里的人会面对」的选择——素材做进冲突本身，不是贴标签
// 骨架 = 结构（title/text/options），素材 = 语境（城市/职业/亲属/食物/民俗/梗）
// 展开确定性执行，无随机拼接

export const CHOICE_CUL_FULL = [];
// 文案级去重（v1.1）：同 text 前 40 字视为重复，后到者不入池
const _seenText = new Set();
function pushUnique(entry) {
  const k = entry.text.slice(0, 40);
  if (_seenText.has(k)) return false;
  _seenText.add(k);
  CHOICE_CUL_FULL.push(entry);
  return true;
}

// 素材包结构：{ city 城/村名, job 职业, kin 亲属称呼, food 食物, custom 民俗细节, detail 梗细节, extra 可选附加 }
// m 汇合后传给骨架函数

const FN = (fn) => ({ outcome: fn }); // 函数分支选项标记
const norm = (opt) => {
  if (opt.outcome && typeof opt.outcome === 'function') return opt;
  return opt;
};

let _seq = 0;
function push(idPrefix, kind, a, b, m, opts) {
  const built = BUILDERS[kind](m);
  pushUnique({
    id: `${idPrefix}-${kind}-${a}-${(++_seq)}`,
    _kind: kind,
    type: 'choice', minAge: a, maxAge: b, weight: opts.weight || 40, once: true,
    title: built.title, text: built.text, source: built.source || null,
    options: built.options.map(norm),
    cond: built.cond || opts.cond,
  });
}

// ─────────────────── 教育类 ───────────────────
const BUILDERS = {
  // E1 升学岔路
  'edu-cross': (m) => ({
    title: m.title || '毕业那年的岔路',
    text: `${m.examText}成绩出来那天，${m.kin}把两份路摆在你面前：一份是${m.pathSafe}——${m.safeDesc}；另一份是${m.pathRisk}，${m.riskDesc}。「家里只能供一条」，${m.kin}说。`,
    options: [
      { label: m.safeLabel || '走稳的那条', outcome: `你选了${m.pathSafe}。${m.safeLife}多年后同学聚会，${m.riskPeer}，你端着杯子笑，心里过了好几遍那条没走的路。`, effect: { money: m.safeMoney ?? 40, know: 1, rel: 2, hap: -1 } },
      FN(function (st) {
        return st.rng.chance(m.riskOdds ?? 0.45)
          ? { text: `你选了${m.pathRisk}。${m.riskWin}如今${m.riskWinNow}——${m.kin}逢人就提这件事，提了二十年。`, effect: { know: m.riskKnow ?? 4, hap: 4, money: m.riskWinMoney ?? 80 } }
          : { text: `你选了${m.pathRisk}，${m.riskLose}。你回了${m.city}，重新找了个营生。${m.kin}没再提这件事——只是那年过年，饭桌上安静了很久。`, effect: { know: 2, hap: -2, money: -30 } };
      }),
    ],
    cond: m.cond,
  }),
  // E2 专业/手艺之争
  'edu-trade': (m) => ({
    title: m.title || '学什么，跟谁学',
    text: `${m.tradeText}。一边是${m.tradeOld}——${m.tradeOldDesc}；一边是${m.tradeNew}，${m.tradeNewDesc}。两边的师傅都朝你招手。`,
    options: [
      { label: m.tradeOldLabel || '接老手艺', outcome: `你磕了头入了行。${m.tradeOldLife}这一行越来越老，可你成了${m.city}数得着的人——红白事、大日子，主家点名要你。`, effect: { know: 3, rel: 3, money: m.tradeOldMoney ?? 20, hap: 2 } },
      { label: m.tradeNewLabel || '学新的', outcome: function (st) { return st.rng.chance(0.55) ? { text: `你学了${m.tradeNew}。${m.tradeNewWin}——你把${m.kin}接进了城，他嘴上说瞎折腾，见人却说「我孩子在大公司」。`, effect: { money: m.tradeNewMoney ?? 90, know: 3, hap: 2 } } : { text: `${m.tradeNewLose}。你换了三份工，最后在${m.city}做回了老本行的变体——绕了一圈，手艺还是那门手艺，只是换了台机器。`, effect: { money: 30, know: 2, hap: -1 } }; } },
    ],
    cond: m.cond,
  }),
  // E3 语言/学校体系之争
  'edu-lang': (m) => ({
    title: m.title || '两所学校，两条路',
    text: `到了上学的年纪，${m.kin}在两所学校之间犯难：${m.schoolA}，${m.schoolADesc}；${m.schoolB}，${m.schoolBDesc}。「你将来是要做哪种人？」${m.kin}问的是你。`,
    options: [
      { label: m.schoolALabel || '上第一种', outcome: `你进了${m.schoolA}。${m.schoolALife}你成了家里的「先生」，写信读报都是你的事——也因此离${m.food}和${m.custom}的屋子越来越远。`, effect: { know: 4, rel: 1, hap: -1, money: -20 } },
      { label: m.schoolBLabel || '上第二种', outcome: `${m.schoolBLife}你的口音里留着${m.city}的调子，一辈子没改。后来出了远门，你最值钱的本事，反而是那所学校没教的。`, effect: { know: 2, rel: 3, hap: 2, money: 10 } },
    ],
    cond: m.cond,
  }),
  // ─────────────────── 婚恋类 ───────────────────
  // M1 相亲/安排 vs 自由恋爱
  'mar-arrange': (m) => ({
    title: m.title || '对象的两条来路',
    text: `${m.marText}。一头是${m.matchmaker}物色的对象——${m.matchDesc}；另一头是你自己心里那个人，${m.loveDesc}。${m.kin}说：「结婚是两个家的事，不是两个人的事。」`,
    options: [
      { label: m.matchLabel || '听家里的安排', outcome: `你和${m.matchPeer}成了家。${m.matchLife}日子谈不上轰轰烈烈，可${m.food}的热气每天都从你家灶上冒出来。多年后你承认：日子是过出来的，不是挑出来的。`, effect: { rel: 4, hap: 2, money: m.matchMoney ?? 60, marries: true } },
      FN(function (st) {
        return st.rng.chance(m.loveOdds ?? 0.5)
          ? { text: `你娶了/嫁了自己选的人。${m.loveWin}为了这事你和${m.kin}冷战了半年——第一个孩子出生那天，${m.kin}拎着${m.food}进了门，谁也没再提。`, effect: { hap: 5, rel: -1, marries: true } }
          : { text: `你跟自己选的人结了婚。${m.loveLose}婚姻散了的时候，${m.kin}没说「我早说过」——只是那年你没脸回家过年。后来你明白了：自由是代价最贵的东西。`, effect: { hap: -3, rel: -2, divorce: true } };
      }),
    ],
    cond: m.cond,
  }),
  // M2 彩礼/嫁妆之争
  'mar-bride': (m) => ({
    title: m.title || '谈婚论嫁，先谈钱',
    text: `${m.brideText}。对方家开的条件是${m.brideAsk}。你家能拿出${m.brideHave}——${m.brideHaveDesc}。${m.kin}把存折拍在桌上：「倾家荡产，也得把这个脸撑住。」`,
    options: [
      { label: m.bridePayLabel || '撑住这个脸', outcome: `婚事办得风风光光，${m.custom}一样没少。你背上了${m.brideDebtYears ?? 3}年的债——但你媳妇进门那天，全村都看着。这口气，撑住了。`, effect: { money: m.bridePayMoney ?? -260, rel: 3, hap: 1, debt: true } },
      { label: '把钱留在日子里', outcome: `你跟对方家磨了三个月，把规矩谈下来了一半。婚事办得朴素，亲戚背后嚼舌根——可你们小两口的日子过得踏实，第二年就缓过来了。`, effect: { money: m.brideKeepMoney ?? -60, hap: 2, rel: -1 } },
    ],
    cond: m.cond,
  }),
  // M3 早婚压力 vs 学业
  'mar-early': (m) => ({
    title: m.title || '同村人都成家了',
    text: `${m.earlyText}你的同学一个个都订了亲，饭桌上${m.kin}开始旁敲侧击：「${m.earlyHint}」可你心里还惦记着${m.earlyDream}。`,
    options: [
      { label: '先成家', outcome: `你成了家，${m.earlyMarried}。柴米油盐把梦想磨成了回忆——但孩子的第一声啼哭让你觉得，这个选择也没亏。`, effect: { rel: 3, hap: 1, money: 30, marries: true, kidsSoon: true } },
      { label: '先立业', outcome: function (st) { return st.rng.chance(0.5) ? { text: `你顶住了全村的催。${m.earlyWin}——等你成家时，你已经能给孩子当年求而不得的一切。`, effect: { money: m.earlyWinMoney ?? 120, know: 2, hap: 2 } } : { text: `你成了全村最晚成家的人。${m.earlyLose}相亲市场对你的评价只剩一个字：「挑」。你后悔过，但你没说出来过。`, effect: { hap: -2, rel: -1 } }; } },
    ],
    cond: m.cond,
  }),
  // ─────────────────── 职业类 ───────────────────
  // J1 进城 vs 留乡
  'job-city': (m) => ({
    title: m.title || '大巴车票只有一张',
    text: `${m.cityText}。${m.cityOffer}——工资是家里务农/做工的三倍。可${m.kin}的腰一年不如一年，${m.custom}的大事小情也离不开你。走，还是留？`,
    options: [
      { label: m.cityGoLabel || '进城', outcome: `你挤上了大巴。${m.cityGoLife}每个月寄回家的钱，成了${m.kin}在村里挺直腰杆的底气。你在出租屋吃了四年${m.food}——都是不正宗的那种。`, effect: { money: m.cityGoMoney ?? 110, hap: -1, rel: -1 } },
      { label: '留在村里', outcome: function (st) { return st.rng.chance(0.4) ? { text: `你留下了。${m.cityStayWin}——你把家里的营生做成了产业，隔壁村的年轻人都来你这里打工。`, effect: { money: m.cityStayMoney ?? 90, rel: 3, hap: 3 } } : { text: `你留下了，守着${m.kin}和那几亩地/那个铺子。日子紧巴但齐全——每年${m.custom}，一大家子围着一桌${m.food}，你端起碗就想：值。`, effect: { rel: 4, hap: 2, money: 15 } }; } },
    ],
    cond: m.cond,
  }),
  // J2 传统行当 vs 新行当
  'job-shift': (m) => ({
    title: m.title || '老铺子与新柜台',
    text: `${m.jobText}。${m.jobOldDesc}——这是你干熟了的；${m.jobNewOffer}，没人干过，工钱翻倍。${m.kin}说：「咱家世代是做${m.jobOld}的。」你妈没说话。`,
    options: [
      { label: '守着祖业', outcome: `你接了${m.jobOld}的担子。${m.jobOldLife}手艺没让你发大财，但让你在${m.city}受了一辈子尊敬——这是钱买不来的东西。`, effect: { rel: 3, know: 2, money: m.jobOldMoney ?? 30, hap: 2 } },
      { label: '闯新行当', outcome: function (st) { return st.rng.chance(m.jobNewOdds ?? 0.5) ? { text: `你入了新行。${m.jobNewWin}——三年后你雇了五个学徒，其中一个是你侄子。祖业没人接了，但你给家里盖了新房。`, effect: { money: m.jobNewMoney ?? 130, hap: 2 } } : { text: `新行当的泡沫比起来得快、破得更快。你两手空空回了家，${m.kin}只说了一句：「回来就好，锅里有${m.food}。」你鼻子一酸。`, effect: { money: -40, rel: 2, hap: -1 } }; } },
    ],
    cond: m.cond,
  }),
  // J3 稳定 vs 闯荡
  'job-safe': (m) => ({
    title: m.title || '铁饭碗与冒险票',
    text: `${m.safeText}。一边是${m.safeJob}——${m.safeDesc}；另一边是${m.riskyJob}，成了就是${m.riskyWin}，砸了就从头再来。${m.kin}的态度写在脸上：要稳。`,
    options: [
      { label: '端稳饭碗', outcome: `你端了${m.safeJob}的碗。${m.safeLife}你成了家里最让人放心的人——这份「放心」，比奖金值钱。`, effect: { money: m.safeMoney ?? 60, know: 1, hap: 1, rel: 2 } },
      { label: '赌一把大的', outcome: function (st) { return st.rng.chance(m.riskyOdds ?? 0.4) ? { text: `${m.riskyWinStory}你请全村/全楼的人吃了饭。${m.kin}喝多了，拉着你的手直摇头：「这孩子，随他爷爷。」`, effect: { money: m.riskyWinMoney ?? 200, hap: 4 } } : { text: `${m.riskyLoseStory}你花了三年还债。饭碗没了可以再找，可「稳定」这两个字，从此在你家饭桌上成了敏感词。`, effect: { money: m.riskyLoseMoney ?? -120, hap: -3 } }; } },
    ],
    cond: m.cond,
  }),
  // ─────────────────── 家庭类 ───────────────────
  // F1 赡养与分家
  'fam-split': (m) => ({
    title: m.title || '分家那本账',
    text: `${m.splitText}。兄弟们坐下来算账：老宅、地/铺面、还有${m.kin}的养老。${m.splitDetail}你拿的多，就得担得多。`,
    options: [
      { label: '多担一些', outcome: `你多分了债，少分了地——但${m.kin}跟你过。${m.splitElderLife}村里人都说这家人没散。你图的，就是这个「没散」。`, effect: { rel: 4, money: m.splitElderMoney ?? -50, hap: 2 } },
      { label: '按规矩来', outcome: `账算得清清楚楚，谁也不欠谁。${m.splitFairLife}可从那以后，兄弟间的走动只剩年节——规矩保住了公平，冷了热乎气。`, effect: { money: 30, rel: -2, hap: 0 } },
    ],
    cond: m.cond,
  }),
  // F2 长子/长女责任
  'fam-first': (m) => ({
    title: m.title || '你是家里最大的孩子',
    text: `${m.firstText}学费只够一个人的。${m.firstDetail}——这个决定，${m.kin}让你自己做，但每个眼神都在暗示答案。`,
    options: [
      { label: '让弟弟妹妹上', outcome: `你把书包收进了箱子，去了${m.jobYouth}。弟弟毕业那天给你敬了杯酒：「没有你，没有我今天。」这一杯，你等了十年。`, effect: { rel: 4, money: m.firstSacrificeMoney ?? -20, know: -1, hap: 1 } },
      { label: '自己继续读', outcome: function (st) { return st.rng.chance(0.55) ? { text: `你读完了。${m.firstWin}你毕业后第一件事，是把弟弟妹妹的学费全包了——债，用你自己的方式还上了。`, effect: { know: 4, money: m.firstWinMoney ?? 80, hap: 1 } } : { text: `你读了，弟弟没读。${m.firstLose}这顿饭，你家吃了十年。有些账，不是钱能算清的。`, effect: { know: 2, rel: -3, hap: -2 } }; } },
    ],
    cond: m.cond,
  }),
  // F3 生育之争（温和）
  'fam-kids': (m) => ({
    title: m.title || '再生一个？',
    text: `${m.kidsText}。${m.kidsDetail}你媳妇/你老公的意思和${m.kin}的意思，正好相反。家里的饭桌，快变成谈判桌了。`,
    options: [
      { label: '听老人的', outcome: `你迎来了第二个孩子。${m.kidsMoreLife}累是真累，闹是真闹——可${m.custom}的时候，一屋子孩子的喊叫声，是你这辈子最富有的声音。`, effect: { rel: 3, money: m.kidsMoreMoney ?? -90, hap: 2, kidsAdd: true } },
      { label: '小家说了算', outcome: `你们坚持了自己的决定。${m.kidsOneLife}老人念叨了好几年——直到孙子孙女会打酱油了，念叨变成了骄傲。`, effect: { money: 40, hap: 3, rel: -1 } },
    ],
    cond: m.cond,
  }),
  // ─────────────────── 信仰习俗类 ───────────────────
  // R1 宗教实践深浅
  'rel-depth': (m) => ({
    title: m.title || '信仰的深浅',
    text: `${m.relText}。${m.relDetail}长辈们看着你——这份家业/这片土地上，从来没人问过这种问题。`,
    options: [
      { label: '守足规矩', outcome: `你把${m.custom}一样没落地守了下来。${m.relDeepLife}年轻时的约束，成了中年后的锚——风浪越大的人，越懂这个。`, effect: { rel: 3, hap: 2, know: 1 } },
      { label: '走自己的路', outcome: function (st) { return st.rng.chance(0.5) ? { text: `你把${m.custom}简化成了自己能接受的样子。${m.relOwnWin}——你和家里的关系，从「要求与服从」变成了「各自安好」。`, effect: { hap: 3, rel: -1 } } : { text: `你退了${m.custom}，村里/社区的评价跟着变了。红白事的席位冷了，说话的分量轻了——你赢了自己，输了一些饭局。`, effect: { hap: 1, rel: -3 } }; } },
    ],
    cond: m.cond,
  }),
  // R2 节日的两种过法
  'rel-fest': (m) => ({
    title: m.title || '大节怎么过',
    text: `${m.festText}。一边是老讲究——${m.festOld}；一边是新过法——${m.festNew}。${m.kin}和孩子们各站一头，你是中间那个人。`,
    options: [
      { label: '按老讲究', outcome: `你把${m.festOld}一样样张罗齐了。${m.festOldLife}年轻人拍了视频发到网上，说这是「快消失的${m.city}」——评论里全是想家的人。`, effect: { rel: 4, money: m.festOldMoney ?? -40, hap: 2 } },
      { label: '换个过法', outcome: `你们带着全家出了趟远门/订了桌馆子。省下的功夫换成了轻松——可${m.kin}在饭桌上念叨了三次「还是从前有意思」。仪式感这东西，丢起来快，捡回来难。`, effect: { money: -50, hap: 3, rel: -1 } },
    ],
    cond: m.cond,
  }),
  // R3 命名/身份
  'rel-name': (m) => ({
    title: m.title || '孩子的名字',
    text: `${m.nameText}。${m.kin}拿来了族谱/经书，要给孩子起${m.nameOld}；你和你媳妇/你老公拟了个新名字——${m.nameNew}。两个名字，两代人的指望。`,
    options: [
      { label: '按老规矩起', outcome: `孩子叫了${m.nameOld}。${m.nameOldLife}他长大后问过名字的来历，你讲了半个钟头——那是他自己接不回来的东西，你替他存着。`, effect: { rel: 4, hap: 1 } },
      { label: '起个新的', outcome: `孩子用了新名字。${m.kin}在户口本前沉默了一会儿：「也行，日子是往前过的。」后来这名字写进了你的讣告草稿——是孩子拟的。`, effect: { hap: 2, rel: 1 } },
    ],
    cond: m.cond,
  }),
  // ─────────────────── 金钱类 ───────────────────
  // C1 土地/实产 vs 现金
  'mon-land': (m) => ({
    title: m.title || '卖还是不卖',
    text: `${m.landText}。买家出的价，是你种十年地/干十年活都挣不来的数。可那是${m.landWhat}——${m.kin}在的时候总说：「卖了它，咱家就断了根。」`,
    options: [
      { label: '卖了变现', outcome: function (st) { return st.rng.chance(m.landSellOdds ?? 0.5) ? { text: `你卖了。${m.landSellWin}——这笔钱变成了孩子的学费、新房的地基。根断没断，看你怎么种。`, effect: { money: m.landSellMoney ?? 220, hap: 2 } } : { text: `你卖了，钱却在两年里被三件事瓜分干净：治病、人情、和一个赔本的生意。你常在夜里想那块地。`, effect: { money: -60, hap: -3 } }; } },
      { label: '死死攥住', outcome: `你没卖。${m.landKeepLife}后来政策变了/行情来了——当初的价翻了三倍。你在地头站了一下午，没跟任何人提当年那个买家。`, effect: { money: m.landKeepMoney ?? 60, rel: 1, hap: 1 } },
    ],
    cond: m.cond,
  }),
  // C2 借钱渠道
  'mon-loan': (m) => ({
    title: m.title || '这笔钱怎么借',
    text: `${m.loanText}。两条路：${m.loanBank}，利息低但要抵押、要材料、要跑断腿；${m.loanLocal}——快，热络，可利息和人情一起滚。`,
    options: [
      { label: '走银行的远路', outcome: `你跑了${m.loanRuns ?? 4}趟，材料改了三稿，钱下来了。利息还得很稳—— Slow 的路，走得踏实。你学会了看合同，这个本事后来救过你两次。`, effect: { money: m.loanBankMoney ?? 150, know: 2 } },
      { label: '找熟人的快钱', outcome: function (st) { return st.rng.chance(0.55) ? { text: `熟人三天把钱送到家，酒都没喝完。${m.loanLocalWin}——人情债你用三年还清，还多还了一份礼。`, effect: { money: m.loanLocalMoney ?? 120, rel: 2 } } : { text: `钱来得快，麻烦跟得更快。${m.loanLocalLose}你从此明白：熟人借出去的不是钱，是攥住你的手。`, effect: { money: -80, rel: -2 } }; } },
    ],
    cond: m.cond,
  }),
  // C3 侨汇与家用
  'mon-remit': (m) => ({
    title: m.title || '汇款单的分配',
    text: `${m.remitText}。这笔钱有三份去处：${m.remitKin}的药钱、孩子下学期的学费、还有你憋了三年的那个小生意本钱。只够两份。`,
    options: [
      { label: '家和学业为先', outcome: `药钱和学费寄了回去。你的小生意梦又拖了一年——可${m.kin}在电话里的咳嗽轻了，孩子的成绩单红章盖了「优」。你安慰自己：下一年，明年一定。`, effect: { rel: 4, money: -30, hap: 1 } },
      { label: '先滚自己的本', outcome: function (st) { return st.rng.chance(0.5) ? { text: `你把大头投进了小生意。${m.remitBizWin}——第二年，你寄回家的钱翻了番，药钱学费再不用精打细算。`, effect: { money: m.remitBizMoney ?? 180, hap: 1, rel: -1 } } : { text: `生意折了本。你瞒着家里半年，电话里声音照旧响亮——直到${m.kin}病重那次，你连药钱都凑不齐。你发誓，再不做这种选择。`, effect: { money: -110, rel: -3, hap: -3 } }; } },
    ],
    cond: m.cond,
  }),
  // ─────────────────── 迁移类 ───────────────────
  // T1 国内迁移
  'mig-inner': (m) => ({
    title: m.title || '举家往哪走',
    text: `${m.innerText}。${m.innerTo}——那边有活路，但一切从零；留在${m.city}，日子熟、人情熟、${m.custom}也熟。孩子上学的事，不能再拖了。`,
    options: [
      { label: '举家搬过去', outcome: `你们搬了。${m.innerGoLife}头两年最难：口音被笑、房子漏雨、孩子哭着要回去。第三年开始，一切都顺了——「家」这个词，跟着人走。`, effect: { money: m.innerGoMoney ?? 80, know: 1, hap: 1, rel: -1 } },
      { label: '守住老窝', outcome: `你们没动。${m.innerStayLife}孩子后来考去了远方——你说「这是他自己选的路」。其实你心里明白，你也一样，只是走的方向相反。`, effect: { rel: 2, hap: 1, money: m.innerStayMoney ?? 20 } },
    ],
    cond: m.cond,
  }),
  // T2 出国打工
  'mig-abroad': (m) => ({
    title: m.title || '一张出国的合同',
    text: `${m.abroadText}。中介把合同拍在桌上：${m.abroadTerm}。三年——攒下${m.abroadMoney}，回来说亲/起房都够了。可三年，孩子就三岁了。${m.kin}说：「你去，家里有我。」`,
    options: [
      { label: '签三年', outcome: function (st) { return st.rng.chance(m.abroadOdds ?? 0.65) ? { text: `三年，你把命押在了流水线/工地上。${m.abroadWin}——回来那天，你把攒下的钱摊在桌上，${m.kin}数了三遍。孩子的手，认生了半年。`, effect: { money: m.abroadWinMoney ?? 260, hap: -1, rel: -1 } } : { text: `${m.abroadLose}你提前回来了，亏了中介费，也亏了三年。村里人问起来，你说「水土不服」——真的，是水土，也是心里那块不服。`, effect: { money: -60, hap: -3 } }; } },
      { label: '不去', outcome: `你没签。${m.abroadStayLife}后来同批出去的人回来了两个，一个发了财。你在${m.custom}上碰见他——他讲的故事你听了一晚上，回家路上你走得很慢。`, effect: { rel: 3, hap: 1, money: 10 } },
    ],
    cond: m.cond,
  }),
  // T3 回流还是留下
  'mig-back': (m) => ({
    title: m.title || '回去，还是留下',
    text: `${m.backText}。你在外的日子终于熬出了头——${m.backNow}。而${m.city}来消息：${m.kin}的身体一年不如一年，老宅的房梁塌了半边。机票/车票，就摆在眼前。`,
    options: [
      { label: '回去', outcome: `你回去了。${m.backGoLife}收入少了一半，睡得着觉了。你把老宅修好那天，${m.kin}在门槛上坐了一下午——什么都没说，眼睛一直亮着。`, effect: { money: m.backGoMoney ?? -40, rel: 4, hap: 3 } },
      { label: '再熬几年', outcome: `你汇了修房子的钱，请了最好的护工。${m.backStayLife}你每年回去一次，每次都发誓「明年一定回来」——「明年」说了七年。有些账，利息是悔。`, effect: { money: 120, hap: -2, rel: -2 } },
    ],
    cond: m.cond,
  }),
  // ─────────────────── 时代冲击类 ───────────────────
  // W1 新技术
  'era-tech': (m) => ({
    title: m.title || '新玩意进了门',
    text: `${m.techText}。${m.techDetail}——价格不便宜，可${m.techPeer}都开始用了。${m.kin}骂那东西「烧钱的家伙」——说这话时，眼睛却瞟着说明书。`,
    options: [
      { label: '咬牙上一个', outcome: `你买了。${m.techWinLife}当初骂它烧钱的${m.kin}，后来用得比谁都勤——还学会了跟邻居炫耀。`, effect: { money: m.techMoney ?? -80, know: 3, hap: 2 } },
      { label: '等它跌价', outcome: `你等了两年，价跌了一半才入手——省下的钱给全家添了件大件。你错过的是两年新鲜劲，赚到的是${m.kin}那句：「这孩子，稳当。」`, effect: { money: -35, know: 1, hap: 1 } },
    ],
    cond: m.cond,
  }),
  // W2 政策变迁
  'era-policy': (m) => ({
    title: m.title || '新政策来了',
    text: `${m.policyText}。${m.policyDetail}——去申请，要放下手里营生跑流程，还不一定批；不申请，就看着别人把好处拿走。村里/街坊已经在议论谁家报了名。`,
    options: [
      { label: '第一时间去申请', outcome: function (st) { return st.rng.chance(m.policyOdds ?? 0.6) ? { text: `你批下来了。${m.policyWin}——第一批吃螃蟹的人，骨头缝里都带着鲜。`, effect: { money: m.policyWinMoney ?? 150, know: 1, hap: 2 } } : { text: `你跑了半年，材料退了三次——政策在执行里变了形。钱没拿到，营生也荒了半季。你学会了：文件上的字，和地上的路是两回事。`, effect: { money: -40, know: 1, hap: -2 } }; } },
      { label: '等一等，看一看', outcome: `你观望了两年。政策落地了，规矩也清楚了——你这时候进场，没吃到头啖汤，但没呛着水。${m.kin}说：「稳人有稳福。」`, effect: { money: m.policyWaitMoney ?? 60, hap: 1 } },
    ],
    cond: m.cond,
  }),
  // W3 灾后去留
  'era-disaster': (m) => ({
    title: m.title || '灾后那道选择题',
    text: `${m.disasterText}。${m.disasterDetail}。安置点的大巴分两个方向：去城里安置区，有工打、有学上；回${m.city}重建——地还在，可什么都得从头来。`,
    options: [
      { label: '回乡重建', outcome: function (st) { return st.rng.chance(0.6) ? { text: `你们回了${m.city}。${m.disasterRebuild}——第二年春天，新梁上架那天，全村放了一挂鞭。你站在房顶看人间的烟火，觉得日子这东西，烧不尽。`, effect: { rel: 4, money: m.rebuildMoney ?? 40, hap: 3 } } : { text: `重建的第二年又逢灾年。你咬牙没走——第三年，老天爷终于给了个太平年。这三年教会你的事：人这棵草，比你想的结实。`, effect: { rel: 3, money: -30, hp: -2, hap: 1 } }; } },
      { label: '进城安置', outcome: `你们去了安置区。${m.disasterCityLife}孩子转学那天哭了，半年后有了新朋友。${m.city}成了「老家」——一个每年${m.custom}才回去的地方。`, effect: { money: m.disasterCityMoney ?? 70, know: 1, rel: -1, hap: 1 } },
    ],
    cond: m.cond,
  }),
};

export { BUILDERS, push };
export function expand(prefix, rows) {
  for (const r of rows) {
    push(prefix, r[0], r[1], r[2], r[3], r[4] || {});
  }
  return CHOICE_CUL_FULL;
}

// ─────────── 批量组合模式：短语库 → 完整叙事条目 ───────────
// lib = { kind, ages, scenes, dilemmas, aDescs, bDescs, labels, details, kin?, pay?, cond, money? }
// 组合确定性错位：(i*7+k)%len——同圈几十条零重复且通顺
// 每个骨架一套全字段化模板——无 hardcode，全部由短语库注入
const BATCH_TPL = {
  'edu-cross': (m) => ({
    title: '毕业那年的岔路口',
    text: `${m.scene}。${m.dilemma}。两条路摆在桌上——「${m.lA}」：${m.payA}；「${m.lB}」：${m.payB}。`,
    options: [
      { label: m.lA, outcome: m.aDesc, effect: { know: 1, hap: 1, money: -(m.money?.[1] ?? 40) } },
      { label: m.lB, outcome: function (st) { return st.rng.chance(0.5) ? { text: m.bDesc + '。' + m.detail, effect: { know: 3, hap: 2, money: m.money?.[0] ?? 130 } } : { text: m.bDesc + '。你爸后来说：「路是自己挑的，走通了是本事，走摔了是学费。」', effect: { know: 2, hap: 1, money: 20 } }; } },
    ],
  }),
  'job-city': (m) => ({
    title: '走，还是留？',
    text: `${m.scene}。${m.dilemma}。「${m.lA}」——${m.payA}；「${m.lB}」——${m.payB}。`,
    options: [
      { label: m.lA, outcome: m.aDesc, effect: { hap: -1, money: m.money?.[0] ?? 130, know: 1 } },
      { label: m.lB, outcome: m.bDesc, effect: { rel: 3, money: m.money?.[1] ?? 60 } },
    ],
  }),
  'mar-arrange': (m) => ({
    title: '成个家',
    text: `${m.scene}。${m.dilemma}。是「${m.lA}」，还是「${m.lB}」——你妈问你，你也问你自己。`,
    options: [
      { label: m.lA, outcome: m.aDesc, effect: { rel: 4, money: m.money?.[1] ?? 60, hap: 3 } },
      { label: m.lB, outcome: function (st) { return st.rng.chance(0.45) ? { text: m.bDesc + '。', effect: { hap: 4, rel: -1, know: 1, money: m.money?.[1] ?? 50 } } : { text: m.bDesc + '。你后来明白了：你等的不是对的人，是你自己长成大人。', effect: { hap: 2, know: 2, rel: 1 } }; } },
    ],
  }),
  'mar-bride': (m) => ({
    title: '提亲的条件',
    text: `${m.scene}。${m.dilemma}。「${m.lA}」还是「${m.lB}」——这顿饭吃完就要给话。`,
    options: [
      { label: m.lA, outcome: m.aDesc, effect: { rel: 3, hap: 3, money: -(m.money?.[1] ?? 60) } },
      { label: m.lB, outcome: m.bDesc, effect: { hap: 1, rel: 1, money: m.money?.[0] ?? 90 } },
    ],
  }),
  'job-shift': (m) => ({
    title: '手艺与饭碗',
    text: `${m.scene}。${m.dilemma}。「${m.lA}」——${m.payA}；「${m.lB}」——${m.payB}。`,
    options: [
      { label: m.lA, outcome: m.aDesc, effect: { know: 1, money: m.money?.[1] ?? 80 } },
      { label: m.lB, outcome: function (st) { return st.rng.chance(0.5) ? { text: m.bDesc + '。', effect: { hap: 2, money: m.money?.[0] ?? 130 } } : { text: m.bDesc + '。回来那天你才懂：老手艺饿不死人，新行业饿死过很多人。', effect: { know: 1, money: 30, hap: 1 } }; } },
    ],
  }),
  'job-safe': (m) => ({
    title: '稳定还是闯荡',
    text: `${m.scene}。${m.dilemma}。「${m.lA}」——${m.payA}；「${m.lB}」——${m.payB}。`,
    options: [
      { label: m.lA, outcome: m.aDesc, effect: { hap: 2, rel: 2, money: m.money?.[1] ?? 70 } },
      { label: m.lB, outcome: function (st) { return st.rng.chance(0.4) ? { text: m.bDesc + '。', effect: { hap: 3, money: m.money?.[0] ?? 140 } } : { text: m.bDesc + '。你爸说：「闯过了就不亏。」——他这话安慰了你五年。', effect: { know: 2, hap: 1, money: 40 } }; } },
    ],
  }),
  'fam-split': (m) => ({
    title: '分家',
    text: `${m.scene}。${m.dilemma}。「${m.lA}」还是「${m.lB}」——长辈都在看你先开口。`,
    options: [
      { label: m.lA, outcome: m.aDesc, effect: { money: m.money?.[1] ?? 60, rel: 2 } },
      { label: m.lB, outcome: m.bDesc, effect: { rel: 3, hap: 2, money: m.money?.[1] ?? 50 } },
    ],
  }),
  'mon-remit': (m) => ({
    title: '那笔没到的钱',
    text: `${m.scene}。${m.dilemma}。「${m.lA}」还是「${m.lB}」——你盯着汇款短信的界面想了一夜。`,
    options: [
      { label: m.lA, outcome: m.aDesc, effect: { rel: 3, hap: 2, money: -(m.money?.[1] ?? 60) } },
      { label: m.lB, outcome: m.bDesc, effect: { rel: 2, money: -(m.money?.[1] ?? 90), hap: 1 } },
    ],
  }),
  'era-tech': (m) => ({
    title: '新东西进了门',
    text: `${m.scene}。${m.dilemma}。「${m.lA}」还是「${m.lB}」——村里人都在看你家的动静。`,
    options: [
      { label: m.lA, outcome: m.aDesc, effect: { know: 2, hap: 2, money: m.money?.[0] ?? 120 } },
      { label: m.lB, outcome: m.bDesc, effect: { know: 1, money: m.money?.[1] ?? 30 } },
    ],
  }),
  'mig-abroad': (m) => ({
    title: '出国打工的合同',
    text: `${m.scene}。${m.dilemma}。「${m.lA}」——${m.payA}；「${m.lB}」——${m.payB}。`,
    options: [
      { label: m.lA, outcome: function (st) { return st.rng.chance(0.5) ? { text: m.aDesc + '。', effect: { hap: -1, money: m.money?.[0] ?? 150, know: 1 } } : { text: m.aDesc + '。你在异乡学会的第一句当地话是「多少钱」——最后一句是「我想家」。', effect: { money: 70, hap: -2, know: 1 } }; } },
      { label: m.lB, outcome: m.bDesc, effect: { rel: 3, money: m.money?.[1] ?? 70 } },
    ],
  }),
  'era-disaster': (m) => ({
    title: '灾后那道选择题',
    text: `${m.scene}。${m.dilemma}。「${m.lA}」还是「${m.lB}」——全家人的眼睛都在你身上。`,
    options: [
      { label: m.lA, outcome: function (st) { return st.rng.chance(0.55) ? { text: m.aDesc + '。', effect: { rel: 4, money: m.money?.[0] ?? 90, hap: 3 } } : { text: m.aDesc + '。第二年灾又来了——你们咬牙又挺了一年。第三年，老天爷给了个太平年。人这棵草，比你想的结实。', effect: { rel: 3, money: 20, hp: -2, hap: 1 } }; } },
      { label: m.lB, outcome: m.bDesc, effect: { money: m.money?.[1] ?? 70, know: 1, rel: -1, hap: 1 } },
    ],
  }),
  'mig-inner': (m) => ({
    title: '挪窝的抉择',
    text: `${m.scene}。${m.dilemma}。「${m.lA}」还是「${m.lB}」——这步棋落下去就难收回。`,
    options: [
      { label: m.lA, outcome: m.aDesc, effect: { rel: 3, money: m.money?.[1] ?? 60, hap: 2 } },
      { label: m.lB, outcome: function (st) { return st.rng.chance(0.5) ? { text: m.bDesc + '。', effect: { money: m.money?.[0] ?? 120, know: 1, hap: 2 } } : { text: m.bDesc + '。你在外面的第三年回了趟家——你奶奶的头发全白了。你住了一周，又走了——这次你带着她给你缝的护腰。', effect: { money: 80, rel: 1, hap: -1 } }; } },
    ],
  }),
  'fam-first': (m) => ({
    title: '长子的账',
    text: `${m.scene}。${m.dilemma}。「${m.lA}」还是「${m.lB}」——这个家的天平在等你放砝码。`,
    options: [
      { label: m.lA, outcome: m.aDesc, effect: { rel: 4, money: m.money?.[1] ?? 40, hap: 2 } },
      { label: m.lB, outcome: function (st) { return st.rng.chance(0.55) ? { text: m.bDesc + '。', effect: { know: 3, money: m.money?.[0] ?? 90, hap: 2 } } : { text: m.bDesc + '。家里的担子你请了邻居帮三个月——你回来时家里的账你补了双倍——你爸说「出去的人，心还在家，就不算走」。', effect: { know: 2, money: 30, rel: 1 } }; } },
    ],
  }),
  'mon-land': (m) => ({
    title: '地与钱的天平',
    text: `${m.scene}。${m.dilemma}。「${m.lA}」还是「${m.lB}」——这是一辈子基数的选择。`,
    options: [
      { label: m.lA, outcome: m.aDesc, effect: { rel: 3, hap: 2, money: m.money?.[1] ?? 60 } },
      { label: m.lB, outcome: function (st) { return st.rng.chance(0.5) ? { text: m.bDesc + '。', effect: { money: m.money?.[0] ?? 140, hap: 1, know: 1 } } : { text: m.bDesc + '。你的现金三年缩了一半——你的地翻了三倍——你爸没说「我早说过」——他只是把地契又描了一遍边。', effect: { money: -20, know: 2, hap: 1 } }; } },
    ],
  }),
  'mon-loan': (m) => ({
    title: '钱的去向',
    text: `${m.scene}。${m.dilemma}。「${m.lA}」还是「${m.lB}」——这笔钱的去处，是两种活法。`,
    options: [
      { label: m.lA, outcome: m.aDesc, effect: { hap: 2, money: m.money?.[1] ?? 40, rel: 1 } },
      { label: m.lB, outcome: function (st) { return st.rng.chance(0.5) ? { text: m.bDesc + '。', effect: { money: m.money?.[0] ?? 160, know: 1 } } : { text: m.bDesc + '。你的项目黄了——你的债还在——你的家的餐桌上的沉默你付了三年。你的爸最后说「债还完了——饭还是要一起吃」。', effect: { money: -60, know: 2, hap: 1 } }; } },
    ],
  }),
  'era-policy': (m) => ({
    title: '政策的分水岭',
    text: `${m.scene}。${m.dilemma}。「${m.lA}」还是「${m.lB}」——政策这阵风，吹向哪边都要有人接住。`,
    options: [
      { label: m.lA, outcome: m.aDesc, effect: { know: 2, money: m.money?.[0] ?? 110 } },
      { label: m.lB, outcome: function (st) { return st.rng.chance(0.55) ? { text: m.bDesc + '。', effect: { rel: 2, money: m.money?.[1] ?? 50, hap: 2 } } : { text: m.bDesc + '。政策的最后期限过了——你的材料你补交了三次——第四次过了——你的收益晚了两年——但没少。你爸说「慢是慢了——稳」。', effect: { money: 40, know: 1, hap: 1 } }; } },
    ],
  }),
  'rel-depth': (m) => ({
    title: '信仰的深浅',
    text: `${m.scene}。${m.dilemma}。「${m.lA}」还是「${m.lB}」——同样的神，两种亲近的方式。`,
    options: [
      { label: m.lA, outcome: m.aDesc, effect: { hap: 3, rel: 2, know: 1 } },
      { label: m.lB, outcome: function (st) { return st.rng.chance(0.5) ? { text: m.bDesc + '。', effect: { hap: 3, know: 2, rel: 1 } } : { text: m.bDesc + '。你的路你的家人起初没懂——你的孩子长大后说「爸，你的方式我看见了——它让你成了更好的人」。你的神你没变——你的家人看见了你的光。', effect: { hap: 4, rel: 2, know: 1 } }; } },
    ],
  }),
  'rel-fest': (m) => ({
    title: '节日的两桌席',
    text: `${m.scene}。${m.dilemma}。「${m.lA}」还是「${m.lB}」——两张请帖，一样的心意。`,
    options: [
      { label: m.lA, outcome: m.aDesc, effect: { rel: 3, hap: 3 } },
      { label: m.lB, outcome: function (st) { return st.rng.chance(0.6) ? { text: m.bDesc + '。', effect: { hap: 2, rel: 2, know: 1 } } : { text: m.bDesc + '。你的两桌席你在城里的家都摆了——你的乡下的亲戚来了八个——你的城里的同事来了五个——你的厨房忙了三天——你的妈说「值得——人齐了就是年」。', effect: { hap: 3, rel: 3, money: -20 } }; } },
    ],
  }),
};

export function buildBatch(prefix, lib) {
  const n = lib.count || 12;
  lib.scenes ||= ['这一年家里的事，摆在了你面前'];
  lib.dilemmas ||= ['可家里的担子总要有人挑'];
  lib.aDescs ||= ['你留了下来——日子不惊艳，但每一步都踩实了'];
  lib.bDescs ||= ['你走了——多年后你明白，走出去本身就是答案'];
  lib.labels ||= [['守着家', '出去闯'], ['听爸妈的', '按自己的来'], ['稳一点', '搏一把'], ['留下', '出发']];
  lib.details ||= ['你妈往你包里塞的东西，你到了地方才发现'];
  lib.payA ||= ['眼前的现钱'];
  lib.payB ||= ['细水长流的日子'];
  for (let i = 0; i < n; i++) {
    const scene = lib.scenes[i % lib.scenes.length];
    const dilemma = lib.dilemmas[(i * 3 + 1) % lib.dilemmas.length];
    const aDesc = lib.aDescs[(i * 7 + 2) % lib.aDescs.length];
    const bDesc = lib.bDescs[(i * 5 + 3) % lib.bDescs.length];
    const label = lib.labels[i % lib.labels.length];
    const detail = lib.details[(i * 11 + 4) % lib.details.length];
    const payA = lib.payA?.[i % (lib.payA?.length || 1)] || '眼前的现钱';
    const payB = lib.payB?.[i % (lib.payB?.length || 1)] || '细水长流的日子';
    const [a, b] = lib.ages[i % lib.ages.length];
    const built = BATCH_TPL[lib.kind]({
      scene, dilemma, aDesc, bDesc, detail, payA, payB,
      lA: label[0], lB: label[1],
      money: lib.money,
    });
    pushUnique({
      id: `${prefix}-${lib.kind}-${a}-${i}-${(++_seq)}`,
      _kind: lib.kind,
      type: 'choice', minAge: a, maxAge: b, weight: lib.weight || 40, once: true,
      title: built.title, text: built.text, source: lib.source || null,
      options: built.options.map(norm),
      cond: lib.cond,
    });
  }
  return CHOICE_CUL_FULL;
}