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
        <el-step title="整改情况" description="数字化指挥中心 - 整改情况" />
      </el-steps>

      <!-- 表单内容 -->
      <div class="content-area">
        <h3 style="color: #217346; margin-bottom: 20px">数字化指挥中心 - 整改情况</h3>

        <el-form
          ref="formRef"
          :model="formData"
          :rules="formRules"
          label-width="140px"
          style="max-width: 900px"
        >
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="处置开始时间" prop="disposalStartTime">
                <el-date-picker
                  v-model="formData.disposalStartTime"
                  type="datetime"
                  placeholder="请选择处置开始时间"
                  style="width: 100%"
                />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="处置完成时间" prop="disposalEndTime">
                <el-date-picker
                  v-model="formData.disposalEndTime"
                  type="datetime"
                  placeholder="请选择处置完成时间"
                  style="width: 100%"
                />
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="处置措施" prop="disposalMeasures">
            <el-input
              v-model="formData.disposalMeasures"
              type="textarea"
              :rows="4"
              placeholder="请详细描述采取的处置措施"
              maxlength="1000"
              show-word-limit
            />
          </el-form-item>

          <el-form-item label="处置效果" prop="disposalEffect">
            <el-input
              v-model="formData.disposalEffect"
              type="textarea"
              :rows="3"
              placeholder="请描述处置后的效果"
              maxlength="800"
              show-word-limit
            />
          </el-form-item>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="处置状态" prop="disposalStatus">
                <el-select
                  v-model="formData.disposalStatus"
                  placeholder="请选择处置状态"
                  style="width: 100%"
                >
                  <el-option label="已完成" value="已完成" />
                  <el-option label="部分完成" value="部分完成" />
                  <el-option label="处置中" value="处置中" />
                  <el-option label="需要协调" value="需要协调" />
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="验收结果" prop="acceptanceResult">
                <el-select
                  v-model="formData.acceptanceResult"
                  placeholder="请选择验收结果"
                  style="width: 100%"
                >
                  <el-option label="合格" value="合格" />
                  <el-option label="基本合格" value="基本合格" />
                  <el-option label="不合格" value="不合格" />
                  <el-option label="待验收" value="待验收" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="参与部门" prop="participatingDepartments">
            <el-checkbox-group v-model="formData.participatingDepartments">
              <el-checkbox value="环保部门">环保部门</el-checkbox>
              <el-checkbox value="公安部门">公安部门</el-checkbox>
              <el-checkbox value="消防部门">消防部门</el-checkbox>
              <el-checkbox value="住建部门">住建部门</el-checkbox>
              <el-checkbox value="应急管理">应急管理</el-checkbox>
              <el-checkbox value="市场监管">市场监管</el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <el-form-item label="资源投入" prop="resourceInput">
            <el-input
              v-model="formData.resourceInput"
              type="textarea"
              :rows="2"
              placeholder="请描述投入的人力、物力、财力等资源"
              maxlength="500"
              show-word-limit
            />
          </el-form-item>

          <el-form-item label="技术手段" prop="technicalMeans">
            <el-input
              v-model="formData.technicalMeans"
              type="textarea"
              :rows="2"
              placeholder="请描述使用的技术手段和设备"
              maxlength="500"
              show-word-limit
            />
          </el-form-item>

          <el-form-item label="监测数据" prop="monitoringResults">
            <el-input
              v-model="formData.monitoringResults"
              type="textarea"
              :rows="3"
              placeholder="请输入处置后的监测数据和结果"
              maxlength="800"
              show-word-limit
            />
          </el-form-item>

          <el-form-item label="存在问题" prop="remainingIssues">
            <el-input
              v-model="formData.remainingIssues"
              type="textarea"
              :rows="2"
              placeholder="如仍有问题请详细说明，无问题可不填"
              maxlength="500"
              show-word-limit
            />
          </el-form-item>

          <el-form-item label="后续建议" prop="followUpSuggestions">
            <el-input
              v-model="formData.followUpSuggestions"
              type="textarea"
              :rows="2"
              placeholder="请提出后续工作建议"
              maxlength="500"
              show-word-limit
            />
          </el-form-item>

          <el-form-item label="处置负责人" prop="disposalPerson">
            <el-input v-model="formData.disposalPerson" placeholder="请输入处置负责人姓名" />
          </el-form-item>

          <el-form-item label="联系方式" prop="contactInfo">
            <el-input v-model="formData.contactInfo" placeholder="请输入联系电话或邮箱" />
          </el-form-item>

          <el-form-item label="处置前后对比照片">
            <el-upload class="upload-demo" drag multiple :auto-upload="false" accept="image/*">
              <el-icon class="el-icon--upload"><upload-filled /></el-icon>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <template #tip>
                <div class="el-upload__tip">
                  建议上传处置前后对比照片，支持 jpg/png 文件，且不超过 10MB
                </div>
              </template>
            </el-upload>
          </el-form-item>

          <el-form-item label="处置报告">
            <el-upload
              class="upload-demo"
              drag
              multiple
              :auto-upload="false"
              accept=".pdf,.doc,.docx"
            >
              <el-icon class="el-icon--upload"><upload-filled /></el-icon>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <template #tip>
                <div class="el-upload__tip">
                  如处置报告、监测报告等，支持 PDF/Word 文件，且不超过 20MB
                </div>
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

          <ReportGenerator :issue-data="issueData" :form-type="'数字化指挥中心'" />

          <!-- 数字化指挥中心显示完成按钮 -->
          <el-button type="success" @click="completeIssue" :loading="saving"> 完成 </el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { UploadFilled } from '@element-plus/icons-vue'
