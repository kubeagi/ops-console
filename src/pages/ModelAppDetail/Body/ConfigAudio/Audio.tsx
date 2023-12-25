import { PauseCircleOutlined, PlayCircleOutlined } from '@ant-design/icons';
import { OpenaiVoice } from '@lobehub/tts';
import { useOpenAITTS } from '@lobehub/tts/react';
import { Space } from 'antd';

import styles from './index.less';

// import { OPENAI_BASE_URL } from '@lobehub/tts/core/const/api';
const OPENAI_BASE_URL = 'https://api.openai.com/v1';
const defaultText = '这是一段使用 OpenAI Speech to Text 的语音演示';

interface AudioProps {
  voice: OpenaiVoice;
}
const Audio: React.FC<AudioProps> = props => {
  const { voice } = props;
  const { setText, isGlobalLoading, audio, start, stop } = useOpenAITTS(defaultText, {
    api: {
      // OPENAI_API_KEY?: string,
      OPENAI_PROXY_URL: OPENAI_BASE_URL,
      // headers?: Headers,
      // serviceUrl?: string,
    },
    options: {
      voice,
      model: 'tts-1',
    },
  });
  return (
    <Space
      className={styles.Audio}
      onClick={e => {
        e.stopPropagation();
      }}
      size={5}
    >
      {isGlobalLoading ? (
        <span onClick={stop}>
          <PauseCircleOutlined className={styles.AudioIcon} /> <>停止</>
        </span>
      ) : (
        <span onClick={start}>
          <PlayCircleOutlined className={styles.AudioIcon} /> <>试听</>
        </span>
      )}
      {/* <AudioPlayer audio={audio} isLoading={isGlobalLoading} onLoadingStop={stop} /> */}
    </Space>
  );
};
export default Audio;
