import Mock from 'mockjs'
export default {
  getMenu: config => {
    console.log(config);
    const { username, password } = JSON.parse(config.body)
    console.log(JSON.parse(config.body))
    // 先判断用户是否存在
    // 判断账号和密码是否对应
    if (username === 'admin' && password === 'admin') {
      return {
        code: 20000,
        data: {
          menu: [
            {
              path: '/user',
              name: 'home',
              label: '首页',
              icon: 's-home',
              url: 'user/index'
            },
            {
              path: '/test',
              name: 'test',
              label: 'test',
              icon: 's-home',
              url: 'test/test.vue'
            },
            {
              label: '用户管理',
              icon: 'user',
              children: [
                {
                  path: '/user',
                  name: 'userinfo',
                  label: '家庭成员信息',
                  icon: 'user',
                  url: 'user/index'
                },
                {
                  path: '/medicine',
                  name: 'medicine',
                  label: '用药管理',
                  icon: 'setting',
                  url: 'medicine/index'
                },
                {
                  path: '/userstate',
                  name: 'userstate',
                  label: '用户状态',
                  icon: 'setting',
                  url: 'user/state.vue'
                },
                {
                  path: '/healthstate',
                  name: 'healthstate',
                  label: '健康状态',
                  icon: 'setting',
                  url: 'user/health.vue'
                }
              ]
            },
            // {
            //   path: '/medicine',
            //   name: 'medicine',
            //   label: '用药管理',
            //   icon: 'video-play',
            //   url: 'medicine/index'
            // },
            {
              label: '机器人管理',
              icon: 'location',
              children: [
                // {
                //   path: '/robotchat',
                //   name: 'robotchat',
                //   label: '机器人对话',
                //   icon: 'setting',
                //   url: 'other/robotchat.vue'
                // },
                {
                  path: '/robotstate',
                  name: 'robotstate',
                  label: '机器人状态',
                  icon: 'setting',
                  url: 'other/robotstate.vue'
                },
                {
                  path: '/robotnavigator',
                  name: 'robotnavigator',
                  label: '机器人导航',
                  icon: 'setting',
                  url: 'other/robotnavigator.vue'
                }
              ]
            }
          ],
          token: Mock.Random.guid(),
          message: '获取成功'
        }
      }
    } else if (username === 'wcpeng' && password === 'wcpeng') {
      return {
        code: 20000,
        data: {
          menu: [
            {
              path: '/home',
              name: 'home',
              label: '首页',
              icon: 's-home',
              url: 'home/index'
            },
            {
              path: '/video',
              name: 'video',
              label: '商品管理',
              icon: 'video-play',
              url: 'mall/index'
            }
          ],
          token: Mock.Random.guid(),
          message: '获取成功'
        }
      }
    } else {
      return {
        code: -999,
        data: {
          message: '密码错误'
        }
      }
    }

  }
}
