import { FilePdfOutlined } from '@ant-design/icons';
import { getUnifiedHistory } from '@tenx-ui/utils/es/UnifiedLink/index.prod';
import { Col, Descriptions, Row } from 'antd';
import React from 'react';

interface Iprops {
  data: Record<string, any>;
}

const layout = {
  xs: { span: 12 },
  sm: {
    span: 12,
  },
  md: {
    span: 12,
  },
  lg: {
    span: 12,
  },
  xl: {
    span: 8,
  },
  xxl: {
    span: 6,
  },
};
const Config: React.FC<Iprops> = props => {
  const config = props.data;
  const history = getUnifiedHistory();
  const Link = path => {
    history.push(path);
  };

  const renderFile = info => {
    return (
      <Col {...layout} style={{ marginTop: 16 }}>
        <div style={{ display: 'flex', padding: 16, backgroundColor: '#FAFAFA', marginRight: 16 }}>
          <div style={{ width: 40, fontSize: 24 }}>
            <FilePdfOutlined />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ lineHeight: '24px' }}>{info.path}</div>
            <div style={{ display: 'flex' }}>
              <div style={{ flex: 1 }}>数据量：{info.count || '-'}</div>
              <div style={{ flex: 1 }}>文件大小：{info.size || '-'}</div>
            </div>
          </div>
        </div>
      </Col>
    );
  };
  const appInfoItems = [
    {
      label: '模型应用',
      children: config.application?.metadata?.name || '-',
      span: 4,
    },
    {
      label: '模型服务',
      children: config.application?.llm || '-',
    },
    {
      label: '温度',
      children: config.application?.temperature || '0',
    },
    {
      label: '对话伦次',
      children: config.application?.conversionWindowSize || '0',
    },
    {
      label: '最大响应长度',
      children: config.application.maxLength || '-',
    },
    {
      label: '知识库',
      children: config.application.knowledgebase || '-',
    },
    {
      label: '最低相似度',
      children: config.application?.scoreThreshold?.toFixed(2) || '-',
    },
    {
      label: '引用上限',
      children: config.application.numDocuments || '-',
      span: 2,
    },
    {
      label: 'Prompot',
      children: config.application.userPrompt,
    },
  ];
  const configItems = [
    {
      label: '评测模型',
      children: config.judgeLLM.displayName || '-',
    },
    {
      label: '评测数据集',
      children: (
        <>
          <a
            onClick={() =>
              Link('/dataset/detail/' + config?.datasets[0]?.source?.name?.split('.')[0])
            }
          >
            {config?.datasets[0]?.source?.name?.split('.')[0]}
          </a>
          --
          <a
            onClick={() =>
              Link(
                '/dataset/detail/' +
                  config?.datasets[0]?.source?.name?.split('.')[0] +
                  '/version/' +
                  config?.datasets[0]?.source?.name?.split('.')[0] +
                  '-' +
                  config?.datasets[0]?.source?.name?.split('.')[1]
              )
            }
          >
            {config?.datasets[0]?.source?.name?.split('.')[1]}
          </a>
        </>
      ),
      span: 3,
    },
    {
      label: '评测文件',
      children: (
        <div style={{ width: '100%' }}>
          <div>共 {config.datasets[0]?.files.length} 个</div>
          <Row>{config.datasets[0]?.files.map(item => renderFile(item))}</Row>
        </div>
      ),
      span: 4,
    },
  ];
  return (
    <div>
      <div style={{ fontWeight: 700, fontSize: '14px', marginBottom: 16 }}>应用信息</div>
      <Descriptions column={4} items={appInfoItems} />
      <div style={{ fontWeight: 700, fontSize: '14px', marginBottom: 16 }}>评估配置</div>
      <Descriptions column={4} items={configItems} />
    </div>
  );
};

export default Config;
