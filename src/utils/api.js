// API工具文件 - 提供模拟接口
export class MockAPI {
  // 模拟延迟
  static delay(ms = 1000) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  // 生成随机ID
  static generateId() {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9)
  }

  // 创建问题
  static async createIssue(data) {
    await this.delay()

    return {
      success: true,
      data: {
        id: this.generateId(),
        name: data.name,
        formType: data.formType,
        status: '待处理',
        createTime: new Date().toISOString(),
        updateTime: new Date().toISOString(),
      },
      message: '问题创建成功',
    }
  }

  // 获取问题详情
  static async getIssue(id) {
    await this.delay(500)

    return {
      success: true,
      data: {
        id,
        name: '测试问题',
        formType: '督查在线',
        status: '待处理',
        createTime: new Date().toISOString(),
        updateTime: new Date().toISOString(),
      },
      message: '获取成功',
    }
  }

  // 保存表单数据
  static async saveFormData(id, stepData) {
    await this.delay(800)

    return {
      success: true,
      data: {
        id,
        ...stepData,
        updateTime: new Date().toISOString(),
      },
      message: '保存成功',
    }
  }

  // 获取问题列表
  static async getIssueList(params = {}) {
    await this.delay(600)

    const mockData = [
      {
        id: '1',
        name: '某企业废气排放超标问题',
        formType: '督查在线',
        location: '开发区',
        contact: '张三',
        deadline: '2025-01-25',
        status: '处理中',
        createTime: '2024-01-15 10:30:00',
        updateTime: '2024-01-16 14:20:00',
      },
      {
        id: '2',
        name: '工业园区水污染治理',
        formType: '远程帮扶',
        location: '工业园区',
        contact: '李四',
        deadline: '-',
        status: '已完成',
        createTime: '2024-01-14 09:15:00',
        updateTime: '2024-01-15 16:45:00',
      },
      {
        id: '3',
        name: '环境监测数据异常',
        formType: '数字化指挥中心',
        location: '城东区',
        contact: '王五',
        deadline: '-',
        status: '待处理',
        createTime: '2024-01-16 11:20:00',
        updateTime: '2024-01-16 11:20:00',
      },
      {
        id: '4',
        name: '观海卫镇工业区疑似违规排污线索',
        formType: '线索核查',
        location: '观海卫镇',
        contact: '王海峰',
        deadline: '-',
        status: '已提交',
        createTime: '2024-01-17 09:30:00',
        updateTime: '2024-01-17 09:30:00',
      },
      {
        id: '5',
        name: '某某河流污染问题',
        formType: '督查在线',
        location: '某某河流',
        contact: '赵六',
        deadline: '2025-01-30',
        status: '草稿',
        createTime: '2024-01-18 14:20:00',
        updateTime: '2024-01-18 14:20:00',
      },
    ]

    return {
      success: true,
      data: {
        list: mockData,
        total: mockData.length,
        page: params.page || 1,
        pageSize: params.pageSize || 10,
      },
      message: '获取成功',
    }
  }

  // 上传文件
  static async uploadFile(file) {
    await this.delay(1500)

    return {
      success: true,
      data: {
        url: URL.createObjectURL(file),
        name: file.name,
        size: file.size,
        type: file.type,
        uploadTime: new Date().toISOString(),
      },
      message: '上传成功',
    }
  }

  // Excel导入
  static async importExcel(file) {
    await this.delay(2000)

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

  // 生成PDF报告
  static async generateReport(id, data) {
    await this.delay(3000)

    return {
      success: true,
      data: {
        url: '/mock-report.pdf',
        filename: `${data.name || '问题'}_整改报告_${new Date().toISOString().split('T')[0].replace(/-/g, '')}.pdf`,
        generateTime: new Date().toISOString(),
      },
      message: 'PDF报告生成成功',
    }
  }
}

// 默认导出
export default MockAPI
