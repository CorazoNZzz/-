<template>
  <div class="digital-center-step1">
    <el-card class="step-card">
      <template #header>
        <div class="card-header">
          <h3>第一步：交办信息</h3>
          <span class="step-desc">填写数字化指挥中心问题基本信息</span>
        </div>
      </template>

      <el-form ref="formRef" :model="formData" :rules="rules" label-width="140px" class="step-form">
        <div class="form-section">
          <h4>基本信息</h4>
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
              <el-form-item label="问题类型" prop="problemType">
                <el-select
                  v-model="formData.problemType"
                  placeholder="请选择问题类型"
                  style="width: 100%"
                >
                  <el-option label="大气污染监测异常" value="大气污染监测异常" />
                  <el-option label="水质监测异常" value="水质监测异常" />
                  <el-option label="噪声监测超标" value="噪声监测超标" />
                  <el-option label="企业排放异常" value="企业排放异常" />
                  <el-option label="环境应急事件" value="环境应急事件" />
                  <el-option label="其他异常情况" value="其他异常情况" />
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
                  <el-option label="应急" value="应急" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <div class="form-section">
          <h4>线索信息</h4>
          <el-form-item label="线索描述" prop="clueDescription">
            <el-input
              v-model="formData.clueDescription"
              type="textarea"
              :rows="4"
              placeholder="请详细描述发现的环境问题线索..."
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
                  <el-option label="自动监测" value="自动监测" />
                  <el-option label="视频监控" value="视频监控" />
                  <el-option label="卫星遥感" value="卫星遥感" />
                  <el-option label="无人机巡查" value="无人机巡查" />
                  <el-option label="人工巡检" value="人工巡检" />
                  <el-option label="举报投诉" value="举报投诉" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="涉及区域" prop="involvedArea">
                <el-input v-model="formData.involvedArea" placeholder="请输入涉及区域" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="经度" prop="longitude">
                <el-input-number
                  v-model="formData.longitude"
                  :precision="6"
                  :min="73"
                  :max="135"
                  style="width: 100%"
                  placeholder="请输入经度坐标"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="纬度" prop="latitude">
                <el-input-number
                  v-model="formData.latitude"
                  :precision="6"
                  :min="18"
                  :max="54"
                  style="width: 100%"
                  placeholder="请输入纬度坐标"
                />
              </el-form-item>
            </el-col>
          </el-row>
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
              <el-form-item label="企业类型" prop="companyType">
                <el-select
                  v-model="formData.companyType"
                  placeholder="请选择企业类型"
                  style="width: 100%"
                >
                  <el-option label="重点排污单位" value="重点排污单位" />
                  <el-option label="一般排污单位" value="一般排污单位" />
                  <el-option label="规模以上企业" value="规模以上企业" />
                  <el-option label="小微企业" value="小微企业" />
                  <el-option label="其他" value="其他" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="企业地址" prop="companyAddress">
            <el-input v-model="formData.companyAddress" placeholder="请输入企业详细地址" />
          </el-form-item>
        </div>

        <div class="form-section">
          <h4>监控数据</h4>
          <el-form-item label="监控数据" prop="monitoringData">
            <el-input
              v-model="formData.monitoringData"
              type="textarea"
              :rows="3"
              placeholder="请输入相关监控数据和参数..."
            />
          </el-form-item>

          <el-form-item label="初步分析" prop="preliminaryAnalysis">
            <el-input
              v-model="formData.preliminaryAnalysis"
              type="textarea"
              :rows="3"
              placeholder="请输入对问题的初步分析..."
            />
          </el-form-item>
        </div>

        <div class="form-section">
          <h4>相关资料</h4>
          <el-form-item label="现场照片">
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

          <el-form-item label="监控截图/数据文件">
            <el-upload
              ref="fileUploadRef"
              :file-list="formData.attachments"
              :on-change="handleFileChange"
              :on-remove="handleFileRemove"
              :before-upload="beforeFileUpload"
              :auto-upload="false"
              accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.gif"
              multiple
              drag
            >
              <el-icon class="el-icon--upload"><upload-filled /></el-icon>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <template #tip>
                <div class="el-upload__tip">
                  支持图片、PDF、Word、Excel 格式，单个文件不超过 10MB
                </div>
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
import { useRoute } from 'vue-router'

const route = useRoute()
const formRef = ref()
const photoUploadRef = ref()
const fileUploadRef = ref()
const loading = ref(false)

// 表单数据
const formData = reactive({
  assignDate: new Date(),
  assignNumber: '',
  problemType: '',
  urgencyLevel: '',
  clueDescription: '',
  discoveryMethod: '',
  involvedArea: '',
  longitude: null,
  latitude: null,
  involvedCompany: '',
  companyType: '',
  companyAddress: '',
  monitoringData: '',
  preliminaryAnalysis: '',
  photos: [],
  attachments: [],
  remarks: '',
})

// 表单验证规则
const rules = {
  assignDate: [{ required: true, message: '请选择交办日期', trigger: 'change' }],
  assignNumber: [{ required: true, message: '请输入交办编号', trigger: 'blur' }],
  problemType: [{ required: true, message: '请选择问题类型', trigger: 'change' }],
  urgencyLevel: [{ required: true, message: '请选择紧急程度', trigger: 'change' }],
  clueDescription: [
    { required: true, message: '请填写线索描述', trigger: 'blur' },
    { min: 20, message: '线索描述至少20个字符', trigger: 'blur' },
  ],
  discoveryMethod: [{ required: true, message: '请选择发现方式', trigger: 'change' }],
  involvedArea: [{ required: true, message: '请输入涉及区域', trigger: 'blur' }],
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
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
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

    ElMessage.success('基本信息保存成功！')
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
.digital-center-step1 {
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
</style>
