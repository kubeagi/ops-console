import { Col, Divider, Dropdown, Image, Row, Space, Typography } from '@tenx-ui/materials';
import { getUnifiedHistory } from '@tenx-ui/utils/es/UnifiedLink/index.prod';
import { Card } from 'antd';
import React, { useState } from 'react';

import I18N from '@/utils/kiwiI18N';

import { useModalAppDetailContext } from '../index';
import Delete from './Delete';
import Edit from './Edit';
import Publish from './Publish';
import styles from './index.less';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = props => {
  const { refresh, data, loading } = useModalAppDetailContext();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<'publish' | 'edit' | 'delete'>();
  const history = getUnifiedHistory();

  const handlePublish = () => {
    setModalOpen(true);
    setModalType('publish');
  };
  const handleEdit = () => {
    setModalOpen(true);
    setModalType('edit');
  };
  const handleDelete = () => {
    setModalOpen(true);
    setModalType('delete');
  };
  return (
    <Card bordered={false} className={styles.header} loading={loading}>
      <Publish
        data={data}
        open={modalOpen && modalType === 'publish'}
        refresh={refresh}
        setOpen={setModalOpen}
        type={modalType}
      />
      <Edit
        data={data?.metadata}
        open={modalOpen && modalType === 'edit'}
        refresh={refresh}
        setOpen={setModalOpen}
        type={modalType}
      />
      <Delete
        data={data?.metadata}
        open={modalOpen && modalType === 'delete'}
        refresh={refresh}
        setOpen={setModalOpen}
        type={modalType}
      />
      <Row wrap={false}>
        <Col flex="auto">
          <Row wrap={false}>
            <Col flex="84px" style={{ display: 'flex', alignItems: 'center' }}>
              <Image
                fallback=""
                height={64}
                preview={false}
                src={data?.metadata?.icon}
                style={{ marginRight: '20px' }}
                width={64}
              />
            </Col>
            <Col flex="auto">
              <Row gutter={['', 8]} wrap={true}>
                <Col span={24}>
                  <Typography.Title bold={true} ellipsis={true} level={1}>
                    {data?.metadata?.displayName}
                  </Typography.Title>
                </Col>
                <Col span={24}>
                  <Typography.Text ellipsis={true}>{I18N.ModelApp.mingCheng}</Typography.Text>
                  <Typography.Text ellipsis={{ tooltip: 1 }} style={{ maxWidth: 200 }}>
                    {data?.metadata?.name}
                  </Typography.Text>
                  <Divider dashed={false} mode="default" type="vertical" />
                  <Typography.Text disabled={false} ellipsis={true} strong={false}>
                    ID:
                  </Typography.Text>
                  <Typography.Text disabled={false} ellipsis={true} strong={false}>
                    {data?.metadata?.id}
                  </Typography.Text>
                  <Divider dashed={false} mode="default" type="vertical" />
                  <Typography.Text disabled={false} ellipsis={true} strong={false}>
                    {I18N.DataHandle.gengXinShiJian}
                  </Typography.Text>
                  <Typography.Time
                    format=""
                    relativeTime={false}
                    time={data?.metadata?.updateTimestamp}
                  />
                  <Divider mode="default" type="vertical" />
                  <Typography.Text ellipsis={true} strong={false}>
                    {I18N.ModelApp.chuangJianShiJian}
                  </Typography.Text>
                  <Typography.Time
                    format=""
                    relativeTime={false}
                    time={data?.metadata?.creationTimestamp}
                  />
                  <Divider mode="default" type="vertical" />
                  <Typography.Text ellipsis={true} strong={false}>
                    {I18N.ModelApp.chuangJianZhe}
                  </Typography.Text>
                  <Typography.Text ellipsis={true} strong={false}>
                    {data?.metadata?.creator || '-'}
                  </Typography.Text>
                  <Divider mode="default" type="vertical" />
                  <Typography.Text ellipsis={true} strong={false}>
                    {I18N.ModelApp.miaoShu2}
                  </Typography.Text>
                  <Typography.Text
                    ellipsis={{ tooltip: data?.metadata?.description || '-' }}
                    strong={false}
                    style={{ maxWidth: 200 }}
                  >
                    {data?.metadata?.description || '-'}
                  </Typography.Text>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col flex="100px" style={{ display: 'flex' }}>
          <Space align="center" direction="horizontal">
            <Dropdown.Button
              destroyPopupOnHide={true}
              menu={{
                items: [
                  {
                    key: 'assessment',
                    label: I18N.ModelApp.zhiNengTiPingGu,
                  },
                  {
                    key: 'publish',
                    label: data?.metadata?.isPublic
                      ? I18N.ModelApp.cheXiaoFaBu
                      : I18N.ModelApp.faBuZhiNengTi,
                  },
                  {
                    key: 'edit',
                    label: I18N.ModelApp.bianJi,
                  },
                  {
                    key: 'delete',
                    label: I18N.DataHandle.shanChu,
                  },
                ],
                onClick: ({ key }) => {
                  switch (key) {
                    case 'edit': {
                      handleEdit();

                      break;
                    }
                    case 'delete': {
                      handleDelete();

                      break;
                    }
                    case 'assessment': {
                      history.push(
                        `/ai-agent-assessment?appNamespace=${data?.metadata?.namespace}&appName=${data?.metadata?.name}`
                      );

                      break;
                    }

                    case 'publish': {
                      handlePublish();
                      break;
                    }
                    // No default
                  }
                },
              }}
              onClick={() => {
                history.push(
                  `/chat?appNamespace=${data?.metadata?.namespace}&appName=${data?.metadata?.name}`
                );
              }}
            >
              {I18N.ModelApp.duiHua}
            </Dropdown.Button>
          </Space>
        </Col>
      </Row>
    </Card>
  );
};

export default Header;
