<!--
  404页面未找到组件
  功能：当用户访问不存在的页面时显示友好的错误提示
  作者：前端开发团队
  创建时间：2025年1月
-->
<template>
  <div class="not-found-container">
    <!-- 404错误内容 -->
    <div class="not-found-content">
      <!-- 404图标和数字 -->
      <div class="error-icon">
        <el-icon :size="120" color="#217346">
          <Warning />
        </el-icon>
      </div>

      <!-- 错误信息 -->
      <div class="error-info">
        <h1 class="error-title">404</h1>
        <h2 class="error-subtitle">页面未找到</h2>
        <p class="error-description">
          抱歉，您访问的页面不存在或已被移除。
          <br>
          请检查网址是否正确，或返回首页继续浏览。
        </p>
      </div>

      <!-- 操作按钮 -->
      <div class="error-actions">
        <el-button
          type="primary"
          size="large"
          @click="goHome"
          class="action-button"
        >
          <el-icon><House /></el-icon>
          返回首页
        </el-button>

        <el-button
          size="large"
          @click="goBack"
          class="action-button"
        >
          <el-icon><Back /></el-icon>
          返回上页
        </el-button>
      </div>

      <!-- 建议链接 -->
      <div class="suggestions">
        <p class="suggestions-title">您可能需要：</p>
        <div class="suggestions-links">
          <router-link to="/issues" class="suggestion-link">
            <el-icon><List /></el-icon>
            问题列表
          </router-link>
          <router-link to="/issues/create" class="suggestion-link">
            <el-icon><Plus /></el-icon>
            创建问题
          </router-link>
        </div>
      </div>
    </div>

    <!-- 装饰性背景 -->
    <div class="background-decoration">
      <div class="decoration-circle circle-1"></div>
      <div class="decoration-circle circle-2"></div>
      <div class="decoration-circle circle-3"></div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import {
  Warning,
  House,
  Back,
  List,
  Plus
} from '@element-plus/icons-vue'

/**
 * 路由实例
 */
const router = useRouter()

/**
 * 返回首页
 * 导航到问题列表页面（作为首页）
 */
const goHome = () => {
  router.push({ name: 'home' })
}

/**
 * 返回上一页
 * 使用浏览器历史记录返回
 */
const goBack = () => {
  // 如果有历史记录就返回，否则去首页
  if (window.history.length > 1) {
    router.go(-1)
  } else {
    goHome()
  }
}
</script>

<style scoped>
/**
 * 404页面样式
 * 采用居中布局，包含装饰性背景元素
 */
.not-found-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #e8f5e9 0%, #e3f2fd 100%);
  position: relative;
  overflow: hidden;
  padding: 20px;
}

/**
 * 主要内容区域
 */
.not-found-content {
  text-align: center;
  z-index: 2;
  position: relative;
  max-width: 600px;
  width: 100%;
}

/**
 * 错误图标区域
 */
.error-icon {
  margin-bottom: 30px;
  animation: bounce 2s infinite;
}

/**
 * 错误信息样式
 */
.error-info {
  margin-bottom: 40px;
}

.error-title {
  font-size: 120px;
  font-weight: bold;
  color: #217346;
  margin: 0;
  line-height: 1;
  text-shadow: 2px 2px 4px rgba(33, 115, 70, 0.1);
}

.error-subtitle {
  font-size: 32px;
  color: #666;
  margin: 10px 0;
  font-weight: 500;
}

.error-description {
  font-size: 16px;
  color: #888;
  line-height: 1.6;
  margin: 0;
}

/**
 * 操作按钮区域
 */
.error-actions {
  margin-bottom: 40px;
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

.action-button {
  min-width: 140px;
  height: 44px;
  border-radius: 22px;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}

/**
 * 建议链接区域
 */
.suggestions {
  margin-top: 20px;
}

.suggestions-title {
  font-size: 16px;
  color: #666;
  margin-bottom: 16px;
}

.suggestions-links {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}

.suggestion-link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 20px;
  text-decoration: none;
  color: #217346;
  font-size: 14px;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(33, 115, 70, 0.1);
}

.suggestion-link:hover {
  background: rgba(255, 255, 255, 0.95);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(33, 115, 70, 0.15);
  color: #1a5d38;
}

/**
 * 装饰性背景元素
 */
.background-decoration {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.decoration-circle {
  position: absolute;
  border-radius: 50%;
  background: rgba(33, 115, 70, 0.05);
  animation: float 6s ease-in-out infinite;
}

.circle-1 {
  width: 200px;
  height: 200px;
  top: 10%;
  left: 10%;
  animation-delay: 0s;
}

.circle-2 {
  width: 150px;
  height: 150px;
  top: 60%;
  right: 15%;
  animation-delay: 2s;
}

.circle-3 {
  width: 100px;
  height: 100px;
  bottom: 20%;
  left: 20%;
  animation-delay: 4s;
}

/**
 * 动画效果
 */
@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
  }
}

/**
 * 响应式设计
 */
@media (max-width: 768px) {
  .not-found-container {
    padding: 20px 16px;
  }

  .error-title {
    font-size: 80px;
  }

  .error-subtitle {
    font-size: 24px;
  }

  .error-description {
    font-size: 14px;
  }

  .error-actions {
    flex-direction: column;
    align-items: center;
  }

  .action-button {
    width: 100%;
    max-width: 280px;
  }

  .suggestions-links {
    flex-direction: column;
    align-items: center;
  }

  .suggestion-link {
    width: 100%;
    max-width: 200px;
    justify-content: center;
  }

  .decoration-circle {
    opacity: 0.3;
  }

  .circle-1 {
    width: 120px;
    height: 120px;
  }

  .circle-2 {
    width: 80px;
    height: 80px;
  }

  .circle-3 {
    width: 60px;
    height: 60px;
  }
}

@media (max-width: 480px) {
  .error-title {
    font-size: 60px;
  }

  .error-subtitle {
    font-size: 20px;
  }

  .error-description {
    font-size: 13px;
  }
}
</style>
