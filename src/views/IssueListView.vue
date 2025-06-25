<!--
  问题列表视图组件

  功能说明：
  1. 显示所有问题的汇总列表
  2. 支持按表单类型筛选
  3. 支持搜索功能（关键词搜索）
  4. 支持分页显示
  5. 根据用户角色控制新建问题权限
  6. 提供问题状态的可视化显示

  数据结构说明：
  - tableData: 问题列表数据
  - filterFormType: 筛选的表单类型
  - currentUser: 当前登录用户信息
  - loading: 加载状态

  权限控制：
  - 属地所人员：只能查看，不能新建问题
  - 其他角色：可以查看和新建问题
-->
<script setup>
import { ref, computed, onMounted } from 'vue'
import { Search, Plus } from '@element-plus/icons-vue'
import MockAPI from '../utils/api.js'

// ===========================================
// 响应式数据定义
// ===========================================

/**
 * 当前登录用户信息
 * 注意：实际项目中这些信息应该从用户认证系统获取
 * 后端需要提供用户信息接口：GET /api/user/info
 */
const currentUser = ref({
  role: '一中队人员', // 用户角色：'一中队人员' | '负责人' | '管理员' | '属地所人员'
  username: 'testuser', // 用户名
  realName: '管理员', // 真实姓名
  permissions: ['view', 'create', 'edit'] // 权限列表
})

/**
 * 表单类型筛选条件
 * 支持的类型：'督查在线' | '远程帮扶' | '数字化指挥中心' | '线索核查'
 */
const filterFormType = ref('')

/**
 * 搜索关键词
 * 支持按问题名称、属地、联系人进行模糊搜索
 */
const searchKeyword = ref('')

/**
 * 问题列表数据
 * 数据结构参考API文档中的问题列表响应格式
 */
const tableData = ref([])

/**
 * 列表加载状态
 */
const loading = ref(false)

/**
 * 分页信息
 */
const pagination = ref({
  currentPage: 1,
  pageSize: 10,
  total: 0
})

// ===========================================
// 计算属性
// ===========================================

/**
 * 计算当前用户是否有新建问题的权限
 * 业务规则：属地所人员无权新建问题
 */
const canCreateIssue = computed(() => {
  return currentUser.value.role !== '属地所人员'
})

/**
 * 计算筛选后的表格数据
 * 支持按表单类型和关键词进行筛选
 */
const filteredTableData = computed(() => {
  let data = tableData.value

  // 按表单类型筛选
  if (filterFormType.value) {
    data = data.filter(item => item.formType === filterFormType.value)
  }

  // 按关键词筛选
  if (searchKeyword.value) {
    const keyword = searchKeyword.value.toLowerCase()
    data = data.filter(item =>
      item.name.toLowerCase().includes(keyword) ||
      item.location.toLowerCase().includes(keyword) ||
      item.contact.toLowerCase().includes(keyword)
    )
  }

  return data
})

// ===========================================
// 方法定义
// ===========================================

/**
 * 获取问题列表数据
 *
 * 后端接口：GET /api/issues
 * 查询参数：
 * - page: 页码
 * - pageSize: 每页条数
 * - formType: 表单类型筛选
 * - keyword: 搜索关键词
 * - status: 状态筛选（可选）
 */
const fetchIssueList = async () => {
  loading.value = true

  try {
    const params = {
      page: pagination.value.currentPage,
      pageSize: pagination.value.pageSize,
      formType: filterFormType.value,
      keyword: searchKeyword.value
    }

    const result = await MockAPI.getIssueList(params)

    if (result.success) {
      tableData.value = result.data.list
      pagination.value.total = result.data.total
    } else {
      console.error('获取问题列表失败:', result.message)
      // 这里可以显示错误提示
    }
  } catch (error) {
    console.error('获取问题列表失败:', error)
    // 这里可以显示网络错误提示
  } finally {
    loading.value = false
  }
}

/**
 * 处理搜索操作
 * 重置分页并重新获取数据
 */
const handleSearch = () => {
  pagination.value.currentPage = 1
  fetchIssueList()
}

/**
 * 处理分页变化
 * @param {number} page - 新的页码
 */
const handlePageChange = (page) => {
  pagination.value.currentPage = page
  fetchIssueList()
}

/**
 * 处理每页条数变化
 * @param {number} size - 新的每页条数
 */
const handleSizeChange = (size) => {
  pagination.value.pageSize = size
  pagination.value.currentPage = 1
  fetchIssueList()
}

/**
 * 根据问题状态返回对应的CSS类名
 * 用于在表格中显示不同颜色的状态标签
 *
 * @param {string} status - 问题状态
 * @returns {string} CSS类名
 */
