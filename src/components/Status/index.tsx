/**
 * Licensed Materials - Property of k8s.com.cn
 * (C) Copyright 2023 KubeAGI. All Rights Reserved.
 */

/**
 *
 * @author lqq
 * @date 2023-11-30
 */
import TenxIcon from '@tenx-ui/icon/es/_old';
import React from 'react';

interface props {
  text: any;
  status: any;
}
const Status: React.FC<props> = props => {
  const { status, text } = props;
  // 0灰，1 绿，3 红
  const _c = {
    info: '#1677ff',
    success: '#5cb85c',
    error: '#f85a5a',
    default: 'rgba(0, 0, 0, 0.25)',
  }[status];
  return (
    <div style={{ color: _c, display: 'inline-block' }}>
      {_c && <TenxIcon type="Circle" />}
      <span style={{ marginLeft: 6 }}>{text}</span>
    </div>
  );
};

export default Status;
