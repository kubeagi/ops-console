import {
  Button,
  Card,
  Col,
  Divider,
  Dropdown,
  Image,
  Row,
  Space,
  Typography,
} from '@tenx-ui/materials';
import React, { useState } from 'react';
import Delete from './Delete';
import Edit from './Edit';
import Publish from './Publish';

import { useModalAppDetailContext } from '../index';
interface HeaderProps {}

const Header: React.FC<HeaderProps> = props => {
  const { refresh, data } = useModalAppDetailContext();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<'publish' | 'edit' | 'delete'>();

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
    <Card bordered={false}>
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
        data={data}
      />
      <Delete
        open={modalOpen && modalType === 'delete'}
        setOpen={setModalOpen}
        refresh={refresh}
        type={modalType}
        data={data}
      />
      <Row wrap={false}>
        <Col flex="auto">
          <Row wrap={false}>
            <Col flex="84px" style={{ display: 'flex', alignItems: 'center' }}>
              <Image
                src={'----------'}
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
                    title
                  </Typography.Title>
                </Col>
                <Col span={24}>
                  <Typography.Text ellipsis={true}>名称：</Typography.Text>
                  <Typography.Text ellipsis={{ tooltip: 1 }} style={{ maxWidth: 200 }}>
                    名称
                  </Typography.Text>
                  <Divider mode="default" type="vertical" dashed={false} />
                  <Typography.Text strong={false} disabled={false} ellipsis={true}>
                    ID:
                  </Typography.Text>
                  <Typography.Text strong={false} disabled={false} ellipsis={true}>
                    ID
                  </Typography.Text>
                  <Divider mode="default" type="vertical" dashed={false} />
                  <Typography.Text strong={false} disabled={false} ellipsis={true}>
                    更新时间：
                  </Typography.Text>
                  <Typography.Time time={''} format="" relativeTime={false} />
                  <Divider mode="default" type="vertical" />
                  <Typography.Text strong={false} ellipsis={true}>
                    创建时间：
                  </Typography.Text>
                  <Typography.Time time={''} format="" relativeTime={false} />
                  <Divider mode="default" type="vertical" />
                  <Typography.Text strong={false} ellipsis={true}>
                    创建者：
                  </Typography.Text>
                  <Typography.Text strong={false} ellipsis={true}>
                    creator
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
                    蚂蚁的企业级产品是一个庞大且复杂的体系。这类产品不仅量级巨大且功能复杂，而且变动和并发频繁，常常需要设计与开发能够快速的做出响应。同时这类产品中有存在很多类似的页面以及组件，可以通过抽象得到一些稳定且高复用性的内容。
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
                handlePublish();
              }}
              destroyPopupOnHide={true}
            >
              发布
            </Dropdown.Button>
          </Space>
        </Col>
      </Row>
    </Card>
  );
};

export default Header;
