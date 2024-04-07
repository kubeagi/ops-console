/**
 * Licensed Materials - Property of k8s.com.cn
 * (C) Copyright 2023 KubeAGI. All Rights Reserved.
 */

/**
 * retry
 * @author zggmd
 * @date 2024-01-31
 */
import { Col, Row, Tag } from 'antd';
import * as React from 'react';
import { useContext } from 'react';

import { getUrl } from '../helper';
import { RootContext } from '../index';
import useGetCommonData from '../utils/hooks/useGetCommonData';
import useStyles from './index.style';

interface IPromptStarter {
  appName: string;
  appNamespace: string;
  onPromptClick: (prompt: string) => void;
}

const PromptStarter: React.FC<IPromptStarter> = props => {
  const { styles, cx } = useStyles();
  const { gpts } = useContext(RootContext);

  const [promptStarter] = useGetCommonData<string[]>({
    url: getUrl('/chat/prompt-starter', gpts),
    method: 'post',
    options: {
      body: {
        app_name: props.appName,
        app_namespace: props.appNamespace,
      },
      headers: {
        namespace: props.appNamespace,
      },
    },
    initValue: [],
    resStr: '',
    // notFetch: !props.conversationId,
  });
  if (!promptStarter?.length) return null;
  return (
    <>
      <Row className={cx(styles.promptStart, 'promptStart')}>
        {promptStarter.map((prompt, index) => {
          return (
            <Col className="Col" key={index} span={11}>
              <Tag className="tag" onClick={props.onPromptClick.bind('', prompt)}>
                {prompt}
              </Tag>
            </Col>
          );
        })}
      </Row>
    </>
  );
};
export default PromptStarter;