const getStatusClass = (status) => {
  const statusMap = {
    '整改中': 'status-rectifying',
    '处理中': 'status-rectifying',
    '整改完成': 'status-completed',
    '已完成': 'status-completed',
    '草稿': 'status-draft',
    '待处理': 'status-draft',
    '已提交': 'status-submitted'
  }

  return statusMap[status] || 'status-default'
}

/**
 * 获取操作按钮文本
 * 根据问题状态决定显示"编辑"还是"查看详情"
 *
 * @param {string} status - 问题状态
 * @returns {string} 按钮文本
 */
const getActionButtonText = (status) => {
  // 草稿和整改中状态显示"编辑"，其他状态显示"查看详情"
  const editableStatuses = ['草稿', '待处理', '整改中', '处理中', '已提交']
  return editableStatuses.includes(status) ? '编辑' : '查看详情'
}

/**
 * 获取问题查看路由
 * 根据表单类型生成对应的路由路径
 *
 * @param {Object} row - 表格行数据
 * @returns {string} 路由路径
 */
const getIssueViewRoute = (row) => {
  // 表单类型与路由类型的映射关系
  const typeMap = {
    '督查在线': 'supervision',
    '远程帮扶': 'remote-help',
    '数字化指挥中心': 'digital-center',
    '线索核查': 'clue-check',
  }

  const routeType = typeMap[row.formType] || 'supervision'
  return `/issue/${row.id}/${routeType}/step1`
}

/**
 * 刷新列表数据
 * 提供给外部调用的刷新方法
 */
const refreshList = () => {
  fetchIssueList()
}

// ===========================================
// 生命周期钩子
// ===========================================

/**
 * 组件挂载时获取初始数据
 */
onMounted(() => {
  fetchIssueList()
})

// ===========================================
// 暴露给父组件的方法（如果需要）
// ===========================================
defineExpose({
  refreshList,
  fetchIssueList
})
</script>

<template>
  <!-- 页面容器 -->
  <div class="page-container">
    <!-- 顶部导航栏 -->
    <div class="header-bar">
      <img src="/src/assets/logo.svg" class="logo" alt="环保局Logo" />
      <div class="system-title">环保局问题交办系统</div>
      <div class="header-actions">
        <span>登录人：{{ currentUser.realName }}</span>
      </div>
    </div>

    <!-- 主要内容卡片 -->
    <el-card shadow="always" class="main-card">
      <!-- 卡片头部 -->
      <template #header>
        <div class="card-header">
          <span>问题汇总</span>
        </div>
      </template>

      <!-- 提示信息 -->
      <el-alert
        title="请及时处理待整改问题，保障环保工作高效推进。"
        type="info"
        show-icon
        style="margin-bottom: 18px"
      />

      <!-- 筛选和操作区域 -->
      <div class="filter-section">
        <!-- 筛选表单 -->
        <el-form :inline="true" class="filter-form">
          <el-form-item label="表单类型：">
            <el-select
              v-model="filterFormType"
              placeholder="全部"
              clearable
              style="width: 200px"
              @change="handleSearch"
            >
              <el-option label="督查在线" value="督查在线" />
              <el-option label="远程帮扶" value="远程帮扶" />
              <el-option label="数字化指挥中心" value="数字化指挥中心" />
              <el-option label="线索核查" value="线索核查" />
            </el-select>
          </el-form-item>

          <el-form-item label="关键词：">
            <el-input
              v-model="searchKeyword"
              placeholder="搜索问题名称、属地、联系人"
              style="width: 250px"
              clearable
              @keyup.enter="handleSearch"
            />
          </el-form-item>

          <el-form-item>
            <el-button type="primary" :icon="Search" @click="handleSearch">
              查询
            </el-button>
          </el-form-item>
        </el-form>

        <!-- 操作按钮区域 -->
        <div class="action-buttons">
          <!-- 新建问题按钮 - 根据用户权限显示 -->
          <router-link to="/issue/create" v-if="canCreateIssue">
            <el-button type="primary" size="large" :icon="Plus">
              新建问题
            </el-button>
          </router-link>

          <!-- 刷新按钮 -->
          <el-button @click="refreshList" :loading="loading">
            刷新
          </el-button>
        </div>
      </div>

      <!-- 问题列表表格 -->
      <el-table
        :data="filteredTableData"
        style="width: 100%"
        border
        stripe
        class="issue-table"
        v-loading="loading"
        element-loading-text="加载中..."
        empty-text="暂无数据"
      >
        <!-- 序号列 -->
        <el-table-column
          type="index"
          label="序号"
          width="80"
          align="center"
        />

        <!-- 问题名称列 -->
        <el-table-column
          prop="name"
          label="问题名称"
          min-width="200"
          show-overflow-tooltip
        />

        <!-- 表单类型列 -->
        <el-table-column
          prop="formType"
          label="表单类型"
          width="150"
          align="center"
        />

        <!-- 属地列 -->
        <el-table-column
          prop="location"
          label="属地"
          width="150"
          align="center"
        />

        <!-- 联系人列 -->
        <el-table-column
          prop="contact"
          label="联系人/负责人"
          width="120"
          align="center"
        />

        <!-- 整改时限列 -->
        <el-table-column
          prop="deadline"
          label="整改时限"
          width="150"
          align="center"
        />

        <!-- 整改状态列 -->
        <el-table-column label="整改状态" width="120" align="center">
          <template #default="{ row }">
            <span :class="['status-tag', getStatusClass(row.status)]">
              {{ row.status }}
            </span>
          </template>
        </el-table-column>

        <!-- 创建时间列 -->
        <el-table-column
          prop="createTime"
          label="创建时间"
          width="150"
          align="center"
        />

        <!-- 操作列 -->
        <el-table-column label="操作" width="120" align="center" fixed="right">
          <template #default="{ row }">
            <router-link :to="getIssueViewRoute(row)">
              <el-button type="primary" link size="small">
                {{ getActionButtonText(row.status) }}
              </el-button>
            </router-link>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页组件 -->
      <div class="pagination-section">
        <el-pagination
          v-model:current-page="pagination.currentPage"
          v-model:page-size="pagination.pageSize"
          :page-sizes="[10, 20, 50, 100]"
          :total="pagination.total"
          layout="total, sizes, prev, pager, next, jumper"
          background
          @size-change="handleSizeChange"
          @current-change="handlePageChange"
        />
      </div>
    </el-card>
  </div>
