import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "My Docs",
  description: "A VitePress Site",
  sitemap: {
    hostname: 'https://docs.160161.xyz'
  },
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
        defer: "",
        src: "https://static.cloudflareinsights.com/beacon.min.js",
        "data-cf-beacon": JSON.stringify({
          token: "c1eff9ba2dfb4ee1a94d642fb6468ce1",
        }),
      },
    ],
  ],
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
    ],

    sidebar: {
      "/docs/": [
        {
          "text": "Index",
          "link": "docs/index"
        },
        {
          "text": "Aker",
          "link": "docs/aker/index",
          collapsed: true,
          "items": [
            {
              "text": "中断处理",
              "link": "docs/aker/中断处理"
            },
            {
              "text": "内存分配",
              "link": "docs/aker/内存分配"
            },
            {
              "text": "内核模块",
              "link": "docs/aker/内核模块"
            },
            {
              "text": "函数约定(RV64)",
              "link": "docs/aker/函数约定(RV64)"
            },
            {
              "text": "块设备IO",
              "link": "docs/aker/块设备IO"
            },
            {
              "text": "探针和打桩",
              "link": "docs/aker/探针和打桩"
            },
            {
              "text": "文件系统",
              "link": "docs/aker/文件系统"
            },
            {
              "text": "虚存管理",
              "link": "docs/aker/虚存管理"
            },
            {
              "text": "进程之旅",
              "link": "docs/aker/进程之旅"
            },
            {
              "text": "进程信号",
              "link": "docs/aker/进程信号"
            }
          ]
        },

        {
          "text": "Aker-rs",
          "link": "docs/aker-rs/index",
          collapsed: true,
          "items": [
            {
              "text": "内核协程 - 调度器框架",
              "link": "docs/aker-rs/内核协程 - 调度器框架"
            },
          ]
        },

        {
          "text": "Distributed",
          "link": "docs/distributed/index",
          collapsed: true,
          "items": [
            {
              "text": "aurora",
              "link": "docs/distributed/aurora"
            },
            {
              "text": "craq",
              "link": "docs/distributed/craq"
            },
            {
              "text": "fault-tolerant virtual machine",
              "link": "docs/distributed/fault-tolerant_virtual_machine"
            },
            {
              "text": "google file system",
              "link": "docs/distributed/google_file_system"
            },
            {
              "text": "zookeeper",
              "link": "docs/distributed/zookeeper"
            }
          ]
        }
      ],
      "/notes/": [
        {
          "text": "Index",
          "link": "notes/index"
        },
        {
          "text": "Linux",
          "link": "notes/linux/index",
          collapsed: true,
          "items": [
            {
              "text": "per-CPU",
              "link": "notes/linux/per-CPU"
            }
          ]
        }
      ]
    },



    socialLinks: [
      { icon: 'github', link: 'https://github.com/tabower/my-Docs' }
    ],
  }
})
