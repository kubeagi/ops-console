import { InfoCircleOutlined } from '@ant-design/icons';
import { default as Logs } from '@tenx-ui/logs';
import { Alert, Button, Col, Modal, Page, Row, Space, Typography } from '@tenx-ui/materials';
import { matchPath, useLocation } from '@umijs/max';
import type { TabsProps } from 'antd';
import { Avatar, Divider, List, Spin, Tabs, Tooltip, notification } from 'antd';
import React, { useEffect, useRef, useState } from 'react';

import detail from '@/assets/img/data-handle-detail.png';
import I18N from '@/utils/kiwiI18N';

import Status from '../../components/Status';
import utils from '../../utils/__utils';
import DataHandle from './DataHandle';
import styles from './index.less';
import Info from './info';

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
  const location = useLocation();
  const logRef = useRef();

  useEffect(() => {
    getData();
  }, []);

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

  const formatTime = (time = '') => {
    return time.split('.')[0];
  };

  const items: TabsProps['items'] = [
    {
      key: 'info',
      label: I18N.DataHandle.xiangXiXinXi,
      children: <Info data={detailData} />,
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
        <div className={styles.info}>
          <List
            dataSource={[detailData]}
            itemLayout="horizontal"
            renderItem={(item, index) => (
              <List.Item
                actions={[
                  <Button key={index} onClick={onShowLog} size="small">
                    {I18N.DataHandle.chaKanRiZhi}
                  </Button>,
                  <Button key={index} onClick={onDel} size="small">
                    {I18N.DataHandle.shanChu}
                  </Button>,
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
                        {I18N.DataHandle.gengXinShiJian}
                        {item.end_time ? formatTime(item.end_time) : formatTime(item.start_time)}
                      </span>
                    </>
                  }
                  title={<h4>{item.name || I18N.DataHandle.zheShiYiGeMing}</h4>}
                />
              </List.Item>
            )}
          />
        </div>
        <div className={styles.tabs}>
          <Tabs items={items} />
        </div>
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
      </Spin>
    </Page>
  );
};

export default DataHandleDetail;
