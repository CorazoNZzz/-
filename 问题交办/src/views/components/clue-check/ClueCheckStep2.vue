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
        style="cursor: pointer; margin-bottom: 32px"
      >
        <el-step title="交办信息" @click="goToStep1" />
        <el-step title="问题交办" description="线索核查 - 问题交办" />
        <el-step title="整改情况" @click="goToStep3" />
      </el-steps>

      <!-- 表单内容 -->
      <div class="content-area">
        <h3 style="color: #217346; margin-bottom: 20px">线索核查 - 问题交办</h3>

        <el-form
          ref="formRef"
          :model="formData"
          :rules="formRules"
          label-width="140px"
          style="max-width: 900px"
        >
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="核查交办日期" prop="checkAssignDate">
                <el-date-picker
                  v-model="formData.checkAssignDate"
                  type="date"
                  placeholder="请选择核查交办日期"
                  style="width: 100%"
                />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="交办文号" prop="assignmentNumber">
                <el-input v-model="formData.assignmentNumber" placeholder="请输入交办文号" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="交办单位" prop="assigningUnit">
            <el-input v-model="formData.assigningUnit" placeholder="请输入交办单位" />
          </el-form-item>

          <el-form-item label="接收单位" prop="receivingUnit">
            <el-select
              v-model="formData.receivingUnit"
              placeholder="请选择接收单位"
              style="width: 100%"
            >
              <el-option label="区环保局" value="区环保局" />
              <el-option label="环保执法支队" value="环保执法支队" />
              <el-option label="环保所" value="环保所" />
              <el-option label="监测站" value="监测站" />
              <el-option label="其他" value="其他" />
            </el-select>
          </el-form-item>

          <el-form-item label="核查内容" prop="checkContent">
            <el-input
              v-model="formData.checkContent"
              type="textarea"
              :rows="4"
              placeholder="请详细描述需要核查的具体内容"
              maxlength="1000"
              show-word-limit
            />
          </el-form-item>

          <el-form-item label="核查要求" prop="checkRequirements">
            <el-input
              v-model="formData.checkRequirements"
              type="textarea"
              :rows="3"
              placeholder="请输入具体的核查要求和标准"
              maxlength="800"
              show-word-limit
            />
          </el-form-item>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="要求完成时间" prop="requiredCompletionDate">
                <el-date-picker
                  v-model="formData.requiredCompletionDate"
                  type="date"
                  placeholder="请选择要求完成时间"
                  style="width: 100%"
                />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="核查类型" prop="checkType">
                <el-select
                  v-model="formData.checkType"
                  placeholder="请选择核查类型"
                  style="width: 100%"
                >
                  <el-option label="现场核查" value="现场核查" />
                  <el-option label="资料核查" value="资料核查" />
                  <el-option label="综合核查" value="综合核查" />
                  <el-option label="专项核查" value="专项核查" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="核查重点" prop="checkFocus">
            <el-checkbox-group v-model="formData.checkFocus">
              <el-checkbox value="污染源排查">污染源排查</el-checkbox>
              <el-checkbox value="环保手续">环保手续</el-checkbox>
              <el-checkbox value="治污设施">治污设施</el-checkbox>
              <el-checkbox value="监测数据">监测数据</el-checkbox>
              <el-checkbox value="违法行为">违法行为</el-checkbox>
              <el-checkbox value="整改措施">整改措施</el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <el-form-item label="核查方法" prop="checkMethod">
            <el-input
              v-model="formData.checkMethod"
              type="textarea"
              :rows="2"
              placeholder="请描述具体的核查方法和技术手段"
              maxlength="500"
              show-word-limit
            />
          </el-form-item>

          <el-form-item label="配合部门" prop="cooperatingDepartments">
            <el-checkbox-group v-model="formData.cooperatingDepartments">
              <el-checkbox value="公安部门">公安部门</el-checkbox>
              <el-checkbox value="住建部门">住建部门</el-checkbox>
              <el-checkbox value="水利部门">水利部门</el-checkbox>
              <el-checkbox value="市场监管">市场监管</el-checkbox>
              <el-checkbox value="应急管理">应急管理</el-checkbox>
              <el-checkbox value="其他">其他</el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <el-form-item label="核查负责人" prop="checkLeader">
            <el-input v-model="formData.checkLeader" placeholder="请输入核查负责人姓名" />
          </el-form-item>

          <el-form-item label="联系方式" prop="contactInfo">
            <el-input v-model="formData.contactInfo" placeholder="请输入联系电话" />
          </el-form-item>

          <el-form-item label="报告要求" prop="reportRequirement">
            <el-input
              v-model="formData.reportRequirement"
              type="textarea"
              :rows="2"
              placeholder="请描述核查报告的具体要求"
              maxlength="500"
              show-word-limit
            />
          </el-form-item>

          <el-form-item label="备注说明" prop="remarks">
            <el-input
              v-model="formData.remarks"
              type="textarea"
              :rows="2"
              placeholder="其他需要说明的事项（可选）"
              maxlength="500"
              show-word-limit
            />
          </el-form-item>

          <el-form-item label="交办文件">
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
                <div class="el-upload__tip">支持 PDF/Word 文件，且不超过 20MB</div>
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
  checkAssignDate: null,
  assignmentNumber: '',
  assigningUnit: '',
  receivingUnit: '',
  checkContent: '',
  checkRequirements: '',
  requiredCompletionDate: null,
  checkType: '',
  checkFocus: [],
  checkMethod: '',
  cooperatingDepartments: [],
  checkLeader: '',
  contactInfo: '',
  reportRequirement: '',
  remarks: '',
})

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
  checkAssignDate: [{ required: true, message: '请选择核查交办日期', trigger: 'change' }],
  assignmentNumber: [{ required: true, message: '请输入交办文号', trigger: 'blur' }],
  assigningUnit: [{ required: true, message: '请输入交办单位', trigger: 'blur' }],
  receivingUnit: [{ required: true, message: '请选择接收单位', trigger: 'change' }],
  checkContent: [{ required: true, message: '请输入核查内容', trigger: 'blur' }],
  checkRequirements: [{ required: true, message: '请输入核查要求', trigger: 'blur' }],
  requiredCompletionDate: [{ required: true, message: '请选择要求完成时间', trigger: 'change' }],
  checkType: [{ required: true, message: '请选择核查类型', trigger: 'change' }],
  checkLeader: [{ required: true, message: '请输入核查负责人', trigger: 'blur' }],
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
    name: 'clue-check-step1',
    params: { id: issueId.value },
  })
}

// 下一步
const nextStep = async () => {
  const isValid = await validateForm()
  if (!isValid) return

  saving.value = true

  try {
    await saveData()

    router.push({
      name: 'clue-check-step3',
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
const goToStep1 = () => {
  router.push({
    name: 'clue-check-step1',
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
