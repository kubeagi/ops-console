import FormHelper from '@tenx-ui/form-helper';
import { Modal } from '@tenx-ui/materials';
import { Form, Input } from 'antd';
import React, { useReducer } from 'react';

import styles from './index.less';

export interface RowData {}
interface PublishProps {
  open?: boolean;
  setOpen?: (open?: boolean) => void;
  refresh?: () => void;
  type?: string;
  data?: RowData;
}
const Publish: React.FC<PublishProps> = props => {
  const [form] = Form.useForm();
  const { open, setOpen, refresh, type, data } = props;
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
  const title = '发布';
  const handelBlur = () => {
    forceUpdate();
  };

  return (
    <Modal
      destroyOnClose
      onCancel={() => setOpen(false)}
      onOk={() => {
        form.validateFields().then(async values => {
          setOpen(false);
          refresh && refresh();
        });
      }}
      open={open}
      title={`${title}应用`}
    >
      <FormHelper>
        <Form className={styles.form} form={form} labelAlign="left" labelCol={{ span: 5 }}>
          <Form.Item
            label="模型应用名称"
            name="name"
            required
            rules={[
              {
                validator: (_, value, callback) => {
                  if (!value) {
                    return callback('请输入模型应用名称');
                  }
                  return callback();
                },
              },
            ]}
          >
            <Input
              disabled={type === 'edit'}
              onBlur={handelBlur}
              placeholder="请输入模型应用名称"
            />
          </Form.Item>
        </Form>
      </FormHelper>
    </Modal>
  );
};

export default Publish;
