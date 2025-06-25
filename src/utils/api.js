/**
 * API工具文件 - 提供模拟接口和实际API调用封装
 *
 * 功能说明：
 * 1. HttpClient类：封装fetch API，提供统一的HTTP请求方法
 * 2. MockAPI类：提供模拟数据服务，用于前端开发和测试
 * 3. RealAPI类：真实API接口调用（需要后端支持）
 *
 * 使用说明：
 * - 开发阶段使用MockAPI进行前端开发
 * - 后端接口就绪后，切换到RealAPI
 * - 生产环境请确保使用RealAPI并配置正确的API_BASE_URL
 *
 * API接口规范说明：
 * 1. 所有接口返回格式统一为：{ success: boolean, data: any, message: string }
 * 2. HTTP状态码：200表示请求成功，400表示参数错误，500表示服务器错误
 * 3. 认证方式：建议使用JWT Token，在请求头中携带 Authorization: Bearer <token>
 * 4. 分页参数：page（页码，从1开始），pageSize（每页条数，默认10）
 * 5. 文件上传：使用FormData格式，支持多文件上传
 *
 * 作者：CorazoN
 * 创建时间：2025年6月
 * 版本：v2.0
 */

// API基础配置
const API_CONFIG = {
  // 后端API基础URL - 部署时需要修改为实际地址
  BASE_URL: import.meta.env.PROD
    ? 'https://your-domain.com/api'  // 生产环境API地址
    : 'http://localhost:5000/api',   // 开发环境API地址

  // 请求超时时间（毫秒）
  TIMEOUT: 10000,

  // 支持的文件类型
  SUPPORTED_FILE_TYPES: {
    IMAGE: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
    DOCUMENT: ['pdf', 'doc', 'docx', 'xls', 'xlsx'],
    ALL: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'pdf', 'doc', 'docx', 'xls', 'xlsx']
  },

  // 文件大小限制（字节）
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
}

/**
 * HTTP请求封装类
 * 提供统一的请求处理、错误处理、认证等功能
 */
class HttpClient {
  constructor(baseURL = API_CONFIG.BASE_URL) {
    this.baseURL = baseURL
    this.timeout = API_CONFIG.TIMEOUT
  }

  /**
   * 获取请求头
   * @returns {Object} 请求头对象
   */
  getHeaders() {
    const headers = {
      'Content-Type': 'application/json',
    }

    // 从localStorage获取JWT token
    const token = localStorage.getItem('auth_token')
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    return headers
  }

  /**
   * 统一请求方法
   * @param {string} url - 请求URL
   * @param {Object} options - 请求选项
   * @returns {Promise} 请求结果
   */
  async request(url, options = {}) {
    const fullUrl = url.startsWith('http') ? url : `${this.baseURL}${url}`

    const config = {
      timeout: this.timeout,
      headers: this.getHeaders(),
      ...options
    }

    try {
      // 这里使用fetch API，后续可以替换为axios等库
      const response = await fetch(fullUrl, config)

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const result = await response.json()
      return result
    } catch (error) {
      console.error('API请求失败:', error)
      throw error
    }
  }

  /**
   * GET请求
   * @param {string} url - 请求URL
   * @param {Object} params - 查询参数
   * @returns {Promise} 请求结果
   */
  async get(url, params = {}) {
    const queryString = new URLSearchParams(params).toString()
    const fullUrl = queryString ? `${url}?${queryString}` : url

    return this.request(fullUrl, {
      method: 'GET'
    })
  }

