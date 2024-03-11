import { createStyles } from '../utils/customTheme';

const useStyles = createStyles(({ token, css }) => {
  return {
    references: css`
      margin-bottom: 12px;
      font-size: 11px;
      .referencesTxt {
        margin-top: 12px;
        margin-bottom: 12px;
        font-size: 11px;
        color: ${token.colorTextDescription};
      }
      .referencesList {
        opacity: 0.8;
        filter: brightness(0.8);
      }

      .popContent {
        width: 300px;
        .divider {
          margin: 8px 0;
        }
        .relLine {
          margin-top: 12px;
        }
        .q {
          display: inline-flex;
          margin: 12px 0;
          font-size: 13px;
        }
      }
    `,
  };
});

export default useStyles;

export const usePopoverStyles = createStyles(({ token, css }) => {
  return {
    popContent: css`
      width: 300px;
      .divider {
        margin: 8px 0;
      }
      .relLine {
        margin-top: 12px;
      }
      .q {
        display: inline-flex;
        margin: 12px 0;
        font-size: 13px;
      }
    `,
  };
});
