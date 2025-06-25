<template>
  <div class="remote-help-step2">
    <el-card class="step-card">
      <template #header>
        <div class="card-header">
          <h3>第二步：问题交办</h3>
          <span class="step-desc">填写交办详细信息和要求</span>
        </div>
      </template>

      <el-form ref="formRef" :model="formData" :rules="rules" label-width="140px" class="step-form">
        <div class="form-section">
          <h4>交办基本信息</h4>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="交办日期" prop="assignDate">
                <el-date-picker
                  v-model="formData.assignDate"
                  type="date"
                  placeholder="选择交办日期"
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

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="交办单位" prop="assignUnit">
                <el-input v-model="formData.assignUnit" placeholder="请输入交办单位" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="负责人" prop="responsible">
                <el-input v-model="formData.responsible" placeholder="请输入负责人姓名" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="联系方式" prop="contact">
                <el-input v-model="formData.contact" placeholder="请输入联系电话" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="整改时限" prop="deadline">
                <el-date-picker
                  v-model="formData.deadline"
                  type="date"
                  placeholder="选择整改截止日期"
                  style="width: 100%"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <div class="form-section">
          <h4>问题详情</h4>
          <el-form-item label="问题描述" prop="problemDescription">
            <el-input
              v-model="formData.problemDescription"
              type="textarea"
              :rows="4"
              placeholder="请详细描述发现的环境问题..."
            />
          </el-form-item>

          <el-row :gutter="20">
            <el-col :span="12">
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
                  <el-option label="环评违法" value="环评违法" />
                  <el-option label="其他" value="其他" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="严重程度" prop="severity">
                <el-select
                  v-model="formData.severity"
                  placeholder="请选择严重程度"
                  style="width: 100%"
                >
                  <el-option label="一般" value="一般" />
                  <el-option label="较重" value="较重" />
                  <el-option label="严重" value="严重" />
                  <el-option label="特别严重" value="特别严重" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <div class="form-section">
          <h4>交办要求</h4>
          <el-form-item label="交办要求" prop="assignRequirement">
            <el-input
              v-model="formData.assignRequirement"
              type="textarea"
              :rows="4"
              placeholder="请填写具体的交办要求和整改措施..."
            />
          </el-form-item>

          <el-form-item label="技术指导要求" prop="technicalGuidance">
            <el-input
              v-model="formData.technicalGuidance"
              type="textarea"
              :rows="3"
              placeholder="请填写需要的技术指导和支持..."
            />
          </el-form-item>

          <el-form-item label="验收标准" prop="acceptanceStandard">
            <el-input
              v-model="formData.acceptanceStandard"
              type="textarea"
              :rows="3"
              placeholder="请填写整改验收的具体标准..."
            />
          </el-form-item>
        </div>

        <div class="form-section">
          <h4>附件资料</h4>
          <el-form-item label="相关文件">
            <el-upload
              ref="uploadRef"
              :file-list="formData.attachments"
              :on-change="handleFileChange"
              :on-remove="handleFileRemove"
              :before-upload="beforeUpload"
              :auto-upload="false"
              accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.gif"
              multiple
              drag
            >
              <el-icon class="el-icon--upload"><upload-filled /></el-icon>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <template #tip>
                <div class="el-upload__tip">
                  支持 PDF、Word、Excel、图片格式，单个文件不超过 10MB
                </div>
              </template>
            </el-upload>
          </el-form-item>
        </div>

        <div class="form-section">
          <h4>其他信息</h4>
          <el-form-item label="紧急程度" prop="urgency">
            <el-radio-group v-model="formData.urgency">
              <el-radio label="一般">一般</el-radio>
              <el-radio label="紧急">紧急</el-radio>
              <el-radio label="特急">特急</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="是否需要现场指导" prop="needFieldGuidance">
            <el-radio-group v-model="formData.needFieldGuidance">
              <el-radio :label="true">是</el-radio>
              <el-radio :label="false">否</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="备注说明">
            <el-input
              v-model="formData.remarks"
              type="textarea"
              :rows="3"
              placeholder="其他需要说明的情况..."
            />
          </el-form-item>
        </div>
      </el-form>

      <!-- 操作按钮 -->
      <div class="form-actions">
        <el-button @click="$emit('prev')">上一步</el-button>
        <el-button @click="saveDraft" :loading="loading">保存草稿</el-button>
        <el-button type="primary" @click="nextStep" :loading="loading">下一步</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { UploadFilled } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const formRef = ref()
