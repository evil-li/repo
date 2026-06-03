# Generation Rules

## Goal
将 mapped IR 转换成生产级前端代码。

## Rules

### 1. Prefer semantic structure
优先输出：
- header
- nav
- main
- section
- aside
- footer
- form
- table
- ul/li

不要无意义嵌套 div。

### 2. Prefer reusable components
对于重复出现 2 次及以上、结构相似度高的节点，提取为局部复用组件。

### 3. Prefer project components
如果映射表中存在匹配组件，必须使用现有组件，而不是生成自定义实现。

### 4. Keep generated files small
单个生成文件建议不超过 250 行。超出时拆分。

### 5. Generated components location
局部生成组件放在：
`src/components/generated/`

### 6. Styling strategy
优先级：
1. 现有组件 variant / size / props
2. Tailwind utility classes
3. CSS variables
4. 极少量必要的 inline style

### 7. Absolute positioning fallback
只有以下情况允许使用 absolute：
- 明确悬浮层
- 装饰性背景
- 复杂叠层视觉元素
- 图表或特殊视觉布局

### 8. Text handling
文本必须保留：
- 换行语义
- 字重
- 字号层级
- 对齐方式
- 截断/省略策略

### 9. Images and icons
SVG 优先转组件；
位图资源优先输出到 `public/generated/`。

### 10. Unmapped nodes
未映射节点必须：
- 生成 fallback primitive
- 记录到报告
- 命名清晰
