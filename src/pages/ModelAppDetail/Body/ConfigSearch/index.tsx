import { QuestionCircleOutlined } from '@ant-design/icons';
import { Form, Select, Space, Switch, Tooltip } from 'antd';
import React, { useMemo } from 'react';

import MultiSearchIcon from '@/assets/img/modelAppConfig/multiSearch.svg';
import RerankIcon from '@/assets/img/modelAppConfig/rerank.svg';
import SearchLimit from '@/assets/img/modelAppConfig/searchLimit.svg';
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
  const { configs, setConfigs, form, disabled } = useModalAppDetailContext();

  const { data: llms } =
    utils.bff?.useListModelServices({
      input: {
        pageSize: 9999,
        page: 1,
        namespace: utils.getAuthData().project,
      },
    }) || {};
  const llmList = useMemo(() => {
    return (
      llms?.ModelService?.listModelServices?.nodes?.filter(
        (item: any) =>
          (item.status === 'True' || item.status === 'Running') &&
          item.types?.split(',')?.some(type => type === 'reranking')
      ) || []
    );
  }, [llms]);

  const enableRerank = configs?.Rerank?.enableRerank;

  return (
    <Container isCollapse={true} title="查询配置" titleLevel={2}>
      <Container
        actions={[
          {
            key: 'switch',
            children: (
              <Form.Item name="enableRerank" style={{ marginBottom: 0 }}>
                <Switch
                  disabled={disabled}
                  onChange={v => {
                    const newConfigs = {
                      ...configs,
                      Rerank: {
                        ...configs?.Rerank,
                        enableRerank: v,
                      },
                    };
                    linkageReference(form, newConfigs, setConfigs);
                    setConfigs(newConfigs);
                  }}
                />
              </Form.Item>
            ),
            data: {},
          },
        ]}
        borderBottom={enableRerank}
        changeConfig
        configKey="Rerank"
        icon={<img src={RerankIcon} width={16} />}
        isRowItem={!enableRerank}
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
                  allowClear
                  disabled={disabled}
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
                  disabled={disabled}
                  onChange={v => {
                    const newConfigs = {
                      ...configs,
                      MultiSearch: {
                        ...configs?.MultiSearch,
                        enableMultiQuery: v,
                      },
                    };
                    linkageReference(form, newConfigs, setConfigs);
                    setConfigs(newConfigs);
                  }}
                />
              </Form.Item>
            ),
            data: {},
          },
        ]}
        configKey="MultiSearch"
        icon={<img src={MultiSearchIcon} width={14} />}
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
                    disabled={disabled}
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
          icon={<img src={SearchLimit} width={14} />}
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
                    disabled={disabled}
                    label={
                      <Space size={3}>
                        相似度阀值
                        <Tooltip title={I18N.ModelApp.piPeiYongHuWen}>
                          <QuestionCircleOutlined className={styles.tooltip} />
                        </Tooltip>
                      </Space>
                    }
                    name="scoreThreshold"
                    onChange={v => {
                      setConfigs({
                        ...configs,
                        SearchLimit: {
                          ...configs?.SearchLimit,
                          scoreThreshold: v,
                        },
                      });
                    }}
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
                    disabled={disabled}
                    label={
                      <Space size={3}>
                        引用数量
                        <Tooltip title={I18N.ModelApp.danCiSouSuoPi}>
                          <QuestionCircleOutlined className={styles.tooltip} />
                        </Tooltip>
                      </Space>
                    }
                    name="numDocuments"
                    onChange={v => {
                      setConfigs({
                        ...configs,
                        SearchLimit: {
                          ...configs?.SearchLimit,
                          numDocuments: v,
                        },
                      });
                    }}
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
