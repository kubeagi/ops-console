import { Alert, Modal, Space, Typography, notification } from '@tenx-ui/materials';
import { getUnifiedHistory } from '@tenx-ui/utils/es/UnifiedLink/index.prod';
import React from 'react';

import I18N from '@/utils/kiwiI18N';

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
  const title = I18N.DataHandle.shanChu;
  const history = getUnifiedHistory();

  return (
    <Modal
      destroyOnClose
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
            message: I18N.ModelApp.shanChuZhiNengTi2,
          });
          history.go(-1);
        } catch (error) {
          notification.warnings({
            message: I18N.ModelApp.shanChuZhiNengTi,
            errors: error?.response?.errors,
          });
        }
      }}
      open={open}
      title={I18N.template(I18N.ModelApp.tITLE2, { val1: title })}
    >
      <Alert
        message={
          <Space align="center" direction="horizontal">
            <Typography.Paragraph ellipsis={true}>
              {I18N.ModelApp.queDingShanChu}
            </Typography.Paragraph>
            <Typography.Paragraph ellipsis={true} style={{ padding: '0 4px' }}>
              {data?.displayName}({data?.name})
            </Typography.Paragraph>
            <Typography.Paragraph ellipsis={true}> {I18N.ModelApp.ma}</Typography.Paragraph>
          </Space>
        }
        showIcon={true}
        type="warning"
      />
    </Modal>
  );
};

export default Publish;
