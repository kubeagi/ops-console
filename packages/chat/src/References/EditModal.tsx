/**
 * Licensed Materials - Property of k8s.com.cn
 * (C) Copyright 2024 KubeAGI. All Rights Reserved.
 */

/**
 * Chat
 * @author zggmd
 * @date 2024-03-21
 */
import { Form, Input, InputNumber, Modal, notification } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React, { FC, useCallback, useContext, useMemo } from 'react';

import { RootContext } from '../index';
import I18N from '../utils/kiwiI18N';
import request from '../utils/request';
import { Reference } from './index';

interface IEditModal {
  data: EditData;
  setData: any;
}
export type EditData = {
  visible: boolean;
  reference?: Reference;
};
type FieldType = {
  q: string;
  a: string;
  fileName?: string;
  lineNumber?: number;
  thunkContent?: string;
};

const EditModal: FC<IEditModal> = props => {
  const { appName, appNamespace } = useContext(RootContext);
  const { data, setData } = props;
  const [form] = useForm();
  const onOk = useCallback(() => {
    const fetch = async (values: FieldType) => {
      const res = await request
        .put({
          url: `/bff/versioneddataset/files/edit`,
          options: {
            body: {
              // @ts-ignore
              bucket: appName,
              bucketPath: '',
              fileName: data.reference?.qa_file_path,
              updateLines: [
                {
                  lineNumber: values.lineNumber,
                  values: [
                    values.q || '',
                    values.a || '',
                    data.reference?.file_name || '',
                    String(values.lineNumber || ''),
                    values.thunkContent || '',
                  ],
                },
              ],
            },
            headers: {
              namespace: appNamespace,
            },
          },
        })
        .catch(() => {
          notification.warning({ message: I18N.Chat.bianJiShuJuShiBai });
        });
      if (typeof res === 'string') {
        notification.success({ message: I18N.Chat.bianJiShuJuChengGong });
        setData({
          visible: false,
          reference: undefined,
        });
      }
    };
    form.validateFields().then(fetch);
  }, [form, appName, appNamespace, data, setData]);
  const onCancel = useCallback(() => {
    setData({
      visible: false,
      reference: undefined,
    });
  }, [setData]);
  const initV = useMemo((): FieldType | undefined => {
    if (!data.reference) return undefined;
    return {
      q: data.reference?.question,
      a: data.reference?.answer,
      fileName: data.reference?.file_name,
      lineNumber: data.reference?.page_number || undefined,
      thunkContent: data.reference?.content,
    };
  }, [data.reference]);
  if (!data?.reference) return <></>;
  return (
    <>
      <Modal
        onCancel={onCancel}
        onOk={onOk}
        open={data.visible}
        style={{ maxWidth: 800 }}
        title={I18N.Chat.bianJiShuJu}
        width="90%"
      >
        <Form autoComplete="off" form={form} initialValues={initV} layout="vertical" name="basic">
          <Form.Item<FieldType>
            label={I18N.Chat.beiSouSuoDe}
            name="q"
            rules={[{ required: true, message: I18N.Chat.QingShuRuBeiSouSuoDe }]}
          >
            <Input.TextArea placeholder={I18N.Chat.oneDangQian} rows={3} />
          </Form.Item>
          <Form.Item<FieldType>
            label={I18N.Chat.piPeiNeiRong}
            name="a"
            rules={[{ required: true, message: I18N.Chat.qingShuRuPiPeiNeiRong }]}
          >
            <Input.TextArea placeholder={I18N.Chat.ciChu} rows={5} />
          </Form.Item>
          <Form.Item style={{ marginBottom: 0 }}>
            <Form.Item<FieldType>
              label={I18N.Chat.wenJianMing}
              name="fileName"
              style={{ display: 'inline-block', width: 'calc(50% - 8px)', marginRight: 16 }}
            >
              <Input disabled placeholder={I18N.Chat.ciChuTian} />
            </Form.Item>
            <Form.Item<FieldType>
              label={I18N.Chat.yeMa}
              name="lineNumber"
              style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
            >
              <InputNumber
                disabled
                placeholder={I18N.Chat.ciChuTianYuanWen}
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Form.Item>
          <Form.Item<FieldType> label={I18N.Chat.yuanWenDuanLuo} name="thunkContent">
            <Input.TextArea disabled placeholder={I18N.Chat.ciChuYuanWen} rows={6} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default EditModal;
