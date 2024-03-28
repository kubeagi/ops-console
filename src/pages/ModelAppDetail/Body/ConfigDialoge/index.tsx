import { Form, InputNumber, Switch } from 'antd';
import React from 'react';

import DialogeTimeout from '@/assets/img/modelAppConfig/dialogeTimeout.svg';
import DocDialoge from '@/assets/img/modelAppConfig/docDialoge.svg';

import { useModalAppDetailContext } from '../../index';
import ConfigConversationStarter from '../ConfigConversationStarter';
import ConfigNext from '../ConfigNext';
import Container from '../Container';
import ViewReference from '../ViewReference';
import ViewResInfo from '../ViewResInfo';
import styles from '../index.less';

const InputNumberWidth = 120;
const FormItemProps = {
  wrapperCol: {
    span: 24,
  },
  labelCol: {
    span: 10,
  },
  labelAlign: 'left',
} as any;
interface ConfigDialogeProps {}

const ConfigDialoge: React.FC<ConfigDialogeProps> = props => {
  const { configs, setConfigs, form } = useModalAppDetailContext();
  return (
    <Container isCollapse={true} style={{ marginBottom: 8 }} title={'对话配置'} titleLevel={2}>
      <>
        <ConfigConversationStarter />
        <Container
          actions={[
            {
              key: 'switch',
              children: (
                <Form.Item initialValue={60} name="chatTimeout" style={{ marginBottom: 0 }}>
                  <InputNumber
                    addonAfter={'s'}
                    min={1}
                    onBlur={e => {
                      if (!e.target.value) {
                        form.setFieldsValue({
                          chatTimeout: 60,
                        });
                        setConfigs({
                          ...configs,
                          DialogeTimeout: {
                            ...configs?.DialogeTimeout,
                            chatTimeout: 60,
                          },
                        });
                      }
                    }}
                    onChange={v => {
                      setConfigs({
                        ...configs,
                        DialogeTimeout: {
                          ...configs?.DialogeTimeout,
                          chatTimeout: v,
                        },
                      });
                    }}
                    placeholder="请输入"
                    precision={2}
                    style={{ width: InputNumberWidth }}
                  />
                </Form.Item>
              ),
              data: {},
            },
          ]}
          configKey="DialogeTimeout"
          headerStyle={{ paddingBottom: 8 }}
          icon={<img src={DialogeTimeout} width={14} />}
          isRowItem={true}
          style={{ paddingTop: 8 }}
          title={'对话超时'}
        ></Container>
        <Container
          actions={[
            {
              key: 'switch',
              children: (
                <Form.Item name="enableUploadFile" style={{ marginBottom: 0 }}>
                  <Switch
                    onChange={v => {
                      setConfigs({
                        ...configs,
                        DocDialoge: {
                          ...configs?.DocDialoge,
                          enableUploadFile: v,
                        },
                      });
                    }}
                  />
                </Form.Item>
              ),
              data: {},
            },
          ]}
          configKey="DocDialoge"
          icon={<img src={DocDialoge} width={14} />}
          isRowItem={!form?.getFieldValue('enableUploadFile')}
          renderChildren={form => {
            return (
              form.getFieldValue('enableUploadFile') && (
                <>
                  <Form.Item
                    style={{ marginBottom: 16 }}
                    {...FormItemProps}
                    initialValue={300}
                    label="分段长度"
                    name="chunkSize"
                    rules={[
                      {
                        validator: (_, value, callback) => {
                          return callback();
                        },
                      },
                    ]}
                  >
                    <InputNumber
                      addonAfter="字符"
                      min={1}
                      onBlur={e => {
                        if (!e.target.value) {
                          form.setFieldsValue({
                            chunkSize: 300,
                          });
                          setConfigs({
                            ...configs,
                            DocDialoge: {
                              ...configs?.DocDialoge,
                              chunkSize: 300,
                            },
                          });
                        }
                      }}
                      onChange={v => {
                        form.validateFields(['chunkOverlap'], { force: true });
                        setConfigs({
                          ...configs,
                          DocDialoge: {
                            ...configs?.DocDialoge,
                            chunkSize: v,
                          },
                        });
                      }}
                      placeholder="请输入"
                      step={1}
                      style={{ width: InputNumberWidth, float: 'right' }}
                    />
                  </Form.Item>
                  <Form.Item
                    {...FormItemProps}
                    className={styles.chunkOverlap}
                    initialValue={10}
                    label="分段重叠长度"
                    name="chunkOverlap"
                    rules={[
                      {
                        validator: (_, value, callback) => {
                          if (value >= form.getFieldValue('chunkSize')) {
                            return callback('分段重叠长度必须小于分段长度');
                          }
                          return callback();
                        },
                      },
                    ]}
                    style={{ marginBottom: 16 }}
                  >
                    <InputNumber
                      addonAfter="字符"
                      min={1}
                      onBlur={e => {
                        if (!e.target.value) {
                          form.setFieldsValue({
                            chunkOverlap: 10,
                          });
                          setConfigs({
                            ...configs,
                            DocDialoge: {
                              ...configs?.DocDialoge,
                              chunkOverlap: 10,
                            },
                          });
                        }
                      }}
                      onChange={v => {
                        setConfigs({
                          ...configs,
                          DocDialoge: {
                            ...configs?.DocDialoge,
                            chunkOverlap: v,
                          },
                        });
                      }}
                      placeholder="请输入"
                      step={1}
                      style={{ width: InputNumberWidth, float: 'right' }}
                    />
                  </Form.Item>
                  <Form.Item
                    style={{ marginBottom: 0 }}
                    {...FormItemProps}
                    initialValue={1}
                    label="批处理"
                    name="batchSize"
                    rules={[
                      {
                        validator: (_, value, callback) => {
                          return callback();
                        },
                      },
                    ]}
                  >
                    <InputNumber
                      min={1}
                      onBlur={e => {
                        if (!e.target.value) {
                          form.setFieldsValue({
                            batchSize: 1,
                          });
                          setConfigs({
                            ...configs,
                            DocDialoge: {
                              ...configs?.DocDialoge,
                              batchSize: 1,
                            },
                          });
                        }
                      }}
                      onChange={v => {
                        setConfigs({
                          ...configs,
                          DocDialoge: {
                            ...configs?.DocDialoge,
                            batchSize: v,
                          },
                        });
                      }}
                      placeholder="请输入"
                      step={1}
                      style={{ width: InputNumberWidth, float: 'right' }}
                    />
                  </Form.Item>
                </>
              )
            );
          }}
          style={{ padding: 0 }}
          title={'文档对话'}
        ></Container>
        <ViewResInfo />
        <ViewReference />
        <ConfigNext />
      </>
    </Container>
  );
};

export default ConfigDialoge;
