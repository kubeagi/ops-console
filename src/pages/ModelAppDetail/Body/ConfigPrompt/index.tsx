import { QuestionCircleOutlined } from '@ant-design/icons';
import { KubeagiPrompt } from '@tenx-ui/icon';
import { Modal } from '@tenx-ui/materials';
import { Alert, Button, Form, Input, Space, Table, Tooltip, Typography } from 'antd';
import React, { useState } from 'react';

import { useModalAppDetailContext } from '../../index';
import { Knowledge } from '../ConfigKnowledge';
import Container from '../Container';
import styles from '../index.less';

interface DetailModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}
const DetailModal = ({ open, setOpen }: DetailModalProps) => {
  return (
    <Modal
      footer={
        <span style={{ textAlign: 'left' }}>
          查看更多 Prompt 信息，可参考{' '}
          <a href="https://www.promptingguide.ai/zh" rel="noreferrer" target="_blank">
            提示工程指南
          </a>
        </span>
      }
      onCancel={() => setOpen(false)}
      open={open}
      title="Prompt 介绍"
      width={800}
    >
      <Typography.Paragraph>在 AI 智能体中，Prompt 有以下作用：</Typography.Paragraph>
      <Typography.Paragraph>
        <span className={styles.dot} />
        引导模型行为：通过 Prompt，可以明确告诉模型应该采取何种行动或生成何种回应。Prompt
        可以定义任务的目标、期望的输出格式、所需的操作步骤等，以确保模型的行为符合预期。
      </Typography.Paragraph>
      <Typography.Paragraph>
        <span className={styles.dot} />
        控制输出质量：通过合理的 Prompt 设计，可以引导模型生成更准确、相关、完整的回答。Prompt
        可以包含示例回答、期望的回答结构、问题细化等信息，帮助模型理解任务要求并生成更高质量的输出。
      </Typography.Paragraph>
      <Typography.Paragraph>
        <span className={styles.dot} />
        语言风格和文本生成：Prompt
        可以用于指导AI模型生成特定的语言风格或文本风格。通过选择适当的词汇、句法结构和上下文信息，Prompt
        可以影响模型生成的回答具有正式、友好、专业等不同的口吻和风格。
      </Typography.Paragraph>
      <Typography.Paragraph>
        <span className={styles.dot} />
        对话一致性：在对话系统中，Prompt 可以用于确保对话的连贯性和一致性。通过在 Prompt
        中提供对话历史、上下文信息或先前的对话片段，模型可以更好地理解对话背景并生成与之前回答一致的响应。
      </Typography.Paragraph>
      <Typography.Paragraph>
        <span className={styles.dot} />
        避免误导和偏差：Prompt
        的设计可以帮助避免模型生成误导性、偏见性或不当的回答。通过明确规定对特定主题或敏感话题的处理方式，Prompt
        可以减少模型生成不适当内容的风险。
      </Typography.Paragraph>
      <Typography.Paragraph>
        在设置 Prompt 时，支持输入变量，目前 KubeAGI 在 Prompt 中支持三种占位符：
      </Typography.Paragraph>
      <Table
        columns={[
          {
            title: '占位符',
            key: 'code',
            dataIndex: 'code',
          },
          {
            title: '使用说明',
            key: 'description',
            dataIndex: 'description',
          },
        ]}
        dataSource={[
          {
            code: '{{.context}}',
            description: '被替换为相关的上下文信息（比如从知识库获取到的相关信息）',
          },
          {
            code: '{{.history}}',
            description: '被替换为当前会话的历史，历史记录数量由模型的“对话轮次”决定',
          },
          { code: '{{.question}}', description: '被替换为用户的提问' },
        ]}
        pagination={false}
        style={{ marginBottom: 24 }}
      />
    </Modal>
  );
};

