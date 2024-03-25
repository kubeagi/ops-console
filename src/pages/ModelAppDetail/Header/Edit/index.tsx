import { PlusOutlined } from '@ant-design/icons';
import FormHelper from '@tenx-ui/form-helper';
import { Modal, notification } from '@tenx-ui/materials';
import { Form, Input, Select, Upload } from 'antd';
import React, { useEffect, useReducer, useState } from 'react';

import I18N from '@/utils/kiwiI18N';

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

  const title = type === 'add' ? I18N.ModelApp.xinJian : I18N.ModelApp.bianJi;
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
              message: I18N.ModelApp.bianJiZhiNengTi2,
            });
          } catch (error) {
            notification.warnings({
              message: I18N.ModelApp.bianJiZhiNengTi,
              errors: error?.response?.errors,
            });
          }
        });
      }}
      open={open}
      title={I18N.template(I18N.ModelApp.tITLE3, { val1: title })}
    >
      <FormHelper>
        <Form className={styles.form} form={form} labelAlign="left" labelCol={{ span: 5 }}>
          <Form.Item
            label={I18N.ModelApp.zhiNengTiMingCheng}
            name="name"
            required
            rules={[
              {
                validator: (_, value, callback) => {
                  if (!value) {
                    return callback(I18N.ModelApp.qingShuRuZhiNeng2);
                  }
                  return callback();
                },
              },
            ]}
          >
            <Input
              disabled={type === 'edit'}
              onBlur={handelBlur}
              placeholder={I18N.ModelApp.qingShuRuZhiNeng2}
            />
          </Form.Item>
          <Form.Item
            label={I18N.ModelApp.zhiNengTiBieMing}
            name="displayName"
            required
            rules={[
              {
                validator: (_, value, callback) => {
                  if (!value) {
                    return callback(I18N.ModelApp.qingShuRuZhiNeng);
                  }
                  return callback();
                },
              },
            ]}
          >
            <Input onBlur={handelBlur} placeholder={I18N.ModelApp.qingShuRuZhiNeng} />
          </Form.Item>
          <Form.Item
            className={styles.uploadItem}
            label={I18N.ModelApp.zhiNengTiTouXiang}
            name="icon"
            required
            rules={[
              {
                validator: (_, value, callback) => {
                  if (!value) {
                    return callback(I18N.ModelApp.qingShangChuanTouXiang);
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
            label={I18N.ModelApp.zhiNengTiFenLei}
            name="category"
            rules={[
              {
                validator: (_, value, callback) => {
                  return callback();
                },
              },
            ]}
          >
            <Select placeholder={I18N.ModelApp.qingXuanZeZhiNeng}>
              {[
                I18N.ModelApp.tongYongDuiHua,
                I18N.ModelApp.gongZuoXueXi,
                I18N.ModelApp.neiRongChuangZuo,
                I18N.ModelApp.youXiDongMan,
                I18N.ModelApp.aIHuiHua,
                I18N.ModelApp.yingYinShengCheng,
                I18N.ModelApp.jueSeBanYan,
                I18N.ModelApp.shengHuoQuWei,
                I18N.ModelApp.qiTa,
              ].map(item => (
                <Select.Option key={item}>{item}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label={I18N.ModelApp.miaoShu}
            name="description"
            rules={[
              {
                validator: (_, value, callback) => {
                  return callback();
                },
              },
            ]}
          >
            <Input placeholder={I18N.ModelApp.qingShuRuMiaoShu} />
          </Form.Item>
        </Form>
      </FormHelper>
    </Modal>
  );
};

export default Edit;
