<template>
  <div class="report-generator">
    <el-button type="success" @click="generateReport" :loading="generating">
      <el-icon><Document /></el-icon>
      导出报告
    </el-button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Document } from '@element-plus/icons-vue'

const props = defineProps({
  issueData: {
    type: Object,
    required: true,
  },
  formType: {
    type: String,
    required: true,
  },
})

const generating = ref(false)

// 生成报告
const generateReport = async () => {
  generating.value = true

  try {
    const reportData = prepareReportData()

    // 调用后端生成PDF
    const response = await fetch('http://localhost:5000/api/generate-report', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reportData),
    })

    if (response.ok) {
      // 下载PDF文件
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${props.issueData.name || '问题'}_整改报告_${formatDate(new Date())}.pdf`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)

      ElMessage.success('报告导出成功!')
    } else {
      throw new Error('报告生成失败')
    }
  } catch (error) {
    console.error('报告生成错误:', error)
    ElMessage.error('报告导出失败，请重试!')
  } finally {
    generating.value = false
  }
}

// 准备报告数据
const prepareReportData = () => {
  const baseData = {
    title: `${props.issueData.name || '问题'} 整改报告`,
    formType: props.formType,
    issueData: props.issueData,
    generateTime: new Date().toLocaleString(),
  }

  // 根据表单类型组织数据
  switch (props.formType) {
    case '督查在线':
      return {
        ...baseData,
        sections: [
          {
            title: '交办信息',
            fields: [
              { label: '问题标题', value: props.issueData.title },
              { label: '问题内容', value: props.issueData.content },
              { label: '属地', value: props.issueData.area },
              { label: '联系人', value: props.issueData.contact },
            ],
          },
          {
            title: '问题交办',
            fields: [
              { label: '整改时限', value: formatDate(props.issueData.deadline) },
              { label: '整改措施', value: props.issueData.measures },
              { label: '整改状态', value: props.issueData.status },
              { label: '整改时间', value: formatDate(props.issueData.rectifyTime) },
              { label: '整改情况', value: props.issueData.rectifyDesc },
              { label: '下步计划', value: props.issueData.nextPlan },
            ],
          },
          {
            title: '整改情况记录',
            records: props.issueData.rectifyRecords || [],
          },
        ],
      }

    case '远程帮扶':
      return {
        ...baseData,
        sections: [
          {
            title: '交办信息',
            fields: [
              { label: '任务编号', value: props.issueData.taskNumber },
              { label: '线索详细描述', value: props.issueData.clueDesc },
              { label: '污染源名称', value: props.issueData.pollutionSource },
              { label: '污染源地址', value: props.issueData.pollutionAddress },
              { label: '统一社会信用代码', value: props.issueData.creditCode },
              { label: '轮次', value: props.issueData.round },
              { label: '乡镇（街道）', value: props.issueData.township },
              { label: '经纬信息', value: props.issueData.coordinates },
              { label: '企业基本信息及线索核实', value: props.issueData.enterpriseInfo },
              { label: '是否存在问题', value: props.issueData.hasProblem },
              { label: '是否督办', value: props.issueData.isSupervised },
              { label: '是否为典型问题', value: props.issueData.isTypical },
              { label: '线索核实情况', value: props.issueData.clueVerification },
              { label: '现场情况', value: props.issueData.fieldSituation },
              { label: '属地', value: props.issueData.area },
              { label: '辖区所', value: props.issueData.jurisdictionOffice },
              { label: '负责人', value: props.issueData.responsible },
            ],
          },
          {
            title: '问题交办',
            fields: [
              { label: '问题内容', value: props.issueData.problemContent },
              { label: '整改情况', value: props.issueData.rectifyDesc },
              { label: '处理情况', value: props.issueData.handlingSituation },
            ],
            photos: {
              before: props.issueData.beforePhotos || [],
              after: props.issueData.afterPhotos || [],
            },
          },
        ],
      }

    case '数字化指挥中心':
      return {
        ...baseData,
        sections: [
          {
            title: '交办信息',
            fields: [
              { label: '交办日期', value: formatDate(props.issueData.assignDate) },
              { label: '属地', value: props.issueData.area },
              { label: '辖区所', value: props.issueData.jurisdictionOffice },
              { label: '负责人', value: props.issueData.responsible },
              { label: '问题类型', value: props.issueData.problemType },
              { label: '线索描述', value: props.issueData.clueDesc },
            ],
          },
          {
            title: '问题交办',
            fields: [
              { label: '核查反馈', value: props.issueData.checkFeedback },
              { label: '调查核实情况', value: props.issueData.investigationSituation },
              { label: '处理情况', value: props.issueData.handlingSituation },
            ],
          },
        ],
      }

    case '线索核查':
      return {
        ...baseData,
        sections: [
          {
            title: '交办信息',
            fields: [
              { label: '交办日期', value: formatDate(props.issueData.assignDate) },
              { label: '属地', value: props.issueData.area },
              { label: '辖区所', value: props.issueData.jurisdictionOffice },
              { label: '负责人', value: props.issueData.responsible },
              { label: '问题类型', value: props.issueData.problemType },
              { label: '线索描述', value: props.issueData.clueDesc },
            ],
          },
          {
            title: '问题交办',
            fields: [
              { label: '调查核实情况', value: props.issueData.investigationSituation },
              { label: '处理情况', value: props.issueData.handlingSituation },
              { label: '督促整改情况', value: props.issueData.superviseRectification },
            ],
            attachments: {
              images: props.issueData.images || [],
              files: props.issueData.files || [],
            },
          },
        ],
      }

    default:
      return baseData
  }
}

// 格式化日期
const formatDate = (date) => {
  if (!date) return ''
  if (typeof date === 'string') return date
  return new Date(date).toLocaleDateString()
}
</script>

<style scoped>
.report-generator {
  display: inline-block;
}
</style>
