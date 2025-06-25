<!--
  远程帮扶第二步：问题交办
  功能：属地所人员填写问题内容和整改情况
  字段：问题内容、整改情况、整改前照片、整改后照片
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
        <el-step title="问题交办" description="远程帮扶 - 问题交办" />
        <el-step title="效果评估" />
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
          <el-form-item label="问题内容" prop="problemContent">
            <el-input
              v-model="formData.problemContent"
              type="textarea"
              :rows="4"
              placeholder="请详细描述发现的环境问题"
              maxlength="1000"
              show-word-limit
            />
          </el-form-item>

          <el-form-item label="整改情况" prop="rectificationSituation">
            <el-input
              v-model="formData.rectificationSituation"
              type="textarea"
              :rows="4"
              placeholder="请详细描述整改措施和进展情况"
              maxlength="1000"
              show-word-limit
            />
          </el-form-item>

          <el-form-item label="整改前照片证据">
            <el-upload
              class="upload-demo"
              drag
              multiple
              :auto-upload="false"
              accept="image/*"
              :on-change="handleBeforePhotoChange"
              :on-remove="handleBeforePhotoRemove"
              :file-list="formData.beforePhotos"
            >
              <el-icon class="el-icon--upload"><upload-filled /></el-icon>
              <div class="el-upload__text">将照片拖到此处，或<em>点击上传</em></div>
              <template #tip>
                <div class="el-upload__tip">支持 jpg/png 格式，且不超过 10MB</div>
              </template>
            </el-upload>
          </el-form-item>

          <el-form-item label="整改后照片证据">
            <el-upload
              class="upload-demo"
              drag
              multiple
              :auto-upload="false"
              accept="image/*"
              :on-change="handleAfterPhotoChange"
              :on-remove="handleAfterPhotoRemove"
              :file-list="formData.afterPhotos"
            >
              <el-icon class="el-icon--upload"><upload-filled /></el-icon>
              <div class="el-upload__text">将照片拖到此处，或<em>点击上传</em></div>
              <template #tip>
                <div class="el-upload__tip">支持 jpg/png 格式，且不超过 10MB</div>
              </template>
            </el-upload>
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

          <ReportGenerator :issue-data="issueData" :form-type="'远程帮扶'" />

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
import { MockAPI } from '../../../utils/api.js'

const route = useRoute()
const router = useRouter()

// 问题ID
const issueId = ref(route.params.id)

// 表单数据
const formData = ref({
  problemContent: '',
  rectificationSituation: '',
  beforePhotos: [],
  afterPhotos: [],
})

// 问题数据
const issueData = computed(() => ({
  id: issueId.value,
  formType: '远程帮扶',
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
  problemContent: [{ required: true, message: '请输入问题内容', trigger: 'blur' }],
  rectificationSituation: [{ required: true, message: '请输入整改情况', trigger: 'blur' }],
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
const saveData = async () => {
  const result = await MockAPI.saveFormData(
    issueId.value,
    { step2: formData.value },
    2, // 步骤2
    'draft' // 草稿状态
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
    await saveData()
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
    await saveData()

    router.push({
      name: 'remote-help-step3',
      params: { id: issueId.value },
    })
  } catch (error) {
    console.error('保存失败:', error)
    ElMessage.error('保存失败，请重试')
  } finally {
    saving.value = false
  }
}

// 整改前照片处理
const handleBeforePhotoChange = (file, fileList) => {
  formData.value.beforePhotos = fileList
}

const handleBeforePhotoRemove = (file, fileList) => {
  formData.value.beforePhotos = fileList
}

// 整改后照片处理
const handleAfterPhotoChange = (file, fileList) => {
  formData.value.afterPhotos = fileList
}

const handleAfterPhotoRemove = (file, fileList) => {
  formData.value.afterPhotos = fileList
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
