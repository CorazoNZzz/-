# 环保局问题交办系统 - 前端项目

**作者：** CorazoN  
**创建时间：** 2025年6月  
**版本：** v2.0

## 📋 项目概述

环保局问题交办系统前端是一个基于Vue 3开发的现代化Web应用。系统支持四种不同类型的表单处理流程：督查在线、远程帮扶、数字化指挥中心和线索核查。

### 🎯 主要功能

1. **问题管理**：创建、查看、编辑和跟踪环保问题
2. **多表单支持**：支持四种不同的表单类型，每种类型都有三个处理步骤
3. **权限控制**：基于用户角色的访问控制
4. **文件上传**：支持图片和文档上传
5. **Excel导入**：支持批量数据导入（远程帮扶）
6. **PDF报告**：自动生成问题处理报告

### 🏗️ 系统架构

```
前端 (Vue 3 + Element Plus) ←→ 后端 API ←→ 数据库
```

## 🛠️ 技术栈

### 前端技术
- **Vue 3.5.13** - 渐进式JavaScript框架
- **Element Plus 2.10.2** - Vue 3组件库
- **Vue Router 4.5.0** - 官方路由管理器
- **Pinia 3.0.1** - 状态管理库
- **Vite 6.2.4** - 构建工具

### 开发工具
- **ESLint** - 代码检查工具
- **Prettier** - 代码格式化工具
- **Vue DevTools** - Vue开发者工具

## 📁 项目结构

```
wentijiaoban/
├── public/                     # 静态资源
│   └── favicon.ico
├── src/                        # 源代码
│   ├── assets/                 # 静态资源
│   │   ├── base.css           # 基础样式
│   │   ├── logo.svg           # Logo图标
│   │   └── main.css           # 主样式文件
│   ├── components/             # 公共组件
│   │   ├── FormRenderer.vue   # 表单渲染器
│   │   └── ReportGenerator.vue # 报告生成器
│   ├── router/                 # 路由配置
│   │   └── index.js           # 路由定义
│   ├── stores/                 # 状态管理
│   │   └── counter.js         # 示例store
│   ├── utils/                  # 工具类
│   │   └── api.js             # API接口封装
│   ├── views/                  # 页面视图
│   │   ├── components/         # 页面组件
│   │   │   ├── supervision/    # 督查在线组件
│   │   │   ├── remote-help/    # 远程帮扶组件
│   │   │   ├── digital-center/ # 数字化指挥中心组件
│   │   │   └── clue-check/     # 线索核查组件
│   │   ├── IssueCreateView.vue # 问题创建页面
│   │   └── IssueListView.vue   # 问题列表页面
│   ├── App.vue                 # 根组件
│   └── main.js                 # 入口文件
├── package.json                # 项目配置
├── vite.config.js             # Vite配置
├── README.md                  # 项目说明
└── 前端交接文档.md            # 详细交接文档
```

## 🚀 快速开始

### 环境要求
- Node.js >= 16.0.0
- npm >= 8.0.0

### 安装依赖
```bash
npm install
```

