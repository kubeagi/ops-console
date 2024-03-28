// 注意: 出码引擎注入的临时变量默认都以 "__$$" 开头，禁止在搭建的代码中直接访问。
// 例外：react 框架的导出名和各种组件名除外。
import { Button, Card, Col, FormilyForm, Page, Row, Space } from '@tenx-ui/materials';
import { getUnifiedHistory } from '@tenx-ui/utils/es/UnifiedLink/index.prod';
import { matchPath, useLocation } from '@umijs/max';
import LccComponentRu83f from 'CreateDataSource';
import qs from 'query-string';
import React from 'react';
import { DataProvider } from 'shared-components';

import __$$constants from '../../__constants';
import * as __$$i18n from '../../i18n';
import utils, { RefsManager } from '../../utils/__utils';
import './index.css';

class DataSourceCreate$$Page extends React.Component {
  get location() {
    return this.props.self?.location;
  }
  get match() {
    return this.props.self?.match;
  }
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

    this._refsManager = new RefsManager();

    __$$i18n._inject2(this);

    this.state = {};
  }

  $ = refName => {
    return this._refsManager.get(refName);
  };

  $$ = refName => {
    return this._refsManager.getAll(refName);
  };

  componentWillUnmount() {}

  handleCancel(v) {
    this.history?.go('-1');
  }

  async handleSave(v) {
    const isCreate = true;
    const form = this.state?.createThis?.form();
    // form.submit(async v => {
    this.setState({
      modalLoading: true,
    });
    let params = {
      input: {
        name: v?.name,
        displayName: v?.displayName,
        namespace: this.utils.getAuthData()?.project,
        description: v?.description,
        ossinput: {
          bucket: v?.bucket,
          object: v?.object,
        },
        endpointinput: {
          url: v?.serverAddress,
          insecure: v?.insecure === 'https' ? false : true,
          auth: {
            rootUser: v?.username,
            rootPassword: v?.password,
          },
        },
      },
    };
    if (this.state?.createThis?.getType() === 'onLine') {
      params = {
        input: {
          name: v?.name,
          displayName: v?.displayName,
          namespace: this.utils.getAuthData()?.project,
          description: v?.description,
          endpointinput: {
            url: v?.serverAddress,
          },
          webinput: {
            recommendIntervalTime: +v?.recommendIntervalTime || 1000,
          },
        },
      };
    }
    if (this.state?.createThis?.getType() === 'postgresql') {
      params = {
        input: {
          name: v?.name,
          displayName: v?.displayName,
          namespace: this.utils.getAuthData()?.project,
          description: v?.description,
          endpointinput: {
            url: v?.serverAddress,
            auth: {
              rootUser: v?.username,
              rootPassword: v?.password,
            },
          },
          pginput: {
            database: v?.database,
          },
        },
      };
    }
    const api = {
      create: {
        name: 'createDatasource',
        params,
        successMessage: 'i18n-ia3gjpq5',
        faildMessage: 'i18n-p20wuevb',
      },
      update: {
        name: 'updateDatasource',
        params,
        successMessage: 'i18n-tz6dwud2',
        faildMessage: 'i18n-sah3nlrl',
      },
    }[isCreate ? 'create' : 'update'];
    try {
      const res = await this.props.appHelper.utils.bff[api.name](api.params);
      this.utils.notification.success({
        message: this.i18n(api.successMessage),
      });
      this.handleCancel();
      this.setState({
        modalLoading: false,
      });
    } catch (error) {
      this.utils.notification.warnings({
        message: this.i18n(api.faildMessage),
        errors: error?.response?.errors,
      });
      this.setState({
        modalLoading: false,
      });
    }
    // })
  }

  setThis(createThis) {
    this.setState({
      createThis,
    });
  }

  componentDidMount() {}

  render() {
    const __$$context = this._context || this;
    const { state } = __$$context;
    return (
      <Page>
        <Row __component_name="Row" wrap={true}>
          <Col __component_name="Col" span={24}>
            <Space __component_name="Space" align="center" direction="horizontal">
              <Button.Back
                __component_name="Button.Back"
                name={this.i18n('i18n-wourf2xg') /* 返回 */}
                title={this.i18n('i18n-ueslu0a9') /* 新增数据源 */}
                type="primary"
              />
            </Space>
          </Col>
          <Col __component_name="Col" span={24}>
            <Card
              __component_name="Card"
              actions={[]}
              bordered={false}
              hoverable={false}
              loading={false}
              size="default"
              type="inner"
            >
              <FormilyForm
                __component_name="FormilyForm"
                componentProps={{
                  colon: false,
                  labelAlign: 'left',
                  labelCol: 4,
                  layout: 'horizontal',
                  wrapperCol: 20,
                }}
                formHelper={{ autoFocus: true }}
                ref={this._refsManager.linkRef('formily_w64au9q0w2l')}
              >
                <LccComponentRu83f
                  __component_name="LccComponentRu83f"
                  bff={__$$eval(() => this.props.appHelper.utils.bff)}
                  handelCancel={function () {
                    return Reflect.apply(this.handleCancel, this, [
                      ...Array.prototype.slice.call(arguments),
                    ]);
                  }.bind(this)}
                  handleSave={function () {
                    return Reflect.apply(this.handleSave, this, [
                      ...Array.prototype.slice.call(arguments),
                    ]);
                  }.bind(this)}
                  project={__$$eval(() => this.utils.getAuthData()?.project)}
                  setThis={function () {
                    return Reflect.apply(this.setThis, this, [
                      ...Array.prototype.slice.call(arguments),
                    ]);
                  }.bind(this)}
                />
              </FormilyForm>
            </Card>
          </Col>
        </Row>
      </Page>
    );
  }
}

const PageWrapper = (props = {}) => {
  const location = useLocation();
  const history = getUnifiedHistory();
  const match = matchPath({ path: '/data-source/create' }, location.pathname);
  history.match = match;
  history.query = qs.parse(location.search);
  const appHelper = {
    utils,
    constants: __$$constants,
    location,
    match,
    history,
  };
  const self = {
    appHelper,
    ...appHelper,
  };
  return (
    <DataProvider
      render={dataProps => (
        <DataSourceCreate$$Page {...props} {...dataProps} appHelper={appHelper} self={self} />
      )}
      sdkInitFunc={{
        enabled: undefined,
        params: undefined,
      }}
      sdkSwrFuncs={[]}
      self={self}
    />
  );
};
export default PageWrapper;

function __$$eval(expr) {
  try {
    return expr();
  } catch {}
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
