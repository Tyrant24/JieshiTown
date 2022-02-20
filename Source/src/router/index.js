import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Temp from '@/components/temp'
import Login from '@/components/Login'

import Nongzuowu from '@/components/nongzuowu'
import Shangchen from '@/components/shangchen'
import Tudi from '@/components/tudi'
import Zhongyang from '@/components/zhongyang'
import Bangfupin from '@/components/bangfupin'
import Shouru from '@/components/shouru'
import Renyuan from '@/components/renyuan'
import Renyuan2 from '@/components/renyuan2'
import Detail from '@/components/detail'
import Videolist from '@/components/videolist'

Vue.use(Router)

export default new Router({
  routes: [ 
    {
      path: '/',
      name: 'Home',
      component: Home,
      children:[
        {
          path: '/',
          name: 'Home',
          component: Home,
        }
      ]
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Temp',
      name: 'Temp',
      component: Temp
    },
    {
      path: '/Shangchen',
      name: 'Shangchen',
      component: Shangchen
    },
    {
      path: '/Nongzuowu',
      name: 'Nongzuowu',
      component: Nongzuowu
    },
    {
      path: '/Tudi',
      name: 'Tudi',
      component: Tudi
    },
    {
      path: '/Zhongyang',
      name: 'Zhongyang',
      component: Zhongyang
    },
    {
      path: '/Shouru',
      name: 'Shouru',
      component: Shouru
    },
    {
      path: '/Bangfupin',
      name: 'Bangfupin',
      component: Bangfupin
    },
    {
      path: '/Renyuan',
      name: 'Renyuan',
      component: Renyuan
    },
    {
      path: '/Renyuan2',
      name: 'Renyuan2',
      component: Renyuan2
    },
    {
      path: '/Detail',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/Videolist',
      name: 'Videolist',
      component: Videolist
    },
    
    
    
  ]
})