### 开发环境运行
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
```

### 代码检查
```bash
npm run lint
```

### 代码格式化
```bash
npm run format
```

## 🎨 样式规范

### 主题色彩
- **主色**: #217346 (绿色)
- **辅色**: #e3f2fd (浅蓝色)
- **背景色**: linear-gradient(135deg, #e8f5e9 0%, #e3f2fd 100%)

### 组件样式
- **卡片圆角**: 12px
- **按钮圆角**: 6px
- **阴影**: 0 4px 24px 0 rgba(33, 115, 70, 0.08)

### 响应式设计
- **桌面端**: >= 1024px
- **平板端**: 768px - 1023px
- **移动端**: < 768px

## 📱 表单类型说明

### 1. 督查在线
**用途**: 环保督查问题的交办、跟踪和整改管理

**步骤**:
1. **交办信息**: 问题描述、属地、联系人、整改时限
2. **问题交办**: 整改措施、状态、时间、情况描述
3. **整改情况**: 完成情况、效果评估、后续计划

### 2. 远程帮扶
**用途**: 远程技术帮扶和指导

**特色**: 支持Excel批量导入14个字段

**步骤**:
1. **交办信息**: 任务信息、企业信息、线索描述
2. **帮扶过程**: 帮扶措施、指导内容、过程记录
3. **效果评估**: 帮扶效果、问题解决情况、建议

### 3. 数字化指挥中心
**用途**: 环保应急事件的指挥调度和处置管理

**步骤**:
1. **事件信息**: 事件类型、等级、描述、报告时间
2. **指挥调度**: 指挥决策、资源调配、处置措施
3. **处置结果**: 处置过程、最终结果、经验总结

### 4. 线索核查
**用途**: 环保违法线索的调查核实和处理

**步骤**:
1. **线索信息**: 线索来源、类型、内容、基本情况
2. **核查过程**: 调查方法、核实过程、发现问题
3. **核查结果**: 核查结论、处理意见、后续措施

## 👥 用户角色和权限

### 角色定义
1. **管理员**: 拥有所有权限
2. **一中队人员**: 创建问题、填写第一步交办信息、查看所有问题列表
3. **属地所人员**: 查看分配给自己属地的问题、填写第二步问题交办、处理整改情况

### 权限矩阵

| 功能 | 管理员 | 一中队人员 | 属地所人员 |
|------|--------|------------|------------|
| 查看问题列表 | ✅ | ✅（全部） | ✅（本属地） |
| 创建问题 | ✅ | ✅ | ❌ |
| 填写第一步（交办信息） | ✅ | ✅ | ❌ |
| 填写第二步（问题交办） | ✅ | ❌ | ✅ |
| 处理第三步（整改情况） | ✅ | ❌ | ✅ |
| 删除问题 | ✅ | ❌ | ❌ |
| 生成报告 | ✅ | ✅ | ✅ |

### 业务流程
1. **一中队人员** 创建问题并填写第一步"交办信息"
2. **属地所人员** 接收任务，填写第二步"问题交办"  
3. **属地所人员** 完成处理后，更新第三步"整改情况"

## 🔧 配置说明

### 环境变量
```bash
# 开发环境
NODE_ENV=development
VITE_API_BASE_URL=http://localhost:5000/api

# 生产环境
NODE_ENV=production
VITE_API_BASE_URL=https://your-domain.com/api
```

### Vite配置 (vite.config.js)
```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
})
```

## 🚀 部署指南

### 开发环境部署
1. 安装依赖: `npm install`
2. 启动开发服务器: `npm run dev`
3. 访问: `http://localhost:3000`

### 生产环境部署
1. 构建项目: `npm run build`
2. 将 `dist` 目录部署到Web服务器
3. 配置Nginx反向代理（推荐）

