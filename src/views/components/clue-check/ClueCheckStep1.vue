<template>
  <div class="clue-check-step1">
    <el-card class="step-card">
      <template #header>
        <div class="card-header">
          <h3>第一步：交办信息</h3>
          <span class="step-desc">填写线索核查基本信息</span>
        </div>
      </template>

      <el-form ref="formRef" :model="formData" :rules="rules" label-width="140px" class="step-form">
        <div class="form-section">
          <h4>基本信息</h4>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="核查日期" prop="checkDate">
                <el-date-picker
                  v-model="formData.checkDate"
                  type="date"
                  placeholder="选择核查日期"
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

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="属地" prop="jurisdiction">
                <el-input
                  v-model="formData.jurisdiction"
                  placeholder="自动填充：XX辖区所"
                  readonly
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="问题类型" prop="problemType">
                <el-radio-group v-model="formData.problemType">
                  <el-radio label="大气污染">大气污染</el-radio>
                  <el-radio label="水污染">水污染</el-radio>
                  <el-radio label="土壤污染">土壤污染</el-radio>
                  <el-radio label="噪声污染">噪声污染</el-radio>
                  <el-radio label="固废处置">固废处置</el-radio>
                  <el-radio label="其他">其他</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <div class="form-section">
          <h4>线索信息</h4>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="线索来源" prop="clueSource">
                <el-select
                  v-model="formData.clueSource"
                  placeholder="请选择线索来源"
                  style="width: 100%"
                >
                  <el-option label="群众举报" value="群众举报" />
                  <el-option label="媒体曝光" value="媒体曝光" />
                  <el-option label="上级交办" value="上级交办" />
                  <el-option label="自查发现" value="自查发现" />
                  <el-option label="其他部门移交" value="其他部门移交" />
                  <el-option label="环保督察" value="环保督察" />
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
                  <el-option label="一般" value="一般" />
                  <el-option label="紧急" value="紧急" />
                  <el-option label="特急" value="特急" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="线索描述" prop="clueDescription">
            <el-input
              v-model="formData.clueDescription"
              type="textarea"
              :rows="4"
              placeholder="请详细描述线索内容..."
            />
          </el-form-item>
        </div>

        <div class="form-section">
          <h4>企业信息</h4>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="涉及企业" prop="involvedCompany">
                <el-input v-model="formData.involvedCompany" placeholder="请输入涉及企业名称" />
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
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="具体地址" prop="specificAddress">
            <el-input v-model="formData.specificAddress" placeholder="请输入企业具体地址" />
          </el-form-item>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="企业联系人" prop="companyContact">
                <el-input v-model="formData.companyContact" placeholder="请输入企业联系人" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系电话" prop="companyPhone">
                <el-input v-model="formData.companyPhone" placeholder="请输入企业联系电话" />
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <div class="form-section">
          <h4>举报人信息</h4>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="举报人姓名" prop="reporterName">
                <el-input
                  v-model="formData.reporterName"
                  placeholder="请输入举报人姓名（可匿名）"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="举报人电话" prop="reporterPhone">
                <el-input v-model="formData.reporterPhone" placeholder="请输入举报人联系电话" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="举报人地址" prop="reporterAddress">
            <el-input v-model="formData.reporterAddress" placeholder="请输入举报人地址" />
          </el-form-item>
        </div>

        <div class="form-section">
          <h4>初步判断</h4>
          <el-form-item label="初步判断" prop="preliminaryJudgment">
            <el-input
              v-model="formData.preliminaryJudgment"
              type="textarea"
              :rows="4"
              placeholder="请对线索进行初步判断和分析..."
            />
          </el-form-item>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="可信度评估" prop="credibilityAssessment">
                <el-select
                  v-model="formData.credibilityAssessment"
                  placeholder="请选择可信度"
                  style="width: 100%"
                >
                  <el-option label="高" value="高" />
                  <el-option label="中" value="中" />
                  <el-option label="低" value="低" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="核查必要性" prop="checkNecessity">
                <el-select
                  v-model="formData.checkNecessity"
                  placeholder="请选择核查必要性"
                  style="width: 100%"
                >
                  <el-option label="必须核查" value="必须核查" />
                  <el-option label="建议核查" value="建议核查" />
                  <el-option label="可不核查" value="可不核查" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <div class="form-section">
          <h4>相关资料</h4>
          <el-form-item label="相关照片">
            <el-upload
              ref="photoUploadRef"
              :file-list="formData.photos"
              :on-change="handlePhotoChange"
              :on-remove="handlePhotoRemove"
              :before-upload="beforePhotoUpload"
              :auto-upload="false"
              accept="image/*"
              multiple
              list-type="picture-card"
            >
              <el-icon><Plus /></el-icon>
            </el-upload>
            <div class="upload-tip">支持 jpg、png、gif 格式，单个文件不超过 5MB</div>
          </el-form-item>

          <el-form-item label="相关文件">
            <el-upload
              ref="fileUploadRef"
              :file-list="formData.attachments"
              :on-change="handleFileChange"
              :on-remove="handleFileRemove"
              :before-upload="beforeFileUpload"
              :auto-upload="false"
              accept=".pdf,.doc,.docx,.xls,.xlsx"
              multiple
              drag
            >
              <el-icon class="el-icon--upload"><upload-filled /></el-icon>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <template #tip>
                <div class="el-upload__tip">支持 PDF、Word、Excel 格式，单个文件不超过 10MB</div>
              </template>
            </el-upload>
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
        <el-button @click="saveDraft" :loading="loading">保存草稿</el-button>
        <el-button type="primary" @click="nextStep" :loading="loading">下一步</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus, UploadFilled } from '@element-plus/icons-vue'

