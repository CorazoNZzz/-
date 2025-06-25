<!--
  数字化指挥中心第三步：整改情况
  功能：属地所人员查看和更新整改完成状态
  状态：固定显示"整改完成"
  权限：属地所人员查看
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

    <el-card shadow="always" class="main-card">
      <!-- 步骤条 -->
      <el-steps
        :active="3"
        finish-status="success"
        align-center
        style="margin-bottom: 32px"
      >
        <el-step title="交办信息" />
        <el-step title="问题交办" />
        <el-step title="整改情况" description="数字化指挥中心 - 整改情况" />
      </el-steps>

      <!-- 表单内容 -->
      <div class="content-area">
                <!-- 当前整改状态 -->
        <div class="status-section">
          <h4>当前整改状态</h4>
          <el-tag
            type="success"
            size="large"
            class="status-tag"
          >
            整改完成
          </el-tag>
        </div>
      </div>

      <!-- 操作按钮 -->
      <div class="action-buttons">
        <div class="left-actions">
          <!-- 移除上一步按钮 -->
        </div>

        <div class="right-actions">
          <el-button @click="saveDraft" :loading="saving"> 保存草稿 </el-button>

          <ReportGenerator :issue-data="issueData" :form-type="'数字化指挥中心'" />

                    <el-button
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
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import ReportGenerator from '../../../components/ReportGenerator.vue'
import { MockAPI } from '../../../utils/api.js'

const route = useRoute()
const router = useRouter()

// 问题ID
const issueId = ref(route.params.id)

// 问题数据
const issueData = computed(() => ({
  id: issueId.value,
  formType: '数字化指挥中心',
  step: 3,
  currentStatus: '整改完成',
}))

// 状态
const saving = ref(false)

// 保存草稿
const saveDraft = async () => {
  saving.value = true

  try {
    const result = await MockAPI.saveFormData(
      issueId.value,
      { step3: { status: '整改完成' } },
      3,
      'completed'
    )

    if (result.success) {
      ElMessage.success('保存成功！')
    }
  } catch (error) {
    console.error('保存失败:', error)
    ElMessage.error('保存失败，请重试')
  } finally {
    saving.value = false
  }
}

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
  margin-bottom: 24px;
}

.status-section h4 {
  color: #217346;
  margin-bottom: 16px;
  font-size: 16px;
  font-weight: 600;
}

.status-tag {
  font-size: 16px;
  padding: 8px 16px;
  border-radius: 6px;
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
</style>