### Nginx配置示例
```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        root /path/to/dist;
        try_files $uri $uri/ /index.html;
    }
    
    location /api {
        proxy_pass http://localhost:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## 🎨 样式规范

### 主题色彩
- **主色**: #217346 (绿色)
- **辅色**: #e3f2fd (浅蓝色)
- **背景色**: linear-gradient(135deg, #e8f5e9 0%, #e3f2fd 100%)

### 组件样式
- **卡片圆角**: 12px
- **按钮圆角**: 6px
- **阴影**: 0 4px 24px 0 rgba(33, 115, 70, 0.08)

### 响应式设计
- **桌面端**: >= 1024px
- **平板端**: 768px - 1023px
- **移动端**: < 768px

## 📱 表单类型说明

### 1. 督查在线
**用途**: 环保督查问题的交办、跟踪和整改管理

**步骤**:
1. **交办信息**: 问题描述、属地、联系人、整改时限
2. **问题交办**: 整改措施、状态、时间、情况描述
3. **整改情况**: 完成情况、效果评估、后续计划

### 2. 远程帮扶
**用途**: 远程技术帮扶和指导

**特色**: 支持Excel批量导入14个字段

**步骤**:
1. **交办信息**: 任务信息、企业信息、线索描述
2. **帮扶过程**: 帮扶措施、指导内容、过程记录
3. **效果评估**: 帮扶效果、问题解决情况、建议

### 3. 数字化指挥中心
**用途**: 环保应急事件的指挥调度和处置管理

**步骤**:
1. **事件信息**: 事件类型、等级、描述、报告时间
2. **指挥调度**: 指挥决策、资源调配、处置措施
3. **处置结果**: 处置过程、最终结果、经验总结

### 4. 线索核查
**用途**: 环保违法线索的调查核实和处理

**步骤**:
1. **线索信息**: 线索来源、类型、内容、基本情况
2. **核查过程**: 调查方法、核实过程、发现问题
3. **核查结果**: 核查结论、处理意见、后续措施

## 🔧 配置说明

### 环境变量
```bash
# 开发环境
NODE_ENV=development
VITE_API_BASE_URL=http://localhost:5000/api

# 生产环境
NODE_ENV=production
VITE_API_BASE_URL=https://your-domain.com/api
```

### Vite配置 (vite.config.js)
```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
})
```

## 🚀 部署指南

### 开发环境部署
1. 安装依赖: `npm install`
2. 启动开发服务器: `npm run dev`
3. 访问: `http://localhost:3000`

### 生产环境部署
1. 构建项目: `npm run build`
2. 将 `dist` 目录部署到Web服务器
3. 配置Nginx反向代理（推荐）

### Nginx配置示例
```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        root /path/to/dist;
        try_files $uri $uri/ /index.html;
    }
    
    location /api {
        proxy_pass http://localhost:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## 🔌 API接口说明

本项目前端已经完成，目前使用模拟数据进行开发和演示。所有API调用都封装在 `src/utils/api.js` 文件中，包含完整的接口规范和数据格式说明。

### 主要接口类型
- **用户认证**: 登录、获取用户信息
- **问题管理**: 创建、查看、更新、提交问题
- **文件上传**: 支持图片和文档上传
- **Excel导入**: 批量数据导入功能
- **报告生成**: PDF报告生成

详细的API接口规范请参考 `前端交接文档.md`。

## 🐛 常见问题

### 1. 开发环境启动失败
**问题**: `npm run dev` 启动失败
**解决**: 检查Node.js版本是否 >= 16.0.0，删除 `node_modules` 重新安装依赖

### 2. 样式显示异常
**问题**: Element Plus组件样式不生效
**解决**: 检查是否正确导入Element Plus样式文件

### 3. 路由跳转异常
**问题**: 页面跳转后显示404
**解决**: 检查路由配置，确保组件路径正确

## 📞 技术支持

### 代码规范
- 遵循ESLint配置
- 使用Prettier格式化代码
- 组件和方法必须添加注释
- 变量命名使用驼峰命名法

### 项目特点
- **完整注释**: 所有代码都有详细的中文注释
- **模块化设计**: 组件结构清晰，易于维护
- **响应式布局**: 支持多种设备访问
- **现代化技术**: 使用最新的Vue 3生态系统

## 📋 开发进度

### ✅ 已完成功能
- [x] 项目初始化和配置
- [x] 路由系统设计
- [x] 主要页面开发
- [x] 四种表单类型实现
- [x] 用户权限控制
- [x] 响应式设计
- [x] 代码注释完善
- [x] 文档编写

### 🔄 等待后端对接
- [ ] 用户认证系统
- [ ] 数据持久化
- [ ] 文件上传服务
- [ ] PDF报告生成
- [ ] Excel导入功能

## 📄 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

---

**注意**: 本项目为前端部分，已完成所有页面和功能开发。目前使用模拟数据，等待后端API对接。详细的后端接口需求请参考 `前端交接文档.md`。

