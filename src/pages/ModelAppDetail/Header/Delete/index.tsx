import { Alert, Modal, notification, Space, Typography } from '@tenx-ui/materials';
import { getUnifiedHistory } from '@tenx-ui/utils/es/UnifiedLink/index.prod';
import React from 'react';
import utils from '../../../../utils/__utils';

export interface RowData {
  name: string;
  namespace: string;
}
interface PublishProps {
  open?: boolean;
  setOpen?: (open?: boolean) => void;
  refresh?: () => void;
  type?: string;
  data?: RowData;
}
const Publish: React.FC<PublishProps> = props => {
  const { open, setOpen, data } = props;
  const title = '删除';
  const history = getUnifiedHistory();

  return (
    <Modal
      open={open}
      title={`${title}应用`}
      onCancel={() => setOpen(false)}
      onOk={async () => {
        try {
          await utils.bff.deleteApplication({
            input: {
              name: data?.name,
              namespace: data?.namespace,
            },
          });
          setOpen(false);
          notification.success({
            message: '删除应用成功',
          });
          history.go(-1);
        } catch (error) {
          notification.warnings({
            message: '删除应用失败',
            errors: error?.response?.errors,
          });
        }
      }}
      destroyOnClose
    >
      <Alert
        message={
          <Space align="center" direction="horizontal">
            <Typography.Paragraph ellipsis={true}>确定删除 </Typography.Paragraph>
            <Typography.Paragraph ellipsis={true} style={{ padding: '0 4px' }}>
              {data?.displayName}({data?.name})
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
