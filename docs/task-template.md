# Task Template

请基于 AGENTS.md 和 design-pipeline/ 下的所有规则执行以下任务：

## Goal
将指定的 Pencil 设计 frame 转换为生产级前端代码，并完成验证与修复。

## Inputs
- Pencil MCP 可访问
- 目标 frame: <FRAME_NAME_OR_ID>
- 目标路由: <TARGET_ROUTE>
- 技术栈: React / Next.js / TypeScript / Tailwind
- 优先复用组件目录:
  - src/components/ui
  - src/components/business

## Requirements
1. 先抽取设计数据，不要直接从截图生成
2. 先生成 IR，再做组件映射，再生成代码
3. 尽量复用现有组件
4. 生成视觉回归报告
5. 自动修复不超过 3 轮
6. 输出最终总结

## Expected Outputs
- design-artifacts/raw/*
- design-artifacts/ir/*
- design-artifacts/reports/*
- src/app/<TARGET_ROUTE>/page.tsx
- src/components/generated/*
