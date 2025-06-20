import Layout from './Layout.vue'

export default {
  Layout,
  enhanceApp({ app, router }) {
    router.onAfterRouteChanged = () => {
      if (typeof window !== 'undefined' && !document.querySelector('script[src*="cloudflareinsights.com"]')) {
        const script = document.createElement('script')
        script.defer = true
        script.src = 'https://static.cloudflareinsights.com/beacon.min.js'
        script.dataset.cfBeacon = '{"token": "c1eff9ba2dfb4ee1a94d642fb6468ce1"}'
        document.body.appendChild(script)
      }
    }
  }
}