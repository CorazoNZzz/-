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
      <div class="initial-creation-step">
        <h2 style="color: #217346">新建问题</h2>
        <el-divider content-position="left">请认真填写问题信息，便于后续跟进处理</el-divider>

        <el-form
          ref="formRef"
          :model="formData"
          :rules="formRules"
          label-width="120px"
          style="max-width: 600px; margin: 40px auto"
        >
          <el-form-item label="问题名称" prop="name">
            <el-input
              v-model="formData.name"
              placeholder="请输入问题名称，50字以内"
              maxlength="50"
              show-word-limit
            />
          </el-form-item>

          <el-form-item label="选择表单" prop="formType">
            <el-select v-model="formData.formType" placeholder="请选择" style="width: 100%">
              <el-option label="督查在线" value="督查在线" />
              <el-option label="远程帮扶" value="远程帮扶" />
              <el-option label="数字化指挥中心" value="数字化指挥中心" />
              <el-option label="线索核查" value="线索核查" />
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button
              type="primary"
              size="large"
              style="width: 120px"
              @click="createIssue"
              :loading="saving"
            >
              新建
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import MockAPI from '../utils/api.js'

const router = useRouter()

// 表单数据
const formData = ref({
  name: '',
  formType: '',
})

// 表单引用
const formRef = ref()

// 状态
const loading = ref(false)
const saving = ref(false)

// 表单验证规则
const formRules = {
  name: [
    { required: true, message: '请输入问题名称', trigger: 'blur' },
    { min: 1, max: 50, message: '问题名称长度在1到50个字符', trigger: 'blur' },
  ],
  formType: [{ required: true, message: '请选择表单类型', trigger: 'change' }],
}

// 返回列表
const handleGoBack = () => {
  router.push('/')
}

// 创建问题
const createIssue = async () => {
  // 验证表单
  const valid = await formRef.value.validate().catch(() => false)
  if (!valid) return

  saving.value = true

  try {
    // 使用模拟API创建问题
    const result = await MockAPI.createIssue(formData.value)

    if (result.success) {
      ElMessage.success('问题创建成功！')

      // 根据表单类型跳转到对应的第一步
      const typeMap = {
        督查在线: 'supervision-step1',
        远程帮扶: 'remote-help-step1',
        数字化指挥中心: 'digital-center-step1',
        线索核查: 'clue-check-step1',
      }

      const routeName = typeMap[formData.value.formType] || 'supervision-step1'

      router.push({
        name: routeName,
        params: { id: result.data.id },
      })
    } else {
      ElMessage.error(result.message || '创建失败')
    }
  } catch (error) {
    console.error('创建问题失败:', error)
    ElMessage.error('创建失败，请重试')
  } finally {
    saving.value = false
  }
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
  max-width: 700px;
  border-radius: 12px;
  box-shadow: 0 4px 24px 0 rgba(33, 115, 70, 0.08);
  border: none;
  background: #fff;
}

.initial-creation-step {
  padding: 20px 0 0 0;
}
</style>
