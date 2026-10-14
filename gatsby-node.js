exports.onCreateWebpackConfig = ({
  stage,
  actions,
}) => {
  // Browser bundle only. SSR needs Gatsby's own Node built-in externals
  // (react-dom/server uses util.TextEncoder), and jQuery/WOW are imported only in
  // gatsby-browser.js.
  if (stage === 'build-html' || stage === 'develop-html') {
    return;
  }
  actions.setWebpackConfig({
    resolve: {
      fallback: {
        crypto: false,
        path: require.resolve('path-browserify'),
        stream: require.resolve('stream-browserify'),
        zlib: false,
        assert: false,
        util: false,
        http: false,
        https: false,
        os: false,
        url: false,
        fs: false,
      },
    },
    externals: {
      jquery: 'jQuery',
      WOW: 'WOW',
    },
  });
};
