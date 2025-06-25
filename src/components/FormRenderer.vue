<template>
  <div class="form-renderer">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="140px"
      class="issue-form"
    >
      <!-- 督查在线表单 -->
      <template v-if="formType === '督查在线'">
        <div v-if="step === 1">
          <h3 class="form-section-title">交办信息</h3>
          <el-form-item label="问题标题" prop="title" required>
            <el-input
              v-model="formData.title"
              placeholder="请输入问题标题，最多50字"
              maxlength="50"
              show-word-limit
            />
          </el-form-item>
          <el-form-item label="问题内容" prop="content" required>
            <el-input
              v-model="formData.content"
              type="textarea"
              placeholder="请输入问题内容，最多500字"
              maxlength="500"
              show-word-limit
              :rows="4"
            />
          </el-form-item>
          <el-form-item label="属地" prop="area" required>
            <el-select v-model="formData.area" placeholder="请选择属地" style="width: 100%">
              <el-option label="属地所A" value="属地所A" />
              <el-option label="属地所B" value="属地所B" />
              <el-option label="属地所C" value="属地所C" />
              <el-option label="属地所D" value="属地所D" />
              <el-option label="属地所E" value="属地所E" />
              <el-option label="属地所F" value="属地所F" />
            </el-select>
          </el-form-item>
          <el-form-item label="联系人" prop="contact" required>
            <el-input
              v-model="formData.contact"
              placeholder="请输入联系人姓名，最多50字"
              maxlength="50"
            />
          </el-form-item>
        </div>
        <div v-if="step === 2">
          <h3 class="form-section-title">问题交办</h3>
          <el-form-item label="整改时限" prop="deadline" required>
            <el-date-picker
              v-model="formData.deadline"
              type="date"
              placeholder="选择整改截止时间"
              style="width: 100%"
            />
          </el-form-item>
          <el-form-item label="整改措施" prop="measures" required>
            <el-input
              v-model="formData.measures"
              type="textarea"
              placeholder="请输入整改措施，最多1000字"
              maxlength="1000"
              show-word-limit
              :rows="4"
            />
          </el-form-item>
          <el-form-item label="整改状态" prop="status" required>
            <el-radio-group v-model="formData.status">
              <el-radio label="整改中">整改中</el-radio>
              <el-radio label="整改完成">整改完成</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="整改时间" prop="rectifyTime" required>
            <el-date-picker
              v-model="formData.rectifyTime"
              type="date"
              placeholder="选择整改时间"
              style="width: 100%"
            />
          </el-form-item>
          <el-form-item label="整改情况" prop="rectifyDesc" required>
            <el-input
              v-model="formData.rectifyDesc"
              type="textarea"
              placeholder="请输入整改情况，最多500字"
              maxlength="500"
              show-word-limit
              :rows="4"
            />
          </el-form-item>
          <el-form-item label="下步计划" prop="nextPlan" required>
            <el-input
              v-model="formData.nextPlan"
              type="textarea"
              placeholder="请输入下步计划，最多500字"
              maxlength="500"
              show-word-limit
              :rows="3"
            />
          </el-form-item>
          <el-form-item label="附件">
            <el-upload
              v-model:file-list="formData.attachments"
              :action="uploadUrl"
              :before-upload="beforeUpload"
              multiple
              :limit="5"
            >
              <el-button type="primary">上传附件</el-button>
              <template #tip>
                <div class="el-upload__tip">支持PDF、JPG、PNG、GIF格式，单文件不超过10MB</div>
              </template>
            </el-upload>
          </el-form-item>
        </div>
      </template>

      <!-- 远程帮扶表单 -->
      <template v-if="formType === '远程帮扶'">
        <div v-if="step === 1">
          <h3 class="form-section-title">交办信息</h3>
          <div class="excel-import-section">
            <el-button type="success" @click="showExcelImport = true">Excel导入</el-button>
            <span class="import-tip">支持批量导入14个字段</span>
          </div>
          <el-form-item label="任务编号" prop="taskNumber" required>
            <el-input
              v-model="formData.taskNumber"
              placeholder="请输入任务编号，最多50字"
              maxlength="50"
            />
          </el-form-item>
          <el-form-item label="线索详细描述" prop="clueDesc" required>
            <el-input
              v-model="formData.clueDesc"
              type="textarea"
              placeholder="请输入线索详细描述，最多1000字"
              maxlength="1000"
              show-word-limit
              :rows="4"
            />
          </el-form-item>
          <el-form-item label="污染源名称" prop="pollutionSource" required>
            <el-input
              v-model="formData.pollutionSource"
              placeholder="请输入污染源名称，最多100字"
              maxlength="100"
            />
          </el-form-item>
          <el-form-item label="污染源地址" prop="pollutionAddress" required>
            <el-input
              v-model="formData.pollutionAddress"
              placeholder="请输入污染源地址，最多200字"
              maxlength="200"
            />
          </el-form-item>
          <el-form-item label="统一社会信用代码" prop="creditCode" required>
            <el-input
              v-model="formData.creditCode"
              placeholder="请输入18位统一社会信用代码"
              maxlength="18"
            />
          </el-form-item>
          <el-form-item label="轮次" prop="round" required>
            <el-input v-model="formData.round" placeholder="请输入轮次，最多50字" maxlength="50" />
          </el-form-item>
          <el-form-item label="乡镇（街道）" prop="township" required>
            <el-input
              v-model="formData.township"
              placeholder="请输入乡镇或街道，最多100字"
              maxlength="100"
            />
          </el-form-item>
          <el-form-item label="经纬信息" prop="coordinates" required>
            <el-input
              v-model="formData.coordinates"
              placeholder="请输入经纬度坐标，最多100字"
              maxlength="100"
            />
          </el-form-item>
          <el-form-item label="企业基本信息及线索核实" prop="enterpriseInfo" required>
            <el-input
              v-model="formData.enterpriseInfo"
              type="textarea"
              placeholder="请输入企业基本信息及线索核实，最多1000字"
              maxlength="1000"
              show-word-limit
              :rows="4"
            />
          </el-form-item>
          <el-form-item label="是否存在问题" prop="hasProblem" required>
            <el-radio-group v-model="formData.hasProblem">
              <el-radio label="是">是</el-radio>
              <el-radio label="否">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否督办" prop="isSupervised" required>
            <el-radio-group v-model="formData.isSupervised">
              <el-radio label="是">是</el-radio>
              <el-radio label="否">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否为典型问题" prop="isTypical" required>
            <el-radio-group v-model="formData.isTypical">
              <el-radio label="是">是</el-radio>
              <el-radio label="否">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="线索核实情况" prop="clueVerification" required>
            <el-input
              v-model="formData.clueVerification"
              type="textarea"
              placeholder="请输入线索核实情况，最多1000字"
              maxlength="1000"
              show-word-limit
              :rows="4"
            />
          </el-form-item>
          <el-form-item label="现场情况" prop="fieldSituation" required>
            <el-input
              v-model="formData.fieldSituation"
              type="textarea"
              placeholder="请输入现场情况，最多1000字"
              maxlength="1000"
              show-word-limit
              :rows="4"
            />
          </el-form-item>
          <el-form-item label="属地" prop="area" required>
            <el-input v-model="formData.area" placeholder="请输入属地，最多100字" maxlength="100" />
          </el-form-item>
          <el-form-item label="辖区所" prop="jurisdictionOffice" required>
            <el-input
              v-model="formData.jurisdictionOffice"
              placeholder="请输入辖区所名称，最多100字"
              maxlength="100"
            />
          </el-form-item>
          <el-form-item label="负责人" prop="responsible" required>
            <el-input
              v-model="formData.responsible"
              placeholder="请输入负责人姓名，最多50字"
              maxlength="50"
            />
          </el-form-item>
        </div>
        <div v-if="step === 2">
          <h3 class="form-section-title">问题交办</h3>
          <el-form-item label="问题内容" prop="problemContent" required>
            <el-input
              v-model="formData.problemContent"
              type="textarea"
              placeholder="请输入问题内容，最多1000字"
              maxlength="1000"
              show-word-limit
              :rows="4"
            />
          </el-form-item>
          <el-form-item label="整改情况" prop="rectifyDesc" required>
            <el-input
              v-model="formData.rectifyDesc"
              type="textarea"
              placeholder="请输入整改情况，最多1000字"
              maxlength="1000"
              show-word-limit
              :rows="4"
            />
          </el-form-item>
          <el-form-item label="整改前证据照片" prop="beforePhotos" required>
            <el-upload
              v-model:file-list="formData.beforePhotos"
              :action="uploadUrl"
              :before-upload="beforePhotoUpload"
              list-type="picture-card"
              multiple
              :limit="5"
            >
              <el-icon><Plus /></el-icon>
              <template #tip>
                <div class="el-upload__tip">支持JPG、PNG格式，单文件不超过10MB</div>
              </template>
            </el-upload>
          </el-form-item>
          <el-form-item label="整改后证据照片" prop="afterPhotos" required>
            <el-upload
              v-model:file-list="formData.afterPhotos"
              :action="uploadUrl"
              :before-upload="beforePhotoUpload"
              list-type="picture-card"
              multiple
              :limit="5"
            >
              <el-icon><Plus /></el-icon>
              <template #tip>
                <div class="el-upload__tip">支持JPG、PNG格式，单文件不超过10MB</div>
              </template>
            </el-upload>
          </el-form-item>
          <el-form-item label="处理情况" prop="handlingSituation" required>
            <el-input
              v-model="formData.handlingSituation"
              type="textarea"
              placeholder="请输入处理情况，最多1000字"
              maxlength="1000"
              show-word-limit
              :rows="4"
            />
          </el-form-item>
        </div>
      </template>

      <!-- 数字化指挥中心表单 -->
      <template v-if="formType === '数字化指挥中心'">
        <div v-if="step === 1">
          <h3 class="form-section-title">交办信息</h3>
          <el-form-item label="交办日期" prop="assignDate" required>
            <el-date-picker
              v-model="formData.assignDate"
              type="date"
              placeholder="选择交办日期"
              style="width: 100%"
            />
          </el-form-item>
          <el-form-item label="属地" prop="area" required>
            <el-select v-model="formData.area" placeholder="请选择属地" style="width: 100%">
              <el-option label="属地所A" value="属地所A" />
              <el-option label="属地所B" value="属地所B" />
              <el-option label="属地所C" value="属地所C" />
              <el-option label="属地所D" value="属地所D" />
              <el-option label="属地所E" value="属地所E" />
              <el-option label="属地所F" value="属地所F" />
            </el-select>
          </el-form-item>
          <el-form-item label="辖区所" prop="jurisdictionOffice" required>
            <el-input
              v-model="formData.jurisdictionOffice"
              placeholder="请输入辖区所名称，最多100字"
              maxlength="100"
            />
          </el-form-item>
          <el-form-item label="负责人" prop="responsible" required>
            <el-input
              v-model="formData.responsible"
              placeholder="请输入负责人姓名，最多50字"
              maxlength="50"
            />
          </el-form-item>
          <el-form-item label="问题类型" prop="problemType" required>
            <el-input
              v-model="formData.problemType"
              placeholder="请输入问题类型，最多50字"
              maxlength="50"
            />
          </el-form-item>
          <el-form-item label="线索描述" prop="clueDesc" required>
            <el-input
              v-model="formData.clueDesc"
              type="textarea"
              placeholder="请输入线索描述，最多1000字"
              maxlength="1000"
              show-word-limit
              :rows="4"
            />
          </el-form-item>
        </div>
        <div v-if="step === 2">
          <h3 class="form-section-title">问题交办</h3>
          <el-form-item label="核查反馈" prop="checkFeedback" required>
            <el-input
              v-model="formData.checkFeedback"
              type="textarea"
              placeholder="请输入核查反馈，最多1000字"
              maxlength="1000"
              show-word-limit
              :rows="4"
            />
          </el-form-item>
          <el-form-item label="调查核实情况" prop="investigationSituation" required>
            <el-input
              v-model="formData.investigationSituation"
              type="textarea"
              placeholder="请输入调查核实情况，最多1000字"
              maxlength="1000"
              show-word-limit
              :rows="4"
            />
          </el-form-item>
          <el-form-item label="处理情况" prop="handlingSituation" required>
            <el-input
              v-model="formData.handlingSituation"
              type="textarea"
              placeholder="请输入处理情况，最多1000字"
              maxlength="1000"
              show-word-limit
              :rows="4"
            />
          </el-form-item>
        </div>
      </template>

      <!-- 线索核查表单 -->
      <template v-if="formType === '线索核查'">
        <div v-if="step === 1">
          <h3 class="form-section-title">交办信息</h3>
          <el-form-item label="交办日期" prop="assignDate" required>
            <el-date-picker
              v-model="formData.assignDate"
              type="date"
              placeholder="选择交办日期"
              style="width: 100%"
            />
          </el-form-item>
          <el-form-item label="属地" prop="area" required>
            <el-select
              v-model="formData.area"
              placeholder="请选择属地"
              style="width: 100%"
              @change="onAreaChange"
            >
              <el-option label="XX镇1" value="XX镇1" />
              <el-option label="XX镇2" value="XX镇2" />
              <el-option label="XX镇3" value="XX镇3" />
              <el-option label="XX镇4" value="XX镇4" />
              <el-option label="XX镇5" value="XX镇5" />
            </el-select>
          </el-form-item>
          <el-form-item label="辖区所" prop="jurisdictionOffice" required>
            <el-input v-model="formData.jurisdictionOffice" placeholder="自动填充" readonly />
          </el-form-item>
          <el-form-item label="负责人" prop="responsible" required>
            <el-select
              v-model="formData.responsible"
              placeholder="请选择负责人"
              style="width: 100%"
            >
              <el-option label="联系人A" value="联系人A" />
              <el-option label="联系人B" value="联系人B" />
              <el-option label="联系人C" value="联系人C" />
            </el-select>
          </el-form-item>
          <el-form-item label="问题类型" prop="problemType" required>
            <el-radio-group v-model="formData.problemType">
              <el-radio label="用电监控">用电监控</el-radio>
              <el-radio label="环境信访">环境信访</el-radio>
              <el-radio label="在线监控">在线监控</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="线索描述" prop="clueDesc" required>
            <el-input
              v-model="formData.clueDesc"
              type="textarea"
              placeholder="请输入线索描述，最多2000字"
              maxlength="2000"
              show-word-limit
              :rows="4"
            />
          </el-form-item>
        </div>
        <div v-if="step === 2">
          <h3 class="form-section-title">问题交办</h3>
          <el-form-item label="调查核实情况" prop="investigationSituation" required>
            <el-input
              v-model="formData.investigationSituation"
              type="textarea"
              placeholder="请输入调查核实情况，最多2000字"
              maxlength="2000"
              show-word-limit
              :rows="4"
            />
          </el-form-item>
          <el-form-item label="处理情况" prop="handlingSituation" required>
            <el-input
              v-model="formData.handlingSituation"
              type="textarea"
              placeholder="请输入处理情况，最多2000字"
              maxlength="2000"
              show-word-limit
              :rows="4"
            />
          </el-form-item>
          <el-form-item label="督促整改情况">
            <el-input
              v-model="formData.superviseRectification"
              type="textarea"
              placeholder="请输入督促整改情况，最多1000字"
              maxlength="1000"
              show-word-limit
              :rows="3"
            />
          </el-form-item>
          <el-form-item label="图片上传">
            <el-upload
              v-model:file-list="formData.images"
              :action="uploadUrl"
              :before-upload="beforePhotoUpload"
              list-type="picture-card"
              multiple
              :limit="5"
            >
              <el-icon><Plus /></el-icon>
              <template #tip>
                <div class="el-upload__tip">支持JPG、PNG格式，单文件不超过5MB</div>
              </template>
            </el-upload>
          </el-form-item>
          <el-form-item label="文件上传">
            <el-upload
              v-model:file-list="formData.files"
              :action="uploadUrl"
              :before-upload="beforeFileUpload"
              multiple
              :limit="3"
            >
              <el-button type="primary">上传文件</el-button>
              <template #tip>
                <div class="el-upload__tip">支持PDF、Word格式，单文件不超过10MB</div>
              </template>
            </el-upload>
          </el-form-item>
        </div>
      </template>
    </el-form>

    <!-- Excel导入弹窗 -->
    <el-dialog v-model="showExcelImport" title="Excel导入" width="600px">
      <div class="excel-import-dialog">
        <el-upload
          ref="excelUploadRef"
          action="http://localhost:5000/api/import-excel"
          :before-upload="beforeExcelUpload"
          :on-success="handleExcelSuccess"
          :on-error="handleExcelError"
          :show-file-list="false"
          accept=".xlsx,.xls"
        >
          <el-button type="primary">选择Excel文件</el-button>
          <template #tip>
            <div class="el-upload__tip">支持.xlsx、.xls格式，文件大小不超过10MB</div>
          </template>
        </el-upload>
        <div v-if="excelErrors.length > 0" class="excel-errors">
          <h4>导入错误：</h4>
          <ul>
            <li v-for="error in excelErrors" :key="error" class="error-item">{{ error }}</li>
          </ul>
        </div>
      </div>
      <template #footer>
        <el-button @click="showExcelImport = false">取消</el-button>
        <el-button type="primary" @click="confirmExcelImport">确认导入</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

