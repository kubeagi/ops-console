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
      render={dataProps => (
        <SelectCard$$Component {...dataProps} self={self} appHelper={appHelper} />
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
