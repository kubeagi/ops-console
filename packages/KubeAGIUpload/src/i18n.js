const i18nConfig = {
  'en-US': {
    'i18n-07ryldck': 'No more than 20 pcs',
    'i18n-1v40vm3l': 'Single file size',
    'i18n-432m045e': '文件上传失败，可能的原因包括：',
    'i18n-8qd53yxm':
      '2. The network connection is unstable, please check your network and try again later.',
    'i18n-acu9gpik': 'Click / drag and drop the file to this area to upload',
    'i18n-b6z34has': 'Upload the file',
    'i18n-boehucun': 'Upload failed',
    'i18n-g0mdui69': 'Please open the link below to manually trust the certificate first',
    'i18n-msjvy7uv': 'prompt',
    'i18n-mzls5g8w': '1. 证书不受信任。',
    'i18n-o9uxngg9': 'No more than 2G,',
    'i18n-qgsszrjb':
      "3. If you're using a firewall or security software, make sure it's not blocking file uploads.",
    'i18n-tl135yoj': '如果问题仍然存在，或者您需要进一步的帮助，请联系网站管理员或支持团队',
    'i18n-u0ndjcyg': 'File;',
    'i18n-ui0fj2sq': 'Only',
    'i18n-uklfmuzu': 'Re-upload',
    'i18n-w3k0sm1r': 'The number of files uploaded at a time',
    'i18n-ymkxjalg': '点击信任证书',
    'i18n-zughatwk': 'Cancel',
  },
  'zh-CN': {
    'i18n-07ryldck': '不超过20个',
    'i18n-1v40vm3l': '单文件大小',
    'i18n-432m045e': '文件上传失败，可能的原因包括：',
    'i18n-8qd53yxm': '2. 网络连接不稳定，请检查您的网络并稍后重试。',
    'i18n-acu9gpik': '点击 / 拖拽文件到此区域上传',
    'i18n-b6z34has': '上传文件',
    'i18n-boehucun': '上传失败',
    'i18n-g0mdui69': '请先打开下面链接手动信任证书',
    'i18n-msjvy7uv': '提示',
    'i18n-mzls5g8w': '1. 证书不受信任。',
    'i18n-o9uxngg9': '不超过2G，',
    'i18n-qgsszrjb': '3. 如果您使用了防火墙或安全软件，请确保其没有阻止文件上传。',
    'i18n-tl135yoj': '如果问题仍然存在，或者您需要进一步的帮助，请联系网站管理员或支持团队。',
    'i18n-u0ndjcyg': '文件；',
    'i18n-ui0fj2sq': '仅支持',
    'i18n-uklfmuzu': '重新上传',
    'i18n-w3k0sm1r': '单次上传文件数量',
    'i18n-ymkxjalg': '点击信任证书',
    'i18n-zughatwk': '取消',
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
