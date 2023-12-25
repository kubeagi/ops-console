import { SettingOutlined } from '@ant-design/icons';
import { KubeagiRadio } from '@tenx-ui/icon';
import { Flex, Form, Select, Typography } from 'antd';
import React, { useEffect, useState } from 'react';

import Icon from '@/assets/img/model-app-bx.png';

import Container from '../Container';
import { SliderItem } from '../Modal';
import Audio from './Audio';
import styles from './index.less';

interface AudioStyleItem {
  id: string;
  name: string;
  icon: any;
}
interface AudioStyleProps {
  checkedId: string;
  items: AudioStyleItem[];
  setCheckedId: (ids: string) => void;
}
const AudioStyle: React.FC<AudioStyleProps> = props => {
  const { items } = props;
  const [checkedId, setCheckedId] = useState('');
  useEffect(() => {
    setCheckedId(props.checkedId);
  }, [props.checkedId]);
  return (
    <Flex gap="small" wrap="wrap">
      {items?.map(item => {
        return (
          <Flex
            align="center"
            className={`${styles.AudioItem} ${styles.AudioItemCanSelect} ${
              item.id === checkedId && styles.AudioItemSelected
            }`}
            justify="space-between"
            key={item.id}
            onClick={() => {
              setCheckedId(item.id);
              props.setCheckedId && setCheckedId(item.id);
            }}
          >
            <div>
              <span className={styles.icon}>
                <img src={item.icon} width={24} />
              </span>
              <Typography.Text style={{ position: 'relative', top: 2 }}>
                {item.name}
              </Typography.Text>
            </div>
            <Audio voice="alloy" />
          </Flex>
        );
      })}
    </Flex>
  );
};

interface ConfigAudioProps {}

const ConfigAudio: React.FC<ConfigAudioProps> = props => {
  const [checkedAudioStyleTemp, setCheckedAudioStyleTemp] = useState('1');
  const audioStyles = [
    { icon: Icon, id: '1', name: '考勤知识库' },
    { icon: Icon, id: '2', name: '报销知识库' },
    { icon: Icon, id: '3', name: '考勤知识2库' },
    { icon: Icon, id: '4', name: '报销知识库w' },
    { icon: Icon, id: '5', name: '报销知识库q' },
  ];
  return (
    <Container
      actions={[
        {
          key: 'string',
          icon: <SettingOutlined />,
          // children?: React.ReactElement
          data: {},
          modal: {
            title: '语音播报配置',
            refresh: () => {},
            type: 'edit',
            children: (
              <>
                <Form.Item
                  initialValue={'alloy'}
                  label="语音模型"
                  name="voice"
                  style={{ marginBottom: 10 }}
                >
                  <Select placeholder="请选择语音模型">
                    {['alloy', 'echo', 'fable', 'onyx', 'nova', 'shimmer'].map(value => (
                      <Select.Option key={value} value={value}>
                        {value}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <SliderItem
                  Config={{
                    initialValue: 1,
                    min: 0,
                    max: 10,
                    precision: 0,
                  }}
                  label="语速"
                  name="语速"
                />
                <Form.Item label="语音风格" style={{ marginBottom: 0 }}>
                  <AudioStyle
                    checkedId={checkedAudioStyleTemp}
                    items={audioStyles}
                    setCheckedId={setCheckedAudioStyleTemp}
                  />
                </Form.Item>
              </>
            ),
            handleSave: (values: any) => {},
          },
        },
      ]}
      configKey="ConfigAudio"
      icon={<KubeagiRadio />}
      title={'语音播报'}
    ></Container>
  );
};

export default ConfigAudio;
