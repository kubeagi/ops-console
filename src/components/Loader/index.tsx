/*
 * Licensed Materials - Property of tenxcloud.com
 * (C) Copyright 2018 TenxCloud. All Rights Reserved.
 * ----
 * loader
 *
 * @author Vsion
 * @date 2022-12-19
 */

import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import classNames from 'classnames';
import React from 'react';
import './index.less';

export interface LoaderProps {
  spinning?: boolean;
  fullScreen?: boolean;
  text?: string;
}

const Loader: React.FC<LoaderProps> = props => {
  const { spinning, fullScreen, text } = props;
  return (
    <div
      className={classNames('loader', {
        hidden: !spinning,
        fullScreen: fullScreen,
      })}
    >
      <div className="wrapper">
        <Spin indicator={<LoadingOutlined className="spin" spin />} />
        <div className="text">{text || 'LOADING'}</div>
      </div>
    </div>
  );
};

export default Loader;
