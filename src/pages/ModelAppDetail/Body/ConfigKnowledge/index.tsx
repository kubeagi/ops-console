import {
  DeleteOutlined,
  PlusCircleOutlined,
  QuestionCircleOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { KubeagiKnowledge } from '@tenx-ui/icon';
import { Empty, Flex, Form, Input, Space, Tooltip, Typography } from 'antd';
import React, { useEffect, useState } from 'react';

import I18N from '@/utils/kiwiI18N';

import utils from '../../../../utils/__utils';
import { useModalAppDetailContext } from '../../index';
import Container from '../Container';
import { SliderItem } from '../Modal';
import stylesCommon from '../index.less';
import { linkageReference } from '../linkage';
import styles from './index.less';

interface KnowledgeItem {
  id: string;
  name: string;
  icon: any;
}
interface KnowledgeProps {
  checkedIds: string[];
  items: KnowledgeItem[];
  setCheckedIds: (ids: string[]) => void;
  canDelete?: boolean;
  canSelect?: boolean;
  multi?: boolean;
  callback?: () => void;
  hasEmpty?: boolean;
}
export const Knowledge: React.FC<KnowledgeProps> = props => {
  const { items, canDelete, canSelect, multi, callback, hasEmpty = false } = props;
  const [checkedIds, setCheckedIds] = useState([]);
  useEffect(() => {
    setCheckedIds(props.checkedIds);
  }, [props.checkedIds]);
  if (hasEmpty && !items?.length) {
    return <Empty />;
  }

  const FlexItem = ({ children }) => (
    <Flex gap="small" wrap="wrap">
      {children}
    </Flex>
  );
  const RowItem = ({ children }) => <div className={styles.RowItem}>{children}</div>;
  const Wrapper = canDelete ? RowItem : FlexItem;
  return (
    <Wrapper>
      {(canSelect ? items : checkedIds?.map(id => items?.find(item => item?.id === id)))?.map(
        item => {
          return (
            <Flex
              align="center"
              className={`${styles.KnowledgeItem} ${canSelect && styles.KnowledgeItemCanSelect} ${
                checkedIds.includes(item?.id) && styles.KnowledgeItemSelected
              }`}
              justify="space-between"
              key={item?.id}
              onClick={() => {
                if (!canSelect) return;
                if (!multi) {
                  setCheckedIds([item?.id]);
                  props.setCheckedIds && props.setCheckedIds([item?.id]);
                  callback && callback();
                  return;
                }
                if (checkedIds.includes(item?.id)) {
                  setCheckedIds(checkedIds?.filter(id => id !== item?.id));
                  props.setCheckedIds &&
                    props.setCheckedIds(checkedIds?.filter(id => id !== item?.id));
                  callback && callback();
                  return;
                }
                setCheckedIds([...checkedIds, item?.id]);
                props.setCheckedIds && props.setCheckedIds([...checkedIds, item?.id]);
                callback && callback();
              }}
            >
              <div style={{ width: canDelete ? `calc(100% - 20px)` : '100%' }}>
                <span className={styles.icon}>
                  {typeof item?.icon === 'string' ? (
                    <img className={styles.img} src={item?.icon} width={canDelete ? 14 : 24} />
                  ) : (
                    <span
                      className={styles?.icon}
                      style={item?.color ? { color: item?.color } : {}}
                    >
                      {item?.icon}
                    </span>
                  )}
                </span>
                <Typography.Text
                  ellipsis={{ tooltip: item?.name }}
                  style={{
                    position: 'relative',
                    top: -2,
                    width: canDelete ? `calc(100% - 30px)` : `calc(100% - 40px)`,
                  }}
                >
                  {item?.name}
                </Typography.Text>
              </div>
              {canDelete && (
                <DeleteOutlined
                  className={styles.delete}
                  onClick={() => {
                    setCheckedIds && setCheckedIds(checkedIds?.filter(id => item?.id !== id));
                    props.setCheckedIds &&
                      props.setCheckedIds(checkedIds?.filter(id => item?.id !== id));
                  }}
                />
              )}
            </Flex>
          );
        }
      )}
    </Wrapper>
  );
};
interface ConfigKnowledgeProps {}

const ConfigKnowledge: React.FC<ConfigKnowledgeProps> = props => {
  const { configs, setConfigs, form } = useModalAppDetailContext();
  const knowledgesRes = utils.bff.useListKnowledgeBases({
    input: {
      page: 1,
      pageSize: 999_999,
      namespace: utils.getAuthData().project,
    },
  });
  const knowledges = knowledgesRes?.data?.KnowledgeBase?.listKnowledgeBases?.nodes?.map(item => ({
    name: utils.getFullName(item),
    id: item.name,
    icon: <KubeagiKnowledge />,
  }));
  return (
    <Container
      actions={[
        {
          key: 'string',
          icon: (
            <a className={stylesCommon.link}>
              <PlusCircleOutlined style={{ marginRight: 5 }} />
              {I18N.ModelApp.tianJia}
            </a>
          ),
          // children?: React.ReactElement
          data: {},
          modal: {
            title: I18N.ModelApp.xuanZeZhiShiKu,
            width: 593,
            refresh: () => {},
            type: 'edit',
            validateNames: ['knowledgebase'],
            renderChildren: form => {
              return (
                <>
                  <Knowledge
                    hasEmpty={true}
                    canDelete={false}
                    canSelect={true}
                    checkedIds={[form.getFieldValue('knowledgebase')]}
                    items={knowledges}
                    setCheckedIds={v => {
                      form.setFieldsValue({
                        knowledgebase: v?.[0],
                      });
                      // setConfigs({
                      //   ...configs,
                      //   ConfigKnowledge: {
                      //     ...configs?.ConfigKnowledge,
                      //     knowledgebase: v?.[0],
                      //   },
                      // });
                    }}
                  />
                </>
              );
            },
            handleSave: (values: any, configs) => {
              linkageReference(form, configs);
            },
          },
        },
        {
          key: 'string',
          icon: <SettingOutlined />,
          // children?: React.ReactElement
          data: {},
          modal: {
            title: I18N.ModelApp.zhiShiKuGaoJi,
            refresh: () => {},
            type: 'edit',
            data: {},
            validateNames: ['scoreThreshold', 'numDocuments', 'docNullReturn'],
            children: (
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
                      {I18N.ModelApp.zuiDiXiangSiDu}
                      <Tooltip title={I18N.ModelApp.piPeiYongHuWen}>
                        <QuestionCircleOutlined className={styles.tooltip} />
                      </Tooltip>
                    </Space>
                  }
                  name="scoreThreshold"
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
                      {I18N.ModelApp.yinYongShangXian}
                      <Tooltip title={I18N.ModelApp.danCiSouSuoPi}>
                        <QuestionCircleOutlined className={styles.tooltip} />
                      </Tooltip>
                    </Space>
                  }
                  name="numDocuments"
                />
                <Form.Item
                  initialValue={I18N.ModelApp.weiZhaoDaoNinXun}
                  label={I18N.ModelApp.kongSouSuoHuiFu}
                  name="docNullReturn"
                  rules={[
                    {
                      validator: (_, value, callback) => {
                        if (value && value.length > 200) {
                          return callback(I18N.ModelApp.zuiDuoKeShuRu);
                        }
                        return callback();
                      },
                    },
                  ]}
                  style={{ marginBottom: 0, marginTop: 10 }}
                >
                  <Input.TextArea placeholder={I18N.ModelApp.meiYouSouSuoDao} rows={3} />
                </Form.Item>
              </>
            ),
            handleSave: (values: any) => {},
          },
        },
      ]}
      isCollapse={true}
      title={I18N.Chat.zhiShiKu}
      titleLevel={2}
      configKey="ConfigKnowledge"
      // icon={<KubeagiKnowledge />}
      style={{
        marginBottom: 0,
      }}
    >
      <Form.Item name="knowledgebase" style={{ display: 'none' }}></Form.Item>
      <Knowledge
        canDelete={true}
        canSelect={false}
        checkedIds={
          configs?.ConfigKnowledge?.knowledgebase ? [configs?.ConfigKnowledge?.knowledgebase] : []
        }
        items={knowledges}
        multi={false}
        setCheckedIds={v => {
          form.setFieldsValue({
            ...configs?.ConfigKnowledge,
            knowledgebase: v?.[0],
          });
          const newConfigs = {
            ...configs,
            ConfigKnowledge: {
              ...configs?.ConfigKnowledge,
              knowledgebase: v?.[0],
            },
          };
          setConfigs(newConfigs);
          linkageReference(form, newConfigs);
        }}
      />
    </Container>
  );
};

export default ConfigKnowledge;