interface Prompt {
  id: string;
  name: string;
  prompt: string;
  icon: string;
}
const icon =
  'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNzA1NDgwODM5MDIxIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjI5NjgiIGlkPSJteF9uXzE3MDU0ODA4MzkwMjIiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTUwNS42MTk5MzggODgwLjQ0ODU5OGMtNDcuODUwNDY3IDAtOTIuNTEwOTAzLTYuMzgwMDYyLTEzMy45ODEzMDktMTkuMTQwMTg3djQ0LjY2MDQzNmMwIDYzLjgwMDYyMyA1MS4wNDA0OTggMTE4LjAzMTE1MyAxMTguMDMxMTUzIDExOC4wMzExNTNoMzEuOTAwMzExYzYzLjgwMDYyMyAwIDExOC4wMzExNTMtNTEuMDQwNDk4IDExOC4wMzExNTMtMTE4LjAzMTE1M1Y4NjEuMzA4NDExYy00MS40NzA0MDUgMTIuNzYwMTI1LTg2LjEzMDg0MSAxOS4xNDAxODctMTMzLjk4MTMwOCAxOS4xNDAxODd6IiBvcGFjaXR5PSIuNiIgcC1pZD0iMjk2OSIgZmlsbD0iIzQ0NjFlYiI+PC9wYXRoPjxwYXRoIGQ9Ik01MjcuOTUwMTU2IDBjLTIyNi40OTIyMTIgMC00MTEuNTE0MDE5IDE4NS4wMjE4MDctNDExLjUxNDAxOSA0MTEuNTE0MDE5czE4NS4wMjE4MDcgNDExLjUxNDAxOSA0MTEuNTE0MDE5IDQxMS41MTQwMThjMjI2LjQ5MjIxMiAwIDQxMS41MTQwMTktMTg1LjAyMTgwNyA0MTEuNTE0MDE4LTQxMS41MTQwMThTNzU0LjQ0MjM2OCAwIDUyNy45NTAxNTYgMHogbTI3NC4zNDI2NzkgNTc3LjM5NTYzOWMtNi4zODAwNjIgMy4xOTAwMzEtMTIuNzYwMTI1IDMuMTkwMDMxLTE5LjE0MDE4NyAzLjE5MDAzMS0xNS45NTAxNTYgMC0zMS45MDAzMTItOS41NzAwOTMtMzguMjgwMzc0LTIyLjMzMDIxOGwtOTIuNTEwOTAzLTE4NS4wMjE4MDctODkuMzIwODczIDE0OS45MzE0NjRjLTYuMzgwMDYyIDEyLjc2MDEyNS0yMi4zMzAyMTggMjIuMzMwMjE4LTM1LjA5MDM0MiAyMi4zMzAyMTgtMTUuOTUwMTU2IDAtMjguNzEwMjgtOS41NzAwOTMtMzUuMDkwMzQzLTIyLjMzMDIxOGwtODkuMzIwODcyLTE0OS45MzE0NjQtOTIuNTEwOTA0IDE4NS4wMjE4MDdjLTkuNTcwMDkzIDIyLjMzMDIxOC0zNS4wOTAzNDMgMjguNzEwMjgtNTcuNDIwNTYgMTkuMTQwMTg3LTIyLjMzMDIxOC05LjU3MDA5My0yOC43MTAyOC0zNS4wOTAzNDMtMTkuMTQwMTg3LTU3LjQyMDU2MWwxMjcuNjAxMjQ2LTI1NS4yMDI0OTJjNi4zODAwNjItMTIuNzYwMTI1IDIyLjMzMDIxOC0yMi4zMzAyMTggMzUuMDkwMzQzLTIyLjMzMDIxOCAxNS45NTAxNTYgMCAyOC43MTAyOCA2LjM4MDA2MiAzOC4yODAzNzMgMjIuMzMwMjE4bDkyLjUxMDkwNCAxNTYuMzExNTI2IDkyLjUxMDkwMy0xNTYuMzExNTI2YzkuNTcwMDkzLTEyLjc2MDEyNSAyMi4zMzAyMTgtMjIuMzMwMjE4IDM4LjI4MDM3NC0yMi4zMzAyMThzMjguNzEwMjggOS41NzAwOTMgMzUuMDkwMzQzIDIyLjMzMDIxOGwxMjcuNjAxMjQ2IDI1NS4yMDI0OTJjOS41NzAwOTMgMjIuMzMwMjE4IDAgNDcuODUwNDY3LTE5LjE0MDE4NyA1Ny40MjA1NjF6IiBwLWlkPSIyOTcwIiBmaWxsPSIjNDQ2MWViIj48L3BhdGg+PC9zdmc+';
