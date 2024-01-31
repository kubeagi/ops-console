import { PlusOutlined } from '@ant-design/icons';
import FormHelper from '@tenx-ui/form-helper';
import { Modal, notification } from '@tenx-ui/materials';
import { Form, Input, Select, Upload } from 'antd';
import React, { useEffect, useReducer, useState } from 'react';

import utils from '../../../../utils/__utils';
import styles from './index.less';

export interface RowData {
  category: any;
  annotations: any;
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
      data.category = data?.annotations?.['arcadia.kubeagi.k8s.com.cn/app-category'];
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
      destroyOnClose
      onCancel={() => {
        setOpen(false);
        setImageUrl();
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
            setImageUrl();
            refresh && refresh();
            notification.success({
              message: '编辑智能体成功',
            });
          } catch (error) {
            notification.warnings({
              message: '编辑智能体失败',
              errors: error?.response?.errors,
            });
          }
        });
      }}
      open={open}
      title={`${title}智能体`}
    >
      <FormHelper>
        <Form className={styles.form} form={form} labelAlign="left" labelCol={{ span: 5 }}>
          <Form.Item
            label="智能体名称"
            name="name"
            required
            rules={[
              {
                validator: (_, value, callback) => {
                  if (!value) {
                    return callback('请输入智能体名称');
                  }
                  return callback();
                },
              },
            ]}
          >
            <Input disabled={type === 'edit'} onBlur={handelBlur} placeholder="请输入智能体名称" />
          </Form.Item>
          <Form.Item
            label="智能体别名"
            name="displayName"
            required
            rules={[
              {
                validator: (_, value, callback) => {
                  if (!value) {
                    return callback('请输入智能体别名');
                  }
                  return callback();
                },
              },
            ]}
          >
            <Input onBlur={handelBlur} placeholder="请输入智能体别名" />
          </Form.Item>
          <Form.Item
            className={styles.uploadItem}
            label="智能体头像"
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
              accept=".jpg,.png"
              beforeUpload={() => false}
              listType="picture-card"
              onChange={handleChange}
              showUploadList={false}
            >
              {imageUrl ? (
                <img alt="avatar" src={imageUrl} style={{ width: '100%' }} />
              ) : (
                <div>
                  <PlusOutlined />
                </div>
              )}
            </Upload>
          </Form.Item>
          <Form.Item
            label="智能体分类"
            name="category"
            rules={[
              {
                validator: (_, value, callback) => {
                  return callback();
                },
              },
            ]}
          >
            <Select placeholder="请选择智能体分类">
              {[
                '游戏动漫',
                '通用对话',
                '工作学习',
                '内容创作',
                'AI绘画',
                '影音生成',
                '角色扮演',
                '生活趣味',
                '其他',
              ].map(item => (
                <Select.Option key={item}>{item}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="描述"
            name="description"
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
