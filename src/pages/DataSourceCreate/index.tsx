// 注意: 出码引擎注入的临时变量默认都以 "__$$" 开头，禁止在搭建的代码中直接访问。
// 例外：react 框架的导出名和各种组件名除外。
import React from 'react';

import { Button, Card, Col, FormilyForm, Page, Row, Space } from '@tenx-ui/materials';

import LccComponentRu83f from 'CreateDataSource';

import { getUnifiedHistory } from '@tenx-ui/utils/es/UnifiedLink/index.prod';
import { matchPath, useLocation } from '@umijs/max';
import qs from 'query-string';
import { DataProvider } from 'shared-components';

import utils, { RefsManager } from '../../utils/__utils';

import * as __$$i18n from '../../i18n';

import __$$constants from '../../__constants';

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

  setThis(createThis) {
    this.setState({
      createThis,
    });
  }

  handleSave(v) {
    const isCreate = true;
    const form = this.state?.createThis?.form();
    form.submit(async v => {
      this.setState({
        modalLoading: true,
      });
      const params = {
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
            insecure: v?.insecure === 'https' ? true : false,
            auth: {
              username: v?.username,
              password: v?.password,
            },
          },
        },
      };
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
    });
  }

  handleCancel(v) {
    this.history?.go('-1');
  }

  componentDidMount() {}

  render() {
    const __$$context = this._context || this;
    const { state } = __$$context;
    return (
      <Page>
        <Row wrap={true} __component_name="Row">
          <Col span={24} __component_name="Col">
            <Space align="center" direction="horizontal" __component_name="Space">
              <Button.Back
                name={this.i18n('i18n-wourf2xg') /* 返回 */}
                type="primary"
                title={this.i18n('i18n-ueslu0a9') /* 新增数据源 */}
                __component_name="Button.Back"
              />
            </Space>
          </Col>
          <Col span={24} __component_name="Col">
            <Card
              size="default"
              type="inner"
              actions={[]}
              loading={false}
              bordered={false}
              hoverable={false}
              __component_name="Card"
            >
              <FormilyForm
                ref={this._refsManager.linkRef('formily_w64au9q0w2l')}
                formHelper={{ autoFocus: true }}
                componentProps={{
                  colon: false,
                  layout: 'horizontal',
                  labelCol: 4,
                  labelAlign: 'left',
                  wrapperCol: 20,
                }}
                __component_name="FormilyForm"
              >
                <LccComponentRu83f
                  bff={__$$eval(() => this.props.appHelper.utils.bff)}
                  project={__$$eval(() => this.utils.getAuthData()?.project)}
                  setThis={function () {
                    return this.setThis.apply(
                      this,
                      Array.prototype.slice.call(arguments).concat([])
                    );
                  }.bind(this)}
                  handleSave={function () {
                    return this.handleSave.apply(
                      this,
                      Array.prototype.slice.call(arguments).concat([])
                    );
                  }.bind(this)}
                  handelCancel={function () {
                    return this.handleCancel.apply(
                      this,
                      Array.prototype.slice.call(arguments).concat([])
                    );
                  }.bind(this)}
                  __component_name="LccComponentRu83f"
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
      self={self}
      sdkInitFunc={{
        enabled: undefined,
        func: 'undefined',
        params: undefined,
      }}
      sdkSwrFuncs={[]}
      render={dataProps => (
        <DataSourceCreate$$Page {...props} {...dataProps} self={self} appHelper={appHelper} />
      )}
    />
  );
};
export default PageWrapper;

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
