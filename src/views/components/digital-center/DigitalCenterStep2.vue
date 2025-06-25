<!--
  数字化指挥中心第二步：问题交办
  功能：属地所人员填写核查反馈和处理情况
  字段：核查反馈、调查核实情况、处理情况
  权限：属地所人员填写
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
        :active="2"
        finish-status="success"
        align-center
        style="margin-bottom: 32px"
      >
        <el-step title="交办信息" />
        <el-step title="问题交办" description="数字化指挥中心 - 问题交办" />
        <el-step title="整改情况" />
      </el-steps>

      <!-- 表单内容 -->
      <div class="content-area">
        <el-form
          ref="formRef"
          :model="formData"
          :rules="formRules"
          label-width="120px"
          style="max-width: 800px"
        >
          <el-form-item label="核查反馈" prop="investigationFeedback">
            <el-input
              v-model="formData.investigationFeedback"
              type="textarea"
              :rows="4"
              placeholder="请详细描述核查反馈情况"
              maxlength="1000"
              show-word-limit
            />
          </el-form-item>

          <el-form-item label="调查核实情况" prop="investigationSituation">
            <el-input
              v-model="formData.investigationSituation"
              type="textarea"
              :rows="4"
              placeholder="请详细描述调查核实的具体情况"
              maxlength="1000"
              show-word-limit
            />
          </el-form-item>

          <el-form-item label="处理情况" prop="handlingSituation">
            <el-input
              v-model="formData.handlingSituation"
              type="textarea"
              :rows="4"
              placeholder="请详细描述处理措施和执行情况"
              maxlength="1000"
              show-word-limit
            />
          </el-form-item>
        </el-form>
      </div>

      <!-- 操作按钮 -->
      <div class="action-buttons">
        <div class="left-actions">
          <!-- 移除上一步按钮 -->
        </div>

        <div class="right-actions">
          <el-button @click="saveDraft" :loading="saving"> 保存草稿 </el-button>

          <ReportGenerator :issue-data="issueData" :form-type="'数字化指挥中心'" />

          <el-button type="primary" @click="nextStep" :loading="saving"> 下一步 </el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import ReportGenerator from '../../../components/ReportGenerator.vue'
import { MockAPI } from '../../../utils/api.js'

const route = useRoute()
const router = useRouter()

// 问题ID
const issueId = ref(route.params.id)

// 表单数据
const formData = ref({
  investigationFeedback: '',
  investigationSituation: '',
  handlingSituation: '',
})

// 问题数据
const issueData = computed(() => ({
  id: issueId.value,
  formType: '数字化指挥中心',
  step: 2,
  ...formData.value,
}))

// 表单引用
const formRef = ref()

// 状态
const loading = ref(false)
const saving = ref(false)

// 表单验证规则
const formRules = {
  investigationFeedback: [{ required: true, message: '请输入核查反馈', trigger: 'blur' }],
  investigationSituation: [{ required: true, message: '请输入调查核实情况', trigger: 'blur' }],
  handlingSituation: [{ required: true, message: '请输入处理情况', trigger: 'blur' }],
}

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
      // 加载第二步的数据
      if (result.data.formData.step2) {
        Object.assign(formData.value, result.data.formData.step2)
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

// 验证表单
const validateForm = async () => {
  return await formRef.value.validate().catch(() => false)
}

// 保存数据
const saveData = async (status = 'draft') => {
  const result = await MockAPI.saveFormData(
    issueId.value,
    { step2: formData.value },
    2, // 步骤2
    status
  )

  if (!result.success) {
    throw new Error(result.message || '保存失败')
  }

  return result.data
}

// 保存草稿
const saveDraft = async () => {
  saving.value = true

  try {
    await saveData('draft')
    ElMessage.success('草稿保存成功！')
  } catch (error) {
    console.error('保存草稿失败:', error)
    ElMessage.error('保存草稿失败，请重试')
  } finally {
    saving.value = false
  }
}

// 下一步
const nextStep = async () => {
  const isValid = await validateForm()
  if (!isValid) return

  saving.value = true

  try {
    await saveData('submitted')

    router.push({
      name: 'digital-center-step3',
      params: { id: issueId.value },
    })
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
