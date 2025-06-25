import { createRouter, createWebHistory } from 'vue-router'
import IssueListView from '../views/IssueListView.vue'
import IssueCreateView from '../views/IssueCreateView.vue'

// 督查在线组件
import SupervisionStep1 from '../views/components/supervision/SupervisionStep1.vue'
import SupervisionStep2 from '../views/components/supervision/SupervisionStep2.vue'
import SupervisionStep3 from '../views/components/supervision/SupervisionStep3.vue'

// 远程帮扶组件
import RemoteHelpStep1 from '../views/components/remote-help/RemoteHelpStep1.vue'
import RemoteHelpStep2 from '../views/components/remote-help/RemoteHelpStep2.vue'
import RemoteHelpStep3 from '../views/components/remote-help/RemoteHelpStep3.vue'

// 数字化指挥中心组件
import DigitalCenterStep1 from '../views/components/digital-center/DigitalCenterStep1.vue'
import DigitalCenterStep2 from '../views/components/digital-center/DigitalCenterStep2.vue'
import DigitalCenterStep3 from '../views/components/digital-center/DigitalCenterStep3.vue'

// 线索核查组件
import ClueCheckStep1 from '../views/components/clue-check/ClueCheckStep1.vue'
import ClueCheckStep2 from '../views/components/clue-check/ClueCheckStep2.vue'
import ClueCheckStep3 from '../views/components/clue-check/ClueCheckStep3.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: IssueListView,
    },
    {
      path: '/issue/create',
      name: 'issue-create',
      component: IssueCreateView,
    },

    // 督查在线路由
    {
      path: '/issue/:id/supervision/step1',
      name: 'supervision-step1',
      component: SupervisionStep1,
    },
    {
      path: '/issue/:id/supervision/step2',
      name: 'supervision-step2',
      component: SupervisionStep2,
    },
    {
      path: '/issue/:id/supervision/step3',
      name: 'supervision-step3',
      component: SupervisionStep3,
    },

    // 远程帮扶路由
    {
      path: '/issue/:id/remote-help/step1',
      name: 'remote-help-step1',
      component: RemoteHelpStep1,
    },
    {
      path: '/issue/:id/remote-help/step2',
      name: 'remote-help-step2',
      component: RemoteHelpStep2,
    },
    {
      path: '/issue/:id/remote-help/step3',
      name: 'remote-help-step3',
      component: RemoteHelpStep3,
    },

    // 数字化指挥中心路由
    {
      path: '/issue/:id/digital-center/step1',
      name: 'digital-center-step1',
      component: DigitalCenterStep1,
    },
    {
      path: '/issue/:id/digital-center/step2',
      name: 'digital-center-step2',
      component: DigitalCenterStep2,
    },
    {
      path: '/issue/:id/digital-center/step3',
      name: 'digital-center-step3',
      component: DigitalCenterStep3,
    },

    // 线索核查路由
    {
      path: '/issue/:id/clue-check/step1',
      name: 'clue-check-step1',
      component: ClueCheckStep1,
    },
    {
      path: '/issue/:id/clue-check/step2',
      name: 'clue-check-step2',
      component: ClueCheckStep2,
    },
    {
      path: '/issue/:id/clue-check/step3',
      name: 'clue-check-step3',
      component: ClueCheckStep3,
    },

    // 兼容旧路由的重定向
    {
      path: '/issue/process',
      redirect: '/issue/create',
    },
    {
      path: '/issue/:id/step1',
      redirect: (to) => {
        const formType = to.query.formType
        const typeMap = {
          督查在线: 'supervision',
          远程帮扶: 'remote-help',
          数字化指挥中心: 'digital-center',
          线索核查: 'clue-check',
        }
        const routeType = typeMap[formType] || 'supervision'
        return `/issue/${to.params.id}/${routeType}/step1`
      },
    },
    {
      path: '/issue/:id/step2',
      redirect: (to) => {
        const formType = to.query.formType
        const typeMap = {
          督查在线: 'supervision',
          远程帮扶: 'remote-help',
          数字化指挥中心: 'digital-center',
          线索核查: 'clue-check',
        }
        const routeType = typeMap[formType] || 'supervision'
        return `/issue/${to.params.id}/${routeType}/step2`
      },
    },
    {
      path: '/issue/:id/step3',
      redirect: (to) => {
        const formType = to.query.formType
        const typeMap = {
          督查在线: 'supervision',
          远程帮扶: 'remote-help',
          数字化指挥中心: 'digital-center',
          线索核查: 'clue-check',
        }
        const routeType = typeMap[formType] || 'supervision'
        return `/issue/${to.params.id}/${routeType}/step3`
      },
    },
  ],
})

export default router
