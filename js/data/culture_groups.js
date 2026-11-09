// 文化圈映射 v0.7.0：iso3 → 文化圈（事件本土化分组）
// 按语言/宗教/历史传统划分 22 圈，覆盖世界银行全部 217 个国家与地区
// 未列出的 iso3 自动按世行地区组小写兜底（culture = wbRegion.toLowerCase()）

export const CULTURE_GROUPS = {
  // ── 亚太 ──
  sinic: ['JPN', 'KOR', 'PRK', 'HKG', 'MAC', 'SGP', 'MNG'],           // 儒家/汉字文化圈（含蒙古边缘）
  'sea-mainland': ['VNM', 'LAO', 'KHM', 'THA', 'MMR'],                // 中南半岛（上座部+儒释混）
  'sea-maritime': ['IDN', 'MYS', 'BRN', 'PHL', 'TLS'],                // 海洋东南亚（南岛+伊斯兰/天主教）
  'sas-indic': ['IND', 'NPL', 'BTN', 'LKA'],                          // 印度教/喜马拉雅佛教圈（含斯里兰卡）
  'sas-islam': ['PAK', 'BGD', 'MDV'],                                  // 南亚伊斯兰圈
  // ── 非洲 ──
  'west-africa': ['NGA', 'GHA', 'SEN', 'GMB', 'GIN', 'GNB', 'SLE', 'LBR', 'CIV', 'TGO', 'BEN', 'BFA', 'MLI', 'NER', 'CPV'],  // 西非（约鲁巴/豪萨/曼德/阿肯）
  'horn': ['ETH', 'ERI', 'SOM', 'DJI', 'SSD', 'SDN'],                  // 非洲之角（埃塞正教/索马里游牧/尼罗河）
  'central-africa': ['COD', 'COG', 'CMR', 'CAF', 'TCD', 'GAB', 'GNQ', 'STP'],  // 中部非洲（班图/法系）
  'east-africa': ['KEN', 'TZA', 'UGA', 'RWA', 'BDI', 'COM', 'MUS', 'SYC'],     // 东非（斯瓦希里海岸）
  'southern-africa': ['ZAF', 'ZWE', 'ZMB', 'MWI', 'AGO', 'NAM', 'BWA', 'LSO', 'SWZ', 'MDG', 'MOZ'],  // 南部非洲
  // ── 中东 ──
  maghreb: ['MAR', 'DZA', 'TUN', 'LBY', 'MRT'],                        // 马格里布（阿拉伯-柏柏尔+法语遗产）
  'arab-core': ['EGY', 'SAU', 'ARE', 'QAT', 'KWT', 'BHR', 'OMN', 'JOR', 'IRQ', 'YEM', 'PSE', 'LBN', 'SYR'],  // 阿拉伯核心（海湾/黎凡特/尼罗河）
  persia: ['IRN', 'AFG'],                                              // 波斯圈
  'turkic-caucasus': ['TUR', 'AZE', 'KAZ', 'UZB', 'TKM', 'KGZ', 'TJK', 'ARM', 'GEO'],  // 突厥-高加索圈
  // ── 欧洲 ──
  balkan: ['GRC', 'HRV', 'SVN', 'SRB', 'BIH', 'MKD', 'MNE', 'ALB', 'XKX'],  // 巴尔干
  // ── 美洲 ──
  'hispanic-latam': ['MEX', 'ARG', 'COL', 'CHL', 'PER', 'ECU', 'VEN', 'BOL', 'PRY', 'URY', 'CRI', 'PAN', 'GTM', 'HND', 'NIC', 'SLV', 'CUB', 'DOM'],  // 西语拉美
  'brazil-luso': ['BRA', 'PRT'],                                       // 巴西葡语圈（含葡萄牙）
  caribbean: ['JAM', 'TTO', 'BRB', 'BHS', 'BLZ', 'GUY', 'SUR', 'ATG', 'DMA', 'GRD', 'KNA', 'LCA', 'VCT', 'HTI', 'ABW', 'CUW', 'SXM', 'MAF', 'PRI', 'VIR', 'TCA', 'VGB', 'CYM'],  // 加勒比（英联邦/荷属/法属/美属）
  anglo: ['USA', 'CAN', 'GBR', 'IRL', 'AUS', 'NZL', 'BMU'],            // 盎格鲁圈
  // ── 欧洲补漏 ──
  'west-north-euro': ['DEU', 'FRA', 'NLD', 'BEL', 'LUX', 'CHE', 'AUT', 'EST', 'LVA', 'LTU', 'FIN', 'SWE', 'NOR', 'DNK', 'ISL', 'GBR', 'IRL', 'MLT', 'CYP', 'IMN', 'FRO', 'GIB', 'AND', 'MCO', 'SMR', 'LIE', 'JEY', 'GGY', 'ISR', 'CHI', 'GRL', 'ITA', 'ESP'],  // 西欧-北欧-南欧（含小实体）
  'east-euro': ['RUS', 'UKR', 'BLR', 'MDA', 'BGR', 'ROU', 'CZE', 'SVK', 'HUN', 'POL'],  // 东欧（东正教斯拉夫+罗马尼亚+中欧四国）
  // ── 大洋洲 ──
  oceania: ['PNG', 'FJI', 'WSM', 'TON', 'VUT', 'SLB', 'KIR', 'FSM', 'MHL', 'PLW', 'NRU', 'TUV', 'NCL', 'PYF', 'GUM', 'ASM', 'MNP'],  // 太平洋岛国（美拉尼西亚/波利尼西亚）
};

// 反查表：iso3 → 圈
const ISO_TO_CULTURE = {};
for (const [culture, isos] of Object.entries(CULTURE_GROUPS)) {
  for (const iso of isos) ISO_TO_CULTURE[iso] = culture;
}

// 查询：优先文化圈，兜底世行地区组小写
export function cultureOf(iso3, wbRegion) {
  return ISO_TO_CULTURE[iso3] || (wbRegion ? wbRegion.toLowerCase() : 'other');
}
