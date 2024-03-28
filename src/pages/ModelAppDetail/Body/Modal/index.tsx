import FormHelper from '@tenx-ui/form-helper';
import { Modal } from '@tenx-ui/materials';
import { Modal as AntdModal, Form, InputNumber, Slider, Space, notification } from 'antd';
import React, { useReducer } from 'react';

import I18N from '@/utils/kiwiI18N';

import { useModalAppDetailContext } from '../../index';
import styles from './index.less';

export interface SliderProps {
  label: React.ReactElement | string;
  name: string;
  Config: {
    initialValue: number;
    min: number;
    max?: number;
    precision: number;
    minMark?: string;
    maxMark?: string;
    minAlias?: string;
  };
  noSlider?: boolean;
  forceUpdate?: () => void;
  sliderWidth?: string;
  spaceStyle?: any;
  onChange?: (v) => void;
}
export const SliderItem: React.FC<SliderProps> = props => {
  const { form } = useModalAppDetailContext();
  const { label, name, Config, noSlider, forceUpdate, spaceStyle, onChange } = props;
  const marginBottom = 0;
  const sliderWidth = props.sliderWidth || '260px';
  const min = Config?.minAlias ? form.getFieldValue(Config?.minAlias) : Config?.min;
  return (
    <Form.Item label={label} style={{ marginBottom: noSlider ? 20 : 0 }}>
      <Space style={spaceStyle || {}}>
        {!noSlider && (
          <Form.Item
            initialValue={Config.initialValue}
            name={name}
            required
            style={{ marginBottom }}
          >
            <Slider
              marks={{
                [Config.min]: Config.minMark || [Config.min],
                [Config.max]: Config.maxMark || [Config.max],
              }}
              max={Config.max}
              min={min}
              onChange={v => {
                onChange && onChange(v);
                forceUpdate && forceUpdate();
              }}
              step={1 / Math.pow(10, Config.precision)}
              style={{ width: sliderWidth }}
            />
          </Form.Item>
        )}
        <Form.Item
          initialValue={Config.initialValue}
          name={name}
          required
          rules={[{ required: true, message: I18N.ModelApp.qingShuRu }]}
          style={{ marginBottom }}
        >
          <InputNumber
            max={Config.max}
            min={min}
            onChange={v => {
              onChange && onChange(v);
              forceUpdate && forceUpdate();
            }}
            placeholder={I18N.ModelApp.qingShuRu}
            precision={Config.precision}
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
  handleSave?: (values: any, configs: any) => void;
  form?: any;
  configKey: string;
  renderChildren?: (form, forceUpdate, setOpen) => React.ReactElement;
  validateNames?: string[];
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
    validateNames,
    ...otherProps
  } = props;
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
  const Component = props.footer === false ? AntdModal : Modal;
  return (
    <Component
      {...otherProps}
      onCancel={() => {
        setOpen(false);
        curForm.setFieldsValue(configs[configKey]);
      }}
      onOk={() => {
        curForm.validateFields(validateNames || undefined).then(async values => {
          try {
            setOpen(false);
            const newConfigs = {
              ...configs,
              [configKey]: {
                ...(configs?.[configKey] || []),
                ...values,
              },
            };
            setConfigs(newConfigs);
            handleSave && (await handleSave(values, newConfigs));
            // refresh && refresh();
            // notification.success({
            //   message: `${title}成功`,
            // });
          } catch {
            notification.warning({
              message: I18N.template(I18N.ModelApp.tITLE, { val1: title }),
            });
          }
        });
      }}
      open={open}
      title={title}
    >
      <FormHelper>
        <Form className={styles.form} form={curForm} labelAlign="left" labelCol={{ span: 5 }}>
          {children}
          {renderChildren && renderChildren(curForm, forceUpdate, setOpen)}
        </Form>
      </FormHelper>
    </Component>
  );
};

export default Setting;
