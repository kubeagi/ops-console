import { getUnifiedHistory } from '@tenx-ui/utils/es/UnifiedLink/index.prod';
import { Descriptions } from 'antd';
import React, { useEffect, useState } from 'react';

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
        label: '任务类型',
        children: data.file_type === 'text' ? '普通文本' : 'QA文本',
      },
      {
        label: '处理前数据集',
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
        label: '处理后数据集',
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
        label: '创建人',
        children: data.creator,
      },
      {
        label: '创建时间',
        children: data.start_time,
      },
    ];
    setItems(_items);
  }, [data]);
  return <Descriptions column={1} items={items} labelStyle={{ width: 100 }} />;
};

export default Info;
