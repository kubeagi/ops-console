/**
 * Licensed Materials - Property of k8s.com.cn
 * (C) Copyright 2023 KubeAGI. All Rights Reserved.
 */

/**
 * LoadingText
 * @author zggmd
 * @date 2024-03-15
 */
import * as React from 'react';
import { useState } from 'react';

import { createStyles } from '../utils/customTheme';

interface ILoadingText {
  // ms
  delay?: number;
  fontSize?: number;
}
const useStyles = createStyles<{ fontSize: number }>(({ css }, props) => {
  return {
    txt: css`
      font-size: ${props.fontSize}px;
    `,
  };
});

const LoadingText: React.FC<ILoadingText> = props => {
  const { delay = 500, fontSize = 18 } = props;
  const [t, setT] = useState(1);
  React.useEffect(() => {
    const timer = setInterval(() => {
      setT(t => (t + 1 > 3 ? 1 : t + 1));
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);
  const { styles } = useStyles({ fontSize });
  return <span className={styles.txt}>{'.'.repeat(t)}</span>;
};
export default LoadingText;