const props = defineProps({
  formType: {
    type: String,
    required: true,
  },
  step: {
    type: Number,
    default: 1,
  },
  initialData: {
    type: Object,
    default: () => ({}),
  },
})

const emit = defineEmits(['update:formData'])

// 表单数据
const formData = ref({
  // 通用字段
  name: '',
  area: '',

  // 督查在线字段
  title: '',
  content: '',
  contact: '',
  deadline: '',
  measures: '',
  status: '',
  rectifyTime: '',
  rectifyDesc: '',
  nextPlan: '',
  attachments: [],

  // 远程帮扶字段
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
  isSupervised: '',
  isTypical: '',
  clueVerification: '',
  fieldSituation: '',
  jurisdictionOffice: '',
  responsible: '',
  problemContent: '',
  beforePhotos: [],
  afterPhotos: [],
  handlingSituation: '',

  // 数字化指挥中心字段
  assignDate: '',
  problemType: '',
  checkFeedback: '',
  investigationSituation: '',

  // 线索核查字段
  superviseRectification: '',
  images: [],
  files: [],

  ...props.initialData,
})

// 表单引用
const formRef = ref()

// Excel导入相关
const showExcelImport = ref(false)
const excelUploadRef = ref()
const excelErrors = ref([])

// 上传地址
const uploadUrl = ref('http://localhost:5000/api/upload')

