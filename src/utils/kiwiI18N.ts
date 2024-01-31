import KiwiIntl from 'kiwi-intl';

import { getLocale } from '@/i18n';

import EN_US from '../../.kiwi/en-US';
import ZH_CN from '../../.kiwi/zh-CN';

export enum LangEnum {
  'en-US' = 'en-US',
  'zh-CN' = 'zh-CN',
  'en' = 'en-US',
  'zh' = 'zh-CN',
}

// 从 Localstorage 中取语言值, 默认为 zh-CN
const curLang = getLocale();
const I18N = KiwiIntl.init(curLang, {
  'en-US': EN_US,
  'zh-CN': ZH_CN,
});

export default I18N;
