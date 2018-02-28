import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import ProInfo from '@/components/ProInfo'
import Notice from '@/components/Notice'
import Briefing from '@/components/Briefing'
import SchoolInfo from '@/components/SchoolInfo'
import StudentInfo from '@/components/StudentInfo'
import WsInfo from '@/components/WsInfo'
import WriteNotice from '@/components/WriteNotice'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
        path: '/ProInfo',
        name: 'ProInfo',
        component: ProInfo
    },
    {
        path: '/Notice',
        name: 'Notice',
        component: Notice
    },
    {
        path: '/Briefing',
        name: 'Briefing',
        component: Briefing
    },
    {
        path: '/SchoolInfo',
        name: 'SchoolInfo',
        component: SchoolInfo
    },
    {
        path: '/StudentInfo',
        name: 'StudentInfo',
        component: StudentInfo
    },
    {
        path: '/WsInfo',
        name: 'WsInfo',
        component: WsInfo
    },
   {
      path: '/WriteNotice',
      name: 'WriteNotice',
      component: WriteNotice
    }
  ]
})
