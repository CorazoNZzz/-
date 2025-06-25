<script setup>
import { ref, computed, onMounted } from 'vue'
import { Search, Plus } from '@element-plus/icons-vue'
import MockAPI from '../utils/api.js'

// --- 新增：模拟当前登录的用户信息 ---
// 后续这里的数据将通过调用API从后端获取
const currentUser = ref({
  // '一中队人员' 或 '属地所人员'
  role: '一中队人员',
  // 角色可以为: '一中队人员', '负责人', '管理员', '属地所人员'
  // username: 'testuser'
})

// --- 新增：计算属性，用于判断当前用户是否有权新建问题 ---
const canCreateIssue = computed(() => {
  // 根据新需求，属地所人员无权新建问题
  return currentUser.value.role !== '属地所人员'
})

// 用于表单筛选的响应式数据
const filterFormType = ref('')

// 表格数据和加载状态
const tableData = ref([])
const loading = ref(false)

// 获取问题列表
const fetchIssueList = async () => {
  loading.value = true
  try {
    const result = await MockAPI.getIssueList()
    if (result.success) {
      tableData.value = result.data.list
    }
  } catch (error) {
    console.error('获取问题列表失败:', error)
  } finally {
    loading.value = false
  }
}

// 组件挂载时获取数据
onMounted(() => {
  fetchIssueList()
})

// 格式化整改状态，用于在表格中显示不同的颜色
const getStatusClass = (status) => {
  switch (status) {
    case '整改中':
    case '处理中':
      return 'status-rectifying'
    case '整改完成':
    case '已完成':
      return 'status-completed'
    case '草稿':
    case '待处理':
      return 'status-draft'
    case '已提交': // 新增状态
      return 'status-submitted'
    default:
      return ''
  }
}

// 获取问题查看路由
const getIssueViewRoute = (row) => {
  const typeMap = {
    督查在线: 'supervision',
    远程帮扶: 'remote-help',
    数字化指挥中心: 'digital-center',
    线索核查: 'clue-check',
  }

  const routeType = typeMap[row.formType] || 'supervision'
  return `/issue/${row.id}/${routeType}/step1`
}
</script>

<template>
  <div class="page-container">
    <div class="header-bar">
      <img src="/src/assets/logo.svg" class="logo" alt="logo" />
      <div class="system-title">环保局问题交办系统</div>
      <div class="header-actions">
        <span>登录人：管理员</span>
      </div>
    </div>
    <el-card shadow="always" class="main-card">
      <template #header>
        <div class="card-header">
          <span>问题汇总</span>
        </div>
      </template>
      <el-alert
        title="请及时处理待整改问题，保障环保工作高效推进。"
        type="info"
        show-icon
        style="margin-bottom: 18px"
      />
      <div class="filter-section">
        <el-form :inline="true">
          <el-form-item label="筛选表单类型：">
            <el-select v-model="filterFormType" placeholder="全部" clearable style="width: 200px">
              <el-option label="督查在线" value="督查在线" />
              <el-option label="远程帮扶" value="远程帮扶" />
              <el-option label="数字化指挥中心" value="数字化指挥中心" />
              <el-option label="线索核查" value="线索核查" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :icon="Search">查询</el-button>
          </el-form-item>
        </el-form>
        <div>
          <router-link to="/issue/create" v-if="canCreateIssue">
            <el-button type="primary" size="large" :icon="Plus">新建问题</el-button>
          </router-link>
        </div>
      </div>
      <el-table
        :data="tableData"
        style="width: 100%"
        border
        stripe
        class="issue-table"
        v-loading="loading"
        element-loading-text="加载中..."
      >
        <el-table-column type="index" label="序号" width="80" align="center" />
        <el-table-column prop="name" label="问题名称" min-width="200" />
        <el-table-column prop="formType" label="表单类型" width="150" align="center" />
        <el-table-column prop="location" label="属地" width="150" align="center" />
        <el-table-column prop="contact" label="联系人/负责人" width="120" align="center" />
        <el-table-column prop="deadline" label="整改时限" width="150" align="center" />
        <el-table-column label="整改状态" width="120" align="center">
          <template #default="{ row }">
            <span :class="['status-tag', getStatusClass(row.status)]">{{ row.status }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120" align="center" fixed="right">
          <template #default="{ row }">
            <router-link :to="getIssueViewRoute(row)">
              <el-button type="primary" link>查看</el-button>
            </router-link>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-section">
        <el-pagination background layout="prev, pager, next, total" :total="tableData.length" />
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.page-container {
  padding: 0;
  background: linear-gradient(135deg, #e8f5e9 0%, #e3f2fd 100%);
  min-height: 100vh;
}
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
}
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
  letter-spacing: 1px;
}
.filter-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  background: #f8fbf7;
  padding: 12px 12px 4px 12px;
  border-radius: 8px;
}
.pagination-section {
  display: flex;
  justify-content: center;
  margin-top: 24px;
}
.issue-table ::v-deep .el-table__header th {
  background: #e3f2fd;
  color: #217346;
  font-weight: bold;
  font-size: 15px;
}
.issue-table ::v-deep .el-table__row td {
  font-size: 14px;
  padding: 8px 6px;
}
.status-tag {
  display: inline-block;
  min-width: 60px;
  padding: 2px 10px;
  border-radius: 12px;
  font-weight: bold;
  font-size: 15px;
  text-align: center;
}
.status-draft {
  background: #f0f0f0;
  color: #6c757d;
}
.status-rectifying {
  background: #fff7e6;
  color: #e67e22;
}
.status-completed {
  background: #e6f9ed;
  color: #27ae60;
}
.status-submitted {
  background: #e3f2fd;
  color: #007bff;
}
</style>
