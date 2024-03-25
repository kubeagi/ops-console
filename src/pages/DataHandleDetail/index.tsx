import { InfoCircleOutlined } from '@ant-design/icons';
import { default as Logs } from '@tenx-ui/logs';
import {
  Alert,
  Button,
  Card,
  Col,
  Descriptions,
  Dropdown,
  Modal,
  Page,
  Row,
  Space,
  Typography,
} from '@tenx-ui/materials';
import { getUnifiedHistory } from '@tenx-ui/utils/es/UnifiedLink/index.prod';
import { matchPath, useLocation } from '@umijs/max';
import type { TabsProps } from 'antd';
import { Avatar, Divider, List, Spin, Tabs, Tooltip, notification } from 'antd';
import React, { useEffect, useRef, useState } from 'react';

import detail from '@/assets/img/data-handle-detail.png';
import I18N from '@/utils/kiwiI18N';

import Status from '../../components/Status';
import utils from '../../utils/__utils';
import DataHandle from './DataHandle';
import FileStatus from './FileStatus';
import styles from './index.less';

const DataHandleDetail = props => {
  const statuesMap = {
    processing: {
      text: I18N.DataHandle.chuLiZhong,
      status: 'info',
    },
    process_complete: {
      text: I18N.DataHandle.chuLiWanCheng,
      status: 'success',
    },
    process_fail: {
      text: I18N.DataHandle.chuLiShiBai,
      status: 'error',
    },
  };
  const [detailData, setDetailData] = useState({});
  const [logData, setLogData] = useState('');
  const [loading, setLoading] = useState(false);
  const [deleteVisible, setDelevisible] = useState(false);
  const [logVisible, setLogvisible] = useState(false);
  const [baseInfoVisible, setBaseInfovisible] = useState(false);
  const location = useLocation();
  const logRef = useRef();
  const [baseInfoItems, setbaseInfoItems] = useState([]);
  const history = getUnifiedHistory();

  const Link = path => {
    history.push(path);
  };

  const calcSpendTime = record => {
    const times = (
      ((record.end_time ? new Date(record.end_time) : new Date()).getTime() -
        new Date(record.start_time).getTime()) /
      60_000
    ).toFixed(2);
    if (times > 60) {
      return `${(times / 60).toFixed(2)} 小时`;
    }
    return `${times} 分钟`;
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const _baseInfoDescItems = [
      {
        label: 'ID',
        children: detailData.id,
      },
      {
        label: I18N.DataHandle.wenJianLeiXing,
        children:
          detailData.file_type === 'text' ? I18N.DataHandle.puTongWenBen : I18N.DataHandle.qAWenBen,
      },
      {
        label: I18N.DataHandle.chuLiQianShuJu,
        children: (
          <>
            <a onClick={() => Link('/dataset/detail/' + detailData.pre_dataset_name)}>
              {detailData.pre_dataset_name}
            </a>
            ---
            <a
              onClick={() =>
                Link(
                  '/dataset/detail/' +
                    detailData.pre_dataset_name +
                    '/version/' +
                    detailData.pre_dataset_name +
                    '-' +
                    detailData.pre_dataset_version
                )
              }
            >
              {detailData.pre_dataset_version}
            </a>
          </>
        ),
      },
      {
        label: I18N.DataHandle.chuLiHouShuJu,
        children: (
          <>
            <a onClick={() => Link('/dataset/detail/' + detailData.post_dataset_name)}>
              {detailData.post_dataset_name}
            </a>
            ---
            <a
              onClick={() =>
                Link(
                  '/dataset/detail/' +
                    detailData.post_dataset_name +
                    '/version/' +
                    detailData.post_dataset_name +
                    '-' +
                    detailData.post_dataset_version
                )
              }
            >
              {detailData.post_dataset_version}
            </a>
          </>
        ),
      },
      {
        label: I18N.DataHandle.kaiShiShiJian,
        children: (
          <Typography.Time
            __component_name="Typography.Time"
            format="YYYY-MM-DD HH:mm:ss"
            relativeTime={false}
            time={detailData.start_time}
          />
        ),
      },
      {
        label: I18N.DataHandle.wanChengShiJian,
        children: (
          <Typography.Time
            __component_name="Typography.Time"
            format="YYYY-MM-DD HH:mm:ss"
            relativeTime={false}
            time={detailData.end_time || new Date()}
          />
        ),
      },
      {
        label: I18N.DataHandle.chuangJianRen,
        children: detailData.creator,
      },
    ];
    setbaseInfoItems(_baseInfoDescItems);
  }, [detailData]);

  const getData = () => {
    setLoading(true);
    const match = matchPath({ path: '/data-handle/detail/:id' }, location.pathname);
    const id = match.params.id;
    const params = {
      input: {
        id,
      },
    };
    utils.bff
      .dataProcessDetails(params)
      .then(res => {
        const { data, status, message } = res.dataProcess.dataProcessDetails;
        if (status === 200) {
          setDetailData(data);
        } else {
          notification.warning({
            message,
          });
        }
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        notification.warning({
          message: I18N.DataHandle.shiBai,
          description: error[0]?.message || I18N.DataHandle.huoQuXiangXiXin,
        });
      });
  };

  const items: TabsProps['items'] = [
    {
      key: 'file',
      label: I18N.DataHandle.wenJianChuLiZhuangTai,
      children: <FileStatus calcSpendTime={calcSpendTime} data={detailData} getData={getData} />,
    },
    {
      key: 'data-handle',
      label: I18N.DataHandle.shuJuChuLi,
      children: <DataHandle data={detailData} getData={getData} />,
    },
  ];

  const getLogInfo = () => {
    const match = matchPath({ path: '/data-handle/detail/:id' }, location.pathname);
    const id = match.params.id;
    const params = {
      input: {
        id,
      },
    };
    utils.bff
      .getLogInfo(params)
      .then(res => {
        setLogData(res?.dataProcess?.getLogInfo?.data || I18N.DataHandle.zanWuShuJu);
      })
      .catch(error => {
        console.warn(error);
      });
  };
  const onShowLog = () => {
    setLogvisible(true);
    getLogInfo();
  };
  const onDel = () => {
    setDelevisible(true);
  };

  return (
    <Page style={{ marginBottom: '0px', paddingBottom: '0px' }}>
      <Row __component_name="Row" style={{ marginBottom: '16px' }} wrap={true}>
        <Col __component_name="Col" span={24}>
          <Space __component_name="Space" align="center" direction="horizontal">
            <Button.Back __component_name="Button.Back" title="" type="primary" />
          </Space>
          <Typography.Title
            __component_name="Typography.Title"
            bold={true}
            bordered={false}
            ellipsis={true}
            level={2}
          >
            {I18N.DataHandle.shuJuChuLiXiang}
          </Typography.Title>
        </Col>
      </Row>

      <Spin spinning={loading}>
        <Card bodyStyle={{ padding: '0 16px' }}>
          <List
            dataSource={[detailData]}
            itemLayout="horizontal"
            renderItem={(item, index) => (
              <List.Item
                actions={[
                  <Dropdown.Button
                    destroyPopupOnHide={true}
                    key={index}
                    menu={{
                      items: [
                        {
                          key: 'baseinfo',
                          label: I18N.DataHandle.jiChuXinXi,
                        },
                        {
                          key: 'delete',
                          label: I18N.DataHandle.shanChu,
                        },
                      ],
                      onClick: ({ key }) => {
                        switch (key) {
                          case 'baseinfo': {
                            setBaseInfovisible(true);
                            break;
                          }
                          case 'delete': {
                            onDel();

                            break;
                          }
                          // No default
                        }
                      },
                    }}
                    onClick={onShowLog}
                  >
                    {I18N.DataHandle.chaKanRiZhi}
                  </Dropdown.Button>,
                ]}
              >
                <List.Item.Meta
                  avatar={<Avatar size={56} src={detail} style={{ marginRight: 4 }}></Avatar>}
                  description={
                    <>
                      <span>
                        <Status {...statuesMap[item.status]} />
                      </span>

                      {item.status === 'process_fail' ? (
                        <span style={{ marginLeft: 20 }}>
                          <Tooltip title={item.error_msg}>
                            <InfoCircleOutlined />
                          </Tooltip>
                        </span>
                      ) : (
                        ''
                      )}
                      <Divider
                        style={{
                          borderInlineStart: '1px solid rgba(5, 5, 5, 0.15)',
                          marginInline: 16,
                        }}
                        type="vertical"
                      />
                      <span>
                        {I18N.DataHandle.haoShi}
                        {calcSpendTime(item)}
                      </span>
                    </>
                  }
                  title={<h4>{item.name || I18N.DataHandle.zheShiYiGeMing}</h4>}
                />
              </List.Item>
            )}
          />
        </Card>
        <Card bodyStyle={{ paddingTop: 0 }} className={styles.tabs}>
          <Tabs items={items} />
        </Card>
        <Modal
          destroyOnClose
          onCancel={() => setDelevisible(false)}
          onOk={async () => {
            try {
              await utils.bff.deleteDataProcessTask({
                input: {
                  id: detailData?.id,
                },
              });
              setDelevisible(false);
              notification.success({
                message: I18N.DataHandle.shanChuRenWuCheng,
              });
              history.go(-1);
            } catch (error) {
              notification.warnings({
                message: I18N.DataHandle.shanChuRenWuShi,
                errors: error?.response?.errors,
              });
            }
          }}
          open={deleteVisible}
          title={I18N.DataHandle.shanChu}
        >
          <Alert message={I18N.DataHandle.queRenShanChuRen} showIcon={true} type="warning" />
        </Modal>
        {logVisible && (
          <Modal
            __component_name="Modal"
            footer={null}
            onCancel={() => {
              setLogvisible(false);
            }}
            open={logVisible}
            title={I18N.DataHandle.riZhi}
          >
            <div>
              <Logs
                getComponentRef={e => {
                  if (e) {
                    e.writelns(logData);
                    setTimeout(() => {
                      e.handleWindowResize();
                    });
                  }
                }}
              />
            </div>
          </Modal>
        )}
        {baseInfoVisible && (
          <Modal
            __component_name="Modal"
            footer={null}
            onCancel={() => {
              setBaseInfovisible(false);
            }}
            open={baseInfoVisible}
            title={I18N.DataHandle.jiChuXinXi}
            width="700px"
            wrapClassName={styles.descInfoModal}
          >
            <div>
              <Descriptions column={2} items={baseInfoItems} labelStyle={{ width: 100 }} />
            </div>
          </Modal>
        )}
      </Spin>
    </Page>
  );
};

export default DataHandleDetail;
