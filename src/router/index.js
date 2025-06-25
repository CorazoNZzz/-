/**
 * Vue Router 路由配置文件
 *
 * 系统路由结构说明：
 * 1. 首页：显示问题列表 (/)
 * 2. 问题创建：创建新问题 (/issue/create)
 * 3. 表单处理路由：根据表单类型分为四大类
 *    - 督查在线：/issue/:id/supervision/step[1-3]
 *    - 远程帮扶：/issue/:id/remote-help/step[1-3]
 *    - 数字化指挥中心：/issue/:id/digital-center/step[1-3]
 *    - 线索核查：/issue/:id/clue-check/step[1-3]
 * 4. 兼容性重定向：保持与旧版本路由的兼容性
 *
 * 路由参数说明：
 * - :id - 问题ID，用于标识具体的问题记录
 * - query.formType - 表单类型，用于重定向时确定目标路由
 */

import { createRouter, createWebHistory } from 'vue-router'

// ===========================================
// 导入主要视图组件
// ===========================================
import IssueListView from '../views/IssueListView.vue'
import IssueCreateView from '../views/IssueCreateView.vue'

// ===========================================
// 导入督查在线相关组件
// ===========================================
import SupervisionStep1 from '../views/components/supervision/SupervisionStep1.vue'
import SupervisionStep2 from '../views/components/supervision/SupervisionStep2.vue'
import SupervisionStep3 from '../views/components/supervision/SupervisionStep3.vue'

// ===========================================
// 导入远程帮扶相关组件
// ===========================================
import RemoteHelpStep1 from '../views/components/remote-help/RemoteHelpStep1.vue'
import RemoteHelpStep2 from '../views/components/remote-help/RemoteHelpStep2.vue'
import RemoteHelpStep3 from '../views/components/remote-help/RemoteHelpStep3.vue'

// ===========================================
// 导入数字化指挥中心相关组件
// ===========================================
import DigitalCenterStep1 from '../views/components/digital-center/DigitalCenterStep1.vue'
import DigitalCenterStep2 from '../views/components/digital-center/DigitalCenterStep2.vue'
import DigitalCenterStep3 from '../views/components/digital-center/DigitalCenterStep3.vue'

// ===========================================
// 导入线索核查相关组件
// ===========================================
import ClueCheckStep1 from '../views/components/clue-check/ClueCheckStep1.vue'
import ClueCheckStep2 from '../views/components/clue-check/ClueCheckStep2.vue'
import ClueCheckStep3 from '../views/components/clue-check/ClueCheckStep3.vue'

