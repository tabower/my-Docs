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
        text: 'aker',
        link: '/aker/index',
        items: [
          { text: '中断处理', link: '/aker/中断处理' },
          { text: '虚存管理', link: '/aker/虚存管理' },
          { text: '内存分配', link: '/aker/内存分配' },
          { text: '内核模块', link: '/aker/内核模块' },
          { text: '进程信号', link: '/aker/进程信号' },
          { text: '文件系统', link: '/aker/文件系统' },
          { text: '块设备IO', link: '/aker/块设备IO' },
          { text: '探针和打桩', link: '/aker/探针和打桩' },
          { text: '函数约定(RV64)', link: '/aker/函数约定(RV64)' },
        ]
      }
    ],


    socialLinks: [
      { icon: 'github', link: 'https://github.com/tabower/my-Docs' }
    ],
  }
})
