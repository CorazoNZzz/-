<template>
  <div class="clue-check-step2">
    <el-card class="step-card">
      <template #header>
        <div class="card-header">
          <h3>第二步：问题交办</h3>
          <span class="step-desc">填写核查交办信息</span>
        </div>
      </template>

      <el-form ref="formRef" :model="formData" :rules="rules" label-width="140px" class="step-form">
        <div class="form-section">
          <h4>交办基本信息</h4>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="核查交办日期" prop="assignDate">
                <el-date-picker
                  v-model="formData.assignDate"
                  type="date"
                  placeholder="选择核查交办日期"
                  style="width: 100%"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="交办文号" prop="assignNumber">
                <el-input v-model="formData.assignNumber" placeholder="请输入交办文号" />
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
              <el-form-item label="接收单位" prop="receivingUnit">
                <el-input v-model="formData.receivingUnit" placeholder="请输入接收单位" />
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <div class="form-section">
          <h4>核查内容</h4>
          <el-form-item label="核查内容" prop="checkContent">
            <el-input
              v-model="formData.checkContent"
              type="textarea"
              :rows="5"
              placeholder="请详细填写需要核查的内容..."
            />
          </el-form-item>

          <el-form-item label="核查要求" prop="checkRequirement">
            <el-input
              v-model="formData.checkRequirement"
              type="textarea"
              :rows="4"
              placeholder="请填写具体的核查要求和标准..."
            />
          </el-form-item>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="要求完成时间" prop="requiredCompletionTime">
                <el-date-picker
                  v-model="formData.requiredCompletionTime"
                  type="date"
                  placeholder="选择要求完成时间"
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
                  <el-option label="书面核查" value="书面核查" />
                  <el-option label="综合核查" value="综合核查" />
                  <el-option label="专项核查" value="专项核查" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <div class="form-section">
          <h4>核查重点</h4>
          <el-form-item label="核查重点" prop="checkFocus">
            <el-input
              v-model="formData.checkFocus"
              type="textarea"
              :rows="4"
              placeholder="请填写核查的重点内容和关键问题..."
            />
          </el-form-item>

          <el-form-item label="核查方法" prop="checkMethod">
            <el-input
              v-model="formData.checkMethod"
              type="textarea"
              :rows="3"
              placeholder="请填写核查采用的方法和技术手段..."
            />
          </el-form-item>

          <el-form-item label="核查范围" prop="checkScope">
            <el-input
              v-model="formData.checkScope"
              type="textarea"
              :rows="3"
              placeholder="请填写核查的地理范围和时间范围..."
            />
          </el-form-item>
        </div>

        <div class="form-section">
          <h4>配合部门</h4>
          <el-form-item label="配合部门" prop="cooperatingDepartments">
            <el-input
              v-model="formData.cooperatingDepartments"
              type="textarea"
              :rows="3"
              placeholder="请填写需要配合的部门和单位..."
            />
          </el-form-item>

          <el-form-item label="技术支持" prop="technicalSupport">
            <el-input
              v-model="formData.technicalSupport"
              type="textarea"
              :rows="3"
              placeholder="请填写需要的技术支持和专家协助..."
            />
          </el-form-item>
        </div>

        <div class="form-section">
          <h4>核查负责人</h4>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="核查负责人" prop="checkLeader">
                <el-input v-model="formData.checkLeader" placeholder="请输入核查负责人姓名" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系电话" prop="leaderPhone">
                <el-input v-model="formData.leaderPhone" placeholder="请输入负责人联系电话" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="核查组成员" prop="checkMembers">
            <el-input
              v-model="formData.checkMembers"
              type="textarea"
              :rows="3"
              placeholder="请填写核查组成员信息..."
            />
          </el-form-item>
        </div>

        <div class="form-section">
          <h4>注意事项</h4>
          <el-form-item label="注意事项" prop="precautions">
            <el-input
              v-model="formData.precautions"
              type="textarea"
              :rows="4"
              placeholder="请填写核查过程中需要注意的事项..."
            />
          </el-form-item>

          <el-form-item label="安全要求" prop="safetyRequirements">
            <el-input
              v-model="formData.safetyRequirements"
              type="textarea"
              :rows="3"
              placeholder="请填写核查过程中的安全要求..."
            />
          </el-form-item>
        </div>

        <div class="form-section">
          <h4>相关文件</h4>
          <el-form-item label="交办文件">
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

const formRef = ref()
const uploadRef = ref()
const loading = ref(false)

// 表单数据
const formData = reactive({
  assignDate: new Date(),
  assignNumber: '',
  assignUnit: '',
  receivingUnit: '',
  checkContent: '',
  checkRequirement: '',
  requiredCompletionTime: '',
  checkType: '',
  checkFocus: '',
  checkMethod: '',
  checkScope: '',
  cooperatingDepartments: '',
  technicalSupport: '',
  checkLeader: '',
  leaderPhone: '',
  checkMembers: '',
  precautions: '',
  safetyRequirements: '',
  attachments: [],
  remarks: '',
})

// 表单验证规则
const rules = {
  assignDate: [{ required: true, message: '请选择核查交办日期', trigger: 'change' }],
  assignNumber: [{ required: true, message: '请输入交办文号', trigger: 'blur' }],
  assignUnit: [{ required: true, message: '请输入交办单位', trigger: 'blur' }],
  receivingUnit: [{ required: true, message: '请输入接收单位', trigger: 'blur' }],
  checkContent: [
    { required: true, message: '请填写核查内容', trigger: 'blur' },
    { min: 20, message: '核查内容至少20个字符', trigger: 'blur' },
  ],
  checkRequirement: [
    { required: true, message: '请填写核查要求', trigger: 'blur' },
    { min: 10, message: '核查要求至少10个字符', trigger: 'blur' },
  ],
  requiredCompletionTime: [{ required: true, message: '请选择要求完成时间', trigger: 'change' }],
  checkType: [{ required: true, message: '请选择核查类型', trigger: 'change' }],
  checkLeader: [{ required: true, message: '请输入核查负责人', trigger: 'blur' }],
  leaderPhone: [
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
.clue-check-step2 {
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
