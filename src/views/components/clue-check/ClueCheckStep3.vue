<template>
  <div class="clue-check-step3">
    <el-card class="step-card">
      <template #header>
        <div class="card-header">
          <h3>第三步：整改情况</h3>
          <span class="step-desc">填写核查结果和处理情况</span>
        </div>
      </template>

      <el-form ref="formRef" :model="formData" :rules="rules" label-width="140px" class="step-form">
        <div class="form-section">
          <h4>核查时间</h4>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="核查开始时间" prop="startTime">
                <el-date-picker
                  v-model="formData.startTime"
                  type="datetime"
                  placeholder="选择核查开始时间"
                  style="width: 100%"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="核查完成时间" prop="completionTime">
                <el-date-picker
                  v-model="formData.completionTime"
                  type="datetime"
                  placeholder="选择核查完成时间"
                  style="width: 100%"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <div class="form-section">
          <h4>核查结果</h4>
          <el-form-item label="核查结果" prop="checkResult">
            <el-input
              v-model="formData.checkResult"
              type="textarea"
              :rows="5"
              placeholder="请详细描述核查的结果和发现..."
            />
          </el-form-item>

          <el-form-item label="核查情况说明" prop="checkDescription">
            <el-input
              v-model="formData.checkDescription"
              type="textarea"
              :rows="4"
              placeholder="请说明核查的具体情况和过程..."
            />
          </el-form-item>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="核查状态" prop="checkStatus">
                <el-select
                  v-model="formData.checkStatus"
                  placeholder="请选择核查状态"
                  style="width: 100%"
                >
                  <el-option label="已完成" value="已完成" />
                  <el-option label="部分完成" value="部分完成" />
                  <el-option label="核查中" value="核查中" />
                  <el-option label="暂停核查" value="暂停核查" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="线索真实性" prop="clueAuthenticity">
                <el-select
                  v-model="formData.clueAuthenticity"
                  placeholder="请选择线索真实性"
                  style="width: 100%"
                >
                  <el-option label="属实" value="属实" />
                  <el-option label="部分属实" value="部分属实" />
                  <el-option label="不属实" value="不属实" />
                  <el-option label="无法核实" value="无法核实" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <div class="form-section">
          <h4>违法行为</h4>
          <el-form-item label="发现的违法行为" prop="violations">
            <el-input
              v-model="formData.violations"
              type="textarea"
              :rows="4"
              placeholder="请详细描述发现的违法行为..."
            />
          </el-form-item>

          <el-form-item label="违法程度评估" prop="violationSeverity">
            <el-select
              v-model="formData.violationSeverity"
              placeholder="请选择违法程度"
              style="width: 100%"
            >
              <el-option label="轻微违法" value="轻微违法" />
              <el-option label="一般违法" value="一般违法" />
              <el-option label="严重违法" value="严重违法" />
              <el-option label="特别严重违法" value="特别严重违法" />
              <el-option label="无违法行为" value="无违法行为" />
            </el-select>
          </el-form-item>

          <el-form-item label="法律依据" prop="legalBasis">
            <el-input
              v-model="formData.legalBasis"
              type="textarea"
              :rows="3"
              placeholder="请填写相关的法律法规依据..."
            />
          </el-form-item>
        </div>

        <div class="form-section">
          <h4>处理措施</h4>
          <el-form-item label="处理措施" prop="handlingMeasures">
            <el-input
              v-model="formData.handlingMeasures"
              type="textarea"
              :rows="4"
              placeholder="请描述采取的处理措施..."
            />
          </el-form-item>

          <el-form-item label="处罚情况" prop="penaltySituation">
            <el-input
              v-model="formData.penaltySituation"
              type="textarea"
              :rows="3"
              placeholder="请描述处罚的具体情况..."
            />
          </el-form-item>

          <el-form-item label="整改要求" prop="rectificationRequirement">
            <el-input
              v-model="formData.rectificationRequirement"
              type="textarea"
              :rows="3"
              placeholder="请填写对企业的整改要求..."
            />
          </el-form-item>
        </div>

        <div class="form-section">
          <h4>核查人员</h4>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="核查负责人" prop="checkLeader">
                <el-input v-model="formData.checkLeader" placeholder="请输入核查负责人姓名" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系电话" prop="leaderPhone">
                <el-input v-model="formData.leaderPhone" placeholder="请输入联系电话" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="参与核查人员" prop="checkPersonnel">
            <el-input
              v-model="formData.checkPersonnel"
              type="textarea"
              :rows="3"
              placeholder="请填写参与核查的所有人员..."
            />
          </el-form-item>
        </div>

        <div class="form-section">
          <h4>后续工作</h4>
          <el-form-item label="后续跟进计划" prop="followUpPlan">
            <el-input
              v-model="formData.followUpPlan"
              type="textarea"
              :rows="3"
              placeholder="请填写后续的跟进工作计划..."
            />
          </el-form-item>

          <el-form-item label="监管建议" prop="supervisionSuggestions">
            <el-input
              v-model="formData.supervisionSuggestions"
              type="textarea"
              :rows="3"
              placeholder="请提出监管建议..."
            />
          </el-form-item>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="是否需要复查" prop="needRecheck">
                <el-radio-group v-model="formData.needRecheck">
                  <el-radio :label="true">是</el-radio>
                  <el-radio :label="false">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="复查时间" prop="recheckTime" v-if="formData.needRecheck">
                <el-date-picker
                  v-model="formData.recheckTime"
                  type="date"
                  placeholder="选择复查时间"
                  style="width: 100%"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <div class="form-section">
          <h4>相关资料</h4>
          <el-form-item label="核查照片">
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

          <el-form-item label="核查报告">
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
  checkResult: '',
  checkDescription: '',
  checkStatus: '',
  clueAuthenticity: '',
  violations: '',
  violationSeverity: '',
  legalBasis: '',
  handlingMeasures: '',
  penaltySituation: '',
  rectificationRequirement: '',
  checkLeader: '',
  leaderPhone: '',
  checkPersonnel: '',
  followUpPlan: '',
  supervisionSuggestions: '',
  needRecheck: false,
  recheckTime: '',
  photos: [],
  attachments: [],
  remarks: '',
})

// 表单验证规则
const rules = {
  startTime: [{ required: true, message: '请选择核查开始时间', trigger: 'change' }],
  checkResult: [
    { required: true, message: '请填写核查结果', trigger: 'blur' },
    { min: 20, message: '核查结果至少20个字符', trigger: 'blur' },
  ],
  checkDescription: [
    { required: true, message: '请填写核查情况说明', trigger: 'blur' },
    { min: 10, message: '核查情况说明至少10个字符', trigger: 'blur' },
  ],
  checkStatus: [{ required: true, message: '请选择核查状态', trigger: 'change' }],
  clueAuthenticity: [{ required: true, message: '请选择线索真实性', trigger: 'change' }],
  checkLeader: [{ required: true, message: '请填写核查负责人', trigger: 'blur' }],
  leaderPhone: [
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

    ElMessage.success('线索核查问题处理完成！')
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
.clue-check-step3 {
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
