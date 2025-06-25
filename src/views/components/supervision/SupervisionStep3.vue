<template>
  <div class="supervision-step3">
    <el-card class="step-card">
      <template #header>
        <div class="card-header">
          <h3>第三步：整改情况</h3>
          <span class="step-desc">记录问题整改过程和结果</span>
        </div>
      </template>

      <!-- 整改记录列表 -->
      <div class="records-section" v-if="records.length > 0">
        <h4>整改记录</h4>
        <div class="records-list">
          <el-card
            v-for="(record, index) in records"
            :key="index"
            class="record-item"
            shadow="hover"
          >
            <div class="record-header">
              <span class="record-title">第{{ index + 1 }}次整改记录</span>
              <span class="record-date">{{ formatDate(record.date) }}</span>
            </div>
            <div class="record-content">
              <div class="record-field">
                <strong>整改措施：</strong>
                <p>{{ record.measures }}</p>
              </div>
              <div class="record-field">
                <strong>整改效果：</strong>
                <p>{{ record.effect }}</p>
              </div>
              <div class="record-field">
                <strong>整改状态：</strong>
                <el-tag :type="getStatusType(record.status)">{{ record.status }}</el-tag>
              </div>
              <div class="record-field" v-if="record.photos && record.photos.length > 0">
                <strong>整改照片：</strong>
                <div class="photos-preview">
                  <el-image
                    v-for="(photo, photoIndex) in record.photos"
                    :key="photoIndex"
                    :src="photo.url"
                    :preview-src-list="record.photos.map((p) => p.url)"
                    class="photo-item"
                    fit="cover"
                  />
                </div>
              </div>
            </div>
          </el-card>
        </div>
      </div>

      <!-- 新增整改记录表单 -->
      <div class="new-record-section">
        <h4>{{ records.length > 0 ? '新增整改记录' : '填写整改情况' }}</h4>
        <el-form
          ref="formRef"
          :model="formData"
          :rules="rules"
          label-width="120px"
          class="step-form"
        >
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="整改日期" prop="date">
                <el-date-picker
                  v-model="formData.date"
                  type="date"
                  placeholder="选择整改日期"
                  style="width: 100%"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="整改状态" prop="status">
                <el-select
                  v-model="formData.status"
                  placeholder="请选择整改状态"
                  style="width: 100%"
                >
                  <el-option label="整改中" value="整改中" />
                  <el-option label="已完成" value="已完成" />
                  <el-option label="需要继续整改" value="需要继续整改" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="整改措施" prop="measures">
            <el-input
              v-model="formData.measures"
              type="textarea"
              :rows="4"
              placeholder="请详细描述采取的整改措施..."
            />
          </el-form-item>

          <el-form-item label="整改效果" prop="effect">
            <el-input
              v-model="formData.effect"
              type="textarea"
              :rows="4"
              placeholder="请描述整改后的效果和变化..."
            />
          </el-form-item>

          <el-form-item label="整改负责人" prop="responsible">
            <el-input v-model="formData.responsible" placeholder="请输入整改负责人姓名" />
          </el-form-item>

          <el-form-item label="联系电话" prop="phone">
            <el-input v-model="formData.phone" placeholder="请输入联系电话" />
          </el-form-item>

          <el-form-item label="整改照片">
            <el-upload
              ref="uploadRef"
              :file-list="formData.photos"
              :on-change="handlePhotoChange"
              :on-remove="handlePhotoRemove"
              :before-upload="beforeUpload"
              :auto-upload="false"
              accept="image/*"
              multiple
              list-type="picture-card"
            >
              <el-icon><Plus /></el-icon>
            </el-upload>
            <div class="upload-tip">支持 jpg、png、gif 格式，单个文件不超过 5MB</div>
          </el-form-item>

          <el-form-item label="备注说明">
            <el-input
              v-model="formData.remarks"
              type="textarea"
              :rows="3"
              placeholder="其他需要说明的情况..."
            />
          </el-form-item>
        </el-form>
      </div>

      <!-- 操作按钮 -->
      <div class="form-actions">
        <el-button @click="$emit('prev')">上一步</el-button>
        <el-button type="primary" @click="addRecord" :loading="loading">
          {{ records.length > 0 ? '添加整改记录' : '保存整改情况' }}
        </el-button>
        <el-button
          v-if="formData.status === '已完成'"
          type="success"
          @click="completeIssue"
          :loading="loading"
        >
          完成问题处理
        </el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const formRef = ref()
