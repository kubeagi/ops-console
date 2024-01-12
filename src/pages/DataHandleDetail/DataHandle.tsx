import { DownOutlined, UpOutlined } from '@ant-design/icons';
import {
  Bukejian,
  Cizhongfuguolv,
  Fanzhuanjian,
  Jinyong,
  Konggechuli,
  QAchaifen,
  Quchubiaoqing,
  Quchuemail,
  Quchuip,
  Quchuluanma,
  Quchushuzi,
  Quchuwangyebiaoshifu,
  Simshash,
  Teshuzifu,
  Wenbenfenduan,
} from '@tenx-ui/icon';
import { Button, Card, Col, Form, Modal, Progress, Row, Steps, Table } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';

import styles from './datahandle.less';

const SPLIT_TYPE_NAME = '拆分处理';
const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
};

interface Iprops {
  data: Record<string, any>;
  getData: () => void;
}
const DataHandle: React.FC<Iprops> = props => {
  const config = props.data?.config;

  const [items, setItems] = useState([]);
  const [highConfigVisible, setHighConfigVisible] = useState(false);
  const [highConfig, setHighConfig] = useState({});
  const [visibleMap, setVisibleMap] = useState({});
  const [showReloadBtn, setShowReloadBtn] = useState(false);

  const getColumns = useMemo(() => {
    return [
      {
        title: '文件名',
        dataIndex: 'file_name',
        key: 'file_name',
        render(text) {
          return text;
        },
      },
      {
        title: '处理前',
        dataIndex: 'pre',
        key: 'pre',
        render(text) {
          return text;
        },
      },
      {
        title: '处理后',
        dataIndex: 'post',
        key: 'post',
        render(text) {
          return text;
        },
      },
    ];
  }, []);

  const getSplitColumns = useMemo(() => {
    return [
      {
        title: '文件名',
        dataIndex: 'file_name',
        key: 'file_name',
        render(text) {
          return text;
        },
      },
      {
        title: '处理后',
        dataIndex: 'post',
        key: 'post',
        render(text, record) {
          return (
            <>
              <p>Q：{text.pre}</p>
              <p>A：{text.post}</p>
            </>
          );
        },
      },
    ];
  }, []);

  const openHighConfig = () => {
    setHighConfigVisible(true);
  };

  const closeHighConfig = () => {
    setHighConfigVisible(false);
  };

  const renderDesc = (data, type, sourceItem) => {
    // 顺便计算处理了多少文件
    const _dataSource = [];
    const _data = data.map(item => {
      _dataSource.push(...item.preview);
      return (
        <Col
          key={item.zh_name}
          span={type === SPLIT_TYPE_NAME ? 10 : 6}
          style={{ marginBottom: 12 }}
        >
          <Card bodyStyle={{ padding: 12 }}>
            <div className={styles.card}>
              <div className={styles.cardIcon}>{configNameMapIcon[item.name]}</div>
              <div className={styles.cardTitle}>{item.zh_name}</div>
            </div>
            <p className={styles.desc}>{item.description}</p>
            {type === SPLIT_TYPE_NAME && (
              <div style={{ display: 'flex' }}>
                <div style={{ textAlign: 'left', flex: 1 }}>
                  模型:{' '}
                  <span>
                    {item.llm_config?.provider === 'worker'
                      ? item.llm_config?.name || '-'
                      : (item.llm_config?.name || '-') + '/' + (item.llm_config?.model || '-')}
                  </span>
                </div>
                <div style={{ textAlign: 'right', flex: 1 }}>
                  <a onClick={openHighConfig}>高级配置</a>
                </div>
              </div>
            )}
          </Card>
        </Col>
      );
    });

    // 如果是拆分处理把高级配置存起来
    if (type === SPLIT_TYPE_NAME) {
      const qa_split_data = data.find(item => item.name === 'qa_split');
      setHighConfig(qa_split_data.llm_config);
    }
    const dataSource = [];
    // 拆分处理的表格只展示文件名和拆分后
    if (type === SPLIT_TYPE_NAME) {
      for (const item of _dataSource) {
        const content = item?.content || [];
        const data = [];
        for (const ele of content) {
          const obj = { file_name: item.file_name, post: ele };
          data.push(obj);
        }
        dataSource.push(...data);
      }
    } else {
      for (const item of _dataSource) {
        const data = item?.content?.map(ele => ({ file_name: item.file_name, ...ele }));
        dataSource.push(...data);
      }
    }
    // 如果是未处理的状态
    if (!visibleMap[type] && sourceItem.status === 'not_start') {
      return (
        <div style={{ paddingTop: 8 }}>
          <Row gutter={16}>{_data}</Row>
          <div style={{ padding: '8px 0', color: '#000' }}>
            {' '}
            对 {sourceItem.file_num} 个文件进行了{type}。
          </div>
        </div>
      );
    }
    // 如果是拆分处理的配置，单独处理
    if (type === SPLIT_TYPE_NAME && !visibleMap[type]) {
      // 如果是QA-拆分 处理中 的任务
      if (sourceItem.status === 'doing') {
        const qa_split_data = data.find(item => item.name === 'qa_split');
        const fileProgress = qa_split_data.file_progress;
        // mock
        // const fileProgress = [{progress:"30",id:1,file_name:'新员工入职与试用期管理办法-2022.pdf'},{progress:"0",id:2,file_name:'财务报销管理细则-v1.00-202201.pdf'},{progress:"80",id:3,file_name:'员工考勤管理制度-2023.pdf'}];
        const progressPrecent = fileProgress.filter(item => Number.parseInt(item.progress) === 100);
        return (
          <>
            <div style={{ paddingTop: 8 }}>
              <Row gutter={16}>{_data}</Row>
              <div style={{ padding: '8px 0', color: '#000' }}>
                {' '}
                对 {sourceItem.file_num} 个文件进行了{type}，处理进度：{progressPrecent.length}/
                {fileProgress.length}
              </div>
              {fileProgress.map((item, index) => {
                return (
                  <div key={item.id} style={{ display: 'flex', width: '80%' }}>
                    <div
                      key={item.id}
                      style={{ marginRight: 12, width: '200px', color: 'rgba(0,0,0,0.8)' }}
                    >
                      {item.file_name}
                    </div>
                    <Progress key={item.id} percent={Number.parseInt(item.progress)} />
                  </div>
                );
              })}
            </div>
          </>
        );
      }
      return (
        <div style={{ paddingTop: 8 }}>
          <Row gutter={16}>{_data}</Row>
          <div style={{ padding: '8px 0', color: '#000' }}>
            {' '}
            对 {sourceItem.file_num} 个文件进行了{type}
            ，以下内容为处理效果抽样预览，并非全部内容
          </div>
          <Table columns={getSplitColumns} dataSource={dataSource} pagination={false} />
        </div>
      );
    }
    return (
      !visibleMap[type] && (
        <div style={{ paddingTop: 8 }}>
          <Row gutter={16}>{_data}</Row>
          <div style={{ padding: '8px 0', color: '#000' }}>
            {' '}
            对 {sourceItem.file_num} 个文件进行了{type}，以下内容为处理效果抽样预览，并非全部内容
          </div>
          <Table
            columns={type === SPLIT_TYPE_NAME ? getSplitColumns : getColumns}
            dataSource={dataSource}
            pagination={false}
          />
        </div>
      )
    );
  };

  const configNameMapIcon = {
    qa_split: <QAchaifen />,
    document_chunk: <Wenbenfenduan />,
    remove_invisible_characters: <Bukejian />,
    space_standardization: <Konggechuli />,
    remove_garbled_text: <Quchuluanma />,
    traditional_to_simplified: <Fanzhuanjian />,
    remove_html_tag: <Quchuwangyebiaoshifu />,
    remove_emojis: <Quchubiaoqing />,
    simhash_operator: <Simshash />,
    remove_email: <Quchuemail />,
    remove_ip_address: <Quchuip />,
    remove_number: <Quchushuzi />,
    character_duplication_rate: <Wenbenfenduan />,
    word_duplication_rate: <Cizhongfuguolv />,
    special_character_rate: <Teshuzifu />,
    pornography_violence_word_rate: <Jinyong />,
  };
  const stepStatuesMap = {
    not_start: 'wait',
    doing: 'info',
    success: 'finish',
    fail: 'error',
  };

  const statuesMapText = {
    not_start: {
      color: 'rgba(0,0,0,.25)',
      text: '未处理',
    },
    doing: {
      color: '#1677ff',
      text: '处理中',
    },
    success: {
      color: '#5cb85c',
      text: '处理成功',
    },
    fail: {
      color: '#f85a5a',
      text: '处理失败',
    },
  };
  useEffect(() => {
    const item = config?.map(item => {
      return {
        title: (
          <>
            <span style={{ fontWeight: 700 }}>{item.description}</span>{' '}
            <span style={{ marginLeft: 6, color: statuesMapText[item.status]?.color }}>
              {statuesMapText[item.status]?.text}
            </span>
          </>
        ),
        subTitle: visibleMap[item.description] ? (
          <a
            className={styles.stepSubtitle}
            onClick={() => {
              setVisibleMap({ ...visibleMap, [item.description]: !visibleMap[item.description] });
            }}
          >
            展开 <UpOutlined />
          </a>
        ) : (
          <>
            <a
              className={styles.stepSubtitle}
              onClick={() => {
                setVisibleMap({ ...visibleMap, [item.description]: !visibleMap[item.description] });
              }}
            >
              收起 <DownOutlined />
            </a>
          </>
        ),
        description: renderDesc(item.children, item.description, item),
        status: stepStatuesMap[item.status],
      };
    });
    setItems(item);
  }, [config, visibleMap]);

  return (
    <div className={styles.datahandle}>
      {config?.find(item => item.status === 'doing') ? (
        <Button className={styles.reloadBtn} onClick={props.getData}>
          刷新
        </Button>
      ) : (
        ''
      )}
      <Steps direction="vertical" items={items} progressDot size="small" />
      <Modal footer={null} onCancel={closeHighConfig} open={highConfigVisible} title="模型配置">
        <Form labelAlign="right" {...layout}>
          <Form.Item label="温度">{highConfig?.temperature || '-'}</Form.Item>
          <Form.Item label="最大响应长度">{highConfig?.max_tokens || '-'}</Form.Item>
          <Form.Item label="QA 拆分 Prompt">
            <div style={{ width: '370px', marginTop: 10, padding: 12, border: '1px solid #ccc' }}>
              <pre style={{ whiteSpace: 'pre-wrap' }}>{highConfig?.prompt_template || '-'}</pre>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DataHandle;
