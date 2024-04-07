import { PlusCircleOutlined } from '@ant-design/icons';
import { KubeagiBing, KubeagiCalculator, KubeagiWeather, KubeagiWebCrawl } from '@tenx-ui/icon';
import { Typography } from '@tenx-ui/materials';
import { Button, Collapse, Flex, Form, Input, Row } from 'antd';
import React, { useState } from 'react';

import I18N from '@/utils/kiwiI18N';

import { useModalAppDetailContext } from '../../index';
import { Knowledge } from '../ConfigKnowledge';
import Container from '../Container';
import { useStylish } from '../commonStylish';
import stylesCommon from '../index.less';
import { linkageReference } from '../linkage';

const apiKeyComponent = ({ names, updateValue }) => (
  <Form.Item
    label="API Key"
    labelCol={{ span: 4 }}
    name={[...(names || []), 'apiKey']}
    required
    rules={[
      {
        validator: (_, value, callback) => {
          if (!value) {
            return callback('请输入API Key');
          }
          return callback();
        },
      },
    ]}
    style={{ marginBottom: 0 }}
    wrapperCol={{ span: 10 }}
  >
    <Input
      onChange={e => {
        updateValue({
          apiKey: e.target.value,
        });
      }}
      placeholder="请输入API Key"
    />
  </Form.Item>
);

export const PLUGINS_MAP = [
  {
    id: 'Bing Search API',
    name: 'Bing 搜索',
    icon: <KubeagiBing />,
    color: '#A16BF1',
    description: '从 Bing 搜索信息和网页',
    formComponent: apiKeyComponent,
    validatorFields: ['apiKey'],
  },
  {
    id: 'Weather Query API',
    name: '天气查询',
    icon: <KubeagiWeather />,
    color: '#FBA240',
    description:
      '此插件用于查询当前和未来的天气状况。若用户输入城市名称或地区名称，该插件将回复该地区的天气情况',
    formComponent: apiKeyComponent,
    validatorFields: ['apiKey'],
  },
  {
    id: 'Web Scraper',
    name: '网页抓取',
    icon: <KubeagiWebCrawl />,
    color: '#09C8AA',
    description: '若用户提出的问题包含网址链接，该插件将会抓取网页内容，并基于上下文进行相应处理',
  },
  {
    id: 'calculator',
    name: '计算器',
    icon: <KubeagiCalculator />,
    color: '#A26CF1',
    description: '此插件用于计算任何数字',
  },
];

export const PLUGINS_MAP_VALUES = PLUGINS_MAP.map(item => item.id);
interface PluginsProps {}

