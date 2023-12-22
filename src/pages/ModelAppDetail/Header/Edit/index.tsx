import { PlusOutlined } from '@ant-design/icons';
import FormHelper from '@tenx-ui/form-helper';
import { Modal, notification } from '@tenx-ui/materials';
import { Form, Input, Upload } from 'antd';
import React, { useEffect, useReducer, useState } from 'react';
import utils from '../../../../utils/__utils';
import styles from './index.less';

export interface RowData {
  icon: string;
  name: string;
  displayName: string;
  description?: string;
  namespace: string;
}
interface EditProps {
  open?: boolean;
  setOpen?: (open?: boolean) => void;
  refresh?: () => void;
  type?: string;
  data?: RowData;
}
const getBase64 = (img, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};
const Edit: React.FC<EditProps> = props => {
  const [form] = Form.useForm();
  const { open, setOpen, refresh, type, data } = props;
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
  const [imageUrl, setImageUrl] = useState<string>();

  const title = type === 'add' ? '新建' : '编辑';
  const handelBlur = () => {
    forceUpdate();
  };
  useEffect(() => {
    if (open && data && type === 'edit') {
      form.setFieldsValue(data);
      setImageUrl(data?.icon);
    }
  }, [data, form, type, open]);

  const handleChange = info => {
    getBase64(info.file, url => {
      setImageUrl(url);
    });
  };

  return (
    <Modal
      open={open}
      title={`${title}应用`}
      onCancel={() => {
        setOpen(false);
        setImageUrl(undefined);
      }}
      onOk={() => {
        form.validateFields().then(async values => {
          try {
            await utils.bff.updateApplication({
              input: {
                ...values,
                icon: imageUrl,
                name: data?.name,
                namespace: data?.namespace,
              },
            });
            setOpen(false);
            setImageUrl(undefined);
            refresh && refresh();
            notification.success({
              message: '编辑应用成功',
            });
          } catch (error) {
            notification.warnings({
              message: '编辑应用失败',
              errors: error?.response?.errors,
            });
          }
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
            className={styles.uploadItem}
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
            <Upload
              beforeUpload={() => false}
              accept=".jpg,.png"
              onChange={handleChange}
              showUploadList={false}
              listType="picture-card"
            >
              {imageUrl ? (
                <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
              ) : (
                <div>
                  <PlusOutlined />
                </div>
              )}
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
