# Codex Task Prompt Template

请严格遵守以下仓库约束文件：

- `AGENTS.md`
- `docs/pipeline.md`
- `docs/codex-execution-contract.md`
- `design-pipeline/rules/generation-rules.md`
- `design-pipeline/rules/component-map.json`
- `design-pipeline/rules/token-map.json`

如果这些文件与默认生成习惯冲突，以这些文件中的约束为准。
如果我没有明确豁免，默认所有 MUST / Required / Forbidden 规则都生效。

---

## Task Type

这是一个**生产级 Pencil → frontend 生成任务**，不是 demo，也不是只做视觉近似的草稿。

---

## Inputs

### Design Target
- Frame name / Frame ID: `<fill here>`
- Page name（可选）: `<fill here>`
- Design source: `Pencil MCP`

### Code Target
- Target route: `<fill here>`
- Expected page file: `<fill here>`
- Related layout / parent route（可选）: `<fill here>`

### Repository Context
- Tech stack: `<fill here>`
- Existing component locations:
  - `src/components/ui`
  - `src/components/business`
- Generated component location:
  - `src/components/generated`

### Optional Constraints
- Must reuse components: `<fill here>`
- Must avoid modifying files: `<fill here>`
- Responsive requirements: `<fill here>`
- Accessibility requirements: `<fill here>`
- Test requirements: `<fill here>`

---

## Non-Negotiable Execution Rules

1. 禁止只根据截图直接生成最终代码。
2. 必须先读取结构化设计数据。
3. 必须先生成 IR，再做组件 / token 映射，再生成代码。
4. 必须优先复用现有组件，不要重复造轮子。
5. 必须优先使用 token / theme / CSS variables，避免硬编码样式。
6. 必须优先使用语义化 HTML，避免无意义 div 嵌套。
7. 普通页面布局禁止滥用 absolute positioning。
8. 生成完成后必须执行验证，而不是直接宣布完成。
9. 如果验证或视觉对比失败，允许修复，但最多 3 轮。
10. 所有不确定项必须写入报告，禁止静默猜测。

---

## Required Workflow

请严格按以下顺序执行：

1. Extract  
   从 Pencil MCP 获取结构化设计数据、资源和参考截图。

2. Normalize  
   生成统一 IR。

3. Map  
   将 IR 映射到项目已有组件、tokens、样式体系。

4. Generate  
   生成页面代码、局部组件、必要样式和测试文件。

5. Validate  
   执行 lint / typecheck / build / visual comparison（如果环境支持）。

6. Repair  
   如有需要，最多执行 3 轮修复，并记录每轮变化。

7. Summarize  
   输出文件清单、验证结果、风险项和未决问题。

---

## Required Deliverables

本任务结束时，至少应产出或更新以下内容中的相关部分：

- `design-artifacts/raw/*`
- `design-artifacts/ir/*`
- `design-artifacts/reports/*`
- `<target page file>`
- `src/components/generated/*`（如有）
- mapping summary
- validation summary
- repair summary（如有）

---

## Failure Conditions

以下任一情况都不能算任务完成：

- 没有读取结构化设计数据
- 没有生成 IR
- 没有做组件映射
- 没有验证
- 明明可复用现有组件却生成了重复组件
- 输出只有代码，没有报告
- visual diff 明显异常却没有解释
- 存在关键不确定项但没有记录

---

## Implementation Priorities

当存在多种实现方式时，请按以下优先级选择：

1. 更符合现有项目组件体系
2. 更可维护
3. 更少硬编码
4. 更少 absolute positioning
5. 更容易通过 lint / typecheck / build
6. 更容易做后续视觉修复

---

## If Inputs Are Missing

如果缺少以下任一关键信息：
- frame name / frame id
- target route
- repository context
- 可访问的 Pencil 结构化设计数据

请先明确指出缺失项，**不要直接开始生成最终代码**。

---

## Final Response Format

最终总结必须包含以下内容：

### 1. Input Summary
- frame
- route
- design data source

### 2. Execution Summary
- raw extraction
- IR generation
- component mapping
- code generation
- validation
- repair

### 3. Output Files
列出所有新增或修改的文件。

### 4. Validation Results
- lint
- typecheck
- build
- visual comparison

### 5. Risks / Uncertainties
列出所有未解决问题、不确定映射、响应式推断、交互假设。

### 6. Next Suggestions
给出后续建议，例如：
- 是否需要人工微调
- 是否建议补充组件抽象
- 是否建议补充测试
