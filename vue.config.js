module.exports = {
    lintOnSave: false,
    productionSourceMap: false,
    publicPath: process.env.NODE_ENV === 'production'
        ? '/'
        : '/',
    outputDir: "./dist",
    css: {
        loaderOptions: {
            scss: {
                additionalData: '@import "@/style/main.scss";'
            }
        }
    },
    transpileDependencies: [
        'vuetify'
    ],
    chainWebpack: config => {
    config.performance
        .maxEntrypointSize(90000000000)
        .maxAssetSize(90000000000)
    }
}