const uploadRef = ref()
const loading = ref(false)

// 整改记录列表
const records = ref([])

// 表单数据
const formData = reactive({
  date: new Date(),
  status: '',
  measures: '',
  effect: '',
  responsible: '',
  phone: '',
  photos: [],
  remarks: '',
})

// 表单验证规则
const rules = {
  date: [{ required: true, message: '请选择整改日期', trigger: 'change' }],
  status: [{ required: true, message: '请选择整改状态', trigger: 'change' }],
  measures: [
    { required: true, message: '请填写整改措施', trigger: 'blur' },
    { min: 10, message: '整改措施至少10个字符', trigger: 'blur' },
  ],
  effect: [
    { required: true, message: '请填写整改效果', trigger: 'blur' },
    { min: 10, message: '整改效果至少10个字符', trigger: 'blur' },
  ],
  responsible: [{ required: true, message: '请填写整改负责人', trigger: 'blur' }],
  phone: [
    { required: true, message: '请填写联系电话', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' },
  ],
}

// 组件通信
const emit = defineEmits(['prev', 'complete'])

// 格式化日期
const formatDate = (date) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('zh-CN')
}

// 获取状态标签类型
const getStatusType = (status) => {
  const typeMap = {
    整改中: 'warning',
    已完成: 'success',
    需要继续整改: 'danger',
  }
  return typeMap[status] || 'info'
}

// 文件上传处理
const handlePhotoChange = (file, fileList) => {
  formData.photos = fileList
}

const handlePhotoRemove = (file, fileList) => {
  formData.photos = fileList
}

const beforeUpload = (file) => {
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

// 添加整改记录
const addRecord = async () => {
  if (!formRef.value) return

  try {
    await formRef.value.validate()
    loading.value = true

    // 模拟API调用
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // 添加到记录列表
    const newRecord = {
      ...formData,
      date: new Date(formData.date),
      photos: [...formData.photos],
    }
    records.value.push(newRecord)

    // 重置表单
    formRef.value.resetFields()
    formData.photos = []

    ElMessage.success(records.value.length === 1 ? '整改情况保存成功！' : '整改记录添加成功！')

    // 如果状态是已完成，询问是否完成问题处理
    if (newRecord.status === '已完成') {
      ElMessageBox.confirm('整改状态为已完成，是否完成整个问题的处理？', '确认完成', {
        confirmButtonText: '完成处理',
        cancelButtonText: '继续编辑',
        type: 'success',
      })
        .then(() => {
          completeIssue()
        })
        .catch(() => {
          // 用户选择继续编辑
        })
    }
  } catch (error) {
    console.error('保存失败:', error)
  } finally {
    loading.value = false
  }
}

// 完成问题处理
const completeIssue = async () => {
  try {
    loading.value = true

    // 模拟API调用
    await new Promise((resolve) => setTimeout(resolve, 1000))

    ElMessage.success('问题处理完成！')
    emit('complete')
  } catch (error) {
    ElMessage.error('操作失败，请重试')
  } finally {
    loading.value = false
  }
}

// 加载已有数据
const loadData = async () => {
  try {
    const issueId = route.params.id
    // 模拟加载整改记录
    // const response = await api.getIssueRecords(issueId)
    // records.value = response.data || []
  } catch (error) {
    console.error('加载数据失败:', error)
  }
}

onMounted(() => {
  loadData()
})
</script>

<style scoped>
.supervision-step3 {
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

.records-section {
  margin-bottom: 30px;
}

.records-section h4 {
  color: #217346;
  margin-bottom: 16px;
  font-size: 16px;
}

.records-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.record-item {
  border-left: 4px solid #217346;
}

.record-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.record-title {
  font-weight: bold;
  color: #217346;
}

.record-date {
  color: #666;
  font-size: 14px;
}

.record-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.record-field strong {
  color: #333;
  margin-right: 8px;
}

.record-field p {
  margin: 4px 0 0 0;
  color: #666;
  line-height: 1.5;
}

.photos-preview {
  display: flex;
  gap: 8px;
  margin-top: 8px;
}

.photo-item {
  width: 60px;
  height: 60px;
  border-radius: 4px;
}

.new-record-section {
  border-top: 1px solid #eee;
  padding-top: 24px;
}

.new-record-section h4 {
  color: #217346;
  margin-bottom: 20px;
  font-size: 16px;
}

.step-form {
  background: #fafafa;
  padding: 24px;
  border-radius: 8px;
  margin-bottom: 24px;
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
</style>
