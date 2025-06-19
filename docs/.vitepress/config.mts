import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "My Docs",
  description: "A VitePress Site",
  head: [
    [
      "meta",
      {
        name:"referrer",
        content:"no-referrer"
      }
    ],
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      // { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
       {
        text: 'Distributed',
        items: [
          { text: 'aurora', link: '/distributed/aurora' },
          { text: 'craq', link: '/distributed/craq' },
          { text: 'fault-tolerant virtual machine', link: '/distributed/fault-tolerant_virtual_machine' },
          { text: 'google file system', link: '/distributed/google_file_system' },
          { text: 'zookeeper', link: '/distributed/zookeeper' },
        ]
      }
    ],
    

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],
  }
})
