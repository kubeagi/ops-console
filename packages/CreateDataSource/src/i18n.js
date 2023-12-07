const i18nConfig = {
  'en-US': {
    'i18n-0ujub8i3': '取消',
    'i18n-147ypkac': 'Object',
    'i18n-1gfbnspc': 'Only.txt,.doc,.docx,.pdf,.md files are supported.',
    'i18n-232nz66x': 'Please enter the API address',
    'i18n-23jovmbg': 'Click/drag files to this area to upload',
    'i18n-4bisav57': 'API',
    'i18n-5am4k7to': 'Data sources',
    'i18n-6spbbojn': 'Please enter the service address',
    'i18n-6y63riyn': 'API address',
    'i18n-7p3f51an': 'description',
    'i18n-8cjf8cxq': 'Object storage',
    'i18n-9odw2n6l': 'Local upload',
    'i18n-9vkabv9j': 'Please enter Bucket',
    'i18n-a17g4buw': 'Bucket',
    'i18n-af2ovuoj': 'Token',
    'i18n-aioalozj': 'Please enter a data source alias',
    'i18n-cz31s8vq': 'Confirm',
    'i18n-e6p2phzh': 'No more than 20',
    'i18n-eictbzlm': 'Please enter a description',
    'i18n-fr3ipxlc': 'Data source alias',
    'i18n-h0lq7h8f': 'Single file size',
    'i18n-h18e958l': 'Please enter path',
    'i18n-iazmtrsp': 'Please enter Object',
    'i18n-ifb9v7p6': 'username',
    'i18n-iyav0uec': 'No more than 2G,',
    'i18n-k8ddthex': 'The name of the data',
    'i18n-kktx1hle': 'MongoDB',
    'i18n-l88g15y8': 'Please enter Token',
    'i18n-mtolrn4c': 'password',
    'i18n-oe4qfho1': 'Protocol type',
    'i18n-p1xi725y': 'Select file',
    'i18n-sanitrjl': 'MySQL',
    'i18n-tjlmmaei': 'File storage',
    'i18n-tnfvqdxl': 'Please enter your username',
    'i18n-tw87ecqw': 'Path',
    'i18n-u4ayeyas': 'Please enter a name for the data source',
    'i18n-umfzqrmt': 'Please test the connection and pass',
    'i18n-vuolk538': 'Number of files uploaded at a time',
    'i18n-wg1t5zxg': 'Service address',
    'i18n-yzicgjma': 'Please enter password',
    'i18n-z7scyw9j': 'Test connection',
  },
  'zh-CN': {
    'i18n-0ujub8i3': '取消',
    'i18n-147ypkac': 'Object',
    'i18n-1gfbnspc': '仅支持 .txt,.doc,.docx,.pdf,.md 文件；',
    'i18n-232nz66x': '请输入 API 地址',
    'i18n-23jovmbg': '点击 / 拖拽文件到此区域上传',
    'i18n-4bisav57': 'API',
    'i18n-5am4k7to': '数据源',
    'i18n-6spbbojn': '请输入服务地址',
    'i18n-6y63riyn': 'API 地址',
    'i18n-7p3f51an': '描述',
    'i18n-8cjf8cxq': '对象存储',
    'i18n-9odw2n6l': '本地上传',
    'i18n-9vkabv9j': '请输入 Bucket',
    'i18n-a17g4buw': 'Bucket',
    'i18n-af2ovuoj': 'Token',
    'i18n-aioalozj': '请输入数据源别名',
    'i18n-cz31s8vq': '确定',
    'i18n-e6p2phzh': '不超过 20个',
    'i18n-eictbzlm': '请输入描述',
    'i18n-fr3ipxlc': '数据源别名',
    'i18n-h0lq7h8f': '单文件大小 ',
    'i18n-h18e958l': '请输入路径',
    'i18n-iazmtrsp': '请输入 Object',
    'i18n-ifb9v7p6': '用户名',
    'i18n-iyav0uec': '不超过 2G，',
    'i18n-k8ddthex': '数据源名称',
    'i18n-kktx1hle': 'MongoDB',
    'i18n-l88g15y8': '请输入 Token',
    'i18n-mtolrn4c': '密码',
    'i18n-oe4qfho1': '协议类型',
    'i18n-p1xi725y': '选择文件',
    'i18n-sanitrjl': 'MySQL',
    'i18n-tjlmmaei': '文件存储',
    'i18n-tnfvqdxl': '请输入用户名',
    'i18n-tw87ecqw': '路径',
    'i18n-u4ayeyas': '请输入数据源名称',
    'i18n-umfzqrmt': '请测试连接并通过',
    'i18n-vuolk538': '单次上传文件数量',
    'i18n-wg1t5zxg': '服务地址',
    'i18n-yzicgjma': '请输入密码',
    'i18n-z7scyw9j': '测试连接',
  },
};

const LOCALE_KEY = 'intl_locale';
let locale = window.localStorage.getItem(LOCALE_KEY);
if (!locale) {
  locale =
    typeof navigator === 'object' && typeof navigator.language === 'string'
      ? navigator.language
      : 'zh-CN';
}
if (locale.startsWith('en')) {
  locale = 'en-US';
} else {
  locale = 'zh-CN';
}

const getLocale = () => locale;

const setLocale = target => {
  locale = target;
  window.localStorage.setItem(LOCALE_KEY, target);
};

const isEmptyVariables = variables =>
  (Array.isArray(variables) && variables.length === 0) ||
  (typeof variables === 'object' && (!variables || Object.keys(variables).length === 0));

// 按低代码规范里面的要求进行变量替换
const format = (msg, variables) =>
  typeof msg === 'string'
    ? msg.replace(/\$?\{(\w+)\}/g, (match, key) => variables?.[key] ?? '')
    : msg;

const i18nFormat = ({ id, defaultMessage, fallback }, variables) => {
  const msg =
    i18nConfig[locale]?.[id] ?? i18nConfig[locale.replace('-', '_')]?.[id] ?? defaultMessage;
  if (msg == null) {
    console.warn('[i18n]: unknown message id: %o (locale=%o)', id, locale);
    return fallback === undefined ? `${id}` : fallback;
  }

  return format(msg, variables);
};

const i18n = (id, params) => {
  return i18nFormat({ id }, params);
};

// 将国际化的一些方法注入到目标对象&上下文中
const _inject2 = target => {
  target.i18n = i18n;
  target.getLocale = getLocale;
  target.setLocale = locale => {
    setLocale(locale);
    target.forceUpdate();
  };
  target._i18nText = t => {
    // 优先取直接传过来的语料
    const localMsg = t[locale] ?? t[String(locale).replace('-', '_')];
    if (localMsg != null) {
      return format(localMsg, t.params);
    }

    // 其次用项目级别的
    const projectMsg = i18nFormat({ id: t.key, fallback: null }, t.params);
    if (projectMsg != null) {
      return projectMsg;
    }

    // 兜底用 use 指定的或默认语言的
    return format(t[t.use || 'zh-CN'] ?? t.en_US, t.params);
  };

  // 注入到上下文中去
  if (target._context && target._context !== target) {
    Object.assign(target._context, {
      i18n,
      getLocale,
      setLocale: target.setLocale,
    });
  }
};

export { getLocale, setLocale, i18n, i18nFormat, _inject2 };