const formRef = ref()
const photoUploadRef = ref()
const fileUploadRef = ref()
const loading = ref(false)

// 表单数据
const formData = reactive({
  checkDate: new Date(),
  clueNumber: '',
  jurisdiction: '环保局辖区所', // 自动填充
  problemType: '',
  clueSource: '',
  urgencyLevel: '',
  clueDescription: '',
  involvedCompany: '',
  companyScale: '',
  specificAddress: '',
  companyContact: '',
  companyPhone: '',
  reporterName: '',
  reporterPhone: '',
  reporterAddress: '',
  preliminaryJudgment: '',
  credibilityAssessment: '',
  checkNecessity: '',
  photos: [],
  attachments: [],
  remarks: '',
})

// 表单验证规则
const rules = {
  checkDate: [{ required: true, message: '请选择核查日期', trigger: 'change' }],
  clueNumber: [{ required: true, message: '请输入线索编号', trigger: 'blur' }],
  problemType: [{ required: true, message: '请选择问题类型', trigger: 'change' }],
  clueSource: [{ required: true, message: '请选择线索来源', trigger: 'change' }],
  urgencyLevel: [{ required: true, message: '请选择紧急程度', trigger: 'change' }],
  clueDescription: [
    { required: true, message: '请填写线索描述', trigger: 'blur' },
    { min: 20, message: '线索描述至少20个字符', trigger: 'blur' },
  ],
  involvedCompany: [{ required: true, message: '请输入涉及企业', trigger: 'blur' }],
  specificAddress: [{ required: true, message: '请输入具体地址', trigger: 'blur' }],
}

// 组件通信
const emit = defineEmits(['next'])

// 照片上传处理
const handlePhotoChange = (file, fileList) => {
  formData.photos = fileList
}

const handlePhotoRemove = (file, fileList) => {
  formData.photos = fileList
}

const beforePhotoUpload = (file) => {
  const isImage = file.type.startsWith('image/')
  const isLt5M = file.size / 1024 / 1024 < 5

  if (!isImage) {
    ElMessage.error('只能上传图片文件!')
    return false
  }
  if (!isLt5M) {
    ElMessage.error('图片大小不能超过 5MB!')
    return false
  }
  return true
}

// 文件上传处理
const handleFileChange = (file, fileList) => {
  formData.attachments = fileList
}

const handleFileRemove = (file, fileList) => {
  formData.attachments = fileList
}

const beforeFileUpload = (file) => {
  const validTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ]

  const isValidType = validTypes.includes(file.type)
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
    await new Promise((resolve) => setTimeout(resolve, 1000))
    ElMessage.success('草稿保存成功！')
  } catch {
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

    await new Promise((resolve) => setTimeout(resolve, 1000))

    ElMessage.success('线索信息保存成功！')
    emit('next', formData)
  } catch {
    console.error('验证失败')
  } finally {
    loading.value = false
  }
}

// 加载已有数据
const loadData = async () => {
  try {
    // 模拟加载数据
  } catch {
    console.error('加载数据失败')
  }
}

onMounted(() => {
  loadData()
})
</script>

<style scoped>
.clue-check-step1 {
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

.upload-tip {
  font-size: 12px;
  color: #999;
  margin-top: 8px;
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

:deep(.el-upload--picture-card) {
  width: 80px;
  height: 80px;
}

:deep(.el-upload-list--picture-card .el-upload-list__item) {
  width: 80px;
  height: 80px;
}

:deep(.el-upload-dragger) {
  width: 100%;
  height: 120px;
}

:deep(.el-radio-group) {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
</style>