// 表单验证规则
const formRules = computed(() => {
  const rules = {}

  if (props.formType === '督查在线') {
    if (props.step === 1) {
      rules.title = [{ required: true, message: '请输入问题标题', trigger: 'blur' }]
      rules.content = [{ required: true, message: '请输入问题内容', trigger: 'blur' }]
      rules.area = [{ required: true, message: '请选择属地', trigger: 'change' }]
      rules.contact = [{ required: true, message: '请输入联系人', trigger: 'blur' }]
    } else if (props.step === 2) {
      rules.deadline = [{ required: true, message: '请选择整改时限', trigger: 'change' }]
      rules.measures = [{ required: true, message: '请输入整改措施', trigger: 'blur' }]
      rules.status = [{ required: true, message: '请选择整改状态', trigger: 'change' }]
      rules.rectifyTime = [{ required: true, message: '请选择整改时间', trigger: 'change' }]
      rules.rectifyDesc = [{ required: true, message: '请输入整改情况', trigger: 'blur' }]
      rules.nextPlan = [{ required: true, message: '请输入下步计划', trigger: 'blur' }]
    }
  }

  // 其他表单类型的验证规则...

  return rules
})

// 监听表单数据变化
watch(
  formData,
  (newData) => {
    emit('update:formData', newData)
  },
  { deep: true },
)

