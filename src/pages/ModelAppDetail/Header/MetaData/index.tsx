import { Descriptions, Modal, Typography } from '@tenx-ui/materials';
import { getUnifiedHistory } from '@tenx-ui/utils/es/UnifiedLink/index.prod';
import React from 'react';

import I18N from '@/utils/kiwiI18N';

import utils from '../../../../utils/__utils';
import styles from '../index.less';

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

  const { data: gptCategoryData } = utils.bff.useListGptCategory();
  const categories = gptCategoryData?.GPT?.listGPTCategory || [];
  return (
    <Modal
      className={styles.metadataModal}
      destroyOnClose
      footer={[]}
      onCancel={() => setOpen(false)}
      open={open}
      title={'基本信息'}
    >
      <Descriptions
        bordered={false}
        borderedBottom={false}
        borderedBottomDashed={false}
        colon={false}
        column={2}
        items={[
          {
            key: 'name',
            span: 1,
            label: '智能体分类',
            children: (
              <Typography.Text disabled={false} strong={false} style={{ maxWidth: 200 }}>
                {
                  categories?.find(
                    item =>
                      item.id === data?.annotations?.['arcadia.kubeagi.k8s.com.cn/app-category']
                  )?.name
                }
              </Typography.Text>
            ),
          },
          {
            key: 'ID',
            span: 1,
            label: 'ID',
            children: (
              <Typography.Text
                disabled={false}
                ellipsis={{ tooltip: data?.id || '-' }}
                strong={false}
                style={{ maxWidth: 200 }}
              >
                {data?.id}
              </Typography.Text>
            ),
          },
          {
            key: 'creationTimestamp',
            span: 2,
            label: '创建时间',
            children: (
              <Typography.Time format="" relativeTime={false} time={data?.creationTimestamp} />
            ),
          },
          {
            key: 'descripton',
            span: 1,
            label: '描述',
            children: (
              <Typography.Text
                ellipsis={{ tooltip: data?.description || '-' }}
                strong={false}
                style={{ maxWidth: 400 }}
              >
                {data?.description || '-'}
              </Typography.Text>
            ),
          },
        ]}
        labelStyle={{ width: 100 }}
        layout="horizontal"
        size="default"
      />
    </Modal>
  );
};

export default Publish;
