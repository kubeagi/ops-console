import {
  CopyOutlined,
  EllipsisOutlined,
  LikeOutlined,
  RobotOutlined,
  SendOutlined,
  StopOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Dropdown, Empty, Input, List, Select, Space, Tooltip, Typography } from 'antd';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import styles from './index.less';
import useChat from './use-chat';
const { Title } = Typography;

const Chat = () => {
  const [model, setModel] = useState('GPT-3.5');

  const data = [
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
  ];

  const items = [
    {
      key: 'delete',
      label: '删除',
    },
    {
      key: 'edit',
      label: '编辑',
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState('');
  const [history, setHistory] = useState([
    { role: 'human', context: '这是模拟数据' },
    {
      role: 'view',
      context:
        '呵这是模拟数据这是模拟数据这是模拟数据这是模拟数据这是模拟数据这是模拟数据这据这是模拟数据这是模拟数据这是模拟数据这是模据这是模拟数据这是模拟数据这是模拟数据这是模是模拟数据这是模拟数据这是模拟数据这是模拟数据这是模拟数据这是模拟数据这是模拟数据呵呵',
    },
  ]);
  const { chat, AbortChat } = useChat({});

  const scrollableRef = useRef<HTMLDivElement>(null);
  const handleQuestionInputChange = event => {
    setCurrentQuestion(event.target.value);
  };

  const handleChat = useCallback(
    (content: string) => {
      return new Promise<void>(resolve => {
        const tempHistory = [
          ...history,
          { role: 'human', context: content },
          { role: 'view', context: '' },
        ];
        const index = tempHistory.length - 1;
        setHistory([...tempHistory]);
        chat({
          context: content,
          onMessage: message => {
            tempHistory[index].context = message;
            setHistory([...tempHistory]);
          },
          onDone: () => {
            resolve();
          },
          onClose: () => {
            resolve();
          },
          onError: message => {
            tempHistory[index].context = message;
            setHistory([...tempHistory]);
            resolve();
          },
        });
      });
    },
    [history, chat]
  );

  const handleQuestionSubmit = () => {
    if (currentQuestion) {
      handleChat(currentQuestion);
      setCurrentQuestion('');
    }
  };

  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      handleQuestionSubmit();
    }
  };

  useEffect(() => {
    setTimeout(() => {
      scrollableRef.current?.scrollTo({
        top: scrollableRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }, 500);
  }, [history]);

  const handleModelChange = val => {
    setModel(val);
  };

  return (
    <div className={styles.container}>
      <Title level={3}>对话管理</Title>
      <div className={styles.body}>
        <div className={styles.left}>
          <List
            dataSource={data}
            renderItem={(item, index) => (
              <List.Item
                key={index}
                actions={[
                  <Dropdown menu={{ items }} key={index}>
                    <a onClick={e => e.preventDefault()}>
                      <EllipsisOutlined />
                    </a>
                  </Dropdown>,
                ]}
              >
                <Tooltip title={item}>
                  <span className={styles['overflow-ellipsis']}>{item}</span>
                </Tooltip>
              </List.Item>
            )}
          />
        </div>
        <div className={styles.content}>
          {/* <div className={styles.modelList}>
            <Select
              value={model}
              style={{ width: 120 }}
              onChange={handleModelChange}
              options={[
                { value: 'GPT-3.5', label: 'GPT-3.5' },
                { value: 'baichuan', label: '百川' },
              ]}
            />
          </div> */}
          <div className={styles.qa}>
            <div ref={scrollableRef} className={styles['chat-content']}>
              {history.map((item, index) => {
                if (item.role === 'human') {
                  return (
                    <div className={styles.userContainer} key={`${index}_user`}>
                      <span className={styles.userIcon}>
                        {' '}
                        <UserOutlined /> :
                      </span>
                      <div className={styles.userName} key={`${index}_strong`}>
                        {item.context}
                      </div>
                    </div>
                  );
                }
                return (
                  <div key={`${index}_answer`}>
                    <div className={styles.answerContainer}>
                      <div style={{ display: 'flex', paddingTop: 10 }}>
                        <span style={{ fontSize: 18, marginLeft: 24, paddingTop: 2 }}>
                          {' '}
                          <RobotOutlined /> :
                        </span>
                        <div style={{ padding: 3, flex: 1 }}>
                          <p style={{ lineHeight: '20px', marginBottom: '2px' }}>{item.context}</p>
                        </div>
                      </div>
                      <div className={styles.tools}>
                        <Space>
                          <span style={{ fontSize: 18, cursor: 'pointer' }}>
                            <LikeOutlined />
                          </span>
                          <Tooltip title="复制">
                            <span style={{ fontSize: 18, cursor: 'pointer' }}>
                              <CopyOutlined />
                            </span>
                          </Tooltip>
                        </Space>
                      </div>
                    </div>
                  </div>
                );
              })}
              {!history.length ? (
                <div style={{ marginTop: '30%', marginBottom: '10%' }}>
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                </div>
              ) : (
                ''
              )}
            </div>
            <div className={styles.questionFormStyle}>
              <Input
                type="text"
                placeholder="输入问题并按回车发送"
                value={currentQuestion}
                onChange={handleQuestionInputChange}
                onPressEnter={handleKeyPress}
                suffix={<SendOutlined />}
              />
              <div style={{ textAlign: 'center', marginTop: 8, marginLeft: 16 }}>
                <Tooltip title="停止生成">
                  <span
                    style={{ fontSize: 18, cursor: 'pointer' }}
                    onClick={() => {
                      AbortChat?.abort();
                    }}
                  >
                    <StopOutlined />
                  </span>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