const uploadRef = ref()
const loading = ref(false)

// 表单数据
const formData = reactive({
  assignDate: new Date(),
  assignNumber: '',
  assignUnit: '',
  responsible: '',
  contact: '',
  deadline: '',
  problemDescription: '',
  problemType: '',
  severity: '',
  assignRequirement: '',
  technicalGuidance: '',
  acceptanceStandard: '',
  attachments: [],
  urgency: '一般',
  needFieldGuidance: false,
  remarks: '',
})

// 表单验证规则
const rules = {
  assignDate: [{ required: true, message: '请选择交办日期', trigger: 'change' }],
  assignNumber: [{ required: true, message: '请输入交办编号', trigger: 'blur' }],
  assignUnit: [{ required: true, message: '请输入交办单位', trigger: 'blur' }],
  responsible: [{ required: true, message: '请输入负责人', trigger: 'blur' }],
  contact: [
    { required: true, message: '请输入联系方式', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' },
  ],
  deadline: [{ required: true, message: '请选择整改时限', trigger: 'change' }],
  problemDescription: [
    { required: true, message: '请填写问题描述', trigger: 'blur' },
    { min: 20, message: '问题描述至少20个字符', trigger: 'blur' },
  ],
  problemType: [{ required: true, message: '请选择问题类型', trigger: 'change' }],
  severity: [{ required: true, message: '请选择严重程度', trigger: 'change' }],
  assignRequirement: [
    { required: true, message: '请填写交办要求', trigger: 'blur' },
    { min: 20, message: '交办要求至少20个字符', trigger: 'blur' },
  ],
}

// 组件通信
const emit = defineEmits(['prev', 'next'])

// 文件上传处理
const handleFileChange = (file, fileList) => {
  formData.attachments = fileList
}

const handleFileRemove = (file, fileList) => {
  formData.attachments = fileList
}

const beforeUpload = (file) => {
  const isValidType = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
  ].includes(file.type)

  const isLt10M = file.size / 1024 / 1024 < 10

  if (!isValidType) {
    ElMessage.error('文件格式不支持!')
    return false
  }
  if (!isLt10M) {
    ElMessage.error('文件大小不能超过 10MB!')
    return false
  }
  return true
}

// 保存草稿
const saveDraft = async () => {
  loading.value = true
  try {
    // 模拟API调用
    await new Promise((resolve) => setTimeout(resolve, 1000))
    ElMessage.success('草稿保存成功！')
  } catch (error) {
    ElMessage.error('保存失败，请重试')
  } finally {
    loading.value = false
  }
}

// 下一步
const nextStep = async () => {
  if (!formRef.value) return

  try {
    await formRef.value.validate()
    loading.value = true

    // 模拟API调用
    await new Promise((resolve) => setTimeout(resolve, 1000))

    ElMessage.success('交办信息保存成功！')
    emit('next', formData)
  } catch (error) {
    console.error('验证失败:', error)
  } finally {
    loading.value = false
  }
}

// 加载已有数据
const loadData = async () => {
  try {
    const issueId = route.params.id
    // 模拟加载数据
    // const response = await api.getIssueStep2(issueId)
    // Object.assign(formData, response.data)
  } catch (error) {
    console.error('加载数据失败:', error)
  }
}

onMounted(() => {
  loadData()
})
</script>

<style scoped>
.remote-help-step2 {
  max-width: 1000px;
  margin: 0 auto;
}

.step-card {
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header h3 {
  margin: 0;
  color: #217346;
  font-size: 20px;
}

.step-desc {
  color: #666;
  font-size: 14px;
}

.step-form {
  padding: 24px;
}

.form-section {
  margin-bottom: 32px;
  padding: 20px;
  background: #fafafa;
  border-radius: 8px;
  border-left: 4px solid #217346;
}

.form-section h4 {
  margin: 0 0 20px 0;
  color: #217346;
  font-size: 16px;
  font-weight: 600;
}

.form-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  padding-top: 24px;
  border-top: 1px solid #eee;
}

.form-actions .el-button {
  min-width: 120px;
  height: 40px;
}

:deep(.el-upload-dragger) {
  width: 100%;
  height: 120px;
}

:deep(.el-form-item__label) {
  font-weight: 500;
  color: #333;
}

:deep(.el-textarea__inner) {
  resize: vertical;
}
</style>
