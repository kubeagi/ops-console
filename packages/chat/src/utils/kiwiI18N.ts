import KiwiIntl from 'kiwi-intl';

import EN_US from './kiwi/en-US';
import ZH_CN from './kiwi/zh-CN';

export enum LangEnum {
  'en-US' = 'en-US',
  'zh-CN' = 'zh-CN',
  'en' = 'en-US',
  'zh' = 'zh-CN',
}

const LOCALE_KEY = 'intl_locale';
const _locale =
  window.localStorage.getItem(LOCALE_KEY) ||
  (typeof navigator === 'object' && typeof navigator.language === 'string'
    ? navigator.language
    : 'zh-CN');
const locale = _locale.startsWith('en') ? 'en-US' : 'zh-CN';

const getLocale = () => locale;

// 从 Localstorage 中取语言值, 默认为 zh-CN
const curLang = getLocale();
const I18N = KiwiIntl.init(curLang, {
  'en-US': EN_US,
  'zh-CN': ZH_CN,
});

export default I18N;
