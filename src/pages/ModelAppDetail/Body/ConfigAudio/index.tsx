import Icon from '@/assets/img/model-app-bx.png';
import { SettingOutlined } from '@ant-design/icons';
import { KubeagiRadio } from '@tenx-ui/icon';
import { Flex, Form, Select, Space, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
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
    <Flex wrap="wrap" gap="small">
      {items?.map(item => {
        return (
          <Flex
            justify="space-between"
            key={item.id}
            className={`${styles.AudioItem} ${styles.AudioItemCanSelect} ${
              item.id === checkedId && styles.AudioItemSelected
            }`}
            align="center"
            onClick={() => {
              setCheckedId(item.id);
              props.setCheckedId && setCheckedId(item.id);
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
      configKey="ConfigAudio"
      icon={<KubeagiRadio />}
      title={'语音播报'}
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
                  label="语音模型"
                  name="voice"
                  initialValue={'alloy'}
                  style={{ marginBottom: 10 }}
                >
                  <Select placeholder="请选择语音模型">
                    {['alloy', 'echo', 'fable', 'onyx', 'nova', 'shimmer'].map(value => (
                      <Select.Option value={value} key={value}>
                        {value}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <SliderItem
                  label="语速"
                  name="语速"
                  Config={{
                    initialValue: 1,
                    min: 0,
                    max: 10,
                    precision: 0,
                  }}
                />
                <Form.Item label="语音风格" style={{ marginBottom: 0 }}>
                  <AudioStyle
                    items={audioStyles}
                    checkedId={checkedAudioStyleTemp}
                    setCheckedId={setCheckedAudioStyleTemp}
                  />
                </Form.Item>
              </>
            ),
            handleSave: (values: any) => {},
          },
        },
      ]}
    ></Container>
  );
};

export default ConfigAudio;
