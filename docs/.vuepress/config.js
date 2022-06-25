module.exports = {
  head: [
    [
      'meta',
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
      }
    ],
    [
      'meta',
      {
        name: 'baidu-site-verification',
        content: 'code-jQG4PKFk16'
      }
    ]
  ],
  title: '洛风的全栈之路',
  description: '洛风的全栈之路',
  themeConfig: {
      nav: [
          { text: '首页', link: '/' },
          { 
            text: '个人生涯',
            items: [
              {
                text: '成长',
                link: '/career/growUp/'
              },
              {
                text: '经验',
                link: '/career/experience/'
              }
            ],
            link: '/career/'
          },
          { 
            text: '计算机基础', 
            link: '/accumulationBasics/'
          },
          {
            text: '前端框架',
            items: [
              {
                text: 'vue',
                link: '/frontEndFramework/vue-related/'
              },
              {
                text: 'react',
                link: '/frontEndFramework/react-related/'
              },
            ],
          },
          { 
            text: 'web应用框架', 
            link: '/webapplication/'
          },
          { 
            text: '数据结构和算法', 
            items: [
              {
                text: '线性数据结构',
                link: '/dataAtructuresAlgorithms/linearData/'
              },
              {
                text: '非线性数据结构',
                link: '/dataAtructuresAlgorithms/Nonlinearity/'
              },
            ],
          },
          { text: 'github', link: 'https://github.com/Ravkier/Blog',  target:'_blank' },
        ],
        lastUpdated: '最后更新',
        sidebar: {
          '/career/growUp/': [
            {
              title: '成长经历',
              children: [
                'create-website'
              ]
            }
          ],
          '/career/experience/': [
            {
              title: '工作经历',
              children: [
                'file-down'
              ]
            }
          ],
          '/accumulationBasics/': [
            'shell-base',
            'processes-and-threads'
          ],
          '/webapplication/': [
            'koa',
            'egg',
            'midway'
          ],
          '/frontEndFramework/vue-related/': [
            {
              title: 'vue3源码解析',
              children: [
                'ASTTemplate'
              ]
            }
          ],
          '/frontEndFramework/react-related/': [
            {
              title: 'react',
              children: []
            }
          ],
          '/dataAtructuresAlgorithms/linearData/': [
            {
              title: '线性数据结构',
              children: [
                'Stack', 'queue'
              ]
            }
          ],
          '/dataAtructuresAlgorithms/Nonlinearity/': [
            {
              title: '非线性数据结构',
              children: []
            }
          ]
      }
  },
  plugins: [
    ['seo', {
      siteTitle: (_, $site) => $site.title,
      title: $page => $page.title,
      description: $page => $page.frontmatter.description,
      author: (_, $site) => $site.themeConfig.author,
      tags: $page => $page.frontmatter.tags,
      twitterCard: _ => 'summary_large_image',
      type: $page => ['articles', 'posts', 'blog'].some(folder => $page.regularPath.startsWith('/' + folder)) ? 'article' : 'website',
      url: (_, $site, path) => ($site.themeConfig.domain || '') + path,
      image: ($page, $site) => $page.frontmatter.image && (($site.themeConfig.domain && !$page.frontmatter.image.startsWith('http') || '') + $page.frontmatter.image),
      publishedAt: $page => $page.frontmatter.date && new Date($page.frontmatter.date),
      modifiedAt: $page => $page.lastUpdated && new Date($page.lastUpdated),
      }]
  ]
  }