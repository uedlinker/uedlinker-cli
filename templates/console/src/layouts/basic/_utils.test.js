import { getFlatMenuKeys, getOpenKeys } from './_utils'

describe('test sider menu', () => {
  describe('test get flat menu keys', () => {
    describe('test all menu items are primary menu', () => {
      it('test several menu items', () => {
        const menuData = [{
          name: '普通测试页',
          icon: 'star-o',
          path: '/test-basic',
          authority: '',
        }, {
          name: '高级测试页',
          icon: 'star',
          path: '/test-advance',
          authority: 'admin',
        }]

        expect(getFlatMenuKeys(menuData)).toEqual(['/test-basic', '/test-advance'])
      })
    })

    describe('test some menu items have secondary menu', () => {
      it('test only one menu item has secondary menu', () => {
        const menuData = [{
          name: 'dashboard',
          icon: 'dashboard',
          path: '/dashboard',
          authority: 'user',
          children: [
            {
              name: '分析页',
              path: '/dashboard/analysis',
              authority: 'user',
            },
            {
              name: '监控页',
              path: '/dashboard/monitor',
              authority: 'user',
            },
            {
              name: '工作台',
              path: '/dashboard/workplace',
              authority: 'admin',
            },
          ],
        }]

        expect(getFlatMenuKeys(menuData)).toEqual([
          '/dashboard',
          '/dashboard/analysis',
          '/dashboard/monitor',
          '/dashboard/workplace',
        ])
      })

      it('test several menu items have secondary menu', () => {
        const menuData = [{
          name: 'dashboard',
          icon: 'dashboard',
          path: '/dashboard',
          authority: 'user',
          children: [
            {
              name: '分析页',
              path: '/dashboard/analysis',
              authority: 'user',
            },
            {
              name: '监控页',
              path: '/dashboard/monitor',
              authority: 'user',
            },
            {
              name: '工作台',
              path: '/dashboard/workplace',
              authority: 'admin',
            },
          ],
        }, {
          name: '表单页',
          icon: 'form',
          path: '/form',
          authority: '',
          children: [{
            name: '基础表单',
            path: '/form/basic-form',
            authority: '',
          }, {
            name: '分步表单',
            path: '/form/step-form',
            authority: '',
          }, {
            name: '高级表单',
            authority: 'admin',
            path: '/form/advanced-form',
          }],
        }]

        expect(getFlatMenuKeys(menuData)).toEqual([
          '/dashboard', '/dashboard/analysis',
          '/dashboard/monitor', '/dashboard/workplace',
          '/form', '/form/basic-form', '/form/step-form', '/form/advanced-form',
        ])
      })
    })

    describe('test some menu items have tertiary menu', () => {
      it('test only one menu item has tertiary menu', () => {
        const menuData = [{
          name: '列表页',
          icon: 'table',
          path: '/list',
          authority: '',
          children: [
            {
              name: '查询表格',
              path: '/list/table-list',
              authority: '',
            },
            {
              name: '标准列表',
              path: '/list/basic-list',
              authority: 'user',
            },
            {
              name: '卡片列表',
              path: '/list/card-list',
              authority: '',
            },
            {
              name: '搜索列表',
              path: '/list/search',
              authority: '',
              children: [
                {
                  name: '搜索列表（文章）',
                  path: '/list/search/articles',
                  authority: '',
                },
                {
                  name: '搜索列表（项目）',
                  path: '/list/search/projects',
                  authority: 'admin',
                },
                {
                  name: '搜索列表（应用）',
                  path: '/list/search/applications',
                  authority: '',
                },
              ],
            },
          ],
        }]

        expect(getFlatMenuKeys(menuData)).toEqual([
          '/list', '/list/table-list',
          '/list/basic-list', '/list/card-list',
          '/list/search', '/list/search/articles',
          '/list/search/projects', '/list/search/applications',
        ])
      })

      it('test several menu items have tertiary menu', () => {
        const menuData = [{
          path: '/list',
          children: [{
            path: '/list/table-list',
          }, {
            path: '/list/basic-list',
          }, {
            path: '/list/card-list',
          }, {
            path: '/list/search',
            children: [{
              path: '/list/search/articles',
            }, {
              path: '/list/search/projects',
            }, {
              path: '/list/search/applications',
            }],
          }],
        }, {
          path: '/user',
          children: [{
            path: '/user/basic',
          }, {
            path: '/user/advance',
          }, {
            path: '/user/search',
            children: [{
              path: '/user/search/aaa',
            }, {
              path: '/user/search/bbb',
            }, {
              path: '/user/search/ccc',
            }],
          }],
        }]

        expect(getFlatMenuKeys(menuData)).toEqual([
          '/list', '/list/table-list',
          '/list/basic-list', '/list/card-list',
          '/list/search', '/list/search/articles',
          '/list/search/projects', '/list/search/applications',
          '/user', '/user/basic',
          '/user/advance', '/user/search',
          '/user/search/aaa', '/user/search/bbb',
          '/user/search/ccc',
        ])
      })
    })
  })

  describe('test get open keys', () => {
    const menuKeys = [
      '/aaa', '/aaa/bbb', '/aaa/bbb/ccc',
      '/ddd', '/ddd/eee', '/ddd/eee/fff',
    ]
    const urlArray = ['/aaa', '/aaa/bbb', '/aaa/bbb/ccc']

    expect(getOpenKeys(menuKeys, urlArray)).toEqual([
      '/aaa', '/aaa/bbb', '/aaa/bbb/ccc',
    ])
  })
})
