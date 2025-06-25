# 环保局问题交办系统 - 后端API接口文档

**作者：** CorazoN  
**创建时间：** 2025年6月  
**版本：** v1.0  

## 📋 项目概述

本系统是环保局问题交办系统的前端项目，包含四个主要业务模块：
- 督查在线（3步流程）
- 远程帮扶（3步流程）
- 数字化指挥中心（3步流程）
- 线索核查（3步流程）

## 🔧 技术栈

- **前端框架：** Vue 3 + Composition API
- **UI组件库：** Element Plus
- **路由：** Vue Router 4
- **状态管理：** Pinia (目前使用简单的counter store)
- **HTTP客户端：** 原生fetch API
- **构建工具：** Vite

## 📡 API接口需求

### 1. 基础接口

#### 1.1 用户认证
```javascript
// 登录接口
POST /api/auth/login
{
  "username": "string",
  "password": "string"
}
// 响应
{
  "success": true,
  "data": {
    "token": "jwt_token",
    "user": {
      "id": "string",
      "name": "string",
      "role": "管理员|一中队人员|负责人|属地所人员"
    }
  }
}

// 登出接口
POST /api/auth/logout
// 响应
{
  "success": true,
  "message": "登出成功"
}
```

#### 1.2 问题列表接口
```javascript
// 获取问题列表
GET /api/issues?page=1&limit=10&formType=督查在线&status=草稿&search=关键词
// 响应
{
  "success": true,
  "data": {
    "list": [
      {
        "id": "string",
        "title": "string", // 问题标题
        "formType": "督查在线|远程帮扶|数字化指挥中心|线索核查",
        "status": "草稿|已提交|处理中|整改中|已完成",
        "area": "龙山所|逍林所|坎墩所|观海卫所|周巷所|浒山所",
        "responsible": "string", // 负责人
        "createdAt": "2025-06-01T10:00:00Z",
        "updatedAt": "2025-06-01T15:30:00Z"
      }
    ],
    "total": 100,
    "page": 1,
    "limit": 10
  }
}
```

### 2. 表单数据接口

#### 2.1 保存表单数据
```javascript
// 保存表单数据（支持草稿和提交）
POST /api/issues/:id/form-data
{
  "step": 1, // 当前步骤
  "status": "draft|submitted|processing|completed", // 状态
  "formData": {
    // 根据不同表单类型和步骤，数据结构不同
    "step1": { /* 第一步数据 */ },
    "step2": { /* 第二步数据 */ },
    "step3": { /* 第三步数据 */ }
  }
}
// 响应
{
  "success": true,
  "data": {
    "id": "string",
    "status": "string"
  }
}
```

#### 2.2 获取表单数据
```javascript
// 获取单个问题详情
GET /api/issues/:id
// 响应
{
  "success": true,
  "data": {
    "id": "string",
    "formType": "string",
    "status": "string",
    "formData": {
      "step1": { /* 第一步数据 */ },
      "step2": { /* 第二步数据 */ },
      "step3": { /* 第三步数据 */ }
    },
    "processRecords": [ // 处理记录（用于督查在线和远程帮扶）
      {
        "id": "string",
        "status": "string",
        "createdAt": "2025-06-01T10:00:00Z",
        "data": { /* 记录数据 */ }
      }
    ],
    "createdAt": "2025-06-01T10:00:00Z",
    "updatedAt": "2025-06-01T15:30:00Z"
  }
}
```

### 3. 各表单类型具体字段

#### 3.1 督查在线
```javascript
// 第一步：问题信息
{
  "step1": {
    "title": "string", // 问题标题
    "content": "string", // 问题内容
    "area": "龙山所|逍林所|坎墩所|观海卫所|周巷所|浒山所", // 属地
    "contact": "string" // 联系人
  }
}

// 第二步：整改措施
{
  "step2": {
    "deadline": "2025-06-30T23:59:59Z", // 整改时限
    "measures": "string", // 整改措施
    "status": "整改中|整改完成", // 整改状态
    "completionTime": "2025-06-25T10:00:00Z", // 整改时间
    "situation": "string", // 整改情况
    "nextPlan": "string", // 下步计划
    "attachments": ["file1.pdf", "file2.jpg"] // 附件列表
  }
}

// 第三步：状态显示（无需保存额外数据）
{
  "step3": {
    "currentStatus": "整改中|整改完成"
  }
}
```

#### 3.2 远程帮扶
```javascript
// 第一步：交办信息
{
  "step1": {
    "title": "string", // 问题标题
    "content": "string", // 问题内容
    "area": "龙山所|逍林所|坎墩所|观海卫所|周巷所|浒山所", // 属地
    "contact": "string" // 联系人
  }
}

// 第二步：帮扶过程
{
  "step2": {
    "problemContent": "string", // 问题内容
    "improvementSituation": "string", // 整改情况
    "beforePhotos": ["photo1.jpg"], // 整改前照片
    "afterPhotos": ["photo2.jpg"] // 整改后照片
  }
}

// 第三步：整改情况（固定显示整改完成）
{
  "step3": {
    "status": "整改完成"
  }
}
```

#### 3.3 数字化指挥中心
```javascript
// 第一步：交办信息（一中队人员填写）
{
  "step1": {
    "assignmentField": "string", // 交办字段
    "area": "龙山所|逍林所|周巷所|坎墩所|观海卫所|浒山所", // 属地
    "responsible": "string", // 负责人
    "problemType": "string", // 问题类型（输入框）
    "clueDescription": "string" // 线索描述
  }
}

// 第二步：问题交办（属地所人员填写）
{
  "step2": {
    "investigationFeedback": "string", // 核查反馈
    "investigationSituation": "string", // 调查核实情况
    "handlingSituation": "string" // 处理情况
  }
}

// 第三步：整改情况（属地所人员查看，固定显示整改完成）
{
  "step3": {
    "status": "整改完成"
  }
}
```

