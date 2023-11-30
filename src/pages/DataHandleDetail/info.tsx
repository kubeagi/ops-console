import type { DescriptionsProps } from 'antd';
import { Descriptions } from 'antd';
import React, { useEffect, useState } from 'react';
interface Iprops {
  data: Record<string, any>;
}
const Info: React.FC<Iprops> = props => {
  const data = props.data;

  const [items, setItems] = useState([]);

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
        children: data.pre_dataset_name,
      },
      {
        label: '处理后数据集',
        children: data.post_dataset_name,
      },
      {
        label: '创建时间',
        children: data.start_time,
      },
    ];
    setItems(_items);
  }, [data]);
  return <Descriptions items={items} column={1} labelStyle={{ width: 100 }} />;
};

export default Info;