/**
 * 创建路由实例
 * 使用HTML5 History模式，提供更好的用户体验
 */
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // ===========================================
    // 主要页面路由
    // ===========================================

    /**
     * 首页路由 - 问题列表
     * 显示所有问题的汇总信息，支持筛选和搜索
     */
    {
      path: '/',
      name: 'home',
      component: IssueListView,
      meta: {
        title: '问题汇总',
        requiresAuth: true, // 需要登录访问
        roles: ['一中队人员', '负责人', '管理员', '属地所人员'] // 允许访问的角色
      }
    },

    /**
     * 问题创建路由
     * 提供创建新问题的表单界面
     */
    {
      path: '/issue/create',
      name: 'issue-create',
      component: IssueCreateView,
      meta: {
        title: '新建问题',
        requiresAuth: true,
        roles: ['一中队人员', '负责人', '管理员'] // 属地所人员无权创建
      }
    },

    // ===========================================
    // 督查在线表单路由组
    // ===========================================

    /**
     * 督查在线 - 第一步：交办信息
     * 填写问题的基本信息和交办详情
     */
    {
      path: '/issue/:id/supervision/step1',
      name: 'supervision-step1',
      component: SupervisionStep1,
      meta: {
        title: '督查在线 - 交办信息',
        requiresAuth: true,
        formType: '督查在线',
        step: 1
      }
    },

    /**
     * 督查在线 - 第二步：问题交办
     * 设置整改措施和时限要求
     */
    {
      path: '/issue/:id/supervision/step2',
      name: 'supervision-step2',
      component: SupervisionStep2,
      meta: {
        title: '督查在线 - 问题交办',
        requiresAuth: true,
        formType: '督查在线',
        step: 2
      }
    },

    /**
     * 督查在线 - 第三步：整改情况
     * 记录整改进度和完成情况
     */
    {
      path: '/issue/:id/supervision/step3',
      name: 'supervision-step3',
      component: SupervisionStep3,
      meta: {
        title: '督查在线 - 整改情况',
        requiresAuth: true,
        formType: '督查在线',
        step: 3
      }
    },

    // ===========================================
    // 远程帮扶表单路由组
    // ===========================================

    /**
     * 远程帮扶 - 第一步：交办信息
     * 支持Excel批量导入，填写帮扶对象信息
     */
    {
      path: '/issue/:id/remote-help/step1',
      name: 'remote-help-step1',
      component: RemoteHelpStep1,
      meta: {
        title: '远程帮扶 - 交办信息',
        requiresAuth: true,
        formType: '远程帮扶',
        step: 1
      }
    },

    /**
     * 远程帮扶 - 第二步：帮扶过程
     * 记录帮扶措施和指导内容
     */
    {
      path: '/issue/:id/remote-help/step2',
      name: 'remote-help-step2',
      component: RemoteHelpStep2,
      meta: {
        title: '远程帮扶 - 帮扶过程',
        requiresAuth: true,
        formType: '远程帮扶',
        step: 2
      }
    },

    /**
     * 远程帮扶 - 第三步：效果评估
     * 评估帮扶效果和后续计划
     */
    {
      path: '/issue/:id/remote-help/step3',
      name: 'remote-help-step3',
      component: RemoteHelpStep3,
      meta: {
        title: '远程帮扶 - 效果评估',
        requiresAuth: true,
        formType: '远程帮扶',
        step: 3
      }
    },

    // ===========================================
    // 数字化指挥中心表单路由组
    // ===========================================

    /**
     * 数字化指挥中心 - 第一步：事件信息
     * 记录应急事件的基本信息
     */
    {
      path: '/issue/:id/digital-center/step1',
      name: 'digital-center-step1',
      component: DigitalCenterStep1,
      meta: {
        title: '数字化指挥中心 - 事件信息',
        requiresAuth: true,
        formType: '数字化指挥中心',
        step: 1
      }
    },

    /**
     * 数字化指挥中心 - 第二步：指挥调度
     * 记录指挥决策和资源调配
     */
    {
      path: '/issue/:id/digital-center/step2',
      name: 'digital-center-step2',
      component: DigitalCenterStep2,
      meta: {
        title: '数字化指挥中心 - 指挥调度',
        requiresAuth: true,
        formType: '数字化指挥中心',
        step: 2
      }
    },

    /**
     * 数字化指挥中心 - 第三步：处置结果
     * 记录处置过程和最终结果
     */
    {
      path: '/issue/:id/digital-center/step3',
      name: 'digital-center-step3',
      component: DigitalCenterStep3,
      meta: {
        title: '数字化指挥中心 - 处置结果',
        requiresAuth: true,
        formType: '数字化指挥中心',
        step: 3
      }
    },

    // ===========================================
    // 线索核查表单路由组
    // ===========================================

    /**
     * 线索核查 - 第一步：线索信息
     * 记录线索来源和基本情况
     */
    {
      path: '/issue/:id/clue-check/step1',
      name: 'clue-check-step1',
      component: ClueCheckStep1,
      meta: {
        title: '线索核查 - 线索信息',
        requiresAuth: true,
        formType: '线索核查',
        step: 1
      }
    },

    /**
     * 线索核查 - 第二步：核查过程
     * 记录调查核实的详细过程
     */
    {
      path: '/issue/:id/clue-check/step2',
      name: 'clue-check-step2',
      component: ClueCheckStep2,
      meta: {
        title: '线索核查 - 核查过程',
        requiresAuth: true,
        formType: '线索核查',
        step: 2
      }
    },

    /**
     * 线索核查 - 第三步：核查结果
     * 记录核查结论和后续处理意见
     */
    {
      path: '/issue/:id/clue-check/step3',
      name: 'clue-check-step3',
      component: ClueCheckStep3,
      meta: {
        title: '线索核查 - 核查结果',
        requiresAuth: true,
        formType: '线索核查',
        step: 3
      }
    },

    // ===========================================
    // 兼容性重定向路由
    // 保持与旧版本URL的兼容性，避免用户书签失效
    // ===========================================

    /**
     * 旧版问题处理路由重定向
     * 将旧的 /issue/process 重定向到新的创建页面
     */
    {
      path: '/issue/process',
      redirect: '/issue/create',
    },

    /**
     * 旧版第一步路由重定向
     * 根据查询参数中的formType确定重定向目标
     */
    {
      path: '/issue/:id/step1',
      redirect: (to) => {
        const formType = to.query.formType
        const routeType = getRouteTypeByFormType(formType)
        return `/issue/${to.params.id}/${routeType}/step1`
      },
    },

    /**
     * 旧版第二步路由重定向
     */
    {
      path: '/issue/:id/step2',
      redirect: (to) => {
        const formType = to.query.formType
        const routeType = getRouteTypeByFormType(formType)
        return `/issue/${to.params.id}/${routeType}/step2`
      },
    },

    /**
     * 旧版第三步路由重定向
     */
    {
      path: '/issue/:id/step3',
      redirect: (to) => {
        const formType = to.query.formType
        const routeType = getRouteTypeByFormType(formType)
        return `/issue/${to.params.id}/${routeType}/step3`
      },
    },

    // ===========================================
    // 错误处理路由
    // ===========================================

    /**
     * 404 页面 - 捕获所有未匹配的路由
     * 当用户访问不存在的页面时显示
     */
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue'),
      meta: {
        title: '页面未找到'
      }
    }
  ],
})

