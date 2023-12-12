import { DownOutlined, EyeInvisibleFilled, UpOutlined } from '@ant-design/icons';
import { Card, Col, Row, Steps, Table } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import styles from './datahandle.less';

const SPLIT_TYPE_NAME = '拆分处理';

interface Iprops {
  data: Record<string, any>;
}
const DataHandle: React.FC<Iprops> = props => {
  const config = props.data?.config;

  const [items, setItems] = useState([]);
  const [visibleMap, setVisibleMap] = useState({});

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
              <p>Q: {text.pre}</p>
              <p>A: {text.post}</p>
            </>
          );
        },
      },
    ];
  }, []);

  const renderDesc = (data, type) => {
    // 顺便计算处理了多少文件
    const _dataSource = [];
    const _data = data.map(item => {
      _dataSource.push(...item.preview);
      return (
        <Col span={6} key={item.zh_name}>
          <Card bodyStyle={{ padding: 12 }}>
            <div className={styles.card}>
              <div className={styles.cardIcon}>
                <EyeInvisibleFilled />
              </div>
              <div className={styles.cardTitle}>{item.zh_name}</div>
            </div>
            <p className={styles.desc}>{item.description}</p>
          </Card>
        </Col>
      );
    });

    const dataSource = [];
    // 拆分处理的表格只展示文件名和拆分后
    if (type === SPLIT_TYPE_NAME) {
      _dataSource.forEach(item => {
        const content = item?.content || [];
        const data = [];
        content.forEach(ele => {
          const obj = { file_name: item.file_name, post: ele };
          data.push(obj);
        });
        dataSource.push(...data);
      });
    } else {
      _dataSource.forEach(item => {
        const data = item?.content?.map(ele => ({ file_name: item.file_name, ...ele }));
        dataSource.push(...data);
      });
    }

    return (
      !visibleMap[type] && (
        <div style={{ paddingTop: 8 }}>
          <Row gutter={16}>{_data}</Row>
          <div style={{ padding: '8px 0' }}>
            {' '}
            对 {props?.data?.file_num} 个文件进行了{type}，以下内容为处理效果抽样预览，并非全部内容
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

  const statuesMap = {
    doing: 'process',
    succeed: 'finish',
    fail: 'error',
  };

  const statuesMapText = {
    doing: {
      color: '#1677ff',
      text: '处理中',
    },
    succeed: {
      color: '#5cb85c',
      text: '处理成功',
    },
    fail: {
      color: '#f85a5a',
      text: '处理失败',
    },
  };
  useEffect(() => {
    const item = config.map(item => {
      return {
        title: (
          <>
            <span style={{ fontWeight: 700 }}>{item.description}</span>{' '}
            <span style={{ marginLeft: 6, color: statuesMapText[item.status]?.color }}>
              {statuesMapText[item.status]?.text}
            </span>
          </>
        ),
        subTitle: !visibleMap[item.description] ? (
          <a
            className={styles.stepSubtitle}
            onClick={() => {
              setVisibleMap({ ...visibleMap, [item.description]: !visibleMap[item.description] });
            }}
          >
            收起 <DownOutlined />
          </a>
        ) : (
          <a
            className={styles.stepSubtitle}
            onClick={() => {
              setVisibleMap({ ...visibleMap, [item.description]: !visibleMap[item.description] });
            }}
          >
            展开 <UpOutlined />
          </a>
        ),
        description: renderDesc(item.children, item.description),
        status: statuesMap[item.status],
      };
    });
    setItems(item);
  }, [config, visibleMap]);
  return (
    <div className={styles.datahandle}>
      <Steps size="small" items={items} direction="vertical" />
    </div>
  );
};

export default DataHandle;