const PanelSelect = props => {
  const IconBackground = [
    'linear-gradient( 137deg, #AD7FF5 0%, #8337E8 100%)',
    'linear-gradient( 137deg, #FEAD4C 0%, #F07C18 100%)',
    'linear-gradient( 137deg, #0ACAAE 0%, #04BE97 100%)',
  ];
  const { tools, items, setTools, forceUpdate, form } = props;
  const [activeKey, setActiveKey] = useState([]);

  return (
    <div>
      {items.map((item, i) => {
        return (
          <Collapse
            activeKey={activeKey}
            bordered={false}
            className={stylesCommon.modalCollapse}
            collapsible="icon"
            defaultActiveKey={activeKey}
            expandIconPosition="end"
            items={[
              {
                key: item.id,
                label: (
                  <Flex>
                    <div
                      className={stylesCommon.modalCollapseIcon}
                      style={{ background: IconBackground[i % 3] }}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <Row>
                        <Typography.Title level={1} style={{ position: 'relative', top: -4 }}>
                          {item.name}
                        </Typography.Title>
                      </Row>
                      <Row>
                        <Typography.Text type="colorTextSecondary">
                          {item.description}
                        </Typography.Text>
                      </Row>
                    </div>
                  </Flex>
                ),
                children: (
                  <div>
                    <Flex justify="space-between">
                      <div style={{ flex: 1, marginRight: 20 }}>
                        {item.formComponent &&
                          item.formComponent({
                            names: ['tools', i, 'params'],
                            updateValue: values => {
                              setTools(
                                tools.map(tool => {
                                  if (tool.name !== item.id) {
                                    return tool;
                                  }
                                  return {
                                    ...tool,
                                    params: {
                                      ...tool.params,
                                      ...values,
                                    },
                                  };
                                })
                              );
                            },
                          })}
                      </div>
                      <Flex align="center">
                        {tools[i].used ? (
                          <Button
                            onClick={() => {
                              setTools(
                                tools.map(tool => ({
                                  ...tool,
                                  used: tool.name === item.id ? false : tool.used,
                                }))
                              );
                            }}
                          >
                            移除
                          </Button>
                        ) : (
                          <Button
                            onClick={() => {
                              const validatorFields = item.validatorFields || [];
                              form
                                .validateFields(
                                  validatorFields.map(key => ['tools', i, 'params', key]),
                                  { force: true }
                                )
                                .then(() => {
                                  setTools(
                                    tools.map(tool => ({
                                      ...tool,
                                      used: tool.name === item.id ? true : tool.used,
                                    }))
                                  );
                                });
                            }}
                            type="primary"
                          >
                            添加
                          </Button>
                        )}
                      </Flex>
                    </Flex>
                  </div>
                ),
              },
            ]}
            key={item.id}
            onChange={v => {
              setActiveKey(v);
            }}
            style={{ marginBottom: 12 }}
          />
        );
      })}
    </div>
  );
};
const Plugins: React.FC<PluginsProps> = props => {
  const { configs, setConfigs, form } = useModalAppDetailContext();
  const stylish = useStylish();
  return (
    <Container
      actions={[
        {
          key: 'add',
          icon: (
            <a className={stylish.link}>
              <PlusCircleOutlined style={{ marginRight: 5 }} />
              {I18N.ModelApp.tianJia}
            </a>
          ),
          modal: {
            title: '选择插件',
            width: 880,
            refresh: () => {},
            type: 'edit',
            validateNames: ['tools'],
            footer: false,
            renderChildren: (form, forceUpdate) => {
              return (
                <>
                  <PanelSelect
                    forceUpdate={forceUpdate}
                    form={form}
                    items={PLUGINS_MAP}
                    setTools={v => {
                      form.setFieldsValue({
                        tools: v,
                      });
                      const newConfigs = {
                        ...configs,
                        Skill: {
                          ...configs?.Skill,
                          tools: v,
                        },
                      };
                      setConfigs(newConfigs);
                      linkageReference(form, newConfigs, setConfigs);
                    }}
                    tools={form.getFieldValue('tools') || []}
                  />
                </>
              );
            },
            handleSave: (values: any, configs) => {
              linkageReference(form, configs, setConfigs);
            },
          },
          data: {},
        },
      ]}
      changeConfig
      configKey="Skill"
      isCollapse={true}
      title="插件"
      titleLevel={2}
    >
      <Form.Item name="tools" style={{ display: 'none' }}></Form.Item>
      <Knowledge
        canDelete={true}
        canSelect={false}
        checkedIds={configs?.Skill?.tools?.filter(item => item.used)?.map(item => item.name) || []}
        items={PLUGINS_MAP}
        multi={true}
        setCheckedIds={v => {
          const tools = configs?.Skill?.tools?.map(item => ({
            ...item,
            used: v.includes(item.name),
          }));
          form.setFieldsValue({
            ...configs?.Skill,
            tools,
          });
          const newConfigs = {
            ...configs,
            Skill: {
              ...configs?.Skill,
              tools,
            },
          };
          setConfigs(newConfigs);
          linkageReference(form, newConfigs, setConfigs);
        }}
      />
    </Container>
  );
};

export default Plugins;
