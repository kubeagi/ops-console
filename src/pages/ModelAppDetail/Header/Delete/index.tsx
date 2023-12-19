import { Alert, Modal, Space, Typography } from '@tenx-ui/materials';
import React from 'react';

export interface RowData {}
interface PublishProps {
  open?: boolean;
  setOpen?: (open?: boolean) => void;
  refresh?: () => void;
  type?: string;
  data?: RowData;
}
const Publish: React.FC<PublishProps> = props => {
  const { open, setOpen, refresh, data } = props;
  const title = '删除';

  return (
    <Modal
      open={open}
      title={`${title}应用`}
      onCancel={() => setOpen(false)}
      onOk={() => {
        setOpen(false);
        refresh && refresh();
      }}
      destroyOnClose
    >
      <Alert
        message={
          <Space align="center" direction="horizontal">
            <Typography.Paragraph ellipsis={true}>确定删除 </Typography.Paragraph>
            <Typography.Paragraph ellipsis={true} style={{ padding: '0 4px' }}>
              aaaaaaaaaaa
            </Typography.Paragraph>
            <Typography.Paragraph ellipsis={true}> 吗？</Typography.Paragraph>
          </Space>
        }
        showIcon={true}
        type="warning"
      />
    </Modal>
  );
};

export default Publish;
