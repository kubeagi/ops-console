// 注意: 出码引擎注入的临时变量默认都以 "__$$" 开头，禁止在搭建的代码中直接访问。
// 例外：react 框架的导出名和各种组件名除外。
import React from 'react';

import { Component, Flex, Container, Image, Typography } from '@tenx-ui/materials';

import { DataProvider } from 'shared-components';
import { getUnifiedHistory } from '@tenx-ui/utils/es/UnifiedLink/index.prod';

import utils from './utils/__utils';

import * as __$$i18n from './i18n';

import __$$constants from './__constants';

import './index.css';

class SelectCard$$Component extends React.Component {
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

    this.state = {
      data: [
        {
          icon: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
          value: '1',
          label: '1',
        },
        {
          value: '2',
          label: '2',
        },
        {
          value: '3',
          label: '3',
        },
        {
          value: '4',
          label: '4',
        },
        {
          value: '5',
          label: '5',
        },
        {
          value: '6',
          label: '6',
        },
      ],
      value: undefined,
    };
  }

  $ = () => null;

  $$ = () => [];

  componentWillUnmount() {}
  getDataSourceTypes(pageThis, labelKey = 'children') {
    const valueKey = 'value';
    return [
      {
        [valueKey]: 'localUpload',
        [labelKey]: pageThis.i18n('i18n-9odw2n6l'),
        forms: ['upload'],
        icon: 'data:image/png;base64,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',
      },
      {
        [valueKey]: 'fileStorage',
        [labelKey]: pageThis.i18n('i18n-tjlmmaei'),
        forms: ['serverAddress', 'path'],
      },
      {
        [valueKey]: 'objectStorage',
        [labelKey]: pageThis.i18n('i18n-8cjf8cxq'),
        forms: ['bucket', 'object'],
        icon: 'data:image/png;base64,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',
      },
      {
        [valueKey]: 'mysql',
        [labelKey]: pageThis.i18n('i18n-sanitrjl'),
        forms: ['serverAddress', 'username', 'password'],
      },
      {
        [valueKey]: 'mongodb',
        [labelKey]: pageThis.i18n('i18n-kktx1hle'),
        forms: ['serverAddress', 'username', 'password'],
      },
      {
        [valueKey]: 'api',
        [labelKey]: pageThis.i18n('i18n-4bisav57'),
        forms: ['apiAddress', 'token'],
        icon: 'data:image/png;base64,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',
      },
    ];
  }
  getData() {
    return this.props.dataSource;
    // return this.state.data
  }

  getIsActive(item) {
    return item?.value === (this.props.value || this.props.defaultValue || this.state.value);
  }

  onItemClick(e, item) {
    this.props.onItemClick && this.props.onItemClick(item);
    this.setState({
      value: item.value,
    });
  }

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidMount() {}

  render() {
    const __$$context = this._context || this;
    const { state } = __$$context;
    return (
      <Component>
        <Flex gap={16} wrap="wrap" __component_name="Flex">
          {__$$evalArray(() => this.getData()).map((item, index) =>
            (__$$context => (
              <Container
                active={__$$eval(() => __$$context.getIsActive(item))}
                onClick={function () {
                  return this.onItemClick.apply(
                    this,
                    Array.prototype.slice.call(arguments).concat([item])
                  );
                }.bind(__$$context)}
                hoverStyle={{ borderColor: 'colorPrimaryHover' }}
                activeStyle={{ borderColor: 'colorPrimary' }}
                defaultStyle={{
                  width: '100px',
                  border: '1px solid',
                  cursor: 'pointer',
                  height: '80px',
                  display: 'inline-block',
                  transform: 'all 0.3s ease',
                  borderColor: 'colorBorder',
                  borderRadius: 'borderRadius',
                }}
                __component_name="Container"
              >
                <Flex
                  gap="small"
                  align="center"
                  style={{ paddingTop: '12px' }}
                  justify="center"
                  vertical={true}
                  __component_name="Flex"
                >
                  <Image
                    src={__$$eval(() => item?.icon || __$$context.props.defaultIcon)}
                    style={{ borderRadius: '32px' }}
                    width={32}
                    height={32}
                    preview={false}
                    fallback=""
                    __component_name="Image"
                  />
                  <Typography.Text
                    style={{}}
                    strong={false}
                    disabled={false}
                    ellipsis={true}
                    __component_name="Typography.Text"
                  >
                    {__$$eval(() => item?.label || '-')}
                  </Typography.Text>
                </Flex>
              </Container>
            ))(__$$createChildContext(__$$context, { item, index }))
          )}
        </Flex>
      </Component>
    );
  }
}

const ComponentWrapper = (props = {}) => {
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
      render={dataProps => (
          <SelectCard$$Component {...dataProps} self={self} appHelper={appHelper} {...props}/>
        )}
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
