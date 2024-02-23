import { CloseOutlined, EditOutlined, FilePdfOutlined } from '@ant-design/icons';
import { Area, Axis, Chart, Coordinate, Legend, Line, Point } from '@tenx-ui/charts';
import { Col, Pagination, Row, Table } from '@tenx-ui/materials';
import { Drawer, Form, Input, Modal, Progress, Space, Tag } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';

import request from '@/utils/request';

import styles from './report.less';

const { TextArea } = Input;
const cateMap = {
  faithfulness: '忠实度',
  context_relevancy: '知识库相关度',
  answer_relevancy: '答案相关度',
  context_precision: '知识库精度',
  answer_similarity: '答案语义相似度',
  context_recall: '知识库相似度',
  answer_correctness: '答案正确性',
};

interface Iprops {
  data: Record<string, any>;
  history: Record<string, any>;
}
const Report: React.FC<Iprops> = props => {
  const [refDrawerVisible, setRefDrawerVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [record, setCurrentRecord] = useState({});
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [dataSource, setDataSource] = useState([]);
  const [total, setTotal] = useState(0);
  // const [editRecord, setEditRecord] = useState({});
  const [tableLoading, setTableLoading] = useState(false);
  const [columns, setColumns] = useState([]);
  const [tableSortParam, setTableSortParam] = useState('');
  const [tableSortOrder, setTableSortOrder] = useState('desc');

  // const openDrawer = record => {
  //   setRefDrawerVisible(true);
  //   setCurrentRecord(record);
  // };

  const onOpenEdit = () => {
    setEditModalVisible(true);
    // setEditRecord(record);
  };

  const renderRefData = () => {
    return (
      <div style={{ border: '1px solid #E2E2E2', marginBottom: 16 }}>
        <div style={{ borderBottom: '1px solid #E2E2E2', padding: '12px 16px 12px 16px' }}>
          <div>
            <Space>
              <span>
                <FilePdfOutlined /> <span>文件1</span>
              </span>
              <span>
                <Tag>相似度：0.812</Tag>
              </span>
              <span>
                <Tag>知识库：修仙小说</Tag>
              </span>
            </Space>
            <div style={{ float: 'right' }}>
              <span className={styles.hoverCls}>
                <EditOutlined
                  onClick={() => {
                    onOpenEdit(record);
                  }}
                />
              </span>
            </div>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            borderBottom: '1px dashed #E2E2E2',
            margin: '8px 16px 5px 16px',
          }}
        >
          <div style={{ width: 30, lineHeight: '20px' }}>Q：</div>
          <div style={{ flex: 1, lineHeight: '20px' }}>你是谁</div>
        </div>
        <div
          style={{
            display: 'flex',
            borderBottom: '1px dashed #E2E2E2',
            margin: '8px 16px 5px 16px',
          }}
        >
          <div style={{ width: 30, lineHeight: '20px' }}>A：</div>
          <div style={{ flex: 1, lineHeight: '20px' }}>
            在呈云生活了十年，已经成为了呈云派主宫门紫微宫的一代弟子，主要负责守卫和丹毒研制。你已经熟悉了紫微宫的运行的所有原则，并与很多人
            结下了纯真的友谊，这里的生活并不使你讨厌，然而多少个午夜梦回的惊悚不能让你发自肺腑地喜欢上这里，你在这两种情感中纠结，只好用温和
            而疏离的态度掩盖心底的溯洄。我是紫微宫唯一的首席大弟子，是你的师哥，在长期的相处下，我从开始对你感兴趣到不自觉想爱护你，我想真实
            地看到你的脆弱，你一直在回避我。而我们的师妹景玥暗恋着我，景玥因看不惯你对我爱答不理的样子而针对你。
          </div>
        </div>
      </div>
    );
  };

  const getColumns = useCallback((dataSource = []) => {
    const base = [
      {
        title: '问题',
        dataIndex: 'question',
        key: 'question',
        ellipsis: { showTitle: true },
      },
      {
        title: '期望回答',
        dataIndex: 'groundTruths',
        key: 'groundTruths',
        ellipsis: { showTitle: true },
        // render(text) {
        //   return (
        //     <>
        //       {text.map((item, index) => (
        //         <div key={index}>{item}</div>
        //       ))}
        //     </>
        //   );
        // },
      },
      {
        title: '模型回答',
        dataIndex: 'answer',
        key: 'answer',
        ellipsis: { showTitle: true },
        // todo
        // render(text, record) {
        //   return (
        //     <a
        //       onClick={() => {
        //         openDrawer(record);
        //       }}
        //     >
        //       {text}
        //     </a>
        //   );
        // },
      },
      {
        title: '问答耗时(s)',
        dataIndex: 'costTime',
        key: 'costTime',
        // todo
        // sorter: true,
      },
      {
        title: '总得分',
        dataIndex: 'totalScore',
        key: 'totalScore',
        // todo
        // sorter: true,
        render(text) {
          return text.toFixed(2);
        },
      },
    ];
    const other = [];
    if (dataSource.length > 0) {
      const items = dataSource[0].data;
      for (let key in items) {
        other.push({
          title: cateMap[key],
          dataIndex: key,
          key: key,
          sorter: true,
          ellipsis: { showTitle: true },
          render(text, record) {
            return record.data[key].toString().slice(0, 4);
          },
        });
      }
    }

    return [...base, ...other];
  }, []);

  const getTableList = () => {
    setTableLoading(true);
    request
      .get({
        url: `/rags/detail?ragName=${props.history.query.name}&appName=${props.history.query.appName}&page=${page}&size=${size}&sortBy=${tableSortParam}&order=${tableSortOrder}`,
        options: {
          headers: {
            namespace: props.history.query.namespace,
          },
        },
      })
      .then(res => {
        if (columns.length === 0) {
          const cols = getColumns(res.data);
          setColumns(cols);
        }
        const _dataSource = res.data.map(item => ({
          ...item,
          groundTruths: item.groundTruths.join('\n'),
        }));
        setDataSource(_dataSource);
        setTotal(res.total);
        setTableLoading(false);
      })
      .catch(error => {
        console.warn(error);
        setDataSource([]);
        setTotal(0);
        setTableLoading(false);
      });
  };

  useEffect(() => {
    getTableList();
  }, [page, size, tableSortOrder, tableSortParam]);

  const handlePaginationChange = (c, s = 10) => {
    setSize(s);
    setPage(c);
  };
  const showTotal = useCallback((total, range) => {
    // 用于格式化显示表格数据总量
    return `共 ${total} 条`;
  }, []);

  const handleTableChange = (pagination, filters, sorter) => {
    const { columnKey, order } = sorter;
    if (order === 'descend') {
      setTableSortOrder('desc');
    } else if (order === 'ascend') {
      setTableSortOrder('asc');
    } else {
      setTableSortOrder();
    }
    setTableSortParam(columnKey);
    setPage(1);
  };
  return (
    <div className={styles.report}>
      <div style={{ fontWeight: 700, fontSize: '14px', lineHeight: '32px' }}>评估结论</div>
      <div
        dangerouslySetInnerHTML={{ __html: props.data.summary }}
        style={{ lineHeight: '24px' }}
      ></div>
      <Row>
        <Col span={12} style={{ borderRight: '1px solid #E2E2E2' }}>
          <div style={{ fontWeight: 700, lineHeight: '32px' }}>总得分</div>
          <div style={{ textAlign: 'center', paddingBottom: 16, height: 200, paddingTop: 25 }}>
            <Progress
              format={percent => `${percent}`}
              gapDegree={0}
              percent={props.data?.totalScore?.score.toFixed(4) * 100}
              size={150}
              strokeColor={props.data?.totalScore?.color}
              type="dashboard"
            />
          </div>
        </Col>
        <Col span={12}>
          <div style={{ fontWeight: 700, marginLeft: 24 }}>各项指标得分（avg）</div>
          <Chart
            autoFit
            data={props?.data?.radarChart?.map(item => {
              const value = `${item.value}`.slice(0, 4);
              return { ...item, type: `${cateMap[item.type]} ${value}`, value: Number(value) };
            })}
            height={250}
            padding={[20]}
            scale={{
              value: {
                min: 0,
                max: 1,
                alias: '得分',
              },
            }}
          >
            <Coordinate radius={0.8} type="polar" />
            <Line position="type*value" size={2} />
            <Area position="type*value" />
            <Axis grid={{ line: { type: 'line' } }} name="value" />
            <Axis
              label={{
                autoRotate: true,
                style: (type, ...val) => {
                  const item = props?.data?.radarChart?.find(item => {
                    const _type = type.split('\n')[0];
                    return cateMap[item.type] === _type;
                  });
                  return { fill: item.color };
                },
                formatter(text, item, index) {
                  let arr = text.split(' ');
                  return `${arr[0]}\n${arr[1]}`;
                },
              }}
              line={false}
              name="type"
            />
          </Chart>
        </Col>
      </Row>
      <Row>
        <Col span={22}>
          <div style={{ fontWeight: 700 }}>得分&耗时分布</div>
          <div style={{ textAlign: 'center', paddingBottom: 16, height: 200, paddingTop: 25 }}>
            <Chart
              autoFit
              data={props?.data?.scatterChart?.map(item => ({ ...item, type: cateMap[item.type] }))}
              scale={{
                score: {
                  alias: '得分',
                },
              }}
            >
              <Legend visible={false} />
              <Point
                color={[
                  'color',
                  val => {
                    return val;
                  },
                ]}
                position="type*score"
                shape="circle"
                tooltip="score"
              />
            </Chart>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <div style={{ fontWeight: 700 }}>评估详情</div>
          <Table
            columns={columns}
            dataSource={dataSource}
            loading={tableLoading}
            onChange={handleTableChange}
            pagination={false}
          />
        </Col>
      </Row>
      <Row wrap={false}>
        <Col span={24}>
          <Pagination
            __component_name="Pagination"
            current={page}
            onChange={handlePaginationChange}
            onShowSizeChange={handlePaginationChange}
            pageSize={size}
            showTotal={showTotal}
            simple={false}
            style={{ marginTop: '12px', textAlign: 'right' }}
            total={total}
          />
        </Col>
      </Row>
      <Drawer
        closeIcon={false}
        extra={
          <CloseOutlined
            onClick={() => {
              setRefDrawerVisible(false);
            }}
          />
        }
        open={refDrawerVisible}
        title="引用数据"
        width={600}
      >
        <h3>共3个</h3>
        {renderRefData()}
        {renderRefData()}
        {renderRefData()}
      </Drawer>
      <Modal
        onCancel={() => {
          setEditModalVisible(false);
        }}
        open={editModalVisible}
        title="模型配置"
        width={800}
      >
        <Form labelAlign="right">
          <Row style={{ border: '1px solid #E2E2E2' }}>
            <Col span={12}>
              <div
                style={{
                  backgroundColor: '#FAFAFA',
                  height: 36,
                  lineHeight: '36px',
                  paddingLeft: 16,
                  borderRight: '1px solid #E2E2E2',
                }}
              >
                被搜索的内容（Q）
              </div>
              <Form.Item label="">
                <TextArea style={{ height: 400, resize: 'none' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <div
                style={{
                  backgroundColor: '#FAFAFA',
                  height: 36,
                  lineHeight: '36px',
                  paddingLeft: 16,
                }}
              >
                匹配内容（A）
              </div>
              <Form.Item label="">
                <TextArea style={{ height: 400, resize: 'none', border: null }} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default Report;
