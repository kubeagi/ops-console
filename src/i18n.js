const i18nConfig = {
  'en-US': {
    'i18n-1gikmooh': 'Details',
    'i18n-2b53hns8': 'Processing of data',
    'i18n-2ejg9q5l': 'Add dataset',
    'i18n-38tkeb1r': 'Data source management',
    'i18n-3k0nxm6h': 'The import was successful',
    'i18n-4ebt9mj3': 'raw data',
    'i18n-5bu583cw': 'Release',
    'i18n-5djmpfvu': 'Dataset management',
    'i18n-6r57uk2w': 'data processing',
    'i18n-8f4bzjjd': 'The connection is abnormal',
    'i18n-9plmyzo5': 'Importing',
    'i18n-af4xea8m': 'Please select the type',
    'i18n-e9onsolp': 'raw data',
    'i18n-eog0s8xc': 'Data ingestion',
    'i18n-glavn95l': 'Please enter a name for the data source',
    'i18n-hp37vpeo': 'Please enter the data source name to search',
    'i18n-jskgqh8o': 'flushed',
    'i18n-k7qioby7': 'Dataset version details',
    'i18n-ks28cpqo': 'data type',
    'i18n-lzsiaffa': 'Dataset version details',
    'i18n-m2zjlilo': 'Data sources',
    'i18n-mh5ck17f': 'Import data',
    'i18n-o0qitjur': 'Please enter a description',
    'i18n-p5qipded': 'Application scenarios',
    'i18n-p7mextst': 'state',
    'i18n-qahl1me8': 'The connection is successful',
    'i18n-qi5varhn': 'A dataset has been added',
    'i18n-qiakd7cu': 'The name of the data',
    'i18n-qjodl1nn': 'Creation time',
    'i18n-rd3x3m3s': 'Add dataset',
    'i18n-sg7nu8tx': 'Created by',
    'i18n-str3pnrc': 'edit',
    'i18n-tr55yns8': 'The name of the data source',
    'i18n-txt5kh4m': 'description',
    'i18n-uag94ndq': 'Updated',
    'i18n-ueslu0a9': 'A new data source is added',
    'i18n-vce3sfm7': 'Please enter the dataset name to search',
    'i18n-wgpt60zj': 'New version',
    'i18n-wourf2xg': 'return',
    'i18n-xbgo4no6': 'All versions',
    'i18n-z0idrepg': 'Delete',
  },
  'zh-CN': {
    'i18n-1gikmooh': '详细信息',
    'i18n-2b53hns8': '处理数据',
    'i18n-2ejg9q5l': '新增数据集',
    'i18n-38tkeb1r': '数据源管理',
    'i18n-3k0nxm6h': '导入成功',
    'i18n-4ebt9mj3': '原始数据',
    'i18n-5bu583cw': '发布',
    'i18n-5djmpfvu': '数据集管理',
    'i18n-6r57uk2w': '数据处理',
    'i18n-8f4bzjjd': '连接异常',
    'i18n-9plmyzo5': '导入中',
    'i18n-af4xea8m': '请选择类型',
    'i18n-e9onsolp': '原始数据',
    'i18n-eog0s8xc': '数据接入',
    'i18n-glavn95l': '请输入数据源名称',
    'i18n-hp37vpeo': '请输入数据源名称搜索',
    'i18n-jskgqh8o': '刷新',
    'i18n-k7qioby7': '数据集版本详情',
    'i18n-ks28cpqo': '数据类型',
    'i18n-lzsiaffa': '数据集版本详情',
    'i18n-m2zjlilo': '数据源',
    'i18n-mh5ck17f': '导入数据',
    'i18n-o0qitjur': '请输入描述',
    'i18n-p5qipded': '应用场景',
    'i18n-p7mextst': '状态',
    'i18n-qahl1me8': '连接成功',
    'i18n-qi5varhn': '新增数据集',
    'i18n-qiakd7cu': '数据名称',
    'i18n-qjodl1nn': '创建时间',
    'i18n-rd3x3m3s': '新增数据集',
    'i18n-sg7nu8tx': '创建者',
    'i18n-str3pnrc': '编辑',
    'i18n-tr55yns8': '数据源名称',
    'i18n-txt5kh4m': '描述',
    'i18n-uag94ndq': '更新时间',
    'i18n-ueslu0a9': '新增数据集',
    'i18n-vce3sfm7': '请输入数据集名称搜索',
    'i18n-wgpt60zj': '新增版本',
    'i18n-wourf2xg': '返回',
    'i18n-xbgo4no6': '所有版本',
    'i18n-z0idrepg': '删除',
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