#### 3.4 线索核查
```javascript
// 第一步：交办信息（一中队人员填写）
{
  "step1": {
    "assignDate": "2025-06-01", // 交办日期
    "area": "浒山街道|古塘街道|白沙路街道|宗汉街道|坎墩街道|龙山镇|掌起镇|观海卫镇|附海镇|桥头镇|匡堰镇|逍林镇|新浦镇|胜山镇|横河镇|崇寿镇|庵东镇|长河镇|周巷镇", // 属地（慈溪乡镇街道）
    "jurisdictionOffice": "龙山所|逍林所|周巷所|坎墩所|观海卫所|浒山所", // 辖区所
    "responsible": "string", // 负责人
    "problemType": "用电监控|环境信访|在线监控", // 问题类型
    "clueDescription": "string" // 线索描述
  }
}

// 第二步：问题交办（属地所人员填写）
{
  "step2": {
    "investigationResult": "string", // 调查核实情况
    "handlingSituation": "string", // 处理情况
    "supervisionSituation": "string", // 督促整改情况
    "images": ["image1.jpg", "image2.jpg"], // 图片上传
    "files": ["file1.pdf", "file2.docx"] // 文件上传
  }
}

// 第三步：整改情况（固定显示整改完成）
{
  "step3": {
    "status": "整改完成"
  }
}
```

### 4. 文件上传接口

```javascript
// 文件上传
POST /api/upload
Content-Type: multipart/form-data
{
  "file": File, // 文件对象
  "type": "image|document" // 文件类型
}
// 响应
{
  "success": true,
  "data": {
    "url": "string", // 文件访问URL
    "filename": "string", // 文件名
    "size": 1024 // 文件大小（字节）
  }
}
```

### 5. 报告生成接口

```javascript
// 生成PDF报告
POST /api/reports/generate
{
  "issueId": "string",
  "formType": "督查在线|远程帮扶|数字化指挥中心|线索核查"
}
// 响应
{
  "success": true,
  "data": {
    "reportUrl": "string", // 报告下载链接
    "filename": "string"
  }
}
```

## 🔐 权限控制

### 用户角色权限
- **管理员：** 所有权限（创建、编辑、查看、删除）
- **一中队人员：** 创建问题、提交问题、查看所有问题列表、填写第一步交办信息
- **属地所人员：** 查看分配给自己属地的问题、填写第二步问题交办、处理整改情况

### 业务流程说明
1. **一中队人员** 创建问题并填写第一步"交办信息"
2. **属地所人员** 接收任务，填写第二步"问题交办"
3. **属地所人员** 完成处理后，更新第三步"整改情况"

### JWT Token
所有API请求需要在Header中携带JWT Token：
```
Authorization: Bearer <jwt_token>
```

## 📊 状态流转

### 督查在线状态流转
```
草稿 → 已提交 → 整改中 → 整改完成
```

### 其他表单状态流转
```
草稿 → 已提交 → 处理中 → 已完成
```

## 🗄️ 数据库设计建议

### 主要数据表

#### issues 表（问题主表）
```sql
CREATE TABLE issues (
  id VARCHAR(36) PRIMARY KEY,
  form_type ENUM('督查在线', '远程帮扶', '数字化指挥中心', '线索核查'),
  status ENUM('草稿', '已提交', '处理中', '整改中', '已完成'),
  title VARCHAR(200),
  area ENUM('龙山所', '逍林所', '坎墩所', '观海卫所', '周巷所', '浒山所'),
  responsible VARCHAR(100),
  created_by VARCHAR(36),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

#### issue_form_data 表（表单数据）
```sql
CREATE TABLE issue_form_data (
  id VARCHAR(36) PRIMARY KEY,
  issue_id VARCHAR(36),
  step_number INT,
  form_data JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (issue_id) REFERENCES issues(id)
);
```

#### process_records 表（处理记录）
```sql
CREATE TABLE process_records (
  id VARCHAR(36) PRIMARY KEY,
  issue_id VARCHAR(36),
  status VARCHAR(50),
  record_data JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (issue_id) REFERENCES issues(id)
);
```

## 🚀 部署说明

### 前端配置文件需要修改的地方

1. **src/utils/api.js** - 修改API基础URL
```javascript
// 开发环境
const DEV_BASE_URL = 'http://localhost:3000/api'
// 生产环境  
const PROD_BASE_URL = 'https://your-domain.com/api'
```

2. **环境变量配置**
创建 `.env.production` 文件：
```
VITE_API_BASE_URL=https://your-domain.com/api
VITE_APP_TITLE=环保局问题交办系统
```

## 📝 注意事项

1. **CORS配置：** 后端需要配置CORS允许前端域名访问
2. **文件存储：** 建议使用云存储服务（如阿里云OSS）存储上传的文件
3. **数据备份：** 定期备份数据库，特别是问题数据和处理记录
4. **日志记录：** 记录用户操作日志，便于问题追踪
5. **安全性：** 对敏感操作进行权限验证，防止越权访问

## 🔄 现有Mock API映射

当前前端使用MockAPI，实际接口对应关系：
- `MockAPI.saveFormData()` → `POST /api/issues/:id/form-data`
- `MockAPI.getIssue()` → `GET /api/issues/:id`
- `MockAPI.getIssueList()` → `GET /api/issues`

## 📞 联系方式

如有技术问题，请联系前端开发者：CorazoN 