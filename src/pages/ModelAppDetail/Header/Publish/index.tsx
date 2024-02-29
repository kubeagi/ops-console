import FormHelper from '@tenx-ui/form-helper';
import { AlipayMiniProgram } from '@tenx-ui/icon';
import { Modal, Typography, notification } from '@tenx-ui/materials';
import { Checkbox, Flex, Form } from 'antd';
import React, { useReducer } from 'react';

import I18N from '@/utils/kiwiI18N';

import utils from '../../../../utils/__utils';
import styles from './index.less';

const PLATS_MAPS = [
  {
    id: 'AgileGPT',
    name: 'AgileGPT',
    description: I18N.ModelApp.yongHuJiangHuiZai,
    Icon: AlipayMiniProgram,
  },
  // {
  //   id: '微信小程序',
  //   name: '微信小程序',
  //   description: '用户将会在微信小程序中看到此应用，点击即可进行对话交互',
  //   Icon: WechatMiniProgram,
  // },
  // {
  //   id: '支付宝小程序',
  //   name: '支付宝小程序',
  //   description: '用户将会在支付宝小程序中看到此应用，点击即可进行对话交互',
  //   Icon: AlipayMiniProgram,
  // }
];
interface DataSource {
  id: string;
  name: string;
  description: string;
  Icon: (props: any) => React.ReactElement;
}
interface PlatPanelProps {
  value?: string[];
  dataSource: DataSource[];
  form: any;
  defaultValue?: string[];
  name: string;
  onChange?: (value: string[]) => void;
  forceUpdate?: () => void;
}

const PlatPanel: React.FC<PlatPanelProps> = props => {
  const { value, dataSource, defaultValue, form, forceUpdate } = props;

  return dataSource?.map((data: DataSource) => {
    const { id, name, description, Icon } = data;
    const checked = value?.includes(id);
    const disabled = defaultValue?.includes(id);
    return (
      <Flex
        className={`${styles.Panel} ${checked && styles.PanelChecked} ${disabled && styles.PanelDisabled}`}
        key={id}
        onClick={() => {
          if (disabled) return;
          const newValue = value?.includes(id)
            ? value.filter(v => v !== id)
            : (value || []).concat(id);
          form.setFieldsValue({
            plats: newValue,
          });
          setTimeout(() => {
            forceUpdate();
          }, 200);
        }}
      >
        <Checkbox checked={checked} disabled={disabled}></Checkbox>
        <Icon className={styles.icon} />
        <div className={styles.content}>
          <Typography.Title className={styles.name} level={4}>
            {name}
          </Typography.Title>
          <Typography.Paragraph className={styles.description}>{description}</Typography.Paragraph>
        </div>
      </Flex>
    );
  });
};

export interface RowData {
  metadata: {
    annotations: any;
    isPublic: boolean;
    name: string;
    namespace: string;
    displayName?: string;
    description?: string;
    icon?: string;
    category: string[];
  };
}
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
  const title = data?.metadata?.isPublic ? I18N.ModelApp.cheXiaoFaBu : I18N.ModelApp.faBu;
  const handelBlur = () => {
    forceUpdate();
  };

  return (
    <Modal
      destroyOnClose
      onCancel={() => setOpen(false)}
      onOk={() => {
        form.validateFields().then(async values => {
          try {
            await utils.bff.updateApplication({
              input: {
                name: data?.metadata?.name,
                namespace: data?.metadata?.namespace,
                displayName: data?.metadata?.displayName,
                description: data?.metadata?.description,
                icon: data?.metadata?.icon,
                isPublic: !data?.metadata?.isPublic,
                category: data?.metadata?.annotations?.['arcadia.kubeagi.k8s.com.cn/app-category'],
              },
            });
            setOpen(false);
            refresh && refresh();
            notification.success({
              message: I18N.template(I18N.ModelApp.tITLE5, { val1: title }),
            });
          } catch (error) {
            notification.warnings({
              message: I18N.template(I18N.ModelApp.tITLE5, { val1: title }),
              errors: error?.response?.errors,
            });
          }
        });
      }}
      open={open}
      title={I18N.template(I18N.ModelApp.tITLE4, { val1: title })}
      width={720}
    >
      <FormHelper>
        <Form className={styles.form} form={form} labelAlign="left" labelCol={{ span: 4 }}>
          <Form.Item label={I18N.ModelApp.zhiNengTiMingCheng} name="name">
            {utils.getFullName(data?.metadata)}
          </Form.Item>
          <Form.Item
            initialValue={[PLATS_MAPS?.[0]?.id]}
            label={
              data?.metadata?.isPublic
                ? I18N.ModelApp.xuanZeCheXiaoPing
                : I18N.ModelApp.xuanZeFaBuPing
            }
            name="plats"
            required
            rules={[
              {
                validator: (_, value, callback) => {
                  if (!(value?.length > 0)) {
                    return callback(
                      data?.metadata?.isPublic
                        ? I18N.ModelApp.qingXuanZeCheXiao
                        : I18N.ModelApp.qingXuanZeFaBu
                    );
                  }
                  return callback();
                },
              },
            ]}
          >
            <PlatPanel
              dataSource={PLATS_MAPS}
              defaultValue={[]}
              forceUpdate={forceUpdate}
              form={form}
              name="plats"
            />
          </Form.Item>
        </Form>
      </FormHelper>
    </Modal>
  );
};

export default Publish;
