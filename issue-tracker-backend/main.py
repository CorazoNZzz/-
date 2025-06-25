from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
# --- 新增：从pydantic导入BaseModel，用于定义请求的数据结构 ---
from pydantic import BaseModel
from typing import Optional, List, Any

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- 模拟数据库里的数据 ---
# 我把这个变量名改成了更像数据库的叫法
db_issues = {
    "1": { "id": "1", "name": "某企业废气排放超标问题", "formType": "督查在线", "location": "开发区", "contact": "张三", "deadline": "2025-01-25", "status": "处理中" },
    "2": { "id": "2", "name": "工业园区水污染治理", "formType": "远程帮扶", "location": "工业园区", "contact": "李四", "deadline": "-", "status": "已完成" },
    "3": { "id": "3", "name": "环境监测数据异常", "formType": "数字化指挥中心", "location": "城东区", "contact": "王五", "deadline": "-", "status": "待处理" },
    "4": { "id": "4", "name": "观海卫镇工业区疑似违规排污线索", "formType": "线索核查", "location": "观海卫镇", "contact": "王海峰", "deadline": "-", "status": "已提交" },
    "5": { "id": "5", "name": "某某河流污染问题", "formType": "督查在线", "location": "某某河流", "contact": "赵六", "deadline": "2025-01-30", "status": "草稿" }
}

# --- 新增：定义前端发送过来的数据应该长什么样 ---
# 这会让FastAPI自动检查数据格式是否正确
class IssueData(BaseModel):
    id: str
    formType: str
    # 允许接收任何其他字段，因为我们每个表单的字段都不同
    class Config:
        extra = 'allow'


@app.get("/api/issues")
def get_issues_list():
    # 将字典的值转换为列表返回
    return {
        "success": True,
        "data": {
            "list": list(db_issues.values()),
            "total": len(db_issues)
        }
    }

# --- 核心修改：新增一个处理 PUT 请求的接口 ---
@app.put("/api/issues/{issue_id}")
def update_issue(issue_id: str, issue_data: IssueData):
    """
    这个函数处理对 "/api/issues/{具体的ID}" 地址的 PUT 请求
    它会更新对应ID的问题数据
    """
    print(f"后端收到了对ID {issue_id} 的更新请求")
    
    # 检查数据库里有没有这个ID
    if issue_id in db_issues:
        # 将前端发来的数据转换成字典
        update_data = issue_data.dict()
        # 更新数据库里已有的数据
        db_issues[issue_id].update(update_data)
        
        print(f"更新后的数据: {db_issues[issue_id]}")
        
        return {
            "success": True,
            "data": db_issues[issue_id],
            "message": "保存成功"
        }
    else:
        # 如果ID不存在，返回一个错误
        return {"success": False, "message": "问题未找到"}


@app.get("/")
def read_root():
    return {"Hello": "World"}