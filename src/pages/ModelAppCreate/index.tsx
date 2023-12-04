import { Button, Col, Page, Row, Space, Typography } from '@tenx-ui/materials';
import { Avatar, Divider, List, notification, Spin, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './index.less';

const DataHandleDetail = props => {
  const [loading, setLoading] = useState(false);

  return (
    <Page style={{ marginBottom: '0px', paddingBottom: '0px' }}>
      <Row wrap={true} style={{ marginBottom: '16px' }} __component_name="Row">
        <Col span={24} __component_name="Col">
          <Space align="center" direction="horizontal" __component_name="Space">
            <Button.Back type="primary" title="" __component_name="Button.Back" />
          </Space>
          <Typography.Title
            bold={true}
            level={2}
            bordered={false}
            ellipsis={true}
            __component_name="Typography.Title"
          >
            新增模型应用
          </Typography.Title>
        </Col>
      </Row>
      <Spin spinning={loading}>
        <div>hello wrold!</div>
      </Spin>
    </Page>
  );
};

export default DataHandleDetail;
