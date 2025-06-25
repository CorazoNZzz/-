<!--
  远程帮扶第一步：交办信息
  功能：一中队人员填写远程帮扶的基本信息
  字段：任务编号、轮次、线索描述、污染源信息等
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
        <el-step title="交办信息" description="远程帮扶 - 交办信息" />
        <el-step title="问题交办" />
        <el-step title="整改情况" />
      </el-steps>

      <!-- 表单内容 -->
      <div class="content-area">
        <div class="form-header">
          <h3 style="color: #217346; margin-bottom: 20px">远程帮扶 - 交办信息</h3>

          <!-- Excel导入功能 -->
          <div class="excel-import-section">
            <el-upload
              ref="uploadRef"
              :auto-upload="false"
              :on-change="handleExcelChange"
              :show-file-list="false"
              accept=".xlsx,.xls"
            >
              <el-button type="success" :icon="Upload">Excel批量导入</el-button>
            </el-upload>
            <el-button type="info" @click="downloadTemplate">下载模板</el-button>
          </div>
        </div>

        <el-form
          ref="formRef"
          :model="formData"
          :rules="formRules"
          label-width="160px"
          style="max-width: 900px"
        >
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="任务编号" prop="taskNumber">
                <el-input
                  v-model="formData.taskNumber"
                  placeholder="请输入任务编号"
                  maxlength="50"
                />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="轮次" prop="round">
                <el-input v-model="formData.round" placeholder="请输入轮次" maxlength="50" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="线索详细描述" prop="clueDescription">
            <el-input
              v-model="formData.clueDescription"
              type="textarea"
              :rows="3"
              placeholder="请详细描述线索"
              maxlength="1000"
              show-word-limit
            />
          </el-form-item>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="污染源名称" prop="pollutionSourceName">
                <el-input
                  v-model="formData.pollutionSourceName"
                  placeholder="请输入污染源名称"
                  maxlength="100"
                />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="乡镇（街道）" prop="township">
                <el-input
                  v-model="formData.township"
                  placeholder="请输入乡镇或街道"
                  maxlength="100"
                />
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="污染源地址" prop="pollutionSourceAddress">
            <el-input
              v-model="formData.pollutionSourceAddress"
              placeholder="请输入污染源详细地址"
              maxlength="200"
            />
          </el-form-item>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="统一社会信用代码" prop="creditCode">
                <el-input
                  v-model="formData.creditCode"
                  placeholder="请输入18位统一社会信用代码"
                  maxlength="18"
                />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="经纬信息" prop="coordinates">
                <el-input
                  v-model="formData.coordinates"
                  placeholder="请输入经纬度坐标"
                  maxlength="100"
                />
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="企业基本信息及线索核实" prop="companyInfo">
            <el-input
              v-model="formData.companyInfo"
              type="textarea"
              :rows="3"
              placeholder="请输入企业基本信息及线索核实情况"
              maxlength="1000"
              show-word-limit
            />
          </el-form-item>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="是否存在问题" prop="hasIssue">
                <el-radio-group v-model="formData.hasIssue">
                  <el-radio value="是">是</el-radio>
                  <el-radio value="否">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="是否督办" prop="isSupervised">
                <el-radio-group v-model="formData.isSupervised">
                  <el-radio value="是">是</el-radio>
                  <el-radio value="否">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="是否为典型问题" prop="isTypical">
                <el-radio-group v-model="formData.isTypical">
                  <el-radio value="是">是</el-radio>
                  <el-radio value="否">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="线索核实情况" prop="clueVerification">
            <el-input
              v-model="formData.clueVerification"
              type="textarea"
              :rows="3"
              placeholder="请输入线索核实的详细情况"
              maxlength="1000"
              show-word-limit
            />
          </el-form-item>

          <el-form-item label="现场情况" prop="siteCondition">
            <el-input
              v-model="formData.siteCondition"
              type="textarea"
              :rows="3"
              placeholder="请输入现场检查的情况描述"
              maxlength="1000"
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
        </el-form>
      </div>

      <!-- 操作按钮 -->
      <div class="action-buttons">
        <div class="left-actions">
          <!-- 第一步没有上一步 -->
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
import { Upload, UploadFilled } from '@element-plus/icons-vue'
import ReportGenerator from '../../../components/ReportGenerator.vue'
import { MockAPI } from '../../../utils/api.js'