const PROMPTS_MAP: Prompt[] = [
  {
    icon,
    id: 'TextQuestionAndAnswer',
    name: '文本问答',
    prompt:
      '现在你是一个阅读理解机器人，你会阅读并深度理解我给你的文本内容并据此回答我所提出的问题。注意，我给出的问题是：{{.question}} 你需要阅读理解的文本是：{{context}}',
  },
  { icon, id: 'DocumentAbstract', name: '文档摘要', prompt: '生成以下内容的摘要：{{.context}}' },
  {
    icon,
    id: 'CodeDebug',
    name: '代码 Debug',
    prompt:
      '现在你是一位精通go的资深IT开发工程师，你会对我给出的代码进行Debug。注意你需要给出代码中的具体Bug，并且通过代码块的形式提供修改后的代码。接下来你需要进行Debug的代码为:{{.question}}',
  },
  {
    icon,
    id: 'PersonnelSupervisor',
    name: '人事主管',
    prompt: '请根据上下文内容:{{.context}}回答用户提问:{{.question}}',
  },
  {
    icon,
    id: 'LegalAdviser',
    name: '法律顾问',
    prompt:
      '我想让你做我的法律顾问。我将描述一种法律情况，您将就如何处理它提供建议。你应该只回复你的建议，而不是其他。不要写解释。我的第一个请求是{{.question}}。',
  },
  {
    icon,
    id: 'PPTFrame',
    name: 'PPT 框架',
    prompt:
      '现在你需要制作一份PPT，你需要按照我给出的主题来准备这份PPT的内容。 最终你需要给出： 【目录】根据我给出的主题和内容撰写的PPT目录 【内容】根据目录中的标题一一撰写对应的内容大纲 接下来，你需要制作的PPT主题是{{.question}}',
  },
];
interface ConfigPromptProps {}

const ConfigPrompt: React.FC<ConfigPromptProps> = props => {
  const { configs, setConfigs } = useModalAppDetailContext();
  const [detailOpen, setDetailOpen] = useState(false);

  return (
    <>
      <DetailModal open={detailOpen} setOpen={setDetailOpen} />

      <Container
        actions={[
          {
            key: 'string',
            icon: <a>Prompt 模板</a>,
            data: {},
            modal: {
              title: '选择 Prompt 模板',
              width: 593,
              refresh: () => {},
              type: 'edit',
              renderChildren: form => {
                return (
                  <>
                    <Alert
                      message={
                        <span>
                          Prompt 是指向 AI
                          模型提供的指示或问题，用于引导其生成回应或执行特定任务。Prompt
                          的设计和选择可以显著影响 AI 模型的输出结果和行为。
                          <Button
                            onClick={() => {
                              setDetailOpen(true);
                            }}
                            type="link"
                          >
                            Prompt 详细介绍
                          </Button>
                        </span>
                      }
                      showIcon
                      style={{ marginBottom: 16 }}
                      type="info"
                    />

                    <Knowledge
                      canDelete={false}
                      canSelect={true}
                      checkedIds={[]}
                      items={PROMPTS_MAP}
                      setCheckedIds={v => {
                        const userPrompt = PROMPTS_MAP.find(item => item.id === v?.[0])?.prompt;
                        if (userPrompt) {
                          form.setFieldsValue({
                            userPrompt,
                          });
                        }
                      }}
                    />
                  </>
                );
              },
              handleSave: (values: any) => {},
            },
          },
        ]}
        changeConfig
        configKey={'ConfigPrompt'}
        icon={<KubeagiPrompt />}
        title={
          <Space size={4}>
            Prompt
            <Tooltip title="提示词可以帮助模型更好地理解用户的意图，并且可以在对话的早期阶段提供必要的指导。该提示词会固定在对话开始之前，适当的提示词可以引导对话的方向。支持使用变量，如{text}。">
              <QuestionCircleOutlined className={styles.tooltip} />
            </Tooltip>
          </Space>
        }
      >
        <Form.Item name="userPrompt" style={{ marginBottom: 0 }}>
          <Input.TextArea
            onChange={e => {
              setConfigs({
                ...configs,
                ConfigPrompt: {
                  ...configs?.ConfigPrompt,
                  userPrompt: e.target.value,
                },
              });
            }}
            placeholder="请输入 Prompt"
            rows={3}
          />
        </Form.Item>
      </Container>
    </>
  );
};

export default ConfigPrompt;
