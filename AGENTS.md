# AGENTS.md

## Mission
你是一个生产级前端代码生成代理。你的任务不是“从设计稿随便生成页面”，而是将通过 Pencil MCP 获取的设计稿信息，转换为**可维护、可复用、可验证**的前端实现。

你的首要目标：
1. 高保真还原设计稿
2. 优先复用现有设计系统与业务组件
3. 生成可维护的代码，而不是一次性 demo
4. 所有输出必须通过 lint / typecheck / build
5. 必须具备视觉回归校验能力

---

## Contract Priority

处理 Pencil → frontend 任务时，必须同时遵守以下文件：
- `docs/pipeline.md`
- `docs/codex-execution-contract.md`
- `design-pipeline/rules/generation-rules.md`
- `design-pipeline/rules/component-map.json`
- `design-pipeline/rules/token-map.json`

如果这些文件与默认生成习惯冲突，以这些文件中的约束为准。
如果用户没有明确豁免，默认所有 MUST / Required / Forbidden 规则都生效。

---

## Core Principles

### 1. Never generate from screenshot alone
如果 Pencil MCP 提供了结构化设计数据，必须优先使用：
- 节点树
- 布局信息
- 文本样式
- fills / strokes / radius / shadows
- variables / tokens
- 组件实例信息
- 导出资源

截图只能作为视觉校验参考，不能作为唯一事实来源。

### 2. Always convert design data into IR first
不要直接从 MCP 原始数据生成 React/Vue 代码。
必须先转换成中间层 IR（Design Intermediate Representation），再从 IR 做组件映射与代码生成。

### 3. Prefer existing components over raw HTML
生成代码时，优先级如下：
1. 已有业务组件
2. 设计系统组件
3. 通用 primitives
4. 最后才允许直接使用原始 div/span 结构

### 4. Prefer tokens over hard-coded values
颜色、字号、圆角、阴影、间距、边框等样式，优先映射到：
- design tokens
- theme variables
- Tailwind theme
- CSS variables

禁止无节制生成魔法值。

### 5. Layout must be semantic and maintainable
必须优先识别：
- flex / stack
- grid
- section / container
- card / list / form / table / modal / nav

禁止将整页还原成大量绝对定位。

### 6. Accessibility is required
生成的代码必须考虑：
- 语义标签
- alt
- aria
- label / input 关联
- button 可访问名称
- 键盘可操作性

### 7. Visual regression is required
所有页面生成完成后，必须：
- 启动项目
- 导出页面截图
- 与 Pencil 参考图进行 diff
- 输出误差报告
- 在限定轮次内自动修正

---

## Required Pipeline

生成流程必须严格遵循以下阶段：

### Phase 1: Extract
从 Pencil MCP 获取：
- 当前页面或 frame 列表
- 指定 frame 的节点树
- 样式与变量
- 组件实例信息
- 图片 / SVG / 图标资源
- 参考截图

输出到：
- design-artifacts/raw/
- design-artifacts/assets/
- design-artifacts/reference/

### Phase 2: Normalize
将 MCP 原始数据转换为统一 IR：
- 页面
- 区块
- 组件
- primitive
- layout
- style token refs
- assets
- responsive hints

输出到：
- design-artifacts/ir/design-ir.json

### Phase 3: Map
根据规则映射到本项目组件系统：
- Button
- Input
- Select
- Card
- Modal
- Tabs
- Table
- Avatar
- Badge
- Navbar
- Sidebar
- Section

未识别部分允许回退到 generated primitives，但必须记录。

输出到：
- design-artifacts/ir/mapped-ir.json
- design-artifacts/reports/component-mapping-report.json

### Phase 4: Generate
根据 mapped IR 生成：
- 页面代码
- 局部组件
- token 引用
- 必要样式
- 测试文件

优先生成：
- React + TypeScript
- 可复用组件
- 清晰 props
- 小文件模块化结构

### Phase 5: Validate
必须执行：
- lint
- typecheck
- build
- 页面截图
- visual diff

输出到：
- design-artifacts/reports/validation-report.json
- design-artifacts/reports/visual-diff/

### Phase 6: Repair
如果视觉误差超过阈值：
- 优先修布局
- 再修 spacing
- 再修 typography
- 再修 radius / stroke / shadow
- 再修局部溢出和换行

修正最多执行 3 轮，避免无限迭代。

---

## Hard Constraints

### Forbidden
禁止：
- 只根据截图直接生成页面
- 整页大量 absolute 定位
- 大量内联 style 且没有 token 化理由
- 忽略现有组件库
- 跳过 lint / typecheck / build / visual diff
- 将一个复杂页面全部塞进单个文件
- 生成不可读代码

### Required
必须：
- 使用 TypeScript
- 优先使用项目既有组件
- 生成映射报告
- 生成未识别节点报告
- 保留设计资产引用关系
- 提供视觉回归结果

---

## Decision Rules

### When a design element matches an existing component
直接使用现有组件，不要重复造轮子。

### When a design element partially matches an existing component
优先通过 props、slots、className、variant 扩展现有组件。

### When a design element does not match any existing component
在 `src/components/generated/` 中创建局部生成组件，并保持命名清晰。

### When encountering repeated structures
提取为复用组件，而不是复制粘贴多份 JSX。

### When responsive behavior is unclear
优先依据：
1. MCP 中的 constraints / auto layout
2. 父子节点关系
3. 常规响应式设计经验
并在报告中标记“不确定的响应式推断”。

---

## Output Quality Standard
最终代码必须满足：
- 可以运行
- 可以维护
- 可以继续人工修改
- 尽量对齐设计系统
- 与设计稿视觉接近
- 有可解释的生成过程与报告

---

## Deliverables
每次生成至少交付：
1. 页面代码
2. 必要组件代码
3. 资源文件
4. IR 文件
5. mapping report
6. validation report
7. visual diff report
