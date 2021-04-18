module.exports = {
    css: {
        loaderOptions: {
            sass: {
                prependData: '@import "@/assets/scss/style.scss";'
            },
        },
            sourceMap:  process.env.NODE_ENV === 'development'
    }
}