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
        style="cursor: pointer; margin-bottom: 32px"
      >
        <el-step title="交办信息" @click="goToStep1" />
        <el-step title="问题交办" @click="goToStep2" />
        <el-step title="整改情况" description="督查在线 - 整改情况" />
      </el-steps>

      <!-- 表单内容 -->
      <div class="content-area">
        <h3 style="color: #217346; margin-bottom: 20px">督查在线 - 整改情况</h3>

        <!-- 整改记录列表 -->
        <div v-if="rectificationRecords.length > 0" class="records-section">
          <h4 style="color: #666; margin-bottom: 16px">整改记录</h4>
          <div v-for="(record, index) in rectificationRecords" :key="index" class="record-item">
            <div class="record-header">
              <span class="record-title">第{{ index + 1 }}次整改记录</span>
              <span class="record-date">{{ formatDate(record.date) }}</span>
            </div>
            <div class="record-content">
              <p><strong>整改措施：</strong>{{ record.measures }}</p>
              <p><strong>整改进度：</strong>{{ record.progress }}</p>
              <p><strong>完成情况：</strong>{{ record.completion }}</p>
            </div>
          </div>
        </div>

        <!-- 新增整改记录表单 -->
        <el-form
          ref="formRef"
          :model="formData"
          :rules="formRules"
          label-width="120px"
          style="max-width: 800px"
        >
          <el-divider content-position="left">新增整改记录</el-divider>

          <el-form-item label="整改日期" prop="rectificationDate">
            <el-date-picker
              v-model="formData.rectificationDate"
              type="date"
              placeholder="请选择整改日期"
              style="width: 100%"
            />
          </el-form-item>

          <el-form-item label="整改措施" prop="rectificationMeasures">
            <el-input
              v-model="formData.rectificationMeasures"
              type="textarea"
              :rows="4"
              placeholder="请详细描述采取的整改措施"
              maxlength="1000"
              show-word-limit
            />
          </el-form-item>

          <el-form-item label="整改进度" prop="rectificationProgress">
            <el-select
              v-model="formData.rectificationProgress"
              placeholder="请选择整改进度"
              style="width: 100%"
            >
              <el-option label="未开始" value="未开始" />
              <el-option label="进行中" value="进行中" />
              <el-option label="已完成" value="已完成" />
              <el-option label="需要延期" value="需要延期" />
            </el-select>
          </el-form-item>

          <el-form-item label="完成情况" prop="completionStatus">
            <el-input
              v-model="formData.completionStatus"
              type="textarea"
              :rows="3"
              placeholder="请描述具体的完成情况"
              maxlength="500"
              show-word-limit
            />
          </el-form-item>

          <el-form-item label="存在问题" prop="existingIssues">
            <el-input
              v-model="formData.existingIssues"
              type="textarea"
              :rows="2"
              placeholder="如有问题请详细说明，无问题可不填"
              maxlength="500"
              show-word-limit
            />
          </el-form-item>

          <el-form-item label="整改照片">
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
          <el-button @click="prevStep"> 上一步 </el-button>
        </div>

        <div class="right-actions">
          <el-button @click="saveDraft" :loading="saving"> 保存草稿 </el-button>

          <ReportGenerator :issue-data="issueData" :form-type="'督查在线'" />

          <!-- 督查在线支持继续编辑 -->
          <el-button type="success" @click="continueEdit" :loading="saving"> 继续编辑 </el-button>
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
  rectificationDate: null,
  rectificationMeasures: '',
  rectificationProgress: '',
  completionStatus: '',
  existingIssues: '',
})

// 整改记录列表
const rectificationRecords = ref([])

// 问题数据
const issueData = computed(() => ({
  id: issueId.value,
  formType: '督查在线',
  rectificationRecords: rectificationRecords.value,
  ...formData.value,
}))

// 表单引用
const formRef = ref()

// 状态
const loading = ref(false)
const saving = ref(false)

// 表单验证规则
const formRules = {
  rectificationDate: [{ required: true, message: '请选择整改日期', trigger: 'change' }],
  rectificationMeasures: [{ required: true, message: '请输入整改措施', trigger: 'blur' }],
  rectificationProgress: [{ required: true, message: '请选择整改进度', trigger: 'change' }],
  completionStatus: [{ required: true, message: '请输入完成情况', trigger: 'blur' }],
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
      if (result.data.rectificationRecords) {
        rectificationRecords.value = result.data.rectificationRecords
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

// 格式化日期
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('zh-CN')
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

// 上一步
const prevStep = () => {
  router.push({
    name: 'supervision-step2',
    params: { id: issueId.value },
  })
}

// 继续编辑（督查在线特有功能）
const continueEdit = async () => {
  // 验证表单
  const isValid = await validateForm()
  if (!isValid) return

  saving.value = true

  try {
    // 将当前表单数据添加到整改记录
    const newRecord = {
      date: formData.value.rectificationDate,
      measures: formData.value.rectificationMeasures,
      progress: formData.value.rectificationProgress,
      completion: formData.value.completionStatus,
      issues: formData.value.existingIssues,
    }

    rectificationRecords.value.push(newRecord)

    // 清空表单
    formData.value = {
      rectificationDate: null,
      rectificationMeasures: '',
      rectificationProgress: '',
      completionStatus: '',
      existingIssues: '',
    }

    await saveData()

    ElMessage.success('整改记录已保存！可以继续添加整改记录。')

    // 重新加载数据
    await loadIssueData()
  } catch (error) {
    console.error('保存失败:', error)
    ElMessage.error('保存失败，请重试')
  } finally {
    saving.value = false
  }
}

// 步骤导航
const goToStep1 = () => {
  router.push({
    name: 'supervision-step1',
    params: { id: issueId.value },
  })
}

const goToStep2 = () => {
  router.push({
    name: 'supervision-step2',
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

.records-section {
  margin-bottom: 24px;
}

.record-item {
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
}

.record-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid #f0f0f0;
}

.record-title {
  font-weight: bold;
  color: #217346;
}

.record-date {
  color: #666;
  font-size: 14px;
}

.record-content p {
  margin: 8px 0;
  color: #333;
  line-height: 1.6;
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
