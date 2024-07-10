export default {
    root: './',
    build: {
        outDir: 'dist',
    },
    publicDir: 'public',
    server: {
        host: true,
        port: '80',
        hmr: {
            protocol: 'ws',
            host: 'localhost',
            port: 80
        }
    }
}
