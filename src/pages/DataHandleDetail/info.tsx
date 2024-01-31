import { Typography } from '@tenx-ui/materials';
import { getUnifiedHistory } from '@tenx-ui/utils/es/UnifiedLink/index.prod';
import { Descriptions } from 'antd';
import React, { useEffect, useState } from 'react';

import I18N from '@/utils/kiwiI18N';

interface Iprops {
  data: Record<string, any>;
}
const Info: React.FC<Iprops> = props => {
  const data = props.data;

  const [items, setItems] = useState([]);
  const history = getUnifiedHistory();
  const Link = path => {
    history.push(path);
  };
  useEffect(() => {
    const _items = [
      {
        label: 'ID',
        children: data.id,
      },
      {
        label: I18N.DataHandle.wenJianLeiXing,
        children:
          data.file_type === 'text' ? I18N.DataHandle.puTongWenBen : I18N.DataHandle.qAWenBen,
      },
      {
        label: I18N.DataHandle.chuLiQianShuJu,
        children: (
          <>
            <a onClick={() => Link('/dataset/detail/' + data.pre_dataset_name)}>
              {data.pre_dataset_name}
            </a>
            ---
            <a
              onClick={() =>
                Link(
                  '/dataset/detail/' +
                    data.pre_dataset_name +
                    '/version/' +
                    data.pre_dataset_name +
                    '-' +
                    data.pre_dataset_version
                )
              }
            >
              {data.pre_dataset_version}
            </a>
          </>
        ),
      },
      {
        label: I18N.DataHandle.chuLiHouShuJu,
        children: (
          <>
            <a onClick={() => Link('/dataset/detail/' + data.post_dataset_name)}>
              {data.post_dataset_name}
            </a>
            ---
            <a
              onClick={() =>
                Link(
                  '/dataset/detail/' +
                    data.post_dataset_name +
                    '/version/' +
                    data.post_dataset_name +
                    '-' +
                    data.post_dataset_version
                )
              }
            >
              {data.post_dataset_version}
            </a>
          </>
        ),
      },
      {
        label: I18N.DataHandle.chuangJianRen,
        children: data.creator,
      },
      {
        label: I18N.DataHandle.chuangJianShiJian,
        children: (
          <Typography.Time
            __component_name="Typography.Time"
            format="YYYY-MM-DD HH:mm:ss"
            relativeTime={false}
            time={data.start_time}
          />
        ),
      },
    ];
    setItems(_items);
  }, [data]);
  return <Descriptions column={1} items={items} labelStyle={{ width: 100 }} />;
};

export default Info;