// ===========================================
// 工具函数
// ===========================================

/**
 * 根据表单类型获取对应的路由类型
 * 用于重定向逻辑中的类型转换
 *
 * @param {string} formType - 表单类型
 * @returns {string} 路由类型
 */
function getRouteTypeByFormType(formType) {
  const typeMap = {
    '督查在线': 'supervision',
    '远程帮扶': 'remote-help',
    '数字化指挥中心': 'digital-center',
    '线索核查': 'clue-check',
  }

  return typeMap[formType] || 'supervision' // 默认使用督查在线
}

// ===========================================
// 路由守卫
// ===========================================

/**
 * 全局前置守卫
 * 在每次路由跳转前执行，用于权限验证和页面标题设置
 */
router.beforeEach((to, from, next) => {
  // 设置页面标题
  if (to.meta.title) {
    document.title = `${to.meta.title} - 环保局问题交办系统`
  }

  // 权限验证（如果需要）
  if (to.meta.requiresAuth) {
    // 这里可以添加用户认证逻辑
    // 检查用户是否登录，是否有访问权限等

    // 示例：检查用户角色权限
    const userRole = localStorage.getItem('user_role') || '一中队人员'

    if (to.meta.roles && !to.meta.roles.includes(userRole)) {
      // 用户没有访问权限
      console.warn(`用户角色 ${userRole} 无权访问 ${to.path}`)
      // 可以重定向到无权限页面或首页
      next('/')
      return
    }
  }

  // 路由参数验证
  if (to.params.id && to.params.id !== 'new') {
    // 验证问题ID是否有效（可选）
    // 这里可以添加ID格式验证或存在性检查
    console.log('访问问题ID:', to.params.id)
  }

  next()
})

/**
 * 全局后置钩子
 * 在路由跳转完成后执行，用于页面访问统计等
 */
router.afterEach((to, from) => {
  // 页面访问统计（如果需要）
  console.log(`页面跳转: ${from.path} -> ${to.path}`)

  // 可以在这里添加埋点统计、页面加载时间记录等逻辑
})

// ===========================================
// 导出路由实例
// ===========================================
export default router

/**
 * 导出工具函数供其他模块使用
 */
export { getRouteTypeByFormType }
