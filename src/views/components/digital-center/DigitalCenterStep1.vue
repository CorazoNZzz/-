<!--
  数字化指挥中心第一步：交办信息
  功能：一中队人员填写问题交办的基本信息
  字段：交办字段、属地、负责人、问题类型、线索描述
  权限：一中队人员填写
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
        :active="1"
        finish-status="success"
        align-center
        style="margin-bottom: 32px"
      >
        <el-step title="交办信息" description="数字化指挥中心 - 交办信息" />
        <el-step title="问题交办" />
        <el-step title="整改情况" />
      </el-steps>

      <!-- 表单内容 -->
      <div class="content-area">
        <h3 style="color: #217346; margin-bottom: 20px">数字化指挥中心 - 事件信息</h3>

        <el-form
          ref="formRef"
          :model="formData"
          :rules="formRules"
          label-width="120px"
          style="max-width: 800px"
        >
          <el-form-item label="交办字段" prop="assignmentField">
            <el-input
              v-model="formData.assignmentField"
              placeholder="请输入交办字段"
              maxlength="200"
              show-word-limit
            />
          </el-form-item>

          <el-form-item label="属地" prop="area">
            <el-select
              v-model="formData.area"
              placeholder="请选择属地"
              style="width: 100%"
            >
              <el-option label="龙山所" value="龙山所" />
              <el-option label="逍林所" value="逍林所" />
              <el-option label="周巷所" value="周巷所" />
              <el-option label="坎墩所" value="坎墩所" />
              <el-option label="观海卫所" value="观海卫所" />
              <el-option label="浒山所" value="浒山所" />
            </el-select>
          </el-form-item>

          <el-form-item label="负责人" prop="responsible">
            <el-input
              v-model="formData.responsible"
              placeholder="请输入负责人姓名"
              maxlength="50"
            />
          </el-form-item>

          <el-form-item label="问题类型" prop="problemType">
            <el-input
              v-model="formData.problemType"
              placeholder="请输入问题类型"
              maxlength="100"
            />
          </el-form-item>

          <el-form-item label="线索描述" prop="clueDescription">
            <el-input
              v-model="formData.clueDescription"
              type="textarea"
              :rows="4"
              placeholder="请详细描述发现的环境问题线索"
              maxlength="1000"
              show-word-limit
            />
          </el-form-item>
        </el-form>
      </div>

      <!-- 操作按钮 -->
      <div class="action-buttons">
        <div class="left-actions">
          <!-- 第一步没有上一步 -->
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
  assignmentField: '',
  area: '',
  responsible: '',
  problemType: '',
  clueDescription: '',
})

// 问题数据
const issueData = computed(() => ({
  id: issueId.value,
  formType: '数字化指挥中心',
  step: 1,
  ...formData.value,
}))

// 表单引用
const formRef = ref()

// 状态
const loading = ref(false)
const saving = ref(false)

// 表单验证规则
const formRules = {
  assignmentField: [{ required: true, message: '请输入交办字段', trigger: 'blur' }],
  area: [{ required: true, message: '请选择属地', trigger: 'change' }],
  responsible: [{ required: true, message: '请输入负责人', trigger: 'blur' }],
  problemType: [{ required: true, message: '请输入问题类型', trigger: 'blur' }],
  clueDescription: [
    { required: true, message: '请输入线索描述', trigger: 'blur' },
    { min: 10, message: '线索描述至少10个字符', trigger: 'blur' },
  ],
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
      // 加载第一步的数据
      if (result.data.formData.step1) {
        Object.assign(formData.value, result.data.formData.step1)
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
    { step1: formData.value },
    1, // 步骤1
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
      name: 'digital-center-step2',
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

.upload-demo {
  width: 100%;
}
</style>
