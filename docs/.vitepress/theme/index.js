import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue' // 如果你有自定义布局

export default {
  ...DefaultTheme,
  Layout,
  enhanceApp({ app, router }) {
    // 只在客户端执行（避免 SSR 报错）
    if (typeof window === 'undefined') return

    // 确保脚本只加载一次
    const loadCloudflareAnalytics = () => {
      if (document.querySelector('script[src*="cloudflareinsights.com"]')) return

      const script = document.createElement('script')
      script.defer = true
      script.src = 'https://static.cloudflareinsights.com/beacon.min.js'
      script.dataset.cfBeacon = JSON.stringify({
        token: 'c1eff9ba2dfb4ee1a94d642fb6468ce1'
      })
      document.body.appendChild(script)
    }

    // 首次加载时执行
    loadCloudflareAnalytics()

    // 路由切换时检查（可选）
    router.onAfterRouteChanged = () => {
      loadCloudflareAnalytics()
    }
  }
}