import { QuestionCircleOutlined } from '@ant-design/icons';
import { KubeagiNextLead } from '@tenx-ui/icon';
import { Form, Select, Space, Switch, Tooltip } from 'antd';
import React, { useMemo } from 'react';

import I18N from '@/utils/kiwiI18N';

import utils from '../../../../utils/__utils';
import { useModalAppDetailContext } from '../../index';
import Container from '../Container';
import DocNullReturn from '../DocNullReturn';
import { SliderItem } from '../Modal';
import styles from '../index.less';
import { linkageReference } from '../linkage';

interface ConfigNextProps {}

const ConfigNext: React.FC<ConfigNextProps> = props => {
  const { configs, setConfigs, form } = useModalAppDetailContext();

  const { data: llms } = utils.bff.useListLlMs({
    input: {
      pageSize: 9999,
      page: 1,
      namespace: utils.getAuthData().project,
      labelSelector: 'arcadia.kubeagi.k8s.com.cn/reranking=true',
    },
  });

  const llmList = useMemo(() => {
    return (
      llms?.LLM?.listLLMs?.nodes?.filter(
        (item: any) => item.status === 'True' || item.status === 'Running'
      ) || []
    );
  }, [llms]);

  return (
    <Container isCollapse={true} title="查询配置" titleLevel={2}>
      <Container
        actions={[
          {
            key: 'switch',
            children: (
              <Form.Item name="enableRerank" style={{ marginBottom: 0 }}>
                <Switch
                  onChange={v => {
                    const newConfigs = {
                      ...configs,
                      Rerank: {
                        ...configs?.Rerank,
                        enableRerank: v,
                      },
                    };
                    linkageReference(form, newConfigs);
                    setConfigs(newConfigs);
                  }}
                />
              </Form.Item>
            ),
            data: {},
          },
        ]}
        borderBottom={form?.getFieldValue('enableRerank')}
        changeConfig
        configKey="Rerank"
        icon={<KubeagiNextLead />}
        isRowItem={!form?.getFieldValue('enableRerank')}
        renderChildren={form => {
          return (
            form.getFieldValue('enableRerank') && (
              <Form.Item
                label="Rerank 模型"
                name="rerankModel"
                rules={[
                  {
                    validator: (_, value, callback) => {
                      // if (!value) {
                      //   return callback('请选择 Rerank 模型');
                      // }
                      return callback();
                    },
                  },
                ]}
                style={{ marginBottom: 8 }}
              >
                <Select
                  onChange={v => {
                    setConfigs({
                      ...configs,
                      Rerank: {
                        ...configs?.Rerank,
                        rerankModel: v,
                      },
                    });
                  }}
                  placeholder="请选择 Rerank 模型"
                  style={{ width: '150px', float: 'right' }}
                >
                  {llmList?.map((item: any) => (
                    <Select.Option key={item.name} value={item.name}>
                      {utils.getFullName(item)}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            )
          );
        }}
        style={{ padding: 0 }}
        title={'Rerank'}
      ></Container>
      <Container
        actions={[
          {
            key: 'switch',
            children: (
              <Form.Item name="enableMultiQuery" style={{ marginBottom: 0 }}>
                <Switch
                  onChange={v => {
                    const newConfigs = {
                      ...configs,
                      MultiSearch: {
                        ...configs?.MultiSearch,
                        enableMultiQuery: v,
                      },
                    };
                    linkageReference(form, newConfigs);
                    setConfigs(newConfigs);
                  }}
                />
              </Form.Item>
            ),
            data: {},
          },
        ]}
        configKey="MultiSearch"
        icon={<KubeagiNextLead className={styles.greenIcon} />}
        isRowItem={true}
        // style={{ padding: 0 }}
        title={'多查询'}
      ></Container>
      <div style={form.getFieldValue('showSearchLimit') ? {} : { display: 'none' }}>
        <Container
          actions={[
            {
              key: 'switch',
              children: (
                <Form.Item name="showSearchLimit" style={{ marginBottom: 0 }}>
                  <Switch
                    onChange={v => {
                      setConfigs({
                        ...configs,
                        SearchLimit: {
                          ...configs?.SearchLimit,
                          showSearchLimit: v,
                        },
                      });
                    }}
                    style={{ display: 'none' }}
                  />
                </Form.Item>
              ),
              data: {},
            },
          ]}
          borderBottom={form?.getFieldValue('showSearchLimit')}
          configKey="SearchLimit"
          icon={<KubeagiNextLead className={styles.orangeIcon} />}
          isRowItem={!form?.getFieldValue('showSearchLimit')}
          renderChildren={form => {
            return (
              form.getFieldValue('showSearchLimit') && (
                <>
                  <SliderItem
                    Config={{
                      initialValue: 0.7,
                      min: 0,
                      max: 1,
                      precision: 2,
                    }}
                    label={
                      <Space size={3}>
                        相似度阀值
                        <Tooltip title={I18N.ModelApp.piPeiYongHuWen}>
                          <QuestionCircleOutlined className={styles.tooltip} />
                        </Tooltip>
                      </Space>
                    }
                    name="scoreThreshold"
                    sliderWidth="100px"
                    spaceStyle={{ float: 'right' }}
                  />
                  <SliderItem
                    Config={{
                      initialValue: 5,
                      min: 1,
                      max: 10,
                      precision: 0,
                    }}
                    label={
                      <Space size={3}>
                        引用数量
                        <Tooltip title={I18N.ModelApp.danCiSouSuoPi}>
                          <QuestionCircleOutlined className={styles.tooltip} />
                        </Tooltip>
                      </Space>
                    }
                    name="numDocuments"
                    sliderWidth="100px"
                    spaceStyle={{ float: 'right' }}
                  />
                </>
              )
            );
          }}
          style={{ padding: 0 }}
          title={'查询限制'}
        ></Container>
      </div>
      <DocNullReturn />
    </Container>
  );
};

export default ConfigNext;
