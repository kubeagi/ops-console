import FormHelper from '@tenx-ui/form-helper';
import { Modal } from '@tenx-ui/materials';
import { Form, InputNumber, notification, Slider, Space } from 'antd';
import React, { useEffect, useReducer } from 'react';
import { useModalAppDetailContext } from '../../index';
import styles from './index.less';

export interface SliderProps {
  label: React.ReactElement | string;
  name: string;
  Config: {
    initialValue: number;
    min: number;
    max: number;
    precision: number;
    minMark?: string;
    maxMark?: string;
  };
}
export const SliderItem: React.FC<SliderProps> = props => {
  const { label, name, Config } = props;
  const marginBottom = 0;
  const sliderWidth = '260px';
  return (
    <Form.Item label={label} style={{ marginBottom }}>
      <Space>
        <Form.Item
          style={{ marginBottom }}
          initialValue={Config.initialValue}
          name={name}
          required
          rules={[{ required: true, message: `请输入` }]}
        >
          <Slider
            min={Config.min}
            max={Config.max}
            step={1 / Math.pow(10, Config.precision)}
            style={{ width: sliderWidth }}
            marks={{
              [Config.min]: Config.minMark || [Config.min],
              [Config.max]: Config.maxMark || [Config.max],
            }}
          />
        </Form.Item>
        <Form.Item
          style={{ marginBottom }}
          initialValue={Config.initialValue}
          name={name}
          required
          rules={[{ required: true, message: `请输入` }]}
        >
          <InputNumber
            min={Config.min}
            max={Config.max}
            precision={Config.precision}
            placeholder={`请输入`}
          />
        </Form.Item>
      </Space>
    </Form.Item>
  );
};

export interface RowData {}
export interface SettingProps {
  open?: boolean;
  setOpen?: (open?: boolean) => void;
  refresh?: () => void;
  type?: string;
  data?: RowData;
  title?: string;
  children?: React.ReactElement;
  handleSave?: (values: any) => void;
  form?: any;
  configKey: string;
  renderChildren?: (form, forceUpdate) => React.ReactElement;
}
const Setting: React.FC<SettingProps> = props => {
  const { configs, setConfigs } = useModalAppDetailContext();
  const [form] = Form.useForm();
  const curForm = props.form || form;
  const {
    renderChildren,
    open,
    setOpen,
    refresh,
    type,
    data,
    title,
    children,
    handleSave,
    configKey,
    ...otherProps
  } = props;
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
  return (
    <Modal
      {...otherProps}
      open={open}
      title={title}
      onCancel={() => {
        setOpen(false);
        curForm.setFieldsValue(configs[configKey]);
      }}
      onOk={() => {
        curForm.validateFields().then(async values => {
          try {
            setOpen(false);
            setConfigs({
              ...(configs || {}),
              [configKey]: {
                ...(configs?.[configKey] || []),
                ...values,
              },
            });
            handleSave && (await handleSave(values));
            // refresh && refresh();
            // notification.success({
            //   message: `${title}成功`,
            // });
          } catch (error) {
            notification.warning({
              message: `${title}失败`,
            });
          }
        });
      }}
    >
      <FormHelper>
        <Form className={styles.form} form={curForm} labelAlign="left" labelCol={{ span: 5 }}>
          {children}
          {renderChildren && renderChildren(curForm, forceUpdate)}
        </Form>
      </FormHelper>
    </Modal>
  );
};

export default Setting;
