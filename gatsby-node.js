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