<template>
  <div class="digital-center-step3">
    <el-card class="step-card">
      <template #header>
        <div class="card-header">
          <h3>第三步：整改情况</h3>
          <span class="step-desc">填写处置结果和整改情况</span>
        </div>
      </template>

      <el-form ref="formRef" :model="formData" :rules="rules" label-width="140px" class="step-form">
        <div class="form-section">
          <h4>处置时间</h4>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="处置开始时间" prop="startTime">
                <el-date-picker
                  v-model="formData.startTime"
                  type="datetime"
                  placeholder="选择处置开始时间"
                  style="width: 100%"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="处置完成时间" prop="completionTime">
                <el-date-picker
                  v-model="formData.completionTime"
                  type="datetime"
                  placeholder="选择处置完成时间"
                  style="width: 100%"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <div class="form-section">
          <h4>处置情况</h4>
          <el-form-item label="处置措施" prop="disposalMeasures">
            <el-input
              v-model="formData.disposalMeasures"
              type="textarea"
              :rows="5"
              placeholder="请详细描述采取的处置措施..."
            />
          </el-form-item>

          <el-form-item label="处置效果" prop="disposalEffect">
            <el-input
              v-model="formData.disposalEffect"
              type="textarea"
              :rows="4"
              placeholder="请描述处置后的效果..."
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
                  <el-option label="暂停处置" value="暂停处置" />
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
        </div>

        <div class="form-section">
          <h4>参与情况</h4>
          <el-form-item label="参与部门" prop="participatingDepartments">
            <el-input
              v-model="formData.participatingDepartments"
              type="textarea"
              :rows="3"
              placeholder="请填写参与处置的部门..."
            />
          </el-form-item>

          <el-form-item label="资源投入" prop="resourceInput">
            <el-input
              v-model="formData.resourceInput"
              type="textarea"
              :rows="3"
              placeholder="请描述投入的人力、物力、财力资源..."
            />
          </el-form-item>

          <el-form-item label="技术手段" prop="technicalMeans">
            <el-input
              v-model="formData.technicalMeans"
              type="textarea"
              :rows="3"
              placeholder="请描述使用的技术手段和设备..."
            />
          </el-form-item>
        </div>

        <div class="form-section">
          <h4>监测数据</h4>
          <el-form-item label="监测数据" prop="monitoringData">
            <el-input
              v-model="formData.monitoringData"
              type="textarea"
              :rows="4"
              placeholder="请填写处置后的监测数据和参数..."
            />
          </el-form-item>

          <el-form-item label="数据对比分析" prop="dataAnalysis">
            <el-input
              v-model="formData.dataAnalysis"
              type="textarea"
              :rows="3"
              placeholder="请分析处置前后的数据变化..."
            />
          </el-form-item>
        </div>

        <div class="form-section">
          <h4>问题与建议</h4>
          <el-form-item label="存在问题" prop="existingProblems">
            <el-input
              v-model="formData.existingProblems"
              type="textarea"
              :rows="3"
              placeholder="请描述处置过程中发现的问题..."
            />
          </el-form-item>

          <el-form-item label="后续建议" prop="followUpSuggestions">
            <el-input
              v-model="formData.followUpSuggestions"
              type="textarea"
              :rows="3"
              placeholder="请提出后续的工作建议..."
            />
          </el-form-item>
        </div>

        <div class="form-section">
          <h4>责任人信息</h4>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="处置负责人" prop="responsible">
                <el-input v-model="formData.responsible" placeholder="请输入处置负责人姓名" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系电话" prop="phone">
                <el-input v-model="formData.phone" placeholder="请输入联系电话" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="验收人员" prop="inspector">
                <el-input v-model="formData.inspector" placeholder="请输入验收人员姓名" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="验收日期" prop="inspectionDate">
                <el-date-picker
                  v-model="formData.inspectionDate"
                  type="date"
                  placeholder="选择验收日期"
                  style="width: 100%"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <div class="form-section">
          <h4>相关资料</h4>
          <el-form-item label="处置照片">
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
        <el-button @click="$emit('prev')">上一步</el-button>
        <el-button @click="saveDraft" :loading="loading">保存草稿</el-button>
        <el-button type="success" @click="complete" :loading="loading">完成</el-button>
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
  startTime: '',
  completionTime: '',
  disposalMeasures: '',
  disposalEffect: '',
  disposalStatus: '',
  acceptanceResult: '',
  participatingDepartments: '',
  resourceInput: '',
  technicalMeans: '',
  monitoringData: '',
  dataAnalysis: '',
  existingProblems: '',
  followUpSuggestions: '',
  responsible: '',
  phone: '',
  inspector: '',
  inspectionDate: '',
  photos: [],
  attachments: [],
  remarks: '',
})

// 表单验证规则
const rules = {
  startTime: [{ required: true, message: '请选择处置开始时间', trigger: 'change' }],
  disposalMeasures: [
    { required: true, message: '请填写处置措施', trigger: 'blur' },
    { min: 20, message: '处置措施至少20个字符', trigger: 'blur' },
  ],
  disposalEffect: [
    { required: true, message: '请填写处置效果', trigger: 'blur' },
    { min: 10, message: '处置效果至少10个字符', trigger: 'blur' },
  ],
  disposalStatus: [{ required: true, message: '请选择处置状态', trigger: 'change' }],
  responsible: [{ required: true, message: '请填写处置负责人', trigger: 'blur' }],
  phone: [
    { required: true, message: '请填写联系电话', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' },
  ],
}

// 组件通信
const emit = defineEmits(['prev', 'complete'])

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

// 完成
const complete = async () => {
  if (!formRef.value) return

  try {
    await formRef.value.validate()
    loading.value = true

    await new Promise((resolve) => setTimeout(resolve, 1000))

    ElMessage.success('数字化指挥中心问题处理完成！')
    emit('complete', formData)
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
.digital-center-step3 {
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
