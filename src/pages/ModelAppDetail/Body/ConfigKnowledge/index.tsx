import Icon from '@/assets/img/model-app-bx.png';
import { DeleteOutlined, PlusCircleOutlined, SettingOutlined } from '@ant-design/icons';
import { KubeagiKnowledge } from '@tenx-ui/icon';
import { Flex, Form, Input, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import Container from '../Container';
import { SliderItem } from '../Modal';
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
}
const Knowledge: React.FC<KnowledgeProps> = props => {
  const { items, canDelete, canSelect } = props;
  const [checkedIds, setCheckedIds] = useState([]);
  useEffect(() => {
    setCheckedIds(props.checkedIds);
  }, [props.checkedIds]);
  return (
    <Flex wrap="wrap" gap="small">
      {(canSelect ? items : checkedIds?.map(id => items?.find(item => item.id === id)))?.map(
        item => {
          return (
            <Flex
              justify="space-between"
              key={item.id}
              className={`${styles.KnowledgeItem} ${canSelect && styles.KnowledgeItemCanSelect} ${
                checkedIds.includes(item.id) && styles.KnowledgeItemSelected
              }`}
              align="center"
              onClick={() => {
                if (!canSelect) return;
                if (checkedIds.includes(item.id)) {
                  setCheckedIds(checkedIds?.filter(id => id !== item.id));
                  props.setCheckedIds && setCheckedIds(checkedIds?.filter(id => id !== item.id));
                  return;
                }
                setCheckedIds([...checkedIds, item.id]);
                props.setCheckedIds && setCheckedIds([...checkedIds, item.id]);
              }}
            >
              <div>
                <span className={styles.icon}>
                  <img width={24} src={item.icon} />
                </span>
                <Typography.Text style={{ position: 'relative', top: 2 }}>
                  {item.name}
                </Typography.Text>
              </div>
              {canDelete && (
                <DeleteOutlined
                  className={styles.delete}
                  onClick={() => {
                    setCheckedIds && setCheckedIds(checkedIds?.filter(id => item.id !== id));
                    props.setCheckedIds &&
                      props.setCheckedIds(checkedIds?.filter(id => item.id !== id));
                  }}
                />
              )}
            </Flex>
          );
        }
      )}
    </Flex>
  );
};
interface ConfigKnowledgeProps {}

const ConfigKnowledge: React.FC<ConfigKnowledgeProps> = props => {
  const knowledges = [
    { icon: Icon, id: '1', name: '考勤知识库' },
    { icon: Icon, id: '2', name: '报销知识库' },
    { icon: Icon, id: '3', name: '考勤知识2库' },
    { icon: Icon, id: '4', name: '报销知识库w' },
    { icon: Icon, id: '5', name: '报销知识库q' },
  ];
  const [checkedknowledgeIds, setCheckedKnowledgeIds] = useState(['1', '2', '3']);
  const [checkedknowledgeIdsTemp, setCheckedKnowledgeIdsTemp] = useState(['1', '2', '3', '4']);
  return (
    <Container
      icon={<KubeagiKnowledge />}
      title={'知识库'}
      actions={[
        {
          key: 'string',
          icon: (
            <a>
              <PlusCircleOutlined style={{ marginRight: 5 }} />
              添加
            </a>
          ),
          // children?: React.ReactElement
          data: {},
          modal: {
            title: '选择知识库',
            width: 593,
            refresh: () => {},
            type: 'edit',
            data: {},
            children: (
              <Knowledge
                items={knowledges}
                checkedIds={checkedknowledgeIdsTemp}
                setCheckedIds={setCheckedKnowledgeIdsTemp}
                canDelete={false}
                canSelect={true}
              />
            ),
            handleSave: (values: any) => {},
          },
        },
        {
          key: 'string',
          icon: <SettingOutlined />,
          // children?: React.ReactElement
          data: {},
          modal: {
            title: '知识库高级配置',
            refresh: () => {},
            type: 'edit',
            data: {},
            children: (
              <>
                <SliderItem
                  label="最低相似度"
                  name="zzzz"
                  Config={{
                    initialValue: 0.7,
                    min: 0,
                    max: 1,
                    precision: 2,
                  }}
                />
                <SliderItem
                  label="引用上限"
                  name="yyyy"
                  Config={{
                    initialValue: 5,
                    min: 1,
                    max: 10,
                    precision: 0,
                  }}
                />
                <Form.Item
                  style={{ marginBottom: 0, marginTop: 10 }}
                  label="空搜索回复"
                  name="description"
                  initialValue={'未找到您询问的内容，请详细描述您的问题'}
                  rules={[
                    {
                      validator: (_, value, callback) => {
                        if (value && value.length > 200) {
                          return callback('最多可输入 200 字符');
                        }
                        return callback();
                      },
                    },
                  ]}
                >
                  <Input.TextArea
                    rows={3}
                    placeholder="没有搜索到合适的内容时，将会直接回复此内容"
                  />
                </Form.Item>
              </>
            ),
            handleSave: (values: any) => {},
          },
        },
      ]}
    >
      <Knowledge
        items={knowledges}
        checkedIds={checkedknowledgeIds}
        setCheckedIds={setCheckedKnowledgeIds}
        canDelete={true}
        canSelect={false}
      />
    </Container>
  );
};

export default ConfigKnowledge;
