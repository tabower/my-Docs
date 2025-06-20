import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "My Docs",
  description: "A VitePress Site",
  head: [
    [
      "meta",
      {
        name: "referrer",
        content: "no-referrer"
      }
    ],
    [
      "script",
      {
        defer: "", // 或 `defer: ""` 如果报类型错误
        src: "https://static.cloudflareinsights.com/beacon.min.js",
        "data-cf-beacon": JSON.stringify({
          token: "c1eff9ba2dfb4ee1a94d642fb6468ce1",
        }),
      },
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
        link: '/distributed/index',
        items: [
          { text: 'aurora', link: '/distributed/aurora' },
          { text: 'craq', link: '/distributed/craq' },
          { text: 'fault-tolerant virtual machine', link: '/distributed/fault-tolerant_virtual_machine' },
          { text: 'google file system', link: '/distributed/google_file_system' },
          { text: 'zookeeper', link: '/distributed/zookeeper' },
        ]
      },
      {
        text: 'ask',
        link: '/ask/index',
        items: [
          { text: '中断处理', link: '/ask/中断处理' },
          { text: '虚存管理', link: '/ask/虚存管理' },
          { text: '内存分配', link: '/ask/内存分配' },
          { text: '内核模块', link: '/ask/内核模块' },
        ]
      }
    ],


    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],
  }
})
