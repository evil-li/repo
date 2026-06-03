# Pencil to Code Pipeline

## Step 1: Extract from Pencil MCP
读取设计稿并导出：
- raw node tree
- frame metadata
- styles and variables
- assets
- reference screenshot

保存到：
- design-artifacts/raw/
- design-artifacts/assets/
- design-artifacts/reference/

## Step 2: Normalize to Design IR
执行：
- 统一节点类型
- 统一布局模型
- 统一样式引用
- 识别 primitive 与 semantic kind

保存：
- design-artifacts/ir/design-ir.json

## Step 3: Map to project components
读取：
- component-map.json
- token-map.json

输出：
- design-artifacts/ir/mapped-ir.json
- design-artifacts/reports/component-mapping-report.json

报告中必须包含：
- mapped components
- fallback primitives
- unresolved nodes
- responsive uncertainty notes

## Step 4: Generate code
输出到：
- src/app/
- src/components/generated/
- src/styles/

生成完成后必须：
- 避免冗余结构
- 抽取复用块
- 对齐语义结构

## Step 5: Validate
执行：
- install deps if needed
- lint
- typecheck
- build
- run app
- take screenshot
- compare with reference

输出：
- design-artifacts/reports/validation-report.json
- design-artifacts/reports/visual-diff/

## Step 6: Repair
如果视觉误差超阈值，则修复，最多 3 轮。

## Step 7: Final summary
输出总结必须包含：
- 生成页面清单
- 新增组件清单
- 映射成功率
- 未解决节点
- 视觉误差结果
- 后续建议
