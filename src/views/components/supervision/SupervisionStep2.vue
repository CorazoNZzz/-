<!--
  督查在线第二步：问题交办
  功能：属地所人员填写整改相关信息和措施
  字段：整改时限、整改措施、整改状态、整改时间、整改情况、下步计划、上传附件
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
        <el-step title="问题交办" description="督查在线 - 问题交办" />
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
          <el-form-item label="整改时限" prop="deadline">
            <el-date-picker
              v-model="formData.deadline"
              type="date"
              placeholder="请选择整改时限"
              style="width: 100%"
            />
          </el-form-item>

          <el-form-item label="整改措施" prop="rectificationMeasures">
            <el-input
              v-model="formData.rectificationMeasures"
              type="textarea"
              :rows="4"
              placeholder="请详细描述整改措施"
              maxlength="1000"
              show-word-limit
            />
          </el-form-item>

          <el-form-item label="整改状态" prop="rectificationStatus">
            <el-radio-group v-model="formData.rectificationStatus">
              <el-radio value="整改中">整改中</el-radio>
              <el-radio value="整改完成">整改完成</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="整改时间" prop="rectificationTime">
            <el-date-picker
              v-model="formData.rectificationTime"
              type="datetime"
              placeholder="请选择整改时间"
              style="width: 100%"
            />
          </el-form-item>

          <el-form-item label="整改情况" prop="rectificationSituation">
            <el-input
              v-model="formData.rectificationSituation"
              type="textarea"
              :rows="4"
              placeholder="请详细描述整改情况"
              maxlength="1000"
              show-word-limit
            />
          </el-form-item>

          <el-form-item label="下步计划" prop="nextPlan">
            <el-input
              v-model="formData.nextPlan"
              type="textarea"
              :rows="3"
              placeholder="请输入下步计划"
              maxlength="500"
              show-word-limit
            />
          </el-form-item>

          <el-form-item label="上传附件">
            <el-upload
              class="upload-demo"
              drag
              multiple
              :auto-upload="false"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            >
              <el-icon class="el-icon--upload"><upload-filled /></el-icon>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <template #tip>
                <div class="el-upload__tip">支持 PDF/Word/图片 文件，且不超过 20MB</div>
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

          <ReportGenerator :issue-data="issueData" :form-type="'督查在线'" />

          <el-button type="primary" @click="submitStep" :loading="saving"> 提交 </el-button>
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
  deadline: null,
  rectificationMeasures: '',
  rectificationStatus: '',
  rectificationTime: null,
  rectificationSituation: '',
  nextPlan: '',
})

// 问题数据
const issueData = computed(() => ({
  id: issueId.value,
  formType: '督查在线',
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
  deadline: [{ required: true, message: '请选择整改时限', trigger: 'change' }],
  rectificationMeasures: [{ required: true, message: '请输入整改措施', trigger: 'blur' }],
  rectificationStatus: [{ required: true, message: '请选择整改状态', trigger: 'change' }],
  rectificationTime: [{ required: true, message: '请选择整改时间', trigger: 'change' }],
  rectificationSituation: [{ required: true, message: '请输入整改情况', trigger: 'blur' }],
  nextPlan: [{ required: true, message: '请输入下步计划', trigger: 'blur' }],
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

        // 如果是编辑模式（从第三步返回），清空需要重新填写的字段
        if (route.query.edit === 'true') {
          formData.value.rectificationStatus = ''
          formData.value.rectificationTime = null
          formData.value.rectificationSituation = ''
        }
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

// 提交第二步（进入第三步）
const submitStep = async () => {
  const isValid = await validateForm()
  if (!isValid) return

  saving.value = true

    try {
    // 保存当前步骤数据
    await saveData()

    // 创建新的整改记录
    const newRecord = {
      time: formData.value.rectificationTime,
      situation: formData.value.rectificationSituation,
      status: formData.value.rectificationStatus,
      createTime: new Date().toISOString(),
    }

    // 获取现有的第三步数据
    const existingResult = await MockAPI.getIssue(issueId.value)
    let existingRecords = []

    if (existingResult.success && existingResult.data.formData?.step3?.rectificationRecords) {
      existingRecords = existingResult.data.formData.step3.rectificationRecords
    }

    // 添加新记录到现有记录中
    const updatedRecords = [...existingRecords, newRecord]

    // 保存更新后的整改记录到第三步数据中
    await MockAPI.saveFormData(
      issueId.value,
      {
        step3: {
          currentStatus: formData.value.rectificationStatus,
          rectificationRecords: updatedRecords
        }
      },
      3, // 步骤3
      'processing' // 处理中状态
    )

    ElMessage.success('提交成功！')

    // 跳转到第三步
    router.push({
      name: 'supervision-step3',
      params: { id: issueId.value },
    })
  } catch (error) {
    console.error('提交失败:', error)
    ElMessage.error('提交失败，请重试')
  } finally {
    saving.value = false
  }
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
