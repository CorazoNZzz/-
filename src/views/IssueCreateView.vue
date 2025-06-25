<!--
  问题创建视图组件

  功能说明：
  1. 提供问题创建的初始表单
  2. 支持选择不同的表单类型（督查在线、远程帮扶、数字化指挥中心、线索核查）
  3. 创建成功后自动跳转到对应表单类型的第一步
  4. 表单验证确保数据完整性

  业务流程：
  1. 用户填写问题名称
  2. 选择表单类型
  3. 点击新建按钮
  4. 后端创建问题记录并返回问题ID
  5. 前端跳转到对应表单类型的详细填写页面

  数据结构：
  - formData: 表单数据对象
  - loading: 页面加载状态
  - saving: 保存状态
-->
<template>
  <!-- 页面容器 -->
  <div class="page-container">
    <!-- 顶部导航栏 -->
    <div class="header-bar">
      <img src="/src/assets/logo.svg" class="logo" alt="环保局Logo" />
      <div class="system-title">环保局问题交办系统</div>
      <div class="header-actions">
        <span>登录人：管理员</span>
        <el-button type="primary" @click="handleGoBack">返回列表</el-button>
      </div>
    </div>

    <!-- 主要内容卡片 -->
    <el-card shadow="always" class="main-card" v-loading="loading">
      <div class="initial-creation-step">
        <h2 style="color: #217346">新建问题</h2>
        <el-divider content-position="left">
          请认真填写问题信息，便于后续跟进处理
        </el-divider>

        <!-- 问题创建表单 -->
        <el-form
          ref="formRef"
          :model="formData"
          :rules="formRules"
          label-width="120px"
          style="max-width: 600px; margin: 40px auto"
        >
          <!-- 问题名称输入框 -->
          <el-form-item label="问题名称" prop="name">
            <el-input
              v-model="formData.name"
              placeholder="请输入问题名称，50字以内"
              maxlength="50"
              show-word-limit
              clearable
            />
            <div class="form-help-text">
              问题名称应简洁明了，便于识别和管理
            </div>
          </el-form-item>

          <!-- 表单类型选择 -->
          <el-form-item label="选择表单" prop="formType">
            <el-select
              v-model="formData.formType"
              placeholder="请选择表单类型"
              style="width: 100%"
              @change="handleFormTypeChange"
            >
              <el-option
                label="督查在线"
                value="督查在线"
                :disabled="false"
              >
                <span>督查在线</span>
                <span style="float: right; color: #8492a6; font-size: 12px;">
                  环保督查问题处理
                </span>
              </el-option>

              <el-option
                label="远程帮扶"
                value="远程帮扶"
                :disabled="false"
              >
                <span>远程帮扶</span>
                <span style="float: right; color: #8492a6; font-size: 12px;">
                  技术支持与帮扶
                </span>
              </el-option>

              <el-option
                label="数字化指挥中心"
                value="数字化指挥中心"
                :disabled="false"
              >
                <span>数字化指挥中心</span>
                <span style="float: right; color: #8492a6; font-size: 12px;">
                  应急指挥处置
                </span>
              </el-option>

              <el-option
                label="线索核查"
                value="线索核查"
                :disabled="false"
              >
                <span>线索核查</span>
                <span style="float: right; color: #8492a6; font-size: 12px;">
                  环保违法线索调查
                </span>
              </el-option>
            </el-select>
            <div class="form-help-text">
              不同表单类型对应不同的处理流程和字段要求
            </div>
          </el-form-item>

          <!-- 表单描述信息 -->
          <el-form-item v-if="formData.formType">
            <el-alert
              :title="getFormTypeDescription(formData.formType)"
              type="info"
              show-icon
              :closable="false"
            />
          </el-form-item>

          <!-- 操作按钮 -->
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
            <el-button size="large" @click="handleGoBack">
              取消
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

// ===========================================
// 路由和组合式API
// ===========================================
const router = useRouter()

// ===========================================
// 响应式数据定义
// ===========================================

/**
 * 表单数据对象
 * 包含问题创建所需的基本信息
 */
const formData = ref({
  name: '',        // 问题名称
  formType: '',    // 表单类型
})

/**
 * 表单引用
 * 用于表单验证和重置
 */
const formRef = ref()

/**
 * 页面加载状态
 * 用于显示页面级别的loading
 */
const loading = ref(false)

/**
 * 保存状态
 * 用于显示创建按钮的loading状态
 */
const saving = ref(false)

// ===========================================
// 表单验证规则
// ===========================================

/**
 * 表单验证规则定义
 * 确保用户输入的数据符合业务要求
 */
const formRules = {
  // 问题名称验证规则
  name: [
    {
      required: true,
      message: '请输入问题名称',
      trigger: 'blur'
    },
    {
      min: 1,
      max: 50,
      message: '问题名称长度在1到50个字符',
      trigger: 'blur'
    },
    {
      pattern: /^[^\s].*[^\s]$|^[^\s]$/,
      message: '问题名称不能以空格开头或结尾',
      trigger: 'blur'
    }
  ],
  // 表单类型验证规则
  formType: [
    {
      required: true,
      message: '请选择表单类型',
      trigger: 'change'
    }
  ],
}

// ===========================================
// 方法定义
// ===========================================

/**
 * 返回问题列表页面
 * 使用路由导航返回首页
 */
const handleGoBack = () => {
  router.push('/')
}

/**
 * 处理表单类型变化
 * 当用户选择不同表单类型时触发
 *
 * @param {string} formType - 选中的表单类型
 */
const handleFormTypeChange = (formType) => {
  console.log('选择的表单类型:', formType)
  // 这里可以根据表单类型执行额外的逻辑
  // 比如预加载对应的表单模板等
}

