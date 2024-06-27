import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd())
  let config = {
    // 根路径，也就是项目的基础路径
    base: ((undefined === env.VITE_APP_FRONT_CONTEXT_NAME) ? '/' : ('/' + env.VITE_APP_FRONT_CONTEXT_NAME + '/')),
    build: {
      // 打包输出目录，默认是 dist
      outDir: env.VITE_APP_FRONT_ROOT_PATH + '/' + env.VITE_APP_FRONT_CONTEXT_NAME,
    },
    // 插件配置
    plugins: [vue()],
    // 服务器配置
    server: (() => {
      return {
        host: "127.0.0.1",//主机号
        port: 8080,//端口号
        hmr: true,//是否开启热更新
        open: true,//项目启动成功后，是否自动打开浏览器访问
        proxy: {//代理配置
          [env.VITE_APP_BASE_API]: {
            target: env.VITE_APP_SERVER_PATH,
            changeOrigin: true,
          },
          [env.VITE_APP_FILE_API]: {
            target: env.VITE_APP_FILE_SERVER_PATH,
            changeOrigin: true
          }
        }
      }
    })(),
    // resolve是node_modules中的path里面的pash.js提供的一个解析路径的方法，他总是返回一个以相对于当前的工作目录的绝对路径
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "./src/style/variables.module.scss" as *;' // 添加公共样式
        }
      }
    }
  }
  return config
})
