import { chatMaxWidth, createGlobalStyle, createStyles } from './utils/customTheme';

const vars = {
  inputAreaHeight: '150px',
  chatWidth: `calc(100% - 48px)`,
};

export const GlobalStyles = createGlobalStyle`
  #root {
    min-height: 100% !important;
  }
  .tenx-icon {
    display: inline-block;

    font-style: normal;
    line-height: 0;
    text-align: center;
    text-transform: none;
    text-rendering: optimizelegibility;
    vertical-align: -0.125em;

    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .tenx-icon-spin .tenx-icon-svg {
    animation: loadingCircle 1s infinite linear;
  }
  .tenx-icon-svg {
    user-select: none;

    overflow: hidden;
    flex-shrink: 0;

    width: 1em;
    height: 1em;

    fill: currentcolor;

    -ms-flex-negative: 0;
  }
`;

const useStyles = createStyles(({ token, css }) => {
  return {
    chatComponent: css`
      display: flex;
      flex-grow: 2;
      align-items: flex-end;
      height: 100%;
      .chatColumn {
        position: relative;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;

        width: 100%;
        height: calc(100vh - 100px);
        padding: 24px 0;

        background: #f5f8fc;
        border: 1px solid ${token.colorSplit};
        border-left-width: 0;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
        .chatList {
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          align-items: center;

          width: ${vars.chatWidth};
          height: calc(100% - ${vars.inputAreaHeight} + 12px);
          & > div {
            width: 100%;
            max-width: ${chatMaxWidth};
          }
          article > *:last-child {
            margin-bottom: unset;
          }
          .customAvatar {
            font-size: 32px;
            color: ${token.colorPrimary};
          }
          .showRespInfo {
            margin-top: 18px;
          }
          .extraMsg {
            margin: 8px 0 4px;
          }
        }
        .stop {
          display: block;
          margin: 0 auto;
        }
        .inputArea {
          display: flex;
          width: ${vars.chatWidth};
          max-width: ${chatMaxWidth};
          & > div {
            position: unset !important;
            background: ${token.colorBgBase};
          }
          section > div:last-child > div:last-child {
            display: flex;
            justify-content: flex-end;
            width: 100%;
            padding-right: 16px;
            div:first-child {
              display: flex;
              align-items: center;
            }
          }
        }
      }
      .chatDebug {
        height: calc(100vh - 278px);
      }
      .chatDebugisPublic {
        height: calc(100vh - 255px);
      }
      .gpts {
        height: calc(100vh);
      }

      .chatDark {
        background: #191919;
        border-color: #353535;
      }
    `,
  };
});

export default useStyles;

export const useChatContainerStyles = createStyles(({ css }) => {
  return {
    chatSpin: css`
      display: flex;
      align-items: center;
      justify-content: center;

      width: 100%;
      height: calc(100vh - 350px);
    `,
  };
});
