import { CloseOutlined, EditOutlined, FilePdfOutlined } from '@ant-design/icons';
import { Chart, Coordinate, Line, PointChart } from '@tenx-ui/charts';
import { Table } from '@tenx-ui/materials';
import { Col, Drawer, Form, Input, Modal, Progress, Row, Space, Tag } from 'antd';
import React, { useState } from 'react';

import styles from './report.less';

const { TextArea } = Input;
const data = [
  { item: '忠实度', value: 70 },
  { item: '知识库精度', value: 60 },
  { item: '答案正确性', value: 50 },
  { item: '答案相关度', value: 40 },
  { item: '答案语义相似度', value: 60 },
];

interface Iprops {
  data: Record<string, any>;
}
const Report: React.FC<Iprops> = props => {
  const [refDrawerVisible, setRefDrawerVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [record, setCurrentRecord] = useState({});
  const [editRecord, setEditRecord] = useState({});
  const detaildata = props.data;

  const openDrawer = record => {
    setRefDrawerVisible(true);
    setCurrentRecord(record);
  };

  const onOpenEdit = record => {
    setEditModalVisible(true);
    setEditRecord(record);
  };
  const Bold = children => <span style={{ fontWeight: 600 }}>{children}</span>;
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
  return (
    <div className={styles.report}>
      <div style={{ fontWeight: 700, fontSize: '14px', lineHeight: '32px' }}>评估结论</div>
      <div style={{ lineHeight: '24px' }}>
        通过此次评估，您的 RAG 方案得分{' '}
        <span style={{ color: '#F49F23', fontSize: 14, fontWeight: 600 }}>0.62</span> 主要体现在{' '}
        {Bold('答案相关度')}、{Bold('答案正确性')}、{Bold('知识库精度')} 这三项指标得分偏低。
      </div>
      <div style={{ fontWeight: 600, lineHeight: '24px' }}>
        建议您对特定场景应用的模型进行模型精调；调整知识库 embedding 模型。
      </div>
      <Row>
        <Col span={12} style={{ borderRight: '1px solid #E2E2E2' }}>
          <div style={{ fontWeight: 700, lineHeight: '32px' }}>总得分</div>
          <div style={{ textAlign: 'center', paddingBottom: 16, height: 200, paddingTop: 25 }}>
            <Progress
              gapDegree={0}
              percent={75}
              size={150}
              strokeColor={'#F49F23'}
              type="dashboard"
            />
          </div>
        </Col>
        <Col span={12}>
          <div style={{ fontWeight: 700, marginLeft: 24 }}>各项指标得分（avg）</div>
          <Chart
            autoFit
            data={data}
            height={200}
            scale={{
              value: {
                min: 0,
                max: 100,
              },
            }}
          >
            <Coordinate radius={0.8} type="polar" />
            <Line position="item*value" size={2} />
          </Chart>
        </Col>
      </Row>
      <Row>
        <Col span={22}>
          <div style={{ fontWeight: 700 }}>得分&耗时分布</div>
          <div style={{ textAlign: 'center', paddingBottom: 16, height: 200, paddingTop: 25 }}>
            <PointChart
              data={[
                { month: '2015-01-01 12:00', acc: 84, type: '类型1' },
                { month: '2015-02-01', acc: 14.9, type: '类型1' },
                { month: '2015-03-01', acc: 17, type: '类型1' },
                { month: '2015-04-01', acc: 20.2, type: '类型1' },
                { month: '2015-05-01', acc: 55.6, type: '类型1' },
                { month: '2015-06-01', acc: 56.7, type: '类型1' },
                { month: '2015-07-01', acc: 30.6, type: '类型1' },
                { month: '2015-08-01', acc: 63.2, type: '类型1' },
                { month: '2015-09-01', acc: 24.6, type: '类型1' },
                { month: '2015-10-01', acc: 14, type: '类型1' },
                { month: '2015-11-01', acc: 9.4, type: '类型1' },
                { month: '2015-12-01', acc: 7.3, type: '类型1' },
              ]}
              legend={{ position: 'bottom' }}
              seriesField="type"
              tootipFormat={text => `${text} 单位`}
              xField="month"
              xFieldTimeFormat="HH-MM HH:mm"
              yField="acc"
              yFieldFormat={text => `${text} unit`}
            />
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <div style={{ fontWeight: 700 }}>评估详情</div>
          <Table
            columns={[
              {
                title: '问题',
                dataIndex: 'question',
                key: 'question',
                ellipsis: { showTitle: true },
              },
              {
                title: '期望回答',
                dataIndex: '2',
                key: '2',
                ellipsis: { showTitle: true },
              },
              {
                title: '模型回答',
                dataIndex: '3',
                key: '3',
                ellipsis: { showTitle: true },
                render(text, record) {
                  return (
                    <a
                      onClick={() => {
                        openDrawer(record);
                      }}
                    >
                      {text}
                    </a>
                  );
                },
              },
              {
                title: '问答耗时(s)',
                dataIndex: '4',
                key: '4',
                ellipsis: { showTitle: true },
              },
              {
                title: '总得分',
                dataIndex: '5',
                key: '5',
                ellipsis: { showTitle: true },
              },
              {
                title: '忠实度',
                dataIndex: '6',
                key: '6',
                ellipsis: { showTitle: true },
              },
              {
                title: '答案语义相似度',
                dataIndex: '7',
                key: '7',
                ellipsis: { showTitle: true },
              },
              {
                title: '答案相关度',
                dataIndex: '8',
                key: '8',
                ellipsis: { showTitle: true },
              },
              {
                title: '答案正确性',
                dataIndex: '9',
                key: '9',
                ellipsis: { showTitle: true },
              },
              {
                title: '知识库相似度',
                dataIndex: '1',
                key: '1',
                ellipsis: { showTitle: true },
              },
            ]}
            dataSource={[
              {
                '3': '我是成龙',
              },
            ]}
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
