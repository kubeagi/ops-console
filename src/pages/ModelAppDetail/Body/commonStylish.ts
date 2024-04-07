// 创建通用的 stylish 函数
import { createStylish } from 'antd-style';

export const useStylish = createStylish(({ token, css }) => {
  return {
    link: css`
      cursor: pointer;
      color: ${token.colorLink};

      &:hover {
        color: ${token.colorLinkHover};
      }
    `,
    ItemCanSelectPrimary: css`
      cursor: pointer;

      &:hover {
        border: 1px solid ${token.colorLinkHover};
      }
    `,
    ItemSelectedPrimary: css`
      border: 1px solid ${token.colorPrimary};
    `,
    hover: css`
      cursor: pointer;
      &:hover {
        color: ${token.colorLinkHover};
      }
    `,
    linkColor: css`
      color: ${token.colorLink};
    `,
    Audio: css`
      &:hover {
        color: ${token.colorLinkHover};
        svg {
          color: ${token.colorLinkHover};
        }
      }
    `,
  };
});
