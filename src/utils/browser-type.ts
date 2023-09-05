/**
 * @description 获取用户浏览器版本及系统信息
 * @param {string='zh-cn' | 'en'} lang 返回中文的信息还是英文的
 * @constructor
 */
export default function BrowserType(lang: 'zh-cn' | 'en' = 'en') {
  // weights: system + system version > platform > kernel + carrier + kernel version + carrier version > shell + shell version
  const ua = navigator.userAgent.toLowerCase();
  const testUa = (regexp) => regexp.test(ua);
  const testVs = (regexp) =>
    ua
      .match(regexp)
      ?.toString()
      .replace(/[^0-9|_.]/g, '')
      .replace(/_/g, '.');
  // system
  const system =
    new Map([
      [testUa(/windows|win32|win64|wow32|wow64/g), 'windows'], // windows system
      [testUa(/macintosh|macintel/g), 'macos'], // macos system
      [testUa(/x11/g), 'linux'], // linux system
      [testUa(/android|adr/g), 'android'], // android system
      [testUa(/ios|iphone|ipad|ipod|iwatch/g), 'ios'], // ios system
    ]).get(true) || 'unknow';

  // system version
  const systemVs =
    new Map([
      [
        'windows',
        new Map([
          [testUa(/windows nt 5.0|windows 2000/g), '2000'],
          [testUa(/windows nt 5.1|windows xp/g), 'xp'],
          [testUa(/windows nt 5.2|windows 2003/g), '2003'],
          [testUa(/windows nt 6.0|windows vista/g), 'vista'],
          [testUa(/windows nt 6.1|windows 7/g), '7'],
          [testUa(/windows nt 6.2|windows 8/g), '8'],
          [testUa(/windows nt 6.3|windows 8.1/g), '8.1'],
          [testUa(/windows nt 10.0|windows 10/g), '10'],
        ]).get(true),
      ],
      ['macos', testVs(/os x [\d._]+/g)],
      ['android', testVs(/android [\d._]+/g)],
      ['ios', testVs(/os [\d._]+/g)],
    ]).get(system) || 'unknow';

  // platform
  let platform = 'unknow';
  if (system === 'windows' || system === 'macos' || system === 'linux') {
    platform = 'desktop'; // desktop
  } else if (system === 'android' || system === 'ios' || testUa(/mobile/g)) {
    platform = 'mobile'; // mobile
  }
  // kernel and vector
  const [engine = 'unknow', supporter = 'unknow'] = new Map([
    [
      testUa(/applewebkit/g),
      [
        'webkit',
        new Map([
          // webkit kernel
          [testUa(/safari/g), 'safari'], // safari browser
          [testUa(/chrome/g), 'chrome'], // chrome browser
          [testUa(/opr/g), 'opera'], // opera browser
          [testUa(/edge/g), 'edge'], // edge browser
        ]).get(true),
      ] || 'unknow',
    ], // [webkit kernel, xxx browser]
    [testUa(/gecko/g) && testUa(/firefox/g), ['gecko', 'firefox']], // [gecko kernel,firefox browser]
    [testUa(/presto/g), ['presto', 'opera']], // [presto kernel, opera browser]
    [testUa(/trident|compatible|msie/g), ['trident', 'iexplore']], // [trident kernel, iexplore browser]
  ]).get(true) || ['unknow', 'unknow'];

  // kernel version
  const engineVs =
    new Map([
      ['webkit', testVs(/applewebkit\/[\d._]+/g)],
      ['gecko', testVs(/gecko\/[\d._]+/g)],
      ['presto', testVs(/presto\/[\d._]+/g)],
      ['trident', testVs(/trident\/[\d._]+/g)],
    ]).get(engine) || 'unknow';

  // carrier version
  const supporterVs =
    new Map([
      ['firefox', testVs(/firefox\/[\d._]+/g)],
      ['opera', testVs(/opr\/[\d._]+/g)],
      ['iexplore', testVs(/(msie [\d._]+)|(rv:[\d._]+)/g)],
      ['edge', testVs(/edge\/[\d._]+/g)],
      ['safari', testVs(/version\/[\d._]+/g)],
      ['chrome', testVs(/chrome\/[\d._]+/g)],
    ]).get(supporter) || 'unknow';

  // shell and shell version
  const [shell = 'none', shellVs = 'unknow'] = new Map([
    [testUa(/micromessenger/g), ['wechat', testVs(/micromessenger\/[\d._]+/g)]], // [Wechat browser,]
    [testUa(/qqbrowser/g), ['qq', testVs(/qqbrowser\/[\d._]+/g)]], // [QQ browser,]
    [testUa(/ucbrowser/g), ['uc', testVs(/ucbrowser\/[\d._]+/g)]], // [UC browser,]
    [testUa(/qihu 360se/g), ['360', 'unknow']], // [360 browser (no version),]
    [testUa(/2345explorer/g), ['2345', testVs(/2345explorer\/[\d._]+/g)]], // [2345explorer,]
    [testUa(/metasr/g), ['sougou', 'unknow']], // [Sogou browser (no version),]
    [testUa(/lbbrowser/g), ['liebao', 'unknow']], // [Cheetah browser (no version),]
    [testUa(/maxthon/g), ['maxthon', testVs(/maxthon\/[\d._]+/g)]], // [Visit Browser,]
  ]).get(true) || ['none', 'unknow'];
  return {
    'zh-cn': Object.assign(
      {
        内核: engine, // 内核: webkit gecko presto trident
        内核版本: engineVs, // 内核版本
        平台: platform, // 平台: desktop mobile
        载体: supporter, // 载体: chrome safari firefox opera iexplore edge
        载体版本: supporterVs, // 载体版本
        系统: system, // 系统: windows macos linux android ios
        系统版本: systemVs, // 系统版本
      },
      shell === 'none'
        ? {}
        : {
            外壳: shell, // 外壳: wechat qq uc 360 2345 sougou liebao maxthon
            外壳版本: shellVs, // 外壳版本
          }
    ),
    en: Object.assign(
      {
        engine, // 内核: webkit gecko presto trident
        engineVs, // 内核版本
        platform, // 平台: desktop mobile
        supporter, // 载体: chrome safari firefox opera iexplore edge
        supporterVs, // 载体版本
        system, // 系统: windows macos linux android ios
        systemVs, // 系统版本
      },
      shell === 'none'
        ? {}
        : {
            shell, // 外壳: wechat qq uc 360 2345 sougou liebao maxthon
            shellVs, // 外壳版本
          }
    ),
  }[lang];
}
