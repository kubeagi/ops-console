import { Col, Divider, Dropdown, Image, Row, Space, Typography } from '@tenx-ui/materials';
import { getUnifiedHistory } from '@tenx-ui/utils/es/UnifiedLink/index.prod';
import { Card } from 'antd';
import React, { useState } from 'react';
import { useModalAppDetailContext } from '../index';
import Delete from './Delete';
import Edit from './Edit';
import styles from './index.less';
import Publish from './Publish';
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
    <Card bordered={false} loading={loading} className={styles.header}>
      <Publish
        open={modalOpen && modalType === 'publish'}
        setOpen={setModalOpen}
        refresh={refresh}
        type={modalType}
        data={data}
      />
      <Edit
        open={modalOpen && modalType === 'edit'}
        setOpen={setModalOpen}
        refresh={refresh}
        type={modalType}
        data={data?.metadata}
      />
      <Delete
        open={modalOpen && modalType === 'delete'}
        setOpen={setModalOpen}
        refresh={refresh}
        type={modalType}
        data={data?.metadata}
      />
      <Row wrap={false}>
        <Col flex="auto">
          <Row wrap={false}>
            <Col flex="84px" style={{ display: 'flex', alignItems: 'center' }}>
              <Image
                src={data?.metadata?.icon}
                style={{ marginRight: '20px' }}
                width={64}
                height={64}
                preview={false}
                fallback=""
              />
            </Col>
            <Col flex="auto">
              <Row wrap={true} gutter={['', 8]}>
                <Col span={24}>
                  <Typography.Title bold={true} level={1} ellipsis={true}>
                    {data?.metadata?.displayName}
                  </Typography.Title>
                </Col>
                <Col span={24}>
                  <Typography.Text ellipsis={true}>名称：</Typography.Text>
                  <Typography.Text ellipsis={{ tooltip: 1 }} style={{ maxWidth: 200 }}>
                    {data?.metadata?.name}
                  </Typography.Text>
                  <Divider mode="default" type="vertical" dashed={false} />
                  <Typography.Text strong={false} disabled={false} ellipsis={true}>
                    ID:
                  </Typography.Text>
                  <Typography.Text strong={false} disabled={false} ellipsis={true}>
                    {data?.metadata?.id}
                  </Typography.Text>
                  <Divider mode="default" type="vertical" dashed={false} />
                  <Typography.Text strong={false} disabled={false} ellipsis={true}>
                    更新时间：
                  </Typography.Text>
                  <Typography.Time
                    time={data?.metadata?.updateTimestamp}
                    format=""
                    relativeTime={false}
                  />
                  <Divider mode="default" type="vertical" />
                  <Typography.Text strong={false} ellipsis={true}>
                    创建时间：
                  </Typography.Text>
                  <Typography.Time
                    time={data?.metadata?.creationTimestamp}
                    format=""
                    relativeTime={false}
                  />
                  <Divider mode="default" type="vertical" />
                  <Typography.Text strong={false} ellipsis={true}>
                    创建者：
                  </Typography.Text>
                  <Typography.Text strong={false} ellipsis={true}>
                    {data?.metadata?.creator || '-'}
                  </Typography.Text>
                  <Divider mode="default" type="vertical" />
                  <Typography.Text ellipsis={true} strong={false}>
                    描述：
                  </Typography.Text>
                  <Typography.Text
                    ellipsis={{ tooltip: 1 }}
                    style={{ maxWidth: 200 }}
                    strong={false}
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
              menu={{
                items: [
                  {
                    key: 'edit',
                    label: '编辑',
                  },
                  {
                    key: 'delete',
                    label: '删除',
                  },
                ],
                onClick: ({ key }) => {
                  if (key === 'edit') {
                    handleEdit();
                  } else if (key === 'delete') {
                    handleDelete();
                  }
                },
              }}
              onClick={() => {
                history.push(
                  `/chat?appNamespace=${data?.metadata?.namespace}&appName=${data?.metadata?.name}`
                );
                // handlePublish();
              }}
              destroyPopupOnHide={true}
            >
              对话
            </Dropdown.Button>
          </Space>
        </Col>
      </Row>
    </Card>
  );
};

export default Header;
