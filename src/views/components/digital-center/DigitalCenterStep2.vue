<template>
  <div class="digital-center-step2">
    <el-card class="step-card">
      <template #header>
        <div class="card-header">
          <h3>第二步：问题交办</h3>
          <span class="step-desc">填写指挥调度和处置要求</span>
        </div>
      </template>

      <el-form ref="formRef" :model="formData" :rules="rules" label-width="140px" class="step-form">
        <div class="form-section">
          <h4>指挥调度信息</h4>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="指挥调度时间" prop="commandTime">
                <el-date-picker
                  v-model="formData.commandTime"
                  type="datetime"
                  placeholder="选择指挥调度时间"
                  style="width: 100%"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="调度指令编号" prop="commandNumber">
                <el-input v-model="formData.commandNumber" placeholder="请输入调度指令编号" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="调度指挥员" prop="commander">
                <el-input v-model="formData.commander" placeholder="请输入调度指挥员姓名" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="接收单位" prop="receivingUnit">
                <el-input v-model="formData.receivingUnit" placeholder="请输入接收单位" />
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <div class="form-section">
          <h4>指挥调度内容</h4>
          <el-form-item label="指挥调度内容" prop="commandContent">
            <el-input
              v-model="formData.commandContent"
              type="textarea"
              :rows="5"
              placeholder="请详细填写指挥调度的具体内容和要求..."
            />
          </el-form-item>

          <el-form-item label="处置要求" prop="disposalRequirement">
            <el-input
              v-model="formData.disposalRequirement"
              type="textarea"
              :rows="4"
              placeholder="请填写具体的处置要求和标准..."
            />
          </el-form-item>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="要求完成时间" prop="requiredCompletionTime">
                <el-date-picker
                  v-model="formData.requiredCompletionTime"
                  type="datetime"
                  placeholder="选择要求完成时间"
                  style="width: 100%"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="优先级" prop="priority">
                <el-select
                  v-model="formData.priority"
                  placeholder="请选择优先级"
                  style="width: 100%"
                >
                  <el-option label="低" value="低" />
                  <el-option label="中" value="中" />
                  <el-option label="高" value="高" />
                  <el-option label="紧急" value="紧急" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <div class="form-section">
          <h4>协调配合</h4>
          <el-form-item label="协调部门" prop="coordinatingDepartments">
            <el-input
              v-model="formData.coordinatingDepartments"
              type="textarea"
              :rows="3"
              placeholder="请填写需要协调配合的部门..."
            />
          </el-form-item>

          <el-form-item label="技术支撑" prop="technicalSupport">
            <el-input
              v-model="formData.technicalSupport"
              type="textarea"
              :rows="3"
              placeholder="请填写需要的技术支撑和专家支持..."
            />
          </el-form-item>

          <el-form-item label="资源调配" prop="resourceAllocation">
            <el-input
              v-model="formData.resourceAllocation"
              type="textarea"
              :rows="3"
              placeholder="请填写需要调配的人力、物力资源..."
            />
          </el-form-item>
        </div>

        <div class="form-section">
          <h4>联系信息</h4>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="联系人" prop="contactPerson">
                <el-input v-model="formData.contactPerson" placeholder="请输入联系人姓名" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系电话" prop="contactPhone">
                <el-input v-model="formData.contactPhone" placeholder="请输入联系电话" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="应急联系人" prop="emergencyContact">
                <el-input v-model="formData.emergencyContact" placeholder="请输入应急联系人" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="应急电话" prop="emergencyPhone">
                <el-input v-model="formData.emergencyPhone" placeholder="请输入应急电话" />
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <div class="form-section">
          <h4>相关文件</h4>
          <el-form-item label="指令文件">
            <el-upload
              ref="uploadRef"
              :file-list="formData.attachments"
              :on-change="handleFileChange"
              :on-remove="handleFileRemove"
              :before-upload="beforeUpload"
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
  commandTime: '',
  commandNumber: '',
  commander: '',
  receivingUnit: '',
  commandContent: '',
  disposalRequirement: '',
  requiredCompletionTime: '',
  priority: '',
  coordinatingDepartments: '',
  technicalSupport: '',
  resourceAllocation: '',
  contactPerson: '',
  contactPhone: '',
  emergencyContact: '',
  emergencyPhone: '',
  attachments: [],
  remarks: '',
})

// 表单验证规则
const rules = {
  commandTime: [{ required: true, message: '请选择指挥调度时间', trigger: 'change' }],
  commandNumber: [{ required: true, message: '请输入调度指令编号', trigger: 'blur' }],
  commander: [{ required: true, message: '请输入调度指挥员', trigger: 'blur' }],
  receivingUnit: [{ required: true, message: '请输入接收单位', trigger: 'blur' }],
  commandContent: [
    { required: true, message: '请填写指挥调度内容', trigger: 'blur' },
    { min: 20, message: '指挥调度内容至少20个字符', trigger: 'blur' },
  ],
  disposalRequirement: [
    { required: true, message: '请填写处置要求', trigger: 'blur' },
    { min: 10, message: '处置要求至少10个字符', trigger: 'blur' },
  ],
  requiredCompletionTime: [{ required: true, message: '请选择要求完成时间', trigger: 'change' }],
  priority: [{ required: true, message: '请选择优先级', trigger: 'change' }],
  contactPerson: [{ required: true, message: '请输入联系人', trigger: 'blur' }],
  contactPhone: [
    { required: true, message: '请输入联系电话', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' },
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

    ElMessage.success('交办信息保存成功！')
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
.digital-center-step2 {
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
</style>
