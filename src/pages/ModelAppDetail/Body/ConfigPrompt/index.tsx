import { KubeagiPrompt } from '@tenx-ui/icon';
import { Modal } from '@tenx-ui/materials';
import { Alert, Button, Form, Input, Space, Table, Typography } from 'antd';
import React, { useState } from 'react';

import I18N from '@/utils/kiwiI18N';

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
          {I18N.ModelApp.chaKanGengDuoP}{' '}
          <a href="https://www.promptingguide.ai/zh" rel="noreferrer" target="_blank">
            {I18N.ModelApp.tiShiGongChengZhi}
          </a>
        </span>
      }
      onCancel={() => setOpen(false)}
      open={open}
      title={I18N.ModelApp.pROMP4}
      width={800}
    >
      <Typography.Paragraph>{I18N.ModelApp.zaiAIZhiNeng}</Typography.Paragraph>
      <Typography.Paragraph>
        <span className={styles.dot} />
        {I18N.ModelApp.yinDaoMoXingXing}
      </Typography.Paragraph>
      <Typography.Paragraph>
        <span className={styles.dot} />
        {I18N.ModelApp.kongZhiShuChuZhi}
      </Typography.Paragraph>
      <Typography.Paragraph>
        <span className={styles.dot} />
        {I18N.ModelApp.yuYanFengGeHe}
      </Typography.Paragraph>
      <Typography.Paragraph>
        <span className={styles.dot} />
        {I18N.ModelApp.duiHuaYiZhiXing}
      </Typography.Paragraph>
      <Typography.Paragraph>
        <span className={styles.dot} />
        {I18N.ModelApp.biMianWuDaoHe}
      </Typography.Paragraph>
      <Typography.Paragraph>{I18N.ModelApp.zaiSheZhiPR}</Typography.Paragraph>
      <Table
        columns={[
          {
            title: I18N.ModelApp.zhanWeiFu,
            key: 'code',
            dataIndex: 'code',
          },
          {
            title: I18N.ModelApp.shiYongShuoMing,
            key: 'description',
            dataIndex: 'description',
          },
        ]}
        dataSource={[
          {
            code: '{{.context}}',
            description: I18N.ModelApp.beiTiHuanWeiXiang,
          },
          {
            code: '{{.history}}',
            description: I18N.ModelApp.beiTiHuanWeiDang,
          },
          { code: '{{.question}}', description: I18N.ModelApp.beiTiHuanWeiYong },
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
    name: I18N.ModelApp.wenBenWenDa,
    prompt: I18N.ModelApp.xianZaiNiShiYi2,
  },
  {
    icon,
    id: 'DocumentAbstract',
    name: I18N.ModelApp.wenDangZhaiYao,
    prompt:
      '请阅读我上传的文档，并生成一个详细摘要。摘要应包括以下元素：\r\n 1) 文档的主要论点或主题；\r\n 2) 包含的关键数据和统计信息；\r\n 3) 文档中提到的重要事件或发展；\r\n 4) 对这些数据和事件的简要分析，以及它们如何相互关联；\r\n 5) 文档结论部分的概述。\r\n 目标是通过摘要提供一个全面的文档大意，使读者即使没有阅读整个文档，也能理解其核心内容和重要性。字数不限制，但请确保摘要准确、全面且易于理解。\r\n {{.context}} {{.question}} \r\n {{.history}}',
  },
  {
    icon,
    id: 'CodeDebug',
    name: I18N.ModelApp.daiMaDEB,
    prompt: I18N.ModelApp.xianZaiNiShiYi,
  },
  {
    icon,
    id: 'PersonnelSupervisor',
    name: I18N.ModelApp.renShiZhuGuan,
    prompt: I18N.ModelApp.qingGenJuShangXia,
  },
  {
    icon,
    id: 'LegalAdviser',
    name: I18N.ModelApp.faLuGuWen,
    prompt: I18N.ModelApp.niXianZaiShiWo,
  },
  {
    icon,
    id: 'PPTFrame',
    name: I18N.ModelApp.pPTKuangJia,
    prompt: I18N.ModelApp.xianZaiNiXuYao,
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
            icon: (
              <a className={styles.link}>
                <KubeagiPrompt style={{ marginRight: 5 }} />
                {I18N.ModelApp.pROMP3}
              </a>
            ),
            data: {},
            modal: {
              title: I18N.ModelApp.xuanZePRO,
              width: 593,
              refresh: () => {},
              type: 'edit',
              footer: false,
              renderChildren: (form, forceUpdate, setOpen) => {
                return (
                  <>
                    <Alert
                      message={
                        <span>
                          {I18N.ModelApp.pROMP2}
                          <Button
                            onClick={() => {
                              setDetailOpen(true);
                            }}
                            type="link"
                          >
                            {I18N.ModelApp.pROMP}
                          </Button>
                        </span>
                      }
                      showIcon
                      style={{ marginBottom: 16 }}
                      type="info"
                    />

                    <Knowledge
                      callback={() => setOpen(false)}
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
                          setConfigs({
                            ...configs,
                            ConfigPrompt: {
                              ...configs?.ConfigPrompt,
                              userPrompt,
                            },
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
        title={
          <Space size={4}>
            角色设定&回复逻辑
            {/* <Tooltip
              overlayClassName={styles.PromptTooltip}
              title={
                <div>
                  <p>可使用自然语言设定智能体的角色与工作流程，如：</p>

                  <p className={styles.PromptTooltipNoMargin}>角色</p>
                  <p>
                    你是一个能够高效生成文档摘要的智能体。你擅长通过用户提供的文本或文章生成精炼、准确的提要。
                  </p>

                  <p className={styles.PromptTooltipNoMargin}>技能：生成文档摘要</p>
                  <p className={styles.PromptTooltipNoMargin}>
                    - 将用户上传的文档进行分析，识别其主要的观点和主题。
                  </p>
                  <p>- 编写一份精练却内容丰富的提要，概括文档的核心观点。</p>

                  <p className={styles.PromptTooltipNoMargin}>举例格式：</p>
                  <p className={styles.PromptTooltipNoMargin}>- 💭 主标题：《文档标题》</p>
                  <p className={styles.PromptTooltipNoMargin}>
                    - 📍 主要观点：文档的核心观点，尽可能用有力度的语言，突出观点的重要性和启发性。
                  </p>
                  <p>- 📝 摘要：对文档的简短概括，约 100-200 字。</p>

                  <p className={styles.PromptTooltipNoMargin}>限制</p>
                  <p className={styles.PromptTooltipNoMargin}>- 仅讨论与文档内容相关的主题。</p>
                  <p className={styles.PromptTooltipNoMargin}>- 坚持使用提供的输出格式。</p>
                  <p className={styles.PromptTooltipNoMargin}>- 尽量不超过 200 字的限制。</p>
                  <p>- 使用 Markdown 格式引用来源。</p>
                </div>
              }
            >
              <QuestionCircleOutlined className={styles.tooltip} />
            </Tooltip> */}
          </Space>
        }
        configKey={'ConfigPrompt'}
        // icon={<KubeagiPrompt />}
        titleLevel={1}
      >
        <Form.Item name="userPrompt" style={{ marginBottom: 0 }}>
          <Input.TextArea
            className={styles.PromptTextArea}
            onChange={e => {
              setConfigs({
                ...configs,
                ConfigPrompt: {
                  ...configs?.ConfigPrompt,
                  userPrompt: e.target.value,
                },
              });
            }}
            placeholder={
              '可使用自然语言设定智能体的角色与工作流程，如：\r\n 角色 \r\n 你是一个能够高效生成文档摘要的智能体。你擅长通过用户提供的文本或文章生成精炼、准确的提要。\r\n 技能：生成文档摘要\r\n - 将用户上传的文档进行分析，识别其主要的观点和主题。\r\n - 编写一份精练却内容丰富的提要，概括文档的核心观点。\r\n 举例格式：\r\n - 💭 主标题：《文档标题》\r\n - 📍 主要观点：文档的核心观点，尽可能用有力度的语言，突出观点的重要性和启发性。\r\n - 📝 摘要：对文档的简短概括，约 100-200 字。\r\n 限制\r\n - 仅讨论与文档内容相关的主题。\r\n - 坚持使用提供的输出格式。\r\n - 尽量不超过 200 字的限制。\r\n - 使用 Markdown 格式引用来源。'
            }
            rows={3}
          />
        </Form.Item>
      </Container>
    </>
  );
};

export default ConfigPrompt;