const route = useRoute()
const router = useRouter()

// 问题ID
const issueId = ref(route.params.id)

// 表单数据
const formData = ref({
  taskNumber: '',
  clueDescription: '',
  pollutionSourceName: '',
  pollutionSourceAddress: '',
  creditCode: '',
  round: '',
  township: '',
  coordinates: '',
  companyInfo: '',
  hasIssue: '',
  isSupervised: '',
  isTypical: '',
  clueVerification: '',
  siteCondition: '',
})

// 问题数据
const issueData = computed(() => ({
  id: issueId.value,
  formType: '远程帮扶',
  ...formData.value,
}))

// 表单引用
const formRef = ref()
const uploadRef = ref()

// 状态
const loading = ref(false)
const saving = ref(false)

// 表单验证规则
const formRules = {
  taskNumber: [{ required: true, message: '请输入任务编号', trigger: 'blur' }],
  clueDescription: [{ required: true, message: '请输入线索详细描述', trigger: 'blur' }],
  pollutionSourceName: [{ required: true, message: '请输入污染源名称', trigger: 'blur' }],
  pollutionSourceAddress: [{ required: true, message: '请输入污染源地址', trigger: 'blur' }],
  creditCode: [
    { required: true, message: '请输入统一社会信用代码', trigger: 'blur' },
    { len: 18, message: '统一社会信用代码必须为18位', trigger: 'blur' },
  ],
  round: [{ required: true, message: '请输入轮次', trigger: 'blur' }],
  township: [{ required: true, message: '请输入乡镇（街道）', trigger: 'blur' }],
  coordinates: [{ required: true, message: '请输入经纬信息', trigger: 'blur' }],
  companyInfo: [{ required: true, message: '请输入企业基本信息及线索核实', trigger: 'blur' }],
  hasIssue: [{ required: true, message: '请选择是否存在问题', trigger: 'change' }],
  isSupervised: [{ required: true, message: '请选择是否督办', trigger: 'change' }],
  isTypical: [{ required: true, message: '请选择是否为典型问题', trigger: 'change' }],
  clueVerification: [{ required: true, message: '请输入线索核实情况', trigger: 'blur' }],
  siteCondition: [{ required: true, message: '请输入现场情况', trigger: 'blur' }],
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
      Object.assign(formData.value, result.data.formData)
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

// Excel导入处理
const handleExcelChange = async (file) => {
  try {
    const result = await MockAPI.importExcel(file.raw)

    if (result.success) {
      // 填充表单数据
      Object.assign(formData.value, result.data)
      ElMessage.success('Excel导入成功！')
    } else {
      ElMessage.error(result.message || 'Excel导入失败')
    }
  } catch (error) {
    console.error('Excel导入失败:', error)
    ElMessage.error('Excel导入失败，请重试')
  }
}

// 下载模板
const downloadTemplate = () => {
  window.open('http://localhost:5000/api/download-template', '_blank')
}

// 验证表单
const validateForm = async () => {
  return await formRef.value.validate().catch(() => false)
}

// 保存数据
const saveData = async () => {
  const result = await MockAPI.saveFormData(
    issueId.value,
    formData.value,
    1, // 步骤1
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
      name: 'remote-help-step2',
      params: { id: issueId.value },
    })
  } catch (error) {
    console.error('保存失败:', error)
    ElMessage.error('保存失败，请重试')
  } finally {
    saving.value = false
  }
}

// 步骤导航功能已移除，只能通过下一步按钮进入下个步骤

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

.form-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.excel-import-section {
  display: flex;
  gap: 12px;
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
