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
        style="cursor: pointer; margin-bottom: 32px"
      >
        <el-step title="交办信息" description="督查在线 - 交办信息" />
        <el-step title="问题交办" @click="goToStep2" />
        <el-step title="整改情况" @click="goToStep3" />
      </el-steps>

      <!-- 表单内容 -->
      <div class="content-area">
        <h3 style="color: #217346; margin-bottom: 20px">督查在线 - 交办信息</h3>

        <el-form
          ref="formRef"
          :model="formData"
          :rules="formRules"
          label-width="120px"
          style="max-width: 800px"
        >
          <el-form-item label="问题标题" prop="title">
            <el-input
              v-model="formData.title"
              placeholder="请输入问题标题"
              maxlength="100"
              show-word-limit
            />
          </el-form-item>

          <el-form-item label="问题内容" prop="content">
            <el-input
              v-model="formData.content"
              type="textarea"
              :rows="4"
              placeholder="请详细描述问题内容"
              maxlength="1000"
              show-word-limit
            />
          </el-form-item>

          <el-form-item label="属地" prop="location">
            <el-input v-model="formData.location" placeholder="请输入属地信息" />
          </el-form-item>

          <el-form-item label="联系人" prop="contact">
            <el-input v-model="formData.contact" placeholder="请输入联系人姓名" />
          </el-form-item>

          <el-form-item label="联系电话" prop="phone">
            <el-input v-model="formData.phone" placeholder="请输入联系电话" />
          </el-form-item>

          <el-form-item label="整改时限" prop="deadline">
            <el-date-picker
              v-model="formData.deadline"
              type="date"
              placeholder="请选择整改时限"
              style="width: 100%"
            />
          </el-form-item>

          <el-form-item label="现场照片">
            <el-upload class="upload-demo" drag multiple :auto-upload="false" accept="image/*">
              <el-icon class="el-icon--upload"><upload-filled /></el-icon>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <template #tip>
                <div class="el-upload__tip">支持 jpg/png 文件，且不超过 10MB</div>
              </template>
            </el-upload>
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

          <ReportGenerator :issue-data="issueData" :form-type="'督查在线'" />

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
import { UploadFilled } from '@element-plus/icons-vue'
import ReportGenerator from '../../../components/ReportGenerator.vue'

const route = useRoute()
const router = useRouter()

// 问题ID
const issueId = ref(route.params.id)

// 表单数据
const formData = ref({
  title: '',
  content: '',
  location: '',
  contact: '',
  phone: '',
  deadline: null,
})

// 问题数据
const issueData = computed(() => ({
  id: issueId.value,
  formType: '督查在线',
  ...formData.value,
}))

// 表单引用
const formRef = ref()

// 状态
const loading = ref(false)
const saving = ref(false)

// 表单验证规则
const formRules = {
  title: [{ required: true, message: '请输入问题标题', trigger: 'blur' }],
  content: [{ required: true, message: '请输入问题内容', trigger: 'blur' }],
  location: [{ required: true, message: '请输入属地信息', trigger: 'blur' }],
  contact: [{ required: true, message: '请输入联系人', trigger: 'blur' }],
  phone: [
    { required: true, message: '请输入联系电话', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' },
  ],
  deadline: [{ required: true, message: '请选择整改时限', trigger: 'change' }],
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
    const response = await fetch(`http://localhost:5000/api/issues/${issueId.value}`)
    const result = await response.json()

    if (result.success) {
      Object.assign(formData.value, result.data)
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
const saveData = async () => {
  const response = await fetch(`http://localhost:5000/api/issues/${issueId.value}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(issueData.value),
  })

  const result = await response.json()
  if (!result.success) {
    throw new Error(result.message || '保存失败')
  }

  return result.data
}

// 保存草稿
const saveDraft = async () => {
  saving.value = true

  try {
    await saveData()
    ElMessage.success('草稿保存成功！')

    setTimeout(() => {
      router.push('/')
    }, 1000)
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
    await saveData()

    router.push({
      name: 'supervision-step2',
      params: { id: issueId.value },
    })
  } catch (error) {
    console.error('保存失败:', error)
    ElMessage.error('保存失败，请重试')
  } finally {
    saving.value = false
  }
}

// 步骤导航
const goToStep2 = () => {
  router.push({
    name: 'supervision-step2',
    params: { id: issueId.value },
  })
}

const goToStep3 = () => {
  router.push({
    name: 'supervision-step3',
    params: { id: issueId.value },
  })
}

// 返回列表
const handleGoBack = () => {
  router.push('/')
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