/**
 * 获取表单类型的描述信息
 * 用于在界面上显示不同表单类型的说明
 *
 * @param {string} formType - 表单类型
 * @returns {string} 描述信息
 */
const getFormTypeDescription = (formType) => {
  const descriptions = {
    '督查在线': '用于环保督查问题的交办、跟踪和整改管理，包含问题描述、整改措施、完成情况等信息。',
    '远程帮扶': '用于远程技术帮扶和指导，支持Excel批量导入，包含企业信息、帮扶内容、效果评估等。',
    '数字化指挥中心': '用于环保应急事件的指挥调度和处置管理，包含事件等级、处置措施、结果反馈等。',
    '线索核查': '用于环保违法线索的调查核实和处理，包含线索来源、核查过程、处理结果等信息。'
  }

  return descriptions[formType] || '请选择合适的表单类型以继续操作。'
}

/**
 * 创建问题的主要业务逻辑
 *
 * 处理流程：
 * 1. 验证表单数据
 * 2. 调用API创建问题
 * 3. 处理创建结果
 * 4. 跳转到对应的表单填写页面
 */
const createIssue = async () => {
  try {
    // 第一步：验证表单数据
    const valid = await formRef.value.validate().catch(() => false)
    if (!valid) {
      ElMessage.warning('请检查表单填写是否完整')
      return
    }

    // 第二步：设置保存状态
    saving.value = true

    // 第三步：调用API创建问题
    const result = await MockAPI.createIssue(formData.value)

    // 第四步：处理API响应
    if (result.success) {
      // 创建成功
      ElMessage.success('问题创建成功！')

      // 第五步：根据表单类型跳转到对应的详细填写页面
      const routeMap = {
        '督查在线': 'supervision-step1',
        '远程帮扶': 'remote-help-step1',
        '数字化指挥中心': 'digital-center-step1',
        '线索核查': 'clue-check-step1',
      }

      const routeName = routeMap[formData.value.formType]

      if (routeName) {
        // 跳转到对应表单的第一步
        router.push({
          name: routeName,
          params: { id: result.data.id },
        })
      } else {
        // 如果没有匹配的路由，默认跳转到督查在线
        console.warn('未找到匹配的路由，使用默认路由')
        router.push({
          name: 'supervision-step1',
          params: { id: result.data.id },
        })
      }
    } else {
      // 创建失败
      ElMessage.error(result.message || '创建失败，请重试')
    }
  } catch (error) {
    // 捕获异常
    console.error('创建问题失败:', error)
    ElMessage.error('创建失败，请检查网络连接后重试')
  } finally {
    // 无论成功失败都要清除保存状态
    saving.value = false
  }
}

/**
 * 重置表单数据
 * 清空所有表单字段并重置验证状态
 */
const resetForm = () => {
  if (formRef.value) {
    formRef.value.resetFields()
  }
  formData.value = {
    name: '',
    formType: ''
  }
}

// ===========================================
// 暴露给父组件的方法（如果需要）
// ===========================================
defineExpose({
  resetForm,
  createIssue
})
</script>

<style scoped>
/* ===========================================
   页面整体样式
   =========================================== */
.page-container {
  padding: 0;
  background: linear-gradient(135deg, #e8f5e9 0%, #e3f2fd 100%);
  min-height: 100vh;
}

/* ===========================================
   顶部导航栏样式
   =========================================== */
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
  color: #666;
  font-size: 14px;
}

/* ===========================================
   主要内容卡片样式
   =========================================== */
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

/* ===========================================
   表单样式
   =========================================== */
.form-help-text {
  font-size: 12px;
  color: #909399;
  margin-top: 4px;
  line-height: 1.4;
}

/* 表单项间距调整 */
:deep(.el-form-item) {
  margin-bottom: 24px;
}

/* 表单标签样式 */
:deep(.el-form-item__label) {
  font-weight: 500;
  color: #303133;
}

/* 输入框样式优化 */
:deep(.el-input__inner) {
  border-radius: 6px;
}

:deep(.el-select .el-input__inner) {
  border-radius: 6px;
}

/* 按钮样式 */
:deep(.el-button) {
  border-radius: 6px;
  font-weight: 500;
}

/* 选择框选项样式 */
:deep(.el-select-dropdown__item) {
  padding: 12px 20px;
  line-height: 1.4;
}

/* 提示框样式 */
:deep(.el-alert) {
  border-radius: 6px;
  margin-top: 8px;
}

:deep(.el-alert__content) {
  line-height: 1.5;
}

/* ===========================================
   响应式样式
   =========================================== */
@media (max-width: 768px) {
  .header-bar {
    padding: 0 16px;
    height: 56px;
    flex-wrap: wrap;
  }

  .system-title {
    font-size: 18px;
  }

  .header-actions {
    font-size: 12px;
    gap: 12px;
  }

  .main-card {
    margin: 20px 16px 0 16px;
    max-width: none;
  }

  .initial-creation-step {
    padding: 16px;
  }

  /* 移动端表单样式调整 */
  :deep(.el-form) {
    max-width: none !important;
    margin: 20px 0 !important;
  }

  :deep(.el-form-item__label) {
    font-size: 14px;
  }

  :deep(.el-button) {
    width: 100%;
    margin-bottom: 8px;
  }
}

/* ===========================================
   打印样式（如果需要）
   =========================================== */
@media print {
  .header-actions {
    display: none;
  }

  .page-container {
    background: white;
  }

  .main-card {
    box-shadow: none;
    border: 1px solid #ddd;
  }
}
</style>
