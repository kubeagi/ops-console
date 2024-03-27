import { ClockCircleOutlined, FilePdfOutlined } from '@ant-design/icons';
import { Button, Divider, List } from 'antd';
import React, { useEffect, useState } from 'react';

import Status from '@/components/Status';
import I18N from '@/utils/kiwiI18N';

import utils from '../../utils/__utils';
import styles from './FileStatus.less';

interface Iprops {
  data: Record<string, any>;
  getData: () => void;
  calcSpendTime: (record: any) => string;
}
const FileStatus: React.FC<Iprops> = props => {
  const statuesMap = {
    doing: {
      text: I18N.DataHandle.chuLiZhong,
      status: 'info',
    },
    success: {
      text: I18N.DataHandle.chuLiChengGong,
      status: 'success',
    },
    fail: {
      text: I18N.DataHandle.chuLiShiBai,
      status: 'error',
    },
    not_start: {
      text: I18N.DataHandle.weiChuLi,
      status: 'default',
    },
  };
  const file_details = props.data.file_details;
  const { calcSpendTime } = props;
  const [items, setItems] = useState([]);
  const [fileStatusCount, setFileStatusCount] = useState({
    success: 0,
    not_start: 0,
    doing: 0,
    fail: 0,
  });
  const [fileTotal, setTotal] = useState(0);

  useEffect(() => {
    setTotal(file_details?.length);
    const statusCount = { success: 0, not_start: 0, doing: 0, fail: 0 };
    const _items = file_details?.map((item, index) => {
      statusCount[item.status] = statusCount[item.status] + 1;
      return {
        key: index,
        label: (
          <div className={styles.label}>
            <div className={styles.icon}>
              <FilePdfOutlined />
            </div>
            <div>
              <span className={styles.title}>{item.file_name}</span>
              <br />
              <span className={styles.size}> {item.file_size ? item.file_size : '-MB'}</span>
            </div>

            <div>
              <Status {...statuesMap[item.status]} />
            </div>
            <div>
              <span className={styles.time}>
                <ClockCircleOutlined />
              </span>
              <span>{calcSpendTime(item)}</span>
            </div>
          </div>
        ),
      };
    });
    setFileStatusCount(statusCount);
    // setItems(_items);
  }, [file_details]);

  const onRetry = () => {
    const record = props.data;
    utils.bff
      .dataProcessRetry({
        input: {
          id: record.id,
          creator: utils.getAuthData()?.user?.name,
        },
      })
      .then(res => {
        utils.notification.success({
          message: res.dataProcess.dataProcessRetry.message,
        });
        props.getData();
      })
      .catch(error => {
        utils.notification.warn({
          message: '重试失败',
        });
      });
  };

  return (
    <div>
      <Button className={styles.reloadBtn} onClick={props.getData}>
        {I18N.DataHandle.shuaXin}
      </Button>
      <div style={{ display: 'flex' }}>
        <div
          dangerouslySetInnerHTML={{
            __html: I18N.template(I18N.DataHandle.fileStatusCount, {
              total: fileTotal,
              success: fileStatusCount.success,
              not_start: fileStatusCount.not_start,
              doing: fileStatusCount.doing,
              fail: fileStatusCount.fail,
            }),
          }}
        ></div>
        {props.data.status === 'process_fail' ? (
          <a className={styles.retry} onClick={onRetry}>
            {I18N.DataHandle.chongShi}
          </a>
        ) : (
          ''
        )}
      </div>
      <List
        dataSource={file_details}
        itemLayout="horizontal"
        renderItem={(item, index) => (
          <List.Item className={styles.label}>
            <List.Item.Meta
              avatar={
                <div className={styles.icon}>
                  <FilePdfOutlined />
                </div>
              }
              description={
                <span className={styles.size}> {item.file_size ? item.file_size : '-MB'}</span>
              }
              title={
                <>
                  <span className={styles.title}>{item.file_name}</span>
                  <Divider type="vertical" />
                  <Status {...statuesMap[item.status]} />
                  <Divider type="vertical" />
                  <span className={styles.time}>
                    <ClockCircleOutlined />
                  </span>
                  <span>{item.status === 'not_start' ? '0 s' : calcSpendTime(item)}</span>
                </>
              }
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default FileStatus;
