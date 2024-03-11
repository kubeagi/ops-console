import { createStyles } from '../utils/customTheme';

const useStyles = createStyles(({ token, css }) => {
  return {
    sendAction: css`
      padding: 0 32px;
      .keyBindings {
        font-size: 12px;
        color: ${token.colorTextDescription};
      }
      .upload-list-inline {
        display: flex;
        align-items: center;
        .ant-upload-list {
          display: flex;
          .ant-upload-list-item-container {
            .ant-upload-list-item {
              height: 20px;
              margin: 0 4px 0 0;
              border: 1px dashed ${token.colorBorderSecondary};
              .ant-upload-list-item-thumbnail {
                height: 14px;
                line-height: 14px;
                .anticon {
                  font-size: 13px;
                }
              }
            }
          }
        }
      }
    `,
  };
});

export default useStyles;
