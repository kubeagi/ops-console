import { PlusCircleOutlined } from '@ant-design/icons';
import { KubeagiBing } from '@tenx-ui/icon';
import { Form } from 'antd';
import React from 'react';

import I18N from '@/utils/kiwiI18N';

import { useModalAppDetailContext } from '../../index';
import { Knowledge } from '../ConfigKnowledge';
import Container from '../Container';
import stylesCommon from '../index.less';
import { linkageReference } from '../linkage';

export const PLUGINS_MAP = [
  {
    id: 'bing',
    name: 'Bing 搜索',
    icon: <KubeagiBing />,
  },
];
export const PLUGINS_MAP_VALUES = PLUGINS_MAP.map(item => item.id);
interface PluginsProps {}

const Plugins: React.FC<PluginsProps> = props => {
  const { configs, setConfigs, form } = useModalAppDetailContext();
  return (
    <Container
      actions={[
        {
          key: 'add',
          icon: (
            <a className={stylesCommon.link}>
              <PlusCircleOutlined style={{ marginRight: 5 }} />
              {I18N.ModelApp.tianJia}
            </a>
          ),
          modal: {
            title: I18N.ModelApp.xuanZeZhiShiKu,
            width: 593,
            refresh: () => {},
            type: 'edit',
            validateNames: ['tools'],
            renderChildren: form => {
              return (
                <>
                  <Knowledge
                    canDelete={false}
                    canSelect={true}
                    checkedIds={form.getFieldValue('tools') || []}
                    hasEmpty={true}
                    items={PLUGINS_MAP}
                    multi={true}
                    setCheckedIds={v => {
                      form.setFieldsValue({
                        tools: v,
                      });
                    }}
                  />
                </>
              );
            },
            handleSave: (values: any, configs) => {
              linkageReference(form, configs);
            },
          },
          data: {},
        },
      ]}
      changeConfig
      configKey="Skill"
      isCollapse={true}
      title="插件"
    >
      <Form.Item name="tools" style={{ display: 'none' }}></Form.Item>
      <Knowledge
        canDelete={true}
        canSelect={false}
        checkedIds={configs?.Skill?.tools || []}
        items={PLUGINS_MAP}
        multi={true}
        setCheckedIds={v => {
          form.setFieldsValue({
            ...configs?.Skill,
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
          linkageReference(form, newConfigs);
        }}
      />
    </Container>
  );
};

export default Plugins;
