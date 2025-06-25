<!--
  督查在线第三步：整改情况
  功能：属地所人员查看整改状态和历史记录，支持继续编辑
  权限：属地所人员查看和编辑
  作者：CorazoN
  创建时间：2025年6月
-->
<template>
  <div class="page-container">
    <div class="header-bar">
      <img src="/src/assets/logo.svg" class="logo" alt="logo" />
      <div class="system-title">环保局问题交办系统</div>
      <div class="header-actions">
        <span>登录人：管理员</span>
        <el-button type="primary" @click="handleGoBack">返回列表</el-button>
      </div>
    </div>

    <el-card shadow="always" class="main-card" v-loading="loading">
      <!-- 步骤条 -->
      <el-steps
        :active="3"
        finish-status="success"
        align-center
        style="margin-bottom: 32px"
      >
        <el-step title="交办信息" />
        <el-step title="问题交办" />
        <el-step title="整改情况" description="督查在线 - 整改情况" />
      </el-steps>

      <!-- 表单内容 -->
      <div class="content-area">

        <!-- 当前整改状态 -->
        <div class="status-section">
          <h4>当前整改状态</h4>
          <el-tag
            :type="currentStatus === '整改完成' ? 'success' : 'warning'"
            size="large"
            class="status-tag"
          >
            {{ currentStatus || '未知状态' }}
          </el-tag>
        </div>

        <!-- 整改情况记录 -->
        <div class="records-section">
          <h4>整改情况记录</h4>
          <div v-if="rectificationRecords.length === 0" class="no-records">
            暂无整改记录
          </div>
          <div v-else class="records-list">
            <div
              v-for="(record, index) in rectificationRecords"
              :key="index"
              class="record-item"
            >
              <div class="record-header">
                <span class="record-time">
                  <el-icon><Clock /></el-icon>
                  {{ formatDateTime(record.time) }}
                </span>
                <el-tag
                  :type="record.status === '整改完成' ? 'success' : 'warning'"
                  size="small"
                >
                  {{ record.status }}
                </el-tag>
              </div>
              <div class="record-content">
                {{ record.situation }}
              </div>
            </div>
          </div>
        </div>
      </div>

            <!-- 操作按钮 -->
      <div class="action-buttons">
        <div class="left-actions">
          <!-- 移除上一步按钮 -->
        </div>

        <div class="right-actions">
          <ReportGenerator :issue-data="issueData" :form-type="'督查在线'" />

          <!-- 只有整改中状态才显示继续编辑按钮 -->
          <el-button
            v-if="currentStatus === '整改中'"
            type="primary"
            @click="continueEdit"
          >
            继续编辑
          </el-button>

          <!-- 整改完成状态显示完成按钮 -->
          <el-button
            v-else-if="currentStatus === '整改完成'"
            type="success"
            disabled
          >
            整改已完成
          </el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Clock } from '@element-plus/icons-vue'
import ReportGenerator from '../../../components/ReportGenerator.vue'
import { MockAPI } from '../../../utils/api.js'

const route = useRoute()
const router = useRouter()

// 问题ID
const issueId = ref(route.params.id)

// 数据状态
const loading = ref(false)
const currentStatus = ref('')
const rectificationRecords = ref([])

// 问题数据
const issueData = computed(() => ({
  id: issueId.value,
  formType: '督查在线',
  step: 3,
  currentStatus: currentStatus.value,
  rectificationRecords: rectificationRecords.value,
}))

// 生命周期
onMounted(async () => {
  if (issueId.value && issueId.value !== 'new') {
    await loadIssueData()
  }
})

// 加载问题数据
const loadIssueData = async () => {
  loading.value = true

  try {
    const result = await MockAPI.getIssue(issueId.value)

    if (result.success && result.data.formData) {
      // 加载第三步的数据
      if (result.data.formData.step3) {
        currentStatus.value = result.data.formData.step3.currentStatus || ''
        rectificationRecords.value = result.data.formData.step3.rectificationRecords || []
      }
    } else {
      ElMessage.error('加载数据失败')
    }
  } catch (error) {
    console.error('加载数据失败:', error)
    ElMessage.error('加载数据失败，请重试')
  } finally {
    loading.value = false
  }
}

// 格式化日期时间
const formatDateTime = (dateTime) => {
  if (!dateTime) return ''

  const date = new Date(dateTime)
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

// 继续编辑（返回第二步）
const continueEdit = () => {
  router.push({
    name: 'supervision-step2',
    params: { id: issueId.value },
    query: { edit: 'true' } // 标记为编辑模式
  })
}

// 上一步功能已移除

// 返回列表
const handleGoBack = () => {
  router.push({ name: 'home' })
}
</script>

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
  max-width: 900px;
  border-radius: 12px;
  box-shadow: 0 4px 24px 0 rgba(33, 115, 70, 0.08);
  border: none;
  background: #fff;
}

.content-area {
  padding: 24px 16px;
  border: 1px solid #d0e6d5;
  border-radius: 8px;
  min-height: 300px;
  background: #f8fbf7;
  margin-bottom: 20px;
}

.status-section {
  margin-bottom: 30px;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
}

.status-section h4 {
  margin: 0 0 15px 0;
  color: #217346;
  font-size: 16px;
  font-weight: 600;
}

.status-tag {
  font-size: 16px;
  padding: 8px 16px;
}

.records-section {
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
}

.records-section h4 {
  margin: 0 0 20px 0;
  color: #217346;
  font-size: 16px;
  font-weight: 600;
}

.no-records {
  text-align: center;
  color: #999;
  padding: 40px 0;
  font-size: 14px;
}

.records-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.record-item {
  border: 1px solid #e8f5e9;
  border-radius: 8px;
  padding: 16px;
  background: #fafcfa;
  transition: all 0.3s ease;
}

.record-item:hover {
  border-color: #217346;
  box-shadow: 0 2px 8px rgba(33, 115, 70, 0.1);
}

.record-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.record-time {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #666;
  font-size: 14px;
}

.record-content {
  color: #333;
  line-height: 1.6;
  font-size: 14px;
}

.action-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-top: 1px solid #e0e0e0;
  background: #fff;
}

.left-actions,
.right-actions {
  display: flex;
  gap: 12px;
  align-items: center;
}

.el-steps {
  margin: 30px 0 16px 0;
}

:deep(.el-step__title) {
  font-size: 16px;
  font-weight: bold;
}

:deep(.el-step__description) {
  font-size: 14px;
  color: #666;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .record-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .action-buttons {
    flex-direction: column;
    gap: 16px;
  }

  .left-actions,
  .right-actions {
    width: 100%;
    justify-content: center;
  }
}
</style>
