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
        <el-step title="交办信息" description="数字化指挥中心 - 交办信息" />
        <el-step title="问题交办" @click="goToStep2" />
        <el-step title="整改情况" @click="goToStep3" />
      </el-steps>

      <!-- 表单内容 -->
      <div class="content-area">
        <h3 style="color: #217346; margin-bottom: 20px">数字化指挥中心 - 交办信息</h3>

        <el-form
          ref="formRef"
          :model="formData"
          :rules="formRules"
          label-width="140px"
          style="max-width: 900px"
        >
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="交办日期" prop="assignDate">
                <el-date-picker
                  v-model="formData.assignDate"
                  type="date"
                  placeholder="请选择交办日期"
                  style="width: 100%"
                />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="交办编号" prop="assignNumber">
                <el-input v-model="formData.assignNumber" placeholder="请输入交办编号" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="问题类型" prop="problemType">
            <el-select
              v-model="formData.problemType"
              placeholder="请选择问题类型"
              style="width: 100%"
            >
              <el-option label="大气污染" value="大气污染" />
              <el-option label="水污染" value="水污染" />
              <el-option label="土壤污染" value="土壤污染" />
              <el-option label="噪声污染" value="噪声污染" />
              <el-option label="固废处置" value="固废处置" />
              <el-option label="生态破坏" value="生态破坏" />
              <el-option label="其他污染" value="其他污染" />
            </el-select>
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

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="发现方式" prop="discoveryMethod">
                <el-select
                  v-model="formData.discoveryMethod"
                  placeholder="请选择发现方式"
                  style="width: 100%"
                >
                  <el-option label="卫星遥感" value="卫星遥感" />
                  <el-option label="无人机巡查" value="无人机巡查" />
                  <el-option label="在线监控" value="在线监控" />
                  <el-option label="现场检查" value="现场检查" />
                  <el-option label="群众举报" value="群众举报" />
                  <el-option label="其他" value="其他" />
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="紧急程度" prop="urgencyLevel">
                <el-select
                  v-model="formData.urgencyLevel"
                  placeholder="请选择紧急程度"
                  style="width: 100%"
                >
                  <el-option label="特急" value="特急" />
                  <el-option label="紧急" value="紧急" />
                  <el-option label="一般" value="一般" />
                  <el-option label="较缓" value="较缓" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="涉及区域" prop="involvedArea">
            <el-input v-model="formData.involvedArea" placeholder="请输入涉及的具体区域或地点" />
          </el-form-item>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="经度" prop="longitude">
                <el-input v-model="formData.longitude" placeholder="请输入经度坐标" />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="纬度" prop="latitude">
                <el-input v-model="formData.latitude" placeholder="请输入纬度坐标" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="涉及企业" prop="involvedCompany">
            <el-input
              v-model="formData.involvedCompany"
              placeholder="请输入涉及的企业名称（如有）"
            />
          </el-form-item>

          <el-form-item label="企业类型" prop="companyType">
            <el-select
              v-model="formData.companyType"
              placeholder="请选择企业类型"
              style="width: 100%"
            >
              <el-option label="工业企业" value="工业企业" />
              <el-option label="建筑施工" value="建筑施工" />
              <el-option label="餐饮服务" value="餐饮服务" />
              <el-option label="畜禽养殖" value="畜禽养殖" />
              <el-option label="医疗机构" value="医疗机构" />
              <el-option label="其他" value="其他" />
              <el-option label="无涉及企业" value="无涉及企业" />
            </el-select>
          </el-form-item>

          <el-form-item label="监控数据" prop="monitoringData">
            <el-input
              v-model="formData.monitoringData"
              type="textarea"
              :rows="3"
              placeholder="请输入相关的监控数据或检测结果"
              maxlength="800"
              show-word-limit
            />
          </el-form-item>

          <el-form-item label="初步分析" prop="preliminaryAnalysis">
            <el-input
              v-model="formData.preliminaryAnalysis"
              type="textarea"
              :rows="3"
              placeholder="请输入对问题的初步分析和判断"
              maxlength="800"
              show-word-limit
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

          <el-form-item label="监控截图">
            <el-upload class="upload-demo" drag multiple :auto-upload="false" accept="image/*">
              <el-icon class="el-icon--upload"><upload-filled /></el-icon>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <template #tip>
                <div class="el-upload__tip">
                  如卫星图像、监控截图等，支持 jpg/png 文件，且不超过 10MB
                </div>
              </template>
            </el-upload>
          </el-form-item>
        </el-form>
      </div>

      <!-- 操作按钮 -->
      <div class="action-buttons">
        <div class="left-actions">
          <el-button @click="handleGoBack"> 返回列表 </el-button>
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
import { UploadFilled } from '@element-plus/icons-vue'
import ReportGenerator from '../../../components/ReportGenerator.vue'

const route = useRoute()
const router = useRouter()

// 问题ID
const issueId = ref(route.params.id)

// 表单数据
const formData = ref({
  assignDate: null,
  assignNumber: '',
  problemType: '',
  clueDescription: '',
  discoveryMethod: '',
  urgencyLevel: '',
  involvedArea: '',
  longitude: '',
  latitude: '',
  involvedCompany: '',
  companyType: '',
  monitoringData: '',
  preliminaryAnalysis: '',
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
  assignDate: [{ required: true, message: '请选择交办日期', trigger: 'change' }],
  assignNumber: [{ required: true, message: '请输入交办编号', trigger: 'blur' }],
  problemType: [{ required: true, message: '请选择问题类型', trigger: 'change' }],
  clueDescription: [{ required: true, message: '请输入线索描述', trigger: 'blur' }],
  discoveryMethod: [{ required: true, message: '请选择发现方式', trigger: 'change' }],
  urgencyLevel: [{ required: true, message: '请选择紧急程度', trigger: 'change' }],
  involvedArea: [{ required: true, message: '请输入涉及区域', trigger: 'blur' }],
  preliminaryAnalysis: [{ required: true, message: '请输入初步分析', trigger: 'blur' }],
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

// 步骤导航
const goToStep2 = () => {
  router.push({
    name: 'digital-center-step2',
    params: { id: issueId.value },
  })
}

const goToStep3 = () => {
  router.push({
    name: 'digital-center-step3',
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
