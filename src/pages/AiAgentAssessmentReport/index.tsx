import { InfoCircleOutlined } from '@ant-design/icons';
import { default as Logs } from '@tenx-ui/logs';
import {
  Alert,
  Button,
  Col,
  Modal,
  Page,
  Row,
  Space,
  Status,
  Typography,
} from '@tenx-ui/materials';
import { getUnifiedHistory } from '@tenx-ui/utils/es/UnifiedLink/index.prod';
import { matchPath, useLocation } from '@umijs/max';
import type { TabsProps } from 'antd';
import { Avatar, Divider, List, Spin, Tabs, Tooltip, notification } from 'antd';
import qs from 'query-string';
import React, { useCallback, useEffect, useState } from 'react';

import detail from '@/assets/img/report.png';
import useGetCommonData from '@/components/hooks/useGetCommonData';
import request from '@/utils/request';

import utils from '../../utils/__utils';
import Config from './Config';
import Report from './Report';
import styles from './index.less';

const ModelEstimateReport = () => {
  const [detailData, setDetailData] = useState({});
  const [logData, setLogData] = useState('');
  const [loading, setLoading] = useState(false);
  const [deleteVisible, setDelevisible] = useState(false);
  const [logVisible, setLogvisible] = useState(false);
  const location = useLocation();
  const history = getUnifiedHistory();

  const match = matchPath({ path: '/ai-agent-assessment/report' }, location.pathname);
  history.match = match;
  history.query = qs.parse(location.search);

  const [reportData] = useGetCommonData<any[]>({
    url: `/rags/report?ragName=${history.query.name}&appName=${history.query.appName}`,
    options: {
      headers: {
        namespace: history.query.namespace,
      },
    },
    initValue: [],
  });

  const getData = () => {
    setLoading(true);
    const name = history.query.name;
    const namespace = history.query.namespace;
    const params = {
      name,
      namespace,
    };
    utils.bff
      .getRAG(params)
      .then(res => {
        const data = res.RAG.getRAG;
        setDetailData(data);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        notification.warning({
          message: '失败',
          description: error[0]?.message || '获取报告信息失败',
        });
      });
  };
  useEffect(() => {
    getData();
  }, []);

  const items: TabsProps['items'] = [
    {
      key: 'report',
      label: '评估报告',
      children: <Report data={reportData} history={history} />,
    },
    {
      key: 'config',
      label: '评估配置',
      children: <Config data={detailData} />,
    },
  ];

  /**
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
        setLogData(res?.dataProcess?.getLogInfo?.data || '暂无数据');
      })
      .catch(error => {
        console.warn(error);
      });
  };

   */

  /** 
  const onShowLog = () => {
    setLogvisible(true);
    // getLogInfo();
  };

  */

  // 下载文件
  const downloadFile = useCallback(url => {
    try {
      const a = document.createElement('a');
      a.href = url; // 设置链接地址
      a.download = 'result.csv'; // 设置文件名
      a.click(); // 模拟点击链接进行下载
      URL.revokeObjectURL(url); // 释放 URL
    } catch {
      // console.log(error)
    }
  }, []);

  const download = () => {
    request
      .get({
        url: `/bff/rags/files/downloadlink?bucketPath=evals/${history.query.appName}/${history.query.name}&fileName=result.csv`,
        options: {
          headers: {
            namespace: history.query.namespace,
          },
        },
      })
      .then(res => {
        downloadFile(res.url);
      });
  };

  const calcSpendTime = useCallback(record => {
    const times: number = (
      ((record.completeTimestamp ? new Date(record.completeTimestamp) : new Date()).getTime() -
        new Date(record.creationTimestamp).getTime()) /
      60_000
    ).toFixed(2);
    if (times > 60) {
      return `${(times / 60).toFixed(2)} 小时`;
    }
    return `${times} 分钟`;
  }, []);

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
            评估报告
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
                  <Button key={index} onClick={download} size="small">
                    下载报告
                  </Button>,
                  // v0.3 todo
                  // <Button key={index} onClick={onShowLog} size="small">
                  //   查看日志
                  // </Button>,
                ]}
              >
                <List.Item.Meta
                  avatar={<Avatar size={56} src={detail} style={{ marginRight: 4 }}></Avatar>}
                  description={
                    <>
                      <span>
                        <Status
                          __component_name="Status"
                          id={item.status}
                          key="node_oclr8k78nb1"
                          types={[
                            { children: '评估中', id: 'ing', type: 'info' },
                            { children: '评估完成', id: 'complete', type: 'success' },
                            { children: '任务停止', id: 'suspend', type: 'warning' },
                            { children: '评估失败', id: 'failed', type: 'error' },
                          ]}
                        />
                      </span>

                      {item.status === 'failed' ? (
                        <span style={{ marginLeft: 20 }}>
                          <Tooltip title={item.phaseMessage}>
                            <InfoCircleOutlined />
                          </Tooltip>
                        </span>
                      ) : (
                        ''
                      )}
                      <span style={{ marginLeft: 12 }}>
                        开始时间：
                        <Typography.Time
                          __component_name="Typography.Time"
                          format=""
                          relativeTime={false}
                          time={item.creationTimestamp}
                        />
                      </span>
                      <Divider
                        style={{
                          borderInlineStart: '1px solid rgba(5, 5, 5, 0.15)',
                          marginInline: 16,
                        }}
                        type="vertical"
                      />
                      <span>
                        完成时间：
                        {item.completeTimestamp ? (
                          <Typography.Time
                            __component_name="Typography.Time"
                            format=""
                            relativeTime={false}
                            time={item.completeTimestamp}
                          />
                        ) : (
                          '-'
                        )}
                      </span>
                      <Divider
                        style={{
                          borderInlineStart: '1px solid rgba(5, 5, 5, 0.15)',
                          marginInline: 16,
                        }}
                        type="vertical"
                      />
                      <span>
                        耗时：
                        {calcSpendTime(item)}
                      </span>
                      <Divider
                        style={{
                          borderInlineStart: '1px solid rgba(5, 5, 5, 0.15)',
                          marginInline: 16,
                        }}
                        type="vertical"
                      />
                      <span>
                        执行者：
                        {item.creator || '-'}
                      </span>
                    </>
                  }
                  title={<h4>{item.name || '这是一个名'}</h4>}
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
                message: '删除任务成功',
              });
              history.go(-1);
            } catch (error) {
              notification.warnings({
                message: '删除任务失败',
                errors: error?.response?.errors,
              });
            }
          }}
          open={deleteVisible}
          title={`删除`}
        >
          <Alert message="确认删除任务？" showIcon={true} type="warning" />
        </Modal>
        {logVisible && (
          <Modal
            __component_name="Modal"
            footer={null}
            onCancel={() => {
              setLogvisible(false);
            }}
            open={logVisible}
            title="日志"
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

export default ModelEstimateReport;
