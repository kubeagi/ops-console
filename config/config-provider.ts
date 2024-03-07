const config = {
  space: { size: 12 },
  theme: {
    token: {
      fontSize: 12,
      colorLink: '#8f1aff',
      colorError: '#f85a5a',
      borderRadius: 4,
      colorPrimary: '#8f1aff',
      colorSuccess: '#5cb85c',
      colorWarning: '#ffbf00',
      colorLinkHover: '#aa42ff',
    },
    components: {
      Row: { rowVerticalGutter: 16, rowHorizontalGutter: 16 },
      Page: {
        pagePadding: 20,
        pageBackground: 'transparent',
        pagePaddingTop: 20,
        pagePaddingBottom: 32,
      },
    },
  },
  componentSize: 'middle',
};

export default config;
