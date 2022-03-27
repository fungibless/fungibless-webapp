exports.onCreateWebpackConfig = ({
    actions,
}) => {
    const { setWebpackConfig } = actions;
    setWebpackConfig({
        resolve: {
            fallback: {
                "crypto": false,
                "path": require.resolve("path-browserify"),
                "stream": require.resolve("stream-browserify"),
                "zlib": require.resolve("browserify-zlib"),
                "assert": false,
                "util": false,
                "http": false,
                "https": false,
                "os": false,
                "url": false,
                "fs": false
            },
        },
        externals: {
            jquery: 'jQuery',
            WOW: 'WOW'
        }
    })
}

exports.onCreatePage = ({ page, actions }) => {
    const { createPage } = actions;
    if (page.path === `/`) {
        page.matchPath = `/*`;
        createPage(page);
    }
};