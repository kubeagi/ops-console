import FormHelper from '@tenx-ui/form-helper';
import { Modal } from '@tenx-ui/materials';
import { Form, Input, Upload } from 'antd';
import React, { useEffect, useReducer } from 'react';
import styles from './index.less';

export interface RowData {}
interface EditProps {
  open?: boolean;
  setOpen?: (open?: boolean) => void;
  refresh?: () => void;
  type?: string;
  data?: RowData;
}
const Edit: React.FC<EditProps> = props => {
  const [form] = Form.useForm();
  const { open, setOpen, refresh, type, data } = props;
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
  const title = type === 'add' ? '新建' : '编辑';
  const handelBlur = () => {
    forceUpdate();
  };
  useEffect(() => {
    data && type === 'edit' && form.setFieldsValue(data);
  }, [data, form, type]);
  return (
    <Modal
      open={open}
      title={`${title}应用`}
      onCancel={() => setOpen(false)}
      onOk={() => {
        form.validateFields().then(async values => {
          setOpen(false);
          refresh && refresh();
        });
      }}
      destroyOnClose
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
              placeholder="请输入模型应用名称"
              onBlur={handelBlur}
            />
          </Form.Item>
          <Form.Item
            label="模型应用别名"
            name="displayName"
            required
            rules={[
              {
                validator: (_, value, callback) => {
                  if (!value) {
                    return callback('请输入模型应用别名');
                  }
                  return callback();
                },
              },
            ]}
          >
            <Input placeholder="请输入模型应用别名" onBlur={handelBlur} />
          </Form.Item>
          <Form.Item
            label="应用头像"
            name="icon"
            required
            rules={[
              {
                validator: (_, value, callback) => {
                  if (!value) {
                    return callback('请上传头像');
                  }
                  return callback();
                },
              },
            ]}
          >
            <Upload beforeUpload={() => false} accept=".jpg,.png">
              上传
            </Upload>
          </Form.Item>
          <Form.Item
            label="描述"
            name="description"
            required
            rules={[
              {
                validator: (_, value, callback) => {
                  return callback();
                },
              },
            ]}
          >
            <Input placeholder="请输入描述" />
          </Form.Item>
        </Form>
      </FormHelper>
    </Modal>
  );
};

export default Edit;