import ReportGenerator from '../../../components/ReportGenerator.vue'

const route = useRoute()
const router = useRouter()

// 问题ID
const issueId = ref(route.params.id)

// 表单数据
const formData = ref({
  disposalStartTime: null,
  disposalEndTime: null,
  disposalMeasures: '',
  disposalEffect: '',
  disposalStatus: '',
  acceptanceResult: '',
  participatingDepartments: [],
  resourceInput: '',
  technicalMeans: '',
  monitoringResults: '',
  remainingIssues: '',
  followUpSuggestions: '',
  disposalPerson: '',
  contactInfo: '',
})

// 问题数据
const issueData = computed(() => ({
  id: issueId.value,
  formType: '数字化指挥中心',
  ...formData.value,
}))

// 表单引用
const formRef = ref()

// 状态
const loading = ref(false)
const saving = ref(false)

// 表单验证规则
const formRules = {
  disposalStartTime: [{ required: true, message: '请选择处置开始时间', trigger: 'change' }],
  disposalEndTime: [{ required: true, message: '请选择处置完成时间', trigger: 'change' }],
  disposalMeasures: [{ required: true, message: '请输入处置措施', trigger: 'blur' }],
  disposalEffect: [{ required: true, message: '请输入处置效果', trigger: 'blur' }],
  disposalStatus: [{ required: true, message: '请选择处置状态', trigger: 'change' }],
  acceptanceResult: [{ required: true, message: '请选择验收结果', trigger: 'change' }],
  disposalPerson: [{ required: true, message: '请输入处置负责人', trigger: 'blur' }],
  contactInfo: [{ required: true, message: '请输入联系方式', trigger: 'blur' }],
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

// 上一步
const prevStep = () => {
  router.push({
    name: 'digital-center-step2',
    params: { id: issueId.value },
  })
}

// 完成问题（数字化指挥中心）
const completeIssue = async () => {
  // 验证表单
  const isValid = await validateForm()
  if (!isValid) return

  try {
    await ElMessageBox.confirm(
      '确认完成该数字化指挥中心问题的处理吗？完成后将无法修改。',
      '确认完成',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      },
    )

    saving.value = true

    // 设置状态为已完成
    const completeData = {
      ...issueData.value,
      status: '已完成',
    }

    const response = await fetch(`http://localhost:5000/api/issues/${issueId.value}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(completeData),
    })

    const result = await response.json()
    if (!result.success) {
      throw new Error(result.message || '完成失败')
    }

    ElMessage.success('数字化指挥中心问题处理完成！')

    // 返回列表页
    setTimeout(() => {
      router.push('/')
    }, 1500)
  } catch (error) {
    if (error !== 'cancel') {
      console.error('完成失败:', error)
      ElMessage.error('完成失败，请重试')
    }
  } finally {
    saving.value = false
  }
}

// 步骤导航
const goToStep1 = () => {
  router.push({
    name: 'digital-center-step1',
    params: { id: issueId.value },
  })
}

const goToStep2 = () => {
  router.push({
    name: 'digital-center-step2',
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
  max-width: 1000px;
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
  margin-bottom: 16px;
}
</style>