</template>

<style scoped>
/* ===========================================
   页面整体样式
   =========================================== */
.page-container {
  padding: 0;
  background: linear-gradient(135deg, #e8f5e9 0%, #e3f2fd 100%);
  min-height: 100vh;
}

/* ===========================================
   顶部导航栏样式
   =========================================== */
.header-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  border-bottom: 1px solid #e0e0e0;
  padding: 0 32px;
  height: 64px;
  box-shadow: 0 2px 8px rgba(33, 115, 70, 0.04);
}

.logo {
  height: 38px;
  margin-right: 16px;
}

.system-title {
  font-size: 22px;
  font-weight: bold;
  color: #217346;
  letter-spacing: 2px;
  flex: 1;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 18px;
  color: #666;
  font-size: 14px;
}

/* ===========================================
   主要内容卡片样式
   =========================================== */
.main-card {
  margin: 40px auto 0 auto;
  max-width: 1280px;
  border-radius: 12px;
  box-shadow: 0 4px 24px 0 rgba(33, 115, 70, 0.08);
  border: none;
  background: #fff;
}

.card-header {
  font-weight: bold;
  font-size: 20px;
  color: #217346;
}

/* ===========================================
   筛选区域样式
   =========================================== */
.filter-section {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 16px;
}

.filter-form {
  flex: 1;
  min-width: 300px;
}

.action-buttons {
  display: flex;
  gap: 12px;
  align-items: center;
}

/* ===========================================
   表格样式
   =========================================== */
.issue-table {
  margin-bottom: 20px;
}

/* 状态标签样式 */
.status-tag {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}

.status-rectifying {
  background: #fff3cd;
  color: #856404;
  border: 1px solid #ffeaa7;
}

.status-completed {
  background: #d1edff;
  color: #0c5aa6;
  border: 1px solid #a3d5ff;
}

.status-draft {
  background: #f8f9fa;
  color: #6c757d;
  border: 1px solid #dee2e6;
}

.status-submitted {
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.status-default {
  background: #e9ecef;
  color: #495057;
  border: 1px solid #ced4da;
}

/* ===========================================
   分页区域样式
   =========================================== */
.pagination-section {
  display: flex;
  justify-content: center;
  padding: 20px 0;
}

/* ===========================================
   响应式样式
   =========================================== */
@media (max-width: 768px) {
  .header-bar {
    padding: 0 16px;
    height: 56px;
  }

  .system-title {
    font-size: 18px;
  }

  .main-card {
    margin: 20px 16px 0 16px;
    max-width: none;
  }

  .filter-section {
    flex-direction: column;
    align-items: stretch;
  }

  .filter-form {
    min-width: auto;
  }

  .action-buttons {
    justify-content: center;
  }
}
</style>
