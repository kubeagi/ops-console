// 注意: 出码引擎注入的临时变量默认都以 "__$$" 开头，禁止在搭建的代码中直接访问。
// 例外：react 框架的导出名和各种组件名除外。
import React from 'react';

import {
  Page,
  Modal,
  FormilyForm,
  FormilyInput,
  Row,
  Col,
  Space,
  Button,
  Card,
  Image,
  Typography,
  Tabs,
  Descriptions,
} from '@tenx-ui/materials';

import LccComponentNy419 from 'dataset-version-list';

import { useLocation, matchPath } from '@umijs/max';
import { DataProvider } from 'shared-components';
import qs from 'query-string';
import { getUnifiedHistory } from '@tenx-ui/utils/es/UnifiedLink/index.prod';

import utils, { RefsManager } from '../../utils/__utils';

import * as __$$i18n from '../../i18n';

import __$$constants from '../../__constants';

import './index.css';

class DatasetDetail$$Page extends React.Component {
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

    this.state = { editVisible: false };
  }

  $ = refName => {
    return this._refsManager.get(refName);
  };

  $$ = refName => {
    return this._refsManager.getAll(refName);
  };

  componentWillUnmount() {
    console.log('will unmount');
  }

  data() {
    return {
      ...this.props.useGetDataset,
      data: this.props.useGetDataset.data?.Dataset?.getDataset || {},
    };
  }

  form(name) {
    return this.$(name || 'edit-dataset')?.formRef?.current?.form;
  }

  onEditBtnClick(event) {
    // 点击按钮时的回调
    this.setState({
      editVisible: true,
    });
  }

  onEditCancel() {
    // 点击遮罩层或右上角叉或取消按钮的回调
    this.setState({
      editVisible: false,
    });
  }

  async doEditDataset() {
    const payload = {
      input: {
        name: this.data().data?.name,
        namespace: this.data().data?.namespace,
        displayName: this.form().values.displayName,
      },
    };
    const res = await this.utils.bff.updateDataset(payload);
    console.log('rrr', res);
    if (res?.VersionedDataset?.createVersionedDataset?.name) {
      this.utils.notification.success({
        message: '编辑数据集成功',
      });
      this.onEditCancel();
    }
    this.setState({
      data: res?.Dataset?.listDatasets?.nodes,
      totalCount: res?.Dataset?.listDatasets?.totalCount,
    });
  }

  onEditOk() {
    // 点击确定回调
    this.form()
      .validate()
      .then(this.doEditDataset)
      .catch(e => {});
  }

  refresh(params) {
    // 刷新数据回调
    console.log('onClick', params, extParams);
  }

  componentDidMount() {
    console.log('did mount1', this, this.utils, this.data());
  }

  render() {
    const __$$context = this._context || this;
    const { state } = __$$context;
    return (
      <Page>
        {!!__$$eval(() => this.state.editVisible) && (
          <Modal
            mask={true}
            onOk={function () {
              return this.onEditOk.apply(this, Array.prototype.slice.call(arguments).concat([]));
            }.bind(this)}
            open={true}
            title="编辑数据集"
            centered={false}
            keyboard={true}
            onCancel={function () {
              return this.onEditCancel.apply(
                this,
                Array.prototype.slice.call(arguments).concat([])
              );
            }.bind(this)}
            forceRender={false}
            maskClosable={false}
            confirmLoading={false}
            destroyOnClose={true}
            __component_name="Modal"
          >
            <FormilyForm
              ref={this._refsManager.linkRef('edit-dataset')}
              formHelper={{ id: 'displayName', autoFocus: true }}
              componentProps={{
                colon: false,
                layout: 'horizontal',
                labelCol: 4,
                labelAlign: 'left',
                wrapperCol: 20,
              }}
              __component_name="FormilyForm"
            >
              <FormilyInput
                fieldProps={{
                  name: 'displayName',
                  title: '数据集名称',
                  required: true,
                  'x-validator': [],
                }}
                componentProps={{
                  'x-component-props': { allowClear: true, placeholder: '请输入数据集名称' },
                }}
                decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
                __component_name="FormilyInput"
              />
            </FormilyForm>
          </Modal>
        )}
        <Row wrap={true} __component_name="Row">
          <Col span={24} style={{ marginBottom: '16px' }} __component_name="Col">
            <Space align="center" direction="horizontal" __component_name="Space">
              <Button.Back type="ghost" title="数据集详情" __component_name="Button.Back" />
            </Space>
          </Col>
        </Row>
        <Card
          size="default"
          type="default"
          style={{ marginBottom: '16px' }}
          actions={[]}
          loading={false}
          bordered={false}
          hoverable={false}
          __component_name="Card"
        >
          <Row __component_name="Row">
            <Col flex="470px" __component_name="Col">
              <Row wrap={true} __component_name="Row">
                <Col span={4} __component_name="Col">
                  <Image
                    src={__$$eval(
                      () => this.constants.DATASET_DATA?.typeIcons?.[this.data().data?.contentType]
                    )}
                    width={64}
                    height={64}
                    preview={false}
                    fallback=""
                    __component_name="Image"
                  />
                </Col>
                <Col span={19} __component_name="Col">
                  <Row wrap={true} __component_name="Row">
                    <Col span={24} __component_name="Col">
                      <Typography.Title
                        bold={true}
                        level={1}
                        bordered={false}
                        ellipsis={true}
                        __component_name="Typography.Title"
                      >
                        {__$$eval(() => this.data().data?.displayName || this.data().data?.name)}
                      </Typography.Title>
                    </Col>
                    <Col flex="" span={24} __component_name="Col">
                      <Row wrap={false} __component_name="Row">
                        <Col flex="" __component_name="Col">
                          <Typography.Text
                            style={{ fontSize: '' }}
                            strong={false}
                            disabled={false}
                            ellipsis={true}
                            __component_name="Typography.Text"
                          >
                            更新时间：
                          </Typography.Text>
                        </Col>
                        <Col flex="auto" span={24} __component_name="Col">
                          <Typography.Time
                            time={__$$eval(() => this.data().data?.creationTimestamp)}
                            format=""
                            relativeTime={true}
                            __component_name="Typography.Time"
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col
              flex="auto"
              style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}
              __component_name="Col"
            >
              <Space align="center" direction="horizontal" __component_name="Space">
                <Button
                  block={false}
                  ghost={false}
                  shape="default"
                  danger={false}
                  onClick={function () {
                    return this.onEditBtnClick.apply(
                      this,
                      Array.prototype.slice.call(arguments).concat([])
                    );
                  }.bind(this)}
                  disabled={false}
                  __component_name="Button"
                >
                  {this.i18n('i18n-str3pnrc') /* 编辑 */}
                </Button>
                <Button
                  block={false}
                  ghost={false}
                  shape="default"
                  danger={false}
                  disabled={false}
                  __component_name="Button"
                >
                  {this.i18n('i18n-z0idrepg') /* - */}
                </Button>
              </Space>
            </Col>
          </Row>
        </Card>
        <Card
          size="default"
          type="default"
          actions={[]}
          loading={false}
          bordered={false}
          hoverable={false}
          __component_name="Card"
        >
          <Tabs
            size="default"
            type="line"
            items={[
              {
                key: 'tab-item-1',
                label: this.i18n('i18n-1gikmooh') /* 详细信息 */,
                children: (
                  <Descriptions
                    id=""
                    size="default"
                    colon={false}
                    items={[
                      {
                        key: '2y97byqciee',
                        span: 24,
                        label: 'ID',
                        children: __$$eval(
                          () => this.data()?.data?.id || this.data()?.data?.ID || '-'
                        ),
                        _unsafe_MixedSetter_children_select: 'VariableSetter',
                      },
                      { key: 'xvcp3obfu', span: 24, children: '文本', label: '数据类型' },
                      { key: 'er0ptk5lill', span: 24, label: '应用场景', children: '科技' },
                      {
                        key: 'ww04wf6evps',
                        span: 24,
                        label: this.i18n('i18n-qjodl1nn') /* 创建时间 */,
                        _unsafe_MixedSetter_children_select: 'SlotSetter',
                        children: (
                          <Typography.Time
                            __component_name="Typography.Time"
                            time={__$$eval(() => this.data().data?.creationTimestamp)}
                            format=""
                            relativeTime={true}
                          />
                        ),
                      },
                      {
                        key: 'ajc9nhn140i',
                        span: 24,
                        label: this.i18n('i18n-sg7nu8tx') /* 创建者 */,
                        children: __$$eval(() => this.data().data?.creator || '-'),
                        _unsafe_MixedSetter_children_select: 'VariableSetter',
                      },
                      {
                        key: '3p5bkjlrh9u',
                        span: 24,
                        label: this.i18n('i18n-txt5kh4m') /* 描述 */,
                        children: __$$eval(() => this.data().data?.description || '-'),
                        _unsafe_MixedSetter_children_select: 'VariableSetter',
                      },
                    ]}
                    title=""
                    column={3}
                    layout="horizontal"
                    bordered={false}
                    labelStyle={{ width: 100 }}
                    borderedBottom={false}
                    __component_name="Descriptions"
                    borderedBottomDashed={false}
                  />
                ),
              },
              {
                key: 'tab-item-2',
                label: '全部版本',
                children: (
                  <LccComponentNy419
                    isProd="false"
                    dataset={__$$eval(() => this.data()?.data)}
                    refresh={function () {
                      return this.refresh.apply(
                        this,
                        Array.prototype.slice.call(arguments).concat([])
                      );
                    }.bind(this)}
                    dataSource={__$$eval(() => [1, 2, 3])}
                    datasource={__$$eval(() => this.data().data?.versions?.nodes || [])}
                    __component_name="LccComponentNy419"
                  />
                ),
              },
            ]}
            style={{ marginTop: '-20px' }}
            activeKey=""
            tabPosition="top"
            __component_name="Tabs"
            destroyInactiveTabPane="true"
          />
        </Card>
      </Page>
    );
  }
}

const PageWrapper = (props = {}) => {
  const location = useLocation();
  const history = getUnifiedHistory();
  const match = matchPath({ path: '/dataset/detail/:id' }, location.pathname);
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
      self={self}
      sdkInitFunc={{
        enabled: undefined,
        params: undefined,
      }}
      sdkSwrFuncs={[
        {
          func: 'useGetDataset',
          params: function applyThis() {
            return {
              name: this.match?.params?.id,
              namespace: this.utils.getAuthData?.()?.project,
              versionsInput: {
                namespace: this.utils.getAuthData?.()?.project,
                pageSize: 1000,
                page: 1,
              },
              filesInput: {
                keyword: '',
                pageSize: 1,
                page: 1,
              },
            };
          }.apply(self),
          enableLocationSearch: undefined,
        },
      ]}
      render={dataProps => (
        <DatasetDetail$$Page {...props} {...dataProps} self={self} appHelper={appHelper} />
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
