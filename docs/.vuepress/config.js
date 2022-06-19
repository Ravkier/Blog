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
            { text: '个人生涯', link: '/career/' },
            { 
              text: '计算机基础', 
              link: '/accumulationBasics/'
            },
            { 
              text: 'web应用框架', 
              link: '/webapplication/'
            },
            { text: 'github', link: 'https://github.com/Ravkier/Blog',  target:'_blank' },
          ],
          lastUpdated: '最后更新',
          sidebar: {
            '/career/': [
              'create-website',
              'file-down'
            ],
            '/accumulationBasics/': [
              'shell-base',
              'processes-and-threads'
            ],
            '/webapplication/': [
              'koa',
              'egg',
              'midway'
            ] 
        }
    }
  }