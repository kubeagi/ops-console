// 注意: 出码引擎注入的临时变量默认都以 "__$$" 开头，禁止在搭建的代码中直接访问。
// 例外：react 框架的导出名和各种组件名除外。
import React from 'react';

import { Component, Card, Descriptions } from '@tenx-ui/materials';

import LccComponentNx9n5 from 'TEST';

import { DataProvider } from 'shared-components';
import { getUnifiedHistory } from '@tenx-ui/utils/es/UnifiedLink/index.prod';

import utils from './utils/__utils';

import * as __$$i18n from './i18n';

import __$$constants from './__constants';

import './index.css';

class AppCard$$Component extends React.Component {
  get history() {
    return this.props.self?.history;
  }
  get appHelper() {
    return this.props.self?.appHelper;
  }

  _context = this;

  get constants() {
    return __$$constants || {};
  }

  constructor(props, context) {
    super(props);

    this.utils = utils;

    __$$i18n._inject2(this);

    this.state = {};
  }

  $ = () => null;

  $$ = () => [];

  componentDidMount() {}

  render() {
    const __$$context = this._context || this;
    const { state } = __$$context;
    return (
      <Component>
        <Card
          size="default"
          type="default"
          actions={[]}
          loading={false}
          bordered={false}
          hoverable={false}
          __component_name="Card"
        >
          <Descriptions
            id=""
            size="default"
            colon={true}
            items={[
              { key: 'w5g22zp76uq', span: 1, label: '属性1', children: 'test' },
              { key: 'i4dso2902x', span: 1, label: '属性2', children: 'test' },
              { key: 'pmprbnkm4u', span: 1, label: '属性3', children: 'test3' },
            ]}
            title={__$$eval(() => this.props.title || '应用标题')}
            column={3}
            layout="horizontal"
            bordered={false}
            labelStyle={{ width: 100 }}
            borderedBottom={false}
            __component_name="Descriptions"
            borderedBottomDashed={false}
          >
            <Descriptions.Item key="w5g22zp76uq" span={1} label="属性1">
              test
            </Descriptions.Item>
            <Descriptions.Item key="i4dso2902x" span={1} label="属性2">
              test
            </Descriptions.Item>
            <Descriptions.Item key="pmprbnkm4u" span={1} label="属性3">
              test3
            </Descriptions.Item>
          </Descriptions>
          <LccComponentNx9n5
            rq="2023-08-23T00:00:00+08:00"
            yue={__$$eval(() => ({
              _isAMomentObject: true,
              _isUTC: false,
              _pf: {
                empty: false,
                unusedTokens: [],
                unusedInput: [],
                overflow: -2,
                charsLeftOver: 0,
                nullInput: false,
                invalidMonth: null,
                invalidFormat: false,
                userInvalidated: false,
                iso: false,
                parsedDateParts: [],
                meridiem: null,
                rfc2822: false,
                weekdayMismatch: false,
              },
              _locale: {
                _calendar: {
                  sameDay: '[Today at] LT',
                  nextDay: '[Tomorrow at] LT',
                  nextWeek: 'dddd [at] LT',
                  lastDay: '[Yesterday at] LT',
                  lastWeek: '[Last] dddd [at] LT',
                  sameElse: 'L',
                },
                _longDateFormat: {
                  LTS: 'h:mm:ss A',
                  LT: 'h:mm A',
                  L: 'MM/DD/YYYY',
                  LL: 'MMMM D, YYYY',
                  LLL: 'MMMM D, YYYY h:mm A',
                  LLLL: 'dddd, MMMM D, YYYY h:mm A',
                },
                _invalidDate: 'Invalid date',
                ordinal: function (e) {
                  var t = e % 10;
                  return (
                    e +
                    (1 === D((e % 100) / 10)
                      ? 'th'
                      : 1 === t
                      ? 'st'
                      : 2 === t
                      ? 'nd'
                      : 3 === t
                      ? 'rd'
                      : 'th')
                  );
                },
                _dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
                _relativeTime: {
                  future: 'in %s',
                  past: '%s ago',
                  s: 'a few seconds',
                  ss: '%d seconds',
                  m: 'a minute',
                  mm: '%d minutes',
                  h: 'an hour',
                  hh: '%d hours',
                  d: 'a day',
                  dd: '%d days',
                  M: 'a month',
                  MM: '%d months',
                  y: 'a year',
                  yy: '%d years',
                },
                _months: [
                  'January',
                  'February',
                  'March',
                  'April',
                  'May',
                  'June',
                  'July',
                  'August',
                  'September',
                  'October',
                  'November',
                  'December',
                ],
                _monthsShort: [
                  'Jan',
                  'Feb',
                  'Mar',
                  'Apr',
                  'May',
                  'Jun',
                  'Jul',
                  'Aug',
                  'Sep',
                  'Oct',
                  'Nov',
                  'Dec',
                ],
                _week: {
                  dow: 0,
                  doy: 6,
                },
                _weekdays: [
                  'Sunday',
                  'Monday',
                  'Tuesday',
                  'Wednesday',
                  'Thursday',
                  'Friday',
                  'Saturday',
                ],
                _weekdaysMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
                _weekdaysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                _meridiemParse: /[ap]\.?m?\.?/i,
                _abbr: 'en',
                _config: {
                  calendar: {
                    sameDay: '[Today at] LT',
                    nextDay: '[Tomorrow at] LT',
                    nextWeek: 'dddd [at] LT',
                    lastDay: '[Yesterday at] LT',
                    lastWeek: '[Last] dddd [at] LT',
                    sameElse: 'L',
                  },
                  longDateFormat: {
                    LTS: 'h:mm:ss A',
                    LT: 'h:mm A',
                    L: 'MM/DD/YYYY',
                    LL: 'MMMM D, YYYY',
                    LLL: 'MMMM D, YYYY h:mm A',
                    LLLL: 'dddd, MMMM D, YYYY h:mm A',
                  },
                  invalidDate: 'Invalid date',
                  ordinal: function (e) {
                    var t = e % 10;
                    return (
                      e +
                      (1 === D((e % 100) / 10)
                        ? 'th'
                        : 1 === t
                        ? 'st'
                        : 2 === t
                        ? 'nd'
                        : 3 === t
                        ? 'rd'
                        : 'th')
                    );
                  },
                  dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
                  relativeTime: {
                    future: 'in %s',
                    past: '%s ago',
                    s: 'a few seconds',
                    ss: '%d seconds',
                    m: 'a minute',
                    mm: '%d minutes',
                    h: 'an hour',
                    hh: '%d hours',
                    d: 'a day',
                    dd: '%d days',
                    M: 'a month',
                    MM: '%d months',
                    y: 'a year',
                    yy: '%d years',
                  },
                  months: [
                    'January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                    'August',
                    'September',
                    'October',
                    'November',
                    'December',
                  ],
                  monthsShort: [
                    'Jan',
                    'Feb',
                    'Mar',
                    'Apr',
                    'May',
                    'Jun',
                    'Jul',
                    'Aug',
                    'Sep',
                    'Oct',
                    'Nov',
                    'Dec',
                  ],
                  week: {
                    dow: 0,
                    doy: 6,
                  },
                  weekdays: [
                    'Sunday',
                    'Monday',
                    'Tuesday',
                    'Wednesday',
                    'Thursday',
                    'Friday',
                    'Saturday',
                  ],
                  weekdaysMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
                  weekdaysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                  meridiemParse: /[ap]\.?m?\.?/i,
                  abbr: 'en',
                },
                _dayOfMonthOrdinalParseLenient: /\d{1,2}(th|st|nd|rd)|\d{1,2}/,
              },
              _d: new Date('2023-01-31T16:00:00.974Z'),
              _isValid: true,
            }))}
            nian={__$$eval(() => ({
              _isAMomentObject: true,
              _isUTC: false,
              _pf: {
                empty: false,
                unusedTokens: [],
                unusedInput: [],
                overflow: -2,
                charsLeftOver: 0,
                nullInput: false,
                invalidMonth: null,
                invalidFormat: false,
                userInvalidated: false,
                iso: false,
                parsedDateParts: [],
                meridiem: null,
                rfc2822: false,
                weekdayMismatch: false,
              },
              _locale: {
                _calendar: {
                  sameDay: '[Today at] LT',
                  nextDay: '[Tomorrow at] LT',
                  nextWeek: 'dddd [at] LT',
                  lastDay: '[Yesterday at] LT',
                  lastWeek: '[Last] dddd [at] LT',
                  sameElse: 'L',
                },
                _longDateFormat: {
                  LTS: 'h:mm:ss A',
                  LT: 'h:mm A',
                  L: 'MM/DD/YYYY',
                  LL: 'MMMM D, YYYY',
                  LLL: 'MMMM D, YYYY h:mm A',
                  LLLL: 'dddd, MMMM D, YYYY h:mm A',
                },
                _invalidDate: 'Invalid date',
                ordinal: function (e) {
                  var t = e % 10;
                  return (
                    e +
                    (1 === D((e % 100) / 10)
                      ? 'th'
                      : 1 === t
                      ? 'st'
                      : 2 === t
                      ? 'nd'
                      : 3 === t
                      ? 'rd'
                      : 'th')
                  );
                },
                _dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
                _relativeTime: {
                  future: 'in %s',
                  past: '%s ago',
                  s: 'a few seconds',
                  ss: '%d seconds',
                  m: 'a minute',
                  mm: '%d minutes',
                  h: 'an hour',
                  hh: '%d hours',
                  d: 'a day',
                  dd: '%d days',
                  M: 'a month',
                  MM: '%d months',
                  y: 'a year',
                  yy: '%d years',
                },
                _months: [
                  'January',
                  'February',
                  'March',
                  'April',
                  'May',
                  'June',
                  'July',
                  'August',
                  'September',
                  'October',
                  'November',
                  'December',
                ],
                _monthsShort: [
                  'Jan',
                  'Feb',
                  'Mar',
                  'Apr',
                  'May',
                  'Jun',
                  'Jul',
                  'Aug',
                  'Sep',
                  'Oct',
                  'Nov',
                  'Dec',
                ],
                _week: {
                  dow: 0,
                  doy: 6,
                },
                _weekdays: [
                  'Sunday',
                  'Monday',
                  'Tuesday',
                  'Wednesday',
                  'Thursday',
                  'Friday',
                  'Saturday',
                ],
                _weekdaysMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
                _weekdaysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                _meridiemParse: /[ap]\.?m?\.?/i,
                _abbr: 'en',
                _config: {
                  calendar: {
                    sameDay: '[Today at] LT',
                    nextDay: '[Tomorrow at] LT',
                    nextWeek: 'dddd [at] LT',
                    lastDay: '[Yesterday at] LT',
                    lastWeek: '[Last] dddd [at] LT',
                    sameElse: 'L',
                  },
                  longDateFormat: {
                    LTS: 'h:mm:ss A',
                    LT: 'h:mm A',
                    L: 'MM/DD/YYYY',
                    LL: 'MMMM D, YYYY',
                    LLL: 'MMMM D, YYYY h:mm A',
                    LLLL: 'dddd, MMMM D, YYYY h:mm A',
                  },
                  invalidDate: 'Invalid date',
                  ordinal: function (e) {
                    var t = e % 10;
                    return (
                      e +
                      (1 === D((e % 100) / 10)
                        ? 'th'
                        : 1 === t
                        ? 'st'
                        : 2 === t
                        ? 'nd'
                        : 3 === t
                        ? 'rd'
                        : 'th')
                    );
                  },
                  dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
                  relativeTime: {
                    future: 'in %s',
                    past: '%s ago',
                    s: 'a few seconds',
                    ss: '%d seconds',
                    m: 'a minute',
                    mm: '%d minutes',
                    h: 'an hour',
                    hh: '%d hours',
                    d: 'a day',
                    dd: '%d days',
                    M: 'a month',
                    MM: '%d months',
                    y: 'a year',
                    yy: '%d years',
                  },
                  months: [
                    'January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                    'August',
                    'September',
                    'October',
                    'November',
                    'December',
                  ],
                  monthsShort: [
                    'Jan',
                    'Feb',
                    'Mar',
                    'Apr',
                    'May',
                    'Jun',
                    'Jul',
                    'Aug',
                    'Sep',
                    'Oct',
                    'Nov',
                    'Dec',
                  ],
                  week: {
                    dow: 0,
                    doy: 6,
                  },
                  weekdays: [
                    'Sunday',
                    'Monday',
                    'Tuesday',
                    'Wednesday',
                    'Thursday',
                    'Friday',
                    'Saturday',
                  ],
                  weekdaysMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
                  weekdaysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                  meridiemParse: /[ap]\.?m?\.?/i,
                  abbr: 'en',
                },
                _dayOfMonthOrdinalParseLenient: /\d{1,2}(th|st|nd|rd)|\d{1,2}/,
              },
              _d: new Date('2023-12-31T16:00:00.685Z'),
              _isValid: true,
            }))}
            riqi={[
              '',
              __$$eval(() => ({
                _isAMomentObject: true,
                _isUTC: false,
                _pf: {
                  empty: false,
                  unusedTokens: [],
                  unusedInput: [],
                  overflow: -2,
                  charsLeftOver: 0,
                  nullInput: false,
                  invalidMonth: null,
                  invalidFormat: false,
                  userInvalidated: false,
                  iso: false,
                  parsedDateParts: [],
                  meridiem: null,
                  rfc2822: false,
                  weekdayMismatch: false,
                },
                _locale: {
                  _calendar: {
                    sameDay: '[Today at] LT',
                    nextDay: '[Tomorrow at] LT',
                    nextWeek: 'dddd [at] LT',
                    lastDay: '[Yesterday at] LT',
                    lastWeek: '[Last] dddd [at] LT',
                    sameElse: 'L',
                  },
                  _longDateFormat: {
                    LTS: 'h:mm:ss A',
                    LT: 'h:mm A',
                    L: 'MM/DD/YYYY',
                    LL: 'MMMM D, YYYY',
                    LLL: 'MMMM D, YYYY h:mm A',
                    LLLL: 'dddd, MMMM D, YYYY h:mm A',
                  },
                  _invalidDate: 'Invalid date',
                  ordinal: function (e) {
                    var t = e % 10;
                    return (
                      e +
                      (1 === D((e % 100) / 10)
                        ? 'th'
                        : 1 === t
                        ? 'st'
                        : 2 === t
                        ? 'nd'
                        : 3 === t
                        ? 'rd'
                        : 'th')
                    );
                  },
                  _dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
                  _relativeTime: {
                    future: 'in %s',
                    past: '%s ago',
                    s: 'a few seconds',
                    ss: '%d seconds',
                    m: 'a minute',
                    mm: '%d minutes',
                    h: 'an hour',
                    hh: '%d hours',
                    d: 'a day',
                    dd: '%d days',
                    M: 'a month',
                    MM: '%d months',
                    y: 'a year',
                    yy: '%d years',
                  },
                  _months: [
                    'January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                    'August',
                    'September',
                    'October',
                    'November',
                    'December',
                  ],
                  _monthsShort: [
                    'Jan',
                    'Feb',
                    'Mar',
                    'Apr',
                    'May',
                    'Jun',
                    'Jul',
                    'Aug',
                    'Sep',
                    'Oct',
                    'Nov',
                    'Dec',
                  ],
                  _week: {
                    dow: 0,
                    doy: 6,
                  },
                  _weekdays: [
                    'Sunday',
                    'Monday',
                    'Tuesday',
                    'Wednesday',
                    'Thursday',
                    'Friday',
                    'Saturday',
                  ],
                  _weekdaysMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
                  _weekdaysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                  _meridiemParse: /[ap]\.?m?\.?/i,
                  _abbr: 'en',
                  _config: {
                    calendar: {
                      sameDay: '[Today at] LT',
                      nextDay: '[Tomorrow at] LT',
                      nextWeek: 'dddd [at] LT',
                      lastDay: '[Yesterday at] LT',
                      lastWeek: '[Last] dddd [at] LT',
                      sameElse: 'L',
                    },
                    longDateFormat: {
                      LTS: 'h:mm:ss A',
                      LT: 'h:mm A',
                      L: 'MM/DD/YYYY',
                      LL: 'MMMM D, YYYY',
                      LLL: 'MMMM D, YYYY h:mm A',
                      LLLL: 'dddd, MMMM D, YYYY h:mm A',
                    },
                    invalidDate: 'Invalid date',
                    ordinal: function (e) {
                      var t = e % 10;
                      return (
                        e +
                        (1 === D((e % 100) / 10)
                          ? 'th'
                          : 1 === t
                          ? 'st'
                          : 2 === t
                          ? 'nd'
                          : 3 === t
                          ? 'rd'
                          : 'th')
                      );
                    },
                    dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
                    relativeTime: {
                      future: 'in %s',
                      past: '%s ago',
                      s: 'a few seconds',
                      ss: '%d seconds',
                      m: 'a minute',
                      mm: '%d minutes',
                      h: 'an hour',
                      hh: '%d hours',
                      d: 'a day',
                      dd: '%d days',
                      M: 'a month',
                      MM: '%d months',
                      y: 'a year',
                      yy: '%d years',
                    },
                    months: [
                      'January',
                      'February',
                      'March',
                      'April',
                      'May',
                      'June',
                      'July',
                      'August',
                      'September',
                      'October',
                      'November',
                      'December',
                    ],
                    monthsShort: [
                      'Jan',
                      'Feb',
                      'Mar',
                      'Apr',
                      'May',
                      'Jun',
                      'Jul',
                      'Aug',
                      'Sep',
                      'Oct',
                      'Nov',
                      'Dec',
                    ],
                    week: {
                      dow: 0,
                      doy: 6,
                    },
                    weekdays: [
                      'Sunday',
                      'Monday',
                      'Tuesday',
                      'Wednesday',
                      'Thursday',
                      'Friday',
                      'Saturday',
                    ],
                    weekdaysMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
                    weekdaysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                    meridiemParse: /[ap]\.?m?\.?/i,
                    abbr: 'en',
                  },
                  _dayOfMonthOrdinalParseLenient: /\d{1,2}(th|st|nd|rd)|\d{1,2}/,
                },
                _d: new Date('2024-09-17T16:00:00.000Z'),
                _isValid: true,
              })),
            ]}
            text="text"
            mtext={this.i18n('i18n-ma2afpod') /* - */}
          />
        </Card>
      </Component>
    );
  }
}

const ComponentWrapper = () => {
  const history = getUnifiedHistory();
  const appHelper = {
    utils,
    history,
  };
  const self = {
    appHelper,
    ...appHelper,
  };
  return (
    <DataProvider
      self={self}
      sdkInitFunc={{
        enabled: undefined,
        func: 'undefined',
        params: undefined,
      }}
      sdkSwrFuncs={[]}
      render={dataProps => <AppCard$$Component {...dataProps} self={self} appHelper={appHelper} />}
    />
  );
};
export default ComponentWrapper;

function __$$eval(expr) {
  try {
    return expr();
  } catch (error) {}
}

function __$$evalArray(expr) {
  const res = __$$eval(expr);
  return Array.isArray(res) ? res : [];
}

function __$$createChildContext(oldContext, ext) {
  const childContext = {
    ...oldContext,
    ...ext,
  };
  childContext.__proto__ = oldContext;
  return childContext;
}
