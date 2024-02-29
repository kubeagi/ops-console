import { SettingOutlined } from '@ant-design/icons';
import { KubeagiRadio } from '@tenx-ui/icon';
import { Flex, Form, Select, Typography } from 'antd';
import React, { useEffect, useState } from 'react';

import Icon from '@/assets/img/model-app-bx.png';
import I18N from '@/utils/kiwiI18N';

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
    { icon: Icon, id: '1', name: I18N.ModelApp.kaoQinZhiShiKu2 },
    { icon: Icon, id: '2', name: I18N.ModelApp.baoXiaoZhiShiKu3 },
    { icon: Icon, id: '3', name: I18N.ModelApp.kaoQinZhiShiKu },
    { icon: Icon, id: '4', name: I18N.ModelApp.baoXiaoZhiShiKu2 },
    { icon: Icon, id: '5', name: I18N.ModelApp.baoXiaoZhiShiKu },
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
            title: I18N.ModelApp.yuYinBoBaoPei,
            refresh: () => {},
            type: 'edit',
            children: (
              <>
                <Form.Item
                  initialValue={'alloy'}
                  label={I18N.ModelApp.yuYinMoXing}
                  name="voice"
                  style={{ marginBottom: 10 }}
                >
                  <Select placeholder={I18N.ModelApp.qingXuanZeYuYin}>
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
                  label={I18N.ModelApp.yuSu}
                  name={I18N.ModelApp.yuSu}
                />
                <Form.Item label={I18N.ModelApp.yuYinFengGe} style={{ marginBottom: 0 }}>
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
      title={I18N.ModelApp.yuYinBoBao}
    ></Container>
  );
};

export default ConfigAudio;
