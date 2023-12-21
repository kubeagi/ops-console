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

  render() {
    const __$$context = this._context || this;
    const { state } = __$$context;
    return (
      <Component>
        <Flex __component_name="Flex" gap={16} wrap="wrap">
          {__$$evalArray(() => this.getData()).map((item, index) =>
            (__$$context => (
              <Container
                __component_name="Container"
                active={__$$eval(() => __$$context.getIsActive(item))}
                activeStyle={{ borderColor: 'colorPrimary' }}
                defaultStyle={{
                  border: '1px solid',
                  borderColor: 'colorBorder',
                  borderRadius: 'borderRadius',
                  cursor: 'pointer',
                  display: 'inline-block',
                  height: '80px',
                  transform: 'all 0.3s ease',
                  width: '100px',
                }}
                hoverStyle={{ borderColor: 'colorPrimaryHover' }}
                onClick={function () {
                  return this.onItemClick.apply(
                    this,
                    Array.prototype.slice.call(arguments).concat([item])
                  );
                }.bind(__$$context)}
                styleSuffix="SelectCard"
              >
                <Flex
                  __component_name="Flex"
                  align="center"
                  gap="small"
                  justify="center"
                  style={{ paddingTop: '12px' }}
                  vertical={true}
                >
                  <Image
                    __component_name="Image"
                    fallback=""
                    height={32}
                    preview={false}
                    src={__$$eval(() => item?.icon || __$$context.props.defaultIcon)}
                    style={{ borderRadius: '32px' }}
                    width={32}
                  />
                  <Typography.Text
                    __component_name="Typography.Text"
                    disabled={false}
                    ellipsis={true}
                    strong={false}
                    style={{}}
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

const ComponentWrapper = React.forwardRef((props = {}, ref) => {
  const history = getUnifiedHistory();
  const appHelper = {
    utils,
    constants: __$$constants,
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
        params: undefined,
      }}
      sdkSwrFuncs={[]}
      render={dataProps => (
        <SelectCard$$Component
          ref={ref}
          {...props}
          {...dataProps}
          self={self}
          appHelper={appHelper}
        />
      )}
    />
  );
});
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
    // 重写 state getter，保证 state 的指向不变，这样才能从 context 中拿到最新的 state
    get state() {
      return oldContext.state;
    },
    // 重写 props getter，保证 props 的指向不变，这样才能从 context 中拿到最新的 props
    get props() {
      return oldContext.props;
    },
  };
  childContext.__proto__ = oldContext;
  return childContext;
}
