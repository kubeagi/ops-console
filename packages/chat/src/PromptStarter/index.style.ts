import { chatMaxWidth, createStyles } from '../utils/customTheme';

const useStyles = createStyles(({ token, css }) => {
  return {
    promptStart: css`
      justify-self: flex-end;
      max-width: ${chatMaxWidth};
      margin-left: 40px;
      font-size: 14px;
      .Col {
        margin-bottom: 8px;
        margin-left: 8px;
        .tag {
          cursor: pointer;

          width: 100%;
          height: 100%;
          padding: 8px;

          white-space: break-spaces;
        }
      }
    `,
  };
});

export default useStyles;