  /**
   * POST请求
   * @param {string} url - 请求URL
   * @param {Object} data - 请求数据
   * @returns {Promise} 请求结果
   */
  async post(url, data = {}) {
    return this.request(url, {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  /**
   * PUT请求
   * @param {string} url - 请求URL
   * @param {Object} data - 请求数据
   * @returns {Promise} 请求结果
   */
  async put(url, data = {}) {
    return this.request(url, {
      method: 'PUT',
      body: JSON.stringify(data)
    })
  }

  /**
   * DELETE请求
   * @param {string} url - 请求URL
   * @returns {Promise} 请求结果
   */
  async delete(url) {
    return this.request(url, {
      method: 'DELETE'
    })
  }

  /**
   * 文件上传
   * @param {string} url - 上传URL
   * @param {FormData} formData - 文件数据
   * @returns {Promise} 上传结果
   */
  async upload(url, formData) {
    const headers = {}

    // 获取认证token
    const token = localStorage.getItem('auth_token')
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    // 注意：上传文件时不要设置Content-Type，让浏览器自动设置
    return this.request(url, {
      method: 'POST',
      headers,
      body: formData
    })
  }
}

// 创建HTTP客户端实例
const httpClient = new HttpClient()

/**
 * 模拟API类
 * 提供开发阶段的模拟数据，后期需要替换为真实API调用
 */
export class MockAPI {
  // 模拟数据存储（使用Map存储）
  static storage = new Map()

  /**
   * 模拟网络延迟
   * @param {number} ms - 延迟毫秒数
   * @returns {Promise} 延迟Promise
   */
  static delay(ms = 1000) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  /**
   * 生成随机ID
   * @returns {string} 随机ID
   */
  static generateId() {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9)
  }

  /**
   * 创建问题
   *
   * 后端接口规范：
   * POST /api/issues
   * 请求体：{ name: string, formType: string }
   * 响应：{ success: boolean, data: { id: string, ...其他字段 }, message: string }
   *
   * @param {Object} data - 问题数据
   * @param {string} data.name - 问题名称
   * @param {string} data.formType - 表单类型（督查在线|远程帮扶|数字化指挥中心|线索核查）
   * @returns {Promise} 创建结果
   */
  static async createIssue(data) {
    await this.delay()

    // 模拟数据验证
    if (!data.name || !data.formType) {
      return {
        success: false,
        data: null,
        message: '问题名称和表单类型不能为空'
      }
    }

    const newIssue = {
      id: this.generateId(),
      name: data.name,
      formType: data.formType,
      status: '草稿',
      createTime: new Date().toISOString(),
      updateTime: new Date().toISOString(),
      formData: {}
    }

    // 保存到存储中
    this.storage.set(newIssue.id, newIssue)

    return {
      success: true,
      data: newIssue,
      message: '问题创建成功',
    }
  }

  /**
   * 获取问题详情
   *
   * 后端接口规范：
   * GET /api/issues/{id}
   * 响应：{ success: boolean, data: { id: string, name: string, formType: string, ... }, message: string }
   *
   * @param {string} id - 问题ID
   * @returns {Promise} 问题详情
   */
  static async getIssue(id) {
    await this.delay(500)

    if (!id) {
      return {
        success: false,
        data: null,
        message: '问题ID不能为空'
      }
    }

    // 从存储中获取数据，如果没有则返回默认数据
    let issueData = this.storage.get(id)

    if (!issueData) {
      issueData = {
        id,
        name: '测试问题',
        formType: '督查在线',
        status: '草稿',
        createTime: new Date().toISOString(),
        updateTime: new Date().toISOString(),
        formData: {}
      }
      // 保存默认数据到存储
      this.storage.set(id, issueData)
    }

    return {
      success: true,
      data: issueData,
      message: '获取成功',
    }
  }

  /**
   * 获取默认表单数据
   * @param {string} formType - 表单类型
   * @returns {Object} 默认表单数据
   */
  static getDefaultFormData(formType) {
    const defaultData = {
      '督查在线': {
        title: '',
        content: '',
        area: '',
        contact: '',
        deadline: null,
        measures: '',
        status: '',
        rectifyTime: null,
        rectifyDesc: '',
        nextPlan: '',
        attachments: []
      },
      '远程帮扶': {
        taskNumber: '',
        clueDesc: '',
        pollutionSource: '',
        pollutionAddress: '',
        creditCode: '',
        round: '',
        township: '',
        coordinates: '',
        enterpriseInfo: '',
        hasProblem: '',
        isSupervised: ''
      },
      '数字化指挥中心': {
        incidentType: '',
        incidentLevel: '',
        incidentDesc: '',
        reportTime: null,
        reportPerson: '',
        handlePerson: '',
        handleResult: ''
      },
      '线索核查': {
        clueSource: '',
        clueType: '',
        clueContent: '',
        verifyResult: '',
        verifyPerson: '',
        verifyTime: null
      }
    }

    return defaultData[formType] || {}
  }

  /**
   * 保存表单数据
   *
   * 后端接口规范：
   * PUT /api/issues/{id}
   * 请求体：{ step: number, stepData: object, status?: string }
   * 响应：{ success: boolean, data: object, message: string }
   *
   * @param {string} id - 问题ID
   * @param {Object} stepData - 步骤数据
   * @param {number} step - 当前步骤（1,2,3）
   * @param {string} status - 问题状态（可选）
   * @returns {Promise} 保存结果
   */
  static async saveFormData(id, stepData, step = 1, status = null) {
    await this.delay(800)

    if (!id) {
      return {
        success: false,
        data: null,
        message: '问题ID不能为空'
      }
    }

    // 获取现有数据或创建新数据
    let issueData = this.storage.get(id) || {
      id,
      name: '测试问题',
      formType: '督查在线',
      status: '草稿',
      createTime: new Date().toISOString(),
      updateTime: new Date().toISOString(),
      formData: {}
    }

    // 更新表单数据
    if (!issueData.formData) {
      issueData.formData = {}
    }

    // 合并步骤数据
    Object.assign(issueData.formData, stepData)

    // 更新状态和时间
    if (status) {
      issueData.status = status
    }
    issueData.updateTime = new Date().toISOString()

    // 保存到存储
    this.storage.set(id, issueData)

    return {
      success: true,
      data: {
        id,
        step,
        ...stepData,
        status: issueData.status,
        updateTime: issueData.updateTime,
      },
      message: '保存成功',
    }
  }

  /**
   * 保存整改记录历史
   *
   * 后端接口规范：
   * PUT /api/issues/{id}/rectification-history
   * 请求体：{ history: array }
   * 响应：{ success: boolean, message: string }
   *
   * @param {string} id - 问题ID
   * @param {Array} history - 整改记录历史
   * @returns {Promise} 保存结果
   */
  static async saveRectificationHistory(id, history) {
    await this.delay(500)

    if (!id) {
      return {
        success: false,
        message: '问题ID不能为空'
      }
    }

    // 获取现有数据
    let issueData = this.storage.get(id)
    if (!issueData) {
      return {
        success: false,
        message: '问题不存在'
      }
    }

    // 保存整改记录历史
    issueData.rectificationHistory = history
    issueData.updateTime = new Date().toISOString()

    // 保存到存储
    this.storage.set(id, issueData)

    return {
      success: true,
      message: '整改记录保存成功'
    }
  }

  /**
   * 获取问题列表
   *
   * 后端接口规范：
   * GET /api/issues?page=1&pageSize=10&formType=&status=&keyword=
   * 响应：{ success: boolean, data: { list: array, total: number, page: number, pageSize: number }, message: string }
   *
   * @param {Object} params - 查询参数
   * @param {number} params.page - 页码
   * @param {number} params.pageSize - 每页条数
   * @param {string} params.formType - 表单类型筛选
   * @param {string} params.status - 状态筛选
   * @param {string} params.keyword - 关键词搜索
   * @returns {Promise} 问题列表
   */
  static async getIssueList(params = {}) {
    await this.delay(600)

    // 从存储中获取真实创建的问题数据
    const storageData = []
    for (const [, issueData] of this.storage.entries()) {
      // 转换为列表显示格式
      const listItem = this.convertToListItem(issueData)
      if (listItem) {
        storageData.push(listItem)
      }
    }

    // 默认模拟数据（如果没有真实数据）
    const mockData = [
      {
        id: 'mock-1',
        name: '某企业废气排放超标问题',
        formType: '督查在线',
        area: '开发区', // 属地信息
        contact: '张三',
        phone: '13800138001',
        deadline: '2025-01-25',
        status: '待处理',
        currentStep: 2,
        createTime: '2024-01-15 10:30:00',
        updateTime: '2024-01-16 14:20:00',
        creator: '环保局张三',
        handler: '属地所李四'
      },
      {
        id: 'mock-2',
        name: '工业园区水污染治理',
        formType: '远程帮扶',
        area: '工业园区',
        contact: '李四',
        phone: '13800138002',
        deadline: '-',
        status: '已完成',
        currentStep: 3,
        createTime: '2024-01-14 09:15:00',
        updateTime: '2024-01-15 16:45:00',
        creator: '环保局王五',
        handler: '属地所赵六'
      },
      {
        id: 'mock-3',
        name: '化工厂噪音污染投诉',
        formType: '线索核查',
        area: '高新区',
        contact: '赵七',
        phone: '13800138003',
        deadline: '2025-01-30',
        status: '处理中',
        currentStep: 2,
        createTime: '2024-01-16 14:20:00',
        updateTime: '2024-01-17 09:30:00',
        creator: '环保局钱八',
        handler: '属地所孙九'
      }
    ]

    // 合并真实数据和模拟数据，真实数据在前
    const allData = [...storageData, ...mockData]

    // 模拟筛选逻辑
    let filteredData = allData

    // 按表单类型筛选
    if (params.formType) {
      filteredData = filteredData.filter(item => item.formType === params.formType)
    }

    // 按状态筛选
    if (params.status) {
      filteredData = filteredData.filter(item => item.status === params.status)
    }

    // 按属地筛选（属地所人员只能看到自己属地的任务）
    if (params.area) {
      filteredData = filteredData.filter(item => item.area === params.area)
    }

    // 按关键词筛选
    if (params.keyword) {
      filteredData = filteredData.filter(item =>
        item.name.includes(params.keyword) ||
        (item.area && item.area.includes(params.keyword)) ||
        item.contact.includes(params.keyword)
      )
    }

    // 按创建时间排序，最新的在前
    filteredData.sort((a, b) => new Date(b.createTime) - new Date(a.createTime))

    // 模拟分页
    const page = params.page || 1
    const pageSize = params.pageSize || 10
    const start = (page - 1) * pageSize
    const end = start + pageSize
    const list = filteredData.slice(start, end)

    return {
      success: true,
      data: {
        list,
        total: filteredData.length,
        page,
        pageSize,
      },
      message: '获取成功',
    }
  }

  /**
   * 将存储的问题数据转换为列表显示格式
   * @param {Object} issueData - 存储的问题数据
   * @returns {Object|null} 列表项数据
   */
  static convertToListItem(issueData) {
    if (!issueData) return null

    // 从表单数据中提取显示信息
    const formData = issueData.formData || {}

    // 根据表单类型提取不同的字段
    let location = ''
    let contact = ''
    let phone = ''
    let deadline = '-'

    if (issueData.formType === '督查在线') {
      // 督查在线：从step1获取基本信息，从step2获取时限
      location = formData.step1?.location || ''
      contact = formData.step1?.contact || ''
      deadline = formData.step2?.deadline ? new Date(formData.step2.deadline).toLocaleDateString() : '-'
    } else if (issueData.formType === '远程帮扶') {
      // 远程帮扶：从step1获取信息
      location = formData.step1?.township || formData.step1?.pollutionAddress || ''
      contact = formData.step1?.enterpriseInfo || ''
    } else if (issueData.formType === '数字化指挥中心') {
      // 数字化指挥中心：从step1获取信息
      location = formData.step1?.involvedArea || ''
      contact = formData.step1?.reportPerson || ''
    } else if (issueData.formType === '线索核查') {
      // 线索核查：从step1获取信息
      location = formData.step1?.specificAddress || ''
      contact = formData.step1?.involvedCompany || ''
    }

    // 确定状态
    let status = issueData.status || '草稿'
    if (formData.step3?.currentStatus === '整改完成') {
      status = '已完成'
    } else if (formData.step3?.currentStatus === '整改中') {
      status = '处理中'
    } else if (formData.step2) {
      status = '已提交'
    }

    return {
      id: issueData.id,
      name: issueData.name || '未命名问题',
      formType: issueData.formType,
      area: location || '-', // 使用area字段
      contact: contact || '-',
      phone: phone || '-',
      deadline: deadline,
      status: status,
      currentStep: issueData.currentStep || 1,
      createTime: new Date(issueData.createTime).toLocaleString('zh-CN'),
      updateTime: new Date(issueData.updateTime).toLocaleString('zh-CN'),
      creator: issueData.creator || '环保局人员',
      handler: contact || '-'
    }
  }

  /**
   * 上传文件
   *
   * 后端接口规范：
   * POST /api/upload
   * 请求体：FormData with file field
   * 响应：{ success: boolean, data: { url: string, name: string, size: number, type: string }, message: string }
   *
   * @param {File} file - 文件对象
   * @returns {Promise} 上传结果
   */
  static async uploadFile(file) {
    await this.delay(1500)

    // 文件类型验证
    const fileExt = file.name.split('.').pop().toLowerCase()
    if (!API_CONFIG.SUPPORTED_FILE_TYPES.ALL.includes(fileExt)) {
      return {
        success: false,
        data: null,
        message: `不支持的文件类型：${fileExt}`
      }
    }

    // 文件大小验证
    if (file.size > API_CONFIG.MAX_FILE_SIZE) {
      return {
        success: false,
        data: null,
        message: '文件大小不能超过10MB'
      }
    }

    return {
      success: true,
      data: {
        url: URL.createObjectURL(file), // 模拟文件URL，实际应返回服务器文件路径
        name: file.name,
        size: file.size,
        type: file.type,
        uploadTime: new Date().toISOString(),
      },
      message: '上传成功',
    }
  }

  /**
   * Excel导入
   *
   * 后端接口规范：
   * POST /api/import/excel
   * 请求体：FormData with excel file
   * 响应：{ success: boolean, data: { successCount: number, failCount: number, errors: array }, message: string }
   *
   * @param {File} file - Excel文件
   * @returns {Promise} 导入结果
   */
  static async importExcel(file) {
    await this.delay(2000)

    // 文件类型验证
    const fileExt = file.name.split('.').pop().toLowerCase()
    if (!['xls', 'xlsx'].includes(fileExt)) {
      return {
        success: false,
        data: null,
        message: '请上传Excel文件（.xls或.xlsx格式）'
      }
    }

    return {
      success: true,
      data: {
        successCount: 15,
        failCount: 2,
        totalCount: 17,
        errors: [
          { row: 3, message: '统一社会信用代码格式错误' },
          { row: 8, message: '企业名称不能为空' },
        ],
      },
      message: '导入完成',
    }
  }

  /**
   * 生成PDF报告
   *
   * 后端接口规范：
   * POST /api/reports/generate
   * 请求体：{ issueId: string, formType: string, data: object }
   * 响应：{ success: boolean, data: { url: string, filename: string }, message: string }
   *
   * @param {string} id - 问题ID
   * @param {Object} data - 报告数据
   * @returns {Promise} 生成结果
   */
  static async generateReport(id, data) {
    await this.delay(3000)

    if (!id || !data) {
      return {
        success: false,
        data: null,
        message: '参数不完整'
      }
    }

    return {
      success: true,
      data: {
        url: '/mock-report.pdf', // 实际应返回服务器生成的PDF文件路径
        filename: `${data.name || '问题'}_整改报告_${new Date().toISOString().split('T')[0].replace(/-/g, '')}.pdf`,
        generateTime: new Date().toISOString(),
      },
      message: 'PDF报告生成成功',
    }
  }

  /**
   * 提交问题（最终提交）
   *
   * 后端接口规范：
   * POST /api/issues/{id}/submit
   * 响应：{ success: boolean, data: object, message: string }
   *
   * @param {string} id - 问题ID
   * @returns {Promise} 提交结果
   */
  static async submitIssue(id) {
    await this.delay(1000)

    if (!id) {
      return {
        success: false,
        data: null,
        message: '问题ID不能为空'
      }
    }

    return {
      success: true,
      data: {
        id,
        status: '已提交',
        submitTime: new Date().toISOString()
      },
      message: '问题提交成功'
    }
  }
}

/**
 * 真实API类
 * 用于生产环境的实际API调用
 *
 * 使用说明：
 * 1. 将MockAPI替换为RealAPI
 * 2. 配置正确的API_CONFIG.BASE_URL
 * 3. 实现用户认证逻辑
 * 4. 处理错误响应和异常情况
 */
export class RealAPI {
  /**
   * 创建问题
   */
  static async createIssue(data) {
    return httpClient.post('/issues', data)
  }

  /**
   * 获取问题详情
   */
  static async getIssue(id) {
    return httpClient.get(`/issues/${id}`)
  }

  /**
   * 保存表单数据
   */
  static async saveFormData(id, stepData, step = 1, status = null) {
    return httpClient.put(`/issues/${id}`, {
      step,
      stepData,
      status
    })
  }

  /**
   * 获取问题列表
   */
  static async getIssueList(params = {}) {
    return httpClient.get('/issues', params)
  }

  /**
   * 上传文件
   */
  static async uploadFile(file) {
    const formData = new FormData()
    formData.append('file', file)
    return httpClient.upload('/upload', formData)
  }

  /**
   * Excel导入
   */
  static async importExcel(file) {
    const formData = new FormData()
    formData.append('excel', file)
    return httpClient.upload('/import/excel', formData)
  }

  /**
   * 生成PDF报告
   */
  static async generateReport(id, data) {
    return httpClient.post('/reports/generate', { issueId: id, data })
  }

  /**
   * 提交问题
   */
  static async submitIssue(id) {
    return httpClient.post(`/issues/${id}/submit`)
  }
}

// 根据环境变量决定使用模拟API还是真实API
// 开发阶段使用MockAPI，生产环境使用RealAPI
const API = import.meta.env.DEV ? MockAPI : RealAPI

// 默认导出API实例
export default API

// 导出配置供其他模块使用
export { API_CONFIG, HttpClient }
