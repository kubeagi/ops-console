import { QuestionCircleOutlined } from '@ant-design/icons';
import { KubeagiPrompt } from '@tenx-ui/icon';
import { Modal } from '@tenx-ui/materials';
import { Alert, Button, Form, Input, Space, Table, Tooltip, Typography } from 'antd';
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
    prompt: I18N.ModelApp.shengChengYiXiaNei,
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
            icon: <a className={styles.link}>{I18N.ModelApp.pROMP3}</a>,
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
        configKey={'ConfigPrompt'}
        icon={<KubeagiPrompt />}
        title={
          <Space size={4}>
            Prompt
            <Tooltip title={I18N.ModelApp.tiShiCiKeYi}>
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
            placeholder={I18N.ModelApp.qingShuRuPR}
            rows={3}
          />
        </Form.Item>
      </Container>
    </>
  );
};

export default ConfigPrompt;
