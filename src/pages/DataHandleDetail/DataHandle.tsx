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
import { Divider } from '@tenx-ui/materials';
import { Button, Card, Col, Form, Modal, Progress, Row, Steps, Table } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';

import I18N from '@/utils/kiwiI18N';

import styles from './datahandle.less';

const SPLIT_TYPE_NAME = '拆分处理';
const QA_SPLIT_NAME = 'QA拆分';
const DOCUMENT_CHUNK_NAME = '文本分段';
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
  const [QADuplicateConfig, setQADuplicateConfig] = useState(null);
  const [visibleMap, setVisibleMap] = useState({});
  const [showReloadBtn, setShowReloadBtn] = useState(false);

  const getColumns = useMemo(() => {
    return [
      {
        title: I18N.DataHandle.wenJianMing,
        dataIndex: 'file_name',
        key: 'file_name',
        render(text) {
          return text;
        },
      },
      {
        title: I18N.DataHandle.chuLiQian,
        dataIndex: 'pre',
        key: 'pre',
        render(text) {
          return text;
        },
      },
      {
        title: I18N.DataHandle.chuLiHou,
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
        title: I18N.DataHandle.wenJianMing,
        dataIndex: 'file_name',
        key: 'file_name',
        render(text) {
          return text;
        },
      },
      {
        title: I18N.DataHandle.chuLiHou,
        dataIndex: 'post',
        key: 'post',
        render(text, record) {
          return (
            <>
              {text.pre && text.post && <p>Q：{text.pre}</p>}
              {text.pre && text.post && <p>A：{text.post}</p>}
              {(!text.pre || !text.post) && <p>{text.post}</p>}
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
      // 收集一个分类下面所以的perview数据，用来做table的数据
      // 如果有‘QA拆分’和”文本分段“，只需要存储“QA拆分”，否则就正常存储
      if (item.zh_name === DOCUMENT_CHUNK_NAME) {
        // 没有qa拆分的情况下就存储自己的
        if (!data.some(i => i.zh_name === QA_SPLIT_NAME)) {
          _dataSource.push(...item.preview);
        }
      } else {
        _dataSource.push(...item.preview);
      }

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
            {type === SPLIT_TYPE_NAME && item.zh_name === QA_SPLIT_NAME && (
              <div style={{ display: 'flex' }}>
                <div style={{ textAlign: 'left', flex: 1 }}>
                  {I18N.DataHandle.moXing}{' '}
                  <span>
                    {item.llm_config?.provider === 'worker'
                      ? item.llm_config?.name || '-'
                      : (item.llm_config?.name || '-') + '/' + (item.llm_config?.model || '-')}
                  </span>
                </div>
                <div style={{ textAlign: 'right', flex: 1 }}>
                  <a onClick={openHighConfig}>{I18N.DataHandle.gaoJiPeiZhi}</a>
                </div>
              </div>
            )}
            {type === SPLIT_TYPE_NAME && item.zh_name === DOCUMENT_CHUNK_NAME && (
              <div style={{ display: 'flex' }}>
                <div style={{ textAlign: 'left', flex: 1 }}>
                  {I18N.DataHandle.fenDuanChangDu} <span>{item.chunk_size}</span>
                </div>
                <div style={{ textAlign: 'right', flex: 1 }}>
                  {I18N.DataHandle.fenDuanChongFuChangDu} <span>{item.chunk_overlap}</span>
                </div>
              </div>
            )}
          </Card>
        </Col>
      );
    });

    const dataSource = [];
    // 拆分处理的表格只展示文件名和拆分后，这里组合表格需要展示的的datasource
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
            {I18N.template(I18N.DataHandle.duiSOUR3, { val1: sourceItem.file_num, val2: type })}
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
                {I18N.template(I18N.DataHandle.duiSOUR2, { val1: sourceItem.file_num, val2: type })}
                {progressPrecent.length}/{fileProgress.length}
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
            {I18N.template(I18N.DataHandle.duiSOUR, { val1: sourceItem.file_num, val2: type })}
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
            {I18N.template(I18N.DataHandle.duiSOUR, { val1: sourceItem.file_num, val2: type })}
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
      text: I18N.DataHandle.weiChuLi,
    },
    doing: {
      color: '#1677ff',
      text: I18N.DataHandle.chuLiZhong,
    },
    success: {
      color: '#5cb85c',
      text: I18N.DataHandle.chuLiChengGong,
    },
    fail: {
      color: '#f85a5a',
      text: I18N.DataHandle.chuLiShiBai,
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
            {I18N.DataHandle.zhanKai}
            <UpOutlined />
          </a>
        ) : (
          <>
            <a
              className={styles.stepSubtitle}
              onClick={() => {
                setVisibleMap({ ...visibleMap, [item.description]: !visibleMap[item.description] });
              }}
            >
              {I18N.DataHandle.shouQi}
              <DownOutlined />
            </a>
          </>
        ),
        description: renderDesc(item.children, item.description, item),
        status: stepStatuesMap[item.status],
      };
    });
    setItems(item);
  }, [config, visibleMap]);

  useEffect(() => {
    // 如果是拆分处理把高级配置存起来
    for (const item of props.data.data_process_config_info) {
      if (item.type === 'qa_split') {
        setQADuplicateConfig(item.remove_duplicate_config);
        setHighConfig(item.llm_config);
      }
    }
  }, [props.data]);

  return (
    <div className={styles.datahandle}>
      {config?.find(item => item.status === 'doing') ? (
        <Button className={styles.reloadBtn} onClick={props.getData}>
          {I18N.DataHandle.shuaXin}
        </Button>
      ) : (
        ''
      )}
      <Steps direction="vertical" items={items} progressDot size="small" />
      <Modal
        footer={null}
        onCancel={closeHighConfig}
        open={highConfigVisible}
        title={I18N.DataHandle.QAChaiFenGaoJiPeiZhi}
        width={600}
      >
        <Divider
          __component_name="Divider"
          dashed={false}
          defaultOpen={false}
          mode="default"
          orientation="left"
          orientationMargin={0}
          style={{ fontSize: '12px', fontWeight: 700 }}
        >
          {I18N.DataHandle.moXingPeiZhi}
        </Divider>
        <Form labelAlign="right" {...layout}>
          <Form.Item label={I18N.DataHandle.wenDu}>{highConfig?.temperature || '-'}</Form.Item>
          <Form.Item label={I18N.DataHandle.zuiDaXiangYingChang}>
            {highConfig?.max_tokens || '-'}
          </Form.Item>
          <Form.Item label={I18N.DataHandle.qAChaiFenP}>
            <div style={{ width: '370px', marginTop: 10, padding: 12, border: '1px solid #ccc' }}>
              <pre style={{ whiteSpace: 'pre-wrap' }}>{highConfig?.prompt_template || '-'}</pre>
            </div>
          </Form.Item>
          {QADuplicateConfig ? (
            <>
              <Divider
                __component_name="Divider"
                dashed={false}
                defaultOpen={false}
                mode="default"
                orientation="left"
                orientationMargin={0}
                style={{ fontSize: '12px', fontWeight: 700 }}
              >
                {I18N.DataHandle.QAQuChongPeiZhi}
              </Divider>
              <Form.Item label={I18N.DataHandle.xiangLiangHuaMoXing}>
                {QADuplicateConfig?.embedding_name || '-'}
              </Form.Item>
              <Form.Item label={I18N.DataHandle.xiangSiDuYuZhi}>
                {QADuplicateConfig?.similarity || '-'}
              </Form.Item>
            </>
          ) : (
            ''
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default DataHandle;