// 属地变化处理（线索核查）
const onAreaChange = (area) => {
  if (props.formType === '线索核查') {
    formData.value.jurisdictionOffice = area + '执法所'
  }
}

// 文件上传前验证
const beforeUpload = (file) => {
  const isValidType = ['application/pdf', 'image/jpeg', 'image/png', 'image/gif'].includes(
    file.type,
  )
  const isLt10M = file.size / 1024 / 1024 < 10

  if (!isValidType) {
    ElMessage.error('仅支持PDF、JPG、PNG、GIF格式!')
    return false
  }
  if (!isLt10M) {
    ElMessage.error('文件大小不能超过10MB!')
    return false
  }
  return true
}

// 图片上传前验证
const beforePhotoUpload = (file) => {
  const isValidType = ['image/jpeg', 'image/png'].includes(file.type)
  const maxSize = props.formType === '线索核查' ? 5 : 10
  const isLtMaxM = file.size / 1024 / 1024 < maxSize

  if (!isValidType) {
    ElMessage.error('仅支持JPG、PNG格式!')
    return false
  }
  if (!isLtMaxM) {
    ElMessage.error(`文件大小不能超过${maxSize}MB!`)
    return false
  }
  return true
}

// 文件上传前验证（线索核查）
const beforeFileUpload = (file) => {
  const isValidType = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ].includes(file.type)
  const isLt10M = file.size / 1024 / 1024 < 10

  if (!isValidType) {
    ElMessage.error('仅支持PDF、Word格式!')
    return false
  }
  if (!isLt10M) {
    ElMessage.error('文件大小不能超过10MB!')
    return false
  }
  return true
}

