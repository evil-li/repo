# Codex Execution Contract

本文件定义 Codex 在处理 Pencil 设计转前端代码任务时必须遵守的执行约束。
除非用户明确豁免，否则不得跳过任何 MUST 规则。

## 1. Task Scope

目标：将指定 Pencil frame 转换为生产级前端代码，并完成验证与修复。

适用技术栈：
- React
- Next.js
- TypeScript
- Tailwind CSS

## 2. Required Inputs

在开始生成代码前，以下输入必须齐全：

- frame 标识（frame name 或 frame id）
- 目标路由
- 当前仓库上下文
- 可读取的设计数据来源（必须可通过 Pencil MCP 或等价结构化接口访问）

如果缺少任一项，禁止直接开始生成最终页面代码。

## 3. Non-Negotiable Rules

### MUST 1: No screenshot-only generation
禁止仅基于截图直接生成最终代码。
必须优先使用结构化设计数据。

### MUST 2: Extract before generate
必须先抽取设计数据，再生成代码。
禁止跳过抽取阶段。

### MUST 3: IR first
必须先生成 IR，再进行组件映射，再输出代码。
禁止从原始设计数据直接一步生成最终页面代码。

执行顺序必须为：
1. extract raw design data
2. generate normalized IR
3. map IR to project components/tokens
4. generate code
5. validate
6. repair if needed
7. summarize outputs

### MUST 4: Prefer existing components
必须优先复用项目已有组件，优先检查：
- src/components/ui
- src/components/business

若已有组件可满足需求，禁止生成重复功能组件。

### MUST 5: Prefer tokens over hard-coded styles
必须优先使用设计 token、主题变量或项目已有样式约定。
禁止无必要地大量写死颜色、圆角、间距、阴影。

### MUST 6: Semantic HTML first
必须优先使用语义化结构：
- header
- nav
- main
- section
- aside
- footer
- form
- table
- ul/li

禁止无意义 div 嵌套。

### MUST 7: Limited absolute positioning
absolute 定位只能用于：
- 浮层
- 装饰背景
- 叠层视觉元素
- 特殊图表布局

普通页面布局禁止滥用 absolute。

### MUST 8: Produce artifacts
必须生成过程产物，至少包括：
- raw design artifact
- normalized IR
- mapped IR or mapping summary
- validation report
- repair summary（如发生修复）

### MUST 9: Validation required
生成代码后必须执行验证。
至少检查：
- lint
- typecheck
- build
- visual comparison（如果环境可用）

如果验证失败，不能直接宣布完成。

### MUST 10: Repair loop limit
允许自动修复，但最多 3 轮。
每轮必须记录：
- 发现的问题
- 修改内容
- 结果是否改善

### MUST 11: Report uncertainty
凡是无法确定的映射、响应式行为或交互逻辑，必须明确记录到报告中。
禁止静默猜测后不做说明。

## 4. Required Deliverables

任务完成时，至少应交付以下内容中的大多数（按仓库实际结构落地）：

- `design-artifacts/raw/*`
- `design-artifacts/ir/*`
- `design-artifacts/reports/*`
- `src/app/<target-route>/page.tsx`
- `src/components/generated/*`（如有抽取）
- mapping summary
- validation summary
- repair summary（如适用）

## 5. Failure Conditions

出现以下任一情况，任务不能标记为完成：

- 未读取结构化设计数据
- 未生成 IR
- 未做组件映射
- 未执行验证
- 明明可复用现有组件却生成了重复组件
- 输出只有代码，没有过程报告
- visual diff 明显异常却未说明
- 关键不确定点未记录

## 6. Final Response Format

最终总结必须包含：

1. 输入信息
   - frame
   - route
   - 设计数据来源

2. 执行阶段结果
   - raw extraction
   - IR generation
   - component mapping
   - code generation
   - validation
   - repair

3. 产出文件列表

4. 未解决问题 / 风险项

5. 后续建议

## 7. Default Decision Policy

当存在多种实现方式时，默认选择：

1. 更可维护
2. 更符合现有项目组件体系
3. 更少硬编码
4. 更少绝对定位
5. 更容易通过 lint/typecheck/build
6. 更容易做后续视觉修复

## 8. User Override

只有当用户明确说出以下含义时，才允许放宽本契约中的部分规则：
- “跳过 IR”
- “直接给我 demo，不用生产级”
- “无需验证”
- “只要截图还原即可”

如果用户没有明确豁免，默认所有 MUST 规则生效。
