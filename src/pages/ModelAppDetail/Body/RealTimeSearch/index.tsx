import { KubeagiSearch } from '@tenx-ui/icon';
import { Form, Select, Switch } from 'antd';
import React from 'react';

import { useModalAppDetailContext } from '../../index';
import Container from '../Container';
import { linkageReference } from '../linkage';

export const SEARCH_TOOLS_MAP = [{ value: 'bing', text: 'bing' }];
export const SEARCH_TOOLS_VALUES = SEARCH_TOOLS_MAP.map(item => item.value);
interface RealTimeSearchProps {}

const RealTimeSearch: React.FC<RealTimeSearchProps> = props => {
  const { configs, setConfigs, form } = useModalAppDetailContext();
  const RealTimeSearchUsed = form.getFieldValue('RealTimeSearchUsed');
  return (
    <Container
      actions={[
        {
          key: 'switch',
          children: (
            <>
              <Form.Item name={['RealTimeSearchUsed']} style={{ marginBottom: 0 }}>
                <Switch
                  onChange={v => {
                    const newConfigs = {
                      ...configs,
                      RealTimeSearch: {
                        ...configs?.RealTimeSearch,
                        RealTimeSearchUsed: v,
                      },
                    };
                    setConfigs(newConfigs);
                    linkageReference(form, newConfigs);
                  }}
                />
              </Form.Item>
            </>
          ),
          data: {},
        },
      ]}
      changeConfig
      configKey="RealTimeSearch"
      icon={<KubeagiSearch />}
      renderChildren={(form, forceUpdate) => {
        return (
          RealTimeSearchUsed && (
            <Form.Item
              name={['RealTimeSearchName']}
              rules={[
                {
                  validator: (_, value, callback) => {
                    if (!value) {
                      return callback('请选择搜索地址');
                    }
                    return callback();
                  },
                },
              ]}
              style={{ marginBottom: 0 }}
            >
              <Select
                onChange={v => {
                  // forceUpdate();
                  setConfigs({
                    ...configs,
                    RealTimeSearch: {
                      ...configs?.RealTimeSearch,
                      RealTimeSearchName: v,
                    },
                  });
                }}
                placeholder="请选择搜索地址"
              >
                {SEARCH_TOOLS_MAP?.map(item => (
                  <Select.Option key={item.value} value={item.value}>
                    {item.text}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          )
        );
      }}
      style={RealTimeSearchUsed ? {} : { marginBottom: -10 }}
      title={'实时搜索'}
    ></Container>
  );
};

export default RealTimeSearch;