// Excel上传前验证
const beforeExcelUpload = (file) => {
  const isValidType = [
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ].includes(file.type)
  const isLt10M = file.size / 1024 / 1024 < 10

  if (!isValidType) {
    ElMessage.error('仅支持Excel格式!')
    return false
  }
  if (!isLt10M) {
    ElMessage.error('文件大小不能超过10MB!')
    return false
  }
  return true
}

// Excel导入成功
const handleExcelSuccess = (response) => {
  if (response.success) {
    // 填充表单数据
    Object.assign(formData.value, response.data)
    ElMessage.success('Excel导入成功!')
    showExcelImport.value = false
    excelErrors.value = []
  } else {
    excelErrors.value = response.errors || ['导入失败']
  }
}

// Excel导入失败
const handleExcelError = () => {
  ElMessage.error('Excel导入失败，请重试!')
}

// 确认Excel导入
const confirmExcelImport = () => {
  if (excelErrors.value.length === 0) {
    showExcelImport.value = false
  }
}

// 表单验证
const validateForm = () => {
  return new Promise((resolve) => {
    formRef.value.validate((valid) => {
      resolve(valid)
    })
  })
}

// 暴露方法给父组件
defineExpose({
  validateForm,
  formData,
})
</script>

<style scoped>
.form-renderer {
  padding: 20px 0;
}

.issue-form {
  max-width: 800px;
  margin: 0 auto;
}

.form-section-title {
  color: #217346;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
  padding-bottom: 8px;
  border-bottom: 2px solid #e3f2fd;
}

.excel-import-section {
  margin-bottom: 20px;
  padding: 15px;
  background: #f8fbf7;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.import-tip {
  color: #666;
  font-size: 14px;
}

.excel-import-dialog {
  text-align: center;
  padding: 20px;
}

.excel-errors {
  margin-top: 20px;
  text-align: left;
}

.excel-errors h4 {
  color: #f56c6c;
  margin-bottom: 10px;
}

.error-item {
  color: #f56c6c;
  margin-bottom: 5px;
}

.el-form-item {
  margin-bottom: 20px;
}

.el-upload__tip {
  font-size: 12px;
  color: #999;
  margin-top: 5px;
}
</style>
