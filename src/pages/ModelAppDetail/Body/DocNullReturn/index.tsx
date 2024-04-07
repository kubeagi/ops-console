import { Form, Input, Switch } from 'antd';
import React from 'react';

import docNullReturnIcon from '@/assets/img/docNullReturn.svg';
import I18N from '@/utils/kiwiI18N';

import { useModalAppDetailContext } from '../../index';
import Container from '../Container';

interface DocNullReturnProps {}

const DocNullReturn: React.FC<DocNullReturnProps> = props => {
  const { configs, setConfigs, form, disabled } = useModalAppDetailContext();
  return (
    <Container
      actions={[
        {
          key: 'switch',
          children: (
            <Form.Item name="showDocNullReturn" style={{ marginBottom: 0 }}>
              <Switch
                disabled={disabled}
                onChange={v => {
                  setConfigs({
                    ...configs,
                    DocNullReturn: {
                      ...configs?.DocNullReturn,
                      showDocNullReturn: v,
                    },
                  });
                }}
              />
            </Form.Item>
          ),
          data: {},
        },
      ]}
      changeConfig
      configKey="DocNullReturn"
      icon={<img src={docNullReturnIcon} width={14} />}
      isRowItem={!configs?.DocNullReturn?.showDocNullReturn}
      renderChildren={form => {
        return (
          form.getFieldValue('showDocNullReturn') && (
            <Form.Item
              initialValue={I18N.ModelApp.weiZhaoDaoNinXun}
              name="docNullReturn"
              rules={[
                {
                  validator: (_, value, callback) => {
                    if (value && value.length > 200) {
                      return callback(I18N.ModelApp.zuiDuoKeShuRu);
                    }
                    return callback();
                  },
                },
              ]}
              style={{ marginBottom: 8 }}
            >
              <Input.TextArea
                disabled={disabled}
                onChange={e => {
                  setConfigs({
                    ...configs,
                    DocNullReturn: {
                      ...configs?.DocNullReturn,
                      prologue: e.target.value,
                    },
                  });
                }}
                placeholder={I18N.ModelApp.meiYouSouSuoDao}
                rows={3}
              />
            </Form.Item>
          )
        );
      }}
      style={{ padding: 0 }}
      title={I18N.ModelApp.kongSouSuoHuiFu}
    ></Container>
  );
};

export default DocNullReturn;
