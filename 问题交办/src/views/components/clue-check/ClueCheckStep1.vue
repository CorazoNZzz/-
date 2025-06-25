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
        <el-step title="交办信息" description="线索核查 - 交办信息" />
        <el-step title="问题交办" @click="goToStep2" />
        <el-step title="整改情况" @click="goToStep3" />
      </el-steps>

      <!-- 表单内容 -->
      <div class="content-area">
        <h3 style="color: #217346; margin-bottom: 20px">线索核查 - 交办信息</h3>

        <el-form
          ref="formRef"
          :model="formData"
          :rules="formRules"
          label-width="140px"
          style="max-width: 900px"
        >
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="核查日期" prop="checkDate">
                <el-date-picker
                  v-model="formData.checkDate"
                  type="date"
                  placeholder="请选择核查日期"
                  style="width: 100%"
                />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="线索编号" prop="clueNumber">
                <el-input v-model="formData.clueNumber" placeholder="请输入线索编号" />
              </el-form-item>
            </el-col>
          </el-row>

          <!-- 属地自动填充辖区所 -->
          <el-form-item label="属地" prop="territory">
            <el-select
              v-model="formData.territory"
              placeholder="请选择属地"
              style="width: 100%"
              @change="handleTerritoryChange"
            >
              <el-option label="东城区" value="东城区" />
              <el-option label="西城区" value="西城区" />
              <el-option label="朝阳区" value="朝阳区" />
              <el-option label="海淀区" value="海淀区" />
              <el-option label="丰台区" value="丰台区" />
              <el-option label="石景山区" value="石景山区" />
            </el-select>
          </el-form-item>

          <el-form-item label="辖区所" prop="jurisdictionOffice">
            <el-input
              v-model="formData.jurisdictionOffice"
              placeholder="根据属地自动填充"
              :disabled="true"
            />
          </el-form-item>

          <el-form-item label="问题类型" prop="problemType">
            <el-radio-group v-model="formData.problemType">
              <el-radio value="大气污染">大气污染</el-radio>
              <el-radio value="水污染">水污染</el-radio>
              <el-radio value="土壤污染">土壤污染</el-radio>
              <el-radio value="噪声污染">噪声污染</el-radio>
              <el-radio value="固废处置">固废处置</el-radio>
              <el-radio value="其他">其他</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="线索来源" prop="clueSource">
            <el-select
              v-model="formData.clueSource"
              placeholder="请选择线索来源"
              style="width: 100%"
            >
              <el-option label="群众举报" value="群众举报" />
              <el-option label="媒体曝光" value="媒体曝光" />
              <el-option label="上级交办" value="上级交办" />
              <el-option label="日常巡查" value="日常巡查" />
              <el-option label="专项检查" value="专项检查" />
              <el-option label="在线监控" value="在线监控" />
              <el-option label="其他" value="其他" />
            </el-select>
          </el-form-item>

          <el-form-item label="线索描述" prop="clueDescription">
            <el-input
              v-model="formData.clueDescription"
              type="textarea"
              :rows="4"
              placeholder="请详细描述线索内容"
              maxlength="1000"
              show-word-limit
            />
          </el-form-item>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="涉及企业" prop="involvedCompany">
                <el-input v-model="formData.involvedCompany" placeholder="请输入涉及的企业名称" />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="企业规模" prop="companyScale">
                <el-select
                  v-model="formData.companyScale"
                  placeholder="请选择企业规模"
                  style="width: 100%"
                >
                  <el-option label="大型企业" value="大型企业" />
                  <el-option label="中型企业" value="中型企业" />
                  <el-option label="小型企业" value="小型企业" />
                  <el-option label="微型企业" value="微型企业" />
                  <el-option label="个体工商户" value="个体工商户" />
                  <el-option label="其他" value="其他" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="具体地址" prop="specificAddress">
            <el-input v-model="formData.specificAddress" placeholder="请输入具体地址" />
          </el-form-item>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="举报人" prop="reporter">
                <el-input v-model="formData.reporter" placeholder="请输入举报人姓名（可选）" />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="举报人电话" prop="reporterPhone">
                <el-input v-model="formData.reporterPhone" placeholder="请输入举报人电话（可选）" />
              </el-form-item>
            </el-col>
          </el-row>

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

          <el-form-item label="初步判断" prop="preliminaryJudgment">
            <el-input
              v-model="formData.preliminaryJudgment"
              type="textarea"
              :rows="3"
              placeholder="请输入对线索的初步判断"
              maxlength="800"
              show-word-limit
            />
          </el-form-item>

          <el-form-item label="核查要求" prop="checkRequirement">
            <el-input
              v-model="formData.checkRequirement"
              type="textarea"
              :rows="2"
              placeholder="请输入具体的核查要求"
              maxlength="500"
              show-word-limit
            />
          </el-form-item>

          <el-form-item label="线索相关材料">
            <el-upload
              class="upload-demo"
              drag
              multiple
              :auto-upload="false"
              accept="image/*,.pdf,.doc,.docx"
            >
              <el-icon class="el-icon--upload"><upload-filled /></el-icon>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <template #tip>
                <div class="el-upload__tip">
                  如举报材料、照片等，支持图片、PDF、Word文件，且不超过 20MB
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

          <ReportGenerator :issue-data="issueData" :form-type="'线索核查'" />

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
  checkDate: null,
  clueNumber: '',
  territory: '',
  jurisdictionOffice: '',
  problemType: '',
  clueSource: '',
  clueDescription: '',
  involvedCompany: '',
  companyScale: '',
  specificAddress: '',
  reporter: '',
  reporterPhone: '',
  urgencyLevel: '',
  preliminaryJudgment: '',
  checkRequirement: '',
})

// 属地与辖区所的映射关系
const territoryOfficeMap = {
  东城区: '东城环保所',
  西城区: '西城环保所',
  朝阳区: '朝阳环保所',
  海淀区: '海淀环保所',
  丰台区: '丰台环保所',
  石景山区: '石景山环保所',
}

// 问题数据
const issueData = computed(() => ({
  id: issueId.value,
  formType: '线索核查',
  ...formData.value,
}))

// 表单引用
const formRef = ref()

// 状态
const loading = ref(false)
const saving = ref(false)

// 表单验证规则
const formRules = {
  checkDate: [{ required: true, message: '请选择核查日期', trigger: 'change' }],
  clueNumber: [{ required: true, message: '请输入线索编号', trigger: 'blur' }],
  territory: [{ required: true, message: '请选择属地', trigger: 'change' }],
  problemType: [{ required: true, message: '请选择问题类型', trigger: 'change' }],
  clueSource: [{ required: true, message: '请选择线索来源', trigger: 'change' }],
  clueDescription: [{ required: true, message: '请输入线索描述', trigger: 'blur' }],
  specificAddress: [{ required: true, message: '请输入具体地址', trigger: 'blur' }],
  urgencyLevel: [{ required: true, message: '请选择紧急程度', trigger: 'change' }],
  preliminaryJudgment: [{ required: true, message: '请输入初步判断', trigger: 'blur' }],
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

// 属地变化时自动填充辖区所
const handleTerritoryChange = (territory) => {
  formData.value.jurisdictionOffice = territoryOfficeMap[territory] || ''
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
      name: 'clue-check-step2',
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
    name: 'clue-check-step2',
    params: { id: issueId.value },
  })
}

const goToStep3 = () => {
  router.push({
    name: 'clue-check-step3',
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
}
</style>
